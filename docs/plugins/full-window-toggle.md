## Full Window Toggle <!-- {docsify-ignore-all} -->

Since iOS native fullscreen cannot be overridden and you may want to use a full window instead.<br>
Just include the plugin then the fullscreen button will replace by full window button.

### Usage

Include the plugin js and css

```html inject keep
<link rel="stylesheet" href="../dist/plugins/full-window-toggle/style.css" />
<script src="../dist/plugins/full-window-toggle/index.js"></script>
```

<br />

```html inject
<video
  id="example-video"
  class="vjs-fluid"
  poster="https://vjs.zencdn.net/v/oceans.png"
>
  <source src="https://vjs.zencdn.net/v/oceans.mp4" />
</video>
```

```js run
var player = videojs('example-video', {
  // same as videojs config
  aspectRatio: '16:9'
});

player.on('fullscreenchange', function (event) {
  console.log('[fullscreenchange]', 'is fullscreen:', player.isFullscreen());
});
```
