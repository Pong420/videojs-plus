## Resolution

Similar to [playlist](./Playlist.md)

#### Usage

```js
const resolution = [
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

// set resolution in options
const player = videojs("example-video", {
  resolution
});

// or
player.setResolution(resolution);

// switch resolution
player.resolution.pick(1);

// get current resolution
player.resolution.current();

// get current resolution index
player.resolution.index();

// get all resolution
player.resolution.values;

// events
player.on("resolution", function() {
  console.log("resolution setup");
});

player.on("resolutionchange", function() {
  console.log("resolution changed");
});
```
