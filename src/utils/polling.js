"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polling = void 0;
require("regenerator-runtime/runtime");
var _sleep = require("./sleep");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // import { jestFakeTimersAreEnabled } from '@ringcentral-integration/test-utils/lib/jestFakeTimersAreEnabled';
/**
 * polling execute function, that will be executed until it returns `true`
 * @param fn polling function
 * @param interval interval time in milliseconds, when you not provide it, that will ignore any delay between each execution
 *
 * @example
 * ```ts
 * let count = 5;
 *
 * const pollingPromise = polling(() => {
 *  count++;
 *
 *  return count >= 5;
 * }, 1000);
 *
 * pollingPromise
 *   .then(() => {
 *     console.log('polling done');
 *   })
 *   .catch(() => {
 *     console.log('polling canceled');
 *   }
 *
 * const onClick = () => {
 *   pollingPromise.cancel();
 * }
 * ```
 */
var polling = function polling(fn, interval) {
  if (process.env.NODE_ENV !== 'production' && typeof fn !== 'function') {
    throw new Error("'fn' must be a function");
  }
  var finished = false;
  var sleepPromise;

  // eslint-disable-next-line no-async-promise-executor
  var promise = new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (finished) {
                _context.next = 17;
                break;
              }
              _context.next = 3;
              return fn();
            case 3:
              result = _context.sent;
              // check that still not finished, because user may cancel in that fn execution period
              if (!finished) {
                finished = result;
              }
              if (!(!finished && typeof interval === 'number' && interval >= 0)) {
                _context.next = 15;
                break;
              }
              sleepPromise = (0, _sleep.sleep)(interval);
              _context.prev = 7;
              _context.next = 10;
              return sleepPromise;
            case 10:
              _context.next = 15;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](7);
              reject(new Error('Async Polling has been cancelled'));
            case 15:
              _context.next = 0;
              break;
            case 17:
              resolve();
            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 12]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  promise.cancel = function () {
    var _sleepPromise;
    (_sleepPromise = sleepPromise) === null || _sleepPromise === void 0 ? void 0 : _sleepPromise.cancel();
    finished = true;
  };
  return promise;
};
exports.polling = polling;
//# sourceMappingURL=polling.js.map
