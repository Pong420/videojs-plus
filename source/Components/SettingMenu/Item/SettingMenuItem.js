import { getComponent, registerComponent, mergeOptions } from 'video.js';

const MenuItem = getComponent('MenuItem');

class SettingMenuItem extends MenuItem {
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

registerComponent('SettingMenuItem', SettingMenuItem);

export default SettingMenuItem;
