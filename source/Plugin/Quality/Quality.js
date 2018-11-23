import { hook, registerPlugin } from 'video.js';

import List from '../../Utils/List';
import './QualityItem';

class Quality extends List {
  constructor(player, array, defaultQualityLevel = 0) {
    super(array, defaultQualityLevel);

    this.player = player;

    this.pick(defaultQualityLevel, true);
  }

  pick(index, skip) {
    if (typeof index !== 'undefined') {
      this.index(index);
    }

    const player = this.player;
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

    player.trigger(
      'qualitychange',
      Object.assign(current, {
        index: this.index()
      })
    );
  }
}

const setQuality = function(quality, defaultQualityLevel = 0) {
  const player = this.player_;
  const QualityItem = player.findChild('QualityItem')[0].component;

  player.quality = new Quality(player, quality, defaultQualityLevel);

  QualityItem.setEntries(
    quality.map(({ label, default: default_ }, index) => ({
      label,
      value: index,
      defalut: default_
    }))
  );

  QualityItem.show();

  player.trigger('quality');
};

registerPlugin('setQuality', setQuality);

hook('setup', vjsPlayer => {
  const { quality, defaultQualityLevel } = vjsPlayer.options_;

  if (quality && quality.length) {
    vjsPlayer.setQuality(quality, defaultQualityLevel);
  }
});
