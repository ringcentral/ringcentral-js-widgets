import { disableRcSharedWorkerKey } from '@ringcentral-integration/next-core/src/constant';
import fs from 'fs-extra';
import template from 'lodash/template';
import path from 'path';

export interface LoadWorkerTemplateOptions {
  /**
   * Skip SharedWorker construction unless BroadcastChannel is available.
   */
  requireBroadcastChannel?: boolean;
  /**
   * Keep SharedWorker construction and error diagnostics static.
   */
  sanitizeWorkerErrors?: boolean;
  /**
   * Override the browser SharedWorker name while preserving the chunk name by default.
   */
  workerName?: string;
  /**
   * Set to false when the caller wants to keep worker mode for Safari.
   */
  shouldCheckUnsupportedWorkerUserAgent?: boolean;
}

/**
 * Generates a script tag containing the content of a shared worker template.
 * @param nameSpace - The namespace for the shared worker, which will put into global window.
 * @param workerUrl - The URL of the shared worker script.
 * @param options - Options for the generated shared worker loader script.
 * @returns A string representing the script tag.
 */
export function getLoadWorkerTemplate(
  nameSpace = '__rc_shared_worker__',
  workerUrl: string,
  chunkName: string,
  mfeConfig?: string,
  options: LoadWorkerTemplateOptions = {},
): string {
  const {
    requireBroadcastChannel = false,
    sanitizeWorkerErrors = false,
    shouldCheckUnsupportedWorkerUserAgent = true,
    workerName = chunkName,
  } = options;
  const source = fs
    .readFileSync(path.join(__dirname, './inline/loadWorker.js'))
    .toString();

  const workerFailureDiagnostic = `'${JSON.stringify(
    `load ${nameSpace} worker fail`,
  )
    .slice(1, -1)
    .replace(/'/g, "\\'")}'`;
  const workerConstructor = sanitizeWorkerErrors
    ? `let worker;
    try {
      worker = new SharedWorker(url, { name });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(${workerFailureDiagnostic});
      if (window.workerScriptsFail && window.workerScriptsFail.renderLoadFail) {
        window.workerScriptsFail.renderLoadFail();
      }
      return;
    }`
    : 'const worker = new SharedWorker(url, { name });';
  const workerErrorListener = sanitizeWorkerErrors
    ? `let workerLoadFailed = false;
    worker.addEventListener('error', (event) => {
      try {
        event.preventDefault();
      } catch (error) {
        // Error-event suppression is best effort.
      }
      if (workerLoadFailed) return;
      workerLoadFailed = true;
      // eslint-disable-next-line no-console
      console.error(${workerFailureDiagnostic});

      if (window.workerScriptsFail && window.workerScriptsFail.renderLoadFail) {
        window.workerScriptsFail.renderLoadFail();
      }
    });`
    : `worker.addEventListener('error', (event) => {
      // eslint-disable-next-line no-console
      console.error(${workerFailureDiagnostic}, event);

      if (window.workerScriptsFail && window.workerScriptsFail.renderLoadFail) {
        window.workerScriptsFail.renderLoadFail();
      }
    });`;
  const content = template(source)({
    workerUrl,
    nameSpace,
    chunkName,
    mfeConfig,
    disableRcSharedWorkerKey,
    shouldCheckUnsupportedWorkerUserAgent: shouldCheckUnsupportedWorkerUserAgent
      ? '1'
      : '',
    workerName: JSON.stringify(workerName)
      .slice(1, -1)
      .replace(/'/g, "\\'")
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029'),
  })
    .replace(
      / {4}\/\* __BROADCAST_CHANNEL_CONDITION__ \*\/\r?\n/,
      requireBroadcastChannel ? '    globalThis.BroadcastChannel &&\n' : '',
    )
    .replace('__WORKER_CONSTRUCTOR__;', workerConstructor)
    .replace('__WORKER_ERROR_LISTENER__;', workerErrorListener);

  if (
    /__(?:BROADCAST_CHANNEL_CONDITION|WORKER_CONSTRUCTOR|WORKER_ERROR_LISTENER)__/.test(
      content,
    )
  ) {
    throw new Error('Unable to resolve SharedWorker loader template markers.');
  }

  return `<script>${content}</script>`;
}
