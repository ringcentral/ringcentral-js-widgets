import fs from 'fs-extra';
import template from 'lodash/template';
import path from 'path';

export function getWorkerScript(workerUrl: string | boolean) {
  const clientSource = fs
    .readFileSync(path.join(__dirname, './inline/workerScriptsFail/client.js'))
    .toString();

  return template(clientSource)({
    workerUrl: typeof workerUrl === 'boolean' ? '' : workerUrl,
  });
}

/**
 * Generates a template for scripts that fail to load.
 *
 * @param root - The root element id. Default is `#app`.
 * @param workerUrl - The worker URL. Default is false. If you want a custom worker URL, you can set this option.
 * @returns The generated template as a string.
 */
export function getScriptsLoadFailTemplate(
  /**
   * the root element id, default is `#app`
   */
  root = '#app',
  /**
   * the worker url, default is false
   *
   * if you want custom worker url, you can set this option
   */
  workerUrl: string | boolean = false,
  /**
   * the ignore rule, default is `/mfe-registry/`
   */
  ignoreRule: string = '/mfe-registry/',
) {
  const mainSource = fs
    .readFileSync(path.join(__dirname, './inline/scriptsFail.js'))
    .toString();

  const inlineScript = template(mainSource)({
    root,
    ignoreRule,
  });

  const workerSource = workerUrl ? getWorkerScript(workerUrl) : '';

  return `<script>${inlineScript}${workerSource}</script>`;
}
