import videojs from 'video.js';
import ContextMenuItem from './ContextMenuItem.js';

class ContextMenuToggleLoop extends ContextMenuItem {
  constructor(player) {
    super(player, {
      name: 'ContextMenuToggleLoop',
      label: 'Loop',
      icon: 'vjs-icon-loop'
    });

    this.addClass('vjs-checkbox');

    player.on('loadstart', this.update.bind(this));
  }

  update() {
    this.selected(this.player_.loop());
  }

  handleClick() {
    super.handleClick();

    this.player_.loop(!this.player_.loop());

    this.update();
  }
}

videojs.registerComponent('ContextMenuToggleLoop', ContextMenuToggleLoop);

export default ContextMenuToggleLoop;
