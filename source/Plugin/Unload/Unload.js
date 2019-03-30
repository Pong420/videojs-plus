import videojs from 'video.js';

let unloaded = false;

function middleware(player) {
  return {
    callPlay() {
      return unloaded && videojs.middleware.TERMINATOR;
    }
  };
}

function reset() {
  unloaded = false;
  this.tech_.show();
}

function unload(options = {}) {
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
