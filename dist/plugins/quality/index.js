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

  var List = /*#__PURE__*/function () {
    function List(array, startIndex) {
      this.values = array.slice(0);
      this.index_ = startIndex || 0;
      this.loop_ = true;
    }

    var _proto = List.prototype;

    _proto.index = function index(value) {
      if (typeof value !== 'undefined') {
        this.index_ = Math.max(0, Math.min(value, this.values.length - 1));
      } else {
        return this.index_;
      }
    };

    _proto.loop = function loop(value) {
      if (typeof value !== 'undefined') {
        this.loop_ = !!value;
      } else {
        return this.loop_;
      }
    };

    _proto.calc = function calc(steps) {
      var newIndex = this.index_ + steps;
      var length = this.values.length;
      return this.loop_ ? (length + newIndex) % length : Math.max(0, Math.min(newIndex, length - 1));
    };

    _proto.step = function step(steps) {
      this.index_ = this.calc(steps);
      return this.values[this.index_];
    };

    _proto.current = function current() {
      return this.values[this.index_];
    };

    _proto.next = function next() {
      return this.step(1);
    };

    _proto.prev = function prev() {
      return this.step(-1);
    };

    _proto.ended = function ended() {
      return this.index_ === this.values.length - 1;
    };

    return List;
  }();

  var SettingOptionItem = videojs__default['default'].getComponent('SettingOptionItem');

  var QualitySettingItem = /*#__PURE__*/function (_SettingOptionItem) {
    _inheritsLoose(QualitySettingItem, _SettingOptionItem);

    function QualitySettingItem(player, options) {
      var _this;

      _this = _SettingOptionItem.call(this, player, _extends({}, options, {
        name: 'QualitySettingItem',
        label: 'Quality',
        icon: 'vjs-icon-hd',
        entries: player.options_.quality || []
      })) || this;

      _this.addClass('vjs-setting-quality');

      player.on('quality', function (_, qualities) {
        var entries = qualities.map(function (quality, index) {
          quality.value = index;
          return quality;
        });

        _this.setEntries(entries, player.qualities.index());

        _this.show();
      });
      player.on('qualitychange', function (_, _ref) {
        var index = _ref.index;

        _this.select(index);

        _this.update(index);
      });
      return _this;
    }

    var _proto = QualitySettingItem.prototype;

    _proto.onChange = function onChange() {
      var _SettingOptionItem$pr;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_SettingOptionItem$pr = _SettingOptionItem.prototype.onChange).call.apply(_SettingOptionItem$pr, [this].concat(args));

      this.player_.qualities.pick(this.selected.value);
    };

    return QualitySettingItem;
  }(SettingOptionItem);

  videojs__default['default'].getComponent('SettingMenuButton').prototype.options_.entries.push('QualitySettingItem');
  videojs__default['default'].registerComponent('QualitySettingItem', QualitySettingItem);

  var Quality = /*#__PURE__*/function (_List) {
    _inheritsLoose(Quality, _List);

    function Quality(player, array, defaultQualityLevel) {
      var _this;

      if (defaultQualityLevel === void 0) {
        defaultQualityLevel = 0;
      }

      _this = _List.call(this, array, defaultQualityLevel) || this;
      _this.player_ = player;

      _this.pick(defaultQualityLevel, true);

      return _this;
    }

    var _proto = Quality.prototype;

    _proto.pick = function pick(index, skip) {
      if (typeof index !== 'undefined') {
        this.index(index);
      }

      var player = this.player_;
      var current = this.current();
      var cachedCurrentTime = player.ended() ? 0 : player.currentTime();

      if (!skip && cachedCurrentTime) {
        player.one('loadedmetadata', function () {
          player.one('canplaythrough', function () {
            player.currentTime(cachedCurrentTime);
          });
          player.play();
        });
      }

      player.src(current.sources);
      player.trigger('qualitychange', _extends({}, current, {
        index: this.index()
      }));
    };

    return Quality;
  }(List);

  var setQualities = function setQualities(qualities, defaultQualityLevel) {
    var player = this.player_;
    player.qualities = new Quality(player, qualities, defaultQualityLevel);
    player.trigger('quality', qualities);
  };

  videojs__default['default'].registerPlugin('setQualities', setQualities);
  videojs__default['default'].hook('setup', function (vjsPlayer) {
    var qualities = vjsPlayer.options_.qualities;

    if (qualities && qualities.length) {
      var defaultQualityLevel = qualities.findIndex(function (v) {
        return v["default"];
      });
      vjsPlayer.setQualities(qualities, defaultQualityLevel);
    }
  });

})));
//# sourceMappingURL=index.js.map
