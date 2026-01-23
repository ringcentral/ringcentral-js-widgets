"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tapWhen = tapWhen;
var _rxjs = require("rxjs");
/**
 * tap do something when `evaluateFn` be trusty
 */
function tapWhen(tapFn, evaluateFn) {
  return function (source$) {
    return source$.pipe((0, _rxjs.concatMap)(function (value, index) {
      if (evaluateFn(index, value)) {
        tapFn(value);
      }
      return (0, _rxjs.of)(value);
    }));
  };
}
//# sourceMappingURL=tapWhen.js.map
