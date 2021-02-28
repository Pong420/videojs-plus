## Unload <!-- {docsify-ignore-all} -->

This plugin may useful for video transition in `Single Page Application`.

If your video dynamically changes with URL parameters and the new video source need to wait for a new API response. Then you could stop/unload current video by `playr.unload()`.

### Usage

```html inject keep
<script src="../dist/plugins/unload/index.js"></script>
```

<br />

> The video will unload when video time more than 5 seconds and a new video load after 2 seconds

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
const player = videojs('example-video', {
  aspectRatio: '16:9',
  muted: true,
  autoplay: true
});

player.on('timeupdate', function unload() {
  if (player.currentTime() > 5) {
    player.off('timeupdate', unload);
    player.unload({ loading: true }); // highlight-line

    setTimeout(function () {
      player.src({
        poster: '',
        src:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video/mp4'
      });
    }, 2000);
  }
});
```

#### Options

| Options | Value   | Default | Description          |
| ------- | ------- | ------- | -------------------- |
| loading | boolean | false   | show loading spinner |
