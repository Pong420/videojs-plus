import videojs from 'video.js';
import List from '../../Utils/List';

import './QualitySettingItem';

class Quality extends List {
  constructor(player, array, defaultQualityLevel = 0) {
    super(array, defaultQualityLevel);

    this.player_ = player;

    this.pick(defaultQualityLevel, true);
  }

  pick(index, skip) {
    if (typeof index !== 'undefined') {
      this.index(index);
    }

    const player = this.player_;
    const current = this.current();
    const cachedCurrentTime = player.ended() ? 0 : player.currentTime();

    if (!skip && cachedCurrentTime) {
      player.one('loadedmetadata', () => {
        player.one('canplaythrough', () => {
          player.currentTime(cachedCurrentTime);
        });

        player.play();
      });
    }

    player.src(current.sources);

    player.trigger('qualitychange', {
      ...current,
      index: this.index()
    });
  }
}

const setQualities = function (qualities, defaultQualityLevel) {
  const player = this.player_;

  player.qualities = new Quality(player, qualities, defaultQualityLevel);

  player.trigger('quality', qualities);
};

videojs.registerPlugin('setQualities', setQualities);

videojs.hook('setup', vjsPlayer => {
  const { qualities } = vjsPlayer.options_;

  if (qualities && qualities.length) {
    const defaultQualityLevel = qualities.findIndex(v => v.default);

    vjsPlayer.setQualities(qualities, defaultQualityLevel);
  }
});
