import SettingMenuItem from "../Item/SettingMenuItem.js";
import { registerComponent } from "video.js";

class PlaybackRateSettingMenuItem extends SettingMenuItem {
  constructor(player, options) {
    super(
      player,
      Object.assign(options, {
        label: "Speed",
        icon: "vjs-icon-slow-motion-video",
        entries: [
          0.5,
          0.75,
          {
            label: "Normal",
            value: 1,
            defalut: true
          },
          1.25,
          1.5,
          2
        ]
      })
    );

    this.addClass("vjs-setting-playback-rate");

    this.ratechangeBySettingMenu = false;

    const _this = this;
    const entries = this.entries;

    player.on("ratechange", function() {
      if (!_this.ratechangeBySettingMenu) {
        const rate = player.playbackRate();
        const currentValue =
          entries.filter(value => {
            return rate === value;
          })[0] || entries[2];

        _this.update(currentValue);
      }

      _this.ratechangeBySettingMenu = false;
    });
  }

  handleClick() {
    this.ratechangeBySettingMenu = true;

    super.handleClick();
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.playbackRate(selectedItem.value);
  }
}

registerComponent("PlaybackRateSettingMenuItem", PlaybackRateSettingMenuItem);

export default PlaybackRateSettingMenuItem;
