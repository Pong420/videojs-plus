## Setting Menu

<img src="../screenshot/setting-menu.png">

[Demo](https://pong420.github.io/videojs-plus/examples/setting-menu.html)

If you got an error from below example script, visit [the example source code](examples/setting-menu.html)

#### Create an on off menu item

```js
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

#### Create an optional menu item

```js
const SettingOptionItem = videojs.getComponent('SettingOptionItem');

class QualityMenuItem extends SettingOptionItem {
  constructor(player, options) {
    super(player, {
      ...options, // you must assgin the options
      name: 'QualityMenuItem', // component name, optionsal
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

videojs
  .getComponent('SettingMenuButton')
  .prototype.options_.entries.push('QualityMenuItem');
videojs.registerComponent('QualityMenuItem', QualityMenuItem);

// If you want to change/customize the options item, you can register new a component.
// For example, HD quality only allow authorised user.
const SettingSubOptionItem = videojs.getComponent('SettingSubOptionItem');
const authorised = false;

// The classname must be the name of your `SettingOptionItem` suffix `Child`
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

// remember to register your component
videojs.registerComponent('QualityMenuItemChild', QualityMenuItemChild);
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
