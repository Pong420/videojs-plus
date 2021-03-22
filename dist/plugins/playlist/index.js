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

  var ClickableComponent = videojs__default['default'].getComponent('ClickableComponent');

  var PlayNextSpinner = /*#__PURE__*/function (_ClickableComponent) {
    _inheritsLoose(PlayNextSpinner, _ClickableComponent);

    function PlayNextSpinner() {
      return _ClickableComponent.apply(this, arguments) || this;
    }

    var _proto = PlayNextSpinner.prototype;

    _proto.buildCSSClass = function buildCSSClass() {
      return 'vjs-playnext-spinner';
    };

    _proto.createEl = function createEl() {
      var el = _ClickableComponent.prototype.createEl.call(this, 'div', {
        innerHTML: "\n        <div class=\"vjs-icon-placeholder vjs-icon-play\"></div>\n        <svg width=\"60\" height=\"60\" viewbox=\"0 0 60 60\">\n          <circle cx=\"30\" cy=\"30\" r=\"30\"/>\n          <path class=\"vjs-playnext-spinner-border\" fill=\"#FFF\" transform=\"translate(30, 30)\"/>\n          <circle id=\"donut\" cx=\"30\" cy=\"30\" r=\"27\"/>\n        </svg>\n      "
      });

      this.path = el.querySelector('path');
      return el;
    };

    _proto.handleClick = function handleClick() {
      this.player_.getChild('BeforePlayNextLayer').timeup();
    };

    return PlayNextSpinner;
  }(ClickableComponent);

  PlayNextSpinner.prototype.controlText_ = 'PlayNext';
  videojs__default['default'].registerComponent('PlayNextSpinner', PlayNextSpinner);

  var Component = videojs__default['default'].getComponent('Component');

  var BeforePlayNextLayer = /*#__PURE__*/function (_Component) {
    _inheritsLoose(BeforePlayNextLayer, _Component);

    function BeforePlayNextLayer(player, options) {
      var _this2;

      _this2 = _Component.call(this, player, options) || this;

      _this2.addChild('PlayNextSpinner', {}, 2);

      _this2.addChild('CancelPlayNextEl', {
        text: '&#10005;',
        className: 'vjs-cancel-playnext-cross'
      }, {}, 2);

      _this2.addChild('CancelPlayNextEl', {
        text: 'Cancel',
        className: 'vjs-cancel-playnext-button'
      }, {}, 2);

      _this2.originPoster = player.poster() || player.playlist.current().poster;
      player.poster(_this2.getNext().poster); // for user click on replay button or select another video

      var dispose = _this2.dispose.bind(_assertThisInitialized(_this2));

      var events = ['timeupdate', 'loadstart'];
      player.one(events, dispose);

      _this2.on('dispose', function () {
        player.off(events, dispose);
        player.removeClass('vjs-play-next-ready');
      });

      _this2.countdown(player.options_.playNextCountDown);

      player.addClass('vjs-play-next-ready');
      return _this2;
    }

    var _proto = BeforePlayNextLayer.prototype;

    _proto.getNext = function getNext() {
      var playlist = this.player_.playlist;
      this.next = playlist.values[playlist.calc(1)];
      return this.next;
    };

    _proto.createEl = function createEl() {
      var title = this.getNext().title;
      var el = videojs__default['default'].dom.createEl('div', {
        className: 'vjs-before-playnext'
      });
      this.contentEl_ = videojs__default['default'].dom.createEl('div', {
        className: 'vjs-before-playnext-content',
        innerHTML: "\n        <div class=\"vjs-upnext-text\">" + this.localize('Up Next') + "</div>\n        <div class=\"vjs-playnext-title\">\n            <div>" + title + "</div>\n        </div>\n      "
      });
      el.appendChild(this.contentEl_);
      return el;
    };

    _proto.countdown = function countdown(count) {
      if (typeof count === 'undefined') {
        count = 10;
      }

      if (count == 0) {
        this.timeup();
        return false;
      }

      var _this = this,
          a = 0,
          p = Math.PI,
          t = count;

      t = t / 360 * 1000;

      (function draw() {
        a++;
        a %= 360;
        var r = a * p / 180,
            x = Math.sin(r) * 125,
            y = Math.cos(r) * -125,
            mid = a > 180 ? 1 : 0,
            anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';

        _this.getChild('PlayNextSpinner').path.setAttribute('d', anim);

        if (a === 0) {
          _this.timeup();
        } else {
          _this.timer = setTimeout(draw, t);
        }
      })();
    };

    _proto.timeup = function timeup() {
      this.player_.playlist.next();
      this.player_.playlist.play();
      this.dispose();
    };

    _proto.cancel = function cancel() {
      this.player_.poster(this.originPoster);
      return this;
    };

    _proto.dispose = function dispose() {
      clearTimeout(this.timer);
      this.player_.removeChild(this);

      _Component.prototype.dispose.call(this);
    };

    return BeforePlayNextLayer;
  }(Component);

  function playNext() {
    var player = this.player_;
    var playlist = player.playlist;
    var haveNextVideo = playlist.loop() || !playlist.ended();

    if (playlist.autoPlayNext() && haveNextVideo) {
      var controlbar = player.getChild('ControlBar');
      var index = player.children().indexOf(controlbar) - 1;
      player.addChild('BeforePlayNextLayer', {}, index);
    } else {
      player.poster(playlist.current().poster || '');
    }
  }

  videojs__default['default'].registerPlugin('playNext', playNext);
  videojs__default['default'].registerComponent('BeforePlayNextLayer', BeforePlayNextLayer);

  var SettingMenuButton = videojs__default['default'].getComponent('SettingMenuButton');
  var SettingOnOffItem = videojs__default['default'].getComponent('SettingOnOffItem');

  var ToggleAutoPlayNext = /*#__PURE__*/function (_SettingOnOffItem) {
    _inheritsLoose(ToggleAutoPlayNext, _SettingOnOffItem);

    function ToggleAutoPlayNext(player) {
      var _this;

      _this = _SettingOnOffItem.call(this, player, {
        name: 'ToggleAutoPlayNext',
        label: 'Autoplay',
        icon: 'vjs-icon-next-item'
      }) || this;

      _this.updateVisibility();

      _this.addClass('vjs-setting-autoplay');

      player.on('playlist', function () {
        _this.updateVisibility();

        _this.update(player.playlist.autoPlayNext_);
      });
      player.on('autoplaynext', function (_, active) {
        _this.update(active);
      });
      return _this;
    }

    var _proto = ToggleAutoPlayNext.prototype;

    _proto.updateVisibility = function updateVisibility() {
      var playlist = this.player_.playlist;

      if (playlist && playlist.values.length > 1) {
        this.show();
      } else {
        this.hide();
      }
    };

    _proto.update = function update(active) {
      _SettingOnOffItem.prototype.update.call(this, active);

      var playlist = this.player_.playlist;

      if (playlist.autoPlayNext_ !== this.active) {
        this.player_.playlist.autoPlayNext(this.active);
      }
    };

    return ToggleAutoPlayNext;
  }(SettingOnOffItem);

  videojs__default['default'].registerComponent('ToggleAutoPlayNext', ToggleAutoPlayNext);
  SettingMenuButton.prototype.options_.entries.splice(0, 0, 'ToggleAutoPlayNext');

  var Button = videojs__default['default'].getComponent('Button');

  var PrevNextButton = /*#__PURE__*/function (_Button) {
    _inheritsLoose(PrevNextButton, _Button);

    function PrevNextButton(player, options) {
      var _this;

      _this = _Button.call(this, player, options) || this;

      _this.updateVisibility();

      _this.controlText(options.controlText);

      player.on('playlist', _this.updateVisibility.bind(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = PrevNextButton.prototype;

    _proto.buildCSSClass = function buildCSSClass() {
      return this.options_.className + " " + _Button.prototype.buildCSSClass.call(this);
    };

    _proto.updateVisibility = function updateVisibility() {
      var playlist = this.player_.playlist;

      if (playlist && playlist.values.length > 1) {
        this.show();
      } else {
        this.hide();
      }
    };

    _proto.createEl = function createEl(tag, _, attributes) {
      return _Button.prototype.createEl.call(this, tag, {
        innerHTML: "<span aria-hidden=\"true\" class=\"vjs-icon-placeholder " + this.options_.icon + "\"></span>"
      }, attributes);
    };

    _proto.handleClick = function handleClick() {
      // prev / next
      var type = this.options_.controlText.toLowerCase();
      this.player_.playlist[type]();
      this.player_.playlist.play();
    };

    return PrevNextButton;
  }(Button);

  var ControlBar = videojs__default['default'].getComponent('ControlBar');
  var children = ControlBar.prototype.options_.children;
  var indexOfPlayToggle = children.indexOf('PlayToggle');

  if (indexOfPlayToggle !== -1) {
    children.splice(0, 0, {
      name: 'PrevNextButton',
      className: 'vjs-prev-control',
      icon: 'vjs-icon-previous-item',
      controlText: 'Prev'
    });
    children.splice(indexOfPlayToggle + 2, 0, {
      name: 'PrevNextButton',
      className: 'vjs-next-control',
      icon: 'vjs-icon-next-item',
      controlText: 'Next'
    });
  }

  videojs__default['default'].registerComponent('PrevNextButton', PrevNextButton);

  var ClickableComponent$1 = videojs__default['default'].getComponent('ClickableComponent');

  var CancelPlayNextEl = /*#__PURE__*/function (_ClickableComponent) {
    _inheritsLoose(CancelPlayNextEl, _ClickableComponent);

    function CancelPlayNextEl(player, options) {
      var _this;

      _this = _ClickableComponent.call(this, player, options) || this;
      _this.el_.querySelector('.vjs-icon-placeholder').innerHTML = _this.localize(options.text);
      return _this;
    }

    var _proto = CancelPlayNextEl.prototype;

    _proto.buildCSSClass = function buildCSSClass() {
      return "vjs-cancel-playnext " + this.options_.className;
    };

    _proto.handleClick = function handleClick() {
      this.player_.getChild('BeforePlayNextLayer').cancel().dispose();
    };

    return CancelPlayNextEl;
  }(ClickableComponent$1);

  CancelPlayNextEl.prototype.controlText_ = 'Cancel PlayNext';
  videojs__default['default'].registerComponent('CancelPlayNextEl', CancelPlayNextEl);

  var PlayList = /*#__PURE__*/function (_List) {
    _inheritsLoose(PlayList, _List);

    function PlayList(player, array, startIndex) {
      var _this;

      if (startIndex === void 0) {
        startIndex = 0;
      }

      _this = _List.call(this, array, startIndex) || this;
      _this.player_ = player;
      _this.loadPoster_ = true;
      _this.autoPlayNext_ = true;

      _this.play(startIndex);

      player.off('ended', player.playNext);
      player.on('ended', player.playNext);
      return _this;
    }

    var _proto = PlayList.prototype;

    _proto.autoPlayNext = function autoPlayNext(value) {
      if (typeof value !== 'undefined') {
        this.autoPlayNext_ = !!value;
      } else {
        return this.autoPlayNext_;
      }

      this.player_.trigger('autoplaynext', this.autoPlayNext_);
    };

    _proto.play = function play(index) {
      if (typeof index !== 'undefined') {
        this.index(index);
      }

      var current = this.current();
      var poster = current.poster,
          sources = current.sources,
          title = current.title;
      var player = this.player_;

      var addPoster = function addPoster() {
        player.poster(poster || '');
      };

      player.title('');
      player.poster('');

      if (this.loadPoster_) {
        this.loadPoster_ = false; // For Safari, poster will not hidden when video playing

        if (player.autoplay()) {
          player.one('autoplay-failure', addPoster);
        } else {
          addPoster();
        }
      } else {
        player.one('loadedmetadata', function () {
          player.play();
        });
      }

      if (player.preload() !== 'none') {
        player.addClass('vjs-waiting');
        player.one('loadedmetadata', function () {
          player.removeClass('vjs-waiting');
        });
      }

      player.src(sources);
      player.title(title || '');
      player.trigger('playlistchange', _extends({}, current, {
        index: this.index()
      }));
    };

    return PlayList;
  }(List);

  videojs__default['default'].registerPlugin('setPlayList', function (playlist, startIndex) {
    var player = this.player_;
    player.playlist = new PlayList(player, playlist, startIndex);
    player.trigger('playlist', playlist);
  });
  videojs__default['default'].hook('setup', function (vjsPlayer) {
    var playlist = vjsPlayer.options_.playlist;

    if (playlist && playlist.length) {
      var startIndex = playlist.findIndex(function (v) {
        return v["default"];
      });
      vjsPlayer.setPlayList(playlist, startIndex);
    }
  });

})));
//# sourceMappingURL=index.js.map
