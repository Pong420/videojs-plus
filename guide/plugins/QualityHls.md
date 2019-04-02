This is a plugin for switch between different video quality by HLS playlists.

#### Usage

Just install and include [videojs-contrib-quality-levels](https://github.com/videojs/videojs-contrib-quality-levels) and the plugin, quality menu item will display automatically.

#### Chanage label in the menu

The default label will be the `height` defined in HLS manifest with `p` and you could customize yourself.

You could use [VideoJS Language Features](https://docs.videojs.com/docs/guides/languages.html) replace the default label

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
player.on('before-quality-setup', function(_, { levels }) {
  const labels = ['Full HD', 'HD', ...]
  levels.forEach((lv, index) => {
    lv.label = labels[index];
  });
});
```

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
```
