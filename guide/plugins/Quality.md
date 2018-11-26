## Quality

This is a plugin for switch between different video quality by different video source

#### Usage

```js
const quality = [
  {
    label: '1080p',
    sources: [
      {
        type: 'video/mp4',
        src: 'video-hd.mp4'
      }
    ]
  }
  // ...
];

// set quality in options
const player = videojs('example-video', {
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
player.on('quality', () => {
  console.log('quality setup');
});

player.on('qualitychange', () => {
  console.log('quality changed');
});
```
