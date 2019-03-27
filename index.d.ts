import videojs from 'video.js';

declare module 'videojs-plus';

export interface Quality {
  default?: boolean;
  label: string;
  sources: videojs.Tech.SourceObject[];
}

export interface Subtitle {
  default?: boolean;
  kind: string;
  srclang: string;
  label: string;
  src: string;
}

export interface PlaylistItem {
  default?: boolean;
  title?: string;
  poster?: string;
  sources: videojs.Tech.SourceObject[];
}
