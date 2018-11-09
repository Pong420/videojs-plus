import { hook, registerPlugin, getPlugin } from "video.js";

import "./SubtitlesItem";
import "./Subtitles.scss";

const Plugin = getPlugin("plugin");

class subtitles extends Plugin {
  constructor(player, options) {
    super(player, options);

    this.flag = null;
    this.track = null;

    let timeout;
    player.textTracks().on("change", function() {
      clearTimeout(timeout);

      let newFlag;
      let subtitles = [];
      let showing = this.tracks_.filter(track => {
        if (track.kind === "subtitles") {
          subtitles.push(track);
          if (track.mode === "showing") {
            newFlag = track.label || track.id;
            return true;
          }
        }
      })[0];

      // multiple `change` event will reveiced when subtitles changed ( depends on number of subtitles or browser ? )
      // so that timeout is used to make sure `subtitlechange` event emit once;
      timeout = setTimeout(() => {
        if (this.flag !== newFlag) {
          this.flag = newFlag;
          showing = showing || {};

          player.trigger("subtitlechange", {
            index: subtitles.indexOf(showing),
            label: showing.label || ""
          });
        }
      }, 10);
    });
  }
  load(subtitles = []) {
    const { player } = this;

    if (subtitles && subtitles.length) {
      this.remove();

      subtitles.forEach(subtitle => {
        if (this.flag) {
          subtitle.default = subtitle.label === this.flag;
        }

        const manualCleanup = true;
        const trackEl = player.addRemoteTextTrack(subtitle, manualCleanup);

        if (!this.flag && subtitle.default) {
          this.flag = subtitle.label;
          this.track = trackEl.track;

          trackEl.track.mode = "showing";
        }
      });

      const SubtitlesMenuItem = player.findChild("SubtitlesMenuItem")[0].component;

      SubtitlesMenuItem.setEntries(
        subtitles.map(({ label, default: default_ }, index) => ({
          label,
          value: index,
          defalut: default_
        }))
      );

      SubtitlesMenuItem.show();

      player.trigger("subtitles", subtitles);
    }
  }

  remove() {
    const tracks = this.player.textTracks().tracks_.slice(0);

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      if (track && track.kind === "subtitles") {
        this.player.removeRemoteTextTrack(track);
      }
    }
  }

  pick(index) {
    const tracks = this.player.textTracks();
    const newTrack = tracks[index];

    if (newTrack) {
      newTrack.mode = "showing";
      this.track.mode = "disabled";
      this.track = newTrack;
    }
  }
}

hook("setup", vjsPlayer => {
  vjsPlayer.ready(() => {
    vjsPlayer.subtitles().load(vjsPlayer.options_.subtitles);
  });
});

registerPlugin("subtitles", subtitles);
