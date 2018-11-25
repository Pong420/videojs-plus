## Setting Menu

<img src="../screenshot/setting-menu.png">

[Demo](https://pong420.github.io/videojs-plus/examples/setting-menu.html)

#### Create an on off menu item

```js
const SettingOnOffItem = videojs.getComponent('SettingOnOffItem');

class ToggleAnnotation extends SettingOnOffItem {
  constructor(player, options) {
    super(
      player,
      Object.assign(options, {
        name: 'ToggleAnnotation', // component name, optional
        label: 'Annotation',
        icon: 'vjs-icon-circle' // videojs icon classname, optional, for small screen
      })
    );

    this.addClass('vjs-setting-annotation');

    // enable by default
    this.update(true);
  }

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
const SettingMenuItem = videojs.getComponent('SettingMenuItem');

class QualityMenuItem extends SettingMenuItem {
  constructor(player, options) {
    super(
      player,
      Object.assign(options, {
        name: 'QualityMenuItem', // component name, optional
        label: 'Quality',
        icon: 'vjs-icon-hd', // videojs icon classname, optional, for small screen
        entries: [
          {
            label: 'HD',
            value: 720,
            defalut: true
          },
          {
            label: 'SD',
            value: 480
          },
          {
            label: 'Smooth',
            value: 240
          },
          'Auto' // label & value
        ]
      })
    );

    this.addClass('vjs-setting-quality');
  }

  update(selectedItem) {
    super.update(selectedItem);

    var value = selectedItem.value; // 720 / 480 / 240 / Auto

    console.log(value);
  }
}

videojs.getComponent('SettingMenuButton').prototype.options_.entries.push('QualityMenuItem');
videojs.registerComponent('QualityMenuItem', QualityMenuItem);
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
