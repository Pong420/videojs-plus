## Full Window

Since iOS native fullscreen cannot be overridden and you may want to use a full window instead. <br>
Just include the plugin and the fullscreen button will replace by full window button. Remember to include css file

`player.isFullscreen()` and `fullscreenchange` event will also work

[Demo](https://pong420.github.io/videojs-plus/examples/fullwindow.html)

#### Usage

```js
const player = videojs('example-video', {
  fullwindow: true
});
```
