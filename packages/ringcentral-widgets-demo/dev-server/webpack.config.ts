import { getBaseWebpackConfig } from '@ringcentral-integration/widgets/lib/getBaseWebpackConfig';
import path from 'path';

export const devServerConfig = {
  ...getBaseWebpackConfig({ mode: 'development', themeFolder: __dirname }),
  entry: {
    index: [path.resolve(__dirname, './index')],
    proxy: [path.resolve(__dirname, './proxy')],
    redirect: [path.resolve(__dirname, './redirect')],
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
    publicPath: '/',
  },
};

export const port = 8080;
