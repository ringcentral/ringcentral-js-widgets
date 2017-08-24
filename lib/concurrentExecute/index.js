'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise2 = require('babel-runtime/core-js/promise');

var _promise3 = _interopRequireDefault(_promise2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sleep = function sleep(t) {
  return new _promise3.default(function (resolve) {
    setTimeout(function () {
      return resolve();
    }, t);
  });
};

/**
 * With concurrentExecute helper function, you could control
 * the concurrency and delay of your Promise.all execution.
 * @param {Array<Function>} promiseThunks A set of thunk functions of Promise
 * @param {Number} concurrency Concurrent granularity
 * @param {Number} delay Batch execution delay
 * @param {Function} delayFn Specify your own delay function
 */

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(promiseThunks, concurrency, delay) {
    var _this = this;

    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var _options$promise, promise, _options$delayFn, delayFn, current, rest;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _options$promise = options.promise, promise = _options$promise === undefined ? _promise3.default : _options$promise, _options$delayFn = options.delayFn, delayFn = _options$delayFn === undefined ? sleep : _options$delayFn;

            if (!(!Array.isArray(promiseThunks) || promiseThunks.length <= 0)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', []);

          case 3:
            if (!(typeof promiseThunks[0] !== 'function')) {
              _context.next = 5;
              break;
            }

            throw new Error('concurrentExecute needs promise thunk');

          case 5:
            if (!(promiseThunks.length <= concurrency)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', promise.all(promiseThunks.map(function (_promise) {
              return _promise.apply(_this);
            })));

          case 7:
            _context.next = 9;
            return concurrentExecute(promiseThunks.slice(0, concurrency), concurrency, delay, options);

          case 9:
            current = _context.sent;

            if (!delay) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return delayFn(delay);

          case 13:
            _context.next = 15;
            return concurrentExecute(promiseThunks.slice(concurrency), concurrency, delay, options);

          case 15:
            rest = _context.sent;
            return _context.abrupt('return', [].concat((0, _toConsumableArray3.default)(current), (0, _toConsumableArray3.default)(rest)));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function concurrentExecute(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return concurrentExecute;
}();
//# sourceMappingURL=index.js.map
