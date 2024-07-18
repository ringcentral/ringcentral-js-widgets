"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCopy = void 0;
require("regenerator-runtime/runtime");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var copyWithCommand = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(copiedText) {
    var tempNode, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tempNode = document.createElement('textarea');
            tempNode.style.position = 'fixed';
            tempNode.style.top = '-9999px';
            tempNode.value = copiedText;
            document.body.appendChild(tempNode);
            tempNode.focus();
            tempNode.select();
            result = document.execCommand('copy');
            document.body.removeChild(tempNode);
            if (result) {
              _context.next = 11;
              break;
            }
            throw new Error();
          case 11:
            return _context.abrupt("return", true);
          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function copyWithCommand(_x) {
    return _ref.apply(this, arguments);
  };
}();
var handleCopy = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(copiedText) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return navigator.clipboard.writeText(copiedText);
          case 3:
            return _context2.abrupt("return", true);
          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", copyWithCommand(copiedText));
          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return function handleCopy(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.handleCopy = handleCopy;
//# sourceMappingURL=handleCopy.js.map
