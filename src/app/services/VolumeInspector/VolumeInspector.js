"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VolumeInspector = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _AudioSettings = require("../AudioSettings");
var _AudioDetector = require("./AudioDetector");
var _MediaRecorderHelper = require("./MediaRecorderHelper");
var _MicLevelHelper = require("./MicLevelHelper");
var _break = _interopRequireDefault(require("./audio/break.mp3"));
var _const = require("./const");
var _createAudioElement = require("./utils/createAudioElement");
var _stream = require("./utils/stream");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var VolumeInspector = exports.VolumeInspector = (_dec = (0, _nextCore.injectable)({
  name: 'VolumeInspector'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _AudioSettings.AudioSettings === "undefined" ? Object : _AudioSettings.AudioSettings, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager]), _dec4 = (0, _nextCore.dynamic)('CallAction'), _dec5 = Reflect.metadata("design:type", typeof CallAction === "undefined" ? Object : CallAction), _dec6 = Reflect.metadata("design:type", typeof _const.TEST_STATE === "undefined" ? Object : _const.TEST_STATE), _dec7 = Reflect.metadata("design:type", Number), _dec8 = Reflect.metadata("design:type", typeof AUDIO_TYPE === "undefined" ? Object : AUDIO_TYPE), _dec9 = Reflect.metadata("design:type", Boolean), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [typeof AUDIO_TYPE === "undefined" ? Object : AUDIO_TYPE]), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [typeof _const.TEST_STATE === "undefined" ? Object : _const.TEST_STATE]), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [Number]), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Number]), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [Boolean]), _dec18 = (0, _nextCore.delegate)('server'), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [typeof AUDIO_TYPE === "undefined" ? Object : AUDIO_TYPE]), _dec21 = (0, _nextCore.delegate)('server'), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [Boolean]), _dec24 = (0, _nextCore.delegate)('server'), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [Number]), _dec27 = (0, _nextCore.delegate)('server'), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", [typeof _const.TEST_STATE === "undefined" ? Object : _const.TEST_STATE]), _dec30 = (0, _nextCore.delegate)('server'), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", [Number]), _dec33 = (0, _nextCore.delegate)('mainClient'), _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", [String, Number]), _dec36 = (0, _nextCore.delegate)('mainClient'), _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", []), _dec39 = (0, _nextCore.delegate)('mainClient'), _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", [String]), _dec42 = (0, _nextCore.delegate)('server'), _dec43 = Reflect.metadata("design:type", Function), _dec44 = Reflect.metadata("design:paramtypes", []), _dec45 = (0, _nextCore.delegate)('server'), _dec46 = Reflect.metadata("design:type", Function), _dec47 = Reflect.metadata("design:paramtypes", []), _dec48 = (0, _nextCore.delegate)('mainClient'), _dec49 = Reflect.metadata("design:type", Function), _dec50 = Reflect.metadata("design:paramtypes", [typeof _const.TEST_STATE === "undefined" ? Object : _const.TEST_STATE]), _dec51 = (0, _nextCore.delegate)('mainClient'), _dec52 = Reflect.metadata("design:type", Function), _dec53 = Reflect.metadata("design:paramtypes", [typeof _const.TEST_STATE === "undefined" ? Object : _const.TEST_STATE]), _dec54 = (0, _nextCore.delegate)('mainClient'), _dec55 = Reflect.metadata("design:type", Function), _dec56 = Reflect.metadata("design:paramtypes", []), _dec57 = (0, _nextCore.delegate)('mainClient'), _dec58 = Reflect.metadata("design:type", Function), _dec59 = Reflect.metadata("design:paramtypes", []), _dec60 = (0, _nextCore.delegate)('mainClient'), _dec61 = Reflect.metadata("design:type", Function), _dec62 = Reflect.metadata("design:paramtypes", []), _dec63 = (0, _nextCore.computed)(function (that) {
  return [that.volume, that.countDown, that.testState, that.type];
}), _dec64 = Reflect.metadata("design:type", Function), _dec65 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function VolumeInspector(_audioSettings, _portManager) {
    var _this;
    _classCallCheck(this, VolumeInspector);
    _this = _callSuper(this, VolumeInspector);
    _this._audioSettings = _audioSettings;
    _this._portManager = _portManager;
    _initializerDefineProperty(_this, "_callAction", _descriptor, _this);
    _this.mediaRecorderHelper = null;
    _this.micLevel = null;
    _this.audioDetector = null;
    _this.detectorListenDisposer = null;
    _this.audioEl = null;
    _this.outputEl = null;
    _this._sampleAudioBlobUrl = '';
    _initializerDefineProperty(_this, "testState", _descriptor2, _this);
    _initializerDefineProperty(_this, "countDown", _descriptor3, _this);
    _initializerDefineProperty(_this, "volume", _descriptor4, _this);
    _initializerDefineProperty(_this, "type", _descriptor5, _this);
    _initializerDefineProperty(_this, "shouldRecoverCallToUnMute", _descriptor6, _this);
    _this.setVolumeCb = function (volume) {
      _this.setVolume(volume);
    };
    if (_this._portManager.shared) {
      _this._portManager.onMainTab(function () {
        return _this.initialize();
      });
    } else {
      _this.initialize();
    }
    _this._preloadAudio();
    return _this;
  }
  _inherits(VolumeInspector, _RcModule);
  return _createClass(VolumeInspector, [{
    key: "_setType",
    value: function _setType(type) {
      this.type = type;
    }
  }, {
    key: "_setTestState",
    value: function _setTestState(testState) {
      this.testState = testState;
    }
  }, {
    key: "_setVolume",
    value: function _setVolume(volume) {
      this.volume = volume;
    }
  }, {
    key: "_setCountDown",
    value: function _setCountDown(countDown) {
      this.countDown = countDown;
    }
  }, {
    key: "_setShouldRecoverCallToUnMute",
    value: function _setShouldRecoverCallToUnMute(status) {
      this.shouldRecoverCallToUnMute = status;
    }
  }, {
    key: "setType",
    value: function () {
      var _setType2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(type) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setType(type);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setType(_x) {
        return _setType2.apply(this, arguments);
      }
      return setType;
    }()
  }, {
    key: "setShouldRecoverCallToUnMute",
    value: function () {
      var _setShouldRecoverCallToUnMute2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(status) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._setShouldRecoverCallToUnMute(status);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setShouldRecoverCallToUnMute(_x2) {
        return _setShouldRecoverCallToUnMute2.apply(this, arguments);
      }
      return setShouldRecoverCallToUnMute;
    }()
  }, {
    key: "setVolume",
    value: function () {
      var _setVolume2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(volume) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._setVolume(volume);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function setVolume(_x3) {
        return _setVolume2.apply(this, arguments);
      }
      return setVolume;
    }()
  }, {
    key: "setTestState",
    value: function () {
      var _setTestState2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(testState) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._setTestState(testState);
              this._setVolume(0);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function setTestState(_x4) {
        return _setTestState2.apply(this, arguments);
      }
      return setTestState;
    }()
  }, {
    key: "setCountDown",
    value: function () {
      var _setCountDown2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(recordingTime) {
        var countDown;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              countDown = Math.ceil((_const.MAX_RECORDING_TIME - recordingTime) / 1000);
              this._setCountDown(countDown);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function setCountDown(_x5) {
        return _setCountDown2.apply(this, arguments);
      }
      return setCountDown;
    }()
  }, {
    key: "_preloadAudio",
    value: function () {
      var _preloadAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _t;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return (0, _utils.getBlobURL)(_break["default"]);
            case 1:
              this._sampleAudioBlobUrl = _context6.v;
              _context6.n = 3;
              break;
            case 2:
              _context6.p = 2;
              _t = _context6.v;
              if (process.env.NODE_ENV !== 'test') console.error('failed to preload audio', _t);
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 2]]);
      }));
      function _preloadAudio() {
        return _preloadAudio2.apply(this, arguments);
      }
      return _preloadAudio;
    }()
  }, {
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this.mediaRecorderHelper = new _MediaRecorderHelper.MediaRecorderHelper();
              this.micLevel = new _MicLevelHelper.MicLevelHelper();
              this.audioDetector = new _AudioDetector.AudioDetector();
              this.audioEl = (0, _createAudioElement.createAudioElement)();
              this.outputEl = (0, _createAudioElement.createAudioElement)();
              this.mediaRecorderHelper.setRecordingCompleteCallback(this.onRecordingComplete.bind(this));
              this.mediaRecorderHelper.setUpdateRecordingTimeCallback(this.setCountDown.bind(this));
              this.audioEl.onended = this.onEnded.bind(this);
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
  }, {
    key: "setupAudioDetector",
    value: function () {
      var _setupAudioDetector = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var result;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!(!this.audioEl || !this.audioDetector)) {
                _context8.n = 1;
                break;
              }
              console.warn('Can not setup AudioDetector - no audio element.');
              return _context8.a(2);
            case 1:
              _context8.n = 2;
              return this.audioDetector.connect(this.audioEl);
            case 2:
              result = this.audioDetector.registerListener(this.setVolumeCb);
              if (!(result instanceof Error)) {
                _context8.n = 3;
                break;
              }
              console.warn('register detector listener error.');
              return _context8.a(2);
            case 3:
              this.detectorListenDisposer = result.setInterval(_const.LEVEL_CHECK_INTERVAL).start();
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function setupAudioDetector() {
        return _setupAudioDetector.apply(this, arguments);
      }
      return setupAudioDetector;
    }() // only for test speaker
  }, {
    key: "startPlaySampleAudio",
    value: function startPlaySampleAudio() {
      this.setType(_const.TEST_TYPE.speaker);
      this.startPlayback(this._sampleAudioBlobUrl, this._audioSettings.callVolume);
    }
  }, {
    key: "startPlayback",
    value: function () {
      var _startPlayback = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(src, volume) {
        var _this$audioEl$capture, _this$audioEl, _t2;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              this.setTestState(_const.TEST_STATE.PLAYS_AUDIO);
              _context9.p = 1;
              if (!(this.outputEl && this.audioEl)) {
                _context9.n = 4;
                break;
              }
              this.audioEl.src = src;
              this.audioEl.currentTime = 0;
              _context9.n = 2;
              return this.setupAudioDetector();
            case 2:
              _context9.n = 3;
              return this.audioEl.play();
            case 3:
              // this trick is due to connected audio analyzer (MicDetector) that makes
              // impossible to output audio to specific (selected) device other than default
              // @ts-expect-error
              this.outputEl.srcObject = (_this$audioEl$capture = (_this$audioEl = this.audioEl).captureStream) === null || _this$audioEl$capture === void 0 ? void 0 : _this$audioEl$capture.call(_this$audioEl);
              if (this.outputEl.setSinkId && this._audioSettings.outputDeviceId) {
                this.outputEl.setSinkId(this._audioSettings.outputDeviceId);
              }
              if (volume !== undefined) {
                this.outputEl.volume = volume;
              }
              this.outputEl.play();
              _context9.n = 5;
              break;
            case 4:
              console.warn('Can not start playback - no audio element.');
              this.completeTest();
            case 5:
              _context9.n = 7;
              break;
            case 6:
              _context9.p = 6;
              _t2 = _context9.v;
              console.warn('Recording play failed', _t2);
              this.completeTest();
            case 7:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 6]]);
      }));
      function startPlayback(_x6, _x7) {
        return _startPlayback.apply(this, arguments);
      }
      return startPlayback;
    }()
  }, {
    key: "stopPlayback",
    value: function () {
      var _stopPlayback = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var _this$detectorListenD;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              if (this.audioEl) {
                this.audioEl.pause();
              }
              if (this.outputEl) {
                this.outputEl.pause();
                if (this.outputEl.srcObject) {
                  (0, _stream.stopStream)(this.outputEl.srcObject);
                  this.outputEl.srcObject = null;
                }
              }
              (_this$detectorListenD = this.detectorListenDisposer) === null || _this$detectorListenD === void 0 ? void 0 : _this$detectorListenD.call(this);
              this.detectorListenDisposer = null;
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function stopPlayback() {
        return _stopPlayback.apply(this, arguments);
      }
      return stopPlayback;
    }()
  }, {
    key: "onRecordingComplete",
    value: function () {
      var _onRecordingComplete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(src) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              this.micLevel.clear();
              this.startPlayback(src);
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function onRecordingComplete(_x8) {
        return _onRecordingComplete.apply(this, arguments);
      }
      return onRecordingComplete;
    }()
  }, {
    key: "setMuteBeforeAudioTest",
    value: function () {
      var _setMuteBeforeAudioTest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var _this$_callAction;
        var _ref, session, isOnMute, _this$_callAction2;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              if (this._audioSettings.enableActiveCallAudioControl) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2);
            case 1:
              _ref = ((_this$_callAction = this._callAction) === null || _this$_callAction === void 0 ? void 0 : _this$_callAction.displayCallAllInfo) || {}, session = _ref.session;
              if (session) {
                _context10.n = 2;
                break;
              }
              return _context10.a(2);
            case 2:
              isOnMute = !!session.isOnMute;
              this.setShouldRecoverCallToUnMute(!isOnMute);
              if (isOnMute) {
                _context10.n = 3;
                break;
              }
              _context10.n = 3;
              return (_this$_callAction2 = this._callAction) === null || _this$_callAction2 === void 0 ? void 0 : _this$_callAction2.onActiveActions('mute');
            case 3:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function setMuteBeforeAudioTest() {
        return _setMuteBeforeAudioTest.apply(this, arguments);
      }
      return setMuteBeforeAudioTest;
    }()
  }, {
    key: "stopAudioTest",
    value: function () {
      var _stopAudioTest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              if (!(this.testState === _const.TEST_STATE.IDLE)) {
                _context11.n = 1;
                break;
              }
              return _context11.a(2);
            case 1:
              if (this.testState === _const.TEST_STATE.RECORDS_AUDIO) {
                this.stopRecording();
              }
              this.completeTest();
            case 2:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function stopAudioTest() {
        return _stopAudioTest.apply(this, arguments);
      }
      return stopAudioTest;
    }()
  }, {
    key: "handleTestMicroClick",
    value: function () {
      var _handleTestMicroClick = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(testState) {
        var _t3;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              _t3 = testState;
              _context12.n = _t3 === _const.TEST_STATE.IDLE ? 1 : _t3 === _const.TEST_STATE.RECORDS_AUDIO ? 3 : _t3 === _const.TEST_STATE.PLAYS_AUDIO ? 4 : 5;
              break;
            case 1:
              _context12.n = 2;
              return this.setMuteBeforeAudioTest();
            case 2:
              this.startRecording();
              return _context12.a(3, 5);
            case 3:
              this.stopRecording();
              return _context12.a(3, 5);
            case 4:
              this.completeTest();
              return _context12.a(3, 5);
            case 5:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function handleTestMicroClick(_x9) {
        return _handleTestMicroClick.apply(this, arguments);
      }
      return handleTestMicroClick;
    }()
  }, {
    key: "handleTestSpeakerClick",
    value: function () {
      var _handleTestSpeakerClick = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(testState) {
        var _t4;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              _t4 = testState;
              _context13.n = _t4 === _const.TEST_STATE.IDLE ? 1 : _t4 === _const.TEST_STATE.PLAYS_AUDIO ? 3 : 4;
              break;
            case 1:
              _context13.n = 2;
              return this.setMuteBeforeAudioTest();
            case 2:
              this.startPlaySampleAudio();
              return _context13.a(3, 4);
            case 3:
              this.completeTest();
              return _context13.a(3, 4);
            case 4:
              return _context13.a(2);
          }
        }, _callee13, this);
      }));
      function handleTestSpeakerClick(_x0) {
        return _handleTestSpeakerClick.apply(this, arguments);
      }
      return handleTestSpeakerClick;
    }()
  }, {
    key: "startRecording",
    value: function () {
      var _startRecording = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var stream, _t5, _t6;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              this.setType(_const.TEST_TYPE.microphone);
              this.setTestState(_const.TEST_STATE.RECORDS_AUDIO);
              _context14.p = 1;
              _context14.n = 2;
              return this.micLevel.setupMicMedia(this._audioSettings.inputDeviceId);
            case 2:
              stream = _context14.v;
              _context14.n = 4;
              break;
            case 3:
              _context14.p = 3;
              _t5 = _context14.v;
              console.warn('can not setup mic media', _t5);
              this.completeTest();
              return _context14.a(2);
            case 4:
              _context14.p = 4;
              _context14.n = 5;
              return this.micLevel.listenToMic(this.setVolumeCb);
            case 5:
              this.mediaRecorderHelper.startRecording(stream);
              _context14.n = 7;
              break;
            case 6:
              _context14.p = 6;
              _t6 = _context14.v;
              console.warn('can not start startRecording', _t6);
              this.micLevel.clear();
              this.completeTest();
            case 7:
              return _context14.a(2);
          }
        }, _callee14, this, [[4, 6], [1, 3]]);
      }));
      function startRecording() {
        return _startRecording.apply(this, arguments);
      }
      return startRecording;
    }()
  }, {
    key: "stopRecording",
    value: function () {
      var _stopRecording = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              try {
                this.mediaRecorderHelper.stopRecording();
              } catch (e) {
                console.warn('stopRecording failed', e);
                this.completeTest();
              }
              this.micLevel.clear();
            case 1:
              return _context15.a(2);
          }
        }, _callee15, this);
      }));
      function stopRecording() {
        return _stopRecording.apply(this, arguments);
      }
      return stopRecording;
    }()
  }, {
    key: "completeTest",
    value: function () {
      var _completeTest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              this.doCompleteTest();
            case 1:
              return _context16.a(2);
          }
        }, _callee16, this);
      }));
      function completeTest() {
        return _completeTest.apply(this, arguments);
      }
      return completeTest;
    }()
  }, {
    key: "onEnded",
    value: function onEnded() {
      this.doCompleteTest();
    }
  }, {
    key: "doCompleteTest",
    value: function () {
      var _doCompleteTest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
        var _this$_callAction3, _this$_callAction3$di, _this$_callAction3$di2;
        var _this$_callAction4;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              this.stopPlayback();
              this.setTestState(_const.TEST_STATE.IDLE);
              this.setType(null);
              if (!(this._audioSettings.enableActiveCallAudioControl && this.shouldRecoverCallToUnMute && ((_this$_callAction3 = this._callAction) === null || _this$_callAction3 === void 0 ? void 0 : (_this$_callAction3$di = _this$_callAction3.displayCallAllInfo) === null || _this$_callAction3$di === void 0 ? void 0 : (_this$_callAction3$di2 = _this$_callAction3$di.session) === null || _this$_callAction3$di2 === void 0 ? void 0 : _this$_callAction3$di2.isOnMute))) {
                _context17.n = 1;
                break;
              }
              _context17.n = 1;
              return (_this$_callAction4 = this._callAction) === null || _this$_callAction4 === void 0 ? void 0 : _this$_callAction4.onActiveActions('unmute');
            case 1:
              this.setShouldRecoverCallToUnMute(false);
            case 2:
              return _context17.a(2);
          }
        }, _callee17, this);
      }));
      function doCompleteTest() {
        return _doCompleteTest.apply(this, arguments);
      }
      return doCompleteTest;
    }()
  }, {
    key: "data",
    get: function get() {
      return {
        volume: this.volume,
        countDown: this.countDown,
        testState: this.testState,
        isRecording: this.testState === _const.TEST_STATE.RECORDS_AUDIO,
        type: this.type
      };
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_callAction", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "testState", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _const.TEST_STATE.IDLE;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "countDown", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _const.MAX_RECORDING_SECS;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "volume", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "type", [_nextCore.state, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "shouldRecoverCallToUnMute", [_nextCore.state, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setType", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "_setType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setTestState", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTestState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setVolume", [_nextCore.action, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "_setVolume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setCountDown", [_nextCore.action, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "_setCountDown"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setShouldRecoverCallToUnMute", [_nextCore.action, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_setShouldRecoverCallToUnMute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setType", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "setType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setShouldRecoverCallToUnMute", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "setShouldRecoverCallToUnMute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setVolume", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "setVolume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setTestState", [_dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "setTestState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setCountDown", [_dec30, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "setCountDown"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startPlayback", [_dec33, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "startPlayback"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopPlayback", [_dec36, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "stopPlayback"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRecordingComplete", [_dec39, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "onRecordingComplete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setMuteBeforeAudioTest", [_dec42, _dec43, _dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "setMuteBeforeAudioTest"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopAudioTest", [_dec45, _dec46, _dec47], Object.getOwnPropertyDescriptor(_class2.prototype, "stopAudioTest"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleTestMicroClick", [_dec48, _dec49, _dec50], Object.getOwnPropertyDescriptor(_class2.prototype, "handleTestMicroClick"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleTestSpeakerClick", [_dec51, _dec52, _dec53], Object.getOwnPropertyDescriptor(_class2.prototype, "handleTestSpeakerClick"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startRecording", [_dec54, _dec55, _dec56], Object.getOwnPropertyDescriptor(_class2.prototype, "startRecording"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stopRecording", [_dec57, _dec58, _dec59], Object.getOwnPropertyDescriptor(_class2.prototype, "stopRecording"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completeTest", [_dec60, _dec61, _dec62], Object.getOwnPropertyDescriptor(_class2.prototype, "completeTest"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "data", [_dec63, _dec64, _dec65], Object.getOwnPropertyDescriptor(_class2.prototype, "data"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=VolumeInspector.js.map
