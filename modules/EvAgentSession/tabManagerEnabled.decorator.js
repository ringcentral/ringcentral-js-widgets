"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabManagerEnabled = tabManagerEnabled;

function tabManagerEnabled() {
  return function (target, key, descriptor) {
    var originalMethod = descriptor.value;

    descriptor.value = function () {
      if (this.tabManagerEnabled) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}
//# sourceMappingURL=tabManagerEnabled.decorator.js.map
