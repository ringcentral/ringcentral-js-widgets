"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.waitUntilNotNull = waitUntilNotNull;
exports.waitUntilEqual = waitUntilEqual;
exports.waitUntilObjectSizeGreaterThan = waitUntilObjectSizeGreaterThan;
exports.waitInSeconds = waitInSeconds;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isTimeOut(startTime, timeoutInSeconds) {
  return Date.now() - startTime > timeoutInSeconds * 1000;
}

function waitUntilNotNull(source, checkItem, timeoutInSeconds) {
  var startTime = Date.now();
  return new _promise2.default(function (resolve) {
    var timer = setInterval(function () {
      if (isTimeOut(startTime, timeoutInSeconds)) {
        clearInterval(timer);
        resolve(false);
        console.error("Timeout wait for " + checkItem + "  to be not null");
      }
      try {
        var checkValue = source();
        if (checkValue !== null && checkValue !== undefined) {
          clearInterval(timer);
          resolve(true);
        }
      } catch (e) {
        console.error(e);
      }
    }, 500);
  });
}

function waitUntilEqual(source, checkItem, expect, timeoutInSeconds) {
  var startTime = Date.now();
  return new _promise2.default(function (resolve) {
    var timer = setInterval(function () {
      if (isTimeOut(startTime, timeoutInSeconds)) {
        clearInterval(timer);
        resolve(false);
        console.error("Timeout wait for " + checkItem + "  to be " + expect);
      }
      try {
        var checkValue = source();
        if (checkValue === expect) {
          clearInterval(timer);
          resolve(true);
        }
      } catch (e) {
        console.error(e);
      }
    }, 500);
  });
}

function waitUntilObjectSizeGreaterThan(source, checkItem, compareSize, timeoutInSeconds) {
  var startTime = Date.now();
  return new _promise2.default(function (resolve) {
    var timer = setInterval(function () {
      if (isTimeOut(startTime, timeoutInSeconds)) {
        clearInterval(timer);
        resolve(false);
        console.log("Timeout wait for " + checkItem + " to be not null");
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
  return new _promise2.default(function (resolve) {
    setTimeout(function () {
      resolve(null);
    }, seconds * 1000);
  });
}
//# sourceMappingURL=WaitUtil.js.map
