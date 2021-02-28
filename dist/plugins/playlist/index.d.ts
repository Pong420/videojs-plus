import videojs, { VideoJsPlayer } from 'video.js';

declare module 'video.js' {
  export interface PlayList {
    default?: boolean;
    poster?: string;
    title?: string;
    sources: videojs.Tech.SourceObject[];
  }

  export interface PlayListPlugin {
    current(): PlayList;
    values: PlayList[];
    index(): number;
    index(index: number): void;
    loop(): boolean;
    loop(flag: boolean): void;
    autoplayNext(): boolean;
    autoplayNext(flag: boolean): void;
    play(index: number): void;
  }

  export type PlayListListener = (event: Event, data: PlayList[]) => void;

  export type PlayListChangeListener = (
    event: Event,
    data: PlayList & { index: number }
  ) => void;

  export type AutoplayNextListener = (event: Event, data: boolean) => void;

  interface VideoJSPlayerOptions {
    playlist?: PlayList[];
  }

  export interface VideoJsPlayer {
    playlist: PlayListPlugin;

    setPlayList(playlist: PlayList, startIndex?: number);

    on(type: 'playList', listener?: PlayListListener): void;
    on(type: 'playListchange', listener?: PlayListChangeListener): void;
    on(type: 'autoplaynext', listener?: AutoplayNextListener): void;
    one(type: 'playList', listener?: PlayListListener): void;
    one(type: 'playListchange', listener?: PlayListChangeListener): void;
    one(type: 'autoplaynext', listener?: AutoplayNextListener): void;
  }
}
