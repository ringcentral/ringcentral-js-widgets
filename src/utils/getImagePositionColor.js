"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImagePositionColorWithCache = exports.getImagePositionColor = exports.clearImagePositionColorCache = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.date.to-iso-string.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _memoize = _interopRequireDefault(require("lodash/memoize"));
var _loadImage = require("./loadImage");
var _rgbToHex = require("./rgbToHex");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
var getImagePositionColor = exports.getImagePositionColor = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url, position) {
    var _position$x, _position$y, img, canvas, ctx, p, hex, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return (0, _loadImage.loadImage)(url);
        case 1:
          img = _context.v;
          canvas = document.createElement('canvas');
          ctx = canvas.getContext('2d');
          canvas.width = 300;
          canvas.height = 300;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          p = ctx.getImageData((_position$x = position === null || position === void 0 ? void 0 : position.x) !== null && _position$x !== void 0 ? _position$x : 0, (_position$y = position === null || position === void 0 ? void 0 : position.y) !== null && _position$y !== void 0 ? _position$y : 150,
          // canvas.height / 2,
          1, 1).data;
          hex = (0, _rgbToHex.rgbToHex)(p[0], p[1], p[2]);
          canvas.remove();
          img.remove();
          return _context.a(2, hex);
        case 2:
          _context.p = 2;
          _t = _context.v;
          return _context.a(2, '#FFF');
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function getImagePositionColor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * same as `getImagePositionColor` but with cache based on url and position in one day
 */
var getImagePositionColorWithCache = exports.getImagePositionColorWithCache = (0, _memoize["default"])(getImagePositionColor, function (url, position) {
  var _position$x2, _position$y2;
  return "".concat(url, "_").concat((_position$x2 = position === null || position === void 0 ? void 0 : position.x) !== null && _position$x2 !== void 0 ? _position$x2 : 0, "_").concat((_position$y2 = position === null || position === void 0 ? void 0 : position.y) !== null && _position$y2 !== void 0 ? _position$y2 : 150, "_").concat(new Date().toISOString().split('T')[0]);
});

/**
 * clear cache of `getImagePositionColorWithCache`
 */
var clearImagePositionColorCache = exports.clearImagePositionColorCache = function clearImagePositionColorCache() {
  var _getImagePositionColo, _getImagePositionColo2;
  (_getImagePositionColo = (_getImagePositionColo2 = getImagePositionColorWithCache.cache).clear) === null || _getImagePositionColo === void 0 ? void 0 : _getImagePositionColo.call(_getImagePositionColo2);
};
//# sourceMappingURL=getImagePositionColor.js.map
