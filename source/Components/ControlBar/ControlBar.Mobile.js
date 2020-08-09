import videojs from 'video.js';

import './ControlBar.Mobile.scss';

const Component = videojs.getComponent('Component');
const ControlBar = videojs.getComponent('ControlBar');

class ControlSeparator extends Component {
  constructor(player, options) {
    super(player, options);
    this.addClass('vjs-control-separator');
    this.addClass(options.className || '');
  }
}

videojs.registerComponent('ControlSeparator', ControlSeparator);

videojs.hook('beforesetup', (_, options) => {
  const children = ControlBar.prototype.options_.children.slice(0);
  const index = children.indexOf('CustomControlSpacer');

  if (index > -1) {
    ControlBar.prototype.options_.children = [
      {
        name: 'ControlSeparator',
        className: 'top',
        children: []
      },
      {
        name: 'ControlSeparator',
        className: 'middle',
        children: children.splice(0, index + 1)
      },
      {
        name: 'ControlSeparator',
        className: 'bottom',
        children: children
      }
    ];
  }

  return options;
});

// prevent control bar immediately shown
videojs.hook('setup', vjsPlayer => {
  const enableMobileView = vjsPlayer.options_.mobileView !== false;

  const matchDimension = value => {
    return window.matchMedia
      ? window.matchMedia(`(max-width: ${value}px)`).matches
      : window.innerWidth <= value;
  };

  if (matchDimension(480) && enableMobileView) {
    // Prevent control bar shown immediately after playing
    vjsPlayer.controlBar.hide();
    vjsPlayer.one('playing', () => {
      // Show control bar after `userinactive` (depends on `inactivityTimeout`) or user action
      const events = ['mouseover', 'userinactive', 'touchstart'];

      vjsPlayer.one(events, function callback() {
        vjsPlayer.off(events, callback);
        vjsPlayer.controlBar.show();
      });

      // If player do not autoplay start,
      // the first click to play action cause player inactive ( maybe a bug of videojs )
      // Then clcik on the player before `inactivityTimeout`, the control bar will no shown as the player still inactive
      // So we need to make sure player is active after second click
      vjsPlayer.one('touchend', () => {
        vjsPlayer.userActive(true);
      });
    });

    vjsPlayer.addClass('vjs-mobile-view');
  }
});
