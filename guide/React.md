## React

I am not familiar with React, so there may be a better way to create a player component.

1. As metioned before, you should add a config to webpack config file.

```js
resolve: {
  // ....
  alias: {
    // ...
    'video.js': 'video.js/dist/video.js'
  }
}
```

2. Then, create a player component and you could refer to files in [examples/react](../examples/react/Player.js)

3. Finally, you could use it in other components

```js
import React, { Component } from 'react';

import Player from '@/components/Player/Player';

class VideoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOptions: {
        autoplay: true,
        muted: true,
        sources: [
          {
            src: 'demo.mp4',
            type: 'video/mp4'
          }
        ]
      }
    };

    this.handlePlayerInit = this.handlePlayerInit.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
  }

  handlePlayerInit(player) {
    this.player = player;

    // handle player
    player.on('play', () => {
      console.log('player play');
    });
  }

  handleSourceChange(sources) {
    this.player.src(sources);
  }

  render() {
    return (
      <div className="video-page">
        <Player playerOptions={this.state.playerOptions} onPlayerInit={this.handlePlayerInit}>
          <div className="player-inner-element">This is videojs-plus react example</div>
        </Player>
      </div>
    );
  }
}

export default VideoPage;
```
