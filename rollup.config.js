import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import license from 'rollup-plugin-license';
import globals from 'rollup-plugin-node-globals';

const pkg = require('./package.json');

const banner = `servable v${pkg.version}
${pkg.homepage}
@author ${pkg.author}
@preserve`;

export default {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'umd',
  moduleName: 'Servable',
  sourceMap: true,
  plugins: [
    buble(),
    sizes(),
    globals(),
    license({
      banner,
    }),
    nodeResolve({
      jsnext: true
    })
  ]
}
