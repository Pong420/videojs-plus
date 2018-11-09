import { dom, getComponent, registerComponent } from "video.js";

import "./ContextMenu.scss";
import "./Item/ContextMenuToggleLoop.js";
import "./Item/AboutThisPlayer.js";

import CloseContextMenu from "./CloseContextMenu";

const Menu = getComponent("Menu");

class ContextMenu extends Menu {
  constructor(player, options) {
    super(player, options);

    this.addClass("vjs-context-menu");

    this.hide();

    this.player_.on("contextmenu", this.onContextmenu.bind(this));

    const handleClick = this.handleClick.bind(this);
    window.addEventListener("click", handleClick);
    this.on("dispose", () => {
      window.removeEventListener("click", handleClick);
    });
  }

  createEl(...args) {
    const el = super.createEl(...args);

    const layer = new CloseContextMenu(this.player_, {
      menu: this
    });

    el.insertBefore(layer.el_, el.firstElementChild);

    return el;
  }

  show(x, y) {
    super.show();

    this.el_.style.top = y + "px";
    this.el_.style.left = x + "px";
  }

  onContextmenu(evt) {
    evt.preventDefault();

    const rect = this.player_.el().getBoundingClientRect();

    const x = evt.pageX - rect.x;
    const y = evt.pageY - rect.y;

    this.show(x, y);
  }

  handleClick(evt) {
    if (evt.button || evt.button === 0) {
      if (evt.button !== 2) {
        this.hide();
      }
    }
  }
}

ContextMenu.prototype.options_ = {
  children: ["ContextMenuToggleLoop", "AboutThisPlayer"]
};

registerComponent("ContextMenu", ContextMenu);

getComponent("Player").prototype.options_.children.push("ContextMenu");
