## Autoplay

If autoplay with sound is not allowed by the browser, the player will try to mute and play again.<br>
Some mobile device does not support autoplay start even player is muted.

：warning: Autoplay already handled in **VideoJS 7**, you may not need this plugin

[Demo](https://pong420.github.io/videojs-plus/examples/autoplay.html)

#### Usage

```js
const player = videojs('example-video', {
  autoplay: true
});
```

#### Event

```js
player.on('autoplay-success', () => {
  console.log('autoplay success');
});

player.on('autoplay-failure', () => {
  console.log('autoplay failure');
});
```
