import videojs from 'video.js';

const Button = videojs.getComponent('Button');

class PrevNextButton extends Button {
  constructor(player, options) {
    super(player, options);

    this.updateVisibility();
    this.controlText(options.controlText);

    player.on('playlist', this.updateVisibility.bind(this));
  }

  buildCSSClass() {
    return `${this.options_.className} ${super.buildCSSClass()}`;
  }

  updateVisibility() {
    const playlist = this.player_.playlist;

    if (playlist && playlist.values.length > 1) {
      this.show();
    } else {
      this.hide();
    }
  }

  createEl(tag, _, attributes) {
    return super.createEl(
      tag,
      {
        innerHTML: `<span aria-hidden="true" class="vjs-icon-placeholder ${this.options_.icon}"></span>`
      },
      attributes
    );
  }

  handleClick() {
    // prev / next
    const type = this.options_.controlText.toLowerCase();

    this.player_.playlist[type]();
    this.player_.playlist.play();
  }
}

const ControlBar = videojs.getComponent('ControlBar');
const children = ControlBar.prototype.options_.children;
const indexOfPlayToggle = children.indexOf('PlayToggle');

if (indexOfPlayToggle !== -1) {
  children.splice(0, 0, {
    name: 'PrevNextButton',
    className: 'vjs-prev-control',
    icon: 'vjs-icon-previous-item',
    controlText: 'Prev'
  });

  children.splice(indexOfPlayToggle + 2, 0, {
    name: 'PrevNextButton',
    className: 'vjs-next-control',
    icon: 'vjs-icon-next-item',
    controlText: 'Next'
  });
}

videojs.registerComponent('PrevNextButton', PrevNextButton);

export default PrevNextButton;
