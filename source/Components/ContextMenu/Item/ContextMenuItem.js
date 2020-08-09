import videojs from 'video.js';

const MenuItem = videojs.getComponent('MenuItem');

class ContextMenuItem extends MenuItem {
  constructor(player, options) {
    super(player, {
      ...options,
      selectable: true
    });

    this.addClass('vjs-context-menu-item');

    this.controlText(options.label);
  }

  createEl(...args) {
    const el = super.createEl(...args);

    el.insertAdjacentHTML(
      'afterbegin',
      `<span aria-hidden="true" class="vjs-icon-placeholder ${
        this.options_.icon || ''
      }"></span>`
    );

    return el;
  }

  handleClick() {
    const { component: ContextMenu } = this.player_.findChild('ContextMenu')[0];

    ContextMenu.hide();
  }
}

videojs.registerComponent('ContextMenuItem', ContextMenuItem);

export default ContextMenuItem;
