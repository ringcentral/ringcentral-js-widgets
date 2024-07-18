"use strict";

require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntil = void 0;
require("regenerator-runtime/runtime");
var _polling = require("./polling");
var _sleep = require("./sleep");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Polling check `fn` result until `fn` return `true`
 *
 * throw error when timeout
 */
var waitUntil = function waitUntil(fn) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$interval = _ref.interval,
    interval = _ref$interval === void 0 ? 100 : _ref$interval,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 5000 : _ref$timeout;
  var timeoutPromise = (0, _sleep.sleep)(timeout);
  var poolingPromise = (0, _polling.polling)(fn, interval);
  var rejector;
  var clearTimers = function clearTimers() {
    timeoutPromise.cancel();
    poolingPromise.cancel();
  };

  // eslint-disable-next-line no-async-promise-executor
  var promise = new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              rejector = reject;
              _context.next = 3;
              return Promise.race([poolingPromise, timeoutPromise.then(function () {
                reject(new Error("".concat(timeout, " ms timeout error")));
              })])
              // TODO: use then and catch for support old browser, that can be remove after we no longer need support that.
              .then(clearTimers)["catch"](clearTimers);
            case 3:
              resolve();
            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  promise.cancel = function () {
    rejector(new Error('Async waitUntil has been cancelled'));
    clearTimers();
  };
  return promise;
};
exports.waitUntil = waitUntil;
//# sourceMappingURL=waitUntil.js.map
