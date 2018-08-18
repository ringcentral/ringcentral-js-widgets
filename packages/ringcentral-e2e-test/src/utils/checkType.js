export function isPlainobject(value) {
  return value && Object.prototype === value.__proto__;
}

export function isNil(value) {
  return typeof value === 'undefined' || value === null;
}
