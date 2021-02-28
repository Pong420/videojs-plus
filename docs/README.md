## VideoJS Plus <!-- {docsify-ignore-all} -->

VideoJS Plus is an extension and skin for [video.js](https://github.com/videojs/video.js). <br>

<img src="./screenshot/electron-frameless-player.png">

### Installation

```bash
npm install videojs-plus
# or
yarn add videojs-plus
```

### Usage

- Just include the JS and CSS and use videojs normally

```html
<html>
  <head>
    <link rel="stylesheet" href="videojs-plus.css" />
  </head>
  <body>
    <video
      id="example-video"
      class="vjs-fluid"
      poster="http://vjs.zencdn.net/v/oceans.png"
    >
      <source src="http://vjs.zencdn.net/v/oceans.mp4" />
    </video>
  </body>
  <script src="http://vjs.zencdn.net/7.4.1/video.js"></script>
  <script src="videojs-plus.umd.js"></script>
  <script>
    const player = videojs('example-video');
  </script>
</html>
```

- [React Hooks](https://codesandbox.io/s/71z2lm4ko6)

### Features

- [Title](./Title.md)
- [Context Menu](./docs/ContextMenu.md)
- [Setting Menu](./docs/SettingMenu.md)
- [Mobile UI](./docs/Mobile.md)
  <img src="./screenshot/mobileui.control.small.png" width="300">

- **Dimensions of controls**<br>
  You can change the dimensions of controls/menu by changing the `font-size` of `.video-js`. For example,

```css
.video-js {
  @media (min-width: 1440px) {
    font-size: 18px;
  }

  @media (min-width: 1680px) {
    font-size: 20px;
  }
}
```

- **FindChild** <br>
  A function that get player component. <br>
  For Example, you want to insert a button before `SettingMenuButton`.

```js
const { parent, component, index } = player.findChild('SettingMenuButton')[0];
parent.addChild(new Button(player), {}, index);

// whithou findChild
const ControlBar = player.getChild('ControlBar');
const index = ControlBar.children_.indexOf('SettingMenuButton');
ControlBar.addChild(new Button(player), {}, index);

// or
videojs.getComponent('ControlBar').prototype.options_.children = [
  //...
  'Button',
  'SettingMenuButton'
];
```

<br>

### Plugins

- [Autoplay](./docs/plugins/Autoplay.md)
- [Playlist](./docs/plugins/Playlist.md)
- [Subtitles](./docs/plugins/Subtitles.md)
- [Quality](./docs/plugins/Quality.md)
- [Quality (HLS)](./docs/plugins/QualityHls.md)
- [Audio (HLS)](./docs/plugins/Audio.md)
- [FullWindow Toggle](./docs/plugins/FullWindow.md)
- [Electron Fullscreen Toggle](./docs/plugins/ElectronFullscreenToggle.md)
- [Picture In Picture](./docs/plugins/PictureInPicture.md) ( Experimental )
- [Live](./docs/plugins/Live.md) ( Style plugins for live streaming )
- [Unload](./docs/plugins/Unload.md)

<br>

## Tips <!-- {docsify-ignore} -->

- language <br>
  You can change the language of setting/context by [VideoJS language feature](https://docs.videojs.com/docs/guides/languages.html). For example

```js
const language = "zh-hk";

videojs("example-video". {
  language
})

videojs.addLanguage(language, {
  Speed: "速度",
  Normal: "正常"
});
```

<br>

## License <!-- {docsify-ignore} -->

See [Apache 2.0](LICENSE).
