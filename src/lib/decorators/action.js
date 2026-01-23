"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.now.js");
var _reactantShare = require("reactant-share");
/* eslint-disable @typescript-eslint/no-explicit-any */

var action = exports.action = process.env.NODE_ENV === 'development' ? function (target, key, descriptor) {
  // in development mode, check the action call frequency
  var originalMethod = descriptor.value;
  if (typeof originalMethod !== 'function') {
    throw new Error("".concat(String(key), " can only be decorated by '@action' as a class method."));
  }
  var count = 100;
  var time = Date.now();
  descriptor.value = function () {
    if (count-- === 0) {
      count = 100;
      if (Date.now() - time < 5000) {
        throw new Error("".concat((0, _reactantShare.getRef)(this).identifier, ".").concat(key, " is called too many times"));
      }
      time = Date.now();
    }
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return originalMethod.apply(this, args);
  };
  return (0, _reactantShare.action)(target, key, descriptor);
} : _reactantShare.action;
//# sourceMappingURL=action.js.map
