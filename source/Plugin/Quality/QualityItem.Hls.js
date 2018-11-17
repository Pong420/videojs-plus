import { hook, getComponent, registerComponent } from "video.js";

const SettingMenuItem = getComponent("SettingMenuItem");

class QualityHlsItem extends SettingMenuItem {
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

    this.levels = [];

    this.handleAllLevelsAdded();
  }

  handleAllLevelsAdded() {
    const qualityLevels = this.player_.qualityLevels();
    let levels = [];
    let timeout;

    qualityLevels.on("addqualitylevel", ({ qualityLevel }) => {
      clearTimeout(timeout);

      levels.push(qualityLevel);

      const callback = () => {
        this.levels = levels.slice(0);

        this.player_.trigger("before-quality-setup", {
          levels: this.levels
        });

        this.onAllLevelsAdded();

        levels = [];
      };

      timeout = setTimeout(callback, 10);
    });
  }

  onAllLevelsAdded() {
    const entries = this.levels
      .map(({ height }) => {
        return {
          label: this.localize(`${height}p`),
          value: height,
          defalut: false
        };
      })
      .sort((a, b) => {
        return b.value - a.value;
      })
      .concat({
        label: "Auto",
        value: "auto",
        defalut: true
      });

    this.setEntries(entries);
    this.show();

    this.player_.trigger("quality");
  }

  update(selectedItem) {
    super.update(selectedItem);

    const value = selectedItem.value;

    this.levels.forEach(lv => {
      lv.enabled = lv.height === value || value === "auto";
    });

    this.player_.trigger(
      "qualitychange",
      this.entries.reduce((acc, entry, index) => {
        if (entry.value === value) {
          return {
            index,
            ...entry
          };
        }

        return acc;
      }, {})
    );
  }
}

registerComponent("QualityHlsItem", QualityHlsItem);

hook("setup", vjsPlayer => {
  const SettingMenu = vjsPlayer.findChild("SettingMenu")[0].component;
  SettingMenu.addChild(new QualityHlsItem(vjsPlayer));
});

export default QualityHlsItem;
