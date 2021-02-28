/* eslint-disable */
/* VERSION: 1.6.7 */
import videojs from 'video.js';

var logType = '';

try {
  logType = localStorage && localStorage.getItem('vjs-plus-log');
} catch (e) {}

var log = function () {
  if (logType === 'normal' || videojs.browser.IE_VERSION) {
    // log without style
    return console.info.bind(console, '[VJS Plus]:');
  } else if (logType) {
    // log with style
    return console.info.bind(console, '%c[VJS Plus]:', 'font-weight: bold; color:#2196F3;');
  }

  return function () {};
}();

var AUTOPLAY_SUCCESS = 'autoplay-success';
var AUTOPLAY_FAILURE = 'autoplay-failure';

var AutoplayHandler = function AutoplayHandler(player) {
  var NotPreoload = player.preload() === 'none';

  if (!player.autoplay() || NotPreoload) {
    player.mutedautoplay_ = 'ignore';

    if (NotPreoload) {
      log('Preload is none so that manual autoplay start is disabled');
      player.trigger(AUTOPLAY_FAILURE);
    }

    return false;
  }

  var pause = player.pause;

  player.pause = function () {};

  var callback = function callback() {
    player.pause = pause;
    player.mutedautoplay_ = true;
  };

  var resolved = function resolved() {
    log('Muted Autoplay - Promise Resolved');
    player.trigger(AUTOPLAY_SUCCESS);
    callback();
  };

  var rejected = function rejected(error) {
    log('Muted Autoplay - Promise Rejected', error);
    player.muted(true);
    var handlePlay = player.play();

    if (handlePlay) {
      handlePlay.then(resolved)["catch"](function (err) {
        log('Seems autoplay is not allowed even player is muted', err);
        player.trigger(AUTOPLAY_FAILURE);
        player.hasStarted(false);
        callback();
      });
    } else {
      log('Second Play Promise is undefined');
      callback();
    }
  };

  player.one('loadedmetadata', function handleMutedAutoplay() {
    // without ready, `player.play()` may retutn `undefined` as `this.changingSrc_` is true
    player.ready(function () {
      var playPromise = player.play();

      if (playPromise !== undefined && playPromise !== null) {
        playPromise.then(resolved)["catch"](rejected);
      } else {
        log('Browser not support play promise');
        setTimeout(callback, 1000);
      }
    });
  });
};

videojs.hook('setup', function (vjsPlayer) {
  vjsPlayer.one('loadstart', function () {
    AutoplayHandler(vjsPlayer);
  });
});
//# sourceMappingURL=autoplay.es.js.map
