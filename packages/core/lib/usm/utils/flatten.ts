type SubModule<T> = T | any;
type ModulesTuple<T> = [string, SubModule<T>];
type ModulesTree<T> = {
  [P in string]?: SubModule<T>;
};

export type Properties<T = any> = {
  [P in string]?: T;
};

function flatten<T>(
  modulesTree: ModulesTree<T>,
  flattenModules: Properties<T> = {},
): Properties<T> {
  Object.entries(modulesTree._modules).forEach(
    ([key, module]: ModulesTuple<T>) => {
      if (
        typeof module === 'object' &&
        (module.__name__ === null || typeof module.__name__ === 'undefined')
      ) {
        module.__key__ = key;
      }
      flattenModules[key] = module;
      if (
        typeof module._modules === 'object' &&
        Object.entries(module._modules).length > 0
      ) {
        flatten(module, flattenModules);
      }
    },
  );
  return {
    ...flattenModules,
  };
}

export { flatten };
