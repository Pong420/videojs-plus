import videojs from 'video.js';
import './ControlBar.Mobile';

import './Progress/Progress';
import './ControlBar.scss';

videojs.getComponent('ControlBar').prototype.options_.children = [
  'PlayToggle',
  'CustomControlSpacer',
  'VolumePanel',
  'CurrentTimeDisplay',
  'TimeDivider',
  'DurationDisplay',
  'ProgressControl',
  'CustomControlSpacer',
  'SettingMenuButton',
  'FullscreenToggle'
];

videojs.hook('setup', vjsPlayer => {
  vjsPlayer.on('mouseleave', function () {
    vjsPlayer.userActive(false);
  });

  vjsPlayer.ready(function () {
    vjsPlayer.controls(vjsPlayer.options_.controls !== false);
  });
});
