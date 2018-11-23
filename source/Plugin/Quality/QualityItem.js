import { getComponent, registerComponent } from 'video.js';

const SettingMenuItem = getComponent('SettingMenuItem');

class QualityItem extends SettingMenuItem {
  constructor(player, options = {}) {
    super(player, {
      name: 'QualityItem',
      label: 'Quality',
      icon: 'vjs-icon-hd',
      entries: options.quality || []
    });

    this.addClass('vjs-setting-quality');
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.quality.pick(selectedItem.value);
  }
}

registerComponent('QualityItem', QualityItem);

getComponent('SettingMenuButton').prototype.options_.entries.push('QualityItem');

export default QualityItem;
