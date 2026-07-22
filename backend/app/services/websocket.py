from fastapi import WebSocket
from typing import Dict, Set
import redis.asyncio as aioredis
import asyncio
import json

from app.config import get_settings

settings = get_settings()


class ConnectionManager:
    """Manages WebSocket connections per task_id."""

    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}
        self.redis: aioredis.Redis | None = None
        self._subscriber_tasks: Dict[str, asyncio.Task] = {}

    async def connect(self, websocket: WebSocket, task_id: str):
        """Accept a new WebSocket connection."""
        await websocket.accept()
        if task_id not in self.active_connections:
            self.active_connections[task_id] = set()
            # Start Redis subscriber for this task
            task = asyncio.create_task(self._redis_subscriber(task_id))
            self._subscriber_tasks[task_id] = task
        self.active_connections[task_id].add(websocket)

    def disconnect(self, websocket: WebSocket, task_id: str):
        """Remove a WebSocket connection."""
        if task_id in self.active_connections:
            self.active_connections[task_id].discard(websocket)
            if not self.active_connections[task_id]:
                del self.active_connections[task_id]
                # Cancel subscriber task
                if task_id in self._subscriber_tasks:
                    self._subscriber_tasks[task_id].cancel()
                    del self._subscriber_tasks[task_id]

    async def broadcast(self, task_id: str, message: dict):
        """Send message to all clients watching a task."""
        if task_id in self.active_connections:
            dead_connections = set()
            for connection in self.active_connections[task_id]:
                try:
                    await connection.send_json(message)
                except Exception:
                    dead_connections.add(connection)
            # Cleanup dead connections
            for conn in dead_connections:
                self.active_connections[task_id].discard(conn)

    async def _redis_subscriber(self, task_id: str):
        """Listen to Redis Pub/Sub for task updates."""
        try:
            if not self.redis:
                self.redis = aioredis.from_url(
                    settings.redis_url, decode_responses=True
                )

            pubsub = self.redis.pubsub()
            await pubsub.subscribe(f"task:{task_id}")

            async for message in pubsub.listen():
                if message["type"] == "message":
                    try:
                        data = json.loads(message["data"])
                        await self.broadcast(task_id, data)
                        # Stop subscribing if task is done
                        if data.get("status") in ("COMPLETED", "FAILED"):
                            break
                    except json.JSONDecodeError:
                        pass
        except asyncio.CancelledError:
            pass
        finally:
            if self.redis:
                try:
                    await pubsub.unsubscribe(f"task:{task_id}")
                except Exception:
                    pass


# Global instance
connection_manager = ConnectionManager()
