import videojs, { dom, registerPlugin, getPlugin } from 'video.js';

import PipPlayerWrapper from './PipPlayerWrapper';
import './PictureInPicture.scss';
import './PipButton';

videojs.pipPlayer = null;

class pictureInPicture extends getPlugin('plugin') {
  constructor(player, options = {}) {
    super(player, options);

    this.cache_ = {};
    this.options_ = options;
    this.parentPlayer = player;
  }

  toggle() {
    if (videojs.pipPlayer) {
      this.exit();
    } else {
      this.init();
    }
  }

  init() {
    if (!videojs.pipPlayer) {
      this.handleOriginPlayer();
      this.createPipPlayer();
    }
  }

  createPipPlayer() {
    const { parentPlayer, options_ } = this;
    const id = parentPlayer.id_ + '-pip-player';
    const videoEl = dom.createEl('video', {
      id: id,
      className: 'vjs-pip-player'
    });

    document.body.appendChild(videoEl);

    const pipPlayerOptions = {
      ...parentPlayer.options_,
      ...parentPlayer.cache_,
      fluid: true,
      autoplay: true,
      muted: parentPlayer.muted()
    };

    const pipPlayer = (videojs.pipPlayer = videojs(videoEl, pipPlayerOptions));

    this.wrapper = new PipPlayerWrapper(pipPlayer, {
      ...options_,
      parentPlayer
    });

    this.dragzone = pipPlayer.getChild('PlayToggleLayer');

    this.updatePosition({
      ...this.cache_,
      ...options_
    });

    pipPlayer.ready(() => {
      pipPlayer.currentTime(parentPlayer.currentTime());
      pipPlayer.play();
    });

    if (options_.draggable !== false) {
      this.draggable(this.dragzone.el_);
    }
  }

  handleOriginPlayer() {
    const { parentPlayer } = this;

    parentPlayer.pause();
    parentPlayer.hasStarted(false);
    parentPlayer.controls(false);
    parentPlayer.addClass('vjs-pip-player-enabled');

    const onPlay = () => {
      this.exit();
    };

    parentPlayer.one('loadstart', () => {
      parentPlayer.off('play', onPlay);
      parentPlayer.one('playing', parentPlayer.pause);
    });

    parentPlayer.one('play', onPlay);
  }

  exit() {
    const { parentPlayer, wrapper } = this;
    const { pipPlayer } = videojs;

    if (parentPlayer) {
      parentPlayer.controls(true);
      parentPlayer.removeClass('vjs-pip-player-enabled');
      parentPlayer.paused() && parentPlayer.play();

      if (pipPlayer) {
        if (!pipPlayer.ended()) {
          parentPlayer.currentTime(pipPlayer.currentTime());
        }
      }
    }

    if (pipPlayer) {
      pipPlayer.dispose();
      wrapper.dispose();
    }

    videojs.pipPlayer = null;
  }

  dispose() {
    super.dispose();

    this.parentPlayer = null;
  }

  updatePosition({ x, y }) {
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      this.wrapper.el_.style.bottom = y + 'px';
      this.wrapper.el_.style.left = x + 'px';
    }
  }

  draggable(el) {
    let x, y;
    const _this = this;

    const move = evt => {
      evt.preventDefault();

      this.cache_.x = Math.max(0, Math.min(window.innerWidth - el.offsetWidth, evt.clientX - x));
      this.cache_.y = Math.max(
        0,
        Math.min(window.innerHeight - el.offsetHeight, window.innerHeight - evt.clientY - el.offsetHeight + y)
      );

      this.updatePosition(this.cache_);
    };

    el.addEventListener('mousedown', evt => {
      evt.preventDefault();

      x = evt.offsetX;
      y = evt.offsetY;

      const disableClick = () => {
        window.removeEventListener('mousemove', disableClick);
        _this.dragzone.disable();
      };

      window.addEventListener('mousemove', move);
      window.addEventListener('mousemove', disableClick);

      window.addEventListener('mouseup', function mouseup(evt) {
        window.removeEventListener('mouseup', mouseup);
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mousemove', disableClick);

        setTimeout(() => {
          _this.dragzone.enable();
        }, 0);
      });
    });

    const onResize = () => {
      const { x, y } = this.cache_;

      this.updatePosition({
        x: Math.min(x, window.innerWidth - el.offsetWidth),
        y: Math.min(y, window.innerHeight - el.offsetHeight)
      });
    };

    window.addEventListener('resize', onResize);

    videojs.pipPlayer.on('dispose', () => {
      window.removeEventListener('resize', onResize);
    });
  }
}

registerPlugin('pictureInPicture', pictureInPicture);
