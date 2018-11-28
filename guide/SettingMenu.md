## Setting Menu

<img src="../screenshot/setting-menu.png">

[Demo](https://pong420.github.io/videojs-plus/examples/setting-menu.html)

:warning: below example script could be outdated, visit the source code of above demo will be better

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

  /**
   *  @param {Boolean} active
   */
  update(active) {
    super.update(active);

    console.log(this.active);
  }
}

videojs.getComponent('SettingMenuButton').prototype.options_.entries.splice(0, 0, 'ToggleAnnotation');
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
          defalut: true
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

  /**
   *  @param {SettingSubOptionItem} selectedItem - videojs component,
   */
  update(selectedItem) {
    super.update(selectedItem);

    const { label, value } = selectedItem;

    console.log(label, value);
  }
}

videojs.getComponent('SettingMenuButton').prototype.options_.entries.push('QualityMenuItem');
videojs.registerComponent('QualityMenuItem', QualityMenuItem);

// if you want to change/customise the options item, you can regsiter new a component.
// for example, HD quality only allow authorised user,
const SettingSubOptionItem = videojs.getComponent('SettingSubOptionItem');
const authorised = false;

// the classname should be the name of `SettingOptionItem` suffix `Child`
class QualityMenuItemChild extends SettingSubOptionItem {
  handleClick() {
    if (authorised || this.value < 720) {
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

- above example script should load before initialize player, otherwise you should assgin `menu` your self. For example

```js
const { component: SettingMenu } = player.findChild('SettingMenu')[0];
SettingMenu.addChild(
  new CustomMenuItem(player, {
    menu: SettingMenu
    // optionsSettingMenu
  })
);
```

- If your new menu item is wider then default, you should override the default width

```css
.vjs-menu .vjs-menu-content .vjs-menu-item.vjs-setting-menu-item {
  width: 20em;
}
```

or applied on your specific class

```css
.vjs-menu .vjs-menu-content .vjs-menu-item.vjs-setting-quality {
  width: 20em;
}
```
