import videojs from 'video.js';
import log from '../../Utils/Log';

let getCurrentWindow;
try {
  getCurrentWindow = require('electron').remote.getCurrentWindow();
} catch (error) {
  getCurrentWindow = window.getCurrentWindow;
}

class ElectronFullscreenToggle extends videojs.getComponent(
  'FullscreenToggle'
) {
  constructor(player, options) {
    super(player, options);

    const currentWindow = window.getCurrentWindow();
    const setFullscreen = flag => {
      currentWindow.setFullScreen(flag);
      return player;
    };

    const triggerFullscreenChange = () => {
      player.trigger('fullscreenchange');
    };

    player.requestFullscreen = setFullscreen.bind(player, true);
    player.exitFullscreen = setFullscreen.bind(player, false);
    player.isFullscreen = () => currentWindow.isFullScreen();

    currentWindow.addListener('enter-full-screen', triggerFullscreenChange);
    currentWindow.addListener('leave-full-screen', triggerFullscreenChange);

    player.on('dispose', () => {
      currentWindow.removeListener(
        'enter-full-screen',
        triggerFullscreenChange
      );
      currentWindow.removeListener(
        'leave-full-screen',
        triggerFullscreenChange
      );
    });

    if (player.isFullscreen()) {
      // @ts-ignore
      this.handleFullscreenChange();
      player.addClass('vjs-fullscreen');
    }
  }

  handleClick() {
    if (this.player_.isFullscreen()) {
      this.player_.exitFullscreen();
    } else {
      this.player_.requestFullscreen();
    }
  }
}

if (getCurrentWindow) {
  videojs.registerComponent(
    'ElectronFullscreenToggle',
    ElectronFullscreenToggle
  );

  const controlBarChildren = videojs.getComponent('ControlBar').prototype
    .options_.children;

  const fullScreenButtonIndex = controlBarChildren.indexOf('fullscreenToggle');

  controlBarChildren[fullScreenButtonIndex] = 'ElectronFullscreenToggle';
} else {
  log(
    'Plugin "ElectronFullscreenToggle" is not enabled, please check the docs for more information'
  );
}
