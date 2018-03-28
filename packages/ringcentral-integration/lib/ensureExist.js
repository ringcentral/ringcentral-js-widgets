export default function ensureExist(module, moduleName) {
  if (!module) {
    throw new Error(`'${moduleName}' is a required dependency for '${this.constructor.name}'`);
  }
  return module;
}
