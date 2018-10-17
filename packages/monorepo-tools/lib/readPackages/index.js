import path from 'path';
import fs from 'fs-extra';
import asyncReduce from '@ringcentral-integration/utils/lib/asyncReduce';
import readGlob from '../readGlob';


export default async function readPackages({ cwd = process.cwd() } = {}) {
  const globString = '{**/packages/*/package.json,package.json}';
  const packages = (await readGlob(globString, { cwd }))
    .map(f => path.resolve(cwd, f));
  return asyncReduce(
    async (result, item) => {
      const {
        name,
        version,
        devDependencies,
        peerDependencies,
        dependencies,
      } = JSON.parse(await fs.readFile(item, 'utf8'));
      if (name && version) {
        result[name] = {
          filePath: item,
          name,
          version,
        };
        if (dependencies) {
          result[name].dependencies = dependencies;
        }
        if (devDependencies) {
          result[name].devDependencies = devDependencies;
        }
        if (peerDependencies) {
          result[name].peerDependencies = peerDependencies;
        }
      }
      return result;
    },
    {},
    packages,
  );
}
