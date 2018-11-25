import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import scss from 'rollup-plugin-scss';
import CleanCSS from 'clean-css';
import fs from 'fs';
import path from 'path';

import { eslint } from 'rollup-plugin-eslint';

const dev = process.env.NODE_ENV === 'dev';

const mkdirp = dir =>
  path
    .resolve(dir)
    .split(path.sep)
    .reduce((acc, cur) => {
      const currentPath = path.normalize(acc + path.sep + cur);

      try {
        fs.statSync(currentPath);
      } catch (e) {
        if (e.code === 'ENOENT') {
          fs.mkdirSync(currentPath);
        } else {
          throw e;
        }
      }
      return currentPath;
    }, '');

const createEntry = ({ input, output, css = true }) => {
  return {
    input,
    output: {
      globals: {
        'video.js': 'videojs'
      },
      ...output
    },
    external: ['video.js'],
    watch: {
      clearScreen: false
    },
    plugins: [
      commonjs({
        sourceMap: false
      }),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      scss({
        output: styles => {
          if (styles.length && css) {
            const cssOutput = output.file.replace('.js', '.css');
            const parsedCSS = new CleanCSS().minify(styles);

            mkdirp(cssOutput.replace(/[^\/]*$/, ''));

            fs.writeFileSync(cssOutput, parsedCSS.styles);
          }
        }
      }),
      eslint({
        exclude: ['node_modules/**', '*.scss']
      }),
      babel({
        babelrc: true,
        exclude: 'node_modules/**',
        compact: false
      }),
      !dev && uglify()
    ]
  };
};

const coreEntries = ['umd', 'cjs'].map(format => {
  const prefix = format === 'umd' ? '' : `.${format}`;

  return createEntry({
    input: 'source/index.js',
    output: {
      file: `dist/videojs-plus${prefix}.min.js`,
      format
    },
    css: format === 'umd'
  });
});

const pluginEntries = fs.readdirSync('source/Plugin').map(pluginName => {
  const parsedName = pluginName
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();

  console.log({
    input: `source/Plugin/${pluginName}/${pluginName}.js`,
    output: {
      file: `dist/${parsedName}/videojs-plus.${parsedName}.min.js`,
      format: 'iife'
    }
  });

  return createEntry({
    input: `source/Plugin/${pluginName}/${pluginName}.js`,
    output: {
      file: `dist/${parsedName}/videojs-plus.${parsedName}.min.js`,
      format: 'iife'
    }
  });
});

export default [...coreEntries, ...pluginEntries];
