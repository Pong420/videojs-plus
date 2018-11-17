import { hook, getComponent, registerComponent } from "video.js";

const SettingMenuItem = getComponent("SettingMenuItem");

class QualityItem extends SettingMenuItem {
  constructor(player, options = {}) {
    super(player, {
      name: "QualityItem",
      label: "Quality",
      icon: "vjs-icon-hd",
      entries: options.quality || []
    });

    if (!this.entries.length) {
      this.hide();
    }

    this.addClass("vjs-setting-quality");
  }

  update(selectedItem) {
    super.update(selectedItem);
    this.player_.quality.pick(selectedItem.value);
  }
}

registerComponent("QualityItem", QualityItem);

hook("setup", vjsPlayer => {
  const SettingMenu = vjsPlayer.findChild("SettingMenu")[0].component;
  SettingMenu.addChild(new QualityItem(vjsPlayer));
});

export default QualityItem;
