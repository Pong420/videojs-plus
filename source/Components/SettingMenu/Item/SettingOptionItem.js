import { registerComponent, dom } from 'video.js';

import SettingMenuItem from './SettingMenuItem.js';
import SettingSubOptionTitle from './SettingSubOptionTitle.js';
import SettingSubOptionItem from './SettingSubOptionItem.js';
import getMenuDimension from '../MenuDimension';

function parseEntries(entries) {
  let selected;

  entries = entries.map((data, index) => {
    const { defalut: isDefault, label, value } = data;
    const parsed = {
      defalut: typeof isDefault !== 'undefined' ? isDefault : false,
      label: typeof label !== 'undefined' ? label : data,
      value: typeof value !== 'undefined' ? value : data,
      index
    };

    const entry = Object.assign(data, parsed);

    if (isDefault) {
      selected = entry;
    }

    return entry;
  });

  if (!selected) {
    selected = entries[0];
  }

  return {
    entries,
    selected
  };
}

class SettingOptionItem extends SettingMenuItem {
  constructor(player, options = {}) {
    super(player, options);

    this.setEntries(this.options_.entries);

    if (!this.entries.length) {
      this.hide();
    }
  }

  createEl() {
    const { icon, label } = this.options_;
    const el = dom.createEl('li', {
      className: 'vjs-menu-item vjs-setting-menu-item',
      innerHTML: `
        <div class="vjs-icon-placeholder ${icon || ''}"></div>
        <div class="vjs-setting-menu-label">${this.localize(label)}</div>
        <div class="vjs-spacer"></div>
      `
    });

    this.selectedValueEl = dom.createEl('div', {
      className: 'vjs-setting-menu-value'
    });

    el.appendChild(this.selectedValueEl);

    return el;
  }

  setEntries(entries_) {
    Object.assign(this, parseEntries(entries_));

    this.updateSelectedValue();

    this.subMenuItems = this.entries.map(({ label, value }) => {
      return new SettingSubOptionItem(this.player_, {
        label,
        value,
        parent: this,
        menu: this.menu
      });
    });

    this.subMenuItems.splice(
      0,
      0,
      new SettingSubOptionTitle(this.player_, {
        label: this.options_.label,
        menu: this.menu
      })
    );
  }

  handleClick() {
    const dimensions = getMenuDimension(this.player_, this.subMenuItems);

    this.menu.update(this.subMenuItems);
    this.menu.resize(dimensions);
  }

  update({ label, value }) {
    this.selected = {
      label,
      value
    };

    this.updateSelectedValue();

    this.subMenuItems.forEach(function(item) {
      item.update && item.update();
    });

    // this.menu.menuButton_.unpressButton()
    this.menu.restore();
  }

  updateSelectedValue() {
    this.selectedValueEl.innerHTML = this.localize(this.selected.label);
  }

  show() {
    super.show();
    this.menu.reset();
  }
}

registerComponent('SettingOptionItem', SettingOptionItem);

export default SettingOptionItem;
