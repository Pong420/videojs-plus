import { getComponent, registerComponent } from "video.js";

const SettingMenuItem = getComponent("SettingMenuItem");

class SubtitlesMenuItem extends SettingMenuItem {
  constructor(player, options = {}) {
    super(player, {
      name: "SubtitlesMenuItem",
      label: "Subtitles",
      icon: "vjs-icon-subtitles",
      entries: options.subtitles || []
    });

    if (!this.entries.length) {
      this.hide();
    }

    this.addClass("vjs-setting-subtitles");
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.subtitles().pick(selectedItem.value);
  }
}

registerComponent("SubtitlesMenuItem", SubtitlesMenuItem);

videojs.hook("setup", vjsPlayer => {
  const SettingMenu = vjsPlayer.findChild("SettingMenu")[0].component;
  SettingMenu.addChild(new SubtitlesMenuItem(vjsPlayer));
});
