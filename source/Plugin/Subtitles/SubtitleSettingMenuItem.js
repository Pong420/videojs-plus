import { getComponent, registerComponent } from 'video.js';

const SettingOptionItem = getComponent('SettingOptionItem');

class SubtitleSettingMenuItem extends SettingOptionItem {
  constructor(player, options) {
    super(
      player,
      Object.assign(options, {
        name: 'SubtitleSettingMenuItem',
        label: 'Subtitles',
        icon: 'vjs-icon-subtitles',
        entries: options.subtitles || []
      })
    );

    this.addClass('vjs-setting-subtitles');
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.subtitles().pick(selectedItem.value);
  }
}

getComponent('SettingMenuButton').prototype.options_.entries.push('SubtitleSettingMenuItem');

registerComponent('SubtitleSettingMenuItem', SubtitleSettingMenuItem);

export default SubtitleSettingMenuItem;
