/* eslint-disable */
/* VERSION: 1.6.9 */
import videojs from 'video.js';

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

var Component = videojs.getComponent('Component');

var LiveNotice = /*#__PURE__*/function (_Component) {
  _inheritsLoose(LiveNotice, _Component);

  function LiveNotice() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = LiveNotice.prototype;

  _proto.createEl = function createEl() {
    var el = videojs.dom.createEl('div', {
      className: 'vjs-live-notice',
      innerHTML: "\n        <div class=\"vjs-live-notice-spot vjs-icon-circle\"></div>\n        Live\n      "
    });
    return el;
  };

  return LiveNotice;
}(Component);

videojs.registerComponent('LiveNotice', LiveNotice);

var Plugin = videojs.getPlugin('plugin');

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

videojs.registerPlugin('live', Live);
//# sourceMappingURL=live.es.js.map
