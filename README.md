# 【赛博王朝】幼儿英语启蒙网站

## 项目简介
本项目致力于为4岁左右的小朋友提供一个寓教于乐、高频互动的英语学习平台。

## 核心原则
- **极简交互**：专为4岁儿童设计，减少文字依赖。
- **高可用性**：由【赛博王朝】工部尚书守卫，确保部署丝滑。

## 二期工程：【五色光】(Phase 2) - 进行中
- **基座升级**：已开辟 `feature/phase-2-colors` 分支。
- **动态染色支持**：已由工部尚书在 [scripts/optimize-assets.js](scripts/optimize-assets.js) 中完成 `currentColor` 巡检逻辑。
- **叙事音轨分发**：已实现对 `_suffix.mp3` 的识别，支持中书令之叙事化教学策略。
- **性能监控**：针对二期复杂逻辑，已预留毫秒级性能监控，守卫皇子流畅游园体验。

## 基础设施与运维 (工部尚书)
- **基座环境**：已由兵部尚书完成 Next.js + Tailwind + Framer Motion 选型并完成基座注入。
- **CI/CD**：已完成。全量构建流水线就绪。
- **CDN 巡查**：已将所有 13 项经刑部审计的音频、视频资产交付至 `public/audio` 与 `public/images`。
- **资产监控**：[scripts/optimize-assets.js](scripts/optimize-assets.js) 升级为 2.0 版本，支持二期【五色光】特性。
- **状态**：**二期基建已就位 (Phase 2 Ready)**。
