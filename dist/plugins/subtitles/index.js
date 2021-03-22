/* eslint-disable */
/* VERSION: 1.6.9 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

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

  var SettingOptionItem = videojs__default['default'].getComponent('SettingOptionItem');

  var SubtitleSettingMenuItem = /*#__PURE__*/function (_SettingOptionItem) {
    _inheritsLoose(SubtitleSettingMenuItem, _SettingOptionItem);

    function SubtitleSettingMenuItem(player, options) {
      var _this;

      _this = _SettingOptionItem.call(this, player, _extends({}, options, {
        name: 'SubtitleSettingMenuItem',
        label: 'Subtitles',
        icon: 'vjs-icon-subtitles',
        entries: player.options_.subtitles || []
      })) || this;

      _this.addClass('vjs-setting-subtitles');

      player.on('subtitles', function (_, subtitles) {
        var close = true;
        var entries = subtitles.map(function (val, index) {
          close = !close || !val["default"];
          return _extends({}, val, {
            value: index
          });
        });

        _this.setEntries([].concat(entries, [{
          label: 'Close Subtitles',
          value: -1,
          "default": close
        }]));

        _this.show();
      });
      player.on('subtitlechange', function (_, _ref) {
        var index = _ref.index;

        if (index === -1) {
          // close subtitles
          index = _this.entries.length - 1;
        }

        _this.select(index);

        _this.update(index);
      });
      return _this;
    }

    var _proto = SubtitleSettingMenuItem.prototype;

    _proto.onChange = function onChange() {
      var _SettingOptionItem$pr;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_SettingOptionItem$pr = _SettingOptionItem.prototype.onChange).call.apply(_SettingOptionItem$pr, [this].concat(args));

      this.player_.subtitles().pick(this.selected.value);
    };

    return SubtitleSettingMenuItem;
  }(SettingOptionItem);

  videojs__default['default'].getComponent('SettingMenuButton').prototype.options_.entries.push('SubtitleSettingMenuItem');
  videojs__default['default'].registerComponent('SubtitleSettingMenuItem', SubtitleSettingMenuItem);

  var subtitles = /*#__PURE__*/function (_videojs$getPlugin) {
    _inheritsLoose(subtitles, _videojs$getPlugin);

    function subtitles(player, options) {
      var _this;

      _this = _videojs$getPlugin.call(this, player, options) || this;
      _this.flag = null;
      _this.track = null;
      var timeout;

      var handleSubtitleChangeEvent = function handleSubtitleChangeEvent() {
        clearTimeout(timeout);

        var _subtitles = _this.values();

        var currentSubtitle = _subtitles.find(function (t) {
          return t.mode === 'showing';
        }) || {};
        var newFlag = currentSubtitle.label || currentSubtitle.id || -1; // multiple `change` event will reveiced when subtitles changed ( depends on number of subtitles or browser ? )
        // so that timeout is used to make sure `subtitlechange` event emit once;

        timeout = setTimeout(function () {
          if (_this.flag !== newFlag) {
            _this.flag = newFlag;
            player.trigger('subtitlechange', {
              index: _subtitles.indexOf(currentSubtitle),
              label: currentSubtitle.label || ''
            });
          }
        }, 10);
      };

      player.textTracks().on('change', handleSubtitleChangeEvent);
      player.on('dispose', function () {
        player.textTracks().off('change', handleSubtitleChangeEvent);
      });
      return _this;
    }

    var _proto = subtitles.prototype;

    _proto.values = function values() {
      var tracks = this.player.textTracks();
      var _subtitles2 = [];

      for (var i = 0; i < tracks.length; i++) {
        if (tracks[i].kind === 'subtitles') {
          _subtitles2.push(tracks[i]);
        }
      }

      return _subtitles2;
    };

    _proto.load = function load(subtitles_) {
      if (subtitles_ === void 0) {
        subtitles_ = [];
      }

      var player = this.player;

      if (subtitles_ && subtitles_.length) {
        this.remove();
        var index = -1;
        var trackEls = [];

        var _subtitles5 = subtitles_.map(function (s, i) {
          var subtitle = Object.assign({}, s);
          var manualCleanup = true; // set default to false, otherwise subtitle will reset to the default subtitle
          // when user switch quality with quality plugin

          var trackEl = player.addRemoteTextTrack(_extends({}, subtitle, {
            "default": false
          }), manualCleanup);
          trackEl.track.mode = 'hidden';
          trackEls.push(trackEl);

          if (index === -1 && subtitle["default"] === true) {
            index = i;
          } else {
            subtitle["default"] = false;
          }

          return subtitle;
        });

        if (index !== -1) {
          this.flag = _subtitles5[index].label;
          this.track = trackEls[index].track;
          this.track.mode = 'showing';
        }

        player.trigger('subtitles', _subtitles5);
      }

      return this;
    };

    _proto.remove = function remove() {
      var _this2 = this;

      this.values().forEach(function (track) {
        _this2.player.removeRemoteTextTrack(track);
      });
      return this;
    };

    _proto.pick = function pick(index) {
      var _subtitles4 = this.values();

      var newTrack = _subtitles4[index];

      if (newTrack) {
        if (this.track) {
          this.track.mode = 'disabled';
        }

        this.track = newTrack;
        this.track.mode = 'showing';
      } else if (this.track) {
        this.track.mode = 'disabled';
      }

      return this;
    };

    return subtitles;
  }(videojs__default['default'].getPlugin('plugin'));

  videojs__default['default'].hook('setup', function (vjsPlayer) {
    vjsPlayer.ready(function () {
      var subtitles = vjsPlayer.options_.subtitles;
      subtitles && subtitles.length && vjsPlayer.subtitles().load(subtitles);
    });
  });
  videojs__default['default'].registerPlugin('subtitles', subtitles);

})));
//# sourceMappingURL=index.js.map
