# 【三期·英雄路】视觉与交互设计规约 (PHASE3_VISUALS.md)

## 1. 英雄装甲 (Hero Armor) - 身体部位启蒙
基于《Head, Shoulders, Knees and Toes》童谣，设计一套可动态挂载的“赛博珍珠装甲”。

### 部位清单与视觉定义：
- **Head (头盔/冠冕)**: 
  - *视觉*: 带有龙角流光的珍珠头盔。
  - *动效*: 激活时从头顶向下延伸出全息护目镜。
- **Shoulders (护肩)**: 
  - *视觉*: 对称的圆润珍珠护肩，边缘带有 Cyber Mint 呼吸灯。
- **Knees (护膝)**: 
  - *视觉*: 带有喷气口特效的护膝，辅助龙宝跳跃。
- **Toes (战靴)**: 
  - *视觉*: 极简流线型战靴。
- **Eyes/Ears/Mouth/Nose (五官增强器)**:
  - *Eyes*: 侦测流光。
  - *Ears*: 珍珠通讯器。
  - *Mouth*: 律动共鸣器。

### 材质规范：
- **底色**: `rgba(248, 250, 252, 0.6)` (珍珠白半透)
- **高光**: `drop-shadow(0 0 15px var(--cyber-mint))`
- **边框**: `1px solid rgba(255, 255, 255, 0.8)`

---

## 2. 皇家礼仪 (Royal Etiquette) - 社交对话分镜

### 场景 A: 初见礼 (The Royal Greeting)
- **人物**: 龙宝 (Dragon Kid) & 侍卫 (Guard/Brother)
- **对话**: "Hello!" / "Good morning!"
- **交互**: 点击龙宝，龙宝低头行礼，头顶弹出“珍珠气泡”，文字以打字机效果呈现，伴随叮叮声。
- **视觉反馈**: 龙宝行礼时，其盔甲的 Cyber Mint 呼吸灯会高频闪烁，表示“系统同步”。

### 场景 B: 感恩心 (The Heart of Gratitude)
- **人物**: 龙宝 & 母后 (Mother)
- **对话**: "Thank you!" / "You're welcome!"
- **交互**: 母后给予龙宝一颗星星，龙宝双手接住，胸前装甲闪烁心形光芒。
- **视觉反馈**: 星星进入龙宝体内，其珍珠材质会泛起一圈圈紫色涟漪 (Aura Ripple)。

### 场景 C: 辞别礼 (The Gracious Farewell)
- **人物**: 龙宝 & 父王 (Father)
- **对话**: "Goodbye!" / "See you soon!"
- **交互**: 龙宝挥手，战靴喷出五彩珍珠粉末，龙宝缓缓升空。
- **视觉反馈**: 屏幕背景逐渐模糊 (Gaussian Blur)，龙宝化为一颗流星消失，提示皇子本节“英雄任务”圆满完成。

---

## 3. 技术挂载协议 (Mounting Protocol)
- 每个装甲部件均为独立的 SVG，具有统一的 `viewBox`，便于**兵部尚书**进行多层叠加 (Z-Index Layering)。
- 使用 Framer Motion 的 `AnimatePresence` 实现装甲的“数字化合体”动效。
