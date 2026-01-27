"use strict";

require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiErrorIgnorer = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _loggerV = require("@ringcentral-integration/core/lib/logger/loggerV2");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
// https://sentry.io/answers/react-resizeobserver-loop-completed-with-undelivered-notifications/
// https://github.com/petyosi/react-virtuoso/issues/1039
var uiErrorIgnorer = exports.uiErrorIgnorer = function uiErrorIgnorer() {
  (0, _rxjs.fromEvent)(window, 'error', {
    capture: true
  }).pipe((0, _rxjs.filter)(function (event) {
    return _loggerV.consoleIgnoreRule.some(function (msg) {
      return (
        // to ensure the error message is a string
        typeof event.message === 'string' && event.message.includes(msg)
      );
    });
  }), (0, _rxjs.tap)(function (event) {
    return event.stopImmediatePropagation();
  }), _nextCore.takeUntilAppDestroy).subscribe();
};
//# sourceMappingURL=uiErrorIgnorer.js.map
