## Full Window Toggle <!-- {docsify-ignore-all} -->

Since iOS native fullscreen cannot be overridden and you may want to use a full window instead.<br>
Just include the plugin then the fullscreen button will replace by full window button.

Remember to include the CSS file

`player.isFullscreen()` and `fullscreenchange` event will also work

<link
  rel="stylesheet"
  href="https://pong420.github.io/videojs-plus/dist/plugins/full-window-toggle/style.css"
/>
<script src="https://pong420.github.io/videojs-plus/dist/plugins/full-window-toggle/index.js"></script>

```html video=true
<video
  id="example-video"
  class="vjs-fluid"
  poster="https://vjs.zencdn.net/v/oceans.png"
>
  <source src="https://vjs.zencdn.net/v/oceans.mp4" />
</video>
```

```js run=true
var player = videojs('example-video', {
  // same as videojs config
  aspectRatio: '16:9'
});

player.on('fullscreenchange', function (event) {
  console.log('[fullscreenchange]', 'is fullscreen:', player.isFullscreen());
});
```

[Demo](https://pong420.github.io/videojs-plus/examples/fullwindow.html)
