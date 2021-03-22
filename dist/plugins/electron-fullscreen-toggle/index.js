/* eslint-disable */
/* VERSION: 1.6.9 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  var logType = '';

  try {
    logType = localStorage && localStorage.getItem('vjs-plus-log');
  } catch (e) {}

  var log = function () {
    if (logType === 'normal' || videojs__default['default'].browser.IE_VERSION) {
      // log without style
      return console.info.bind(console, '[VJS Plus]:');
    } else if (logType) {
      // log with style
      return console.info.bind(console, '%c[VJS Plus]:', 'font-weight: bold; color:#2196F3;');
    }

    return function () {};
  }();

  var getCurrentWindow;

  try {
    getCurrentWindow = require('electron').remote.getCurrentWindow();
  } catch (error) {
    getCurrentWindow = window.getCurrentWindow;
  }

  var ElectronFullscreenToggle = /*#__PURE__*/function (_videojs$getComponent) {
    _inheritsLoose(ElectronFullscreenToggle, _videojs$getComponent);

    function ElectronFullscreenToggle(player, options) {
      var _this;

      _this = _videojs$getComponent.call(this, player, options) || this;
      var currentWindow = window.getCurrentWindow();

      var setFullscreen = function setFullscreen(flag) {
        currentWindow.setFullScreen(flag);
        return player;
      };

      var triggerFullscreenChange = function triggerFullscreenChange() {
        player.trigger('fullscreenchange');
      };

      player.requestFullscreen = setFullscreen.bind(player, true);
      player.exitFullscreen = setFullscreen.bind(player, false);

      player.isFullscreen = function () {
        return currentWindow.isFullScreen();
      };

      currentWindow.addListener('enter-full-screen', triggerFullscreenChange);
      currentWindow.addListener('leave-full-screen', triggerFullscreenChange);
      player.on('dispose', function () {
        currentWindow.removeListener('enter-full-screen', triggerFullscreenChange);
        currentWindow.removeListener('leave-full-screen', triggerFullscreenChange);
      });

      if (player.isFullscreen()) {
        // @ts-ignore
        _this.handleFullscreenChange();

        player.addClass('vjs-fullscreen');
      }

      return _this;
    }

    var _proto = ElectronFullscreenToggle.prototype;

    _proto.handleClick = function handleClick() {
      if (this.player_.isFullscreen()) {
        this.player_.exitFullscreen();
      } else {
        this.player_.requestFullscreen();
      }
    };

    return ElectronFullscreenToggle;
  }(videojs__default['default'].getComponent('FullscreenToggle'));

  if (getCurrentWindow) {
    videojs__default['default'].registerComponent('ElectronFullscreenToggle', ElectronFullscreenToggle);
    var controlBarChildren = videojs__default['default'].getComponent('ControlBar').prototype.options_.children;
    var fullScreenButtonIndex = controlBarChildren.indexOf('fullscreenToggle');
    controlBarChildren[fullScreenButtonIndex] = 'ElectronFullscreenToggle';
  } else {
    log('Plugin "ElectronFullscreenToggle" is not enabled, please check the docs for more information');
  }

})));
//# sourceMappingURL=index.js.map
