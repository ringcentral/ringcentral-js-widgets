"use strict";

require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.url");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlobURL = getBlobURL;
require("regenerator-runtime/runtime");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function getBlobURL(_x) {
  return _getBlobURL.apply(this, arguments);
}
function _getBlobURL() {
  _getBlobURL = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fileSrc) {
    var response, blob;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(fileSrc);
          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.blob();
          case 5:
            blob = _context.sent;
            return _context.abrupt("return", URL.createObjectURL(blob));
          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getBlobURL.apply(this, arguments);
}
//# sourceMappingURL=getBlobURL.js.map
