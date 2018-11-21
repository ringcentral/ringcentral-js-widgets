import fs from 'fs-extra';
import loaderUtils from 'loader-utils';
import generateLoaderContent from '../generateLoaderContent';
import { isLocaleFile, localeFilter } from '../isLocaleFile';
import { isLoaderFile, noChunks } from '../isLoaderFile';

module.exports = function localeLoader(content) {
  const callback = this.async();
  const querys = loaderUtils.getOptions(this) || {};
  const supportedLocales = querys.supportedLocales || [];
  if (isLoaderFile(content)) {
    (async () => {
      const files = (await fs.readdir(this.context)).filter(f => isLocaleFile(f)).filter(
        localeFilter(supportedLocales));
      callback(null, generateLoaderContent({
        files,
        chunk: !noChunks(content),
      }));
    })();
  } else {
    callback(null, content);
  }
};

