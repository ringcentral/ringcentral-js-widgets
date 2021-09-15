module.exports = require('babel-jest').default.createTransformer({
  ignore: [/node_modules/],
  rootMode: 'upward',
});
