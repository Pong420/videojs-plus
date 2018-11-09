import { hook, registerPlugin } from "video.js";

import List from "../../Utils/List";
import "./ResolutionItem";

class Resolution extends List {
  constructor(player, array, startIndex = 0) {
    super(array, startIndex);

    this.player = player;

    this.pick(startIndex);
  }

  pick(index) {
    if (typeof index !== "undefined") {
      this.index(index);
    }

    const current = this.current();

    this.player.src(current.sources);

    this.player.trigger(
      "resolutionchange",
      Object.assign(current, {
        index: this.index()
      })
    );
  }
}

const setResolution = function(resolution) {
  const player = this.player_;
  const ResolutionItem = player.findChild("ResolutionItem")[0].component;

  player.resolution = new Resolution(player, resolution);

  ResolutionItem.setEntries(
    resolution.map(({ label, default: default_ }, index) => ({
      label,
      value: index,
      defalut: default_
    }))
  );

  ResolutionItem.show();

  player.trigger("resolution");
};

registerPlugin("setResolution", setResolution);

hook("setup", vjsPlayer => {
  const resolution = vjsPlayer.options_.resolution || [];

  if (resolution.length) {
    vjsPlayer.setResolution(resolution);
  }
});
