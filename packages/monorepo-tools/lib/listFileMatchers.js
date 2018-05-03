import path from 'path';
import readGlob from './readGlob';

export default async function listExtensions({
  cwd = process.cwd(),
  filterNodeModules = true,
  showFile = true,
} = []) {
  const files = await readGlob('**/*', { cwd, dot: true, nodir: true });
  return files.reduce((result, item) => {
    if (!filterNodeModules || (!/node_modules/.test(item) && !/.git\//.test(item))) {
      const ext = path.extname(item);
      const entry = (ext === '') ?
        path.basename(item) :
        `*${ext}`;
      if (result.indexOf(entry) === -1) {
        if (showFile) {
          console.log(`"${entry}": ${item}`);
        }
        result.push(entry);
      }
    }
    return result;
  }, []);
}

