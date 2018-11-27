import { hook, registerPlugin } from 'video.js';

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

const setQualities = function(qualites, defaultQualityLevel) {
  const player = this.player_;

  player.qualites = new Quality(player, qualites, defaultQualityLevel);

  player.trigger('quality', qualites);
};

registerPlugin('setQualities', setQualities);

hook('setup', vjsPlayer => {
  const { qualites } = vjsPlayer.options_;

  if (qualites && qualites.length) {
    const defaultQualityLevel = qualites.findIndex(v => v.default);

    vjsPlayer.setQuality(qualites, defaultQualityLevel);
  }
});
