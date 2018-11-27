## Subtitles

This plugin is a wrapper of [VideoJS TextTrack API](https://docs.videojs.com/docs/guides/text-tracks.html).<br>
Also create a [setting menu item](../SettingMenu.md) for subtitles selection. <br>
Currently, only support kind `subtitles`, not sure `caption` should also included or not

#### Usage

```js
const subtitles = [
  {
    default: true, // Boolean
    kind: 'subtitles', // Required
    srclang: 'zh-hk', // Required
    label: '繁體中文', // Required
    src: 'subtitles.vtt' // Required
  }
  // ...
];

// set subtitles in options
const player = videojs('example-video', {
  subtitles
});

// or
player.subtitles().load(subtitles);
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

player.on('subtitles', subtitles => {
  console.log('subtitles setup', subtitles);
});

/**
 * @param {Object} selected - {label, index}
 *
 * subtitlechange no "s"
 */
player.on('subtitlechange', selected => {
  console.log('subtitles changed');
});
```

#### Note

- HLS In-Manifest WebVTT subtitles may not supported since i have not resources for testing

- VideoJS only support `vtt` format. Here is one of the method to load `srt` in videojs. Inspired by this [comment](https://github.com/videojs/video.js/issues/4822#issuecomment-351939054) and here is a working example with [imshaikot/srt-webvtt
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
