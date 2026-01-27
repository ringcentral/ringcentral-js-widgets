import { disableRcSharedWorkerKey } from '@ringcentral-integration/next-core/src/constant';
import fs from 'fs-extra';
import template from 'lodash/template';
import path from 'path';

/**
 * Generates a script tag containing the content of a shared worker template.
 * @param nameSpace - The namespace for the shared worker, which will put into global window.
 * @param workerUrl - The URL of the shared worker script.
 * @returns A string representing the script tag.
 */
export function getLoadWorkerTemplate(
  nameSpace = '__rc_shared_worker__',
  workerUrl: string,
  chunkName: string,
  mfeConfig?: string,
) {
  const source = fs
    .readFileSync(path.join(__dirname, './inline/loadWorker.js'))
    .toString();

  const content = template(source)({
    workerUrl,
    nameSpace,
    chunkName,
    mfeConfig,
    disableRcSharedWorkerKey,
  });
  return `<script>${content}</script>`;
}
