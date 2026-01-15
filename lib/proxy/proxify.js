"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.proxify = proxify;
require("core-js/modules/es.array.concat.js");
// @ts-nocheck
function proxify(prototype, property, descriptor) {
  var configurable = descriptor.configurable,
    enumerable = descriptor.enumerable,
    value = descriptor.value;
  function proxyFn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (!this._transport) {
      return value.call.apply(value, [this].concat(args));
    }
    var functionPath = "".concat(this.modulePath, ".").concat(property);
    return this._transport.request({
      payload: {
        type: this._proxyActionTypes.execute,
        functionPath: functionPath,
        args: args
      }
    });
  }
  return {
    configurable: configurable,
    enumerable: enumerable,
    value: proxyFn
  };
}
var _default = exports["default"] = proxify;
//# sourceMappingURL=proxify.js.map
