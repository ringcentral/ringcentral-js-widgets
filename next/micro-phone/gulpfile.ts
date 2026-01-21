/* eslint-disable no-console */
import {
  exportLocale as el,
  importLocale as il,
} from '@ringcentral-integration/locale-loader';
import localeSettings from '@ringcentral-integration/locale-settings';
import { getProjectConfig } from '@ringcentral-integration/next-builder';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import type { AppConfig } from './config';
import { getWebpackConfig } from './webpack.config';

export async function devServer() {
  const projectConfig = getProjectConfig<AppConfig>();
  const webpackConfig = getWebpackConfig({ projectConfig, devServer: true });
  const compiler = webpack({
    ...webpackConfig,
    stats: {
      warnings: true,
      chunks: false,
      colors: true,
    },
  });
  const server = new WebpackDevServer(
    {
      // hot replacement still not working
      hot: false,
      client: {
        overlay: {
          errors: true,
          warnings: true,
          runtimeErrors: false,
        },
      },
      devMiddleware: {
        publicPath: '/',
      },
      port: projectConfig.devServerPort,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    compiler,
  );
  await server.start();
  console.log(`server listening to ${projectConfig.devServerPort}...`);
}

export async function build() {
  const projectConfig = getProjectConfig<AppConfig>();
  const webpackConfig = getWebpackConfig({ projectConfig });
  await new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err || stats!.hasErrors()) {
        reject(
          err || new Error(JSON.stringify(stats!.toJson().errors, null, 2)),
        );
        return;
      }
      resolve(true);
    });
  });
}

export async function exportLocale() {
  return el(localeSettings);
}

export async function importLocale() {
  return il(localeSettings);
}
