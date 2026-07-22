from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import get_settings
from app.api.routes import auth, generation, health
from app.services.websocket import connection_manager

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events."""
    # Startup
    print(f"Starting PixelForge API in {settings.app_env} mode")
    yield
    # Shutdown
    print("Shutting down PixelForge API")


app = FastAPI(
    title="PixelForge API",
    description="AI-Powered Pixel Character Generator",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["health"])
app.include_router(auth.router, prefix="/api/v1", tags=["authentication"])
app.include_router(generation.router, prefix="/api/v1", tags=["generation"])


@app.websocket("/ws/task/{task_id}")
async def websocket_endpoint(websocket: WebSocket, task_id: str):
    """WebSocket endpoint for real-time task updates."""
    await connection_manager.connect(websocket, task_id)
    try:
        while True:
            # Keep connection alive
            data = await websocket.receive_text()
            # Handle client messages if needed (e.g., cancel task)
    except WebSocketDisconnect:
        connection_manager.disconnect(websocket, task_id)
