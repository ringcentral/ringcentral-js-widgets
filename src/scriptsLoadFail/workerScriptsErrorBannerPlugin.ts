import fs from 'fs-extra';
import path from 'path';
import { BannerPlugin } from 'webpack';

export const createWorkerScriptsErrorBannerPlugin = (options?: {
  include?: RegExp[];
}) => {
  const content = fs
    .readFileSync(path.join(__dirname, './inline/workerScriptsFail/worker.js'))
    .toString();

  return new BannerPlugin({
    banner: content,
    raw: true,
    include: [/worker|coworker/],
    ...options,
  });
};
