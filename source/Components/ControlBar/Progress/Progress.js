import videojs from 'video.js';

import './Progress.scss';

const SeekBar = videojs.getComponent('SeekBar');

SeekBar.prototype.getPercent = function getPercent() {
  const time = this.player_.currentTime();
  const percent = time / this.player_.duration();

  return percent >= 1 ? 1 : percent;
};

SeekBar.prototype.handleMouseMove = function handleMouseMove(event) {
  const player = this.player_;

  // if (!videojs.dom.isSingleLeftClick(event) || isAdPlaying(player)) {
  if (!videojs.dom.isSingleLeftClick(event)) {
    return;
  }

  let newTime = this.calculateDistance(event) * player.duration();

  if (newTime === player.duration()) {
    newTime = newTime - 0.1;
  }

  player.currentTime(newTime);

  this.update();
};
