## Mobile UI

<img src="../screenshot/mobileui.control.png" width="300px">
<img src="../screenshot/mobileui.setting.png" width="300px">

#### Usage

Mobile UI is controlled by class `vjs-mobile-view`.
This class will added if player initialize at screen smaller or equal 480px.

### disable mobile view

```js
const player = videojs("example-video", {
  // ...
  mobileView: false;
})
```
