require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
  ignore: [/node_modules/],
  rootMode: 'upward',
});
