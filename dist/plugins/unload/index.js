/* eslint-disable */
/* VERSION: 1.6.9 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  var unloaded = false;

  function middleware(player) {
    return {
      callPlay: function callPlay() {
        return unloaded && videojs__default['default'].middleware.TERMINATOR;
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

  videojs__default['default'].use('*', middleware);
  videojs__default['default'].registerPlugin('unload', unload);

})));
//# sourceMappingURL=index.js.map
