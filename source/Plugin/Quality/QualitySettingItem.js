import { getComponent, registerComponent } from 'video.js';

const SettingOptionalItem = getComponent('SettingOptionalItem');

class QualitySettingItem extends SettingOptionalItem {
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
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.quality.pick(selectedItem.value);
  }
}

getComponent('SettingMenuButton').prototype.options_.entries.push('QualitySettingItem');

registerComponent('QualityItem', QualitySettingItem);

export default QualitySettingItem;
