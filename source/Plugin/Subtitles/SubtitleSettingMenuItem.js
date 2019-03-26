import videojs from 'video.js';

const SettingOptionItem = videojs.getComponent('SettingOptionItem');

class SubtitleSettingMenuItem extends SettingOptionItem {
  constructor(player, options) {
    super(player, {
      ...options,
      name: 'SubtitleSettingMenuItem',
      label: 'Subtitles',
      icon: 'vjs-icon-subtitles',
      entries: player.options_.subtitles || []
    });

    this.addClass('vjs-setting-subtitles');

    player.on('subtitles', (_, subtitles) => {
      this.setEntries(
        subtitles
          .map(({ label, default: default_ }, index) => ({
            label,
            value: index,
            defalut: default_
          }))
          .concat([
            {
              label: 'Close Subtitles',
              value: -1,
              defalut: false
            }
          ])
      );

      this.show();
    });
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.subtitles().pick(selectedItem.value);
  }
}

videojs.getComponent('SettingMenuButton').prototype.options_.entries.push('SubtitleSettingMenuItem');

videojs.registerComponent('SubtitleSettingMenuItem', SubtitleSettingMenuItem);

export default SubtitleSettingMenuItem;
