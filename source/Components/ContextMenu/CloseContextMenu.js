import videojs from 'video.js';

const ClickableComponent = videojs.getComponent('ClickableComponent');

// for mobile view
class CloseContextMenu extends ClickableComponent {
  buildCSSClass() {
    return 'vjs-close-menu-layer vjs-close-context-menu';
  }

  handleClick() {
    this.options_.menu.hide();
  }
}

videojs.registerComponent('CloseContextMenu', CloseContextMenu);

export default CloseContextMenu;
