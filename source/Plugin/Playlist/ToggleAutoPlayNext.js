import { getComponent, registerComponent } from 'video.js';

const SettingMenuButton = getComponent('SettingMenuButton');
const SettingOnOffItem = getComponent('SettingOnOffItem');

class ToggleAutoPlayNext extends SettingOnOffItem {
  constructor(player, options) {
    super(player, {
      name: 'ToggleAutoPlayNext',
      label: 'Autoplay',
      icon: 'vjs-icon-next-item'
    });

    this.updateVisibility();
    this.addClass('vjs-setting-autoplay');

    player.on('playlist', () => {
      this.updateVisibility();
      this.update(player.playlist.autoPlayNext_);
    });

    player.on('autoplaynext', (_, active) => {
      this.update(active);
    });
  }

  updateVisibility() {
    const { playlist } = this.player_;

    if (playlist && playlist.values.length > 1) {
      this.show();
    } else {
      this.hide();
    }
  }

  update(active) {
    super.update(active);

    const { playlist } = this.player_;

    if (playlist.autoPlayNext_ !== this.active) {
      this.player_.playlist.autoPlayNext(this.active);
    }
  }
}

registerComponent('ToggleAutoPlayNext', ToggleAutoPlayNext);

SettingMenuButton.prototype.options_.entries.splice(0, 0, 'ToggleAutoPlayNext');

export default ToggleAutoPlayNext;
