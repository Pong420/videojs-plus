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

    player.on('enterFullWindow', function() {
      player.trigger('fullscreenchange');
    });

    player.on('exitFullWindow', function() {
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
}

videojs.registerComponent('FullWindowToggle', FullWindowToggle);

const controlBarChildren = videojs.getComponent('ControlBar').prototype.options_.children;
const fullScreenButtonIndex = controlBarChildren.indexOf('FullscreenToggle');

controlBarChildren[fullScreenButtonIndex] = 'FullWindowToggle';
