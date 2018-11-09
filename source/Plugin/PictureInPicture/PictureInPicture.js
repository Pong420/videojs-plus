import { dom, registerPlugin, getPlugin } from "video.js";

import "./PictureInPicture.scss";
import "./PipButton";
import PipPlayerWrapper from "./PipPlayerWrapper";

const Plugin = getPlugin("plugin");

class pictureInPicture extends Plugin {
  constructor(player, options = {}) {
    super(player, options);

    console.log("HI");

    this.cache_ = {};
    this.pipPlayer = null;
    this.options_ = options;
  }

  toggle() {
    if (this.pipPlayer) {
      this.dispose();
    } else {
      this.init();
    }
  }

  init() {
    if (!this.pipPlayer) {
      this.handleOriginPlayer();
      this.createPipPlayer();
    }
  }

  createPipPlayer() {
    const { player, options_ } = this;
    const id = player.id_ + "-pip-player";
    const videoEl = dom.createEl("video", {
      id: id,
      className: "vjs-pip-player"
    });

    document.body.appendChild(videoEl);

    const playerOptions = Object.assign(player.options_, {
      autoplay: true,
      muted: player.muted()
    });

    const pipPlayer = (this.pipPlayer = videojs(videoEl, playerOptions));

    console.log(this.pipPlayer);

    this.wrapper = new PipPlayerWrapper(pipPlayer, options_);
    this.dragzone = pipPlayer.getChild("PlayToggleLayer");

    this.updatePosition(Object.assign({}, this.cache_, options_));

    pipPlayer.ready(() => {
      pipPlayer.currentTime(player.currentTime());
      pipPlayer.play();
    });

    if (options_.draggable !== false) {
      this.draggable(this.dragzone.el_);
    }
  }

  handleOriginPlayer() {
    const { player } = this;

    player.pause();
    player.hasStarted(false);
    player.controls(false);
    player.addClass("vjs-pip-player-enabled");

    player.one("play", () => {
      this.dispose();
      this.wrapper.dispose();
    });
  }

  dispose() {
    const { player, pipPlayer } = this;

    if (pipPlayer) {
      player.controls(true);
      player.removeClass("vjs-pip-player-enabled");

      player.paused() && player.play();

      !pipPlayer.ended() && player.currentTime(pipPlayer.currentTime());

      pipPlayer.dispose();

      this.pipPlayer = null;
    }
  }

  updatePosition({ x, y }) {
    if (typeof x !== "undefined" && typeof y !== "undefined") {
      this.wrapper.el_.style.bottom = y + "px";
      this.wrapper.el_.style.left = x + "px";
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

    el.addEventListener("mousedown", evt => {
      evt.preventDefault();

      x = evt.offsetX;
      y = evt.offsetY;

      const disableClick = () => {
        window.removeEventListener("mousemove", disableClick);
        _this.dragzone.disable();
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mousemove", disableClick);

      window.addEventListener("mouseup", function mouseup(evt) {
        window.removeEventListener("mouseup", mouseup);
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mousemove", disableClick);

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

    window.addEventListener("resize", onResize);

    this.pipPlayer.on("dispose", () => {
      window.removeEventListener("resize", onResize);
    });
  }
}

registerPlugin("pictureInPicture", pictureInPicture);
