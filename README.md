# PixelForge 🎨

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

PixelForge æ˜¯ä¸€ä¸ªé¢‘å�‘ç‹¬ç«‹æ¸¸æˆå¼€å�‘è€…ä¸Žåƒç´ ç¾Žæœ¯çˆ±å¥½è€…çš„**ç«¯åˆ°ç«¯ AI åƒç´ è§’è‰²ç”Ÿæˆ SaaS å¹³å°**ã€‚

åœ¨ä¼ ç»Ÿçš„åƒç´ è§’è‰²å·¥ä½œæµä¸­ï¼Œä»Žé›¶è®¾è®¡ä¸€ä¸ªå¤šæ–¹åã€å¤šå¸§åŠ¨ä½œçš„ç²¾ç�µå›¾é€šå¸¸éœ€è¦•å°æ—¶çš„æ‰‹ç»˜ä¸ŽåŠ¨ç”»è°ƒæ•´â€”â€”**è€Œ PixelForge å°†è¿™ä¸ªè¿‡ç¨‹åŽ‹ç¼©åˆ° 60 ç§’ä»¥å†…**ã€‚ç”¨æˆ·åªéœ€å¡«å†™é£Žæ ¼æ��ç¤ºè¯ä¸Žéšæœºç§å­ï¼Œç³»ç»Ÿåå³ï¼š

1. é€šè¿‡ Serverless ComfyUI å·¥ä½œæµè°ƒç”¨ RunPod GPU ç”Ÿæˆå¤šæ–¹åƒç´ ç²¾ç�µå›¾
2. ç”± Celery å¼‚æ­¥é˜Ÿåˆ—ç®¡ç†å¤§è§„æ¨¡ç”Ÿæˆä»»åŠ¡å¹¶æµå¼ç‰©æŽ¨è¿›åº¦
3. å‰ç«¯ PixiJS Canvas å®žæ—¶æ’­æ”¾å¸§åŠ¨ç”»ã€å¯¼å‡ºç²¾ç�µå›¾ä¸Žé€å¸§æ£€æŸ¥
4. ç”Ÿæˆäº§ç‰©è‡ªåŠ¨å­˜å…¥ Cloudflare R2 å¯¹è±¡å­˜å‚¨ï¼Œå…¨çƒè¾¹ç¼˜èŠ‚ç‚¹ä½Žå»¶è¿Ÿåˆ†å

> **ä¸ºä»€ä¹ˆæˆ‘ä»¬ä¸ç›´æŽ¥ç”¨ Midjourney / DALLÂ·Eï¼** é€šç”¨æ–‡ç”Ÿå›¾æ¨¡åž‹åœ¨åƒç´ ç”»é¢†åŸŸå­˜åœ¨ä¸‰ä¸ªéšä»¥å…‹æœçš„å·¥ç¨‹ç“¶é¢ˆï¼šéšä»¥ä¿è¯æ–¹å‘ä¸€è‡´æ€§ï¼ˆå¸¸è§£é¢œé¢œ/èƒŒé¢æ¯ä¾‹å´©å��ï¼‰ã€æ— æ³•ç›´æŽ¥å¯¼å‡ºé€é€æ˜Žé€šé“çš„é€å¸§ç²¾ç�µå›¾ã€ä»¥åŠŠä¸æ”¯æŒç¨åºåºçš„æ‰¹é‡ç§å­¤å¤çŽ°ã€‚PixelForge é’ˆå¯¹ ComfyUI å·¥ä½œæµè¿›è¡Œäº†ä¸“é—¨çš„åƒç´ é£Žæ ¼ LoRA å›ºåŒ–ä¸Žå¤å¤ç®¡çº¿ï¼Œå°±æ˜¯ä¸ºäº†è§£å†³è¿™ä¸‰ä¸ªé€šç”¨æ–¹æ¡ˆæ— æ³•è¦†ç›–çš„åž‚ç›´åœºæ™¯ç—›ç‚¹ã€‚

---

## âœ¨ Key Features

| Feature | Description | Trade-off Note |
|---------|-------------|----------------|
| **âš¡ AI å¤šæ–¹åç²¾ç�µå›¾ç”Ÿæˆ** | åŸºäºŽ ComfyUI è‡ªå®šä¹‰å·¥ä½œæµ + RunPod Serverless GPUï¼Œæ”¯æŒ¯é¢œ/èƒŒé¢œ/ä¾§é¢œ 4 å‘ä¸€è‡´æ€§è¾“å‡º | âš ï¸ ç”Ÿæˆè´¨é‡Œé«˜åº¦ä¾èµ– RunPod ç«¯ç‚¹çš„ LoRA æé‡ä¸Žå·¥ä½œæµç‰ˆæœ¬ |
| **ðŸ”„ WebSocket å®žæ—¶è¿›åº¦æµ** | ä»»åŠ¡çŠ¶æ€ï¼ˆæŽ’é˜Ÿ/ç”Ÿæˆä¸­/å®Œæˆ/å¤±è´¥ï¼‰ç§’çº§æŽ¨é€ï¼Œæ— è½®è¯¢å¼€é”€ | âš ï¸ æµè§ˆå™¨æ ‡ç­¾é¡µä¼‘çœ æ—¶éœ€æ‰‹åŠ¨é‡è¿ž |
| **ðŸ–¼ï¸ PixiJS ç²¾ç�µå›¾é¢„è§ˆå™¨** | æ”¯æŒé€å¸§æ’­æ”¾ã€é€Ÿåº¦è°ƒèŠ‚ã€å•å¸§æ£€æŸ¥ã€æ•´é¡µç²¾ç�µå›¾ PNG å¯¼å‡º | âš ï¸ 8 æ–¹åä»¥ä¸Šçš„è¶…å¤§ç²¾ç�µå›¾åœ¨ç§»åŠ¨è®¾å¤‡ Safari ä¸Šå¯èƒ½å‡ºçŽ°æŽ‰å¸§ |
| **ðŸš€ Celery å¼‚æ­¥ä»»åŠ¡ç¼–æŽ’** | åŸºäºŽ Redis çš„ Celery Worker + Beat + Flowerï¼Œæ”¯æŒç”Ÿæˆä¸Žå¤å¤ç®å¤šé˜Ÿåˆ—å¹¶å‘è°ƒåº¦ | âš ï¸ å• Worker é»˜è®¤å¹¶å‘ 4ï¼Œè¶…é«˜å¹¶å‘åœºæ™¯éœ€æ°´å¹¶æ‰©å®¹ Worker å®žä¾‹ |
| **â˜ï¸ Cloudflare R2 è¾¹ç¼˜å­˜å‚¨** | S3 å…¼å®¹ APIï¼Œå…¨çƒ 300+ èŠ‚ç‚¹åˆ†åï¼Œ0 å‡ºç«™æµé‡è´¹ | âš ï¸ å°æ–‡ä»¶æ‰¹é‡ä¸Šä¼ éœ€èµ° S3 Batchï¼Œå•æ¬¡ PUT åå™æœ‰ä¸Šé™ |
| **ðŸ³ ä¸€é”®å®¹å™¨åŒ–ç¼–æŽ’** | Docker Compose å¯åŠ¨ 7 ä¸ªå¾®æœåŠ¡ï¼ˆPostgres/Redis/API/Worker/Beat/Flower/Frontendï¼‰ | âš ï¸ æœ¬åœ°å¼€å‘é•œåƒå¤§å°çº¦ 4.2GBï¼Œé¦æ¬¡æ‹‰åå–è¦ç¨³å®šç½‘ç»œ |

---

## âš™ï¸ Requirements

è¿è¡Œ PixelForge ä¹‹å‰ï¼Œè¯·ç¡®è®¤ä½ æœ¬åœ°æˆ–æœåŠ¡å™¨å·²å®‰è£…ï¼š

| Prerequisite | Minimum Version | Notes |
|-------------|-----------------|-------|
| **Docker** | â‰¥ 24.0 + Compose v2 | æŽ¨èæ°æ–¹å¼ï¼›7 ä¸ªå¾®æœåŠ¡ç»Ÿä¸€ç¼–æŽ’ |
| **Node.js** | â‰¥ 22ï¼ˆæŽ¨èæ° 22 LTSï¼‰ | ä»…æœ¬åœ°æ‰‹åŠ¨æž„å»º Frontend æ—¶éœ€è¦ |
| **pnpm** | â‰¥ 10.25.0 | ä¸Ž `frontend/package.json` `packageManager` å­—æ®µå¯¹é½ |
| **uv** | â‰¥ 0.4 | ä»…æœ¬åœ°æ‰‹åŠ¨æž„å»º Backend æ—¶éœ€è¦ï¼ˆæ›¿ä»£ pip + venvï¼‰ |
| **Python** | â‰¥ 3.12 | ç”± uv è‡ªåŠ¨ç®¡ç†ï¼Œæ— éœ€æ‰‹åŠ¨å¤ç |
| **RunPod è´¦æˆ·** | â€” | éœ€è¦ API Key + Endpoint IDï¼ˆéƒ¨ç½² ComfyUI å·¥ä½œæµï¼‰ |
| **Cloudflare R2** | â€” | éœ€è¦ Account ID / Access Key / Bucketï¼ˆå­˜å‚¨ç”Ÿæˆäº§ç‰©ï¼‰ |

---

## ðŸ“¦ Installation

### Option Aï¼šDocker Composeï¼ˆæŽ¨èæ°ï¼Œé›¶çŽ¯å¢ƒä¾èµ–ï¼‰

å¯åŠ¨ 7 ä¸ªå¾®æœåŠ¡ï¼šPostgreSQL 16ã€Redis 7ã€FastAPIã€Celery Workerã€Celery Beatã€Flower ç›‘æŽ§ã€Next.js å‰ç«¯ã€‚

```bash
# 1. Clone the repository
git clone https://github.com/MeiSiristhebest/pixelForge.git
cd pixelForge

# 2. Copy environment files (see "Configuration" section for required secrets)
cp backend/.env.example backend/.env

# 3. Start all services in the background (~4 GB total images)
docker compose up -d
```

**å¯åŠ¨æˆåŠŸåŽè®¿é—®ï¼š**

| Service | URL |
|---------|-----|
| Next.js Frontend | [`http://localhost:3000`](http://localhost:3000) |
| FastAPI REST API | [`http://localhost:8000`](http://localhost:8000) |
| Interactive OpenAPI (Swagger) | [`http://localhost:8000/docs`](http://localhost:8000/docs) |
| Celery Flower (Task Monitor) | [`http://localhost:5555`](http://localhost:5555) |
| PostgreSQL (direct) | `postgresql://pixelforge:pixelforgepass@localhost:5432/pixelforge` |
| Redis (direct) | `redis://localhost:6379/0` |

åœæ­¢ä¸Žæ¸…ç†ï¼š

```bash
# Stop all services (keep volumes)
docker compose stop

# Full teardown (remove volumes = WIPE DB + cache data)
docker compose down -v
```

---

### Option Bï¼šæœ¬åœ°æ‰‹åŠ¨æ‘å»ºï¼ˆé€‚åˆäºŒæ¬¡å¼€å‘/è°ƒè¯•ï¼‰

ä»…æŽ¨èæ°åœ¨éœ€è¦å•æ­¥è°ƒè¯• AI å·¥ä½œæµˆæˆ–å‰ç«¯çƒæ›´æ–°æ—¶ä½¿ç”¨ã€‚

#### 1. å¯åŠ¨åŸºç¡€ä¸­é—´ä»¶

```bash
cd pixelForge
docker compose up -d postgres redis
```

#### 2. å¯åŠ¨ FastAPI + Celeryï¼ˆBackendï¼‰

```bash
cd backend

# ç”¨ uv åˆ›å»ºè™šæ‹ŸçŽ¯å¢ƒ + å®‰è£…ä¾èµ–ï¼ˆreplaces pip + venvï¼‰
uv sync --dev

# å¯åŠ¨ FastAPIï¼ˆçƒé‡è½½ï¼Œç«¯å£ 8000ï¼‰
uv run uvicorn app.main:app --reload --port 8000

# æ–°ç»ˆç«¯ 1ï¼šå¯åŠ¨ Celery Workerï¼ˆ4 å¹¶å‘ï¼Œé˜Ÿåˆ—ï¼šgeneration + celeryï¼‰
uv run celery -A app.celery_app.app worker --loglevel=info --concurrency=4 -Q generation,celery

# æ–°ç»ˆç«¯ 2ï¼šå¯åŠ¨ Celery Beatï¼ˆå®šæ—¶ä»»åŠ¡è°ƒåº¦ï¼‰
uv run celery -A app.celery_app.app beat --loglevel=info
```

#### 3. å¯åŠ¨ Next.js 16ï¼ˆFrontendï¼‰

```bash
cd frontend

# å®‰è£…ä¾èµ–ï¼ˆpnpm 10.25ï¼Œå·²é”ç‰ˆæœ¬ï¼‰
pnpm install

# å¯åŠ¨å¼€å‘æœåŠ¡å™¨ï¼ˆTurbopack åŠ é€Ÿï¼Œç«¯å£ 3000ï¼‰
pnpm dev
# ç­‰ä»·äºŽ next dev --turbopack
```

---

### ðŸ”§ Configurationï¼ˆ`backend/.env` å¿…å¡«å¯†é’¥ï¼‰

`cp backend/.env.example backend/.env` åŽŒï¼Œå¿…é¡»å¡«å†™ä»¥ä¸‹å¸¦ `your_*` å� ä½ç¬¦çš„å­—æ®µï¼š

```env
# ===== Core =====
APP_ENV=development          # development / production
DEBUG=true
CORS_ORIGINS=http://localhost:3000

# ===== Database & Redis =====
DATABASE_URL=postgresql+asyncpg://pixelforge:pixelforgepass@postgres:5432/pixelforge
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/1

# ===== AI Execution (å¿…å¡«) =====
RUNPOD_API_KEY=your_runpod_api_key_here    # https://www.runpod.io/console/user/settings
RUNPOD_ENDPOINT_ID=your_endpoint_id_here   # Serverless ç«¯ç‚¹ IDï¼ˆComfyUI å·¥ä½œæµï¼‰

# ===== Cloud Storage (å¿…å¡«) =====
R2_ACCOUNT_ID=your_account_id              # Cloudflare æŽ§åˆ¶å°â†’ R2 â†’ Account Details
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET=pixelforge-assets
R2_PUBLIC_URL=https://your-public-domain.r2.dev
```

> ðŸ“Œ **ç”Ÿäº§éƒ¨ç½²æ��ç¤º**ï¼šR2_PUBLIC_URL å»ºè®®ç»‘å®šè‡ªå®šä¹‰åŸŸåï¼ˆå¦‚ `assets.pixelforge.io`ï¼‰ï¼Œå¹¶å¯ç”¨ Cloudflare Cache Rules ç¼“å­˜ PNG ç²¾ç�µå›¾ 7 å¤©ï¼Œå¯è¿›ä¸€æ­¥é™ä½Ž R2 GET è¯·æ±‚è´¹ç”¨ä¸Ž CDN é¦–å­—èŠ‚æ—¶å»¶ã€‚

---

## ðŸš€ Quick Startï¼ˆ5 åˆ†é’Ÿè·‘é€šç«¯åˆ°ç«¯ï¼‰

> å�‡è®¾ä½ å·²ç»å **Option A** å¯åŠ¨äº†å…¨éƒ¨æœåŠ¡ï¼Œå¹¶åœ¨ `backend/.env` ä¸­æ­£ç¡®å¡«å†™äº† RunPod ä¸Ž R2 å¯†é’¥ã€‚

**Step 1ï¼šéªŒè¯å�¥åº·æ£€æŸ¥**

```bash
curl -s http://localhost:8000/health
```

**é¢„æœŸ JSON è¾“å‡º**ï¼š

```json
{
  "status": "ok",
  "version": "0.1.0",
  "celery_worker_count": 1,
  "redis_conn": "healthy",
  "postgres_conn": "healthy"
}
```

**Step 2ï¼šæ��äº¤ä¸€å¼ ç²¾ç�µå›¾ç”Ÿæˆä»»åŠ¡**

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

**é¢„æœŸ JSON è¾“å‡º**ï¼ˆç«‹å³è¿”å›žï¼Œä¸ç­‰å¾…å®Œæˆï¼š

```json
{
  "task_id": "pf-01J2XYZ9A1B2C3D4E5F6",
  "status": "queued",
  "progress": 0,
  "ws_url": "ws://localhost:8000/ws/task/pf-01J2XYZ9A1B2C3D4E5F6",
  "estimated_eta_seconds": 52
}
```

**Step 3ï¼šæµè§ˆå™¨æŸ¥çœ‹ç»“æ**

æ‰“å¼€ [`http://localhost:3000/generate/pf-01J2XYZ9A1B2C3D4E5F6`](http://localhost:3000/generate/pf-01J2XYZ9A1B2C3D4E5F6)ï¼Œå¯èƒ½çœ‹åˆ°ï¼š

- é¡¶éƒ¨å®žæ—¶è¿›åº¦æï¼ˆçº¦ 50s ä»Ž 0% â†’ 100%ï¼ŒWebSocket æŽ¨é€ï¼
- ä¸­éƒ¨ PixiJS Canvas é¢„è§ˆï¼šå¯åˆ‡æ�¢ 4 ä¸ªæ–¹å‘ã€æ’­æ”¾/æš‚åšåŠ¨ç”»ã€è°ƒåˆ°å•å¸§æŸ¥çœ‹
- å³ä¸‹è§’ã€ŒExport Sprite Sheetã€�æŒ‰é’®ï¼šç‚¹å‡»ä¸‹è½½é€æ˜Žé€šé“ PNG ç²¾ç�µå›¾

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
| **Frontend** | Next.js 16 (App Router, Turbopack)ã€TypeScript 5.9ã€Tailwind CSS 4.2ã€PixiJS 8.6ã€React Three Fiber (drei)ã€Framer Motion 12 |
| **Backend API** | Python 3.12ã€FastAPI 0.115+ã€Uvicorn 0.34+ã€Pydantic v2ã€SQLAlchemy 2 (async)ã€Alembic |
| **Async Task Layer** | Celery 5.4+ã€Redis 7ã€Flower 2ï¼ˆTask UIï¼‰ã€Celery Beatï¼ˆå‘¨æœŸè°ƒåº¦ï¼‰ |
| **AI Workflows** | RunPod Serverless GPU Endpointsã€ComfyUI è‡ªå®šä¹‰å·¥ä½œæµ + åƒç´ é£Žæ ¼ LoRA |
| **Database & Storage** | PostgreSQL 16ï¼ˆ`pg_isready` å�¥åº·æ£€æŸ¥ + æ•°æ®æŒä¹…å·ï¼‰ã€Cloudflare R2ï¼ˆS3 APIï¼Œå…¨çƒè¾¹ç¼˜åˆ†å‘ï¼‰ |
| **Auth & Security** | FastAPI OAuth2 + JWT (`python-jose` + `passlib[bcrypt]`)ã€CORS ç™½åå•å |
| **DevOps** | Docker å¤šé˜¶æ®¶æž„å»ºé•œåƒå’ŒDocker Compose v2 ç¼–æŽ’é…Ruffï¼ˆlint+æ ¼å¼åŒ–ï¼‰ã€Pyright strictï¼ˆç±»åž‹æ£€æŸ¥ï¼‰ã€Biomeï¼ˆå‰ç«¯ lint+formatï¼‰ |

---

## ðŸ“š API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET`  | `/health` | ç»¼å�ˆå�¥åº·æ£€æŸ¥ï¼ˆDB + Redis + Worker æ•°ï¼‰ | No |
| `POST` | `/api/v1/auth/register` | ç”¨æˆ·æ³¨å†Œï¼ˆemail + å¯†ç  bcrypt å“ˆå¸Œå…¥ Pgï¼‰ | No |
| `POST` | `/api/v1/auth/login` | ç™»å½•æ�¢å JWT access token | No |
| `POST` | `/api/v1/generate` | æ��äº¤ç²¾ç�µå›¾ç”Ÿæˆä»»åŠ¡ï¼ˆè¿”å›ž task_id + ETAï¼‰ | âœ… Bearer JWT |
| `GET`  | `/api/v1/tasks/{task_id}` | æŸ¥è¯¢ä»»åŠ¡çŠ¶æ€ + è¿›åº¦ + äº§ç‰© R2 ä¸‹è½½ URL | âœ… Bearer JWT |
| `GET`  | `/api/v1/tasks` | åˆ†é¡µæŸ¥è¯¢å½“å‰ç”¨æˆ·åŽ†å²ä»»åŠ¡åˆ—è¡¨ | âœ… Bearer JWT |
| `WS`   | `/ws/task/{task_id}` | WebSocket å®žæ—¶æµå¼ç‰©æŽ¨è¿› progressï¼ˆæŽ’é˜Ÿ / 0~100 / å®Œæˆ / å¤±è´¥ï¼‰ | Noï¼ˆtask_id ä¿é›–å³å¯ï¼‰ |

æ›´å®Œæ•´çš„ Request / Response Schema ç¤ºä¾‹è¯·è®¿é—® Swaggerï¼š[`/docs`](http://localhost:8000/docs)ã€‚

---

## ðŸ“‚ Directory Structure

```text
pixelForge/
â”œâ”€â”€ frontend/                      # Next.js 16 App Router å‰ç«¯ï¼ˆpnpm 10.25ï¼‰
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ app/                   # App Router é¡µé¢ (generate/, tasks/, auth/login, ...)
â”‚   â”‚   â”œâ”€â”€ components/            # UI + PixiJS Canvas + R3F é¢„è§ˆç»„ä»¶
â”‚   â”‚   â”œâ”€â”€ hooks/                 # React hooksï¼šuseWebSocketTaskã€useSpritePlayer
â”‚   â”‚   â”œâ”€â”€ lib/                   # API clientã€å·¥å…·å‡½æ°ã€R2 ä¸‹è½½ helpers
â”‚   â”‚   â””â”€â”€ types/                 # TypeScript ç±»åž‹å£°æ˜Žï¼ˆTask / SpriteSheet / Frameï¼‰
â”‚   â”œâ”€â”€ public/                    # é�™æ€å� ä½ç½®å›¾ã€favicon
â”‚   â”œâ”€â”€ package.json               # packageManager = pnpm@10.25.0
â”‚   â””â”€â”€ Dockerfile                 # å¤šé˜¶æ®¶ï¼špnpm install â†’ next build â†’ production runner
â”œâ”€â”€ backend/                       # FastAPI + uv åŽç«¯
â”‚   â”œâ”€â”€ app/
â”‚   â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â”‚   â””â”€â”€ routes/            # auth / generation / healthï¼ˆæ¯ä¸ªè·¯ç”±ç‹¬ç«‹æ–‡ä»¶ï¼‰
â”‚   â”‚   â”œâ”€â”€ celery_app/            # Celery Worker + Beat å…¥å£ã€generation ä»»åŠ¡å®šä¹‰
â”‚   â”‚   â”œâ”€â”€ core/                  # é…ç½®ã€å®‰å…¨ï¼ˆJWT + bcryptï¼‰ã€CORS è®¾ç½®
â”‚   â”‚   â”œâ”€â”€ models/                # SQLAlchemy ORM æ¨¡åž‹ï¼šUser / Task / RefreshToken
â”‚   â”‚   â”œâ”€â”€ services/              # RunPod Wrapperã€R2 Storage Wrapperã€WS Manager
â”‚   â”‚   â”œâ”€â”€ config.py              # pydantic-settings çŽ¯å¢ƒå˜é‡å£°æ˜Ž
â”‚   â”‚   â””â”€â”€ main.py                # FastAPI lifespan + Router include + WS endpoint
â”‚   â”œâ”€â”€ alembic/                   # æ•°æ®åº“ Migrationï¼ˆSQLAlchemy â†’ Alembicï¼‰
â”‚   â”œâ”€â”€ pyproject.toml             # ä¾èµ–å£°æ˜Žï¼ˆuv + hatchling build backendï¼‰
â”‚   â”œâ”€â”€ .env.example               # å¿…å¡«å¯†é’¥æ¨¡æ�¿ï¼ˆå¤åˆ¶ä¸º .env ä½¿ç”¨ï¼‰
â”‚   â””â”€â”€ Dockerfile                 # å¤šé˜¶æ®¶ï¼šuv sync â†’ uvicorn / celery å¯åŠ¨å…¥å£
â”œâ”€â”€ shared/                        # è·¨å‰åŽç«¯å…±äº«çš„ç±»åž‹å®šä¹‰ä¸Žå¸¸é‡ï¼ˆWIPï¼‰
â”œâ”€â”€ docker-compose.yml             # 7 æœåŠ¡ç¼–æŽ’ï¼ˆpg/redis/api/worker/beat/flower/frontendï¼‰
â”œâ”€â”€ .gitignore
â””â”€â”€ README.md
```

---

## ðŸ¤ Contributing

> è¿™æ˜¯ä¸€ä¸ªæ–°èµ·çš„å¼€æº�é¡¹ç›®ï¼Œæ‰€æœ‰ Issue / PR / Feature Request éƒ½æž¶å…¶æ¬¢è¿Ž ðŸ™

**å¿«é€Ÿä¸Šæ‰‹å¼€å‘**ï¼š

```bash
# 1. Fork & Clone
git clone https://github.com/<YOUR_USERNAME>/pixelForge.git
cd pixelForge

# 2. å¯åŠ¨ä¸­é—´ä»¶ + Backendï¼ˆuv syncï¼‰+ Frontendï¼ˆpnpm installï¼‰
# å�‚è§ Installation â†’ Option B

# 3. åˆ›å»ºåˆ†æ”¯ï¼ˆæƒ¯ä¾‹ï¼šfeat/xxxã€fix/yyyã€docs/zzzï¼‰
git checkout -b feat/support-sprite-sheet-auditing

# 4. è·‘ lint / typecheckï¼ˆå‰åŽç«¯å„è·‘ä¸€å¥—ï¼‰
cd backend  && uv run ruff check . && uv run pyright
cd frontend && pnpm lint:fix      && pnpm type-check

# 5. æ��äº¤ PR â†’ é»˜è®¤ main åˆ†æ”¯ï¼ŒCI é€šè¿‡åŽŒåˆ°å¸
```

è¿˜æ²¡æƒ³å¥½è´¡çŒ®ä»€ä¹ˆï¼Ÿæ¬¢è¿Žå…ˆçœ‹ [Good First Issueï¼ˆåˆ›å»ºåˆ—è¡¨ingï¼‰](https://github.com/MeiSiristhebest/pixelForge/issues)ã€‚

---

## ðŸ”’ Security

- **ç”Ÿäº§éƒ¨ç½®åŠ¡å¿…**ï¼š
  - å°† `APP_ENV=production` ä¸” `DEBUG=false`
  - `CORS_ORIGINS` åªè®¸å¯¹è‡ªå·±çš„å‰ç«¯åŸŸåï¼Œ**ä¸è¦åœ¨ç”Ÿäº§å†™ `*`**
  - `backend/.env` æ–‡ä»¶æé™ 600ï¼Œç»ä¸è¦ commit åˆ° Gitï¼ˆ.gitignore å·²å±è”½ï¼Œä½†è¯·äºŒæ¬¡ç¡®è®¤ï¼‰
  - å��å‘æ‰£ç‹†åˆ° API æ—¶è¯·å¯ç”¨ HTTPSï¼ˆLet's Encrypt + Nginx æˆ– Cloudflare Full (Strict)ï¼‰
  - PostgreSQL ä¸Ž Redis **ä¸è¦æš´éœ²å…¬ç½‘ç«¯å£**ï¼ŒCompose ä¸­å¯¹å¤–ä»…å¼€ 3000ï¼ˆå‰ç«¯ï¼‰/ 8000ï¼ˆAPIï¼‰+ 5555ï¼ˆFlowerï¼Œå»ºè®®å†…ç½‘ï¼‰
- **æ¼å‹šä¸ŠæŠ¥**ï¼šè¯·å‘é€‰é‚®ä»¶è‡³ **`pixelforge-security [at] googlegroups [dot] com`**ï¼ˆå°† [at] æ›¿æ¢ä¸º @ï¼‰ï¼›æˆ‘ä»¬æ‰¿è¯ºåœ¨ 48 å°æ—¶å†…é¦æ¬¡å›žå¤ï¼Œå…³é”®æ¼å‹š 72 å°æ—¶å†…ä¿®å¤å¹¶è‡´è°¢ã€‚
- ä¸¥ç¦åœ¨å…¬å¼€ Issue ä¸­ç›´æŽ¥æ«éœ²æœªä¿®å¤çš„å®‰å…¨æ¼å‹šç»†èŠ‚ã€‚

---

## ðŸ“„ License

**PixelForge** åŸºäºŽ **MIT License** å¼€æºã€‚è¿™æ„å‘³ç�€ï¼š

- âœ… ä½ å¯ä»¥è‡ªç”±åœ°ä¿®æ”¹ã€å•ç”¨ã€é­æºåˆ†å PixelForge çš„ä»£ç 
- âœ… è¡ç”Ÿä½œå“ªéœ€ä¿ç•™ä¸€ä»½ç‰ˆæ�ƒå£°æ˜Žä¸Ž MIT åŽŸæ–‡
- âŒ æœä½œè€…ä¸å¯¹ä»»ä½•ç›´æŽ¥/é—´æŽ¥ä½¿ç”¨æŸå¤æ‰¿æ‹…è´£ä»»

**ç‰ˆæ�ƒå£°æ˜Ž**ï¼šCopyright (c) 2025â€“2026 PixelForge Contributorsï¼ˆMIT Licenseï¼‰ã€‚

å®Œæ•´è®¸å¯è¯æ–‡åŽŸæ–‡è¯·å�‚é˜…ä»“åº“æ¹å½•ä¸‹çš„ [`LICENSE`](LICENSE) æ–‡ä»¶ã€‚
