## Live Streaming UI <!-- {docsify-ignore-all} -->

A style plugin that create a live streaming notice on the control bar and hide the progress bar

### Usage

```html inject keep
<link rel="stylesheet" href="../dist/plugins/live/style.css" />
<script src="../dist/plugins/live/index.js"></script>
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
const player = videojs('example-video', {
  muted: true
});

player.live();
```

### API

```js
// initialize
player.live();

// exit live mode
player.live().dispose();
```
