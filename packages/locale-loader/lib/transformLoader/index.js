import through from 'through2';
import fs from 'fs-extra';
import path from 'path';
import isLocaleFile from '../isLocaleFile';
import generateLoaderContent from '../generateLoaderContent';
import isLoaderFile from '../isLoaderFile';

export default function transformLoader({
  noChunk = false,
} = {}) {
  return through.obj(async function transform(file, enc, done) {
    const content = file.contents.toString(enc);
    if (isLoaderFile(content)) {
      const folderPath = path.dirname(file.path);
      const files = (await fs.readdir(folderPath)).filter(isLocaleFile);
      const loader = generateLoaderContent({
        files,
        noChunk: noChunk || isLoaderFile.noChunk(content),
      });
      file.contents = Buffer.from(loader, 'utf8');
    }
    this.push(file);
    done();
  });
}
