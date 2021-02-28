## Playlist <!-- {docsify-ignore-all} -->

<link rel="stylesheet" href="/docs/assets/playlist.css" />

### Usage

Include the plugin js and css

```html inject keep
<link rel="stylesheet" href="../dist/plugins/playlist/style.css" />
<script src="../dist/plugins/playlist/index.js"></script>
```

> The playlist UI at the right-hand side need to create by yourself

```html inject
<div class="container">
  <div class="video-container"><video id="example-video"></video></div>
  <div class="playlist-ui">
    <div class="item-header">
      <a
        href="https://gist.github.com/jsturgis/3b19447b304616f18657"
        target="_blank"
      >
        Video sources
      </a>
    </div>
    <div class="wrapper"><div class="list"></div></div>
  </div>
</div>
```

```js run
const playList = [
  {
    title: 'For Bigger Meltdowns',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    sources: [
      {
        src:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        type: 'video/mp4'
      }
    ]
  },
  {
    title: 'Sintel',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    sources: [
      {
        src:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        type: 'video/mp4'
      }
    ]
  },
  {
    title: 'Tears of Steel',
    poster:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
    sources: [
      {
        src:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        type: 'video/mp4'
      }
    ]
  }
];

const player = videojs('example-video', {
  autoplay: true,
  muted: true,
  playlist: playList // highlight-line
});

// or
// player.setPlayList(playlist, startIndex); // highlight-line

/**
 *  player list ui handler
 */
const $list = document.querySelector('.playlist-ui .list');
const $wrapper = document.querySelector('.wrapper');
let $selected = null;

playList.forEach((item, index) => {
  const $div = document.createElement('div');
  $div.innerHTML += `
        <div class="list-item">
            <div class="thumbnail" style="background-image:url(${item.poster})"></div>
            <div class="title">${item.title}</div>
        </div>`;

  const $el = $div.children[0];

  if (!$selected) {
    $selected = $el;
    videojs.dom.addClass($selected, 'selected');
  }

  $el.addEventListener('click', function () {
    player.playlist.play(index);
  });

  $list.appendChild($el);
});

player.on('playlistchange', function (_, selected) {
  videojs.dom.removeClass($selected, 'selected');
  $selected = $list.children[selected.index];
  videojs.dom.addClass($selected, 'selected');
  $wrapper.scrollTo(
    0,
    $selected.offsetTop - ($wrapper.offsetHeight - $selected.offsetHeight) / 2
  );
});
```

### API and Event

```js
// set playlist directly instead of put at options
player.setPlayList(playlist, startIndex);

// switch video
player.playlist.play(1);

// get current video
player.playlist.current();

// get current video index
player.playlist.index();

// get playlist
player.playlist.values;

// loop playlist, default true
player.playlist.loop(false);

// control player should autoplay next or not
player.playlist.autoplayNext(false);

// fire when `player.setPlayList` call.
player.on('playlist', playlist => {
  console.log('playlist setup', playlist);
});

player.on('playlistchange', (event, selectedPlayList) => {
  console.log('playlist changed', selectedPlayList);
});

// fire when autoplay next options changed
player.on('autoplaynext', (event, autoplayNext) => {
  console.log('autoplay next behaviour changed', autoplayNext);
});
```
