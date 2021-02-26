## Audio <!-- {docsify-ignore-all} -->

Plugin for `HLS streaming` with multiple audio tracks.

### Usage

Just include the plugin then the audio menu item will display automatically.

### Chanage label in the menu

The default label will be the `label` defined in `HLS manifest` and you could customize yourself.

Also you could use [VideoJS Language Features](https://docs.videojs.com/docs/guides/languages.html) to replace the default label

```js
const language = "en-us";
videojs("example-video". {
  language
  // ..other options
})
videojs.addLanguage(language, {
  "Audio 1": "Dubbing",
  "Audio 2": "Original",
});
```

or

```js
player.on('before-audio-setup', (event, audios) => {
  audios[0].label = 'Dubbing';
  audios[1].label = 'Original';
});
```

#### API and Event

```js
// switch audio
player.audio().pick(1);

// get current audio track
player.audio().track;

// get all audio track
player.audio().values();

// events
player.on('audio', audios => {
  console.log('audio setup', audio);
});

player.on('audiochange', audio => {
  console.log('audio changed');
});
```
