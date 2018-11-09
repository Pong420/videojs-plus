import { hook, getComponent, registerComponent } from "video.js";

const SettingMenuItem = getComponent("SettingMenuItem");

class ResolutionItem extends SettingMenuItem {
  constructor(player, options = {}) {
    super(player, {
      name: "ResolutionItem",
      label: "Resolution",
      icon: "vjs-icon-hd",
      entries: options.resolution || []
    });

    if (!this.entries.length) {
      this.hide();
    }

    this.addClass("vjs-setting-resolution");
  }

  update(selectedItem) {
    super.update(selectedItem);
    this.player_.resolution.pick(selectedItem.value);
  }
}

registerComponent("ResolutionItem", ResolutionItem);

hook("setup", vjsPlayer => {
  const SettingMenu = vjsPlayer.findChild("SettingMenu")[0].component;
  SettingMenu.addChild(new ResolutionItem(vjsPlayer));
});

export default ResolutionItem;
