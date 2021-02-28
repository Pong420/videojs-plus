## Quality HLS <!-- {docsify-ignore-all} -->

A plugin for switch video quality by HLS playlist.

[Demo](https://pong420.github.io/videojs-plus/examples/quality-hls.html)

### Usage

Include [videojs-contrib-quality-levels](https://github.com/videojs/videojs-contrib-quality-levels) and the plugin js, the quality menu item will be setup automatically.

```html inject keep
<script src="https://cdn.jsdelivr.net/npm/videojs-contrib-quality-levels@2.0.9/dist/videojs-contrib-quality-levels.js"></script>
<script src="../dist/plugins/quality-hls/index.js"></script>
```

<br />

```html inject
<video id="example-video" class="vjs-fluid">
  <source
    src="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
    type="application/x-mpegURL"
  />
</video>
```

```js run
const player = videojs('example-video', { muted: true });

player.one('loadedmetadata', function () {
  player.findChild('SettingMenuButton')[0].component.handleClick();
});
```

### Chanage label in the menu

The default label depnds on the `height` defined in HLS manifest but you could customize yourself.

```js
const language = "en-us";

videojs("example-video". {
  language
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
  const labels = [
    'Full HD',
    'HD'
    // ...
  ];
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
