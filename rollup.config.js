import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import {terser} from 'rollup-plugin-terser';

const pkg = require('./package.json');

const banner = `/**
 * servable v${pkg.version}
 * ${pkg.homepage}
 * @author ${pkg.author}
 * @preserve
 */`;

const generalOptions = {
  shimMissingExports: true,
  treeshake: true,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    filesize()
  ]
};

const outputOptions = {
  dir: 'dist',
  amd: true,
  name: 'Servable',
  format: 'umd',
  sourcemap: true,
  globals: ["Promise"],
  banner
}

export default [
  {
    input: {
      index: 'src/index.js',
    },
    output: outputOptions,
    ...generalOptions
  },
  {
    input: {
      'index.min': 'src/index.js',
    },
    output: {
      ...outputOptions,
      plugins: [terser()]
    },
    ...generalOptions,
  },
  {
    input: {
      index: 'src/index.js',
    },
    output: {
      ...outputOptions,
      dir: 'lib',
      sourcemap: false,
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src'
    },
    ...generalOptions,
  }
];