"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugLog = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var _rxjs = require("rxjs");
/* eslint-disable no-console */

/**
 * Log all event observable events to console
 */
var debugLog = exports.debugLog = function debugLog() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['complete', 'next', 'error'];
  return function (source) {
    return new _rxjs.Observable(function (observer) {
      var prefix = message ? "\uD83D\uDC1E [".concat(message, "]") : '🐞';
      return source.subscribe({
        next: function next(x) {
          if (mode.includes('next')) console.log(prefix, x);
          observer.next(x);
        },
        error: function error(_error) {
          if (mode.includes('error')) console.log("".concat(prefix, " error"), _error);
          observer.error(_error);
        },
        complete: function complete() {
          if (mode.includes('complete')) console.log("".concat(prefix, " complete"));
          observer.complete();
        }
      });
    });
  };
};
//# sourceMappingURL=debugLog.js.map
