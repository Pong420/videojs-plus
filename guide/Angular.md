## Angular

I am not familiar with Angular, so there may be a better way to create a player component.

1. As metioned before, you should add a config to webpack config file. The alias value `video.js/dist/video.js` must same as videojs import in player component

```js
resolve: {
  // ....
  alias: {
    // ...
    'video.js': 'video.js/dist/video.js'
  }
}
```

2. Then, create a player component and you could refer to files in [examples/angular](../examples/angular/)

3. Finally, you could use it in other components

```html
<app-player [options]="playerOptions" (playerInit)="onPlayerInit($event)">
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
  playerOptions: any = {
    autoplay: true,
    muted: true,
    sources: []
  };

  player: any;

  onPlayerInit({ player }) {
    this.player = player;

    player.on('play', () => {
      console.log('player play');
    });
  }

  handleSourceChange(sources) {
    this.playerOptions = {
      ...this.playerOptions,
      sources
    };
  }
}
```
