"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntilEqual = waitUntilEqual;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.date.now");

function isTimeOut(startTime, timeoutInSeconds) {
  return Date.now() - startTime > timeoutInSeconds * 1000;
}

function waitUntilEqual(source, checkItem, expect, timeoutInSeconds) {
  var retryTtl = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 500;
  var startTime = Date.now();
  return new Promise(function (resolve) {
    var timer = setInterval(function () {
      try {
        var checkValue = source();

        if (checkValue === expect) {
          clearInterval(timer);
          resolve(true);
          return;
        }
      } catch (e) {
        console.error(e);
      }

      if (isTimeOut(startTime, timeoutInSeconds)) {
        clearInterval(timer);
        resolve(false);
        console.error("Timeout wait for ".concat(checkItem, "  to be ").concat(expect));
      }
    }, retryTtl);
  });
}
//# sourceMappingURL=WaitUtil.js.map
