import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import './Player.scss';

const videojs = (window.videojs = require('video.js'));

require('videojs-plus/dist/videojs-plus.min.js');
require('videojs-plus/dist/videojs-plus.min.css');

class Player extends Component {
  componentDidMount() {
    this.el = findDOMNode(this);
    this.videoEl = this.el.querySelector('video');

    this.createPlayer();
  }

  componentWillUnmount() {
    this.destroyPlayer();
  }

  createPlayer() {
    if (this.player && !this.player.isFullscreen()) {
      this.destroyPlayer();
    }

    this.player = videojs(this.videoEl, this.props.playerOptions);

    // for debug purpose
    window.player = this.player;

    // insert children element into videojs container
    const children = Array.prototype.slice.call(this.el.children);
    const playerEl = this.player.el_;
    const referEl = this.player.getChild('PlayToggleLayer').el_;

    children.forEach(el => {
      if (el !== playerEl) {
        playerEl.insertBefore(el, referEl);
      }
    });

    if (typeof this.props.onPlayerInit === 'function') {
      this.props.onPlayerInit(this.player);
    }
  }

  destroyPlayer() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }

  render() {
    return (
      <div className="player">
        <video />
        {this.props.children}
      </div>
    );
  }
}

export default Player;
