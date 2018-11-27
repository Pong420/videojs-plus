## Quality

This is a plugin for switch between different video quality by different video source

#### Usage

```js
const qualities = [
  {
    label: '1080p',
    sources: [
      {
        src: 'video-1080p.mp4'
        type: 'video/mp4',
      }
    ]
  },
  {
    default: true
    label: '720p',
    sources: [
      {
        src: 'video-720p.mp4'
        type: 'video/mp4',
      }
    ]
  }
  // ...
];

// set quality in options
const player = videojs('example-video', {
  qualities
});

// or

/**
 *  @params {Array} qualities
 *  @params {Number|String} defaultQualityLevel - index of the default quality
*/
player.setQualities(qualities, defaultQualityLevel);

```

#### API and Event

```js
// switch quality
player.qualities.pick(1);

// get current quality
player.qualities.current();

// get current quality index
player.qualities.index();

// get all qualities
player.qualities.values;

/**
 *  Fire when `setQualities` called.
 *  But if you set qualities in options and listen after player initialized,
 *  the `setQualities` function will called before you listen *
 */
player.on('qualities', qualities => {
  console.log('qualities setup', qualities);
});

/**
 *  @params {Object} selected `player.qualities.current()` but contains index;
 */
player.on('qualitychange', selected => {
  console.log('quality changed', selected);
});
```
