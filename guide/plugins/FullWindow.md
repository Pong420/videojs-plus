## Full Window

Since iOS native fullscreen cannot be overrided, you my want to use full window instead. <br>
Just include the plugin and the fullscreen button will be replaced by full window button.

`player.isFullscreen()` and `fullscreenchange` event will also work

[Demo](https://pong420.github.io/videojs-plus/examples/fullwindow.html)

#### Usage

```html
<link rel="stylesheet" href="videojs-plus-full-window-toggle.min.css">

<script src="videojs-plus.min.js"></script>
<script src="videojs-plus-full-window-toggle.min.js"></script>
```

```js
const player = videojs("example-video", {
  fullwindow: true
});
```
