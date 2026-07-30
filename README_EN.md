# PixelForge ðŸŽ¨

<p align="center">
  <strong>AI-Powered Pixel Character Generator SaaS Platform</strong>
</p>

<p align="center">
  <a href="https://github.com/MeiSiristhebest/pixelForge/actions/workflows/ci.yml"><img src="https://github.com/MeiSiristhebest/pixelForge/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI Status" /></a>
  <a href="https://github.com/MeiSiristhebest/pixelForge/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square" alt="License" /></a>
  <img src="https://img.shields.io/badge/Next.js-16.2.1-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat-square&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python-%E2%89%A53.12-3776AB?style=flat-square&logo=python" alt="Python" />
  <img src="https://img.shields.io/badge/Celery-5.4%2B-37814A?style=flat-square" alt="Celery" />
  <img src="https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat-square&logo=docker" alt="Docker" />
</p>

---

<p align="center">
  <a href="README.md">ðŸ‡¨ðŸ‡³ ä¸­æ–‡</a> &nbsp;Â·&nbsp; <a href="README_EN.md">ðŸ‡ºðŸ‡¸ English</a>
</p>

---

## ðŸŒŸ About

**PixelForge** is an **end-to-end AI pixel-character generation SaaS platform** built for indie game developers and pixel-art enthusiasts.

In a traditional pixel-art workflow, hand-drawing a single multi-direction, multi-frame sprite sheet and then refining the walk/attack/idle animations typically takes **hours**. PixelForge compresses that pipeline to **under 60 seconds**. Drop in a style prompt + a deterministic random seed, and the system:

1. Runs a serverless ComfyUI workflow on RunPod serverless GPUs to generate a multi-direction pixel sprite sheet.
2. Uses a Celery async task queue to schedule large-scale generation jobs and streams progress back over WebSocket.
3. Renders frame-by-frame animation previews in real time on a PixiJS Canvas â€” with per-frame scrubbing and one-click PNG export.
4. Persists finished artwork to Cloudflare R2 object storage for low-latency global edge delivery.

> **Why not just use Midjourney / DALLÂ·E?** Generic text-to-image models hit three hard engineering walls in pixel-art work: they can't guarantee directional consistency (front/back views often come out misshapen), they can't export per-frame sprites with clean alpha channels, and they don't support reproducible seed-based batch generation. PixelForge ships a purpose-built ComfyUI workflow with a dedicated pixel-art LoRA plus a post-processing pipeline specifically to fix these three vertical-market pain points.

---

## âœ¨ Key Features

| Feature | Description | Trade-off Note |
|---------|-------------|----------------|
| **âš¡ Multi-direction AI sprite generation** | Custom ComfyUI workflow on RunPod serverless GPUs; front / back / side 4-way consistency output. | âš ï¸ Output quality is tightly coupled to the LoRA weights + workflow version deployed on the RunPod endpoint. |
| **ðŸ”„ Real-time WebSocket progress** | Task states (queued / running / done / failed) pushed sub-second, zero polling overhead. | âš ï¸ Browser tabs that are background-suspended must manually reconnect on focus. |
| **ðŸ–¼ï¸ PixiJS sprite previewer** | Per-frame playback, speed control, single-frame inspection, and full-sheet PNG export with alpha. | âš ï¸ Very large sprite sheets (> 8 directions) may drop frames on mobile Safari. |
| **ðŸš€ Celery task orchestration** | Redis-backed Celery Worker + Beat + Flower; multi-queue concurrent scheduling for generation vs. post-processing. | âš ï¸ Single-worker concurrency defaults to 4; horizontally scale Worker replicas for burst workloads. |
| **â˜ï¸ Cloudflare R2 edge storage** | S3-compatible API; 300+ global POPs; zero egress fees. | âš ï¸ Bulk small-object uploads should use S3 Batch; per-PUT throughput is capped. |
| **ðŸ³ One-command container cluster** | Docker Compose boots a 7-service stack (Postgres / Redis / API / Worker / Beat / Flower / Frontend). | âš ï¸ First local pull is ~ 4.2 GB across all images; needs a stable internet connection. |

---

## âš™ï¸ Requirements

Before running PixelForge locally or on a server, make sure the following are available:

| Prerequisite | Minimum Version | Notes |
|-------------|-----------------|-------|
| **Docker** | â‰¥ 24.0 + Compose v2 | Recommended path; orchestrates all 7 microservices. |
| **Node.js** | â‰¥ 22 (22.x LTS preferred) | Only required if you are building the Frontend manually outside Docker. |
| **pnpm** | â‰¥ 10.25.0 | Must match the `packageManager` field in `frontend/package.json`. |
| **uv** | â‰¥ 0.4 | Only required if building the Backend manually (replaces pip + venv). |
| **Python** | â‰¥ 3.12 | Managed automatically by uv; no manual pyenv required. |
| **RunPod account** | â€” | Required: API Key + Endpoint ID that hosts your ComfyUI workflow. |
| **Cloudflare R2** | â€” | Required: Account ID / Access Key / Bucket for finished artwork storage. |

---

## ðŸ“¦ Installation

### Option A Â· Docker Compose (recommended â€” zero host dependencies)

Boots **7 microservices** in one command: PostgreSQL 16, Redis 7, FastAPI, Celery Worker, Celery Beat, Flower task UI, and the Next.js Frontend.

```bash
# 1. Clone the repository
git clone https://github.com/MeiSiristhebest/pixelForge.git
cd pixelForge

# 2. Copy the env template (see "Configuration" below for the required secrets)
cp backend/.env.example backend/.env

# 3. Start every service in the background (~ 4 GB total images)
docker compose up -d
```

**Endpoints after a healthy boot:**

| Service | URL |
|---------|-----|
| Next.js Frontend | [`http://localhost:3000`](http://localhost:3000) |
| FastAPI REST API | [`http://localhost:8000`](http://localhost:8000) |
| Interactive OpenAPI (Swagger) | [`http://localhost:8000/docs`](http://localhost:8000/docs) |
| Celery Flower (task monitor) | [`http://localhost:5555`](http://localhost:5555) |
| PostgreSQL (direct) | `postgresql://pixelforge:pixelforgepass@localhost:5432/pixelforge` |
| Redis (direct) | `redis://localhost:6379/0` |

**Stop / teardown:**

```bash
# Stop (keeps DB volumes + cached images)
docker compose stop

# Full teardown + VOLUME DELETE (= WIPE Postgres + Redis data â€” be careful)
docker compose down -v
```

---

### Option B Â· Manual local install (recommended for debugging / AI workflow tweaking)

Use this when you need to step-debug the AI generation workflow or want hot reload on frontend / backend simultaneously.

#### 1. Boot the shared middleware containers only

```bash
cd pixelForge
docker compose up -d postgres redis
```

#### 2. Boot FastAPI + Celery (Backend)

```bash
cd backend

# uv creates the venv + installs everything (replaces pip + venv)
uv sync --dev

# Run the FastAPI server with auto-reload on port 8000
uv run uvicorn app.main:app --reload --port 8000

# 2nd terminal â€” start the Celery Worker (concurrency 4; queues: generation + celery)
uv run celery -A app.celery_app.app worker --loglevel=info --concurrency=4 -Q generation,celery

# 3rd terminal â€” start Celery Beat (periodic task scheduler)
uv run celery -A app.celery_app.app beat --loglevel=info
```

#### 3. Boot Next.js 16 (Frontend)

```bash
cd frontend

# Install deps at the exact locked pnpm 10.25 version
pnpm install

# Start the Turbopack dev server on port 3000
pnpm dev
# Equivalent to: next dev --turbopack
```

---

### ðŸ”§ Configuration Â· required secrets in `backend/.env`

After `cp backend/.env.example backend/.env`, **fill in every `your_*` placeholder below** â€” generation jobs will fail otherwise:

```env
# ===== Core =====
APP_ENV=development          # development / production
DEBUG=true
CORS_ORIGINS=http://localhost:3000

# ===== Database & Redis =====
DATABASE_URL=postgresql+asyncpg://pixelforge:pixelforgepass@postgres:5432/pixelforge
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/1

# ===== AI Execution (MANDATORY) =====
RUNPOD_API_KEY=your_runpod_api_key_here    # https://www.runpod.io/console/user/settings
RUNPOD_ENDPOINT_ID=your_endpoint_id_here   # Serverless endpoint ID that hosts the ComfyUI workflow.

# ===== Cloud Storage (MANDATORY) =====
R2_ACCOUNT_ID=your_account_id              # Cloudflare Dashboard â†’ R2 â†’ Account Details
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET=pixelforge-assets
R2_PUBLIC_URL=https://your-public-domain.r2.dev
```

> ðŸ“Œ **Production tip:** Bind `R2_PUBLIC_URL` to a custom domain (e.g. `assets.pixelforge.io`) and enable a Cloudflare Cache Rule that caches PNG sprite sheets for 7 days â€” this further cuts R2 GET costs and reduces CDN TTFB.

---

## ðŸš€ Quick Start Â· end-to-end in 5 minutes

> This section assumes you already chose **Option A** above, every container is `healthy`, and the RunPod + R2 secrets in `backend/.env` are correctly populated.

**Step 1 Â· Verify the aggregate health check**

```bash
curl -s http://localhost:8000/health
```

**Expected JSON response:**

```json
{
  "status": "ok",
  "version": "0.1.0",
  "celery_worker_count": 1,
  "redis_conn": "healthy",
  "postgres_conn": "healthy"
}
```

**Step 2 Â· Submit a sprite-sheet generation job**

```bash
curl -s -X POST http://localhost:8000/api/v1/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "cute 16-bit pixel knight, cyan armor, idle animation, white background",
    "seed": 42,
    "directions": ["front", "back", "left", "right"],
    "frames_per_direction": 4,
    "style": "rpg_maker_vx"
  }'
```

**Expected JSON response** (returns immediately â€” the job runs asynchronously):

```json
{
  "task_id": "pf-01J2XYZ9A1B2C3D4E5F6",
  "status": "queued",
  "progress": 0,
  "ws_url": "ws://localhost:8000/ws/task/pf-01J2XYZ9A1B2C3D4E5F6",
  "estimated_eta_seconds": 52
}
```

**Step 3 Â· Visualise the finished artwork in the browser**

Open [`http://localhost:3000/generate/pf-01J2XYZ9A1B2C3D4E5F6`](http://localhost:3000/generate/pf-01J2XYZ9A1B2C3D4E5F6). You should see:

- A live progress bar at the top (WebSocket-driven, typically 0 % â†’ 100 % in ~ 50 s).
- A PixiJS Canvas preview in the middle: switch among the 4 directions, play / pause animation, scrub to a single frame.
- An **Export Sprite Sheet** button in the bottom-right corner to download a transparent-alpha PNG.

---

## ðŸ—ï¸ Architecture & Tech Stack

```mermaid
graph TD
    C[Client Browser\nNext.js 16 + PixiJS + R3F]
    F[FastAPI Backend\nPython 3.12 + AsyncPG]
    R[(Redis 7\nBroker + Result Backend)]
    W[Celery Workers\nQueue: generation + celery]
    B[Celery Beat\nPeriodic Task Scheduler]
    FL[Flower\nTask UI Monitor]
    AI[RunPod Serverless GPU\nComfyUI Custom Workflow]
    S3[(Cloudflare R2\nSprite Artifacts)]
    PG[(PostgreSQL 16\nTask Metadata + Auth)]

    C -- HTTP REST / WS --> F
    F -- Submit Job --> R
    R -- Process --> W
    W -- Invoke --> AI
    W -- Save PNG --> S3
    F -- Metadata + Auth --> PG
    B -- Dispatch periodic --> R
    FL -- Read statuses --> R

    classDef primary fill:#0ea5e9,stroke:#0369a1,color:#fff;
    classDef store fill:#10b981,stroke:#065f46,color:#fff;
    classDef compute fill:#f59e0b,stroke:#92400e,color:#fff;
    class C,F primary;
    class R,S3,PG store;
    class W,B,FL,AI compute;
```

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router, Turbopack), TypeScript 5.9, Tailwind CSS 4.2, PixiJS 8.6, React Three Fiber (drei), Framer Motion 12 |
| **Backend API** | Python 3.12, FastAPI 0.115+, Uvicorn 0.34+, Pydantic v2, SQLAlchemy 2 (async), Alembic |
| **Async task layer** | Celery 5.4+, Redis 7, Flower 2 (task UI), Celery Beat (periodic scheduling) |
| **AI workflows** | RunPod Serverless GPU endpoints, ComfyUI custom workflow with a pixel-art LoRA |
| **Database & storage** | PostgreSQL 16 (`pg_isready` health checks + persistent data volumes), Cloudflare R2 (S3 API, 300+ global POPs) |
| **Auth & security** | FastAPI OAuth2 + JWT via `python-jose` + `passlib[bcrypt]`; explicit CORS allow-list |
| **DevOps** | Docker multi-stage builds; Docker Compose v2 orchestration; Ruff (lint + format); Pyright strict (types); Biome (frontend lint + format) |

---

## ðŸ“š API Endpoints Overview

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET`  | `/health` | Aggregate health (DB + Redis + live Worker count) | No |
| `POST` | `/api/v1/auth/register` | Register a new user (email + bcrypt-hashed password stored in Postgres) | No |
| `POST` | `/api/v1/auth/login` | Exchange credentials for a JWT access token | No |
| `POST` | `/api/v1/generate` | Submit a sprite generation job (returns `task_id` + ETA) | âœ… Bearer JWT |
| `GET`  | `/api/v1/tasks/{task_id}` | Fetch job status + progress + signed R2 download URL for the finished sheet | âœ… Bearer JWT |
| `GET`  | `/api/v1/tasks` | Paginated list of the current user's historical jobs | âœ… Bearer JWT |
| `WS`   | `/ws/task/{task_id}` | WebSocket stream of progress events (queued / 0â€“100 / done / failed) | No (the opaque task_id acts as the secret) |

Complete OpenAPI request/response schemas and interactive Try-It-Out examples: Swagger UI at [`/docs`](http://localhost:8000/docs).

---

## ðŸ“‚ Directory Structure

```text
pixelForge/
â”œâ”€â”€ frontend/                      # Next.js 16 App Router (pnpm 10.25)
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ app/                   # App Router pages (generate/, tasks/, auth/login, â€¦)
â”‚   â”‚   â”œâ”€â”€ components/            # UI + PixiJS Canvas + R3F preview components
â”‚   â”‚   â”œâ”€â”€ hooks/                 # React hooks: useWebSocketTask, useSpritePlayer
â”‚   â”‚   â”œâ”€â”€ lib/                   # API client, helpers, R2 download utilities
â”‚   â”‚   â””â”€â”€ types/                 # TS interfaces (Task / SpriteSheet / Frame)
â”‚   â”œâ”€â”€ public/                    # Static placeholders, favicon
â”‚   â”œâ”€â”€ package.json               # packageManager = pnpm@10.25.0
â”‚   â””â”€â”€ Dockerfile                 # Multi-stage: pnpm install â†’ next build â†’ production runner
â”œâ”€â”€ backend/                       # FastAPI + uv backend
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ api/routes/            # auth / generation / health (one file per route)
â”‚   â”‚   â”œâ”€â”€ celery_app/            # Celery Worker + Beat entrypoints; `generation` task definitions
â”‚   â”‚   â”œâ”€â”€ core/                  # Settings, security (JWT + bcrypt), CORS configuration
â”‚   â”‚   â”œâ”€â”€ models/                # SQLAlchemy ORM models: User / Task / RefreshToken
â”‚   â”‚   â”œâ”€â”€ services/              # RunPod wrapper, R2 storage wrapper, WS manager
â”‚   â”‚   â”œâ”€â”€ config.py              # pydantic-settings env variable declarations
â”‚   â”‚   â””â”€â”€ main.py                # FastAPI lifespan + router includes + WS endpoint
â”‚   â”œâ”€â”€ alembic/                   # Database migrations (SQLAlchemy â†’ Alembic)
â”‚   â”œâ”€â”€ pyproject.toml             # Dependency manifest (uv + hatchling build backend)
â”‚   â”œâ”€â”€ .env.example               # Required secrets template (copy â†’ .env)
â”‚   â””â”€â”€ Dockerfile                 # Multi-stage: uv sync â†’ uvicorn / celery entrypoints
â”œâ”€â”€ shared/                        # Cross-stack shared type definitions & constants (WIP)
â”œâ”€â”€ docker-compose.yml             # 7-service orchestration (pg/redis/api/worker/beat/flower/frontend)
â”œâ”€â”€ .gitignore
â””â”€â”€ README.md / README_EN.md
```

---

## ðŸ¤ Contributing

> PixelForge is a **new** open-source project â€” every Issue / PR / Feature Request is warmly appreciated ðŸ™

**Getting started as a contributor:**

```bash
# 1. Fork & clone
git clone https://github.com/<YOUR_USERNAME>/pixelForge.git
cd pixelForge

# 2. Boot middleware + Backend (uv sync) + Frontend (pnpm install)
#    â†’ see Installation â†’ Option B above for the per-terminal commands

# 3. Create a branch (convention: feat/xxx, fix/yyy, docs/zzz)
git checkout -b feat/support-sprite-sheet-auditing

# 4. Run the lint + typecheck gates on both halves
cd backend  && uv run ruff check app tests && uv run pyright
cd frontend && pnpm lint:fix      && pnpm type-check

# 5. Open a PR. Merge target is the default `main` branch; CI greenlight required.
```

No idea where to begin? Check the [Good First Issue list](https://github.com/MeiSiristhebest/pixelForge/issues).

---

## ðŸ”’ Security

### Non-negotiable hardening checklist for production deployments

- Set `APP_ENV=production` **and** `DEBUG=false`.
- `CORS_ORIGINS` must only list **your frontend domain(s)** â€” never wildcard `*` in production.
- Keep `backend/.env` at mode `0600` (owner read/write only). The file is already `.gitignore`d â€” double-check before the first commit.
- Terminate TLS at the reverse proxy in front of the API (Let's Encrypt + Nginx or Cloudflare Full (Strict) SSL).
- Postgres and Redis should **never publish public ports**. Expose only: 3000 (Frontend), 8000 (API), 5555 (Flower â€” ideally bind to the internal / VPN interface only).

### Vulnerability disclosure

Send suspected issues (RLS bypass, signature-URL privilege escalation, client-side traces of `SUPABASE_SERVICE_ROLE_KEY`, etc.) **by email**, never in a public GitHub Issue:

**`pixelforge-security [at] googlegroups [dot] com`**

We reply within **48 hours** for the first acknowledgement; critical bugs get a fix and a public thanks within 72 hours.

---

## ðŸ“„ License

**PixelForge** is released under the **MIT License**. That means:

- âœ… You may freely modify, use commercially, or re-distribute PixelForge in source or binary form (open or closed source).
- âœ… A copy of the MIT license text plus the copyright notice below must be preserved in derivative works.
- âŒ The authors accept no liability for any direct or indirect damages arising from use.

**Copyright:** Copyright (c) 2025â€“2026 PixelForge Contributors. All Rights Reserved.

Full license text: [`LICENSE`](LICENSE).
