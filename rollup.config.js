import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import scss from "rollup-plugin-scss";
import CleanCSS from "clean-css";
import fs from "fs";

const dev = process.env.NODE_ENV === "dev";

const rollupOutput = options => ({
  globals: {
    "video.js": "videojs"
  },
  banner: `/* eslint-disable */`,
  ...options
});

const scssConfig = (...args) => {
  return scss({
    output: function(styles) {
      const css = new CleanCSS().minify(styles);
      if (styles.length) {
        args.forEach(dest => {
          fs.writeFileSync(dest, css.styles);
        });
      }
    }
  });
};

const external = ["video.js", "videojs-contrib-ads"];

const rollupPlugins = [
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs({
    sourceMap: false
  }),
  babel({
    babelrc: false,
    exclude: "node_modules/**",
    compact: false,
    presets: [
      [
        "@babel/preset-env",
        {
          loose: true,
          modules: false
        }
      ]
    ]
  }),
  !dev && uglify()
];

const vjsPlusPlugins = () => {
  const vjsPlusPlugins_ = [
    {
      name: "playlist",
      input: "source/Plugin/Playlist/Playlist.js"
    },
    {
      name: "autoplay",
      input: "source/Plugin/AutoPlay.js"
    },
    {
      name: "full-window-toggle",
      input: "source/Plugin/FullWindowToggle/FullWindowToggle.js"
    },
    {
      name: "subtitles",
      input: "source/Plugin/Subtitles/Subtitles.js"
    },
    {
      name: "quality",
      input: "source/Plugin/Quality/Quality.js"
    },
    {
      name: "quality",
      prefix: "-hls",
      input: "source/Plugin/Quality/Quality.Hls.js"
    },
    {
      name: "picture-in-picture",
      input: "source/Plugin/PictureInPicture/PictureInPicture.js"
    },
    {
      name: "live",
      input: "source/Plugin/Live/Live.js"
    }
  ];

  return vjsPlusPlugins_.map(({ name, prefix, input }) => {
    const dir = `dist/plugins/${name}/`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    return {
      input,
      output: [
        rollupOutput({
          file: `${dir}/videojs-plus-${name}${prefix || ""}.min.js`,
          format: "iife"
        })
      ],
      external,
      plugins: [scssConfig(`${dir}/videojs-plus-${name}.min.css`), ...rollupPlugins]
    };
  });
};

export default [
  {
    input: "source/index.js",
    output: [
      rollupOutput({
        file: `dist/videojs-plus.min.js`,
        format: "umd"
      }),
      rollupOutput({
        file: `dist/videojs-plus.cjs.min.js`,
        format: "cjs"
      })
    ],
    external,
    plugins: [scssConfig("dist/videojs-plus.min.css"), ...rollupPlugins]
  },
  ...vjsPlusPlugins()
];
