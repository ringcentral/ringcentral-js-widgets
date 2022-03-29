export default function ensureExist<T>(module: T, moduleName: keyof T) {
  if (!module) {
    throw new Error(
      `'${moduleName}' is a required dependency for '${this.constructor.name}'`,
    );
  }
  return module;
}
