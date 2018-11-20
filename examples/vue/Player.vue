<template>
  <div class="player">
    <player-header>
      <slot name="header" />
    </player-header>
    <video></video>
    <slot />
  </div>
</template>

<script>
const videojs = (window.videojs = require('video.js'));
require('videojs-hotkeys');
require('videojs-plus/dist/videojs-plus.min.js');
require('videojs-plus/dist/videojs-plus.min.css');

// require plugin here
require('videojs-contrib-quality-levels');
require('videojs-plus/dist/plugins/subtitles/');
require('videojs-plus/dist/plugins/quality-hls/');

export default {
  name: 'Player',
  props: ['options'],
  data() {
    return {
      player: null,
      playerOptions: {
        language,
        ...this.options
      }
    };
  },
  watch: {
    'options.videoSource': {
      handler(videoSource, oldVideoSource) {
        if (videoSource && this.player) {
          if (videoSource.src && videoSource.src !== oldVideoSource.src) {
            this.player.src(videoSource);
          }
        }
      },
      immediate: true
    },
    'options.subtitles'(subtitles) {
      if (subtitles && this.player) {
        this.player.subtitles().load(subtitles);
      }
    }
  },
  mounted() {
    this.createPlayer();
  },
  beforeDestroy() {
    this.destroyPlayer();
  },
  methods: {
    createPlayer() {
      if (this.player && !this.player.isFullscreen()) {
        this.destroyPlayer();
      }

      const videoEl = this.$el.querySelector('video');

      this.player = videojs(videoEl, this.playerOptions);

      // for debug purpose
      window.player = this.player;

      // insert children element into videojs container
      const children = Array.prototype.slice.call(this.$el.children);
      const playerEl = this.player.el_;
      const referEl = this.player.getChild('PlayToggleLayer').el_;

      children.forEach(el => {
        if (el !== playerEl) {
          playerEl.insertBefore(el, referEl);
        }
      });

      this.$emit('playerInit', this.player);
    },
    destroyPlayer() {
      if (this.player) {
        this.player.dispose();
        this.player = null;
      }
    }
  }
};
</script>

<style lang="scss">
.player,
.video-js {
  width: 100%;
  height: 100%;
}

.video-js {
  @media (min-width: 1440px) {
    font-size: 18px;
  }

  @media (min-width: 1680px) {
    font-size: 20px;
  }
}
</style>
