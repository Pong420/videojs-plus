import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';

declare module 'video.js' {
  interface VideoJsPlayerOptions extends videojs.PlayerOptions {
    title?: string;
    playsinline?: boolean;
    mobileView?: boolean;
  }

  interface VideoJsPlayer extends videojs.Player {
    title(): string;
    title(newTitle: string): void;

    findChild(
      componentName: string
    ): Array<{
      index: number;
      parent: videojs.Component;
      component: videojs.Component;
    }>;

    on(
      target?: videojs.Component | Element,
      type?: string | string[],
      listener?: (...args: any[]) => void
    ): void;
    on(type?: string | string[], listener?: (...args: any[]) => void): void;
  }
}
