import { getComponent, registerComponent, mergeOptions } from 'video.js';

const MenuItem = getComponent('MenuItem');

class SettingItem extends MenuItem {
  constructor(player, options) {
    super(
      player,
      mergeOptions(
        {
          selectable: false
        },
        options
      )
    );

    this.menu = options.menu;
  }
}

registerComponent('SettingItem', SettingItem);

export default SettingItem;
