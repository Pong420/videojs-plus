## Setting Menu

<img src="../screenshot/setting-menu.png">

[Demo](https://pong420.github.io/videojs-plus/examples/setting-menu.html)

#### Create an on off menu item

```js
const SettingOnOffItem = videojs.getComponent("SettingOnOffItem");

class ToggleAnnotation extends SettingOnOffItem {
  constructor(player, options) {
    super(player, {
      name: "ToggleAnnotation", // component name, optional
      label: "Annotation",
      icon: "vjs-icon-xxxx" // videojs icon classname, optional
    });

    this.addClass("vjs-setting-annotation");

    // enable by default
    this.update(true);
  }

  update(active) {
    super.update(active);

    console.log(this.active);
  }
}

// findChild is a extension of videojs-plus
const SettingMenu = player.findChild("SettingMenu")[0].component;
SettingMenu.addChild(new ToggleAnnotation(player), 0, 0);
```

#### Create an optional menu item

```js
const SettingMenuItem = videojs.getComponent("SettingMenuItem");

class QualityMenuItem extends SettingMenuItem {
  constructor(player, options) {
    super(player, {
      name: "QualityMenuItem", // component name, optional
      label: "Quality",
      icon: "vjs-icon-xxxx" // videojs icon classname, optional
      values: [
        {
          label: "HD",
          value: 720,
          defalut: true
        },
        {
          label: "SD",
          value: 480
        },
        {
          label: "Smooth",
          value: 240
        },
        "Auto" // label & value
      ]
    });

    this.addClass("vjs-setting-quality");
  }

  update(selectedItem) {
    super.update(selectedItem);

    var value = selectedItem.value; // 720 / 480 / 240 / Auto

    console.log(value);
  }
}

// findChild is a extension of videojs-plus
const SettingMenu = player.findChild("SettingMenu")[0].component;
SettingMenu.addChild(new QualityMenuItem(player));
```

If your new menu item is wider then default, you should override the default width

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
