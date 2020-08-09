import videojs from 'video.js';

const Button = videojs.getComponent('Button');

class PipButton extends Button {
  constructor(player, options) {
    super(player, options);

    this.el_.querySelector('.vjs-icon-placeholder').className +=
      ' vjs-icon-picture-in-picture';
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

videojs.registerComponent('PipButton', PipButton);

videojs.hook('setup', vjsPlayer => {
  const { parent, index } = vjsPlayer.findChild('SettingMenuButton')[0];

  parent.addChild(new PipButton(vjsPlayer), {}, index);
});
