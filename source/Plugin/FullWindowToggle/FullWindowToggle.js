import videojs from 'video.js';

import './FullWindowToggle.scss';

class FullWindowToggle extends videojs.getComponent('FullscreenToggle') {
  constructor(player, options) {
    super(player, options);

    player.requestFullscreen = player.enterFullWindow.bind(player);
    player.enterFullScreen = player.enterFullWindow.bind(player);
    player.exitFullscreen = player.exitFullWindow.bind(player);

    player.isFullscreen = () => {
      return !!player.isFullWindow;
    };

    player.on(['enterFullWindow', 'exitFullWindow'], function () {
      player.toggleFullscreenClass_();
      player.trigger('fullscreenchange');
    });
  }

  handleClick() {
    if (!this.player_.isFullWindow) {
      this.player_.enterFullScreen();
    } else {
      this.player_.exitFullscreen();
    }
  }

  // Since `FullWindowToggle` are extends from `FullscreenToggle`,
  // disable function will be called if the browser does not support fullscreen API
  // However, `FullWindowToggle` is assumed support in all platform. So the function should be override
  disable(force) {
    force && super.disable();
  }
}

videojs.registerComponent('FullWindowToggle', FullWindowToggle);

const controlBarChildren = videojs.getComponent('ControlBar').prototype.options_
  .children;
const fullScreenButtonIndex = controlBarChildren.indexOf('FullscreenToggle');

controlBarChildren[fullScreenButtonIndex] = 'FullWindowToggle';
