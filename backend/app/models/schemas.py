from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime


# Request Models
class GenerateRequest(BaseModel):
    prompt: str = Field(
        ..., min_length=1, max_length=2000, description="Character description"
    )
    style: Literal["fantasy", "sci-fi", "medieval", "modern"] = "fantasy"
    action: Literal["idle", "walk", "run", "attack"] = "idle"


# Response Models
class GenerateResponse(BaseModel):
    task_id: str
    status: str
    websocket_url: str


class TaskStatusResponse(BaseModel):
    task_id: str
    status: str
    progress: int = 0
    message: Optional[str] = None
    sprite_url: Optional[str] = None
    error: Optional[str] = None
    created_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None


# Task Progress Update (for WebSocket)
class TaskProgressUpdate(BaseModel):
    task_id: str
    status: str
    progress: int
    message: Optional[str] = None
    sprite_url: Optional[str] = None
    error: Optional[str] = None
