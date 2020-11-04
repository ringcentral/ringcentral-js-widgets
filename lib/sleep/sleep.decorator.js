"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sleep = Sleep;

function Sleep() {
  var milliseconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return function (target, key, descriptor) {
    var originalMethod = descriptor.value;

    descriptor.value = function () {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      setTimeout(function () {
        originalMethod.apply(_this, args);
      }, milliseconds);
    };

    return descriptor;
  };
}
//# sourceMappingURL=sleep.decorator.js.map
