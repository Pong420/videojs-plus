import videojs from 'video.js';

import SettingMenuItem from './SettingMenuItem.js';

class SettingSubOptionItem extends SettingMenuItem {
  constructor(player, options) {
    super(player, options);

    this.selectable = true;

    Object.assign(this, options);

    this.addChild('Component', {}, 0);
    this.addClass('vjs-settings-sub-menu-item');
    this.addClass('vjs-settings-sub-menu-option');

    this.update();
  }

  update() {
    this.selected(this.value === this.parent.selected.value);
  }

  handleClick() {
    this.parent.onChange(this.options_);
    setTimeout(() => {
      this.menu.restore();
    }, 50);
  }
}

videojs.registerComponent('SettingSubOptionItem', SettingSubOptionItem);

export default SettingSubOptionItem;
