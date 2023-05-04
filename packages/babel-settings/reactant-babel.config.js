const plugins = [
  'babel-plugin-transform-typescript-metadata',
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

function checkGulp(caller) {
  return !!(caller && caller.name === 'babel-gulp');
}

module.exports = function baseBabelConfig(
  api,
  { presetEnvOptions = {}, sourceType = 'module' } = {},
) {
  const isGulp = api.caller(checkGulp);
  const newPlugins = [...plugins];
  if (isGulp) {
    // use `babel-plugin-direct-import` to import juno directly at widget lib release
    newPlugins.push([
      'babel-plugin-direct-import',
      {
        modules: ['@ringcentral/juno', '@ringcentral/juno-icon'],
      },
    ]);
  }
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
