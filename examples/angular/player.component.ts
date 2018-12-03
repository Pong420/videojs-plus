import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import videojs from 'video.js/dist/video.js';
window['videojs'] = videojs;

import 'videojs-plus/dist/videojs-plus.min.js';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: [
    './player.component.css',

    // include videojs-plus style here
    '../../../node_modules/videojs-plus/dist/videojs-plus.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('playerContainer') playerContainer;
  @ViewChild('videoEl') videoEl;

  @Input() options: Object;

  @Output() playerInit = new EventEmitter<any>();

  playerOptions: Object;

  player: any;

  constructor() {}

  ngAfterViewInit() {
    this.playerOptions = {
      // player default options, e.g.
      aspectRatio: '16:9',

      // specific options
      ...this.options
    };

    this.createPlayer();
  }

  ngOnDestroy() {
    this.destroyPlayer();
  }

  createPlayer() {
    if (this.player && !this.player.isFullscreen()) {
      this.destroyPlayer();
    }

    this.player = videojs(this.videoEl.nativeElement, this.playerOptions);

    // for debug purpose
    window['player'] = this.player;

    // insert children element into videojs container
    const children = Array.prototype.slice.call(this.playerContainer.nativeElement.children);
    const playerEl = this.player.el_;
    const referEl = this.player.getChild('PlayToggleLayer').el_;
    children.forEach(el => {
      if (el !== playerEl) {
        playerEl.insertBefore(el, referEl);
      }
    });

    this.playerInit.emit({
      player: this.player
    });
  }

  destroyPlayer() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }
}
