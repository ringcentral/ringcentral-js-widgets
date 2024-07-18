"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImagePositionColor = void 0;
require("regenerator-runtime/runtime");
var _loadImage = require("./loadImage");
var _rgbToHex = require("./rgbToHex");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * get image position color by url
 * @param url image url
 * @param position that color of position of the image in relative of `300x300`, by default is `left-center(0, 150)` of the image
 * @returns color hex
 *
 * ### Remember the url should be same origin or allow fetch the source image
 */
var getImagePositionColor = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, position) {
    var _position$x, _position$y, img, canvas, ctx, p, hex;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _loadImage.loadImage)(url);
          case 3:
            img = _context.sent;
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            canvas.width = 300;
            canvas.height = 300;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            p = ctx.getImageData((_position$x = position === null || position === void 0 ? void 0 : position.x) !== null && _position$x !== void 0 ? _position$x : 0, (_position$y = position === null || position === void 0 ? void 0 : position.y) !== null && _position$y !== void 0 ? _position$y : canvas.height / 2, 1, 1).data;
            hex = (0, _rgbToHex.rgbToHex)(p[0], p[1], p[2]);
            canvas.remove();
            img.remove();
            return _context.abrupt("return", hex);
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", '#FFF');
          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function getImagePositionColor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getImagePositionColor = getImagePositionColor;
//# sourceMappingURL=getImagePositionColor.js.map
