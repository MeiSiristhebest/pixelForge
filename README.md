# PixelForge 🎨

<p align="center">
  <strong>AI 驱动的像素角色生成 SaaS 平台</strong>
</p>

<p align="center">
  <a href="https://github.com/MeiSiristhebest/pixelForge/actions/workflows/ci.yml"><img src="https://github.com/MeiSiristhebest/pixelForge/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI Status" /></a>
  <a href="https://github.com/MeiSiristhebest/pixelForge/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square" alt="License" /></a>
  <img src="https://img.shields.io/badge/Next.js-16.2.1-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat-square&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python-≥3.12-3776AB?style=flat-square&logo=python" alt="Python" />
  <img src="https://img.shields.io/badge/Celery-5.4%2B-37814A?style=flat-square" alt="Celery" />
  <img src="https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat-square&logo=docker" alt="Docker" />
</p>

---

<p align="center">
  <a href="README.md">🇨🇳 中文</a> &nbsp;·&nbsp; <a href="README_EN.md">🇺🇸 English</a>
</p>

---

## 🌟 关于

**PixelForge** 是一款专为独立游戏开发者和像素艺术爱好者打造的 **端到端 AI 像素角色生成 SaaS 平台**。

在传统像素美术工作流中，手动绘制一个多方向、多帧的精灵图，然后调整其行走/攻击/待机动画通常需要 **数小时**。PixelForge 将该流程压缩至 **60 秒以内**。只需输入风格提示词和确定性随机种子，系统将：

1. 在 RunPod 无服务器 GPU 上运行 ComfyUI 工作流，生成多方向像素精灵图。
2. 使用 Celery 异步任务队列调度大规模生成作业，并通过 WebSocket 流式推送进度。
3. 在 PixiJS Canvas 上实时预览逐帧动画 —— 支持逐帧滑动和一键 PNG 导出。
4. 将完成的作品持久化存储到 Cloudflare R2 对象存储，实现低延迟全球边缘交付。

> **为什么不直接使用 Midjourney / DALL·E？** 通用文本到图像模型在像素艺术工作中面临三个硬工程瓶颈：它们无法保证方向一致性（前/后视图常常变形），无法导出具有干净 alpha 通道的逐帧精灵图，也不支持可复现的基于种子的批量生成。PixelForge 采用专门构建的 ComfyUI 工作流，配备专用的像素艺术 LoRA 及后处理管线，专门解决这三个垂直市场痛点。

---

## ✨ 核心特性

| 特性 | 描述 | 权衡说明 |
|---------|-------------|----------------|
| **⚡ 多方向 AI 精灵生成** | 自定义 ComfyUI 工作流，运行于 RunPod 无服务器 GPU；输出前/后/侧 4 方向一致性结果。 | ⚠️ 输出质量与部署在 RunPod 端点上的 LoRA 权重和工作流版本紧密相关。 |
| **🔄 实时 WebSocket 进度** | 任务状态（排队/运行/完成/失败）亚秒级推送，零轮询开销。 | ⚠️ 被浏览器后台挂起的标签页必须在聚焦时手动重连。 |
| **🖼️ PixiJS 精灵预览器** | 逐帧播放、速度控制、单帧检查，以及带 alpha 通道的全图 PNG 导出。 | ⚠️ 非常大的精灵图（>8 个方向）在移动端 Safari 上可能掉帧。 |
| **🚀 Celery 任务编排** | 基于 Redis 的 Celery Worker + Beat + Flower；多队列并发调度生成与后处理。 | ⚠️ 单 Worker 并发默认值为 4；突发负载需水平扩展 Worker 副本。 |
| **☁️ Cloudflare R2 边缘存储** | S3 兼容 API；300+ 全球 POP；零出口费。 | ⚠️ 批量小对象上传应使用 S3 Batch；单次 PUT 吞吐量受限。 |
| **🐳 一键容器集群** | Docker Compose 启动 7 服务栈（Postgres / Redis / API / Worker / Beat / Flower / Frontend）。 | ⚠️ 首次本地拉取约 4.2 GB 镜像；需稳定网络。 |

---

## 🔧 环境要求

| 依赖 | 最低版本 |
|------------|-----------------|
| **Docker** | 24.0 + Compose v2 |
| **Node.js** | 22 LTS |
| **pnpm** | 10.25.0 |
| **Python** | 3.12 |
| **uv** | 0.4 |
| **RunPod 账号** | 部署 ComfyUI 工作流所需 |
| **Cloudflare R2** | 作品存储所需 |

---

## 📦 安装

### 方式 A · Docker Compose（推荐 —— 零主机依赖）

一键启动 **7 个微服务**：PostgreSQL 16、Redis 7、FastAPI、Celery Worker、Celery Beat、Flower 任务 UI 和 Next.js 前端。

```bash
# 1. 克隆仓库
git clone https://github.com/MeiSiristhebest/pixelForge.git
cd pixelForge

# 2. 复制环境变量模板（所需密钥见下方“配置”）
cp backend/.env.example backend/.env

# 3. 后台启动所有服务（全部镜像约 4 GB）
docker compose up -d
```

**健康启动后的端点：**

| 服务 | URL |
|---------|-----|
| Next.js 前端 | [`http://localhost:3000`](http://localhost:3000) |
| FastAPI REST API | [`http://localhost:8000`](http://localhost:8000) |
| 交互式 OpenAPI (Swagger) | [`http://localhost:8000/docs`](http://localhost:8000/docs) |
| Celery Flower (任务监控) | [`http://localhost:5555`](http://localhost:5555) |
| PostgreSQL (直连) | `postgresql://pixelforge:pixelforgepass@localhost:5432/pixelforge` |
| Redis (直连) | `redis://localhost:6379/0` |

**停止 / 拆除：**

```bash
# 停止（保留数据库卷和缓存图片）
docker compose stop

# 完全拆除 + 删除卷（= 擦除 Postgres + Redis 数据 —— 谨慎操作）
docker compose down -v
```

---

### 方式 B · 手动本地安装（调试 / AI 工作流微调推荐）

当你需要单步调试 AI 生成工作流，或希望同时热加载前端与后端时使用。

#### 1. 仅启动共享的中间件容器

```bash
cd pixelForge
docker compose up -d postgres redis
```

#### 2. 启动 FastAPI + Celery（后端）

```bash
cd backend

# uv 创建虚拟环境并安装所有依赖（替代 pip + venv）
uv sync --dev

# 运行 FastAPI 服务器，在 8000 端口自动重载
uv run uvicorn app.main:app --reload --port 8000

# 第二个终端 —— 启动 Celery Worker（并发数 4；队列：generation + celery）
uv run celery -A app.celery_app.app worker --loglevel=info --concurrency=4 -Q generation,celery

# 第三个终端 —— 启动 Celery Beat（周期性任务调度器）
uv run celery -A app.celery_app.app beat --loglevel=info
```

#### 3. 启动 Next.js 16（前端）

```bash
cd frontend

# 安装完全锁定的 pnpm 10.25 版本依赖
pnpm install

# 在 3000 端口启动 Turbopack 开发服务器
pnpm dev
# 等同于：next dev --turbopack
```

---

### 🔧 配置 · `backend/.env` 中所需密钥

`cp backend/.env.example backend/.env` 后，**请将下方所有 `your_*` 占位符填写完毕** —— 否则生成作业将失败：

```env
# ===== 核心 =====
APP_ENV=development          # development / production
DEBUG=true
CORS_ORIGINS=http://localhost:3000

# ===== 数据库与 Redis =====
DATABASE_URL=postgresql+asyncpg://pixelforge:pixelforgepass@postgres:5432/pixelforge
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/1

# ===== AI 执行（必填） =====
RUNPOD_API_KEY=your_runpod_api_key_here    # https://www.runpod.io/console/user/settings
RUNPOD_ENDPOINT_ID=your_endpoint_id_here   # 承载 ComfyUI 工作流的无服务器端点 ID。

# ===== 云存储（必填） =====
R2_ACCOUNT_ID=your_account_id              # Cloudflare 控制台 → R2 → 账户详情
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET=pixelforge-assets
R2_PUBLIC_URL=https://your-public-domain.r2.dev
```

> 📌 **生产部署小贴士：** 将 `R2_PUBLIC_URL` 绑定到自定义域名（如 `assets.pixelforge.io`）并启用 Cloudflare 缓存规则，将 PNG 精灵图缓存 7 天 —— 进一步降低 R2 GET 成本并减少 CDN TTFB。

---

## 🚀 快速上手 · 5 分钟内端到端

> 本节假设你已选择上述 **方式 A**，所有容器均为 `healthy` 状态，且 `backend/.env` 中的 RunPod + R2 密钥已正确填写。

**步骤 1 · 验证聚合健康检查**

```bash
curl -s http://localhost:8000/health
```

**预期 JSON 响应：**

```json
{
  "status": "ok",
  "version": "0.1.0",
  "celery_worker_count": 1,
  "redis_conn": "healthy",
  "postgres_conn": "healthy"
}
```

**步骤 2 · 提交精灵图生成作业**

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

**预期 JSON 响应**（立即返回 —— 作业异步运行）：

```json
{
  "task_id": "pf-01J2XYZ9A1B2C3D4E5F6",
  "status": "queued",
  "progress": 0,
  "ws_url": "ws://localhost:8000/ws/task/pf-01J2XYZ9A1B2C3D4E5F6",
  "estimated_eta_seconds": 52
}
```

**步骤 3 · 在浏览器中查看完成的作品**

打开 [`http://localhost:3000/generate/pf-01J2XYZ9A1B2C3D4E5F6`](http://localhost:3000/generate/pf-01J2XYZ9A1B2C3D4E5F6)。你将看到：

- 顶部的实时进度条（WebSocket 驱动，通常 50 秒内完成 0% → 100%）。
- 中间的 PixiJS Canvas 预览：在 4 个方向间切换，播放/暂停动画，滑动到单帧。
- 右下角的 **导出精灵图** 按钮，用于下载透明 alpha PNG。

---

## 🏗️ 架构与技术栈

```mermaid
graph TD
    C["客户端浏览器\nNext.js 16 + PixiJS + R3F"]
    F["FastAPI 后端\nPython 3.12 + AsyncPG"]
    R[("Redis 7\nBroker + Result Backend")]
    W["Celery Workers\nQueue: generation + celery"]
    B["Celery Beat\nPeriodic Task Scheduler"]
    FL["Flower\nTask UI Monitor"]
    AI["RunPod Serverless GPU\nComfyUI Custom Workflow"]
    S3[("Cloudflare R2\nSprite Artifacts")]
    PG[("PostgreSQL 16\nTask Metadata + Auth")]

    C -- "HTTP REST / WS" --> F
    F -- "Submit Job" --> R
    R -- "Process" --> W
    W -- "Invoke" --> AI
    W -- "Save PNG" --> S3
    F -- "Metadata + Auth" --> PG
    B -- "Dispatch periodic" --> R
    FL -- "Read statuses" --> R

    classDef primary fill:#0ea5e9,stroke:#0369a1,color:#fff
    classDef store fill:#10b981,stroke:#065f46,color:#fff
    classDef compute fill:#f59e0b,stroke:#92400e,color:#fff
    class C,F primary
    class R,S3,PG store
    class W,B,FL,AI compute
```

| 层级 | 技术栈 |
| :--- | :--- |
| **前端** | Next.js 16 (App Router, Turbopack), TypeScript 5.9, Tailwind CSS 4.2, PixiJS 8.6, React Three Fiber (drei), Framer Motion 12 |
| **后端 API** | Python 3.12, FastAPI 0.115+, Uvicorn 0.34+, Pydantic v2, SQLAlchemy 2 (async), Alembic |
| **异步任务层** | Celery 5.4+, Redis 7, Flower 2 (任务 UI), Celery Beat (周期调度) |
| **AI 工作流** | RunPod 无服务器 GPU 端点，带有像素艺术 LoRA 的 ComfyUI 自定义工作流 |
| **数据库与存储** | PostgreSQL 16 (`pg_isready` 健康检查 + 持久化数据卷), Cloudflare R2 (S3 API, 300+ 全球 POP) |
| **认证与安全** | FastAPI OAuth2 + JWT via `python-jose` + `passlib[bcrypt]`; 显式 CORS 白名单 |
| **DevOps** | Docker 多阶段构建；Docker Compose v2 编排；Ruff (lint + format); Pyright strict (types); Biome (前端 lint + format) |

---

## 📚 API 端点概览

| 方法 | 端点 | 描述 | 认证 |
| :--- | :--- | :--- | :--- |
| `GET`  | `/health` | 聚合健康检查（DB + Redis + 实时 Worker 数量） | 否 |
| `POST` | `/api/v1/auth/register` | 注册新用户（邮箱 + bcrypt 哈希密码存储在 Postgres 中） | 否 |
| `POST` | `/api/v1/auth/login` | 使用凭据换取 JWT 访问令牌 | 否 |
| `POST` | `/api/v1/generate` | 提交精灵生成作业（返回 `task_id` + ETA） | ✅ Bearer JWT |
| `GET`  | `/api/v1/tasks/{task_id}` | 获取作业状态 + 进度 + 已完成作品的签名 R2 下载 URL | ✅ Bearer JWT |
| `GET`  | `/api/v1/tasks` | 当前用户历史作业的分页列表 | ✅ Bearer JWT |
| `WS`   | `/ws/task/{task_id}` | 进度事件的 WebSocket 流（排队 / 0–100 / 完成 / 失败） | 否（不透明的 task_id 充当密钥） |

完整的 OpenAPI 请求/响应模式和交互式试用示例：Swagger UI 位于 [`/docs`](http://localhost:8000/docs)。

---

## 📂 项目结构

```text
pixelForge/
├── frontend/                      # Next.js 16 前端
│   ├── src/
│   │   ├── app/                   # 路由页面
│   │   ├── components/            # UI + PixiJS 预览器
│   │   ├── hooks/                 # React hooks
│   │   ├── lib/                   # API 客户端 + 辅助函数
│   │   └── types/                 # TypeScript 类型
│   ├── package.json
│   └── Dockerfile
├── backend/                       # FastAPI 后端
│   ├── app/
│   │   ├── api/routes/            # auth / generation / health
│   │   ├── celery_app/            # Celery Worker + Beat
│   │   ├── core/                  # 配置 + 安全
│   │   ├── models/                # SQLAlchemy 模型
│   │   ├── services/              # RunPod + R2 封装
│   │   └── main.py                # FastAPI 入口
│   ├── alembic/                   # 数据库迁移
│   ├── pyproject.toml
│   ├── .env.example
│   └── Dockerfile
├── shared/                        # 共享类型定义
├── docker-compose.yml             # 7 服务编排
├── README.md
└── README_EN.md
```

---

## 🤝 贡献

> PixelForge 是一个 **全新** 的开源项目 —— 每一个 Issue / PR / Feature Request 都备受欢迎 🙏

**作为贡献者开始：**

```bash
# 1. Fork & Clone
git clone https://github.com/<你的用户名>/pixelForge.git
cd pixelForge

# 2. 启动中间件 + 后端 (uv sync) + 前端 (pnpm install)
#    → 请参见上方“安装 → 方式 B”中的每个终端命令

# 3. 创建分支（约定：feat/xxx, fix/yyy, docs/zzz）
git checkout -b feat/support-sprite-sheet-auditing

# 4. 在两端运行 lint + typecheck 门控
cd backend  && uv run ruff check app tests && uv run pyright
cd frontend && pnpm lint:fix      && pnpm type-check

# 5. 提交 PR。合并目标为默认的 `main` 分支；CI 必须通过。
```

不知道从哪里开始？请查看 [Good First Issue 列表](https://github.com/MeiSiristhebest/pixelForge/issues)。

---

## 🔒 安全

### 生产部署不可协商的加固清单

- 设置 `APP_ENV=production` **并** `DEBUG=false`。
- `CORS_ORIGINS` 必须只列出 **你自己的前端域名** —— 切勿在生产中使用通配符 `*`。
- 将 `backend/.env` 权限设为 `0600`（仅所有者读/写）。该文件已在 `.gitignore` 中 —— 首次提交前请二次确认。
- 在 API 前的反向代理处终止 TLS（Let's Encrypt + Nginx 或 Cloudflare Full (Strict) SSL）。
- PostgreSQL 和 Redis **绝不能暴露公网端口**。仅对外开放：3000（前端）、8000（API）、5555（Flower —— 建议仅绑定内部 / VPN 接口）。
- 定期轮换 **RunPod API Key**、**Cloudflare R2 Access Keys** 和 **JWT 签名密钥**；切勿将个人云凭据复用于共享的 PixelForge 服务角色。
- Celery Flower (`:5555`) 应置于 HTTP Basic Auth 或内部 VPN 之后 —— 它暴露了任务级别的元数据和 Worker 重启控制。

### 漏洞披露

通过 **邮件** 发送疑似问题（JWT 伪造漏洞、未捕获的 CORS 预检绕过、通过 ComfyUI 工作流注入导致的 RunPod Worker 凭据泄露、R2 签名 URL 权限提升等），切勿在公开 GitHub Issue 中披露：

**`maox_neta@foxmail.com`**

48 小时内首次回复；严重漏洞将在 72 小时内获得热修复和公开致谢。

---

## 📄 许可证

**PixelForge** 基于 **MIT License** 开源。这意味着：

- ✅ 你可以自由地修改、商用、闭源分发 PixelForge 的代码。
- ✅ 衍生作品只需保留一份版权声明与 MIT 原文。
- ❌ 作者不对任何直接/间接使用损失承担责任。

**版权声明：** Copyright (c) 2025–2026 PixelForge Contributors. All Rights Reserved.

完整许可证原文请参阅仓库根目录下的 [`LICENSE`](LICENSE) 文件。
