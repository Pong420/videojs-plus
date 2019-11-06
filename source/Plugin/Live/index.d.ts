import videojs from 'video.js';

declare module 'video.js' {
  export interface LivePlugin extends videojs.Plugin {}

  interface VideoJsPlayer {
    live: () => LivePlugin;
  }
}
