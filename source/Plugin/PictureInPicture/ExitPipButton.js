import { getComponent, registerComponent } from 'video.js';

const ClickableComponent = getComponent('ClickableComponent');

class ExitPipButton extends ClickableComponent {
  constructor(player, options) {
    super(player, {
      name: 'ExitPipButton',
      ...options
    });

    this.addClass('vjs-exit-pip-button');

    this.el_.querySelector('.vjs-icon-placeholder').innerHTML = '&#10005;';
  }

  handleClick() {
    this.options_.parentPlayer.pictureInPicture().exit();
  }
}

ExitPipButton.prototype.controlText_ = 'Exit Pictutre In Pictutre';

registerComponent('ExitPipButton', ExitPipButton);

export default ExitPipButton;
