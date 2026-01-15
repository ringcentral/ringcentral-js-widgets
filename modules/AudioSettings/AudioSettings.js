"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSettings = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _audioSettingsErrors = require("./audioSettingsErrors");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function polyfillGetUserMedia() {
  if (navigator.mediaDevices === undefined) {
    Object.assign(navigator, {
      mediaDevices: {}
    });
  }
  // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
  navigator.getUserMedia =
  // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
  navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  if (navigator.mediaDevices.getUserMedia === undefined &&
  // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
  navigator.getUserMedia) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      return new Promise(function (resolve, reject) {
        // @ts-expect-error TS(2339): Property 'getUserMedia' does not exist on type 'Na... Remove this comment to see the full error message
        navigator.getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
}
polyfillGetUserMedia();
var DEFAULT_VALUE = {
  // TODO: Remember to discuss migration plans if we change these properties. Changes that cause the volume settings to change can upset users.
  ringtoneVolume: 0.5,
  callVolume: 0.5,
  outputDeviceId: 'default',
  inputDeviceId: 'default',
  ringtoneDeviceId: 'default',
  hasAutoPrompted: false,
  /**
   * automatic gain control (AGC)
   * Automatic gain control is a feature in which a sound source automatically manages
   * changes in the volume of its source media to maintain a steady overall volume level.
   * This feature is typically used on microphones, although it can be provided by other
   * input sources as well.
   */
  isAGCEnabled: false
};
var AudioSettings = exports.AudioSettings = (_dec = (0, _di.Module)({
  name: 'AudioSettings',
  deps: ['Auth', 'Alert', 'Storage', 'AppFeatures', {
    dep: 'AudioSettingsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var availableDevices = _ref.availableDevices;
  return [availableDevices];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var availableDevices = _ref2.availableDevices;
  return [availableDevices];
}), _dec4 = (0, _core.computed)(function (_ref3) {
  var availableDevices = _ref3.availableDevices;
  return [availableDevices];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function AudioSettings(deps) {
    var _this$_deps$audioSett, _this$_deps$audioSett2;
    var _this;
    _classCallCheck(this, AudioSettings);
    _this = _callSuper(this, AudioSettings, [{
      deps: deps,
      storageKey: 'AudioSettings',
      enableCache: true
    }]);
    _this._getUserMediaPromise = null;
    _this._showCheckMediaAlert = void 0;
    _initializerDefineProperty(_this, "data", _descriptor, _this);
    _initializerDefineProperty(_this, "availableDevices", _descriptor2, _this);
    _initializerDefineProperty(_this, "hasUserMedia", _descriptor3, _this);
    _this._showCheckMediaAlert = (_this$_deps$audioSett = (_this$_deps$audioSett2 = _this._deps.audioSettingsOptions) === null || _this$_deps$audioSett2 === void 0 ? void 0 : _this$_deps$audioSett2.showCheckMediaAlert) !== null && _this$_deps$audioSett !== void 0 ? _this$_deps$audioSett : false;
    return _this;
  }
  _inherits(AudioSettings, _RcModuleV);
  return _createClass(AudioSettings, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      // We add more properties to the data object
      // need to check is there any key not exist value
      // if so assign the data to default value
      if (Object.keys(DEFAULT_VALUE).some(function (key) {
        return _this2.data[key] === undefined;
      })) {
        var _this$ringtoneVolume, _this$callVolume, _this$outputDeviceId, _this$inputDeviceId, _this$isAGCEnabled, _this$ringtoneDeviceI;
        this._setData({
          ringtoneVolume: (_this$ringtoneVolume = this.ringtoneVolume) !== null && _this$ringtoneVolume !== void 0 ? _this$ringtoneVolume : DEFAULT_VALUE.ringtoneVolume,
          callVolume: (_this$callVolume = this.callVolume) !== null && _this$callVolume !== void 0 ? _this$callVolume : DEFAULT_VALUE.callVolume,
          outputDeviceId: (_this$outputDeviceId = this.outputDeviceId) !== null && _this$outputDeviceId !== void 0 ? _this$outputDeviceId : DEFAULT_VALUE.outputDeviceId,
          inputDeviceId: (_this$inputDeviceId = this.inputDeviceId) !== null && _this$inputDeviceId !== void 0 ? _this$inputDeviceId : DEFAULT_VALUE.inputDeviceId,
          isAGCEnabled: (_this$isAGCEnabled = this.isAGCEnabled) !== null && _this$isAGCEnabled !== void 0 ? _this$isAGCEnabled : DEFAULT_VALUE.isAGCEnabled,
          ringtoneDeviceId: (_this$ringtoneDeviceI = this.ringtoneDeviceId) !== null && _this$ringtoneDeviceI !== void 0 ? _this$ringtoneDeviceI : DEFAULT_VALUE.ringtoneDeviceId
        });
      }
      (0, _core.watch)(this, function () {
        return [_this2.isAGCEnabled, _this2.hasUserMedia];
      }, function () {
        if (_this2.hasUserMedia) {
          _this2.setAutoGainControl(_this2.isAGCEnabled);
        }
      }, {
        multiple: true
      });
    }
  }, {
    key: "setHasAutoPrompted",
    value: function setHasAutoPrompted() {
      this.data.hasAutoPrompted = true;
    }
  }, {
    key: "setUserMediaError",
    value: function setUserMediaError() {
      this.hasUserMedia = false;
      this.availableDevices = [];
      this.data.outputDeviceId = 'default';
      this.data.inputDeviceId = 'default';
      this.data.ringtoneDeviceId = 'default';
    }
  }, {
    key: "setUserMediaSuccess",
    value: function setUserMediaSuccess() {
      this.hasUserMedia = true;
    }
  }, {
    key: "setAvailableDevices",
    value: function setAvailableDevices(devices) {
      var _this3 = this;
      this.availableDevices = devices;
      var isOutputDeviceExist = (0, _ramda.find)(function (device) {
        return device.deviceId === _this3.data.outputDeviceId && device.kind === 'audiooutput';
      }, devices);
      if (!isOutputDeviceExist) {
        // For Firefox, don't have default device id
        var hasDefaultDevice = (0, _ramda.find)(function (device) {
          return device.deviceId === 'default' && device.kind === 'audiooutput';
        }, devices);
        var firstDevice = (0, _ramda.find)(function (device) {
          return device.kind === 'audiooutput';
        }, devices);
        if (!hasDefaultDevice && firstDevice) {
          this.data.outputDeviceId = firstDevice.deviceId;
          this.data.ringtoneDeviceId = firstDevice.deviceId;
        } else {
          this.data.outputDeviceId = 'default';
          this.data.ringtoneDeviceId = 'default';
        }
      }
      var isInputDeviceExist = (0, _ramda.find)(function (device) {
        return device.deviceId === _this3.data.inputDeviceId && device.kind === 'audioinput';
      }, devices);
      if (!isInputDeviceExist) {
        // For Firefox, don't have default device id
        var _hasDefaultDevice = (0, _ramda.find)(function (device) {
          return device.deviceId === 'default' && device.kind === 'audioinput';
        }, devices);
        var _firstDevice = (0, _ramda.find)(function (device) {
          return device.kind === 'audioinput';
        }, devices);
        if (!_hasDefaultDevice && _firstDevice) {
          this.data.inputDeviceId = _firstDevice.deviceId;
        } else {
          this.data.inputDeviceId = 'default';
        }
      }
    }
  }, {
    key: "_setData",
    value: function _setData(_ref4) {
      var _ref4$ringtoneVolume = _ref4.ringtoneVolume,
        ringtoneVolume = _ref4$ringtoneVolume === void 0 ? this.ringtoneVolume : _ref4$ringtoneVolume,
        _ref4$callVolume = _ref4.callVolume,
        callVolume = _ref4$callVolume === void 0 ? this.callVolume : _ref4$callVolume,
        _ref4$outputDeviceId = _ref4.outputDeviceId,
        outputDeviceId = _ref4$outputDeviceId === void 0 ? this.outputDeviceId : _ref4$outputDeviceId,
        _ref4$inputDeviceId = _ref4.inputDeviceId,
        inputDeviceId = _ref4$inputDeviceId === void 0 ? this.inputDeviceId : _ref4$inputDeviceId,
        _ref4$ringtoneDeviceI = _ref4.ringtoneDeviceId,
        ringtoneDeviceId = _ref4$ringtoneDeviceI === void 0 ? this.ringtoneDeviceId : _ref4$ringtoneDeviceI,
        _ref4$isAGCEnabled = _ref4.isAGCEnabled,
        isAGCEnabled = _ref4$isAGCEnabled === void 0 ? this.isAGCEnabled : _ref4$isAGCEnabled;
      this.data.outputDeviceId = outputDeviceId;
      this.data.inputDeviceId = inputDeviceId;
      this.data.isAGCEnabled = isAGCEnabled;
      this.data.ringtoneDeviceId = ringtoneDeviceId;
      this.data.ringtoneVolume = Math.min(1, Math.max(0, ringtoneVolume));
      this.data.callVolume = Math.min(1, Math.max(0, callVolume));
    }
  }, {
    key: "initializeProxy",
    value: function initializeProxy() {
      var _this4 = this;
      // Check audio permissions every time app client starts
      if (this.supportDevices) {
        this._checkDevices();
      }
      this.parentModule.store.subscribe(function () {
        if (_this4.ready && _this4._deps.auth.loggedIn && _this4._deps.appFeatures.isWebPhoneEnabled && !_this4.userMedia) {
          // Make sure it only prompts once
          if (_this4.hasAutoPrompted) return;
          _this4.markAutoPrompted();
          _this4.getUserMedia();
        }
      });
    }
  }, {
    key: "markAutoPrompted",
    value: function () {
      var _markAutoPrompted = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this.setHasAutoPrompted();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function markAutoPrompted() {
        return _markAutoPrompted.apply(this, arguments);
      }
      return markAutoPrompted;
    }()
  }, {
    key: "_initModule",
    value: function () {
      var _initModule2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this5 = this;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _superPropGet(AudioSettings, "_initModule", this, 3)([]);
              if (navigator && navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
                navigator.mediaDevices.addEventListener('devicechange', function () {
                  _this5._checkDevices();
                });
              }
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _initModule() {
        return _initModule2.apply(this, arguments);
      }
      return _initModule;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!this.supportDevices) {
                _context3.n = 1;
                break;
              }
              _context3.n = 1;
              return this._checkDevices();
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "setAutoGainControl",
    value: function () {
      var _setAutoGainControl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(isAGCEnabled) {
        var constraints, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              constraints = isAGCEnabled ? {
                autoGainControl: true
              } : {
                autoGainControl: false,
                /**
                 * https://stackoverflow.com/questions/44307432/how-to-disable-system-audio-enhancements-using-webrtc
                 * disable system audio enhancements using webRTC
                 */
                googAutoGainControl: false,
                googAutoGainControl2: false
              };
              _context4.n = 1;
              return navigator.mediaDevices.getUserMedia({
                audio: constraints
              });
            case 1:
              _context4.n = 3;
              break;
            case 2:
              _context4.p = 2;
              _t = _context4.v;
              console.warn("setAutoGainControl error:", _t);
            case 3:
              return _context4.a(2);
          }
        }, _callee4, null, [[0, 2]]);
      }));
      function setAutoGainControl(_x) {
        return _setAutoGainControl.apply(this, arguments);
      }
      return setAutoGainControl;
    }()
  }, {
    key: "_checkDevices",
    value: function () {
      var _checkDevices2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var devices;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return navigator.mediaDevices.enumerateDevices();
            case 1:
              devices = _context5.v;
              this.setAvailableDevices(devices.map(function (d) {
                return {
                  deviceId: d.deviceId,
                  kind: d.kind,
                  label: d.label,
                  groupId: d.groupId
                };
              }));
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _checkDevices() {
        return _checkDevices2.apply(this, arguments);
      }
      return _checkDevices;
    }()
  }, {
    key: "getUserMedia",
    value: function () {
      var _getUserMedia = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var stream, _t2;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              if (navigator.mediaDevices.getUserMedia) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              _context6.p = 1;
              if (!this._getUserMediaPromise) {
                this._getUserMediaPromise = navigator.mediaDevices.getUserMedia({
                  audio: true
                });
              }
              _context6.n = 2;
              return this._getUserMediaPromise;
            case 2:
              stream = _context6.v;
              this._getUserMediaPromise = null;
              _context6.n = 3;
              return this._onGetUserMediaSuccess();
            case 3:
              if (typeof stream.getTracks === 'function') {
                stream.getTracks().forEach(function (track) {
                  track.stop();
                });
              } else if (typeof stream.stop === 'function') {
                // TODO: check type;
                stream.stop();
              }
              _context6.n = 5;
              break;
            case 4:
              _context6.p = 4;
              _t2 = _context6.v;
              this._getUserMediaPromise = null;
              this.onGetUserMediaError();
            case 5:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 4]]);
      }));
      function getUserMedia() {
        return _getUserMedia.apply(this, arguments);
      }
      return getUserMedia;
    }()
  }, {
    key: "_onGetUserMediaSuccess",
    value: function () {
      var _onGetUserMediaSuccess2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var userMediaAlert;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              userMediaAlert = (0, _ramda.find)(function (item) {
                return item.message === _audioSettingsErrors.audioSettingsErrors.userMediaPermission || item.message === _audioSettingsErrors.audioSettingsErrors.checkMediaPermission;
              }, this._deps.alert.messages);
              if (userMediaAlert) {
                this._deps.alert.dismiss(userMediaAlert.id);
              }
              this.setUserMediaSuccess();
              _context7.n = 1;
              return this._checkDevices();
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _onGetUserMediaSuccess() {
        return _onGetUserMediaSuccess2.apply(this, arguments);
      }
      return _onGetUserMediaSuccess;
    }()
  }, {
    key: "showPermissionAlert",
    value: function () {
      var _showPermissionAlert = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(ttl) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (this._showCheckMediaAlert) {
                this._deps.alert.warning({
                  message: _audioSettingsErrors.audioSettingsErrors.checkMediaPermission,
                  allowDuplicates: false,
                  ttl: 0
                });
              } else {
                this._deps.alert.danger({
                  message: _audioSettingsErrors.audioSettingsErrors.userMediaPermission,
                  allowDuplicates: false,
                  ttl: ttl
                });
              }
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function showPermissionAlert(_x2) {
        return _showPermissionAlert.apply(this, arguments);
      }
      return showPermissionAlert;
    }()
  }, {
    key: "onGetUserMediaError",
    value: function () {
      var _onGetUserMediaError = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              this.setUserMediaError();
              this.showPermissionAlert();
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function onGetUserMediaError() {
        return _onGetUserMediaError.apply(this, arguments);
      }
      return onGetUserMediaError;
    }()
  }, {
    key: "checkAudioAvailable",
    value: function () {
      var _checkAudioAvailable = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(options) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              if (this.userMedia) {
                _context0.n = 1;
                break;
              }
              this.showPermissionAlert(30 * 1000);
              if (options.checkIfNoDevices) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2);
            case 1:
              this.getUserMedia();
            case 2:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function checkAudioAvailable(_x3) {
        return _checkAudioAvailable.apply(this, arguments);
      }
      return checkAudioAvailable;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(_ref5) {
        var _ref5$ringtoneVolume, ringtoneVolume, _ref5$callVolume, callVolume, _ref5$outputDeviceId, outputDeviceId, _ref5$inputDeviceId, inputDeviceId, _ref5$ringtoneDeviceI, ringtoneDeviceId, _ref5$isAGCEnabled, isAGCEnabled;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              _ref5$ringtoneVolume = _ref5.ringtoneVolume, ringtoneVolume = _ref5$ringtoneVolume === void 0 ? this.ringtoneVolume : _ref5$ringtoneVolume, _ref5$callVolume = _ref5.callVolume, callVolume = _ref5$callVolume === void 0 ? this.callVolume : _ref5$callVolume, _ref5$outputDeviceId = _ref5.outputDeviceId, outputDeviceId = _ref5$outputDeviceId === void 0 ? this.outputDeviceId : _ref5$outputDeviceId, _ref5$inputDeviceId = _ref5.inputDeviceId, inputDeviceId = _ref5$inputDeviceId === void 0 ? this.inputDeviceId : _ref5$inputDeviceId, _ref5$ringtoneDeviceI = _ref5.ringtoneDeviceId, ringtoneDeviceId = _ref5$ringtoneDeviceI === void 0 ? this.ringtoneDeviceId : _ref5$ringtoneDeviceI, _ref5$isAGCEnabled = _ref5.isAGCEnabled, isAGCEnabled = _ref5$isAGCEnabled === void 0 ? this.isAGCEnabled : _ref5$isAGCEnabled;
              this._setData({
                ringtoneVolume: ringtoneVolume,
                callVolume: callVolume,
                outputDeviceId: outputDeviceId,
                inputDeviceId: inputDeviceId,
                ringtoneDeviceId: ringtoneDeviceId,
                isAGCEnabled: isAGCEnabled
              });
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function setData(_x4) {
        return _setData2.apply(this, arguments);
      }
      return setData;
    }()
  }, {
    key: "outputDeviceId",
    get: function get() {
      return this.data.outputDeviceId;
    }
  }, {
    key: "outputDevice",
    get: function get() {
      var _this6 = this;
      return (0, _ramda.find)(function (device) {
        return device.kind === 'audiooutput' && device.deviceId === _this6.outputDeviceId;
      }, this.availableDevices);
    }
  }, {
    key: "inputDeviceId",
    get: function get() {
      return this.data.inputDeviceId;
    }
  }, {
    key: "isAGCEnabled",
    get: function get() {
      return this.data.isAGCEnabled;
    }
  }, {
    key: "inputDevice",
    get: function get() {
      var _this7 = this;
      return (0, _ramda.find)(function (device) {
        return device.kind === 'audioinput' && device.deviceId === _this7.inputDeviceId;
      }, this.availableDevices);
    }
  }, {
    key: "ringtoneDeviceId",
    get: function get() {
      return this.data.ringtoneDeviceId;
    }
  }, {
    key: "supportDevices",
    get: function get() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
    }
  }, {
    key: "availableOutputDevices",
    get: function get() {
      return (0, _ramda.filter)(function (device) {
        return device.kind === 'audiooutput';
      }, this.availableDevices);
    }
  }, {
    key: "availableRingtoneDevices",
    get: function get() {
      var ringtoneDevices = (0, _ramda.filter)(function (device) {
        return device.kind === 'audiooutput';
      }, this.availableDevices);
      return ringtoneDevices.length > 0 ? ringtoneDevices.concat({
        deviceId: 'off',
        groupId: '',
        kind: 'audiooutput',
        label: ''
      }) : [];
    }
  }, {
    key: "availableInputDevices",
    get: function get() {
      return (0, _ramda.filter)(function (device) {
        return device.kind === 'audioinput';
      }, this.availableDevices);
    }
  }, {
    key: "ringtoneVolume",
    get: function get() {
      return this.data.ringtoneVolume;
    }
  }, {
    key: "callVolume",
    get: function get() {
      return this.data.callVolume;
    }
  }, {
    key: "hasAutoPrompted",
    get: function get() {
      return this.data.hasAutoPrompted;
    }
  }, {
    key: "userMedia",
    get: function get() {
      var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
      if (isFirefox) {
        return true;
      }
      // this detection method may not work in the future
      // currently there is no good way to detect this
      return !!(this.availableDevices.length && this.availableDevices[0].label !== '');
    }
  }, {
    key: "isSupportAGC",
    get: function get() {
      try {
        var constraints = navigator.mediaDevices.getSupportedConstraints();
        return !!constraints.autoGainControl;
      } catch (err) {
        console.error('failed to get autoGainControl support:', err);
        return false;
      }
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return DEFAULT_VALUE;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "availableDevices", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "hasUserMedia", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setHasAutoPrompted", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setHasAutoPrompted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setUserMediaError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setUserMediaError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setUserMediaSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setUserMediaSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAvailableDevices", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAvailableDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "markAutoPrompted", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "markAutoPrompted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoGainControl", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoGainControl"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_checkDevices", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_checkDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onGetUserMediaSuccess", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onGetUserMediaSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showPermissionAlert", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showPermissionAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onGetUserMediaError", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onGetUserMediaError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkAudioAvailable", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "checkAudioAvailable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableOutputDevices", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "availableOutputDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableRingtoneDevices", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "availableRingtoneDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableInputDevices", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "availableInputDevices"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=AudioSettings.js.map
