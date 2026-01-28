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
exports.fileUrlToBase64 = void 0;
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var _rxjs = require("rxjs");
var _base64Handler = require("./base64Handler");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _currC2dLogo = {};
function _fileUrlToBase64(_x) {
  return _fileUrlToBase.apply(this, arguments);
}
/**
 * Converts a file URL to a base64 string.
 *
 * by default this method will auto cache the base64 string,
 * @param c2dLogo - The file URL to convert.
 * @param force - (Optional) If set to true, forces fetching the image again instead of using the cached base64 string.
 * @returns A Promise that resolves to the base64 string representation of the file.
 */
function _fileUrlToBase() {
  _fileUrlToBase = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(c2dLogo) {
    var image, imageBlog, base64URL;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return fetch(c2dLogo);
        case 1:
          image = _context2.v;
          _context2.n = 2;
          return image.blob();
        case 2:
          imageBlog = _context2.v;
          _context2.n = 3;
          return (0, _base64Handler.fileToBase64)(imageBlog);
        case 3:
          base64URL = _context2.v;
          return _context2.a(2, base64URL);
      }
    }, _callee2);
  }));
  return _fileUrlToBase.apply(this, arguments);
}
var fileUrlToBase64 = exports.fileUrlToBase64 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(c2dLogo) {
    var force,
      cache,
      url$,
      _args = arguments;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          force = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
          cache = _currC2dLogo[c2dLogo];
          if (!(!force && cache)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, (0, _rxjs.firstValueFrom)(cache));
        case 1:
          url$ = (0, _rxjs.from)(_fileUrlToBase64(c2dLogo)).pipe(
          // save the base64 string to cache for share all same url request
          (0, _rxjs.shareReplay)(1), (0, _rxjs.catchError)(function (error) {
            // when fetch failed, remove the cache, let outside to handle the error and can refetch again
            delete _currC2dLogo[c2dLogo];
            throw error;
          }));
          _currC2dLogo[c2dLogo] = url$;
          return _context.a(2, (0, _rxjs.firstValueFrom)(url$));
      }
    }, _callee);
  }));
  return function fileUrlToBase64(_x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=fileUrlToBase64.js.map
