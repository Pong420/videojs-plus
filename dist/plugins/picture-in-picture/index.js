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

  var ClickableComponent = videojs__default['default'].getComponent('ClickableComponent');

  var ExitPipButton = /*#__PURE__*/function (_ClickableComponent) {
    _inheritsLoose(ExitPipButton, _ClickableComponent);

    function ExitPipButton(player, options) {
      var _this;

      _this = _ClickableComponent.call(this, player, _extends({
        name: 'ExitPipButton'
      }, options)) || this;

      _this.addClass('vjs-exit-pip-button');

      _this.el_.querySelector('.vjs-icon-placeholder').innerHTML = '&#10005;';
      return _this;
    }

    var _proto = ExitPipButton.prototype;

    _proto.handleClick = function handleClick() {
      this.options_.parentPlayer.pictureInPicture().exit();
    };

    return ExitPipButton;
  }(ClickableComponent);

  ExitPipButton.prototype.controlText_ = 'Exit Pictutre In Pictutre';
  videojs__default['default'].registerComponent('ExitPipButton', ExitPipButton);

  var Component = videojs__default['default'].getComponent('Component');

  var PipPlayerWrapper = /*#__PURE__*/function (_Component) {
    _inheritsLoose(PipPlayerWrapper, _Component);

    function PipPlayerWrapper(player, options) {
      var _this;

      _this = _Component.call(this, player, options) || this;
      player.addChild(new ExitPipButton(player, {
        parentPlayer: options.parentPlayer
      }));

      _this.addChild(player);

      if (!options.wrapper) {
        _this.addClass('vjs-pip-player-wrapper');

        document.body.appendChild(_this.el_);
      }

      return _this;
    }

    var _proto = PipPlayerWrapper.prototype;

    _proto.createEl = function createEl() {
      if (this.options_.wrapper) {
        return this.options_.wrapper;
      }

      return _Component.prototype.createEl.call(this);
    };

    return PipPlayerWrapper;
  }(Component);

  videojs__default['default'].registerComponent('PipPlayerWrapper', PipPlayerWrapper);

  var Button = videojs__default['default'].getComponent('Button');

  var PipButton = /*#__PURE__*/function (_Button) {
    _inheritsLoose(PipButton, _Button);

    function PipButton(player, options) {
      var _this;

      _this = _Button.call(this, player, options) || this;
      _this.el_.querySelector('.vjs-icon-placeholder').className += ' vjs-icon-picture-in-picture';
      return _this;
    }

    var _proto = PipButton.prototype;

    _proto.buildCSSClass = function buildCSSClass() {
      return "vjs-pip-button " + _Button.prototype.buildCSSClass.call(this);
    };

    _proto.handleClick = function handleClick() {
      var _Button$prototype$han;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_Button$prototype$han = _Button.prototype.handleClick).call.apply(_Button$prototype$han, [this].concat(args));

      this.player_.pictureInPicture().toggle();
    };

    return PipButton;
  }(Button);

  PipButton.prototype.controlText_ = 'Picture in Picture';
  videojs__default['default'].registerComponent('PipButton', PipButton);
  videojs__default['default'].hook('setup', function (vjsPlayer) {
    var _vjsPlayer$findChild$ = vjsPlayer.findChild('SettingMenuButton')[0],
        parent = _vjsPlayer$findChild$.parent,
        index = _vjsPlayer$findChild$.index;
    parent.addChild(new PipButton(vjsPlayer), {}, index);
  });

  var pictureInPicture = /*#__PURE__*/function (_videojs$getPlugin) {
    _inheritsLoose(pictureInPicture, _videojs$getPlugin);

    function pictureInPicture(player, options) {
      var _this2;

      if (options === void 0) {
        options = {};
      }

      _this2 = _videojs$getPlugin.call(this, player, options) || this;
      _this2.cache_ = {};
      _this2.pipPlayer = null;
      _this2.options_ = options;
      _this2.parentPlayer = player;
      return _this2;
    }

    var _proto = pictureInPicture.prototype;

    _proto.toggle = function toggle() {
      if (this.pipPlayer) {
        this.exit();
      } else {
        this.init();
      }
    };

    _proto.init = function init() {
      if (!this.pipPlayer) {
        this.handleOriginPlayer();
        this.createPipPlayer();
      }
    };

    _proto.createPipPlayer = function createPipPlayer() {
      var parentPlayer = this.parentPlayer,
          options_ = this.options_;
      var id = parentPlayer.id_ + '-pip-player';
      var videoEl = videojs__default['default'].dom.createEl('video', {
        id: id,
        className: 'vjs-pip-player'
      });
      document.body.appendChild(videoEl);

      var pipPlayerOptions = _extends({}, parentPlayer.options_, parentPlayer.cache_, {
        autoplay: true,
        muted: parentPlayer.muted()
      });

      var pipPlayer = this.pipPlayer = videojs__default['default'](videoEl, pipPlayerOptions);
      this.wrapper = new PipPlayerWrapper(pipPlayer, _extends({}, options_, {
        parentPlayer: parentPlayer
      }));
      this.dragzone = pipPlayer.getChild('PlayToggleLayer');
      this.updatePosition(_extends({}, this.cache_, options_));
      pipPlayer.ready(function () {
        pipPlayer.currentTime(parentPlayer.currentTime());
        pipPlayer.play();
      });

      if (options_.draggable !== false) {
        this.draggable(this.dragzone.el_);
      }
    };

    _proto.handleOriginPlayer = function handleOriginPlayer() {
      var _this3 = this;

      var parentPlayer = this.parentPlayer;
      parentPlayer.pause();
      parentPlayer.hasStarted(false);
      parentPlayer.controls(false);
      parentPlayer.addClass('vjs-pip-player-enabled');
      parentPlayer.one('play', function () {
        _this3.exit();
      });
    };

    _proto.exit = function exit() {
      var parentPlayer = this.parentPlayer,
          pipPlayer = this.pipPlayer,
          wrapper = this.wrapper;

      if (parentPlayer) {
        parentPlayer.controls(true);
        parentPlayer.removeClass('vjs-pip-player-enabled');
        parentPlayer.paused() && parentPlayer.play();

        if (pipPlayer) {
          if (!pipPlayer.ended()) {
            parentPlayer.currentTime(pipPlayer.currentTime());
          }
        }
      }

      if (pipPlayer) {
        pipPlayer.dispose();
        wrapper.dispose();
      }

      this.pipPlayer = null;
    };

    _proto.dispose = function dispose() {
      this.parentPlayer = null;
    };

    _proto.updatePosition = function updatePosition(_ref) {
      var x = _ref.x,
          y = _ref.y;

      if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        this.wrapper.el_.style.bottom = y + 'px';
        this.wrapper.el_.style.left = x + 'px';
      }
    };

    _proto.draggable = function draggable(el) {
      var _this4 = this;

      var x, y;

      var _this = this;

      var move = function move(evt) {
        evt.preventDefault();
        _this4.cache_.x = Math.max(0, Math.min(window.innerWidth - el.offsetWidth, evt.clientX - x));
        _this4.cache_.y = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, window.innerHeight - evt.clientY - el.offsetHeight + y));

        _this4.updatePosition(_this4.cache_);
      };

      el.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        x = evt.offsetX;
        y = evt.offsetY;

        var disableClick = function disableClick() {
          window.removeEventListener('mousemove', disableClick);

          _this.dragzone.disable();
        };

        window.addEventListener('mousemove', move);
        window.addEventListener('mousemove', disableClick);
        window.addEventListener('mouseup', function mouseup(evt) {
          window.removeEventListener('mouseup', mouseup);
          window.removeEventListener('mousemove', move);
          window.removeEventListener('mousemove', disableClick);
          setTimeout(function () {
            _this.dragzone.enable();
          }, 0);
        });
      });

      var onResize = function onResize() {
        var _this4$cache_ = _this4.cache_,
            x = _this4$cache_.x,
            y = _this4$cache_.y;

        _this4.updatePosition({
          x: Math.min(x, window.innerWidth - el.offsetWidth),
          y: Math.min(y, window.innerHeight - el.offsetHeight)
        });
      };

      window.addEventListener('resize', onResize);
      this.pipPlayer.on('dispose', function () {
        window.removeEventListener('resize', onResize);
      });
    };

    return pictureInPicture;
  }(videojs__default['default'].getPlugin('plugin'));

  videojs__default['default'].registerPlugin('pictureInPicture', pictureInPicture);

})));
//# sourceMappingURL=index.js.map
