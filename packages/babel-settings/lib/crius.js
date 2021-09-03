module.exports = require('babel-jest').default.createTransformer({
  presets: [['@babel/preset-env'], ['babel-preset-crius']],
  plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
  ignore: [/node_modules/],
  rootMode: 'upward',
  test: './test',
});
