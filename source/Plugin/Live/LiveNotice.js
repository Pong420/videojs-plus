import { dom, hook, getComponent, registerComponent } from "video.js";

const Component = getComponent("Component");

class LiveNotice extends Component {
  createEl() {
    const el = dom.createEl("div", {
      className: "vjs-live-notice",
      innerHTML: `
        <div class="vjs-live-notice-spot vjs-icon-circle"></div>
        Live
      `
    });
    return el;
  }
}

registerComponent("LiveNotice", LiveNotice);

export default LiveNotice;
