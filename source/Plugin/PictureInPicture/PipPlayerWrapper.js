import { getComponent, registerComponent } from "video.js";

const Component = getComponent("Component");

class PipPlayerWrapper extends Component {
  constructor(player, options) {
    super(player, options);

    this.el_.appendChild(player.el());

    if (!options.wrapper) {
      this.addClass("vjs-pip-player-wrapper");
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

registerComponent("PipPlayerWrapper", PipPlayerWrapper);

export default PipPlayerWrapper;
