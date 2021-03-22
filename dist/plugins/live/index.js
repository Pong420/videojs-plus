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

  var Component = videojs__default['default'].getComponent('Component');

  var LiveNotice = /*#__PURE__*/function (_Component) {
    _inheritsLoose(LiveNotice, _Component);

    function LiveNotice() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = LiveNotice.prototype;

    _proto.createEl = function createEl() {
      var el = videojs__default['default'].dom.createEl('div', {
        className: 'vjs-live-notice',
        innerHTML: "\n        <div class=\"vjs-live-notice-spot vjs-icon-circle\"></div>\n        Live\n      "
      });
      return el;
    };

    return LiveNotice;
  }(Component);

  videojs__default['default'].registerComponent('LiveNotice', LiveNotice);

  var Plugin = videojs__default['default'].getPlugin('plugin');

  var Live = /*#__PURE__*/function (_Plugin) {
    _inheritsLoose(Live, _Plugin);

    function Live(player, options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _Plugin.call(this, player, options) || this;

      _this.createLiveNotive(player);

      _this.start(player);

      return _this;
    }

    var _proto = Live.prototype;

    _proto.createLiveNotive = function createLiveNotive(player) {
      var _player$findChild$ = player.findChild('DurationDisplay')[0],
          parent = _player$findChild$.parent,
          index = _player$findChild$.index;
      var noticeEl = new LiveNotice(player);
      parent.addChild(noticeEl, {}, index);
      this.on('dispose', function () {
        parent.removeChild(noticeEl);
      });
    };

    _proto.start = function start(player) {
      var onTimeupdate = this.onTimeUpdate.bind(this);
      player.addClass('vjs-live-streaming');
      player.on('timeupdate', onTimeupdate);
      this.on('dispose', function () {
        player.off('timeupdate', onTimeupdate);
        player.removeClass('vjs-live-streaming');
        player.removeClass('vjs-live');
      });
    };

    _proto.onTimeUpdate = function onTimeUpdate() {
      var player = this.player;
      var duration = player.duration();

      if (duration === Infinity || player.currentTime() >= duration) {
        player.addClass('vjs-live');
      } else {
        player.removeClass('vjs-live');
      }
    };

    return Live;
  }(Plugin);

  videojs__default['default'].registerPlugin('live', Live);

})));
//# sourceMappingURL=index.js.map
