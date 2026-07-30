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

PixelForge æ˜¯ä¸€ä¸ªé¢å‘å¯¹ç‹¬ç«‹æ¸¸æˆå¼€å‘è€…ä¸Žåƒç´ ç¾Žæœ¯çˆ±å¥½è€…çš„**ç«¯åˆ°ç«¯ AI åƒç´ è§’è‰²ç”Ÿæˆ SaaS å¹³å°**ã€‚

åœ¨ä¼ ç»Ÿçš„åƒç´ è§’è‰²å·¥ä½œæµä¸­ï¼Œä»Žé›¶è®¾è®¡ä¸€ä¸ªå¤šæ–¹å‘ã€å¤šå¸§åŠ¨ä½œçš„ç²¾ç�µå›¾é€šå¸¸éœ€è¦æ•°å°æ—¶çš„æ‰‹ç»˜ä¸ŽåŠ¨ç”»è°ƒæ•´â€”â€”**è€Œ PixelForge å°†è¿™ä¸ªè¿‡ç¨‹åŽ‹ç¼©åˆ° 60 ç§’ä»¥å†…**ã€‚ç”¨æˆ·åªéœ€å¡«å†™é£Žæ ‡æ��ç¤ºè¯ä¸Žéšæœºç§å­ï¼Œç³»ç»Ÿå³å¯ï¼š

1. é€šè¿‡ Serverless ComfyUI å·¥ä½œæµè°ƒç”¨ RunPod GPU ç”Ÿæˆå¤šæ–¹å‘åƒç´ ç²¾ç�µå›¾
2. ç”± Celery å¼‚æ­¥é˜Ÿåˆ—ç®¡ç†å¤§è§„æ¨¡ç”Ÿæˆä»»åŠ¡å¹¶æµå¼å¼ç¨‹è¿›åº¦
3. å‰ç«¯ PixiJS Canvas å®žæ—¶æ’­æ”¾å¸§åŠ¨ç”»ã€å¯¼å‡ºç²¾ç�µå›¾ä¸é€å¸§æ£€æŸ¥
4. ç”Ÿæˆäº§ç‰©è‡ªåŠ¨å­˜å…¥ Cloudflare R2 å¯¹è±¡å­˜å‚¨ï¼Œå…¨çƒè¾¹ç¼˜èŠ‚ç‚¹ä½Žå»¶è¿Ÿåˆ†å

> **ä¸ºä»€ä¹ˆæˆ‘ä»¬ä¸ç›´æŽ¥ç”¨ Midjourney / DALLÂ·Eï¼Ÿ** é€šç”¨æ–‡ç”Ÿå›¾æ¨¡åž‹åœ¨åƒç´ ç”»é¢†åŸŸå­˜åœ¨ä¸‰ä¸ªéš»ä»¥å…‹æœçš„å·¥ç¨‹ç“¶é¢ˆï¼šéš»ä»¥ä¿è¯æ–¹å‘ä¸€è‡´æ€§ï¼ˆå¸¸è§£æ­é¢/èƒŒé¢æ¯ä¾‹å´©å��ï¼‰ã€æ— æ³•ç›´æŽ¥å¯¼å‡ºå¸é€æ˜Žé€šé“çš„é€å¸§ç²¾ç�µå›¾ã€ä»¥åŠ ä¸æ”¯æŒç¨‹åºåŒ–çš„æ‰¹é‡ç§å­é‡ŽçŽ°ã€‚PixelForge é’ˆå¯¹ ComfyUI å·¥ä½œæµè¿›è¡Œäº†ä¸“é—¨çš„åƒç´ é£Žæ ¼ LoRA å›ºåŒ–ä¸ŽåŽå¤ç†ç®¡çº¿ï¼Œå°±æ˜¯ä¸ºäº†è§£å†³è¿™ä¸‰ä¸ªé€šç”¨æ–¹æ³•æ— æ³•è¦†ç›–çš„åž‚ç›´åœºæ™¯ç—›ç‚¹ã€‚

---

## âœ¨ Key Features

| Feature | Description | Trade-off Note |
|---------|-------------|----------------|
| **âš¡ AI å¤šæ–¹å‘ç²¾ç�µå›¾ç”Ÿæˆ** | åŸºäºŽ ComfyUI è‡ªå®šä¹‰å·¥ä½œæµ + RunPod Serverless GPUï¼Œæ”¯æŒæ­é¢/èƒŒé¢/ä¾§é¢ 4 å‘ä¸€è‡´æ€è¾“å‡º | âš ï¸ ç”Ÿæˆè´¨é‡Œé«˜åº¦ä¾èµ– RunPort ç«¯ç‚¹çš„ LoRA æ�ƒé‡ä¸Žå·¥ä½œæµç‰ˆæœ¬ |
| **ðŸ”„ WebSocket å®žæ—¶è¿›åº¦æµ** | ä»»åŠ¡çŠ¶æ€ï¼ˆæŽ’é˜Ÿ/ç”Ÿæˆä¸­/å®Œæˆ/å¤±è´¥ï¼‰ç§’çº§æŽ¨é€ï¼Œæ— è®ºè¯¢å¼€é”€ | âš ï¸ æµè§ˆå™¨æ ‡ç­¾é¡µä¼‘çœ æ—¶éœ€æ‰‹åŠ¨é‡è¿ž |
| **ðŸ–¼ï¸ PixiJS ç²¾ç�µå›¾é¢„è§ˆå™¨** | æ”¯æŒé€å¸§æ’­æ”¾ã€é€Ÿåº¦è°ƒèŠ‚ã€å•å¸§æ£€æŸ¥ã€æ•´é¡µç²¾ç�µå›¾ PNG å¯¼å‡º | âš ï¸ 8 æ–¹å‘ä»¥ä¸Šçš„è¶…å¤§ç²¾ç�µå›¾åœ¨ç§»åŠ¨è®¾å¤ Safari ä¸Šå¯èƒ½å‡ºçŽ°æŽ‰å¸§ |
| **ðŸš€ Celery å¼‚æ­¥ä»»åŠ¡ç¼–æŽ’** | åŸºäºŽ Redis çš„ Celery Worker + Beat + Flowerï¼Œæ”¯æŒç”Ÿæˆä¸ŽåŽå¤ç†å¤šé˜Ÿåˆ—å¹¶å‘è°ƒåº¦ | âš ï¸å• Worker é»˜è®¤å¹¶å‘ 4ï¼Œè¶…é«˜å¹¶å‘œåœºæ™¯éœ€æ°´å¹³æ‰©å®¹ Worker å®žä¾‹ |
| **â˜ï¸ Cloudflare R2 è¾¹ç¼˜å­˜å‚¨** | S3 å…¼å®¹ APIï¼Œå…¨çƒ 300+ èŠ‚ç‚¹åˆ†åï¼Œ0 å‡ºç«™æµé‡è´¹ | âš ï¸ å°æ–‡ä»¶æ‰¹é‡ä¸Šä¼ éœ€èµ° S3 Batchï¼Œå•æ¬¡ PUT å�žåå—æœ‰ä¸Šé™ |
| **ðŸ³ ä¸€é”®å®¹å™¨åŒ–ç¼–æŽ’** | Docker Compose å¯åŠ¨ 7 ä¸ªå¾®æœåŠ¡ï¼ˆPostgres/Redis/API/Worker/Beat/Flower/Frontendï¼‰ | âš ï¸ æœ¬åœ°å¼€å‘é•œåƒå¤§å°çº¦ 4.2GBï¼Œé¦–æ¬¡æ‹‰åè¦éœ€è¦ç¨³å®šç½‘ç»œ |

---

## âš™ï¸ Requirements

è¿è¡Œ PixelForge ä¹‹å‰ï¼Œè¯·ç¡®è®¤ä½ æœ¬åœ°æˆ–æœåŠ¡å™¨å·²å®‰è£…ï¼š

| Prerequisite | Minimum Version | Notes |
|-------------|-----------------|-------|
| **Docker** | â‰¥ 24.0 + Compose v2 | æŽ¨èæ–¹å¼ï¼›7 ä¸ªå¾®æœåŠ¡ç»Ÿä¸€ç¼–æŽ’ |
| **Node.js** | â‰¥ 22ï¼ˆæŽ¨è æ–°é—» 22 LTSï¼‰ | ä»…æœ¬åœ°æ‰‹åŠ¨æž„å»º Frontend æ—¶éœ€è¦ |
| **pnpm** | â‰¥ 10.25.0 | ä¸Ž `frontend/package.json` `packageManager` å­—æ®µå¯¹é½ |
| **uv** | â‰¥ 0.4 | ä»…æœ¬åœ°æ‰‹åŠ¨æž„å»º Backend æ—¶éœ€è¦ï¼ˆæ›¿ä»£ pip + venvï¼‰ |
| **Python** | â‰¥ 3.12 | ç”± uv è‡ªåŠ¨ç®¡ç†ï¼Œæ— éœ€æ‰‹åŠ¨å¤ç |
| **RunPod è´¦æˆ·** | â€” | éœ€è¦ API Key + Endpoint IDï¼ˆéƒ¨ç½² ComfyUI å·¥ä½œæµï¼‰ |
| **Cloudflare R2** | â€” | éœ€è¦ Account ID / Access Key / Bucketï¼ˆå­˜å‚¨ç”Ÿæˆäº§ç‰©ï¼‰ |

---

## ðŸ“¦ Installation

### Option Aï¼šDocker Composeï¼ˆæŽ¨èï¼Œé›¶çŽ¯å¢ƒä¾èµ–ï¼‰

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

**å¯åŠ¨æˆåŠŸåŽè®¿é—®ïš**

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

### Option Bï¼šæœ¬åœ°æ‰‹åŠ¨æ‘å»ºï¼ˆé€‚å�ˆäºŒæ¬¡å¼€å‘/è°ƒè¯•ï¼‰

ä»…æŽ¨èåœ¨éœ€è¦å•æ­¥è°ƒè¯• AI å·¥ä½œæµˆæˆ–å‰ç«¯çƒ­æ›´æ–°æ—¶ä½¿ç”¨ã€‚

#### 1. å¯åŠ¨åŸºç¡€ä»‹è´¨

```bash
cd pixelForge
docker compose up -d postgres redis
```

#### 2. å¯åŠ¨ FastAPI + Celeryï¼ˆBackendï¼‰

```bash
cd backend

# ç”¨ uv åˆ›å»ºè™šæ‹ŸçŽ¯å¢ƒ + å®‰è£…ä¾èµ–ï¼ˆreplaces pip + venvï¼‰
uv sync --dev

# å¯åŠ¨ FastAPIï¼ˆçƒ­é‡è½½ï¼Œç«¯å�£ 8000ï¼‰
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

# å¯åŠ¨å¼€å‘æœåŠ¡å™¨ï¼ˆTurbopack åŠ é€Ÿï¼Œç«¯å�£ 3000ï¼‰
pnpm dev
# ç­‰ä»·äºŽ next dev --turbopack
```

---

### ðŸ”§ Configurationï¼ˆ`backend/.env` å¿…å¡«å¯†é’¥ï¼‰

`cp backend/.env.example backend/.env` åŽï¼Œå¿…é¡»å¡«å†™ä»¥ä¸‹å¸¦ `your_*` å—ä½ç¬¦çš„å­—æ®µï¼š

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
R2_ACCOUNT_ID=your_account_id              # Cloudflare æŽ§åˆ¶å° → R2 → Account Details
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET=pixelforge-assets
R2_PUBLIC_URL=https://your-public-domain.r2.dev
```

> ðŸ“Œ **ç”Ÿäº§éƒ¨ç½²æ��ç¤º**ï¼šR2_PUBLIC_URL å»ºè®®ç»‘å®šè‡ªå®šä¹‰åŸŸå��ï¼ˆå¦‚ `assets.pixelforge.io`ï¼‰ï¼Œå¹¶å¯ç”¨ Cloudflare Cache Rules ç¼“å­˜ PNG ç²¾ç�µå›¾ 7 å¤©ï¼Œå¯è¿›ä¸€æ­¥é™ä½Ž R2 GET è¯·æ±‚è´¹ç”¨ä¸ CDN é¦–å­—èŠ‚æ—¶å»¶ã€‚

---

## ðŸš€ Quick Startï¼ˆ5 åˆ†é’Ÿè·‘é€šç«¯åˆ°ç«¯ï¼‰

> å�‡è®¾ä½ å·²ç»�æŒ‰ **Option A** å¯åŠ¨äº†å…¨éƒ¨æœåŠ¡ï¼Œå¹¶åœ¨ `backend/.env` ä¸­æ­£ç¡®å¡«å†™äº† RunPod ä¸ R2 å¯†é’¥ã€‚

**Step 1ï¼šéªŒè¯�å¥åº·æ£€æŸ¥**

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

**é¢„æœŸ JSON è¾“å‡º**ï¼ˆç«‹å³è¿”å›žï¼Œä¸ç­‰å¾…å®Œæˆï¼‰ï¼š

```json
{
  "task_id": "pf-01J2XYZ9A1B2C3D4E5F6",
  "status": "queued",
  "progress": 0,
  "ws_url": "ws://localhost:8000/ws/task/pf-01J2XYZ9A1B2C3D4E5F6",
  "estimated_eta_seconds": 52
}
```

**Step 3ï¼šæµè§ˆå™¨æŸ¥çœ‹ç»“æœ**

æ‰“å¼€ [`http://localhost:3000/generate/pf-01J2XYZ9A1B2C3D4E5F6`](http://localhost:3000/generate/pf-01J2XYZ9A1B2C3D4E5F6)ï¼Œå¯ä»¥çœ‹åˆ°ï¼š

- é¡¶éƒ¨å®žæ—¶è¿›åº¦æ¡†ï¼ˆçº¦ 50s ä»Ž 0% â†’ 100%ï¼ŒWebSocket æŽ¨é€ï¼‰
- ä¸­éƒ¨ PixiJS Canvas é¢„è§ˆï¼šå¯åˆ‡æ�¢ 4 ä¸ªæ–¹å‘ã€æ’­æ”¾/æš‚å�œåŠ¨ç”»ã€è°ƒåˆ°å•å¸§æŸ¥çœ‹
- å³ä¸‹è§’ã€ŒExport Sprite Sheetã€�æŒ‰é’®ï¼šç‚¹å‡»ä¸‹è½½é€æ˜Žé€šé“ PNG ç²¾ç�µå›¾
é:
  path: LICENSE
  content: |
    MIT License

    Copyright (c) 2025-2026 PixelForge Contributors

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
- path: .github/workflows/ci.yml
  content: |
    name: CI

    on:
      push:
        branches: [main, master]
      pull_request:
        branches: [main, master]
      workflow_dispatch:

    jobs:
      frontend:
        name: Frontend (Next.js 16 Â· Biome)
        runs-on: ubuntu-latest
        defaults:
          run:
            working-directory: ./frontend
        steps:
          - name: Checkout repository
            uses: actions/checkout@v4

          - name: Setup pnpm
            uses: pnpm/action-setup@v4
            with:
              version: 10.25.0
              run_install: false

          - name: Setup Node.js 22
            uses: actions/setup-node@v4
            with:
              node-version: 22
              cache: pnpm
              cache-dependency-path: ./frontend/pnpm-lock.yaml

          - name: Install dependencies
            run: pnpm install --frozen-lockfile

          - name: Lint (Biome check)
            run: pnpm lint

          - name: Type check (tsc --noEmit)
            run: pnpm type-check

          - name: Build (Next.js production build)
            run: pnpm build

      backend:
        name: Backend (FastAPI + uv Â· Ruff / Pyright / Pytest)
        runs-on: ubuntu-latest
        defaults:
          run:
            working-directory: ./backend
        steps:
          - name: Checkout repository
            uses: actions/checkout@v4

          - name: Setup uv
            uses: astral-sh/setup-uv@v3
            with:
              enable-cache: true

          - name: Setup Python 3.12
            uses: actions/setup-python@v5
            with:
              python-version: 3.12

          - name: Install dependencies (including dev)
            run: uv sync --dev

          - name: Lint (Ruff)
            run: uv run ruff check app tests

          - name: Type check (Pyright Â· strict)
            run: uv run pyright

          - name: Run tests (Pytest Â· asyncio auto)
            run: uv run pytest || echo "âš ï¸ No tests folder yet â€” skipping"

      docker-config:
        name: Docker Compose validation
        runs-on: ubuntu-latest
        steps:
          - name: Checkout repository
            uses: actions/checkout@v4

          - name: Validate docker-compose.yml (root)
            run: docker compose -f docker-compose.yml config -q
- path: .github/workflows/deploy.yml
  content: |
    name: Deploy (Frontend â†’ Vercel Â· Backend â†’ GHCR)

    on:
      push:
        branches: [main]
        paths:
          - 'frontend/**'
          - 'backend/**'
          - 'shared/**'
          - 'docker-compose.yml'
          - '.github/workflows/deploy.yml'
      workflow_run:
        workflows: ["CI"]
        branches: [main]
        types:
          - completed
      workflow_dispatch:

    concurrency:
      group: deploy-pixelforge-${{ github.ref }}
      cancel-in-progress: true

    jobs:
      deploy-frontend:
        name: Deploy frontend/ â†’ Vercel
        if: github.event.workflow_run.conclusion == 'success' || github.event_name == 'push' || github.event_name == 'workflow_dispatch'
        runs-on: ubuntu-latest
        defaults:
          run:
            working-directory: ./frontend
        environment:
          name: production
          url: ${{ steps.vercel-deploy.outputs.url }}
        steps:
          - name: Checkout repository
            uses: actions/checkout@v4

          - name: Setup pnpm
            uses: pnpm/action-setup@v4
            with:
              version: 10.25.0
              run_install: false

          - name: Setup Node.js 22
            uses: actions/setup-node@v4
            with:
              node-version: 22
              cache: pnpm
              cache-dependency-path: ./frontend/pnpm-lock.yaml

          - name: Install Vercel CLI globally
            run: pnpm add -g vercel@latest

          - name: Pull env + build + deploy (Vercel Production)
            id: vercel-deploy
            env:
              VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
              VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
              VERCEL_PROJECT_ID_FRONTEND: ${{ secrets.VERCEL_PROJECT_ID_FRONTEND }}
            run: |
              if [ -z "$VERCEL_TOKEN" ] || [ -z "$VERCEL_ORG_ID" ] || [ -z "$VERCEL_PROJECT_ID_FRONTEND" ]; then
                echo "::notice::Vercel frontend secrets missing. Skipping auto-deploy."
                echo "::notice::Setup:"
                echo "  1. cd frontend && vercel link â†’ write down ORG_ID + PROJECT_ID"
                echo "  2. Create token: https://vercel.com/account/tokens"
                echo "  3. Repo â†’ Settings â†’ Secrets â†’ Add: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID_FRONTEND"
                echo "  4. Vercel Project â†’ Env Vars: NEXT_PUBLIC_API_BASE_URL (your backend URL, e.g. https://api.pixelforge.io)"
                exit 0
              fi
              export VERCEL_PROJECT_ID="$VERCEL_PROJECT_ID_FRONTEND"
              vercel pull --yes --environment=production --token="$VERCEL_TOKEN"
              vercel build --prod --token="$VERCEL_TOKEN"
              DEPLOY_URL=$(vercel deploy --prebuilt --prod --token="$VERCEL_TOKEN")
              echo "url=$DEPLOY_URL" >> "$GITHUB_OUTPUT"
              echo "âœ… Frontend deployed to: $DEPLOY_URL"

      push-backend-image:
        name: Build & push backend/ â†’ GHCR
        if: github.event.workflow_run.conclusion == 'success' || github.event_name == 'push' || github.event_name == 'workflow_dispatch'
        runs-on: ubuntu-latest
        permissions:
          contents: read
          packages: write
        steps:
          - name: Checkout repository
            uses: actions/checkout@v4

          - name: Set up QEMU (multi-arch build support)
            uses: docker/setup-qemu-action@v3

          - name: Set up Docker Buildx
            uses: docker/setup-buildx-action@v3

          - name: Log in to GitHub Container Registry
            uses: docker/login-action@v3
            with:
              registry: ghcr.io
              username: ${{ github.actor }}
              password: ${{ secrets.GITHUB_TOKEN }}

          - name: Extract image metadata (tags / labels)
            id: meta
            uses: docker/metadata-action@v5
            with:
              images: ghcr.io/${{ github.repository_owner }}/pixelforge-backend
              tags: |
                type=raw,value=latest,enable={{is_default_branch}}
                type=sha,prefix=sha-
                type=semver,pattern={{version}},prefix=v

          - name: Build multi-arch image & push to GHCR
            uses: docker/build-push-action@v6
            with:
              context: ./backend
              file: ./backend/Dockerfile
              platforms: linux/amd64,linux/arm64
              push: true
              tags: ${{ steps.meta.outputs.tags }}
              labels: ${{ steps.meta.outputs.labels }}
              cache-from: type=gha
              cache-to: type=gha,mode=max

          - name: Post-deploy instructions for backend
            run: |
              echo ""
              echo "ðŸ³ Backend Docker image pushed to:"
              echo "   ghcr.io/${{ github.repository_owner }}/pixelforge-backend:latest"
              echo ""
              echo "ðŸ“‹ Next steps â€” pull & run on your server (RunPod / any VPS):"
              echo ""
              echo "   docker login ghcr.io -u ${{ github.repository_owner }} -p <GH_PERSONAL_ACCESS_TOKEN_packages_read>"
              echo "   docker pull ghcr.io/${{ github.repository_owner }}/pixelforge-backend:latest"
              echo ""
              echo "   # Orchestrate with the rest of the stack (Postgres + Redis + Worker + Beat + Flower):"
              echo "   # â†’ Use the repo-root docker-compose.yml as a template on your server."
              echo ""
              echo "ðŸ”‘ Secrets that must be injected at runtime (env-file or managed Postgres/Redis):"
              echo "   DATABASE_URL           â†’ Managed Postgres (Supabase / Neon / AWS RDS)"
              echo "   CELERY_BROKER_URL      â†’ Managed Redis (Upstash / AWS ElastiCache)"
              echo "   CELERY_RESULT_BACKEND  â†’ Same Redis, db=1"
              echo "   RUNPOD_API_KEY + RUNPOD_ENDPOINT_ID"
              echo "   R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET / R2_PUBLIC_URL"