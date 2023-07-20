"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForSubscribe = void 0;
require("regenerator-runtime/runtime");
var _utils = require("../utils");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
