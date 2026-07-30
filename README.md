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
  <a href="README.md">🇨🇳 中文</a> &nbsp;·&nbsp; <a href="README_EN.md">🇺🇸 English</a>
</p>

---

## 🌟 About

PixelForge 是一个面向独立游戏开发者与像素美术爱好者的**端到端 AI 像素角色生成 SaaS 平台**。

在传统的像素角色工作流中，从零设计一个多方向、多帧动作的精灵图通常需要数小时的手绘与动画调整——**而 PixelForge 将这个过程压缩到 60 秒以内**。用户只需填写风格提示词与随机种子，系统即可：

1. 通过 Serverless ComfyUI 工作流调用 RunPod GPU 生成多方向像素精灵图
2. 由 Celery 异步队列管理大规模生成任务并流式推送进度
3. 前端 PixiJS Canvas 实时播放帧动画、导出精灵图与逐帧检查
4. 生成产物自动存入 Cloudflare R2 对象存储，全球边缘节点低延迟分发

> **为什么我们不直接用 Midjourney / DALL·E？** 通用文生图模型在像素画领域存在三个难以克服的工程瓶颈：难以保证方向一致性（常见正面/背面比例崩坏）、无法直接导出带透明通道的逐帧精灵图、以及不支持程序化的批量种子复现。PixelForge 针对 ComfyUI 工作流进行了专门的像素风格 LoRA 固化与后处理管线，就是为了解决这三个通用方案无法覆盖的垂直场景痛点。

---

## ✨ Key Features

| Feature | Description | Trade-off Note |
|---------|-------------|----------------|
| **⚡ AI 多方向精灵图生成** | 基于 ComfyUI 自定义工作流 + RunPod Serverless GPU，支持正面/背面/侧面 4 向一致性输出 | ⚠️ 生成质量高度依赖 RunPod 端点的 LoRA 权重与工作流版本 |
| **🔄 WebSocket 实时进度流** | 任务状态（排队/生成中/完成/失败）秒级推送，无轮询开销 | ⚠️ 浏览器标签页休眠时需手动重连 |
| **🖼️ PixiJS 精灵图预览器** | 支持逐帧播放、速度调节、单帧检查、整页精灵图 PNG 导出 | ⚠️ 8 方向以上的超大精灵图在移动设备 Safari 上可能出现掉帧 |
| **🚀 Celery 异步任务编排** | 基于 Redis 的 Celery Worker + Beat + Flower，支持生成与后处理多队列并发调度 | ⚠️ 单 Worker 默认并发 4，超高并发场景需水平扩容 Worker 实例 |
| **☁️ Cloudflare R2 边缘存储** | S3 兼容 API，全球 300+ 节点分发，0 出站流量费 | ⚠️ 小文件批量上传需走 S3 Batch，单次 PUT 吞吐有上限 |
| **🐳 一键容器化编排** | Docker Compose 启动 7 个微服务（Postgres/Redis/API/Worker/Beat/Flower/Frontend） | ⚠️ 本地开发镜像大小约 4.2GB，首次拉取需要稳定网络 |

---

## ⚙️ Requirements

运行 PixelForge 之前，请确认你本地或服务器已安装：

| Prerequisite | Minimum Version | Notes |
|-------------|-----------------|-------|
| **Docker** | ≥ 24.0 + Compose v2 | 推荐方式；7 个微服务统一编排 |
| **Node.js** | ≥ 22（推荐 22 LTS） | 仅本地手动构建 Frontend 时需要 |
| **pnpm** | ≥ 10.25.0 | 与 `frontend/package.json` `packageManager` 字段对齐 |
| **uv** | ≥ 0.4 | 仅本地手动构建 Backend 时需要（替代 pip + venv） |
| **Python** | ≥ 3.12 | 由 uv 自动管理，无需手动处理 |
| **RunPod 账户** | — | 需要 API Key + Endpoint ID（部署 ComfyUI 工作流） |
| **Cloudflare R2** | — | 需要 Account ID / Access Key / Bucket（存储生成产物） |

---

## 📦 Installation

### Option A：Docker Compose（推荐，零环境依赖）

启动 7 个微服务：PostgreSQL 16、Redis 7、FastAPI、Celery Worker、Celery Beat、Flower 监控、Next.js 前端。

```bash
# 1. Clone the repository
git clone https://github.com/MeiSiristhebest/pixelForge.git
cd pixelForge

# 2. Copy environment files (see "Configuration" section for required secrets)
cp backend/.env.example backend/.env

# 3. Start all services in the background (~4 GB total images)
docker compose up -d
```

**启动成功后访问：**

| Service | URL |
|---------|-----|
| Next.js Frontend | [`http://localhost:3000`](http://localhost:3000) |
| FastAPI REST API | [`http://localhost:8000`](http://localhost:8000) |
| Interactive OpenAPI (Swagger) | [`http://localhost:8000/docs`](http://localhost:8000/docs) |
| Celery Flower (Task Monitor) | [`http://localhost:5555`](http://localhost:5555) |
| PostgreSQL (direct) | `postgresql://pixelforge:pixelforgepass@localhost:5432/pixelforge` |
| Redis (direct) | `redis://localhost:6379/0` |

停止与清理：

```bash
# Stop all services (keep volumes)
docker compose stop

# Full teardown (remove volumes = WIPE DB + cache data)
docker compose down -v
```

---

### Option B：本地手动搭建（适合二次开发/调试）

仅推荐在需要单步调试 AI 工作流或前端热更新时使用。

#### 1. 启动基础中间件

```bash
cd pixelForge
docker compose up -d postgres redis
```

#### 2. 启动 FastAPI + Celery（Backend）

```bash
cd backend

# 用 uv 创建虚拟环境 + 安装依赖（replaces pip + venv）
uv sync --dev

# 启动 FastAPI（热重载，端口 8000）
uv run uvicorn app.main:app --reload --port 8000

# 新终端 1：启动 Celery Worker（4 并发，队列：generation + celery）
uv run celery -A app.celery_app.app worker --loglevel=info --concurrency=4 -Q generation,celery

# 新终端 2：启动 Celery Beat（定时任务调度）
uv run celery -A app.celery_app.app beat --loglevel=info
```

#### 3. 启动 Next.js 16（Frontend）

```bash
cd frontend

# 安装依赖（pnpm 10.25，已锁版本）
pnpm install

# 启动开发服务器（Turbopack 加速，端口 3000）
pnpm dev
# 等价于 next dev --turbopack
```

---

### 🔧 Configuration（`backend/.env` 必填密钥）

`cp backend/.env.example backend/.env` 后，必须填写以下带 `your_*` 占位符的字段：

```env
# ===== Core =====
APP_ENV=development          # development / production
DEBUG=true
CORS_ORIGINS=http://localhost:3000

# ===== Database & Redis =====
DATABASE_URL=postgresql+asyncpg://pixelforge:pixelforgepass@postgres:5432/pixelforge
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/1

# ===== AI Execution (必填) =====
RUNPOD_API_KEY=your_runpod_api_key_here    # https://www.runpod.io/console/user/settings
RUNPOD_ENDPOINT_ID=your_endpoint_id_here   # Serverless 端点 ID（ComfyUI 工作流）

# ===== Cloud Storage (必填) =====
R2_ACCOUNT_ID=your_account_id              # Cloudflare 控制台 → R2 → Account Details
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET=pixelforge-assets
R2_PUBLIC_URL=https://your-public-domain.r2.dev
```

> 📌 **生产部署提示**：R2_PUBLIC_URL 建议绑定自定义域名（如 `assets.pixelforge.io`），并启用 Cloudflare Cache Rules 缓存 PNG 精灵图 7 天，可进一步降低 R2 GET 请求费用与 CDN 首字节时延。

---

## 🚀 Quick Start（5 分钟跑通端到端）

> 假设你已经按 **Option A** 启动了全部服务，并在 `backend/.env` 中正确填写了 RunPod 与 R2 密钥。

**Step 1：验证健康检查**

```bash
curl -s http://localhost:8000/health
```

**预期 JSON 输出**：

```json
{
  "status": "ok",
  "version": "0.1.0",
  "celery_worker_count": 1,
  "redis_conn": "healthy",
  "postgres_conn": "healthy"
}
```

**Step 2：提交一张精灵图生成任务**

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

**预期 JSON 输出**（立即返回，不等待完成）：

```json
{
  "task_id": "pf-01J2XYZ9A1B2C3D4E5F6",
  "status": "queued",
  "progress": 0,
  "ws_url": "ws://localhost:8000/ws/task/pf-01J2XYZ9A1B2C3D4E5F6",
  "estimated_eta_seconds": 52
}
```

**Step 3：浏览器查看结果**

打开 [`http://localhost:3000/generate/pf-01J2XYZ9A1B2C3D4E5F6`](http://localhost:3000/generate/pf-01J2XYZ9A1B2C3D4E5F6)，可以看到：

- 顶部实时进度条（约 50s 从 0% → 100%，WebSocket 推送）
- 中部 PixiJS Canvas 预览：可切换 4 个方向、播放/暂停动画、调到单帧查看
- 右下角「Export Sprite Sheet」按钮：点击下载透明通道 PNG 精灵图

---

## 🏗️ Architecture & Tech Stack

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
| **Frontend** | Next.js 16 (App Router, Turbopack)、TypeScript 5.9、Tailwind CSS 4.2、PixiJS 8.6、React Three Fiber (drei)、Framer Motion 12 |
| **Backend API** | Python 3.12、FastAPI 0.115+、Uvicorn 0.34+、Pydantic v2、SQLAlchemy 2 (async)、Alembic |
| **Async Task Layer** | Celery 5.4+、Redis 7、Flower 2（Task UI）、Celery Beat（周期调度） |
| **AI Workflows** | RunPod Serverless GPU Endpoints、ComfyUI 自定义工作流 + 像素风格 LoRA |
| **Database & Storage** | PostgreSQL 16（`pg_isready` 健康检查 + 数据持久卷）、Cloudflare R2（S3 API，全球边缘分发） |
| **Auth & Security** | FastAPI OAuth2 + JWT (`python-jose` + `passlib[bcrypt]`)、CORS 白名单 |
| **DevOps** | Docker 多阶段构建镜像、Docker Compose v2 编排、Ruff（lint+格式化）、Pyright strict（类型检查）、Biome（前端 lint+format） |

---

## 📚 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET`  | `/health` | 综合健康检查（DB + Redis + Worker 数） | No |
| `POST` | `/api/v1/auth/register` | 用户注册（email + 密码 bcrypt 哈希入 Pg） | No |
| `POST` | `/api/v1/auth/login` | 登录换取 JWT access token | No |
| `POST` | `/api/v1/generate` | 提交精灵图生成任务（返回 task_id + ETA） | ✅ Bearer JWT |
| `GET`  | `/api/v1/tasks/{task_id}` | 查询任务状态 + 进度 + 产物 R2 下载 URL | ✅ Bearer JWT |
| `GET`  | `/api/v1/tasks` | 分页查询当前用户历史任务列表 | ✅ Bearer JWT |
| `WS`   | `/ws/task/{task_id}` | WebSocket 实时流式推送 progress（排队 / 0~100 / 完成 / 失败） | No（task_id 保密即可） |

更完整的 Request / Response Schema 示例请访问 Swagger：[`/docs`](http://localhost:8000/docs)。

---

## 📂 Directory Structure

```text
pixelForge/
├── frontend/                      # Next.js 16 App Router 前端（pnpm 10.25）
│   ├── src/
│   │   ├── app/                   # App Router 页面 (generate/, tasks/, auth/login, ...)
│   │   ├── components/            # UI + PixiJS Canvas + R3F 预览组件
│   │   ├── hooks/                 # React hooks：useWebSocketTask、useSpritePlayer
│   │   ├── lib/                   # API client、工具函数、R2 下载 helpers
│   │   └── types/                 # TypeScript 类型声明（Task / SpriteSheet / Frame）
│   ├── public/                    # 静态占位图、favicon
│   ├── package.json               # packageManager = pnpm@10.25.0
│   └── Dockerfile                 # 多阶段：pnpm install → next build → production runner
├── backend/                       # FastAPI + uv 后端
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/            # auth / generation / health（每个路由独立文件）
│   │   ├── celery_app/            # Celery Worker + Beat 入口、generation 任务定义
│   │   ├── core/                  # 配置、安全（JWT + bcrypt）、CORS 设置
│   │   ├── models/                # SQLAlchemy ORM 模型：User / Task / RefreshToken
│   │   ├── services/              # RunPod Wrapper、R2 Storage Wrapper、WS Manager
│   │   ├── config.py              # pydantic-settings 环境变量声明
│   │   └── main.py                # FastAPI lifespan + Router include + WS endpoint
│   ├── alembic/                   # 数据库 Migration（SQLAlchemy → Alembic）
│   ├── pyproject.toml             # 依赖声明（uv + hatchling build backend）
│   ├── .env.example               # 必填密钥模板（复制为 .env 使用）
│   └── Dockerfile                 # 多阶段：uv sync → uvicorn / celery 启动入口
├── shared/                        # 跨前后端共享的类型定义与常量（WIP）
├── docker-compose.yml             # 7 服务编排（pg/redis/api/worker/beat/flower/frontend）
├── .gitignore
└── README.md
```

---

## 🤝 Contributing

> 这是一个新起的开源项目，所有 Issue / PR / Feature Request 都极其欢迎 🙏

**快速上手开发**：

```bash
# 1. Fork & Clone
git clone https://github.com/<YOUR_USERNAME>/pixelForge.git
cd pixelForge

# 2. 启动中间件 + Backend（uv sync）+ Frontend（pnpm install）
# 参见 Installation → Option B

# 3. 创建分支（惯例：feat/xxx、fix/yyy、docs/zzz）
git checkout -b feat/support-sprite-sheet-auditing

# 4. 跑 lint / typecheck（前后端各跑一套）
cd backend  && uv run ruff check . && uv run pyright
cd frontend && pnpm lint:fix      && pnpm type-check

# 5. 提交 PR → 默认 main 分支，CI 通过后合并
```

还没想好贡献什么？欢迎先看 [Good First Issue（创建列表ing）](https://github.com/MeiSiristhebest/pixelForge/issues)。

---

## 🔒 Security

- **生产部署务必**：
  - 将 `APP_ENV=production` 且 `DEBUG=false`
  - `CORS_ORIGINS` 只允许自己的前端域名，**不要在生产写 `*`**
  - `backend/.env` 文件权限 600，绝不要 commit 到 Git（.gitignore 已屏蔽，但请二次确认）
  - 反向代理到 API 时请启用 HTTPS（Let's Encrypt + Nginx 或 Cloudflare Full (Strict)）
  - PostgreSQL 与 Redis **不要暴露公网端口**，Compose 中对外仅开 3000（前端）/ 8000（API）+ 5555（Flower，建议内网）
- **漏洞上报**：请发送邮件至 **`pixelforge-security [at] googlegroups [dot] com`**（将 [at] 替换为 @）；我们承诺在 48 小时内首次回复，关键漏洞 72 小时内修复并致谢。
- 严禁在公开 Issue 中直接披露未修复的安全漏洞细节。

---

## 📄 License

**PixelForge** 基于 **MIT License** 开源。这意味着：

- ✅ 你可以自由地修改、商用、闭源分发 PixelForge 的代码
- ✅ 衍生作品只需保留一份版权声明与 MIT 原文
- ❌ 作者不对任何直接/间接使用损失承担责任

**版权声明**：Copyright (c) 2025–2026 PixelForge Contributors（MIT License）。

完整许可证原文请参阅仓库根目录下的 [`LICENSE`](LICENSE) 文件。
