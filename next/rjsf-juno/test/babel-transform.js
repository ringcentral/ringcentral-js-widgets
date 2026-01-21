const __CI__ = process.argv.includes('--ci');

module.exports = require('babel-jest').default.createTransformer({
  // @rjsf be esm module, need transform
  ignore: [/node_modules\/(?!(@rjsf)\/)/],
  rootMode: 'upward',
  configFile:
    '@ringcentral-integration/babel-settings/reactant-babel.config.js',
  // cancel sourceMap in CI environment
  sourceMaps: !__CI__,
});
