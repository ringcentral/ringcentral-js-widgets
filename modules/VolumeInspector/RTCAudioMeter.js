"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTCAudioMeter = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array-buffer.constructor.js");
require("core-js/modules/es.array-buffer.slice.js");
require("core-js/modules/es.data-view.js");
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
var _RTCAudioMeter;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable no-console */
var LOG_TAG = '[RTCAudioMeter]';
var kFftSize = 32;
var kMinDecibels = -90;
var kMaxDecibels = -30;
var kSmoothingTimeConstant = 0.0;
var RTCAudioMeter = exports.RTCAudioMeter = /*#__PURE__*/function () {
  function RTCAudioMeter() {
    _classCallCheck(this, RTCAudioMeter);
    this._source = void 0;
    this._analyser = void 0;
    this._data = void 0;
    this._initialize();
  }
  return _createClass(RTCAudioMeter, [{
    key: "_initialize",
    value: function _initialize() {
      var _this = this;
      try {
        RTCAudioMeter._prepareAudioContext();
        if (!RTCAudioMeter._audioCtx) {
          console.warn(LOG_TAG, "initialize fail because audio context is null");
          return;
        }
        var isDuplicateAudioMeter = RTCAudioMeter._audioMeters.find(function (item) {
          return item === _this;
        });
        if (!isDuplicateAudioMeter) {
          RTCAudioMeter._audioMeters.push(this);
          console.info(LOG_TAG, "Add user, length: ".concat(RTCAudioMeter._audioMeters.length));
        }
        this._analyser = RTCAudioMeter._audioCtx.createAnalyser();
        this._analyser.fftSize = kFftSize;
        this._analyser.minDecibels = kMinDecibels;
        this._analyser.maxDecibels = kMaxDecibels;
        this._analyser.smoothingTimeConstant = kSmoothingTimeConstant;
        this._data = new Uint8Array(this._analyser.frequencyBinCount);
        console.info(LOG_TAG, "data length is ".concat(this._data.length, " ").concat(this._data.byteLength));
      } catch (e) {
        console.warn(LOG_TAG, "initialize error: ".concat(e.message));
      }
    }
  }, {
    key: "updateInputStream",
    value: function () {
      var _updateInputStream = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(input) {
        var _RTCAudioMeter$_audio, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              console.info(LOG_TAG, "update input stream");
              if (!(!RTCAudioMeter._audioCtx || !this._analyser)) {
                _context.n = 1;
                break;
              }
              console.info(LOG_TAG, 'There is no audioContext or audioNode');
              return _context.a(2, Promise.reject(new Error('There is no audioContext or audioNode')));
            case 1:
              if (this._source) {
                console.info(LOG_TAG, 'There is an old audio source, disconnect');
                this._source.disconnect();
                delete this._source;
              }
              _context.p = 2;
              if (!(RTCAudioMeter._audioCtx.state === 'suspended')) {
                _context.n = 3;
                break;
              }
              console.info(LOG_TAG, "Try to activate audioContext");
              _context.n = 3;
              return (_RTCAudioMeter$_audio = RTCAudioMeter._audioCtx) === null || _RTCAudioMeter$_audio === void 0 ? void 0 : _RTCAudioMeter$_audio.resume();
            case 3:
              this._source = input instanceof HTMLMediaElement ? RTCAudioMeter._audioCtx.createMediaElementSource(input) : RTCAudioMeter._audioCtx.createMediaStreamSource(input);
              this._source.connect(this._analyser);
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.warn(LOG_TAG, "update media stream error: ".concat(_t.message));
              return _context.a(2, Promise.reject(_t));
            case 5:
              return _context.a(2, Promise.resolve());
          }
        }, _callee, this, [[2, 4]]);
      }));
      function updateInputStream(_x) {
        return _updateInputStream.apply(this, arguments);
      }
      return updateInputStream;
    }()
  }, {
    key: "getMicLevel",
    value: function getMicLevel() {
      try {
        var _RTCAudioMeter$_audio2, _this$_analyser$getBy, _this$_analyser;
        if (!this._source || !this._analyser || !this._data || !RTCAudioMeter._audioCtx || ((_RTCAudioMeter$_audio2 = RTCAudioMeter._audioCtx) === null || _RTCAudioMeter$_audio2 === void 0 ? void 0 : _RTCAudioMeter$_audio2.state) !== 'running') {
          return 0;
        }
        (_this$_analyser$getBy = (_this$_analyser = this._analyser).getByteFrequencyData) === null || _this$_analyser$getBy === void 0 ? void 0 : _this$_analyser$getBy.call(_this$_analyser, this._data);
        var audioEnergy = 0;
        for (var i = 0; i < this._data.length / 2; i++) {
          audioEnergy += this._data[i];
        }
        var audioEnergyFloat = audioEnergy / (255 * this._data.length / 2);
        return audioEnergyFloat;
      } catch (e) {
        console.warn(LOG_TAG, "get mic Level error: ".concat(e.message));
        return 0;
      }
    }
  }], [{
    key: "_prepareAudioContext",
    value: function _prepareAudioContext() {
      if (!RTCAudioMeter._audioCtx) {
        // @ts-expect-error
        var AudioCtxConstr = window.AudioContext || window.webkitAudioContext;
        RTCAudioMeter._audioCtx = new AudioCtxConstr();
        console.info(LOG_TAG, "prepare audio context success");
      }
    }
  }]);
}();
_RTCAudioMeter = RTCAudioMeter;
RTCAudioMeter._audioCtx = void 0;
RTCAudioMeter._audioMeters = [];
//# sourceMappingURL=RTCAudioMeter.js.map
