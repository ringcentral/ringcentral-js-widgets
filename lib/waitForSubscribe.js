"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForSubscribe = void 0;
require("regenerator-runtime/runtime");
var _utils = require("../utils");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * @deprecated
 *
 * TODO: should find way to wait subscribe event correctly
 */
var waitForSubscribe = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.sleep)(2.5 * 1000);
          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function waitForSubscribe() {
    return _ref.apply(this, arguments);
  };
}();
exports.waitForSubscribe = waitForSubscribe;
//# sourceMappingURL=waitForSubscribe.js.map
