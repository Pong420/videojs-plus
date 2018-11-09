import { getComponent, registerComponent, hook } from "video.js";

import "./ControlBar.Mobile.scss";

const Component = getComponent("Component");
const ControlBar = getComponent("ControlBar");

class ControlSeparator extends Component {
  constructor(player, options) {
    super(player, options);
    this.addClass("vjs-control-separator");
    this.addClass(options.className || "");
  }
}

registerComponent("ControlSeparator", ControlSeparator);

hook("beforesetup", (_, options) => {
  const children = ControlBar.prototype.options_.children.slice(0);
  const index = children.indexOf("CustomControlSpacer") + 1;

  if (index > 0) {
    ControlBar.prototype.options_.children = [
      {
        name: "ControlSeparator",
        className: "top",
        children: []
      },
      {
        name: "ControlSeparator",
        className: "middle",
        children: children.splice(0, index)
      },
      {
        name: "ControlSeparator",
        className: "bottom",
        children: children
      }
    ];
  }

  return options;
});

// prevent control bar immediately shown
hook("setup", vjsPlayer => {
  const matchDimension = value => {
    return window.matchMedia ? window.matchMedia(`(max-width: ${value}px)`).matches : window.innerWidth <= value;
  };

  if (matchDimension(480)) {
    // Prevent control bar shown immediately after playing
    vjsPlayer.controlBar.hide();
    vjsPlayer.one("playing", () => {
      // Show control bar after `userinactive` (depends on `inactivityTimeout`) or user action
      const events = ["mouseover", "userinactive", "touchstart"];
      vjsPlayer.one(events, function callback() {
        vjsPlayer.off(events, callback);
        vjsPlayer.controlBar.show();
      });

      // If player do not autoplay start, the first click to play action cause player inactive ( maybe a bug of videojs )
      // Then clcik on the player before `inactivityTimeout`, the control bar will no shown as the player still inactive
      // So we need to make sure player is active after second click
      vjsPlayer.one("touchend", () => {
        vjsPlayer.userActive(true);
      });
    });

    vjsPlayer.addClass("vjs-tiny");
  }
});
