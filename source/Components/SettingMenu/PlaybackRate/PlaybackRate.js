import SettingOptionItem from '../Item/SettingOptionItem.js';
import { registerComponent } from 'video.js';

class PlaybackRateSettingOptionalItem extends SettingOptionItem {
  constructor(player, options) {
    super(
      player,
      Object.assign(options, {
        label: 'Speed',
        icon: 'vjs-icon-slow-motion-video',
        entries: [
          0.5,
          0.75,
          {
            label: 'Normal',
            value: 1,
            defalut: true
          },
          1.25,
          1.5,
          2
        ]
      })
    );

    this.addClass('vjs-setting-playback-rate');

    // Since playback rate will be reset to noraml when video source changed
    // So we need to listen on `ratechange`
    player.on('ratechange', () => {
      const rate = player.playbackRate();
      const currentEntry = this.entries.find(({ value }) => rate === value);

      this.update(currentEntry);
    });
  }

  update(entry) {
    super.update(entry);

    if (this.player_.playbackRate() !== entry.value) {
      this.player_.playbackRate(entry.value);
    }
  }
}

registerComponent('PlaybackRateSettingOptionalItem', PlaybackRateSettingOptionalItem);

export default PlaybackRateSettingOptionalItem;
