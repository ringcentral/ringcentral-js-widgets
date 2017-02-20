"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sliceExecute = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref2) {
    var array = _ref2.array,
        threshold = _ref2.threshold,
        handler = _ref2.handler;
    var index, loop;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            index = 0;

            loop = function () {
              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var items, result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        items = array.slice(index, index + threshold);

                        index += threshold;

                        if (!items.length) {
                          _context.next = 9;
                          break;
                        }

                        _context.next = 5;
                        return handler(items);

                      case 5:
                        result = _context.sent;

                        if (!(result !== false)) {
                          _context.next = 9;
                          break;
                        }

                        _context.next = 9;
                        return loop();

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function loop() {
                return _ref3.apply(this, arguments);
              };
            }();

            _context2.next = 4;
            return loop();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function sliceExecute(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = sliceExecute;
//# sourceMappingURL=sliceExecute.js.map
