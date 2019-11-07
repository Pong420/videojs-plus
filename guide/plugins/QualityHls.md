This is a plugin for switch between video quality by HLS playlists.

[Demo](https://pong420.github.io/videojs-plus/examples/quality-hls.html)

#### Usage

Just include [videojs-contrib-quality-levels](https://github.com/videojs/videojs-contrib-quality-levels) and the **plugin**, the quality menu item will be setup automatically.

#### Chanage label in the menu

The default label will be the `height` defined in HLS manifest with `p` but you could customize yourself.

Use [VideoJS Language Features](https://docs.videojs.com/docs/guides/languages.html)

```js
const language = "en-us";

videojs("example-video". {
  language
  // ..other options
})

videojs.addLanguage(language, {
  '1080p': 'Full HD'
  '720p': 'HD',
  // ..
});
```

or

```js
player.on('before-quality-setup', (_, { levels }) => {
  const labels = ['Full HD', 'HD', ...]
  levels.forEach((level, index) => {
    level.label = labels[index];
  });
});
```

#### API and Event

```js
// get all quality levels, for more details refer to videojs-contrib-quality-levels
player.qualityLevels();

// fire when all HLS playlist added.
player.on('hls-quality', (event, qualityLevels) => {
  console.log('qualities setup', qualityLevels);
});

player.on('hls-qualitychange', (event, currentQuality) => {
  console.log('quality changed');
});
```
