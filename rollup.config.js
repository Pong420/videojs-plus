import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash/camelCase';
import scss from 'rollup-plugin-scss';
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

export default {
  input: `source/index.js`,
  output: [
    {
      file: pkg.main,
      name: camelCase(pkg.name),
      format: 'umd',
      sourcemap: true,
      globals: {
        'video.js': 'videojs'
      }
    },
    { file: pkg.module, format: 'es', sourcemap: true },
    {
      file: pkg.module,
      format: 'iife',
      sourcemap: true,
      globals: {
        'video.js': 'videojs'
      }
    }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['video.js'],
  watch: {
    include: 'source/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    scss(),
    babel({
      babelrc: true,
      exclude: 'node_modules/**',
      compact: false
    }),

    // Resolve source maps to the original source
    sourceMaps()
  ]
};
