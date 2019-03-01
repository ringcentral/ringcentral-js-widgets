module.exports = require('babel-jest').createTransformer({
  ignore: [/node_modules/],
  rootMode: 'upward',
});
