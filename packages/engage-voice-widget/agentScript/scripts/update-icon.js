const fontPaths = [
  'iconfont',
  'CCenter',
  'fontawesome-webfont',
  'glyphicons-halflings-regular',
  'Roboto-Thin',
  'Roboto-ThinItalic',
  'Roboto-Light',
  'Roboto-LightItalic',
  'Roboto-Regular',
  'Roboto-Italic',
  'Roboto-Medium',
  'Roboto-MediumItalic',
  'Roboto-Black',
  'Roboto-BlackItalic',
  'Roboto-Bold',
  'Roboto-BoldItalic',
];

const exts = ['eot', 'woff2', 'woff', 'ttf'];

(async () => {
  let result = [];
  for (const fontPath of fontPaths) {
    const urls = exts.map((ext) => {
      const url = `https://engage.ringcentral.com/voice/script-studio/assets/fonts/${fontPath}.${ext}}`;
      return url;
    });
    result = [...result, ...urls];
  }
  // TODO: auto get those file
  console.log(result);
})();
