const __CI__ = process.argv.includes('--ci');

module.exports = require('babel-jest').default.createTransformer({
  ignore: [/node_modules/],
  rootMode: 'upward',
  // cancel sourceMap in CI environment
  sourceMaps: !__CI__,
});
