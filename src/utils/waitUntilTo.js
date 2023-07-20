"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntilTo = void 0;
require("regenerator-runtime/runtime");
var _waitUntil = require("./waitUntil");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * like `waitUntil`, but polling check `fn` execute without throw error,
 * and throw latest error when timeout.
 *
 * @returns `callback` result when callback execute completed.
 */
var waitUntilTo = function waitUntilTo(fn) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$interval = _ref.interval,
    interval = _ref$interval === void 0 ? 100 : _ref$interval,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 5000 : _ref$timeout;
  var rejector;
  var waitUntilPromise;

  // eslint-disable-next-line no-async-promise-executor
  var promise = new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var lastError, callback;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              rejector = reject;
              callback = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var result;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return fn();
                        case 3:
                          result = _context.sent;
                          resolve(result);
                          return _context.abrupt("return", true);
                        case 8:
                          _context.prev = 8;
                          _context.t0 = _context["catch"](0);
                          lastError = _context.t0;
                          return _context.abrupt("return", false);
                        case 12:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[0, 8]]);
                }));
                return function callback() {
                  return _ref3.apply(this, arguments);
                };
              }();
              waitUntilPromise = (0, _waitUntil.waitUntil)(callback, {
                interval: interval,
                timeout: timeout
              });
              _context2.prev = 3;
              _context2.next = 6;
              return waitUntilPromise;
            case 6:
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](3);
              reject(lastError);
            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 8]]);
    }));
    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  promise.cancel = function () {
    rejector(new Error('Async waitUntilTo has been cancelled'));
    waitUntilPromise.cancel();
  };
  return promise;
};
exports.waitUntilTo = waitUntilTo;
//# sourceMappingURL=waitUntilTo.js.map
