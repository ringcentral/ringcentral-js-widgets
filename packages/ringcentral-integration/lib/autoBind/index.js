export default function autoBind(prototype, property, descriptor) {
  descriptor.value._autoBind = true;
  return descriptor;
}

export function bindFunctionTo(self) {
  let proto = Object.getPrototypeOf(self);

  while (proto !== Object.prototype) {
    Object.getOwnPropertyNames(proto).forEach((key) => {
      if (
        typeof self[key] === 'function' &&
        self[key]._autoBind
      ) {
        self[key] = self::self[key];
      }
    });
    proto = Object.getPrototypeOf(proto);
  }
}
