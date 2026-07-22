import uuid
from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, Index, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    username: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean, default=True, index=True
    )  # Index for filtering
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    generations: Mapped[list["Generation"]] = relationship(
        "Generation", back_populates="user", cascade="all, delete-orphan"
    )

    # schema-composite-index: Composite index for common queries
    __table_args__ = (
        Index("ix_users_email_active", "email", "is_active"),  # Login queries
    )


class Generation(Base):
    __tablename__ = "generations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    task_id: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    prompt: Mapped[str] = mapped_column(Text, nullable=False)
    style: Mapped[str] = mapped_column(String(50), nullable=False, index=True)  # Filter by style
    action: Mapped[str] = mapped_column(String(50), nullable=False, index=True)  # Filter by action
    status: Mapped[str] = mapped_column(
        String(50),
        default="QUEUED",
        index=True,  # Critical: filter by status
    )
    progress: Mapped[int] = mapped_column(default=0)
    sprite_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        index=True,  # Sort by creation date
    )
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="generations")

    # schema-composite-index: Composite indexes for common queries
    __table_args__ = (
        Index("ix_generations_user_status", "user_id", "status"),  # User's tasks by status
        Index("ix_generations_user_created", "user_id", "created_at"),  # User's tasks by date
        # schema-partial-index: Partial index for active tasks (saves space)
        Index(
            "ix_generations_active",
            "user_id",
            "task_id",
            postgresql_where=status.in_(["QUEUED", "PROCESSING", "GENERATING"]),
        ),
    )
