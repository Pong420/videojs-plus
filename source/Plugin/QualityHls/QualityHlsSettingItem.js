import videojs from 'video.js';

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
      videojs.log.warn('plugin videojs-contrib-quality-levels do not exsits');

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
        .map(({ height }) => {
          return {
            label: this.localize(`${height}p`),
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

    this.setEntries(entries);

    this.show();

    this.player_.trigger('qualities', this.levels);
  }

  onChange(selected) {
    const { value } = selected;

    super.onChange(selected);

    this.levels.forEach(lv => {
      lv.enabled = lv.height === value || value === 'auto';
    });

    this.player_.trigger(
      'qualitychange',
      this.entries.reduce((acc, entry, index) => {
        if (entry.value === value) {
          const level = this.levels.find(v => v.height === value) || {};

          acc = {
            index,
            ...entry,
            ...level
          };
        }

        return acc;
      }, {})
    );
  }
}

videojs.getComponent('SettingMenuButton').prototype.options_.entries.push('QualityHlsSettingItem');

videojs.registerComponent('QualityHlsSettingItem', QualityHlsSettingItem);

export default QualityHlsSettingItem;
