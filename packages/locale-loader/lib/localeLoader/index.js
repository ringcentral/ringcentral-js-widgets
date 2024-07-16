import fs from 'fs-extra';
import loaderUtils from 'loader-utils';

import generateLoaderContent from '../generateLoaderContent';
import isLoaderFile, { noChunks } from '../isLoaderFile';
import isLocaleFile, { localeFilter } from '../isLocaleFile';

/**
 *
 * locale loader can work with options like below
 * ```
 * {
 *   loader: '@ringcentral-integration/locale-loader',
 *   options: {
 *     supportedLocales,
 *     chunk,
 *   },
 * }
 * ```
 *
 * - `supportedLocales` to support locales
 * * `chunk`
 *   * be `boolean` will toggle that chunk mode.
 *   * be `function` can be method with `(locale: string) => boolean`, provide you a way to specify which language be chunked.
 *
 * @example
 * ```ts
 * chunk: (local: string) => {
 *   return local !== 'en-US'; // en-US will not be chunked, that will be package into main script directly
 * }
 * ```
 */
module.exports = function localeLoader(content) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this) || {};
  const supportedLocales = options.supportedLocales || [];
  const chunk = !noChunks(content) && (options.chunk ?? true);

  if (isLoaderFile(content)) {
    (async () => {
      const files = (await fs.readdir(this.context))
        .filter((f) => isLocaleFile(f))
        .filter(localeFilter(supportedLocales));
      callback(
        null,
        generateLoaderContent({
          files,
          chunk,
          supportedLocales,
        }),
      );
    })();
  } else {
    callback(null, content);
  }
};
