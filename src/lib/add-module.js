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
