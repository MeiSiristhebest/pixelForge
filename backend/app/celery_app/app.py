from celery import Celery
from celery.schedules import crontab

from app.config import get_settings

settings = get_settings()

# Create Celery instance
celery_app = Celery(
    "pixelforge",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
    include=["app.celery_app.tasks.generation"],
)

# Configure Celery
celery_app.conf.update(
    task_serializer=settings.celery_task_serializer,
    result_serializer=settings.celery_result_serializer,
    accept_content=settings.celery_accept_content,
    timezone=settings.celery_timezone,
    result_expires=settings.celery_result_expires,
    task_time_limit=settings.celery_task_time_limit,
    task_soft_time_limit=settings.celery_task_soft_time_limit,
    broker_connection_retry_on_startup=True,
    worker_prefetch_multiplier=1,  # Fair task distribution
    worker_max_tasks_per_child=1000,  # Recycle workers periodically
)

# Task routing - different queues for different task types
celery_app.conf.task_routes = {
    "app.celery_app.tasks.generation.*": {"queue": "generation"},
}

# Periodic tasks (Celery Beat)
celery_app.conf.beat_schedule = {
    "cleanup-old-tasks": {
        "task": "app.celery_app.tasks.generation.cleanup_old_tasks",
        "schedule": crontab(hour=3, minute=0),  # Daily at 3 AM
    },
}
