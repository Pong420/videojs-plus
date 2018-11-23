import { getComponent, registerComponent } from 'video.js';

const SettingMenuItem = getComponent('SettingMenuItem');

class SubtitlesMenuItem extends SettingMenuItem {
  constructor(player, options = {}) {
    super(player, {
      name: 'SubtitlesMenuItem',
      label: 'Subtitles',
      icon: 'vjs-icon-subtitles',
      entries: options.subtitles || []
    });

    this.addClass('vjs-setting-subtitles');
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.subtitles().pick(selectedItem.value);
  }
}

registerComponent('SubtitlesMenuItem', SubtitlesMenuItem);

getComponent('SettingMenuButton').prototype.options_.entries.push('SubtitlesMenuItem');
