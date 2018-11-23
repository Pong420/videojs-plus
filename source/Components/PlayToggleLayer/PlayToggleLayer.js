import './PlayToggleLayer.scss';
import { getComponent, registerComponent, dom } from 'video.js';

const PlayToggleButton = getComponent('PlayToggle');
const ClickableComponent = getComponent('ClickableComponent');

class PlayToggleLayer extends ClickableComponent {
  constructor(player, options) {
    super(player, options);

    // this.on("click", this.handleClick.bind(this));
  }

  createEl() {
    return dom.createEl('div', {
      className: 'vjs-play-toggle-layer'
    });
  }

  handleClick(evt) {
    if (this.player_.userActive() || this.player_.paused()) {
      PlayToggleButton.prototype.handleClick.call(this, evt);
    }
  }
}

registerComponent('PlayToggleLayer', PlayToggleLayer);

const playerChildren = getComponent('Player').prototype.options_.children;
const loadSpinnerIndex = playerChildren.indexOf('loadingSpinner');

playerChildren.splice(loadSpinnerIndex, 0, 'PlayToggleLayer');
