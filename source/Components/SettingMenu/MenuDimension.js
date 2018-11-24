import { getComponent } from 'video.js';

const SettingMenu = getComponent('SettingMenu');

class SettingMenuTemp extends SettingMenu {
  constructor(player) {
    super(player, {
      name: 'SettingMenuTemp'
    });
  }
}

const getMenuDimension = function(player, items) {
  const tempMenu = new SettingMenuTemp(player);

  tempMenu.update(items);

  player.addChild(tempMenu);

  const rect = tempMenu.contentEl_.getBoundingClientRect();

  // remove subMenuItem form tempMenu first, otherwise they will also be disposed
  tempMenu.update();
  tempMenu.dispose();

  // remove tempMenu in `player.children`
  player.removeChild(tempMenu);

  return rect;
};

export default getMenuDimension;
