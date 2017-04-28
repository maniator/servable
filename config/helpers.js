const path = require('path');

const _root = path.resolve(__dirname, '..');

exports.root = (...args) => path.join(...[_root].concat(args));
