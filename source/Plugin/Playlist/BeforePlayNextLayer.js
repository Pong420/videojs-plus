import videojs from 'video.js';

import './PlayNextSpinner';

const Component = videojs.getComponent('Component');

class BeforePlayNextLayer extends Component {
  constructor(player, options) {
    super(player, options);

    this.addChild('PlayNextSpinner', {}, 2);
    this.addChild(
      'CancelPlayNextEl',
      {
        text: '&#10005;',
        className: 'vjs-cancel-playnext-cross'
      },
      {},
      2
    );
    this.addChild(
      'CancelPlayNextEl',
      {
        text: 'Cancel',
        className: 'vjs-cancel-playnext-button'
      },
      {},
      2
    );

    this.originPoster = player.poster() || player.playlist.current().poster;
    player.poster(this.getNext().poster);

    // for user click on replay button or select another video
    const dispose = this.dispose.bind(this);
    const events = ['timeupdate', 'loadstart'];

    player.one(events, dispose);
    this.on('dispose', () => {
      player.off(events, dispose);
      player.removeClass('vjs-play-next-ready');
    });

    this.countdown(player.options_.playNextCountDown);

    player.addClass('vjs-play-next-ready');
  }

  getNext() {
    const playlist = this.player_.playlist;

    this.next = playlist.values[playlist.calc(1)];

    return this.next;
  }

  createEl() {
    const title = this.getNext().title;

    const el = videojs.dom.createEl('div', {
      className: 'vjs-before-playnext'
    });

    this.contentEl_ = videojs.dom.createEl('div', {
      className: 'vjs-before-playnext-content',
      innerHTML: `
        <div class="vjs-upnext-text">${this.localize('Up Next')}</div>
        <div class="vjs-playnext-title">
            <div>${title}</div>
        </div>
      `
    });

    el.appendChild(this.contentEl_);

    return el;
  }

  countdown(count) {
    if (typeof count === 'undefined') {
      count = 10;
    }

    if (count == 0) {
      this.timeup();
      return false;
    }

    let _this = this,
      a = 0,
      p = Math.PI,
      t = count;

    t = (t / 360) * 1000;

    (function draw() {
      a++;
      a %= 360;
      let r = (a * p) / 180,
        x = Math.sin(r) * 125,
        y = Math.cos(r) * -125,
        mid = a > 180 ? 1 : 0,
        anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';

      _this.getChild('PlayNextSpinner').path.setAttribute('d', anim);

      if (a === 0) {
        _this.timeup();
      } else {
        _this.timer = setTimeout(draw, t);
      }
    })();
  }

  timeup() {
    this.player_.playlist.next();
    this.player_.playlist.play();
    this.dispose();
  }

  cancel() {
    this.player_.poster(this.originPoster);

    return this;
  }

  dispose() {
    clearTimeout(this.timer);

    this.player_.removeChild(this);

    super.dispose();
  }
}

function playNext() {
  const player = this.player_;
  const { playlist } = player;
  const haveNextVideo = playlist.loop() || !playlist.ended();

  if (playlist.autoPlayNext() && haveNextVideo) {
    const controlbar = player.getChild('ControlBar');
    const index = player.children().indexOf(controlbar) - 1;

    player.addChild('BeforePlayNextLayer', {}, index);
  } else {
    player.poster(playlist.current().poster || '');
  }
}

videojs.registerPlugin('playNext', playNext);
videojs.registerComponent('BeforePlayNextLayer', BeforePlayNextLayer);
