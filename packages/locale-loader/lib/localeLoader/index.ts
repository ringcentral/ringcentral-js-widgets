import { toHashPseudoString } from '@ringcentral-integration/i18n/lib/toPseudoString';
import fs from 'fs-extra';
// @ts-ignore
import loaderUtils from 'loader-utils';
import path from 'path';

import generateLoaderContent from '../generateLoaderContent';
import isLoaderFile, { isPseudoFile, noChunks } from '../isLoaderFile';
import isLocaleFile, { localeFilter } from '../isLocaleFile';
import parseLocaleFile from '../parseLocaleFile';

interface LocaleLoaderOptions {
  supportedLocales?: string[];
  chunk?: boolean | ((locale: string) => boolean);
  pseudo?: boolean;
}

interface LoaderContext {
  async: () => (error: Error | null, result: string) => void;
  context: string;
}

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
export default function localeLoader(
  this: LoaderContext,
  content: string,
): void {
  const callback = this.async();
  const options: LocaleLoaderOptions = loaderUtils.getOptions(this) || {};
  const supportedLocales = options.supportedLocales || [];
  const chunk = !noChunks(content) && (options.chunk ?? true);
  const pseudo = options.pseudo || false;

  if (isLoaderFile(content)) {
    (async () => {
      if (pseudo) {
        const pseudoPath = path.resolve(this.context, 'rc-XX.ts');

        if (!(await fs.pathExists(pseudoPath))) {
          await fs.writeFile(pseudoPath, '/* pseudo */\r\n');
        }
      }

      const files = (await fs.readdir(this.context))
        .filter((f) => isLocaleFile(f))
        .filter(localeFilter(supportedLocales));
      callback(
        null,
        generateLoaderContent({
          files,
          chunk,
          supportedLocales,
          pseudo,
        }),
      );
    })();
  } else if (pseudo && isPseudoFile(content)) {
    (async () => {
      const enPath = path.resolve(this.context, 'en-US.ts');
      if (!(await fs.pathExists(enPath))) {
        throw new Error('en-US.ts file not found');
      }
      const rawContent = await fs.readFile(enPath, 'utf8');
      const parsedResult = parseLocaleFile(rawContent);

      const transformed: Record<string, string> = {};

      const rootPath = path.resolve(__dirname, '../../../../');
      /**
       * the sourcePath is the path to the source file,
       *
       * result like '/apps/micro-core/src/app/views/HeaderNavView/i18n/en-US.ts'
       *
       * should have completed path for ensure the hash is unique
       */
      const sourcePath = enPath.replace(rootPath, '');
      const sourceData = parsedResult.data;

      sourceData.forEach((value, key) => {
        const keyPath = key;

        const val = toHashPseudoString(sourcePath, keyPath, value.value);
        transformed[key] = `[${val}]`;
      });

      callback(null, `export default ${JSON.stringify(transformed)}`);
    })();
  } else {
    callback(null, content);
  }
}
