## Autoplay <!-- {docsify-ignore-all} -->

If autoplay with sound is not allowed by the browser, the player will try to mute and play again. Some mobile device does not support autoplay start even player is muted.

:warning: Autoplay already handled in **VideoJS 7**, you may not need this plugin

<br />

```html inject
<video id="autoplay-video" poster="https://vjs.zencdn.net/v/oceans.png">
  <source src="https://vjs.zencdn.net/v/oceans.mp4" />
</video>
```

### Usage

```js run
var player = videojs('autoplay-video', {
  autoplay: true, // highlight-line
  aspectRatio: '16:9'
});
```

### Event

```js
player.on('autoplay-success', () => {
  console.log('autoplay success');
});

player.on('autoplay-failure', () => {
  console.log('autoplay failure');
});
```
