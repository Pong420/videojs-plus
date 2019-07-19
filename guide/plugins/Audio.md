## Audio

This a plugin for **HLS streaming** with multiple audio tracks.

#### Usage

Just include the plugin and audio menu item will display automatically.

#### Chanage label in the menu

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
player.on('before-audio-setup', (_, entries) => {
  entries[0].label = 'Dubbing';
  entries[1].label = 'Original';
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
player.on('audio', audio => {
  console.log('audio setup', audio);
});

/**
 * interface audio {
 *  attribute string id,
 *  attribute string kind,
 *  attribute string label,
 *  attribute string language,
 *  attribute number index
 *  attribute AudioTrack track
 * };
 *
 * @param {audio} currentAudio
 */
player.on('audiochange', currentAudio => {
  console.log('audio changed');
});
```
