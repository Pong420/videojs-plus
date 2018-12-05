import { getComponent, registerComponent } from 'video.js';

const Button = getComponent('Button');

class PipButton extends Button {
  constructor(player, options) {
    super(player, options);

    this.el_.querySelector('.vjs-icon-placeholder').className += ' vjs-icon-picture-in-picture';
  }

  buildCSSClass() {
    return `vjs-pip-button ${super.buildCSSClass()}`;
  }

  handleClick(...args) {
    super.handleClick(...args);

    this.player_.pictureInPicture().toggle();
  }
}

PipButton.prototype.controlText_ = 'Picture in Picture';

registerComponent('PipButton', PipButton);

const controlBarChildren = getComponent('ControlBar').prototype.options_.children;
const indexOfSettingButton = controlBarChildren.indexOf('SettingMenuButton');

controlBarChildren.splice(indexOfSettingButton, 0, 'PipButton');
