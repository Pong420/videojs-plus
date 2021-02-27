## Fullscreen for Electron

Trigger electron window fullscreen instead of video fullscreen

If you do not set `nodeIntegration` to `true`. (Electron webPreferences config).
You should create a [preload.js](https://awsm.page/electron/how-to-use-preload-script-in-electron/) and create a function `window.getCurrentWindow`

```js
import { remote } from 'electron';
window.getCurrentWindow = remote.getCurrentWindow;
```
