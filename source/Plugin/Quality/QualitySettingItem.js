import videojs from 'video.js';

const SettingOptionItem = videojs.getComponent('SettingOptionItem');

class QualitySettingItem extends SettingOptionItem {
  constructor(player, options) {
    super(player, {
      ...options,
      name: 'QualitySettingItem',
      label: 'Quality',
      icon: 'vjs-icon-hd',
      entries: player.options_.quality || []
    });

    this.addClass('vjs-setting-quality');

    player.on('quality', (_, qualities) => {
      const entries = qualities.map((quality, index) => {
        quality.value = index;
        return quality;
      });

      this.setEntries(entries, player.qualities.index());

      this.show();
    });

    player.on('qualitychange', (_, { index }) => {
      this.select(index);
      this.update(index);
    });
  }

  onChange(...args) {
    super.onChange(...args);
    this.player_.qualities.pick(this.selected.value);
  }
}

videojs
  .getComponent('SettingMenuButton')
  .prototype.options_.entries.push('QualitySettingItem');

videojs.registerComponent('QualitySettingItem', QualitySettingItem);

export default QualitySettingItem;
