const path = require('path');
const __CI__ = process.argv.includes('--ci');

module.exports = require('babel-jest').default.createTransformer({
  ignore: [/node_modules/],
  rootMode: 'upward',
  configFile: path.resolve(__dirname, '../reactant-babel.config.js'),
  // cancel sourceMap in CI environment
  sourceMaps: !__CI__,
});
