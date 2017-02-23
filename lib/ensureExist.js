"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureExist;
function ensureExist(module, moduleName) {
  if (!module) {
    throw new Error("'" + moduleName + "' is a required dependency for '" + this.constructor.name + "'");
  }
  return module;
}
//# sourceMappingURL=ensureExist.js.map
