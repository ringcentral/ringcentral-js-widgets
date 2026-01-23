"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectable = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.function.name.js");
var _reactantShare = require("reactant-share");
/* eslint-disable @typescript-eslint/no-explicit-any */

var injectable = exports.injectable = process.env.NODE_ENV !== 'production' ? function (options) {
  var decorate = (0, _reactantShare.injectable)(options);
  return function (target) {
    if (!(options === null || options === void 0 ? void 0 : options.name)) {
      throw new Error("@injectable() in module ".concat(target, " must have a module name"));
    }
    if (options.name !== target.name) {
      console.warn("@injectable(options) module options.name must be '".concat(target.name, "', please use @injectable({ name: '").concat(target.name, "' })"));
    }
    return decorate(target);
  };
} : _reactantShare.injectable;
//# sourceMappingURL=injectable.js.map
