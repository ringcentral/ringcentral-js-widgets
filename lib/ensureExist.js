"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ensureExist;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.function.name.js");
function ensureExist(module, moduleName) {
  if (!module) {
    throw new Error(// @ts-expect-error TS(2731): Implicit conversion of a 'symbol' to a 'string' wi... Remove this comment to see the full error message
    "'".concat(moduleName, "' is a required dependency for '").concat(this.constructor.name, "'"));
  }
  return module;
}
//# sourceMappingURL=ensureExist.js.map
