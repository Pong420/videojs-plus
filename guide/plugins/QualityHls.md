This is a plugin for switch between different video quality by HLS playlists. You should also include [videojs-contrib-quality-levels](https://github.com/videojs/videojs-contrib-quality-levels)

Quality menu item will display automatically.

```js
// get all quality levels, for more details refer to videojs-contrib-quality-levels
player.qualityLevels();

// event
player.on('quality', () => {
  console.log('quality setup');
});

player.on('qualitychange', () => {
  console.log('quality changed');
});

// If your hls manifest do not contain `height`,
// you will need to assign it your self
player.on('before-quality-setup', function(_, { levels }) {
  // levels === `player.qualityLevels()`
  levels.forEach((lv, index) => {
    const values = [360, 480, 720, 1080];
    lv.height = values[index];
  });
});

// To change the label of HLS verison, you could
videojs.addLanguage('zh-hk', {
  '720p': 'HD'
});
```
