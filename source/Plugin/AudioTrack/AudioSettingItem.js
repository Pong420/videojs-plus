import { getComponent, registerComponent } from 'video.js';

const SettingMenuItem = getComponent('SettingMenuItem');

class AudioSettingItem extends SettingMenuItem {
  constructor(player, options) {
    super(
      player,
      Object.assign(options, {
        name: 'AudioSettingItem',
        label: 'Audio',
        icon: 'vjs-icon-audiotrack',
        entries: options.quality || []
      })
    );

    this.addClass('vjs-setting-audio');
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.audio.pick();
  }
}

getComponent('SettingMenuButton').prototype.options_.entries.push('AudioSettingItem');

registerComponent('AudioSettingItem', AudioSettingItem);

export default AudioSettingItem;
