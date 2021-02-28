/* eslint-disable */
/* VERSION: 1.6.7 */
import videojs from 'video.js';

var unloaded = false;

function middleware(player) {
  return {
    callPlay: function callPlay() {
      return unloaded && videojs.middleware.TERMINATOR;
    }
  };
}

function reset() {
  unloaded = false;
  this.tech_.show();
}

function unload(options) {
  if (options === void 0) {
    options = {};
  }

  unloaded = true;
  this.pause();
  this.tech_.hide();
  this.off('loadstart', reset);
  this.on('loadstart', reset);

  if (options.loading) {
    this.addClass('vjs-seeking');
  }
}

videojs.use('*', middleware);
videojs.registerPlugin('unload', unload);
//# sourceMappingURL=unload.es.js.map
