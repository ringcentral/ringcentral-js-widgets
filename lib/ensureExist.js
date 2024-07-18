"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ensureExist;
function ensureExist(module, moduleName) {
  if (!module) {
    throw new Error( // @ts-expect-error TS(2731): Implicit conversion of a 'symbol' to a 'string' wi... Remove this comment to see the full error message
    "'".concat(moduleName, "' is a required dependency for '").concat(this.constructor.name, "'"));
  }
  return module;
}
//# sourceMappingURL=ensureExist.js.map
