"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.splice");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = concurrentExecute;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/utils");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// type all<T extends readonly unknown[] | []>(values: T): ;
/**
 * Provide you to control the concurrency and delay of your `Promise.all` execution.
 * @param options Specify your own delay function and custom promise instance
 *
 * @example
 * ```
 * const result = await concurrentExecute(
 *   [
 *     () => Promise.resolve('123' as const),
 *     () => Promise.resolve(1),
 *     () => Promise.resolve('456'),
 *     () => Promise.resolve(2),
 *     () => Promise.resolve('789'),
 *   ],
 *   2, // in that example that will split into 3 `Promise.all` executions, run each thunk one by one
 *   {
 *      delay: 100, // that will be delay 100ms between each thunk `Promise.all` execution
 *   }
 * );
 *
 * console.log(a); // [ '123', 1, '456', 2, '789' ]
 * ```
 */
function concurrentExecute(_x, _x2) {
  return _concurrentExecute.apply(this, arguments);
}
function _concurrentExecute() {
  _concurrentExecute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(
  /**
   * A set of thunk functions of Promise
   */
  promiseFnThunks,
  /**
   * concurrency Concurrent granularity
   */
  concurrency) {
    var options,
      delay,
      totalThunk,
      finalResults,
      _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
            delay = options.delay;
            if (!(!Array.isArray(promiseFnThunks) || promiseFnThunks.length <= 0)) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", []);
          case 4:
            if (!(process.env.NODE_ENV !== 'production' && typeof promiseFnThunks[0] !== 'function')) {
              _context2.next = 6;
              break;
            }
            throw new Error('concurrentExecute needs promise thunk');
          case 6:
            totalThunk = promiseFnThunks.length;
            finalResults = [];
            _context2.next = 10;
            return (0, _utils.polling)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var promiseFnThunksBatch, result;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      promiseFnThunksBatch = promiseFnThunks.splice(0, concurrency); // TODO: should switch to Promise.allSettled
                      // TODO: if any one error, should still keep all the results and output error items
                      _context.next = 3;
                      return Promise.all(promiseFnThunksBatch.map(function (promiseFnThunk) {
                        return promiseFnThunk();
                      }));
                    case 3:
                      result = _context.sent;
                      finalResults = [].concat(_toConsumableArray(finalResults), _toConsumableArray(result));
                      totalThunk -= result.length;

                      // when all thunks are executed, leave polling
                      return _context.abrupt("return", totalThunk <= 0);
                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })), delay);
          case 10:
            return _context2.abrupt("return", finalResults);
          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _concurrentExecute.apply(this, arguments);
}
//# sourceMappingURL=index.js.map
