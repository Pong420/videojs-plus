## Fullscreen for Electron <!-- {docsify-ignore-all} -->

Make the fullscreen button toggle electron fullscreen instead of video fullscreen

<br />

If `nodeIntegration` option of your electron webPreferences is not true. You should create a `preload.js` and assign a function `getCurrentWindow` to window

```js file=preload.js
import { remote } from 'electron';
window.getCurrentWindow = remote.getCurrentWindow;
```
