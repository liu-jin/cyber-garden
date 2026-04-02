/**
 * 【赛博王朝】工部尚书专用 - 资产管理与预加载核心
 * 
 * 功能：
 * 1. 提供 AudioBuffer 与 Image 的预加载与缓存。
 * 2. 支撑二期“五色光”大规模素材的瞬息加载需求。
 */

export class AssetManager {
  private static instance: AssetManager;
  private audioCache: Map<string, AudioBuffer> = new Map();
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private dataCache: Map<string, any> = new Map();
  private audioContext: AudioContext | null = null;

  private constructor() {}

  static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  setAudioContext(ctx: AudioContext) {
    this.audioContext = ctx;
  }

  async preloadData(src: string): Promise<any> {
    if (this.dataCache.has(src)) return this.dataCache.get(src);
    try {
      const response = await fetch(src);
      const data = await response.json();
      this.dataCache.set(src, data);
      console.log(`✅ [资产预热] 数据已就绪: ${src}`);
      return data;
    } catch (err) {
      console.error(`❌ [资产预热失败] 数据: ${src}`, err);
      throw err;
    }
  }

  async preloadAudio(src: string): Promise<AudioBuffer> {
    if (this.audioCache.has(src)) return this.audioCache.get(src)!;

    if (!this.audioContext) throw new Error("AudioContext not initialized in AssetManager");

    try {
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.audioCache.set(src, audioBuffer);
      console.log(`✅ [资产预热] 音频已就绪: ${src}`);
      return audioBuffer;
    } catch (err) {
      console.error(`❌ [资产预热失败] 音频: ${src}`, err);
      throw err;
    }
  }

  async preloadImage(src: string): Promise<HTMLImageElement> {
    if (this.imageCache.has(src)) return this.imageCache.get(src)!;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        this.imageCache.set(src, img);
        console.log(`✅ [资产预热] 图片已就绪: ${src}`);
        resolve(img);
      };
      img.onerror = (err) => {
        console.error(`❌ [资产预热失败] 图片: ${src}`, err);
        reject(err);
      };
    });
  }

  getAudio(src: string): AudioBuffer | undefined {
    return this.audioCache.get(src);
  }

  getImage(src: string): HTMLImageElement | undefined {
    return this.imageCache.get(src);
  }
}

export const assetManager = AssetManager.getInstance();
