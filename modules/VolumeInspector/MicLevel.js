"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MicLevel = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _AudioDetector = require("./AudioDetector");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * MicLevel is recommended to be a singleton when it is setupMedia for the same deviceId.
 * listenToMic() can be called repeatedly for registering different listener.
 */
var MicLevel = exports.MicLevel = /*#__PURE__*/function () {
  function MicLevel() {
    _classCallCheck(this, MicLevel);
    // unit: ms
    this._interval = 100;
    this._audioDetector = new _AudioDetector.AudioDetector();
    this._preInputDeviceId = void 0;
    this._audioStream = void 0;
    this._detectorListenDisposer = void 0;
  }

  /**
   * setup microphone media by deviceId
   * if deviceId is undefined, then it will try to get user media by default
   * @param deviceId string
   * @return MediaStream or SetupMediaError when getUserMedia failed.
   */
  return _createClass(MicLevel, [{
    key: "setupMicMedia",
    value: (function () {
      var _setupMicMedia = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(deviceId) {
        var audioConstraint, mediaStream, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!(!deviceId && deviceId === this._preInputDeviceId)) {
                _context.n = 1;
                break;
              }
              console.warn("deviceId is same, not reset for setupMicMedia, deviceId:".concat(deviceId));
              return _context.a(2, this._audioStream);
            case 1:
              audioConstraint = {
                audio: deviceId ? {
                  deviceId: {
                    exact: deviceId
                  }
                } : true
              };
              _context.p = 2;
              _context.n = 3;
              return navigator.mediaDevices.getUserMedia(audioConstraint);
            case 3:
              mediaStream = _context.v;
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.warn("getUserMedia error, deviceId:".concat(deviceId, ", err:"), _t);
              // to make user handle this error
              return _context.a(2, new Error(_t));
            case 5:
              // make sure new mediaStream is ready then clear current mediaStream
              this.clear();
              this._audioStream = mediaStream;
              this._preInputDeviceId = deviceId || '';
              return _context.a(2, mediaStream);
          }
        }, _callee, this, [[2, 4]]);
      }));
      function setupMicMedia(_x) {
        return _setupMicMedia.apply(this, arguments);
      }
      return setupMicMedia;
    }()
    /**
     * start to listen microphone mediaStream by interval
     * @param dataCallback
     * @return disposer of listener
     */
    )
  }, {
    key: "listenToMic",
    value: (function () {
      var _listenToMic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(dataCallback) {
        var result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (this._audioStream) {
                _context2.n = 1;
                break;
              }
              console.warn('No audio stream to listen.');
              throw new Error('No media stream was setup.');
            case 1:
              _context2.n = 2;
              return this._audioDetector.connect(this._audioStream);
            case 2:
              // all listener will also be cleared when audioDetector disconnect.
              result = this._audioDetector.registerListener(dataCallback);
              if (!(result instanceof Error)) {
                _context2.n = 3;
                break;
              }
              console.warn('register detector listener error.');
              return _context2.a(2, result);
            case 3:
              this._detectorListenDisposer = result.setInterval(this._interval).start();
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function listenToMic(_x2) {
        return _listenToMic.apply(this, arguments);
      }
      return listenToMic;
    }())
  }, {
    key: "clear",
    value: function clear() {
      var _this$_detectorListen;
      if (this._audioStream) {
        this._audioDetector.disconnect();
        this._audioStream.getTracks().forEach(function (track) {
          track.stop();
        });
        delete this._audioStream;
        delete this._preInputDeviceId;
      }
      (_this$_detectorListen = this._detectorListenDisposer) === null || _this$_detectorListen === void 0 ? void 0 : _this$_detectorListen.call(this);
      this._detectorListenDisposer = null;
    }

    /**
     * set interval for listener
     * @param interval number, default 100 ms
     */
  }, {
    key: "setInterval",
    value: function setInterval(interval) {
      this._interval = interval;
      return this;
    }
  }]);
}();
//# sourceMappingURL=MicLevel.js.map
