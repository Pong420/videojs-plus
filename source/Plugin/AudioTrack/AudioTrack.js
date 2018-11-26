import { getPlugin, registerPlugin } from 'video.js';
import './AudioSettingItem';

class audio extends getPlugin('plugin') {
  constructor(player, options = {}) {
    super(player, options);

    this.current = this.values().find(track => track.enabled);

    // I am worried about audio changed by other factor
    // So also listen on `audiochange` and update the value
    player.on('audiochange', (_, { index }) => {
      this.current = this.values()[index];
    });
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

registerPlugin('audio', audio);
