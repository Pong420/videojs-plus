## Angular

I am not familiar with Angular, so there may be a better way to create a player component.

1. You should eject `webpack.config.js` from angular-cli, and add below `alias` configuration. The alias value `video.js/dist/video.js` must same as videojs import in player component

```js
resolve: {
  // ....
  alias: {
    // ...
    'video.js': 'video.js/dist/video.js'
  },
},
```

2. Then, create a player component and you could refer to files in `examples/angular`

3. Finally, use it in other components

```html
<app-player (playerInit)="onPlayerInit($event)" [options]="playerOptions">
  <div class="player-inner-element">This videojs-plus angular example</div>
</app-player>
```

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  playerOptions: Object = {
    autoplay: true,
    muted: true
  };

  constructor() {}

  onPlayerInit({ player }) {
    player.src({
      src: '...',
      type: 'video/mp4'
    });

    player.on('play', () => {
      console.log('player play');
    });
  }
}
```
