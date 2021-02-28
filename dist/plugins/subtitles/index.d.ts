import videojs, { VideoJsPlayer } from 'video.js';

declare module 'video.js' {
  export interface Subtitle {
    default?: boolean;
    kind: string | 'subtitles';
    srclang: string;
    label: string;
    src: string;
  }

  export interface SubtitlePlugin extends videojs.Plugin {
    track: videojs.TextTrack;
    values(): videojs.TextTrack[];
    remove(): SubtitlePlugin;
    pick(index: number): SubtitlePlugin;
    load(subtitles: Subtitle[]): SubtitlePlugin;
  }

  export type SubtitlesListener = (event: Event, data: Subtitle[]) => void;

  export type SubtitleChangeListener = (
    event: Event,
    data: { index: number; label: string }
  ) => void;

  interface VideoJSPlayerOptions {
    subtitles?: Subtitle[];
  }

  interface VideoJsPlayer {
    subtitles: () => SubtitlePlugin;

    on(type: 'subtitles', listener?: SubtitlesListener): void;
    on(type: 'subtitlechange', listener?: SubtitleChangeListener): void;
    one(type: 'subtitles', listener?: SubtitlesListener): void;
    one(type: 'subtitlechange', listener?: SubtitleChangeListener): void;
  }
}
