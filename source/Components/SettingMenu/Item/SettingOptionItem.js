import { registerComponent, dom } from 'video.js';

import SettingMenuItem from './SettingMenuItem.js';
import SettingSubOptionTitle from './SettingSubOptionTitle.js';
import SettingSubOptionItem from './SettingSubOptionItem.js';
import getMenuDimension from '../MenuDimension';

function parseEntries(entries) {
  let currentValue;

  entries = entries.map((data, index) => {
    const isDefault = typeof data.defalut !== 'undefined' ? data.defalut : false;
    const entry = {
      ...data,
      label: typeof data.label !== 'undefined' ? data.label : data,
      value: typeof data.value !== 'undefined' ? data.value : data,
      defalut: isDefault,
      index
    };

    if (isDefault) {
      currentValue = entry;
    }

    return entry;
  });

  if (!currentValue) {
    currentValue = entries[0];
  }

  return {
    entries,
    currentValue
  };
}

class SettingOptionItem extends SettingMenuItem {
  constructor(player, options = {}) {
    super(player, Object.assign(options, parseEntries(options.entries)));

    this.setEntries(this.options_.entries);

    if (!this.entries.length) {
      this.hide();
    }
  }

  createEl() {
    const { icon, label, currentValue } = this.options_;
    const el = dom.createEl('li', {
      className: 'vjs-menu-item vjs-setting-menu-item',
      innerHTML: `
        <div class="vjs-icon-placeholder ${icon || ''}"></div>
        <div class="vjs-setting-menu-label">${this.localize(label)}</div>
        <div class="vjs-spacer"></div>
      `
    });

    this.currentValueEl = dom.createEl('div', {
      className: 'vjs-setting-menu-value',
      innerHTML: this.localize(currentValue ? currentValue.label : '')
    });

    el.appendChild(this.currentValueEl);

    return el;
  }

  setEntries(entries_) {
    const { entries, currentValue } = parseEntries(entries_);

    this.entries = entries;
    this.currentValue = currentValue;

    if (currentValue) {
      this.currentValueEl.innerHTML = this.localize(currentValue.label);
    }

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
    this.currentValue = {
      label,
      value
    };

    this.currentValueEl.innerHTML = this.localize(label);

    this.subMenuItems.forEach(function(item) {
      item.update && item.update();
    });

    // this.menu.menuButton_.unpressButton()
    this.menu.restore();
  }

  show() {
    super.show();
    this.menu.reset();
  }
}

registerComponent('SettingOptionItem', SettingOptionItem);

export default SettingOptionItem;
