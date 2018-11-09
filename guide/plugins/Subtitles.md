## Subtitles

This plugin is wrapper of [VideoJS TextTrack API](https://docs.videojs.com/docs/guides/text-tracks.html). Also create a [setting menu item](../SettingMenu.md) for subtitles selection

#### Usage

```js
const subtitles = [
  {
    default: true, // Boolean
    kind: "subtitles", // Required
    srclang: "zh-hk", // Required
    label: "繁體中文", // Required
    src: "subtitles.vtt" // Required
  }
  // ...
];

// set subtitles in options
const player = videojs("example-video", {
  subtitles
});

// or
player.subtitles().load(subtitles);

// remove subtitles
player.subtitles().remove();

// switch subtitle
player.subtitles().pick(2);

// get current subtitles
player.subtitles().track;

// events
player.on("subtitles", function() {
  console.log("subtitles setup");
});

// subtitlechange no "s"
player.on("subtitlechange", function() {
  console.log("subtitles changed");
});
```
