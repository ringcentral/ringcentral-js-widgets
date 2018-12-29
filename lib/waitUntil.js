'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntil = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var waitUntil = exports.waitUntil = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fn) {
    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var waitTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
    var t;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            t = 0;

          case 1:
            if (!(t < waitTime && !fn())) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return (0, _sleep2.default)(interval);

          case 4:
            t += interval;
            _context.next = 1;
            break;

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function waitUntil(_x3) {
    return _ref.apply(this, arguments);
  };
}();

var _sleep = require('./sleep');

var _sleep2 = _interopRequireDefault(_sleep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=waitUntil.js.map
