import videojs from 'video.js';

declare module 'video.js' {
  interface VideoJsPlayerOptions {
    title?: string;
    playsinline?: boolean;
    mobileView?: boolean;
  }

  interface VideoJsPlayer {
    title(): string;
    title(newTitle: string): void;

    findChild(
      componentName: string
    ): Array<{
      index: number;
      parent: videojs.Component;
      component: videojs.Component;
    }>;
  }
}
