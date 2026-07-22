import asyncio
import json
import redis
from celery import Task
from datetime import datetime
from typing import Dict, Any

from app.celery_app.app import celery_app
from app.config import get_settings
from app.services.r2 import r2_service
from app.services.runpod import runpod_service

settings = get_settings()

# Redis client for progress updates
redis_client = redis.from_url(settings.redis_url, decode_responses=True)


class GenerationTask(Task):
    """Base task with progress broadcasting via Redis Pub/Sub."""

    def update_progress(self, task_id: str, progress: int, status: str, **kwargs):
        """Broadcast progress to WebSocket clients via Redis Pub/Sub."""
        payload = {
            "task_id": task_id,
            "progress": progress,
            "status": status,
            "timestamp": datetime.utcnow().isoformat(),
            **kwargs,
        }
        # Publish to Redis channel
        redis_client.publish(f"task:{task_id}", json.dumps(payload))
        # Also update Celery task state
        self.update_state(state="PROGRESS", meta=payload)


@celery_app.task(
    bind=True,
    base=GenerationTask,
    max_retries=3,
    default_retry_delay=30,
    name="app.celery_app.tasks.generation.generate_sprite",
)
def generate_sprite(
    self, task_id: str, prompt: str, style: str = "fantasy", action: str = "idle"
) -> Dict[str, Any]:
    """
    Generate pixel art sprite via RunPod Serverless ComfyUI workflow.

    Pipeline:
    1. Submit to RunPod
    2. Poll for completion with progress updates
    3. Upload result to R2
    4. Return sprite URL
    """
    try:
        # Phase 1: Submit to RunPod
        self.update_progress(
            task_id, 10, "SUBMITTED", message="Submitting to AI worker..."
        )

        # Prepare ComfyUI workflow input
        runpod_input = {
            "prompt": prompt,
            "style": style,
            "action": action,
            "width": 512,
            "height": 512,
            "steps": 30,
            "cfg_scale": 7.5,
            "pixel_art": True,
            "remove_background": True,
        }

        # Submit async job to RunPod
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        try:
            job_id = loop.run_until_complete(runpod_service.submit_job(runpod_input))
            self.update_progress(
                task_id, 20, "PROCESSING", message=f"Job submitted: {job_id}"
            )

            # Phase 2: Poll for completion
            def progress_sync_callback(job_status, delay_time, execution_time):
                """Sync wrapper for async progress callback."""
                progress = min(80, 20 + int(execution_time / 10))
                self.update_progress(
                    task_id,
                    progress,
                    "PROCESSING",
                    message=f"AI generating... ({execution_time}s)",
                )

            result = loop.run_until_complete(
                runpod_service.wait_for_completion(
                    job_id,
                    poll_interval=3.0,
                    max_wait=600.0,
                    progress_callback=progress_sync_callback,
                )
            )

        finally:
            loop.close()

        # Phase 3: Upload to R2
        self.update_progress(task_id, 85, "UPLOADING", message="Uploading sprite...")

        sprite_data = result.get("image")  # Base64 or URL from ComfyUI
        if not sprite_data:
            raise Exception("No image data returned from RunPod")

        # Upload to R2
        r2_key = f"sprites/{task_id}.png"
        sprite_url = r2_service.upload_from_base64(sprite_data, r2_key, "image/png")

        # Phase 4: Complete
        self.update_progress(
            task_id,
            100,
            "COMPLETED",
            message="Sprite generated successfully!",
            sprite_url=sprite_url,
        )

        return {
            "task_id": task_id,
            "status": "COMPLETED",
            "sprite_url": sprite_url,
            "completed_at": datetime.utcnow().isoformat(),
        }

    except Exception as exc:
        # Retry on transient failures
        if self.request.retries < self.max_retries:
            self.update_progress(
                task_id,
                0,
                "RETRYING",
                message=f"Retrying... ({self.request.retries + 1}/{self.max_retries})",
            )
            raise self.retry(exc=exc)

        # Final failure
        self.update_progress(
            task_id,
            0,
            "FAILED",
            message="Generation failed",
            error=str(exc),
        )
        raise


@celery_app.task(name="app.celery_app.tasks.generation.cleanup_old_tasks")
def cleanup_old_tasks():
    """Periodic task to clean up old task data from Redis."""
    # Find and delete task keys older than 24 hours
    # This is a simplified version - in production, use proper TTL
    pattern = "task:gen_*"
    keys = redis_client.keys(pattern)
    if keys:
        redis_client.delete(*keys)
    return f"Cleaned up {len(keys)} old task keys"
