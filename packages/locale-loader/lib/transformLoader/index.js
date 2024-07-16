import fs from 'fs-extra';
import path from 'path';
import through from 'through2';

import generateLoaderContent from '../generateLoaderContent';
import isLoaderFile, { noChunks } from '../isLoaderFile';
import isLocaleFile from '../isLocaleFile';

/**
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
export default function transformLoader(options = {}) {
  return through.obj(async function transform(file, enc, done) {
    if (file.isNull()) {
      done();
      return;
    }

    const content = file.contents.toString(enc);
    const supportedLocales = options.supportedLocales || [];
    const chunk = !noChunks(content) && (options.chunk ?? true);

    if (isLoaderFile(content)) {
      const folderPath = path.dirname(file.path);
      const files = (await fs.readdir(folderPath)).filter(isLocaleFile);
      const loader = generateLoaderContent({
        files,
        chunk,
        supportedLocales,
      });
      file.contents = Buffer.from(loader, 'utf8');
    }
    this.push(file);
    done();
  });
}
