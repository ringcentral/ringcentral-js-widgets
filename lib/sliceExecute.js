"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var sliceExecute = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
    var array, threshold, handler, index, loop;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            array = _ref.array, threshold = _ref.threshold, handler = _ref.handler;
            index = 0;
            loop = /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var items, result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
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
                }, _callee);
              }));
              return function loop() {
                return _ref3.apply(this, arguments);
              };
            }();
            _context2.next = 5;
            return loop();
          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function sliceExecute(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = sliceExecute;
exports["default"] = _default;
//# sourceMappingURL=sliceExecute.js.map
