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
      this.setEntries(
        qualities.map((quality, index) => {
          quality.value = index;

          return quality;
        })
      );

      this.show();
    });
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.qualities.pick(selectedItem.value);
  }
}

videojs.getComponent('SettingMenuButton').prototype.options_.entries.push('QualitySettingItem');

videojs.registerComponent('QualitySettingItem', QualitySettingItem);

export default QualitySettingItem;
