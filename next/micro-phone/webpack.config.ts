import type { WebpackConfigOptions } from '@ringcentral-integration/next-builder';
import {
  getBaseWebpackConfig,
  merge,
} from '@ringcentral-integration/next-builder';

import type { AppConfig } from './config';

export const getWebpackConfig = (options: WebpackConfigOptions<AppConfig>) => {
  const baseWebpackConfig = getBaseWebpackConfig(options);

  return merge(baseWebpackConfig, {});
};
