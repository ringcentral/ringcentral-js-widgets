"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = autoBind;
exports.bindFunctionTo = bindFunctionTo;

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.array.for-each");

function autoBind(prototype, property, descriptor) {
  descriptor.value._autoBind = true;
  return descriptor;
}

function bindFunctionTo(self) {
  var proto = Object.getPrototypeOf(self);

  while (proto !== Object.prototype) {
    Object.getOwnPropertyNames(proto).forEach(function (key) {
      if (typeof self[key] === 'function' && self[key]._autoBind) {
        self[key] = self[key].bind(self);
      }
    });
    proto = Object.getPrototypeOf(proto);
  }
}
//# sourceMappingURL=index.js.map
