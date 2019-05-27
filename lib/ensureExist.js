"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ensureExist;

require("core-js/modules/es6.function.name");

function ensureExist(module, moduleName) {
  if (!module) {
    throw new Error("'".concat(moduleName, "' is a required dependency for '").concat(this.constructor.name, "'"));
  }

  return module;
}
//# sourceMappingURL=ensureExist.js.map
