## Full Window

Since iOS native fullscreen cannot be overridden and you may want to use a full window instead. <br>
Just include the plugin and the fullscreen button will be replaced by full window button.

`player.isFullscreen()` and `fullscreenchange` event will also work

[Demo](https://pong420.github.io/videojs-plus/examples/fullwindow.html)

#### Usage

Remember to include css file

```js
const player = videojs('example-video', {
  fullwindow: true
});
```
