import { getComponent, registerComponent } from 'video.js';

const ClickableComponent = getComponent('ClickableComponent');

class CloseSettingMenu extends ClickableComponent {
  buildCSSClass() {
    return 'vjs-close-menu-layer vjs-close-setting-menu';
  }

  handleClick() {
    this.options_.menu.menuButton_.hideMenu();
  }
}

registerComponent('CloseSettingMenu', CloseSettingMenu);

export default CloseSettingMenu;
