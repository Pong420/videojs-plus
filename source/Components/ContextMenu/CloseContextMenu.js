import { getComponent, registerComponent } from "video.js";

const ClickableComponent = getComponent("ClickableComponent");

class CloseContextMenu extends ClickableComponent {
  buildCSSClass() {
    return `vjs-close-menu-layer vjs-close-context-menu`;
  }

  handleClick() {
    this.options_.menu.hide();
  }
}

registerComponent("CloseContextMenu", CloseContextMenu);

export default CloseContextMenu;
