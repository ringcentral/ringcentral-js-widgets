module.exports = {
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    [require.resolve('./packages/babel-preset-crius/lib')],
  ],
  plugins: [
    ['@babel/plugin-syntax-jsx'],
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
