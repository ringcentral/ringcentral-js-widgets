"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
