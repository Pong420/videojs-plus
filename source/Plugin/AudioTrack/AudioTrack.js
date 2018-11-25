import { hook, getPlugin, registerPlugin } from 'video.js';
import './AudioSettingItem';

class audio extends getPlugin('plugin') {
  constructor(player, options = {}) {
    super(player, options);

    this.current = this.values().find(track => track.enabled);
  }

  values() {
    const tracks = this.player.audioTracks();
    const result = [];

    for (let i = 0; i < tracks.length; i++) {
      result.push(tracks[i]);
    }

    return result;
  }

  pick(index) {
    const values = this.values();
    const newAudio = values[index];

    if (newAudio) {
      this.current.enabled = false;
      this.current = newAudio;

      newAudio.enabled = true;
    }
  }
}

hook('setup', vjsPlayer => {
  const hls = vjsPlayer.tech().hls;

  hls.on('hls-demuxed', evt => console.log(evt));
  hls.on('hls-alternate-audio	', evt => console.log(evt));
  hls.on('hls-audio-change', evt => console.log(evt));

  vjsPlayer.on('loadedmetadata', () => {
    const { component: AudioSettingItem } = vjsPlayer.findChild('AudioSettingItem')[0];
    const audioTracks = vjsPlayer.audio().value();

    AudioSettingItem.setEntries(
      audioTracks.map(({ id, kind, label, language }, index) => ({
        id,
        kind,
        label,
        language,
        index
      }))
    );

    AudioSettingItem.show();
  });
});

registerPlugin('audio', audio);

export default audio;
