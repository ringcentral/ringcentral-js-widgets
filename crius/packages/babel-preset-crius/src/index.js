import { declare } from '@babel/helper-plugin-utils';
import transformReactDisplayName from '@babel/plugin-transform-react-display-name';
import transformReactJSX from '@babel/plugin-transform-react-jsx';
import transformReactJSXSelf from '@babel/plugin-transform-react-jsx-self';
import transformReactJSXSource from '@babel/plugin-transform-react-jsx-source';

export default declare((api, opts) => {
  api.assertVersion(7);

  const pragma = opts.pragma || 'Crius.createFlow';
  const pragmaFrag = opts.pragmaFrag || 'Crius.Process';
  const throwIfNamespace =
    opts.throwIfNamespace === undefined ? true : !!opts.throwIfNamespace;
  const development = !!opts.development;
  const useBuiltIns = !!opts.useBuiltIns;

  if (typeof development !== 'boolean') {
    throw new Error(
      "babel-preset-crius 'development' option must be a boolean.",
    );
  }

  return {
    plugins: [
      [
        transformReactJSX,
        { pragma, pragmaFrag, throwIfNamespace, useBuiltIns },
      ],
      transformReactDisplayName,

      development && transformReactJSXSource,
      development && transformReactJSXSelf,
    ].filter(Boolean),
  };
});
