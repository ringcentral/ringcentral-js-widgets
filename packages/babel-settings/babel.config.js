const plugins = [
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true,
    },
  ],
  [
    '@babel/plugin-proposal-class-properties',
    {
      loose: true,
    },
  ],
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  'const-enum',
];

function normalizePresetEnvOptions({
  useBuiltIns = 'usage',
  corejs = 3,
  ...options
} = {}) {
  return {
    useBuiltIns,
    corejs,
    ...options,
  };
}

module.exports = function baseBabelConfig(
  api,
  { presetEnvOptions = {}, sourceType = 'module' } = {},
) {
  api.cache(true);
  const newPlugins = [...plugins];
  return {
    presets: [
      ['@babel/preset-env', normalizePresetEnvOptions(presetEnvOptions)],
      '@babel/preset-react',
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
    ],
    plugins: newPlugins,
    sourceType,
  };
};
