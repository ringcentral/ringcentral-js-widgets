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
exports.readAudioFile = exports.isWav = exports.isMp3 = exports.isAudioFile = exports.fileToArrayBuffer = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array-buffer.constructor.js");
require("core-js/modules/es.array-buffer.slice.js");
require("core-js/modules/es.data-view.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.typed-array.uint8-array.js");
require("core-js/modules/es.typed-array.copy-within.js");
require("core-js/modules/es.typed-array.every.js");
require("core-js/modules/es.typed-array.fill.js");
require("core-js/modules/es.typed-array.filter.js");
require("core-js/modules/es.typed-array.find.js");
require("core-js/modules/es.typed-array.find-index.js");
require("core-js/modules/es.typed-array.for-each.js");
require("core-js/modules/es.typed-array.includes.js");
require("core-js/modules/es.typed-array.index-of.js");
require("core-js/modules/es.typed-array.iterator.js");
require("core-js/modules/es.typed-array.join.js");
require("core-js/modules/es.typed-array.last-index-of.js");
require("core-js/modules/es.typed-array.map.js");
require("core-js/modules/es.typed-array.reduce.js");
require("core-js/modules/es.typed-array.reduce-right.js");
require("core-js/modules/es.typed-array.reverse.js");
require("core-js/modules/es.typed-array.set.js");
require("core-js/modules/es.typed-array.slice.js");
require("core-js/modules/es.typed-array.some.js");
require("core-js/modules/es.typed-array.sort.js");
require("core-js/modules/es.typed-array.subarray.js");
require("core-js/modules/es.typed-array.to-locale-string.js");
require("core-js/modules/es.typed-array.to-string.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var isMp3 = exports.isMp3 = function isMp3(buf) {
  if (!buf || buf.length < 3) {
    return false;
  }
  return buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33 || buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0 || buf[0] === 0x54 && buf[1] === 0x41 && buf[2] === 0x47;
};
var isWav = exports.isWav = function isWav(buf) {
  if (!buf || buf.length < 12) {
    return false;
  }
  return buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70 && buf[8] === 87 && buf[9] === 65 && buf[10] === 86 && buf[11] === 69;
};
var fileToArrayBuffer = exports.fileToArrayBuffer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(file) {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          return _context.a(2, new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (event) {
              var _event$target;
              if (((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.result) instanceof ArrayBuffer) {
                resolve(event.target.result);
              } else {
                reject(new Error('Failed to convert file to ArrayBuffer.'));
              }
            };
            reader.onerror = function (event) {
              var _event$target2;
              reject(new Error('Error reading file: ' + ((_event$target2 = event.target) === null || _event$target2 === void 0 ? void 0 : _event$target2.error)));
            };
            reader.readAsArrayBuffer(file);
          }));
      }
    }, _callee);
  }));
  return function fileToArrayBuffer(_x) {
    return _ref.apply(this, arguments);
  };
}();
var isAudioFile = exports.isAudioFile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(file) {
    var arrayBuffer, signature;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return fileToArrayBuffer(file);
        case 1:
          arrayBuffer = _context2.v;
          signature = new Uint8Array(arrayBuffer);
          return _context2.a(2, isMp3(signature) || isWav(signature));
      }
    }, _callee2);
  }));
  return function isAudioFile(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var readAudioFile = exports.readAudioFile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(file) {
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          return _context3.a(2, new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () {
              resolve({
                fileName: file.name,
                dataUrl: reader.result
              });
            };
            reader.onerror = function () {
              reject('upload failed');
            };
            reader.readAsDataURL(file);
          }));
      }
    }, _callee3);
  }));
  return function readAudioFile(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
//# sourceMappingURL=helper.js.map
