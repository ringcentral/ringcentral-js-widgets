import { Action } from './interface';

export const checkPatches = (
  oldStateTree: Record<string, any>,
  options: Action,
) => {
  const patches = options._patches ?? [];
  for (const patch of patches) {
    const { op, path, value } = patch;
    if (
      op === 'replace' &&
      ((toString.call(value) === '[object Object]' &&
        !!Object.keys(value).length) ||
        (Array.isArray(value) && !!value.length))
    ) {
      const oldState = path.reduce(
        (state, _path) => state?.[_path],
        oldStateTree,
      );
      if (oldState && typeof oldState === 'object') {
        const length = Array.isArray(oldState)
          ? oldState.length
          : Object.keys(oldState).length;
        if (length > 0) {
          return true;
        }
      }
    }
  }
  return false;
};
