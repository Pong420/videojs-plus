import videojs from 'video.js';
import log from '../../Utils/Log';

const SettingOptionItem = videojs.getComponent('SettingOptionItem');

class QualityHlsSettingItem extends SettingOptionItem {
  constructor(player, options) {
    super(player, {
      ...options,
      name: 'QualityHlsSettingItem',
      label: 'Quality',
      icon: 'vjs-icon-hd'
    });

    this.addClass('vjs-setting-quality');

    this.levels = [];

    this.handleAllLevelsAdded();
  }

  handleAllLevelsAdded() {
    const player = this.player_;

    if (!player.qualityLevels) {
      log('plugin videojs-contrib-quality-levels do not exsits');

      return false;
    }

    const qualityLevels = player.qualityLevels();
    let levels = [];
    let timeout;

    qualityLevels.on('addqualitylevel', ({ qualityLevel }) => {
      clearTimeout(timeout);

      levels.push(qualityLevel);

      const callback = () => {
        this.levels = levels.slice(0);

        player.trigger('before-quality-setup', {
          levels: this.levels
        });

        this.onAllLevelsAdded();

        levels = [];
      };

      timeout = setTimeout(callback, 10);
    });
  }

  onAllLevelsAdded() {
    const entries = [
      ...this.levels
        .map(({ height, width }) => {
          const quality = (width < height) ? width : height;

          return {
            label: this.localize(`${quality}p`),
            value: height,
            default: false
          };
        })
        .sort((a, b) => {
          return b.value - a.value;
        }),
      {
        label: 'Auto',
        value: 'auto',
        default: true
      }
    ];

    if (this.levels.length > 1) {
      // use auto as default
      this.setEntries(entries, entries.length - 1);

      this.show();

      this.player_.trigger('hls-quality', this.levels);
    } else {
      this.hide();
    }
  }

  onChange(...args) {
    super.onChange(...args);

    const { value } = this.selected;

    this.levels.forEach(lv => {
      lv.enabled = lv.height === value || value === 'auto';
    });

    this.player_.trigger(
      'hls-qualitychange',
      this.entries.reduce((acc, entry, index) => {
        if (entry.value === value) {
          const level = this.levels.find(v => v.height === value) || {};

          acc = {
            index,
            level,
            ...entry
          };
        }

        return acc;
      }, {})
    );
  }
}

videojs
  .getComponent('SettingMenuButton')
  .prototype.options_.entries.push('QualityHlsSettingItem');

videojs.registerComponent('QualityHlsSettingItem', QualityHlsSettingItem);

export default QualityHlsSettingItem;
