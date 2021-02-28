## Context Menu <!-- {docsify-ignore-all} -->

> Example for adding a custom contextmenu item

```html inject
<video
  id="example-video"
  class="vjs-fluid"
  poster="https://vjs.zencdn.net/v/oceans.png"
>
  <source src="https://vjs.zencdn.net/v/oceans.mp4" />
</video>
```

```js run
const ContextMenuItem = videojs.getComponent('ContextMenuItem'); // highlight-line

class ContextMenuCopyURL extends ContextMenuItem /* highlight-line */ {
  constructor(player) {
    super(player, {
      name: 'CopyVideoURL', // component name, optional // highlight-line
      label: 'Copy video URL', // highlight-line
      icon: 'vjs-icon-xxxx' // videojs icon classname, optional // highlight-line
    });
  }

  handleClick() /* highlight-line */ {
    alert('copied');
  }
}

const player = videojs('example-video', {
  aspectRatio: '16:9',
  muted: true
});

player.getChild('ContextMenu').addChild(new ContextMenuCopyURL(player)); // highlight-line

// for demo
player.findChild('ContextMenu')[0].component.show(100, 100);
```
