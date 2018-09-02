import { parse } from '@yarnpkg/lockfile';
import fs from 'fs-extra';
import path from 'path';
import readPackages from '../readPackages';
import compileModuleDependency from '../compileModuleDependency';

async function readYarnLock(cwd) {
  const content = await fs.readFile(path.resolve(cwd, 'yarn.lock'), 'utf8');
  return parse(content).object;
}

function compileDependencyMap({ lock, moduleDependency, duplicateOnly = false }) {
  const fullMap = Object.keys(lock).reduce((result, key) => {
    const [, moduleName, ver] = key.match(/(.*)@(.*)/);
    if (moduleDependency[moduleName] && moduleDependency[moduleName][ver]) {
      const resolvedVer = lock[key].version;
      if (!result[moduleName]) {
        result[moduleName] = {};
      }
      if (!result[moduleName][resolvedVer]) {
        result[moduleName][resolvedVer] = {};
      }
      result[moduleName][resolvedVer][ver] = moduleDependency[moduleName][ver];
    }
    return result;
  }, {});
  if (duplicateOnly) {
    return Object.keys(fullMap).reduce((result, key) => {
      if (Object.keys(fullMap[key]).length > 1) {
        result[key] = fullMap[key];
      }
      return result;
    }, {});
  }
  return fullMap;
}

export default async function analyzeYarnLock({
  cwd = process.cwd(),
  duplicateOnly = true,
  devDependencies = true,
  peerDependencies = true,
  dependencies = true,
} = {}) {
  const packages = await readPackages({ cwd });
  const moduleDependency = await compileModuleDependency({
    packages,
    devDependencies,
    peerDependencies,
    dependencies,
  });
  const lock = await readYarnLock(cwd);
  return compileDependencyMap({
    lock,
    moduleDependency,
    duplicateOnly,
    devDependencies,
    peerDependencies,
    dependencies,
  });
}
