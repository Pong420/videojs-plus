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

    const player = this.player;
    const current = this.current();
    const cachedCurrentTime = player.ended() ? 0 : player.currentTime();

    if (cachedCurrentTime) {
      player.one("loadedmetadata", () => {
        player.one("canplaythrough", () => {
          player.currentTime(cachedCurrentTime);
        });

        player.play();
      });
    }

    player.src(current.sources);

    player.trigger(
      "qualitychange",
      Object.assign(current, {
        index: this.index()
      })
    );

    // console.log(this.player.cache_.currentTime);
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
