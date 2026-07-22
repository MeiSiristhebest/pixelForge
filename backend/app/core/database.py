from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import get_settings

settings = get_settings()

# conn-pool-size: Configure connection pool for production
# Rule of thumb: pool_size = (num_workers * 2) + num_app_instances
# For Celery with 4 workers: (4 * 2) + 1 = 9, round to 10
engine = create_async_engine(
    settings.database_url,
    echo=settings.debug,
    pool_pre_ping=True,  # Verify connections before use
    pool_size=10,  # Base connection pool
    max_overflow=20,  # Extra connections when pool is exhausted
    pool_timeout=30,  # Wait time for connection from pool
    pool_recycle=1800,  # Recycle connections after 30 minutes
)

# Create async session factory
async_session_factory = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,  # Prevent lazy loading issues
)


# Base class for models
class Base(DeclarativeBase):
    pass


# Dependency to get DB session
async def get_db():
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


# Alternative: Session context manager for non-FastAPI use
from contextlib import asynccontextmanager


@asynccontextmanager
async def get_db_session():
    """Context manager for database session outside FastAPI."""
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
