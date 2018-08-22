import semver from 'semver';
import { reduce, forEach } from 'ramda';

export default async function compileModuleDependency({
  packages,
  devDependencies = true,
  peerDependencies = true,
  dependencies = true,
  localOnly = false,
}) {
  // create a flags mapping for easier iteration
  const flags = {
    dependencies,
    devDependencies,
    peerDependencies,
  };
  return reduce((result, item) => {
    forEach(
      (type) => {
        if (flags[type] && packages[item][type]) {
          forEach(
            (dep) => {
              if (
                localOnly &&
                (
                  // not a local dependency
                  !packages[dep] ||
                  // local version didn't satisfy semver, so external version used
                  !semver.satisfies(packages[dep].version, packages[item][type][dep])
                )
              ) {
                return;
              }
              if (!result[dep]) {
                result[dep] = {};
              }
              const version = packages[item][type][dep];
              if (!result[dep][version]) {
                result[dep][version] = {};
              }
              result[dep][version][packages[item].name] = type;
            },
            Object.keys(packages[item][type]),
          );
        }
      },
      Object.keys(flags),
    );
    return result;
  }, {}, Object.keys(packages));
}
