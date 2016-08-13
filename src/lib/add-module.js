
/**
 * @function addModule
 * @param {String} name - Name of the module. Also used for the property name.
 * @param {any} module - The module to be attached, can be any type.
 * @description Intended to be used as an instance function. Either use
 *  the bind operator (target::addModule('testmodule', {})), or
 *  use call/apply (addModule.call(target, 'testmodule', {})).
 */
export default function addModule(name, module) {
  if (this::Object.prototype.hasOwnProperty(name)) {
    throw new Error(`module '${name}' already exists...`);
  }
  Object.defineProperty(this, name, {
    get() {
      return module;
    },
    enumerable: true,
  });
}
