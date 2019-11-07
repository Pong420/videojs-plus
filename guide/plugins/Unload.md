## Unload

This plugin may useful for video transition in SPA.

If your video dynamically changes with URL parameters and the new video source need to wait for a new API response. Then you could stop/unload current video by `playr.unload()`.

See the [Demo](https://pong420.github.io/videojs-plus/examples/unload.html)

#### Usage

```js
player.unload(options);
```

#### Options

| Options | Value   | Default | Description          |
| ------- | ------- | ------- | -------------------- |
| loading | boolean | false   | show loading spinner |
