import videojs, { VideoJsPlayer } from 'video.js';

declare module 'video.js' {
  export interface QualityLevel {
    bitrate: number;
    height?: number;
    id: string;
    label: string;
    width?: number;
    enabled?: boolean;
  }

  export type BeforeQualitySetupListener = (
    event: Event,
    data: { levels: QualityLevel[] }
  ) => void;

  export type QualityHlsListener = (event: Event, data: QualityLevel[]) => void;

  export type QualityHlsChangeListener = (
    event: Event,
    data: {
      index: number;
      label: string;
      value: string;
      default: boolean;
      level: QualityLevel;
    }
  ) => void;

  export interface VideoJsPlayer {
    on(type: 'hls-quality', listener?: QualityHlsListener): void;
    on(type: 'hls-qualitychange', listener?: QualityHlsChangeListener): void;
    on(
      type: 'before-quality-setup',
      listener?: BeforeQualitySetupListener
    ): void;
    one(type: 'hls-quality', listener?: QualityHlsListener): void;
    one(type: 'hls-qualitychange', listener?: QualityHlsChangeListener): void;
    one(
      type: 'before-quality-setup',
      listener?: BeforeQualitySetupListener
    ): void;
  }
}
