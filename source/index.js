import "./Style/Font.scss";
import "./Style/VideoJS.scss";
import "./Components/Poster.scss";
import "./Components/Modal/Modal.scss";

import videojs from "video.js";
import playerHandler from "./Player/Player.js";
import controlbarHandler from "./Components/ControlBar/ControlBar.js";

import "./Utils/FindChild.js";
import "./Components/Title/Title.js";
import "./Components/Menu/Menu.js";
import "./Components/PlayToggleLayer/PlayToggleLayer";
import "./Components/LoadingSpinner/LoadingSpinner.scss";
import "./Components/ContextMenu/ContextMenu";
import "./Components/Setting/SettingMenuButton";

videojs.hook("setup", function(vjsPlayer) {
  const options = vjsPlayer.options_;

  playerHandler(vjsPlayer, options);
  controlbarHandler(vjsPlayer, options);
});
