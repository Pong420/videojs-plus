## Subtitles <!-- {docsify-ignore-all} -->

This plugin is a wrapper of [VideoJS TextTrack API](https://docs.videojs.com/docs/guides/text-tracks.html).
And create a [setting menu item](../features/setting-menu.md) for subtitles selection. <br>
Currently, only support text track kind `subtitles`, not sure `caption` should also be included or not

### Usage

```html inject keep
<link rel="stylesheet" href="../dist/plugins/subtitles/style.css" />
<script src="../dist/plugins/subtitles/index.js"></script>
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
const subtitles = [
  {
    default: true, // highlight-line
    kind: 'subtitles',
    srclang: 'zh-TW',
    label: '中文（繁體）',
    src: 'assets/vtt/vtt_TC.txt'
  },
  {
    kind: 'subtitles',
    srclang: 'en-US',
    label: 'English',
    src: 'assets/vtt/vtt_EN.txt'
  }
];

const player = videojs('example-video', {
  subtitles // highlight-line
});

// or
// player.subtitles().load(subtitles); // highlight-line

player.findChild('SettingMenuButton')[0].component.handleClick();
```

#### API and Event

```js
// remove all subtitles
player.subtitles().remove();

// switch subtitle
player.subtitles().pick(2);

// close subtitle
player.subtitles().pick(-1);

// get current subtitles
player.subtitles().track;

// get all subtitles
player.subtitles().values();

// expect `values` and `track`, apis are chainable
player.subtitles().load(subtitles).pick(0);

player.on('subtitles', (event, subtitles) => {
  console.log('subtitles setup', subtitles);
});

player.on('subtitlechange', (event, subtitle) => {
  console.log('subtitles changed');
});
```

### Note

- HLS In-Manifest WebVTT subtitles may not be supported since I have not resource for testing

- VideoJS only support `vtt` format. Here is one of the methods to load `srt` in videojs. Inspired by this [comment](https://github.com/videojs/video.js/issues/4822#issuecomment-351939054) and here is a working example with [imshaikot/srt-webvtt
  ](https://github.com/imshaikot/srt-webvtt).

```js
import WebVTTConverter from 'srt-webvtt/index';

const getSubtitle = async () => {
  const srt_url = 'https://www.example.com/srt_file.srt';
  const response = await axios.get(url, {
    responseType: 'blob'
  });
  const vttURL = await new WebVTTConverter(response.data).getURL();

  return {
    default: true,
    kind: 'subtitles',
    srclang: 'zh-HK',
    label: '繁體中文',
    src: vttURL
  };
};
```
