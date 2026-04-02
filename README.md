# 【赛博王朝】幼儿英语启蒙网站

## 项目简介
本项目致力于为4岁左右的小朋友提供一个寓教于乐、高频互动的英语学习平台。

## 核心原则
- **极简交互**：专为4岁儿童设计，减少文字依赖。
- **高可用性**：由【赛博王朝】工部尚书守卫，确保部署丝滑。

## 三期工程：【英雄路】(Phase 3) - 进行中
- **基建防线强化**：已开辟 `feature/phase-3-hero-path` 分支。
- **资产预加载 (Pre-loading)**：已升级 `AssetManager` 支持 JSON 配置加载。
- **音律同步基建**：在 [components/AssetPreloader.tsx](components/AssetPreloader.tsx) 中预设了人体部位、赛博装甲及儿歌律动素材的预热路径。
- **流式性能监控**：针对三期大规模音频（儿歌），已在 `AssetManager` 中优化解码逻辑，确保“指尖即回响”。

## 异地部署与营建指南 (工部尚书)
若欲在其他数字疆土（其他电脑）上复现【皇子英语乐园】，请依此步骤行事：

### 1. 调取府库源码 (Clone)
```bash
git clone https://github.com/liu-jin/cyber-garden.git
cd cyber-garden
```

### 2. 环境初始化 (Initialize)
确保已安装 Node.js (v18.0+)，随后执行以下指令安装营建物资：
```bash
npm install
```

### 3. 开启幻境预览 (Development)
```bash
npm run dev
```
访问 `http://localhost:3000` 即可入园巡视。

### 4. 正式筑城 (Production Build)
若需正式发布，请执行以下精炼指令：
```bash
npm run build
npm run start
```

## 基础设施与运维 (工部尚书)
- **基座环境**：已由兵部尚书完成 Next.js + Tailwind + Framer Motion 选型并完成基座注入。
- **CI/CD**：已完成。全量构建流水线就绪。
- **CDN 巡查**：已将所有 13 项经刑部审计的音频、视频资产交付至 `public/audio` 与 `public/images`。
- **资产监控**：[scripts/optimize-assets.js](scripts/optimize-assets.js) 升级为 2.0 版本，支持二期【五色光】特性。
- **状态**：**二期基建已就位 (Phase 2 Ready)**。
