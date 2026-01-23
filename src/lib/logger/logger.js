"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConsoleLogger = exports.loggerInstance = exports.logger = exports.createLogger = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */

var defaultConsoleLogger = function defaultConsoleLogger(key) {
  return function () {
    var _ref;
    (_ref = console)[key].apply(_ref, arguments);
  };
};
var loggerInstance = exports.loggerInstance = {
  fn: defaultConsoleLogger
};

/**
 * when you want to use buffer logger, call this function at entry file to accumulate logs from all modules
 */
var useConsoleLogger = exports.useConsoleLogger = function useConsoleLogger() {
  loggerInstance.fn = defaultConsoleLogger;
};
var createLogger = exports.createLogger = function createLogger() {
  return new Proxy({}, {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get: function get(target, key, receiver) {
      return loggerInstance.fn(key);
    }
  });
};
var logger = exports.logger = createLogger();
//# sourceMappingURL=logger.js.map
