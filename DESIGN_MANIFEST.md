# 【赛博王朝】皇子英语乐园：皇家赛博·珍珠版 (Royal Cyber-Pearl) UI/UX 设计指南

> **状态更新 (2026-04-02)**: 已全面完成“皇家赛博·珍珠版”视觉重构。全站已应用玻璃拟态 (Glassmorphism)、霓虹投影 (Neon Shadows) 及高级排版系统。

## 🏛️ 视觉灵魂 (Visual Soul): "皇家赛博·触感仙境" (Tactile Wonderland)
本设计旨在跳出平庸的“AI 同质化”审美，融合**皇家优雅**与**赛博未来**。核心理念是：**真实触感、梦幻光影、零阻力交互**。

## 🎨 核心视觉体系 (Visual Identity 2.0) - 已应用 ✅

### 1. 珍珠感官色彩 (Pearlescent Palette)
不再使用单一平涂，而是采用带有深度的“珍珠渐变”与高对比度重色点缀：
- **背景 (Cyber Pearl)**: `linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)` 搭配微量噪点 (Noise Texture)。
- **皇家主色 (Royal Amethyst)**: `#6B46C1` (高贵紫色，用于核心强调)。
- **赛博荧光 (Cyber Mint)**: `#00F5D4` (用于交互高光与霓虹描边)。
- **多巴胺辅色**: 
  - 苹果: `#FF0054` (深桃红)
  - 香蕉: `#FEE440` (明亮黄)
  - 魔法门: `#9B5DE5` (梦幻紫)

### 2. 字体美学 (Typography)
- **标题 (Display)**: 使用 `Outfit` (Google Fonts)，字重设为 `Black`。应用于场景标题与关键单词。
- **正文 (Body)**: 使用 `Plus Jakarta Sans`，提供极致的阅读舒适度。

### 3. 触感物理学 (Tactile Physics)
- **玻璃拟态 (Glassmorphism)**: 弹窗与容器使用 `.glass` 类 (`backdrop-blur-xl` 与 `bg-white/40`)，搭配 `1px` 白色/珍珠色边框。
- **霓虹投影 (Neon Glow)**: 使用 `neon-shadow` 类。图标在悬停/激活时产生与自身颜色一致的 `drop-shadow` 扩散。
- **果冻反馈**: 使用 `framer-motion` 的 `spring` 物理引擎。`stiffness: 400`, `damping: 15`。

---

## 🐲 吉祥物：龙宝 (Dragon Kid) 视觉进化
- **质感**: 升级为带有“霓虹描边”与“星光计数器”的玻璃底座形态。
- **交互**: 龙宝在不同场景下会受到环境色（如颜色喷泉）的实时漫反射影响。

---

## 🏛️ 场景视觉规范 (Scene Specifics)

### 1. 魔法门 (The Magic Gate)
- **形态**: 拟物化云朵大门，带有呼吸感的光晕效果。

### 2. 颜色喷泉 (Color Fountains)
- **形态**: 动态流体 SVG，点击后伴随流光溢彩的粒子效果。

### 3. 形状嵌板 (Shape Panels)
- **形态**: 具有“凹陷感”的玻璃插槽与“悬浮感”的霓虹形状块。

---

## ⚖️ 刑部合规自查 (Compliance)
- [x] 所有颜色对比度符合 WCAG AA 标准，保护皇子视力。
- [x] 动效时长控制在 300ms-800ms，防止过快引发不适。
- [x] 图标无尖锐折线，均为曲线设计。
- [x] 零文字交互原则，确保 4 岁幼童可独立操作。
