import videojs from 'video.js';

declare module 'video.js' {
  interface VideoJsPlayerOptions {
    fullwindow?: boolean;
  }
}
