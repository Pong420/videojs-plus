import videojs from 'video.js';

import './ContextMenu.scss';
import './Item/ContextMenuToggleLoop.js';
import './Item/AboutThisPlayer.js';

import CloseContextMenu from './CloseContextMenu';

const Menu = videojs.getComponent('Menu');

class ContextMenu extends Menu {
  constructor(player, options) {
    super(player, options);

    this.addClass('vjs-context-menu');

    this.hide();

    this.player_.on('contextmenu', this.onContextmenu.bind(this));
  }

  createEl(...args) {
    const el = super.createEl(...args);

    const layer = new CloseContextMenu(this.player_, {
      menu: this
    });

    el.insertBefore(layer.el_, el.firstElementChild);

    return el;
  }

  show(x, y) {
    super.show();

    this.el_.style.top = y + 'px';
    this.el_.style.left = x + 'px';
  }

  onContextmenu(event) {
    event.preventDefault();

    const rect = this.player_.el().getBoundingClientRect();
    const { pageX, pageY } = event;

    if (
      pageY > rect.y &&
      pageY - rect.height < rect.y &&
      pageX > rect.x &&
      pageX - rect.width < rect.x
    ) {
      const x = pageX - rect.x;
      const y = pageY - rect.y;

      this.show(x, y);
    } else {
      this.hide();
    }
  }

  handleClick(evt) {
    if (evt.button || evt.button === 0) {
      if (evt.button !== 2) {
        this.hide();
      }
    }
  }
}

ContextMenu.prototype.options_ = {
  children: ['ContextMenuToggleLoop', 'AboutThisPlayer']
};

videojs.registerComponent('ContextMenu', ContextMenu);

videojs.getComponent('Player').prototype.options_.children.push('ContextMenu');
