## VideoJS Plus <!-- {docsify-ignore-all} -->

VideoJS Plus is an extension and skin for [video.js](https://github.com/videojs/video.js). <br>

<img src="./assets/screenshot/electron-frameless-player.png">

### Installation

```bash
npm install videojs-plus
# or
yarn add videojs-plus
```

### Usage

- Include the correspone JS and CSS and

  ```html highlight=3,14,15,17
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

<br>

- language <br>
  You can change the language of setting/context by [VideoJS language feature](https://docs.videojs.com/docs/guides/languages.html). For example

````js
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
````
