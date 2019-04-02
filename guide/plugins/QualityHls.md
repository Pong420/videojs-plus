This is a plugin for switch between different video quality by HLS playlists.

#### Usage

Just install and include [videojs-contrib-quality-levels](https://github.com/videojs/videojs-contrib-quality-levels) and the plugin.
Quality menu item will display automatically.

#### API and Event

```js
// Get all quality levels, for more details refer to videojs-contrib-quality-levels
player.qualityLevels();

// Fire when all Hls playlist added.
player.on('qualities', (evt, qualityLevels) => {
  console.log('qualities setup', qualityLevels);
});


player.on('qualitychange', (evt, selected) => {
  console.log('quality changed');
});

// If your hls manifest does not contain `height`, you will need to assign it your self.
// Otherwise, the label will be undefined
player.on('before-quality-setup', function(_, { levels }) {
  // levels === `player.qualityLevels()`
  levels.forEach((lv, index) => {
    const values = [360, 480, 720, 1080];
    lv.height = values[index];
  });
});

// To change the label of HLS quality, you could
videojs.addLanguage('zh-hk', {
  '1080p': 'Full HD'
  '720p': 'HD',
  // ..
});
```
