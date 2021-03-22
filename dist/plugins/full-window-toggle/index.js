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

  var FullWindowToggle = /*#__PURE__*/function (_videojs$getComponent) {
    _inheritsLoose(FullWindowToggle, _videojs$getComponent);

    function FullWindowToggle(player, options) {
      var _this;

      _this = _videojs$getComponent.call(this, player, options) || this;
      player.requestFullscreen = player.enterFullWindow.bind(player);
      player.enterFullScreen = player.enterFullWindow.bind(player);
      player.exitFullscreen = player.exitFullWindow.bind(player);

      player.isFullscreen = function () {
        return !!player.isFullWindow;
      };

      player.on(['enterFullWindow', 'exitFullWindow'], function () {
        player.toggleFullscreenClass_();
        player.trigger('fullscreenchange');
      });
      return _this;
    }

    var _proto = FullWindowToggle.prototype;

    _proto.handleClick = function handleClick() {
      if (!this.player_.isFullWindow) {
        this.player_.enterFullScreen();
      } else {
        this.player_.exitFullscreen();
      }
    } // Since `FullWindowToggle` are extends from `FullscreenToggle`,
    // disable function will be called if the browser does not support fullscreen API
    // However, `FullWindowToggle` is assumed support in all platform. So the function should be override
    ;

    _proto.disable = function disable(force) {
      force && _videojs$getComponent.prototype.disable.call(this);
    };

    return FullWindowToggle;
  }(videojs__default['default'].getComponent('FullscreenToggle'));

  videojs__default['default'].registerComponent('FullWindowToggle', FullWindowToggle);
  var controlBarChildren = videojs__default['default'].getComponent('ControlBar').prototype.options_.children;
  var fullScreenButtonIndex = controlBarChildren.indexOf('FullscreenToggle');
  controlBarChildren[fullScreenButtonIndex] = 'FullWindowToggle';

})));
//# sourceMappingURL=index.js.map
