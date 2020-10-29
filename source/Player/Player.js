import videojs from 'video.js';
import './Player.scss';

const { IS_IPHONE, IOS_VERSION } = videojs.browser;

videojs.hook('setup', vjsPlayer => {
  vjsPlayer.playsinline(vjsPlayer.options_.playsinline !== false);

  vjsPlayer.addClass('video-js');

  if (IS_IPHONE) {
    vjsPlayer.addClass('vjs-is-iphone');
    if (IOS_VERSION < 11) {
      vjsPlayer.addClass('vjs-iphone-below-11');
    }
  }
});
