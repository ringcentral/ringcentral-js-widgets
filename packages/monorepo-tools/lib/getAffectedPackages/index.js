import path from 'path';
import { reduce, forEach, find, uniq } from 'ramda';
import readPackages from '../readPackages';
import compileModuleDependency from '../compileModuleDependency';


function findDependencies({
  packageNames,
  moduleDependency
}) {
  return uniq(reduce(
    (result, name) => {
      result.push(name);
      if (moduleDependency[name]) {
        const dependencies = reduce(
          (deps, version) => {
            forEach(
              item => deps.push(item),
              Object.keys(moduleDependency[name][version]),
            );
            return deps;
          },
          [],
          Object.keys(moduleDependency[name]),
        );
        return result.concat(findDependencies({
          packageNames: dependencies,
          moduleDependency,
        }));
      }
      return result;
    },
    [],
    packageNames,
  ));
}

export default async function getAffectedPackages({
  files,
  cwd = process.cwd(),
  directOnly = false,
} = {}) {
  // determine directly affected packages
  const packages = await readPackages({ cwd });
  const directlyAffectedPackages = reduce(
    (result, item) => {
      const filePath = path.resolve(cwd, item);
      const affectedPackage = find(
        p => !path.relative(path.dirname(packages[p].filePath), filePath).startsWith('..'),
        Object.keys(packages),
      );
      if (affectedPackage) {
        result.push(affectedPackage);
      }
      return result;
    },
    [],
    files,
  );

  // determine indirectly affected packages
  if (!directOnly) {
    const localModuleDependency = await compileModuleDependency({
      packages,
      localOnly: true,
    });
    return findDependencies({
      packageNames: directlyAffectedPackages,
      moduleDependency: localModuleDependency,
    });
  }
  return directlyAffectedPackages;
}
