FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:/app/.venv/bin:$PATH"

# Copy project files
COPY pyproject.toml uv.lock README.md ./

# Install dependencies with uv
RUN uv sync --frozen --no-dev --no-editable

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Default command for API server
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
