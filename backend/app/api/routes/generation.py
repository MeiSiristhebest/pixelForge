import uuid
from fastapi import APIRouter, HTTPException
from celery.result import AsyncResult

from app.models.schemas import GenerateRequest, GenerateResponse, TaskStatusResponse
from app.celery_app.tasks.generation import generate_sprite
from app.celery_app.app import celery_app

router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
async def create_generation(request: GenerateRequest):
    """Submit a new sprite generation task."""
    # Validate prompt
    if len(request.prompt) > 2000:
        raise HTTPException(status_code=400, detail="Prompt too long (max 2000 chars)")

    # Generate task ID
    task_id = f"gen_{uuid.uuid4().hex[:12]}"

    # Enqueue Celery task
    generate_sprite.apply_async(
        args=[task_id, request.prompt],
        kwargs={
            "style": request.style,
            "action": request.action,
        },
        task_id=task_id,
    )

    return GenerateResponse(
        task_id=task_id, status="QUEUED", websocket_url=f"/ws/task/{task_id}"
    )


@router.get("/tasks/{task_id}", response_model=TaskStatusResponse)
async def get_task_status(task_id: str):
    """Get task status (REST fallback for WebSocket)."""
    result = AsyncResult(task_id, app=celery_app)

    if result.state == "PENDING":
        return TaskStatusResponse(task_id=task_id, status="PENDING", progress=0)

    meta = result.info or {}

    return TaskStatusResponse(
        task_id=task_id,
        status=result.state,
        progress=meta.get("progress", 0),
        message=meta.get("message"),
        sprite_url=meta.get("sprite_url"),
        error=meta.get("error"),
    )
