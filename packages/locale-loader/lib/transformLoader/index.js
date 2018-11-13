import through from 'through2';
import fs from 'fs-extra';
import path from 'path';
import isLocaleFile from '../isLocaleFile';
import generateLoaderContent from '../generateLoaderContent';
import isLoaderFile from '../isLoaderFile';

export default function transformLoader({
  noChunk = false,
  supportedLocales = ['en-US'],
} = {}) {
  return through.obj(async function transform(file, enc, done) {
    // console.log(JSON.stringify(supportedLocales));

    const content = file.contents.toString(enc);
    const fileName = file.path.split('/').pop().split('.')[0];
    if (isLoaderFile(content)) {
      const folderPath = path.dirname(file.path);
      const files = (await fs.readdir(folderPath)).filter(isLocaleFile).filter(
        isLocaleFile.typeFilter(supportedLocales)
      );
      const loader = generateLoaderContent({
        files,
        noChunk: noChunk || isLoaderFile.noChunk(content),
      });
      file.contents = Buffer.from(loader, 'utf8');
      this.push(file);
    } else if (supportedLocales.includes(fileName)) {
      this.push(file);
    }

    done();
  });
}
