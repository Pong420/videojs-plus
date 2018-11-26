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
    player.tech().on('usage', onHlsUsageEvent);

    // unbind the callback on player dispose
    player.on('dispose', () => {
      player.tech().off('usage', onHlsUsageEvent);
    });

    // hide when new source set
    player.on('loadstart', () => {
      this.hide();
    });
  }

  update(selectedItem) {
    super.update(selectedItem);

    this.player_.audio().pick(selectedItem.value.index);
  }

  onAlternateAudio() {
    const audioTracks = this.player_.audio().values();

    const audioEntries = audioTracks.map((track, index) => {
      const { id, kind, label, language } = track;

      // Since track is an `AudioTrack` instead of a normal "Object",
      // so i redistribute the value
      return {
        id,
        kind,
        label,
        language,
        index
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

getComponent('SettingMenuButton').prototype.options_.entries.push('AudioSettingItem');

registerComponent('AudioSettingItem', AudioSettingItem);

export default AudioSettingItem;
