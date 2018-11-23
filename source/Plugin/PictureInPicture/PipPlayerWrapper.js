import { getComponent, registerComponent } from 'video.js';
import ExitPipButton from './ExitPipButton';

const Component = getComponent('Component');

class PipPlayerWrapper extends Component {
  constructor(player, options) {
    super(player, options);

    player.addChild(
      new ExitPipButton(player, {
        parentPlayer: options.parentPlayer
      })
    );

    this.addChild(player);

    if (!options.wrapper) {
      this.addClass('vjs-pip-player-wrapper');
      document.body.appendChild(this.el_);
    }
  }

  createEl() {
    if (this.options_.wrapper) {
      return this.options_.wrapper;
    }

    return super.createEl();
  }
}

registerComponent('PipPlayerWrapper', PipPlayerWrapper);

export default PipPlayerWrapper;
