import { getComponent, registerComponent } from 'video.js';

const SettingMenuItem = getComponent('SettingMenuItem');

class QualityItem extends SettingMenuItem {
  constructor(player, options) {
    super(
      player,
      Object.assign(options, {
        name: 'QualityItem',
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

getComponent('SettingMenuButton').prototype.options_.entries.push('QualityItem');

registerComponent('QualityItem', QualityItem);

export default QualityItem;
