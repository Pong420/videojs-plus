import { hook, registerPlugin, getPlugin } from 'video.js';

import './SubtitleSettingMenuItem';
import './Subtitles.scss';

class subtitles extends getPlugin('plugin') {
  constructor(player, options) {
    super(player, options);

    this.flag = null;
    this.track = null;

    let timeout;

    const handleSubtitleChangeEvent = () => {
      clearTimeout(timeout);

      const subtitles = this.values();
      const currentSubtitle = subtitles.find(t => t.mode === 'showing') || {};
      const newFlag = currentSubtitle.label || currentSubtitle.id;

      // multiple `change` event will reveiced when subtitles changed ( depends on number of subtitles or browser ? )
      // so that timeout is used to make sure `subtitlechange` event emit once;
      timeout = setTimeout(() => {
        if (this.flag !== newFlag) {
          this.flag = newFlag;

          player.trigger('subtitlechange', {
            index: subtitles.indexOf(currentSubtitle),
            label: currentSubtitle.label || ''
          });
        }
      }, 10);
    };

    player.textTracks().on('change', handleSubtitleChangeEvent);
    player.on('dispose', () => {
      player.textTracks().off('change', handleSubtitleChangeEvent);
    });
  }

  values() {
    const tracks = this.player.textTracks();
    const subtitles = [];

    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].kind === 'subtitles') {
        subtitles.push(tracks[i]);
      }
    }

    return subtitles;
  }

  load(subtitles_ = []) {
    const { player } = this;

    const subtitles = subtitles_.map(a => Object.assign({}, a));

    if (subtitles && subtitles.length) {
      this.remove();

      subtitles.forEach(subtitle => {
        if (this.flag) {
          subtitle.default = subtitle.label === this.flag;
        }

        const manualCleanup = true;
        const trackEl = player.addRemoteTextTrack(subtitle, manualCleanup);

        if (subtitle.default) {
          this.flag = subtitle.label;
          this.track = trackEl.track;

          trackEl.track.mode = 'showing';
        }
      });

      player.trigger('subtitles', subtitles);
    }
  }

  remove() {
    this.values().forEach(track => {
      this.player.removeRemoteTextTrack(track);
    });
  }

  pick(index) {
    const subtitles = this.values();
    const newTrack = subtitles[index];

    if (newTrack) {
      this.track.mode = 'disabled';
      this.track = newTrack;

      newTrack.mode = 'showing';
    } else {
      this.track.mode = 'disabled';
    }
  }
}

hook('setup', vjsPlayer => {
  vjsPlayer.ready(() => {
    vjsPlayer.subtitles().load(vjsPlayer.options_.subtitles);
  });
});

registerPlugin('subtitles', subtitles);
