import { getBaseWebpackConfig } from '@ringcentral-integration/widgets/lib/getBaseWebpackConfig';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import { DefinePlugin, ProvidePlugin } from 'webpack';
import { merge } from 'webpack-merge';

export const getWebpackConfig = ({ mode }) => {
  const baseConfig = getBaseWebpackConfig({
    mode,
    themeFolder: __dirname,
  });
  return merge(baseConfig, {
    plugins: [
      // TODO: use @babel/plugin-transform-react-jsx
      new ProvidePlugin({
        React: 'react',
      }),
      // new WebpackCommandPlugin({
      //   command: 'yarn workspace @ringcentral-integration/brand-config start',
      // }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'browser-extension/client.html',
            to: path.join(__dirname, 'build'),
            force: true,
          },
          {
            from: 'browser-extension/background.html',
            to: path.join(__dirname, 'build'),
            force: true,
          },
          {
            from: 'browser-extension/redirect.html',
            to: path.join(__dirname, 'build'),
            force: true,
          },
          {
            from: 'browser-extension/manifest.json',
            to: path.join(__dirname, 'build'),
            force: true,
          },
        ],
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
    entry: {
      background: [path.resolve(__dirname, 'background')],
      client: [path.resolve(__dirname, 'client')],
      redirect: [path.resolve(__dirname, 'redirect')],
    },
    output: {
      path: path.resolve(__dirname, './build'),
      filename: '[name].js',
      publicPath: '/',
      clean: true,
    },
  });
};

export const port = 9090;
