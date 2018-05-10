import fs from 'fs-extra';
import generateLoaderContent from '../generateLoaderContent';
import isLocaleFile from '../isLocaleFile';
import isLoaderFile from '../isLoaderFile';

module.exports = function localeLoader(content) {
  const callback = this.async();
  if (isLoaderFile(content)) {
    (async () => {
      const files = (await fs.readdir(this.context)).filter(f => isLocaleFile(f));
      callback(null, generateLoaderContent({
        files,
        chunk: !isLoaderFile.noChunk(content),
      }));
    })();
  } else {
    callback(null, content);
  }
};
