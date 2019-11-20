"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var sliceExecute = function sliceExecute(_ref) {
  var array, threshold, handler, index, loop;
  return regeneratorRuntime.async(function sliceExecute$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          array = _ref.array, threshold = _ref.threshold, handler = _ref.handler;
          index = 0;

          loop = function loop() {
            var items, result;
            return regeneratorRuntime.async(function loop$(_context) {
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
                    return regeneratorRuntime.awrap(handler(items));

                  case 5:
                    result = _context.sent;

                    if (!(result !== false)) {
                      _context.next = 9;
                      break;
                    }

                    _context.next = 9;
                    return regeneratorRuntime.awrap(loop());

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          _context2.next = 5;
          return regeneratorRuntime.awrap(loop());

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var _default = sliceExecute;
exports["default"] = _default;
//# sourceMappingURL=sliceExecute.js.map
