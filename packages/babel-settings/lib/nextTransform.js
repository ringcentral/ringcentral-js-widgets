const path = require('path');
const __CI__ = process.argv.includes('--ci');
const { regexp } = require('./ignores');

module.exports = require('babel-jest').default.createTransformer({
  // some package be esm module, need transform
  ignore: regexp,
  rootMode: 'upward',
  configFile: path.resolve(__dirname, '../reactant-babel.config.js'),
  // cancel sourceMap in CI environment
  sourceMaps: !__CI__,
});
