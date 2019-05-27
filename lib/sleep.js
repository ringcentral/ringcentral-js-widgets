"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sleep;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

function sleep() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
//# sourceMappingURL=sleep.js.map
