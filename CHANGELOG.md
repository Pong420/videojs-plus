# 1.6.4

### Bug Fixes

- Remove control of `vjs-workinghover` classname. Let users handle themself

# 1.6.3

### Bug Fixes

- Make setting menu auto-responsive

# 1.6.2

### Bug Fixes

- Fix subtitles change error if the default value is not defined

# 1.6.0

### Bug Fixes

- Make sure only one subtitles shown on mobile device
- Fix setting menu after resize
- Remove unexpected console log

# 1.5.9

### Bug Fixes

- Fix subtitle change, default subtitle

# 1.5.8

### Bug Fixes

- Fix incorrect default value of `SettingMenu`

### Update

- New plugin `ElectronFullscreenToggle`

# 1.5.7

### Bug Fixes

- Fix full window for video.js@7.x.x
- Add playlist `autoplaynext` event typing
- Fix context menu

# 1.5.6

### Bug Fixes

- Fix audio plugin for video.js@7.x.x

### Update

- Prefix event type in `quality-hls` plugins
- Add typescript definition file

# 1.5.5

### Bug Fixes

- Fix fail to install with yarn

# 1.5.3

### Update

- Quality HLS menu item will show only if more then one quality
- Change context menu close handling. A fullscreen hidden layer will block other click action until context menu hide

# 1.5.2

### Update

- Allow to change audio track label through videojs language

# 1.5.1

### Update

- Prevent `FullWindowToggle` disabled if the browser does not support Fullscreen API

### Bug Fixes

- Fix HlS quality plugin, UI display mistaken

# 1.5.0

### Update

- Update npm package structure, easier to use with webpack
- Update optional setting menu
- Add plugin `Unload`

### Bug Fixes

- Fix setting menu cannot shown after `player.reset()`
- Fix UI not update if qualities or subtitles change through api

# 1.4.0

### Update

- Add Hls audio plugin
- Sync naming of all setting menu item

### Bug Fixes

- Fix the life cylce of setting menu item related plugin

### Documentation

- Review all markdown docs

# 1.3.0

### Update

- update setting menu docs

### Bug Fixes

- fix setting menu
- fix hls quality item

# 1.2.0

### Update

- plugin file name changed
- rename mobile view class name and add an options to disable mobile view
- update docs
- make rollup config better
- add eslint

# 1.1.0

### Bug Fixes

- fix quality restore incorrectly when changing new qualities

# 1.0.9

- add `.npmignore`

# 1.0.8

### Update

- update docs
- new options `defaultQualityLevel` to controls the default quality level

### Bug Fixes

- fix incorrect order of setting menu item
- fix video restart when quality change

# 1.0.7

### Update

- update hls quality docs

# 1.0.6

### Update

- seprate hls quality plugin
- remove quality levels depenedecy from hls quality plugin.

# 1.0.5

### Update

- add `index.js` to each plugins

# 1.0.4

### Update

- slightly adjust the position of volume icon
- add live handing (Beta)

# 1.0.3

### Bug Fixes

- fix subtitles

# 1.0.2

### Update

- Rame name resolution plugin to quality
- Add Hls quality picker

### Bug Fixes

- error message icon

# 1.0.1

### Update

- add close subtitles item

### Bug Fixes

- fix localization of menu item's value
