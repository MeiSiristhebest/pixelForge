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