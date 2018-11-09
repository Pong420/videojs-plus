import { getComponent, registerComponent, hook } from "video.js";

import "./FullWindowToggle.scss";

class FullWindowToggle extends getComponent("FullscreenToggle") {
  constructor(player, options) {
    super(player, options);

    player.requestFullscreen = player.enterFullWindow.bind(player);
    player.enterFullScreen = player.enterFullWindow.bind(player);
    player.exitFullscreen = player.exitFullWindow.bind(player);

    player.isFullscreen = () => {
      return !!player.isFullWindow;
    };

    player.on("enterFullWindow", function() {
      player.trigger("fullscreenchange");
    });

    player.on("exitFullWindow", function() {
      player.trigger("fullscreenchange");
    });
  }

  handleClick() {
    if (!this.player_.isFullWindow) {
      this.player_.enterFullScreen();
    } else {
      this.player_.exitFullscreen();
    }
  }
}

registerComponent("FullWindowToggle", FullWindowToggle);

hook("setup", vjsPlayer => {
  if (vjsPlayer.options_.fullwindow === true) {
    const { parent, component } = vjsPlayer.findChild("FullscreenToggle")[0];

    parent.removeChild(component);
    parent.addChild(new FullWindowToggle(vjsPlayer));
  }
});
