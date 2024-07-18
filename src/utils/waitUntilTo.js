"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntilTo = void 0;
require("regenerator-runtime/runtime");
var _waitUntil = require("./waitUntil");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
  var resolver;
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
              resolver = resolve;
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
              _context2.prev = 4;
              _context2.next = 7;
              return waitUntilPromise;
            case 7:
              _context2.next = 12;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](4);
              reject(lastError);
            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 9]]);
    }));
    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  promise.cancel = function () {
    var disabledThrow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (disabledThrow) {
      resolver(undefined);
    } else {
      rejector(new Error('Async waitUntilTo has been cancelled'));
    }
    waitUntilPromise.cancel();
  };
  return promise;
};
exports.waitUntilTo = waitUntilTo;
//# sourceMappingURL=waitUntilTo.js.map
