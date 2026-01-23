"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMethod = void 0;
require("core-js/modules/es.array.concat.js");
var applyMethod = exports.applyMethod = function applyMethod(module, options) {
  if (!module) {
    throw new Error("The module '".concat(options.module, "' is not a multiple instances injected module, and it does not exist."));
  }
  var method = module[options.method];
  if (typeof method !== 'function') {
    throw new Error("The '".concat(options.method, "' method for module '").concat(options.module, "' does not exist."));
  }
  return method.apply(module, options.args);
};
//# sourceMappingURL=applyMethod.js.map
