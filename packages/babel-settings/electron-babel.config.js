const baseConfig = require('./babel.config');

module.exports = function (api) {
  return baseConfig(api, {
    presetEnvOptions: {
      useBuiltIns: false,
      corejs: false,
      targets: {
        electron: '27.1.2',
      },
    },
  });
};
