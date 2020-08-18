"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = freeze;

require("core-js/modules/es6.reflect.get");

var warn = function warn(key) {
  throw new Error("Property '".concat(key, "' is read only."));
};

function freeze(object) {
  return new Proxy(object, {
    set: function set(target, key) {
      return warn(key);
    },
    get: function get(target, key) {
      return Reflect.get(target, key);
    },
    deleteProperty: function deleteProperty(target, key) {
      return warn(key);
    },
    setPrototypeOf: function setPrototypeOf() {
      throw new Error("Frozen Object is read only.");
    },
    defineProperty: function defineProperty(target, key) {
      return warn(key);
    }
  });
}
//# sourceMappingURL=freeze.js.map
