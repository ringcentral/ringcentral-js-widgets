import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import yargs from 'yargs';
import { devServerConfig, port } from './dev-server/webpack.config';

import {
  getWebpackConfig as getWebpackExtConfig,
  port as extPort,
} from './browser-extension/webpack.config';

const {
  argv: { file },
} = yargs.string('file');

export async function devServer() {
  const compiler = webpack({
    ...devServerConfig,
    stats: {
      warnings: false,
      chunks: false,
      colors: true,
    },
  });
  const server = new WebpackDevServer(
    {
      static: {
        directory: path.resolve('dev-server'),
      },
      hot: true,
      devMiddleware: {
        publicPath: '/',
      },
      port,
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        },
      },
    },
    compiler,
  );
  await server.start();
  console.log(`server listening to ${port}...`);
}

export async function devExtensionServer() {
  const devExtensionServerConfig = getWebpackExtConfig({
    mode: 'development',
  });
  const excludeEntriesToHotReload = ['background'];

  for (const entryName in devExtensionServerConfig.entry) {
    if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
      devExtensionServerConfig.entry[entryName] = [
        'webpack/hot/dev-server',
        `webpack-dev-server/client?hot=true&hostname=localhost&port=${extPort}`,
      ].concat(devExtensionServerConfig.entry[entryName]);
    }
  }

  devExtensionServerConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
  ].concat(devExtensionServerConfig.plugins || []);

  devExtensionServerConfig.devtool = 'cheap-module-source-map';

  const compiler = webpack(devExtensionServerConfig);

  const server = new WebpackDevServer(
    {
      https: false,
      hot: false,
      client: false,
      host: 'localhost',
      port: extPort,
      static: {
        directory: path.join(__dirname, '../build'),
      },
      devMiddleware: {
        publicPath: `http://localhost:${extPort}/`,
        writeToDisk: true,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      allowedHosts: 'all',
    },
    compiler,
  );

  if (module.hot) {
    module.hot.accept();
  }

  await server.start();
  console.log(`server listening to ${extPort}...`);
}

export async function copyConfig() {
  if (!(await fs.exists(file))) {
    console.log(`Error: ${file} does not exist!`);
  }
  const dest = path.resolve(__dirname, 'dev-server/api-config.js');
  await fs.copy(file, dest);
  console.log(`File ${file} copied to ${dest}`);
}
