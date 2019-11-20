const plugins = [
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true,
    },
  ],
  '@babel/plugin-proposal-function-bind',
  [
    '@babel/plugin-proposal-class-properties',
    {
      loose: true,
    },
  ],
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-object-rest-spread',
];

module.exports = function baseBabelConfig(api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 2,
        },
      ],
      '@babel/preset-react',
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
    ],
    plugins,
  };
};
