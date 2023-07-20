"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ensureExist;
function ensureExist(module, moduleName) {
  if (!module) {
    throw new Error("'".concat(moduleName, "' is a required dependency for '").concat(this.constructor.name, "'"));
  }
  return module;
}
//# sourceMappingURL=ensureExist.js.map
