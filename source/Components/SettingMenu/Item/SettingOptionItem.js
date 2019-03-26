import videojs from 'video.js';

import SettingMenuItem from './SettingMenuItem.js';
import SettingSubOptionTitle from './SettingSubOptionTitle.js';
import SettingSubOptionItem from './SettingSubOptionItem.js';
import getMenuDimension from '../MenuDimension';

/**
 * @param {Array<Object|number|string>} entries
 */
function parseEntries(entries) {
  let selected;

  entries = entries.map((data, index) => {
    if (data !== null && typeof data !== 'object') {
      data = {
        value: data,
        label: data
      };
    }

    const isDefault = typeof data.defalut !== 'undefined' ? data.defalut : false;

    const entry = {
      ...data,
      index,
      defalut: isDefault
    };

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
    const el = videojs.dom.createEl('li', {
      className: 'vjs-menu-item vjs-setting-menu-item',
      innerHTML: `
        <div class="vjs-icon-placeholder ${icon || ''}"></div>
        <div class="vjs-setting-menu-label">${this.localize(label)}</div>
        <div class="vjs-spacer"></div>
      `
    });

    this.selectedValueEl = videojs.dom.createEl('div', {
      className: 'vjs-setting-menu-value'
    });

    el.appendChild(this.selectedValueEl);

    return el;
  }

  setEntries(entries_ = []) {
    Object.assign(this, parseEntries(entries_));

    this.updateSelectedValue();

    const SubOptionItem = videojs.getComponent(`${this.name_}Child`) || SettingSubOptionItem;

    this.subMenuItems = this.entries.map(({ label, value }) => {
      return new SubOptionItem(this.player_, {
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
  }

  updateSelectedValue() {
    if (this.selected) {
      this.selectedValueEl.innerHTML = this.localize(this.selected.label);
    }
  }

  show() {
    super.show();
    this.menu.reset();
  }
}

videojs.registerComponent('SettingOptionItem', SettingOptionItem);

export default SettingOptionItem;
