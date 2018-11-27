import { getComponent, registerComponent } from 'video.js';

const SettingOptionItem = getComponent('SettingOptionItem');

class AudioTrackSettingItem extends SettingOptionItem {
  constructor(player, options) {
    super(player, {
      ...options,
      name: 'AudioTrackSettingItem',
      label: 'Audio',
      icon: 'vjs-icon-audiotrack'
    });

    this.addClass('vjs-setting-audio');

    let timeout;
    const onHlsUsageEvent = evt => {
      if (evt.name === 'hls-audio-change') {
        clearTimeout(timeout);

        timeout = setTimeout(this.handleAudioChangeEvent.bind(this), 10);
      } else if (evt.name === 'hls-alternate-audio') {
        this.onAlternateAudio();
      }
    };

    // show when alternate audio detected
    player.tech_.on('usage', onHlsUsageEvent);

    // unbind the callback on player dispose
    player.on('dispose', () => {
      player.tech_.off('usage', onHlsUsageEvent);
    });

    // hide when new source set
    player.on('loadstart', () => {
      this.hide();
    });
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.audio().pick(selectedItem.value);
  }

  onAlternateAudio() {
    const audioTracks = this.player_.audio().values();

    const audioEntries = audioTracks.map((track, index) => {
      const { id, kind, label, language } = track;

      // label and value are necessary attributes
      return {
        label,
        value: index,
        id,
        kind,
        language,
        index,
        track
      };
    });

    this.player_.trigger('before-audio-setup', audioEntries);

    this.setEntries(audioEntries);

    this.show();

    this.player_.trigger('audio', audioEntries);
  }

  handleAudioChangeEvent() {
    const audioTracks = this.player_.audio().values();
    const currentEntry = audioTracks.reduce((acc, track, index) => {
      if (track.enabled) {
        acc = this.entries[index];
      }

      return acc;
    }, {});

    this.player_.trigger('audiochange', currentEntry);
  }
}

getComponent('SettingMenuButton').prototype.options_.entries.push('AudioTrackSettingItem');

registerComponent('AudioTrackSettingItem', AudioTrackSettingItem);

export default AudioTrackSettingItem;
