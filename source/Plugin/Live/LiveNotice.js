import videojs from 'video.js';

const Component = videojs.getComponent('Component');

class LiveNotice extends Component {
  createEl() {
    const el = videojs.dom.createEl('div', {
      className: 'vjs-live-notice',
      innerHTML: `
        <div class="vjs-live-notice-spot vjs-icon-circle"></div>
        Live
      `
    });

    return el;
  }
}

videojs.registerComponent('LiveNotice', LiveNotice);

export default LiveNotice;
