## Mobile UI

<img src="../screenshot/mobileui.control.png" width="300px">
<img src="../screenshot/mobileui.setting.png" width="300px">

Mobile UI is controlled by class `vjs-mobile-view`.
This class will be added if the player initializes at screen smaller or equal 480px.

#### Disable mobile view

```js
const player = videojs("example-video", {
  // ...
  mobileView: false;
})
```
