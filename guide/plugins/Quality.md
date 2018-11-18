## Quality

There are two type of quality picker

1. `videojs-plus-quality.min.js`, use different video source

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
  quality,
  defaultQualityLevel: 0 // optiontal, default 0
});

// or
player.setQuality(quality, defaultQualityLevel);

// switch quality level
player.quality.pick(1);

// get current quality level
player.quality.current();

// get current quality level index
player.quality.index();

// get all quality levels
player.quality.values;

// events
player.on("quality", function() {
  console.log("quality setup");
});

player.on("qualitychange", function() {
  console.log("quality changed");
});
```

2. `videojs-plus-quality-hls.min.js` HLS playlists. <br>
   You also need to include [videojs-contrib-quality-levels](https://github.com/videojs/videojs-contrib-quality-levels)

```js
const player = videojs("example-video", {});

player.src({
  src: "playlists.m3u8",
  type: "application/x-mpegurl"
});

// get all quality levels, for more details refer to videojs-contrib-quality-levels
player.qualityLevels();

// event
player.on("quality", function() {
  console.log("quality setup");
});

player.on("qualitychange", function() {
  console.log("quality changed");
});

// `before-quality-setup` only trigger on HLS version
// if your hls manifest do not contain `height`,
// you will need to assign it your self
player.on("before-quality-setup", function(_, { levels }) {
  // levels === `player.qualityLevels()`
  levels.forEach((lv, index) => {
    const values = [360, 480, 720, 1080];
    lv.height = values[index];
  });
});

// To change the label of HLS verison, you could
videojs.addLanguage("zh-hk", {
  "720p": "HD"
});
```
