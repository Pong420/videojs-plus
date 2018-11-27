import { getComponent, registerComponent } from 'video.js';

const SettingOptionItem = getComponent('SettingOptionItem');

class QualitySettingItem extends SettingOptionItem {
  constructor(player, options) {
    super(
      player,
      Object.assign(options, {
        name: 'QualitySettingItem',
        label: 'Quality',
        icon: 'vjs-icon-hd',
        entries: options.quality || []
      })
    );

    this.addClass('vjs-setting-quality');

    player.on('quality', (_, qualites) => {
      this.setEntries(
        qualites.map((quality, index) => {
          quality.value = index;
        })
      );

      this.show();
    });
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.quality.pick(selectedItem.value);
  }
}

getComponent('SettingMenuButton').prototype.options_.entries.push('QualitySettingItem');

registerComponent('QualityItem', QualitySettingItem);

export default QualitySettingItem;
