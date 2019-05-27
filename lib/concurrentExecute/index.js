"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = concurrentExecute;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.is-array");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _sleep = _interopRequireDefault(require("../sleep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * With concurrentExecute helper function, you could control
 * the concurrency and delay of your Promise.all execution.
 * @param {Array<Function>} promiseThunks A set of thunk functions of Promise
 * @param {Number} concurrency Concurrent granularity
 * @param {Number} delay Batch execution delay
 * @param {Function} delayFn Specify your own delay function
 */
function concurrentExecute(_x, _x2, _x3) {
  return _concurrentExecute.apply(this, arguments);
}

function _concurrentExecute() {
  _concurrentExecute = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(promiseThunks, concurrency, delay) {
    var _this = this;

    var options,
        _options$promise,
        promise,
        _options$delayFn,
        delayFn,
        current,
        rest,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
            _options$promise = options.promise, promise = _options$promise === void 0 ? Promise : _options$promise, _options$delayFn = options.delayFn, delayFn = _options$delayFn === void 0 ? _sleep["default"] : _options$delayFn;

            if (!(!Array.isArray(promiseThunks) || promiseThunks.length <= 0)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", []);

          case 4:
            if (!(typeof promiseThunks[0] !== 'function')) {
              _context.next = 6;
              break;
            }

            throw new Error('concurrentExecute needs promise thunk');

          case 6:
            if (!(promiseThunks.length <= concurrency)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", promise.all(promiseThunks.map(function (_promise) {
              return _promise.apply(_this);
            })));

          case 8:
            _context.next = 10;
            return concurrentExecute(promiseThunks.slice(0, concurrency), concurrency, delay, options);

          case 10:
            current = _context.sent;

            if (!delay) {
              _context.next = 14;
              break;
            }

            _context.next = 14;
            return delayFn(delay);

          case 14:
            _context.next = 16;
            return concurrentExecute(promiseThunks.slice(concurrency), concurrency, delay, options);

          case 16:
            rest = _context.sent;
            return _context.abrupt("return", [].concat(_toConsumableArray(current), _toConsumableArray(rest)));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _concurrentExecute.apply(this, arguments);
}
//# sourceMappingURL=index.js.map
