import videojs, { VideoJsPlayer } from 'video.js';

declare module 'video.js' {
  export interface Quality {
    default?: boolean;
    label: string;
    sources: videojs.Tech.SourceObject[];
  }

  export interface QualityPlugin {
    current(): Quality;
    values: Quality[];
    index(): number;
    index(index: number): void;
    pick(index: number, skip?: boolean): void;
  }

  export type QualityListener = (event: Event, data: Quality[]) => void;

  export type QualityChangeListener = (
    event: Event,
    data: Quality & { index: number }
  ) => void;

  interface VideoJSPlayerOptions {
    qualities?: Quality[];
  }

  export interface VideoJsPlayer {
    qualities: QualityPlugin;

    setQualities(qualities: Quality[], index?: number): void;

    on(type: 'quality', listener?: QualityListener): void;
    on(type: 'qualitychange', listener?: QualityChangeListener): void;
    one(type: 'quality', listener?: QualityListener): void;
    one(type: 'qualitychange', listener?: QualityChangeListener): void;
  }
}
