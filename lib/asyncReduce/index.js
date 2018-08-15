"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fn, acc, collection) {
    var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = acc;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = (0, _getIterator3.default)(collection);

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 14;
              break;
            }

            item = _step.value;
            _context.next = 10;
            return fn(result, item);

          case 10:
            result = _context.sent;

          case 11:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 14:
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 20:
            _context.prev = 20;
            _context.prev = 21;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 23:
            _context.prev = 23;

            if (!_didIteratorError) {
              _context.next = 26;
              break;
            }

            throw _iteratorError;

          case 26:
            return _context.finish(23);

          case 27:
            return _context.finish(20);

          case 28:
            return _context.abrupt("return", result);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 16, 20, 28], [21,, 23, 27]]);
  }));

  function asyncReduce(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return asyncReduce;
}();
//# sourceMappingURL=index.js.map
