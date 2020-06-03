"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntilNotNull = waitUntilNotNull;
exports.waitUntilEqual = waitUntilEqual;
exports.waitUntilObjectSizeGreaterThan = waitUntilObjectSizeGreaterThan;
exports.waitInSeconds = waitInSeconds;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.date.now");

function isTimeOut(startTime, timeoutInSeconds) {
  return Date.now() - startTime > timeoutInSeconds * 1000;
}

function waitUntilNotNull(source, checkItem, timeoutInSeconds) {
  var startTime = Date.now();
  return new Promise(function (resolve) {
    var timer = setInterval(function () {
      try {
        var checkValue = source();

        if (checkValue !== null && checkValue !== undefined) {
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
        console.error("Timeout wait for ".concat(checkItem, "  to be not null"));
      }
    }, 500);
  });
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

function waitUntilObjectSizeGreaterThan(source, checkItem, compareSize, timeoutInSeconds) {
  var startTime = Date.now();
  return new Promise(function (resolve) {
    var timer = setInterval(function () {
      if (isTimeOut(startTime, timeoutInSeconds)) {
        clearInterval(timer);
        resolve(false);
        console.log("Timeout wait for ".concat(checkItem, " to be not null"));
      }

      try {
        var checkValue = source();

        if (checkValue !== null && checkValue.length > compareSize) {
          clearInterval(timer);
          resolve(true);
        }
      } catch (e) {
        console.log(e);
      }
    }, 500);
  });
}

function waitInSeconds(seconds) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(null);
    }, seconds * 1000);
  });
}
//# sourceMappingURL=WaitUtil.js.map
