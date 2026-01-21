/* eslint-disable no-console */
import {
  exportLocale as el,
  importLocale as il,
} from '@ringcentral-integration/locale-loader';
import localeSettings from '@ringcentral-integration/locale-settings';
import {
  getProjectConfig,
  startDevServer,
} from '@ringcentral-integration/next-builder';
import webpack from 'webpack';

import type { AppConfig } from './config';
import { getWebpackConfig } from './webpack.config';

export async function devServer() {
  const projectConfig = getProjectConfig<AppConfig>();
  const webpackConfig = getWebpackConfig({ projectConfig, devServer: true });
  await startDevServer(webpackConfig, projectConfig.devServerPort);
}

export async function build() {
  const projectConfig = getProjectConfig<AppConfig>();
  const webpackConfig = getWebpackConfig({ projectConfig });
  // it should be a serial execution
  // When two different targets have directory dependencies and run in parallel,
  // the worker folder could be accidentally deleted due to race conditions in execution order.
  for (const config of webpackConfig) {
    await new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
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
}

export async function exportLocale() {
  return el(localeSettings);
}

export async function importLocale() {
  return il(localeSettings);
}
