"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

/**
 * sleep for ms
 * @param ms what ms to sleep
 */
var sleep = function sleep(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
};

exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map
