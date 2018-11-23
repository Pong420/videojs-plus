import { hook, registerPlugin, getPlugin } from 'video.js';

import './SubtitlesItem';
import './Subtitles.scss';

const Plugin = getPlugin('plugin');

class subtitles extends Plugin {
  constructor(player, options) {
    super(player, options);

    this.flag = null;
    this.track = null;

    let timeout;

    player.textTracks().on('change', () => {
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

      const SubtitlesMenuItem = player.findChild('SubtitlesMenuItem')[0].component;

      SubtitlesMenuItem.setEntries(
        subtitles
          .map(({ label, default: default_ }, index) => ({
            label,
            value: index,
            defalut: default_
          }))
          .concat([
            {
              label: 'Close Subtitles',
              value: -1,
              defalut: false
            }
          ])
      );

      SubtitlesMenuItem.show();

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
