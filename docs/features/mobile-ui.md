## Mobile UI <!-- {docsify-ignore-all} -->

<div>
  <img style="float: left; max-width: 300px; width: 49%" src="../screenshot/mobileui.control.png">
  <img style="float: left; max-width: 300px; width: 49%; margin-left: 2%" src="../screenshot/mobileui.setting.png" width="300px">
</div>

Mobile UI is controlled by class `vjs-mobile-view`.
This class will be added if the player initializes at screen smaller or equal 480px.

#### Disable mobile view

```js
const player = videojs("example-video", {
  // ...
  mobileView: false;
})
```
