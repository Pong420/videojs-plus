## Setting Menu <!-- {docsify-ignore-all} -->

```html inject
<video
  id="example-video"
  class="vjs-fluid"
  poster="https://vjs.zencdn.net/v/oceans.png"
>
  <source src="https://vjs.zencdn.net/v/oceans.mp4" />
</video>
```

> Example for adding on-off menu item

```js run
const SettingOnOffItem = videojs.getComponent('SettingOnOffItem');

class ToggleAnnotation extends SettingOnOffItem {
  constructor(player, options) {
    super(player, {
      ...options, // you must assgin the options
      name: 'ToggleAnnotation', // component name, optional
      label: 'Annotation',
      icon: 'vjs-icon-circle' // videojs icon classname, optional, for small screen
    });

    this.addClass('vjs-setting-annotation');

    // enable by default
    this.update(true);
  }

  /**
   *  @param {Boolean} active
   */
  update(active) {
    super.update(active);

    console.log(this.active);
  }
}

videojs
  .getComponent('SettingMenuButton')
  .prototype.options_.entries.splice(0, 0, 'ToggleAnnotation');
videojs.registerComponent('ToggleAnnotation', ToggleAnnotation);
```

> Example for adding an optional menu item

```js run
const SettingOptionItem = videojs.getComponent('SettingOptionItem');
const SettingSubOptionItem = videojs.getComponent('SettingSubOptionItem');
const authorised = false;

class QualityMenuItem extends SettingOptionItem {
  constructor(player, options) {
    super(player, {
      ...options, // you must assgin the options
      name: 'QualityMenuItem', // component name, optional
      label: 'Quality',
      icon: 'vjs-icon-hd', // videojs icon classname, optional, for small screen
      entries: [
        {
          label: 'HD',
          value: 720
        },
        {
          label: 'SD',
          value: 480,
          default: true
        },
        {
          label: 'Smooth',
          value: 240
        },
        'Auto' // label & value
      ]
    });

    this.addClass('vjs-setting-quality');
  }

  onChange(...args) {
    super.onChange(...args);
    console.log(this.selected);
  }
}

class QualityMenuItemChild extends SettingSubOptionItem {
  handleClick() {
    if (authorised || this.value === 'Auto' || this.value < 720) {
      super.handleClick();
    } else {
      alert('Please Login');
      this.restore();
    }
  }
}

videojs
  .getComponent('SettingMenuButton')
  .prototype.options_.entries.push('QualityMenuItem');
videojs.registerComponent('QualityMenuItem', QualityMenuItem);
videojs.registerComponent('QualityMenuItemChild', QualityMenuItemChild);
```

<br />

```js run
const player = videojs('example-video', {
  // same as videojs config
  aspectRatio: '16:9',
  muted: true
});

player.findChild('SettingMenuButton')[0].component.handleClick();
```

#### Note

- above example script should load before initializing player, otherwise you should assign `menu` your self. For example

```js
const { component: SettingMenu } = player.findChild('SettingMenu')[0];
SettingMenu.addChild(
  new CustomMenuItem(player, {
    menu: SettingMenu
    // optionsSettingMenu
  })
);
```
