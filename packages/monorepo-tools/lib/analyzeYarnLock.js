import { parse } from '@yarnpkg/lockfile';
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';


function readGlob(globString, options = {}) {
  return new Promise((resolve, reject) => {
    glob(globString, options, (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    });
  });
}


async function collectPackages(cwd) {
  const globString = '{**/packages/*/package.json,package.json}';
  const packages = await readGlob(globString, { cwd });
  return packages;
}

async function compileModuleDependency(cwd) {
  // use glob to get all the relevant package.json
  const packages = await collectPackages(cwd);
  const contents = await Promise.all(packages.map(async f => JSON.parse(await fs.readFile(path.resolve(cwd, f), 'utf8'))));
  return contents.reduce((result, item) => {
    if (item.dependencies) {
      Object.keys(item.dependencies).forEach((dep) => {
        const key = `${dep}@${item.dependencies[dep]}`;
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push([item.name, 'dependencies']);
      });
    }
    if (item.peerDependencies) {
      Object.keys(item.peerDependencies).forEach((dep) => {
        const key = `${dep}@${item.peerDependencies[dep]}`;
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push([item.name, 'peerDependencies']);
      });
    }
    if (item.devDependencies) {
      Object.keys(item.devDependencies).forEach((dep) => {
        const key = `${dep}@${item.devDependencies[dep]}`;
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push([item.name, 'devDependencies']);
      });
    }
    return result;
  }, {});
}


async function readYarnLock(cwd) {
  const content = await fs.readFile(path.resolve(cwd, 'yarn.lock'), 'utf8');
  return parse(content).object;
}

function compileDependencyMap({ lock, moduleDependency, duplicateOnly = false }) {
  const fullMap = Object.keys(lock).reduce((result, key) => {
    if (moduleDependency[key]) {
      const [, moduleName, ver] = key.match(/(.*)@(.*)/);
      const resolvedVer = lock[key].version;
      if (!result[moduleName]) {
        result[moduleName] = {};
      }
      if (!result[moduleName][resolvedVer]) {
        result[moduleName][resolvedVer] = {};
      }
      result[moduleName][resolvedVer][ver] = moduleDependency[key];
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

export default async function analyzeYarnLock(cwd = process.cwd()) {
  const moduleDependency = await compileModuleDependency(cwd);
  const lock = await readYarnLock(cwd);
  return compileDependencyMap({ lock, moduleDependency, duplicateOnly: true });
}
