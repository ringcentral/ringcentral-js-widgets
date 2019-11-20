"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = asyncReduce;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

function asyncReduce(fn, acc, collection) {
  var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return regeneratorRuntime.async(function asyncReduce$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          result = acc;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = collection[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 14;
            break;
          }

          item = _step.value;
          _context.next = 10;
          return regeneratorRuntime.awrap(fn(result, item));

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

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
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
  }, null, null, [[4, 16, 20, 28], [21,, 23, 27]]);
}
//# sourceMappingURL=index.js.map
