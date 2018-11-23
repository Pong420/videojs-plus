import log from "../../Utils/Log";

const AUTOPLAY_SUCCESS = "autoplay-success";
const AUTOPLAY_FAILURE = "autoplay-failure";

const AutoplayHandler = player => {
  const NotPreoload = player.preload() === "none";

  if (!player.autoplay() || NotPreoload) {
    player.mutedautoplay_ = "ignore";

    if (NotPreoload) {
      videojs.log.warn("Preload is none so that manual autoplay start is disabled");
      player.trigger(AUTOPLAY_FAILURE);
    }

    return false;
  }

  const pause = player.pause;
  player.pause = () => {};

  const callback = () => {
    player.pause = pause;

    player.mutedautoplay_ = true;
  };

  const resolved = () => {
    log("Muted Autoplay - Promise Resolved");

    player.trigger(AUTOPLAY_SUCCESS);

    callback();
  };

  const rejected = error => {
    log("Muted Autoplay - Promise Rejected", error);

    player.muted(true);

    const handlePlay = player.play();

    if (handlePlay) {
      handlePlay.then(resolved).catch(err => {
        log("Seems autoplay is not allowed even player is muted", err);
        player.trigger(AUTOPLAY_FAILURE);
        player.hasStarted(false);
        callback();
      });
    } else {
      log("Second Play Promise is undefined");
      callback();
    }
  };

  player.one("loadedmetadata", function handleMutedAutoplay() {
    // without readym, `player.play()` may retutn `undefined` as `this.changingSrc_` is true
    player.ready(() => {
      const playPromise = player.play();

      if (playPromise !== undefined && playPromise !== null) {
        playPromise.then(resolved).catch(rejected);
      } else {
        log("Browser not support play promise");

        setTimeout(callback, 1000);
      }
    });
  });
};

videojs.hook("setup", vjsPlayer => {
  vjsPlayer.one("loadstart", () => {
    AutoplayHandler(vjsPlayer);
  });
});
