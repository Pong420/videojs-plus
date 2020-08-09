import videojs from 'video.js';

import './Title.scss';

class Title extends videojs.getComponent('Component') {
  constructor(player, options) {
    super(player, options);

    this.title_ = options.playerOptions.title || '';

    this.update(this.title_);
  }

  createEl() {
    const el = super.createEl('div', {
      className: 'vjs-title'
    });

    this.contentEl_ = videojs.dom.createEl('div', {
      className: 'vjs-title-field'
    });

    el.appendChild(this.contentEl_);

    return el;
  }

  update(title_) {
    if (!title_) {
      this.hide();
    } else {
      this.show();
    }

    this.player_.cache_.title = this.title_;
    this.title_ = title_;

    this.contentEl_.innerHTML = title_;
  }
}

const title = function (title_) {
  const videoTitle = this.player_.getChild('VideoTitle');

  if (typeof title_ === 'undefined') {
    return videoTitle.title_;
  }

  videoTitle.update(title_);
};

videojs.registerPlugin('title', title);
videojs.registerComponent('VideoTitle', Title);

videojs
  .getComponent('Player')
  .prototype.options_.children.splice(2, 0, 'VideoTitle');
