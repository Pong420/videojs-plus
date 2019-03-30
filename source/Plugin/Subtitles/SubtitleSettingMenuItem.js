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
      this.setEntries([
        ...subtitles.map((val, index) => ({
          ...val,
          value: index
        })),
        {
          label: 'Close Subtitles',
          value: -1,
          default: false
        }
      ]);

      this.show();
    });

    player.on('subtitlechange', (_, { index }) => {
      if (index === -1) {
        // close subtitles
        index = this.entries.length - 1;
      }

      this.select(index);
      this.update(index);
    });
  }

  onChange({ value }) {
    this.player_.subtitles().pick(value);
  }
}

videojs.getComponent('SettingMenuButton').prototype.options_.entries.push('SubtitleSettingMenuItem');

videojs.registerComponent('SubtitleSettingMenuItem', SubtitleSettingMenuItem);

export default SubtitleSettingMenuItem;
