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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
