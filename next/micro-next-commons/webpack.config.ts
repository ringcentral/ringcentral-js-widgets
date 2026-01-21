import type { WebpackConfigOptions } from '@ringcentral-integration/next-builder';
import {
  getBaseWebpackConfig,
  merge,
} from '@ringcentral-integration/next-builder';
import { ModuleFederationPlugin } from '@ringcentral/mfe-builder';
import path from 'path';
import format from 'string-template';
import { LoaderOptionsPlugin } from 'webpack';

import type { AppConfig } from './config';

export const getWebpackConfig = (options: WebpackConfigOptions<AppConfig>) => {
  const baseWebpackConfig = getBaseWebpackConfig(options);

  const config = merge(baseWebpackConfig, {
    plugins: [
      new ModuleFederationPlugin(),
      new LoaderOptionsPlugin({
        debug: true,
      }),
    ],
    output: {
      path: path.resolve(
        __dirname,
        `./build/${options.projectConfig.appConfig.version.releaseVersion}/${options.projectConfig.brand}`,
      ),
    },
  });
  return [
    config,
    {
      ...config,
      target: 'webworker',
      output: {
        ...config.output,
        path: path.resolve(config.output!.path!, 'worker'),
        publicPath: format(options.projectConfig.appConfig.publicPath, {
          brand: options.projectConfig.brand,
          version: options.projectConfig.appConfig.version.releaseVersion,
        }),
      },
    },
  ];
};
