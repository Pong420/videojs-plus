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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var SettingOptionItem = videojs__default['default'].getComponent('SettingOptionItem');

  var AudioTrackSettingItem = /*#__PURE__*/function (_SettingOptionItem) {
    _inheritsLoose(AudioTrackSettingItem, _SettingOptionItem);

    function AudioTrackSettingItem(player, options) {
      var _this;

      _this = _SettingOptionItem.call(this, player, _extends({}, options, {
        name: 'AudioTrackSettingItem',
        label: 'Audio',
        icon: 'vjs-icon-audiotrack'
      })) || this;

      _this.addClass('vjs-setting-audio');

      var timeout;

      var onHlsUsageEvent = function onHlsUsageEvent(evt) {
        if (evt.name === 'hls-audio-change') {
          clearTimeout(timeout);
          timeout = setTimeout(_this.handleAudioChangeEvent.bind(_assertThisInitialized(_this)), 10);
        } else if (evt.name === 'hls-alternate-audio') {
          _this.onAlternateAudio();
        }
      };

      player.ready(function () {
        // show when alternate audio detected
        player.tech_.on('usage', onHlsUsageEvent);
      }); // unbind the callback on player dispose

      player.on('dispose', function () {
        player.tech_.off('usage', onHlsUsageEvent);
      });
      player.on('audiochange', function (_, _ref) {
        var index = _ref.index;

        _this.select(index);

        _this.update(index);
      }); // hide when new source set

      player.on('loadstart', function () {
        _this.hide();
      });
      return _this;
    }

    var _proto = AudioTrackSettingItem.prototype;

    _proto.onChange = function onChange() {
      var _SettingOptionItem$pr;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_SettingOptionItem$pr = _SettingOptionItem.prototype.onChange).call.apply(_SettingOptionItem$pr, [this].concat(args));

      this.player_.audio().pick(this.selected.value);
    };

    _proto.onAlternateAudio = function onAlternateAudio() {
      var _this2 = this;

      var audioTracks = this.player_.audio().values();
      var audioEntries = audioTracks.map(function (track, index) {
        var id = track.id,
            kind = track.kind,
            label = track.label,
            language = track.language; // label and value are necessary attributes

        return {
          label: _this2.localize(label),
          value: index,
          id: id,
          kind: kind,
          language: language,
          index: index,
          track: track
        };
      });
      this.player_.trigger('before-audio-setup', audioEntries);
      this.setEntries(audioEntries);
      this.show();
      this.player_.trigger('audio', audioEntries);
    };

    _proto.handleAudioChangeEvent = function handleAudioChangeEvent() {
      var _this3 = this;

      var audioTracks = this.player_.audio().values();
      var currentEntry = audioTracks.reduce(function (acc, track, index) {
        if (track.enabled) {
          acc = _this3.entries[index];
        }

        return acc;
      }, {});
      this.player_.trigger('audiochange', currentEntry);
    };

    return AudioTrackSettingItem;
  }(SettingOptionItem);

  videojs__default['default'].getComponent('SettingMenuButton').prototype.options_.entries.push('AudioTrackSettingItem');
  videojs__default['default'].registerComponent('AudioTrackSettingItem', AudioTrackSettingItem);

  var audio = /*#__PURE__*/function (_videojs$getPlugin) {
    _inheritsLoose(audio, _videojs$getPlugin);

    function audio(player, options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _videojs$getPlugin.call(this, player, options) || this;
      _this.track = _this.values().find(function (track) {
        return track.enabled;
      }); // I am worried about audio changed by other factor
      // So also listen on `audiochange` and update the value

      player.on('audiochange', function (_, _ref) {
        var index = _ref.index;
        _this.track = _this.values()[index];
      });
      return _this;
    }

    var _proto = audio.prototype;

    _proto.values = function values() {
      var tracks = this.player.audioTracks();
      var result = [];

      for (var i = 0; i < tracks.length; i++) {
        result.push(tracks[i]);
      }

      return result;
    };

    _proto.pick = function pick(index) {
      var values = this.values();
      var newAudio = values[index];

      if (newAudio) {
        this.track.enabled = false;
        this.track = newAudio;
        newAudio.enabled = true;
      }
    };

    return audio;
  }(videojs__default['default'].getPlugin('plugin'));

  videojs__default['default'].registerPlugin('audio', audio);

})));
//# sourceMappingURL=index.js.map
