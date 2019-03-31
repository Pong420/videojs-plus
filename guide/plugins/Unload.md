## Unload

This plugin is useful for video transition in `Single Page Application`. If your video is dynamic change with URL param and the new video source need to wait for a new API response. Then you could stop/unload current video by `playr.unload()`.

See the [Demo](https://pong420.github.io/videojs-plus/examples/unload.html)

#### Usage

```js
player.unload(options);
```

#### Options

| Options | Value   | Default | Description          |
| ------- | ------- | ------- | -------------------- |
| loading | boolean | false   | show loading spinner |
