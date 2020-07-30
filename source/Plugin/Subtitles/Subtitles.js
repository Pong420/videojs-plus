import videojs from 'video.js';

import './SubtitleSettingMenuItem';
import './Subtitles.scss';

class subtitles extends videojs.getPlugin('plugin') {
  constructor(player, options) {
    super(player, options);

    this.flag = null;
    this.track = null;

    let timeout;
    const handleSubtitleChangeEvent = () => {
      clearTimeout(timeout);

      const subtitles = this.values();
      const currentSubtitle = subtitles.find(t => t.mode === 'showing') || {};
      const newFlag = currentSubtitle.label || currentSubtitle.id || -1;

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

    if (subtitles_ && subtitles_.length) {
      this.remove();

      let index = -1;
      const trackEls = [];
      const subtitles = subtitles_.map((s, i) => {
        const subtitle = Object.assign({}, s);
        const manualCleanup = true;

        // set default to false, otherwise subtitle will reset to the default subtitle
        // when user switch quality with quality plugin
        const trackEl = player.addRemoteTextTrack(
          {
            ...subtitle,
            default: false
          },
          manualCleanup
        );

        trackEl.track.mode = 'hidden';

        trackEls.push(trackEl);

        if (index === -1 && subtitle.default === true) {
          index = i;
        } else {
          subtitle.default = false;
        }

        return subtitle;
      });

      if (index !== -1) {
        this.flag = subtitles[index].label;
        this.track = trackEls[index].track;
        this.track.mode = 'showing';
      }

      player.trigger('subtitles', subtitles);
    }

    return this;
  }

  remove() {
    this.values().forEach(track => {
      this.player.removeRemoteTextTrack(track);
    });

    return this;
  }

  pick(index) {
    const subtitles = this.values();
    const newTrack = subtitles[index];

    if (newTrack) {
      if (this.track) {
        this.track.mode = 'disabled';
      }
      this.track = newTrack;
      this.track.mode = 'showing';
    } else if (this.track) {
      this.track.mode = 'disabled';
    }

    return this;
  }
}

videojs.hook('setup', vjsPlayer => {
  vjsPlayer.ready(() => {
    const { subtitles } = vjsPlayer.options_;
    subtitles && subtitles.length && vjsPlayer.subtitles().load(subtitles);
  });
});

videojs.registerPlugin('subtitles', subtitles);
