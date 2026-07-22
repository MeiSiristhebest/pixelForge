# PixelForge 🎨✨

> **AI-Powered Pixel Character Generator SaaS Platform**

PixelForge is a modern, full-stack SaaS platform designed for high-performance AI generation of retro pixel art sprites, game characters, and assets. Built with Next.js 15, FastAPI, Celery, Redis, and integrated with ComfyUI / RunPod Serverless for ultra-fast AI rendering.

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python)
![Celery](https://img.shields.io/badge/Celery-5.3-green?style=flat-square&logo=celery)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat-square&logo=docker)
![License](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square)

---

## 🌟 Key Features

- **⚡ AI-Powered Generation**: Generate multi-directional pixel character sprite sheets with custom prompts and seeds.
- **🔄 Real-time WebSocket Updates**: Instant progress streaming for active generation tasks.
- **🖼️ PixiJS Sprite Preview**: Interactive canvas viewer for animation playback, frame inspection, and sprite sheet export.
- **🚀 Scalable Async Task Queue**: Celery worker architecture supported by Redis for managing heavy AI workloads.
- **☁️ Cloudflare R2 Integration**: S3-compatible cloud storage for low-latency image delivery.
- **🐳 One-Command Containerization**: Pre-configured Docker Compose setup for local development and production deployment.

---

## 🛠️ Architecture & Tech Stack

```mermaid
graph TD
    Client["Client Browser (Next.js 15 + PixiJS)"]
    API["FastAPI Backend Service"]
    Redis[("Redis Broker & Cache")]
    Worker["Celery Worker Queue"]
    AI["RunPod / ComfyUI Serverless AI"]
    Storage[("Cloudflare R2 Storage")]
    DB[("PostgreSQL Database")]

    Client -->|HTTP / WebSocket| API
    API -->|Submit Task| Redis
    Redis -->|Process Job| Worker
    Worker -->|Invoke Workflow| AI
    Worker -->|Save Sprite Artifact| Storage
    API -->|Persist Task Metadata| DB
```

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS, PixiJS, React Query |
| **Backend** | Python 3.12, FastAPI, Celery, Redis, SQLAlchemy / Alembic |
| **AI Workflows** | RunPod Serverless, ComfyUI API |
| **Database & Storage** | PostgreSQL, Cloudflare R2 (S3 API) |
| **DevOps** | Docker, Docker Compose |

---

## 🚀 Quick Start Guide

### Prerequisites

Make sure you have installed on your local system:
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [Node.js 22+](https://nodejs.org/)
- [Python 3.12+](https://www.python.org/)

---

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pixelForge.git
   cd pixelForge
   ```

2. Copy the example environment files:
   ```bash
   # Backend Environment
   cp backend/.env.example backend/.env

   # Frontend Environment
   cp frontend/.env.local.example frontend/.env.local
   ```

3. Configure your `backend/.env` file with required secrets:
   ```env
   # Core
   PROJECT_NAME="PixelForge API"
   SECRET_KEY="your-super-secret-key"
   
   # Database & Redis
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pixelforge"
   REDIS_URL="redis://localhost:6379/0"

   # AI Execution (RunPod / ComfyUI)
   RUNPOD_API_KEY="your_runpod_api_key"
   RUNPOD_ENDPOINT_ID="your_runpod_endpoint_id"

   # Cloud Storage (Cloudflare R2)
   R2_ACCOUNT_ID="your_account_id"
   R2_ACCESS_KEY_ID="your_access_key"
   R2_SECRET_ACCESS_KEY="your_secret_key"
   R2_BUCKET_NAME="pixelforge-sprites"
   ```

---

### Option A: Run with Docker Compose (Recommended)

Start all services (Frontend, Backend API, Postgres, Redis, Celery Worker, Flower) with a single command:

```bash
docker-compose up -d
```

#### Access Services:
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **FastAPI REST Service**: [http://localhost:8000](http://localhost:8000)
- **Interactive API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Flower Task Monitor**: [http://localhost:5555](http://localhost:5555)

---

### Option B: Local Manual Setup

#### 1. Start Database & Cache Services
```bash
docker-compose up -d postgres redis
```

#### 2. Run Backend API & Celery Worker
```bash
cd backend

# Create & activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --reload --port 8000

# Open a new terminal to start Celery worker
celery -A app.celery_app.app worker --loglevel=info
```

#### 3. Run Frontend Web App
```bash
cd frontend

# Install Node modules
npm install

# Start Next.js development server
npm run dev
```

---

## 📁 Directory Structure

```
pixelForge/
├── frontend/               # Next.js 15 Web Application
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   ├── components/     # UI & PixiJS Canvas components
│   │   ├── hooks/          # Custom React hooks (WebSockets, API)
│   │   ├── lib/            # Utility functions & API clients
│   │   └── types/          # TypeScript type declarations
│   ├── public/             # Static assets
│   ├── package.json
│   └── Dockerfile
├── backend/                # FastAPI Backend Service
│   ├── app/
│   │   ├── api/            # API v1 routes & endpoints
│   │   ├── celery_app/     # Asynchronous worker tasks
│   │   ├── core/           # Configuration & security settings
│   │   ├── models/         # SQLAlchemy ORM models
│   │   └── services/       # AI service wrappers & storage integrations
│   ├── alembic/            # Database migration scripts
│   ├── requirements.txt
│   └── Dockerfile
├── shared/                 # Shared schema definitions & specs
├── docker-compose.yml      # Multi-container orchestrator
├── .gitignore
└── README.md
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/generate` | Submit sprite sheet generation job |
| `GET` | `/api/v1/tasks/{task_id}` | Query generation task status & progress |
| `WS` | `/ws/task/{task_id}` | Real-time WebSocket connection for progress updates |
| `GET` | `/health` | Service health check |

Interactive OpenAPI documentation is available at `/docs` when running the backend.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
