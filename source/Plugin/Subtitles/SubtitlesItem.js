import { getComponent, registerComponent } from 'video.js';

const SettingMenuItem = getComponent('SettingMenuItem');

class SubtitlesMenuItem extends SettingMenuItem {
  constructor(player, options) {
    super(
      player,
      Object.assign(options, {
        name: 'SubtitlesMenuItem',
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

getComponent('SettingMenuButton').prototype.options_.entries.push('SubtitlesMenuItem');

registerComponent('SubtitlesMenuItem', SubtitlesMenuItem);

export default SubtitlesMenuItem;
