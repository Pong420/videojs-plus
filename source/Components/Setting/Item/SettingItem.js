import { getComponent, registerComponent } from 'video.js';

const MenuItem = getComponent('MenuItem');

class SettingItem extends MenuItem {
  constructor(player, options) {
    options = options || {
      selectable: false
    };

    super(player, options);

    this.menu = options.menu || player.SettingMenu;
  }
}

registerComponent('SettingItem', SettingItem);

export default SettingItem;
