## Audio

This a plugin for **HLS streaming** with multiple audio tracks and create an item in setting menu. So that user could swtich between those audio tracks.

#### Usage

Audio menu item will display automatically. The only one configuration may be the label of audio. The default label should be defined in HLS manifest but you could customisze yourself. <br>

For example:

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
