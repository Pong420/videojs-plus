import videojs from 'video.js';

declare module 'video.js' {
  export interface UnloadOptions {
    loading?: boolean;
  }

  interface VideoJsPlayer {
    unload: (options?: UnloadOptions) => void;
  }
}
