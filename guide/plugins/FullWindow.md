## Full Window

Since iOS native fullscreen cannot be overrided and you may want to use full window instead. <br>
Just include the plugin and the fullscreen button will be replaced by full window button.

`player.isFullscreen()` and `fullscreenchange` event will also work

[Demo](https://pong420.github.io/videojs-plus/examples/fullwindow.html)

#### Usage

```js
// remember to import the css file

const player = videojs('example-video', {
  fullwindow: true
});
```
