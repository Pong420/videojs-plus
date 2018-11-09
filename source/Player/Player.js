import { browser } from "video.js";

import "./Player.scss";

export default function(vjsPlayer) {
  vjsPlayer.playsinline(true);

  vjsPlayer.addClass("video-js");

  if (browser.IS_IPHONE) {
    vjsPlayer.addClass("vjs-is-iphone");
    if (browser.IOS_VERSION < 11) {
      vjsPlayer.addClass("vjs-iphone-below-11");
    } else {
      vjsPlayer.addClass("vjs-iphone-11");
    }
  }

  browser.TOUCH_ENABLED && vjsPlayer.removeClass("vjs-workinghover");
}
