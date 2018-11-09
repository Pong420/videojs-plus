import { registerComponent } from "video.js";

import SettingItem from "./SettingItem.js";

class SettingSubMenuItem extends SettingItem {
  constructor(player, options) {
    super(player, options);

    this.selectable = true;

    Object.assign(this, options);

    this.addChild("Component", {}, 0);
    this.addClass("vjs-settings-sub-menu-item");
    this.addClass("vjs-settings-sub-menu-option");

    this.update();
  }

  update() {
    this.selected(this.value === this.parent.currentValue.value);
  }

  handleClick() {
    this.parent.update(this);
  }
}

registerComponent("SettingSubMenuItem", SettingSubMenuItem);

export default SettingSubMenuItem;
