# 【赛博王朝】皇子英语乐园：二期【五色光】设计总纲 (礼部监制)

## 🏛️ 一、 核心场景设计 (Core Scenes)

### 1. 【斑斓世界】 (Colors) —— 喷泉花园 (Fountain Garden)
*   **视觉描述**: 一个由五个巨大拟物化喷泉组成的半圆阵法。每个喷泉喷涌着一种核心颜色的流光。
*   **交互逻辑**: 
    - 皇子点击喷泉，喷泉产生“水花溅跃”动效。
    - **龙宝变色**: 龙宝跳入对应的颜色流中，利用 `currentColor` 实时变换全身颜色。
    - **环境共鸣**: 背景产生微弱的同色系呼吸光。
*   **资产清单**:
    - `fountain-red.svg`, `fountain-blue.svg`, `fountain-yellow.svg`, `fountain-green.svg`, `fountain-purple.svg`
    - `color-sparks.mp3` (变色音效)

### 2. 【乐动乐园】 (Shapes) —— 几何工坊 (Shape Workshop)
*   **视觉描述**: 屏幕中心是几个带有凹陷虚影的台座，上方漂浮着对应的Q弹形状。
*   **交互逻辑**: 
    - **拟物拼图**: 皇子拖拽（或点击）形状，形状会产生真实的物理颤动。
    - **吸附反馈**: 当形状与虚影重合，产生“吸附”音效并完美契合，随后迸发“星星糖”。
*   **资产清单**:
    - `shape-circle.svg`, `shape-square.svg`, `shape-triangle.svg`, `shape-star.svg`
    - `shape-fit.mp3` (吸附成功音效)

### 3. 【百官亲族】 (Family) —— 皇家全家福 (Royal Family Portrait)
*   **视觉描述**: 四个身着华丽赛博服饰的卡通角色头像，整齐排列。
*   **交互逻辑**: 
    - 点击角色，角色产生“放大并点头”的动效。
    - **情感播报**: 播放充满温情的称谓引导语。
*   **资产清单**:
    - `family-father.svg`, `family-mother.svg`, `family-brother.svg`, `family-sister.svg`

---

## 🐲 二、 二期“龙宝”交互状态升级

1. **Splashing (戏水)**: 在【斑斓世界】中，龙宝与颜色流互动的动作。
2. **Hugging (拥抱)**: 在【百官亲族】中，当皇子点击角色，龙宝在旁做出开心的拥抱姿势。
3. **Clapping (鼓掌)**: 在【乐动乐园】拼图成功后的反馈动作。

---

## 🎙️ 三、 二期音频脚本 (Audio Scripts)

### 1. 颜色篇 (Colors)
- **Red**: "Red! Bold and brave, like the dragon's heart!"
- **Blue**: "Blue! Deep and calm, like our royal ocean."
- **Yellow**: "Yellow! Bright and warm, like the sun over our kingdom."
- **Green**: "Green! Full of life, like our emerald forests."
- **Purple**: "Purple! Noble and wise, the color of our crown."

### 2. 形状篇 (Shapes)
- **Circle**: "A Circle! Round and smooth, like the palace wheels."
- **Square**: "A Square! Strong and steady, like our castle walls."
- **Triangle**: "A Triangle! Sharp and fast, like an arrow of light."
- **Star**: "A Star! Bright and shining, like the cyber sky."

### 3. 亲族篇 (Family)
- **Father**: "This is Father. He is strong and wise, the protector of our home."
- **Mother**: "This is Mother. She is gentle and kind, the moonlight of our kingdom."
- **Brother**: "This is Brother. He is energetic and smart, your best playmate!"
- **Sister**: "This is Sister. She is sweet and clever, a little princess of our garden."

---
**礼部尚书 谨上**
