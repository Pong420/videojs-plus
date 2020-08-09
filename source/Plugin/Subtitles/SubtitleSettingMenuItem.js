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
      let close = true;

      const entries = subtitles.map((val, index) => {
        close = !close || !val.default;

        return {
          ...val,
          value: index
        };
      });

      this.setEntries([
        ...entries,
        {
          label: 'Close Subtitles',
          value: -1,
          default: close
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

  onChange(...args) {
    super.onChange(...args);
    this.player_.subtitles().pick(this.selected.value);
  }
}

videojs
  .getComponent('SettingMenuButton')
  .prototype.options_.entries.push('SubtitleSettingMenuItem');

videojs.registerComponent('SubtitleSettingMenuItem', SubtitleSettingMenuItem);

export default SubtitleSettingMenuItem;
