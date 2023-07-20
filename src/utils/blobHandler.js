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
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function getBlobURL(_x) {
  return _getBlobURL.apply(this, arguments);
}
function _getBlobURL() {
  _getBlobURL = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(imageSrc) {
    var image, imageBlog;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(imageSrc);
          case 2:
            image = _context.sent;
            _context.next = 5;
            return image.blob();
          case 5:
            imageBlog = _context.sent;
            return _context.abrupt("return", URL.createObjectURL(imageBlog));
          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getBlobURL.apply(this, arguments);
}
//# sourceMappingURL=blobHandler.js.map
