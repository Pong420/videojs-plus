import { registerComponent } from 'video.js';

import SettingMenuItem from './SettingMenuItem.js';

class SettingSubMenuTitle extends SettingMenuItem {
  constructor(player, options) {
    super(player, options);

    this.addChild('Component', {}, 0);
    this.addClass('vjs-settings-sub-menu-item');
    this.addClass('vjs-settings-sub-menu-title');
  }

  handleClick() {
    this.options_.menu.restore();
  }
}

registerComponent('SettingSubMenuTitle', SettingSubMenuTitle);

export default SettingSubMenuTitle;
