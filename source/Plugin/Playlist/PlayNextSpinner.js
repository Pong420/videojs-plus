import videojs from 'video.js';

const ClickableComponent = videojs.getComponent('ClickableComponent');

class PlayNextSpinner extends ClickableComponent {
  buildCSSClass() {
    return 'vjs-playnext-spinner';
  }

  createEl() {
    const el = super.createEl('div', {
      innerHTML: `
        <div class="vjs-icon-placeholder vjs-icon-play"></div>
        <svg width="60" height="60" viewbox="0 0 60 60">
          <circle cx="30" cy="30" r="30"/>
          <path class="vjs-playnext-spinner-border" fill="#FFF" transform="translate(30, 30)"/>
          <circle id="donut" cx="30" cy="30" r="27"/>
        </svg>
      `
    });

    this.path = el.querySelector('path');

    return el;
  }

  handleClick() {
    this.player_.getChild('BeforePlayNextLayer').timeup();
  }
}

PlayNextSpinner.prototype.controlText_ = 'PlayNext';

videojs.registerComponent('PlayNextSpinner', PlayNextSpinner);

export default PlayNextSpinner;
