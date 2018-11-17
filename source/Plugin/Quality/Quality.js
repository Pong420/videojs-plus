import { hook, registerPlugin } from "video.js";

import List from "../../Utils/List";
import "./QualityItem";

class Quality extends List {
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
      "qualitychange",
      Object.assign(current, {
        index: this.index()
      })
    );
  }
}

const setQuality = function(quality) {
  const player = this.player_;
  const QualityItem = player.findChild("QualityItem")[0].component;

  player.quality = new Quality(player, quality);

  QualityItem.setEntries(
    quality.map(({ label, default: default_ }, index) => ({
      label,
      value: index,
      defalut: default_
    }))
  );

  QualityItem.show();

  player.trigger("quality");
};

registerPlugin("setQuality", setQuality);

hook("setup", vjsPlayer => {
  const quality = vjsPlayer.options_.quality || [];

  if (quality.length) {
    vjsPlayer.setQuality(quality);
  }
});
