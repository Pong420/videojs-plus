## Quality <!-- {docsify-ignore-all} -->

A plugin for switch video quality by the different video source

#### Usage

```html inject keep
<script src="../dist/plugins/quality/index.js"></script>
```

<br />

```html inject
<video
  id="example-video"
  class="vjs-fluid"
  poster="https://vjs.zencdn.net/v/oceans.png"
></video>
```

```js run
const qualities = [
  {
    label: '1080p',
    sources: [
      {
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      }
    ]
  },
  {
    default: true, // highlight-line
    label: '720p',
    sources: [
      {
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      }
    ]
  }
  // ...
];

// set quality in options
const player = videojs('example-video', {
  qualities // highlight-line
});

// or
// player.setQualities(qualities, defaultQualityLevel); // highlight-line

player.findChild('SettingMenuButton')[0].component.handleClick();
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

// fire when `player.setQualities` call.
player.on('quality', (event, qualities) => {
  console.log('qualities setup', qualities);
});

player.on('qualitychange', (event, selected) => {
  console.log('quality changed', selected);
});
```
