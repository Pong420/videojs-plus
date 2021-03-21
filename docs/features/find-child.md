## FindChild <!-- {docsify-ignore-all} -->

A function that find player component. For Example, you want to insert a button before SettingMenuButton.

> using findChild

```js
const { parent, component, index } = player.findChild('SettingMenuButton')[0];
parent.addChild(new Button(player), {}, index);
```

> whithout findChild

```js
const ControlBar = player.getChild('ControlBar');
const index = ControlBar.children_.indexOf('SettingMenuButton');
ControlBar.addChild(new Button(player), {}, index);
```
