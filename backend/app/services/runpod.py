import httpx
import asyncio
from typing import Dict, Any, Optional

from app.config import get_settings

settings = get_settings()


class RunPodService:
    """RunPod Serverless API client."""

    BASE_URL = "https://api.runpod.io"

    def __init__(self):
        self.api_key = settings.runpod_api_key
        self.endpoint_id = settings.runpod_endpoint_id
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    async def submit_job(self, input_data: Dict[str, Any]) -> str:
        """Submit a job to RunPod Serverless endpoint."""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.BASE_URL}/v2/{self.endpoint_id}/run",
                headers=self.headers,
                json={"input": input_data},
                timeout=30.0,
            )
            response.raise_for_status()
            data = response.json()
            return data["id"]

    async def get_job_status(self, job_id: str) -> Dict[str, Any]:
        """Get job status from RunPod."""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/v2/{self.endpoint_id}/status/{job_id}",
                headers=self.headers,
                timeout=30.0,
            )
            response.raise_for_status()
            return response.json()

    async def wait_for_completion(
        self,
        job_id: str,
        poll_interval: float = 2.0,
        max_wait: float = 600.0,
        progress_callback: Optional[Any] = None,
    ) -> Dict[str, Any]:
        """Poll job until completion with progress updates."""
        elapsed = 0.0

        while elapsed < max_wait:
            status = await self.get_job_status(job_id)
            job_status = status.get("status", "UNKNOWN")

            if job_status == "COMPLETED":
                return status.get("output", {})

            if job_status == "FAILED":
                error = status.get("error", "Unknown error")
                raise Exception(f"RunPod job failed: {error}")

            # Report progress if callback provided
            if progress_callback:
                delay_time = status.get("delayTime", 0)
                execution_time = status.get("executionTime", 0)
                await progress_callback(job_status, delay_time, execution_time)

            await asyncio.sleep(poll_interval)
            elapsed += poll_interval

        raise TimeoutError(f"RunPod job {job_id} timed out after {max_wait}s")


# Singleton instance
runpod_service = RunPodService()
