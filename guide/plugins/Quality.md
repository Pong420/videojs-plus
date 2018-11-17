## Quality

Similar to [playlist](./Playlist.md)

#### Usage

```js
const quality = [
  {
    label: "1080p",
    sources: [
      {
        type: "video/mp4",
        src: "video-hd.mp4"
      }
    ]
  }
  // ...
];

// set quality in options
const player = videojs("example-video", {
  quality
});

// or
player.setQuality(quality);

// switch quality
player.quality.pick(1);

// get current quality
player.quality.current();

// get current quality index
player.quality.index();

// get all quality
player.quality.values;

// events
player.on("quality", function() {
  console.log("quality setup");
});

player.on("qualitychange", function() {
  console.log("quality changed");
});
```
