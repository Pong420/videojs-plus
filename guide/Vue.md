## Vue

Refer to [Player.vue](../examples/vue/Player.vue);

## Usage

```html
<template>
  <player
    :options="playerOptions"
    @playerInit="onPlayerInit"
  />
</template>

<script>
import Player from '/path/to/your/Player.vue';

export default {
  name: 'CustomPlayer',
  components: {
    Player
  },
  computed: {
    videoSource() {
      return {
        src: "video/source/url.mp4",
        type: "video/mp4"
      }
    },
    playerOptions() {
      return {
        // ...
        videoSource: this.videoSource;
      };
    }
  },
  methods: {
    onPlayerInit(player) {
      this.player = this;

      // you may need to store `this`
      const $vm = this;

      // handle player function here
      player.on('play', () => {
        console.log('player play');
      });
    }
  }
};
</script>


```
