"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSettingsView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.every.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _AudioSettingsPanel = require("@ringcentral-integration/widgets/components/AudioSettingsPanel");
var _AudioSettingsPanelV = require("@ringcentral-integration/widgets/components/AudioSettingsPanelV2");
var _react = _interopRequireWildcard(require("react"));
var _uuid = require("uuid");
var _AudioSettingsPanel2 = require("./AudioSettingsPanel");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var AudioSettingsView = exports.AudioSettingsView = (_dec = (0, _nextCore.injectable)({
  name: 'AudioSettingsView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('AudioSettingsViewOptions')(target, undefined, 2);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Locale === "undefined" ? Object : _services.Locale, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof AudioSettingsViewOptions === "undefined" ? Object : AudioSettingsViewOptions]), _dec5 = (0, _nextCore.dynamic)('Theme'), _dec6 = Reflect.metadata("design:type", typeof Theme === "undefined" ? Object : Theme), _dec7 = (0, _nextCore.dynamic)('RingtoneConfiguration'), _dec8 = Reflect.metadata("design:type", typeof RingtoneConfiguration === "undefined" ? Object : RingtoneConfiguration), _dec9 = (0, _nextCore.dynamic)('VolumeInspector'), _dec0 = Reflect.metadata("design:type", typeof VolumeInspector === "undefined" ? Object : VolumeInspector), _dec1 = (0, _nextCore.dynamic)('AudioSettings'), _dec10 = Reflect.metadata("design:type", typeof AudioSettings === "undefined" ? Object : AudioSettings), _dec11 = (0, _nextCore.dynamic)('CallingSettings'), _dec12 = Reflect.metadata("design:type", typeof CallingSettings === "undefined" ? Object : CallingSettings), _dec13 = (0, _nextCore.dynamic)('CallMonitor'), _dec14 = Reflect.metadata("design:type", typeof CallMonitor === "undefined" ? Object : CallMonitor), _dec15 = (0, _nextCore.dynamic)('Webphone'), _dec16 = Reflect.metadata("design:type", typeof Webphone === "undefined" ? Object : Webphone), _dec17 = (0, _nextCore.dynamic)('CallAction'), _dec18 = Reflect.metadata("design:type", typeof CallAction === "undefined" ? Object : CallAction), _dec19 = (0, _nextCore.delegate)('all'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = (0, _nextCore.delegate)('mainClient'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [String]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function AudioSettingsView(_locale, _router, _audioSettingsViewOptions) {
    var _this;
    _classCallCheck(this, AudioSettingsView);
    _this = _callSuper(this, AudioSettingsView);
    _this._locale = _locale;
    _this._router = _router;
    _this._audioSettingsViewOptions = _audioSettingsViewOptions;
    _initializerDefineProperty(_this, "_theme", _descriptor, _this);
    _initializerDefineProperty(_this, "_ringtoneConfiguration", _descriptor2, _this);
    _initializerDefineProperty(_this, "_volumeInspector", _descriptor3, _this);
    _initializerDefineProperty(_this, "_audioSettings", _descriptor4, _this);
    _initializerDefineProperty(_this, "_callingSettings", _descriptor5, _this);
    _initializerDefineProperty(_this, "_callMonitor", _descriptor6, _this);
    _initializerDefineProperty(_this, "_webphone", _descriptor7, _this);
    _initializerDefineProperty(_this, "_callAction", _descriptor8, _this);
    return _this;
  }
  _inherits(AudioSettingsView, _RcViewModule);
  return _createClass(AudioSettingsView, [{
    key: "showSetting",
    get: function get() {
      return !!this._audioSettings;
    }
  }, {
    key: "checkAllDevicesAreEmpty",
    value: function checkAllDevicesAreEmpty(devices) {
      return devices.every(function (item) {
        return item.label === '' && item.deviceId === '' || item.label === '' && item.deviceId === 'off';
      });
    }
  }, {
    key: "listenToMicrophonePermission",
    value: function () {
      var _listenToMicrophonePermission = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _navigator,
          _navigator$permission,
          _this2 = this;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              // listen to the microphone permission change event
              (_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$permission = _navigator.permissions) === null || _navigator$permission === void 0 ? void 0 : _navigator$permission.query({
                name: 'microphone'
              }).then(function (permissionStatus) {
                permissionStatus.onchange = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
                  var _this2$_volumeInspect;
                  return _regenerator().w(function (_context) {
                    while (1) switch (_context.n) {
                      case 0:
                        if (!(permissionStatus.state === 'denied')) {
                          _context.n = 1;
                          break;
                        }
                        _context.n = 1;
                        return (_this2$_volumeInspect = _this2._volumeInspector) === null || _this2$_volumeInspect === void 0 ? void 0 : _this2$_volumeInspect.stopAudioTest();
                      case 1:
                        _context.n = 2;
                        return _this2._audioSettings.ensureGetUserMediaPermission();
                      case 2:
                        return _context.a(2);
                    }
                  }, _callee);
                }));
              });
            case 1:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      function listenToMicrophonePermission() {
        return _listenToMicrophonePermission.apply(this, arguments);
      }
      return listenToMicrophonePermission;
    }() // TODO: we should probably refactor this:
    // - the watch logic likely should be part of webphone module
    // - this microphone permission logic should be moved into AudioSettings, and might not need
    //   to be dependent on whether active call audio control is enabled or not
  }, {
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this3 = this;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (this.enableActiveCallAudioControl) {
                this.listenToMicrophonePermission();
                (0, _nextCore.watch)(this, function () {
                  return _this3._audioSettings.inputDeviceId;
                }, /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(newInputDeviceId) {
                    var _this3$_callAction, _this3$_callAction$di, _this3$_callAction$di2, _this3$_callAction$di3;
                    var webphoneSessionId;
                    return _regenerator().w(function (_context3) {
                      while (1) switch (_context3.n) {
                        case 0:
                          webphoneSessionId = (_this3$_callAction = _this3._callAction) === null || _this3$_callAction === void 0 ? void 0 : (_this3$_callAction$di = _this3$_callAction.displayCallAllInfo) === null || _this3$_callAction$di === void 0 ? void 0 : (_this3$_callAction$di2 = _this3$_callAction$di.call) === null || _this3$_callAction$di2 === void 0 ? void 0 : (_this3$_callAction$di3 = _this3$_callAction$di2.webphoneSession) === null || _this3$_callAction$di3 === void 0 ? void 0 : _this3$_callAction$di3.id;
                          if (!(webphoneSessionId && newInputDeviceId)) {
                            _context3.n = 1;
                            break;
                          }
                          _context3.n = 1;
                          return _this3.replaceSessionInputStream(webphoneSessionId);
                        case 1:
                          return _context3.a(2);
                      }
                    }, _callee3);
                  }));
                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              }
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function onInitOnce() {
        return _onInitOnce.apply(this, arguments);
      }
      return onInitOnce;
    }()
  }, {
    key: "replaceSessionInputStream",
    value: function () {
      var _replaceSessionInputStream = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(webphoneSessionId) {
        var _this4 = this;
        var _this$_webphone, _sipSession$sessionDe, sipSession, pc, constraints, stream, audioTrack, _t, _t2;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              // TODO: the sip process definitely needs to be in webphone module
              sipSession = (_this$_webphone = this._webphone) === null || _this$_webphone === void 0 ? void 0 : _this$_webphone.originalSessions[webphoneSessionId];
              pc = sipSession === null || sipSession === void 0 ? void 0 : (_sipSession$sessionDe = sipSession.sessionDescriptionHandler) === null || _sipSession$sessionDe === void 0 ? void 0 : _sipSession$sessionDe.peerConnection;
              _context5.n = 1;
              return this._audioSettings.getInputDeviceOptions();
            case 1:
              _t = _context5.v;
              constraints = {
                audio: _t,
                video: false
              };
              _context5.n = 2;
              return navigator.mediaDevices.getUserMedia(constraints);
            case 2:
              stream = _context5.v;
              audioTrack = stream.getAudioTracks()[0];
              pc === null || pc === void 0 ? void 0 : pc.getSenders().forEach(function (sender) {
                if (sender.track && sender.track.kind === audioTrack.kind) {
                  _this4.logger.info("Find audio track in sender, label: ".concat(sender.track.label, " enabled:").concat(sender.track.enabled, " muted:").concat(sender.track.muted, " readyState:").concat(sender.track.readyState, " sampleRate: ").concat(sender.track.getSettings().sampleRate));
                  audioTrack.enabled = sender.track.enabled;
                  var oldTrack = sender.track;
                  sender.replaceTrack(audioTrack).then(function () {
                    _this4.logger.info("Replace track succeed, current MediaTrackSettings: ".concat(JSON.stringify(audioTrack.getSettings())));
                    oldTrack.stop();
                  })["catch"](function (e) {
                    _this4.logger.info('Replace track failed', e);
                  });
                }
              });
              _context5.n = 4;
              break;
            case 3:
              _context5.p = 3;
              _t2 = _context5.v;
              this.logger.error('Replace session input stream failed', _t2);
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 3]]);
      }));
      function replaceSessionInputStream(_x2) {
        return _replaceSessionInputStream.apply(this, arguments);
      }
      return replaceSessionInputStream;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_audioSettingsV, _this$_audioSettingsV2, _this$_volumeInspecto, _this$_ringtoneConfig, _this$_ringtoneConfig2, _this$_ringtoneConfig3, _this$_ringtoneConfig4;
      var isHavingCall = !!(this._webphone && this._webphone.sessions.length > 0 || this._callMonitor.activeRingCalls.length + this._callMonitor.activeOnHoldCalls.length + this._callMonitor.activeCurrentCalls.length > 0);
      return {
        currentLocale: this._locale.currentLocale,
        hasUserMedia: this._audioSettings.hasUserMedia,
        isAGCEnabled: this._audioSettings.isAGCEnabled,
        showAGCEnabled: this._audioSettings.isSupportAGC,
        ringtoneVolume: this._audioSettings.ringtoneVolume,
        callVolume: this._audioSettings.callVolume,
        availableInputDevices: this._audioSettings.availableInputDevices,
        // use the data.inputDeviceId as we do want to allow users to still pick the default device
        // and the ux should reflect that
        inputDeviceId: this._audioSettings.data.inputDeviceId,
        availableOutputDevices: this._audioSettings.availableOutputDevices,
        availableRingtoneDevices: this._audioSettings.availableRingtoneDevices,
        outputDeviceId: this._audioSettings.data.outputDeviceId,
        ringtoneDeviceId: this._audioSettings.ringtoneDeviceId,
        supportDevices: this._audioSettings.supportDevices,
        userMedia: this._audioSettings.userMedia,
        isWebRTC: this._callingSettings.callWith === this._callingSettings.callingOptions.browser,
        outputDeviceDisabled: !this._audioSettings.availableOutputDevices.length || this.checkAllDevicesAreEmpty(this._audioSettings.availableOutputDevices),
        inputDeviceDisabled: !!(!this._audioSettings.availableInputDevices.length || (this.enableActiveCallAudioControl ? false : isHavingCall) || this.checkAllDevicesAreEmpty(this._audioSettings.availableInputDevices)),
        ringtoneSelectDisabled: isHavingCall || !this._audioSettings.availableOutputDevices.length || this.checkAllDevicesAreEmpty(this._audioSettings.availableOutputDevices),
        showCallVolume: (_this$_audioSettingsV = this._audioSettingsViewOptions) === null || _this$_audioSettingsV === void 0 ? void 0 : _this$_audioSettingsV.showCallVolume,
        showRingToneVolume: (_this$_audioSettingsV2 = this._audioSettingsViewOptions) === null || _this$_audioSettingsV2 === void 0 ? void 0 : _this$_audioSettingsV2.showRingToneVolume,
        volumeTestData: (_this$_volumeInspecto = this._volumeInspector) === null || _this$_volumeInspecto === void 0 ? void 0 : _this$_volumeInspecto.data,
        selectedRingtoneId: (_this$_ringtoneConfig = this._ringtoneConfiguration) === null || _this$_ringtoneConfig === void 0 ? void 0 : _this$_ringtoneConfig.selectedRingtoneId,
        fullRingtoneList: ((_this$_ringtoneConfig2 = this._ringtoneConfiguration) === null || _this$_ringtoneConfig2 === void 0 ? void 0 : _this$_ringtoneConfig2.fullRingtoneList) || [],
        isUploadRingtoneDisabled: (_this$_ringtoneConfig3 = this._ringtoneConfiguration) === null || _this$_ringtoneConfig3 === void 0 ? void 0 : _this$_ringtoneConfig3.isUploadRingtoneDisabled,
        enableCustomRingtone: (_this$_ringtoneConfig4 = this._ringtoneConfiguration) === null || _this$_ringtoneConfig4 === void 0 ? void 0 : _this$_ringtoneConfig4.enableCustomRingtone
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this5 = this;
      return {
        onBackButtonClick: function onBackButtonClick() {
          var _this5$_theme;
          return (0, _views.slideOutViewTransition)(function () {
            return _this5._router.goBack();
          }, (_this5$_theme = _this5._theme) === null || _this5$_theme === void 0 ? void 0 : _this5$_theme.reducedMotion);
        },
        onSave: function onSave(data) {
          return _this5._audioSettings.setData(data);
        },
        checkUserMedia: function checkUserMedia() {
          return _this5._audioSettings.ensureGetUserMediaPermission();
        },
        checkAudioAvailable: function checkAudioAvailable() {
          return _this5._audioSettings.checkAudioAvailable({
            checkIfNoDevices: false
          });
        },
        handleTestMicroClick: function handleTestMicroClick(testState) {
          var _this5$_volumeInspect;
          (_this5$_volumeInspect = _this5._volumeInspector) === null || _this5$_volumeInspect === void 0 ? void 0 : _this5$_volumeInspect.handleTestMicroClick(testState);
        },
        handleTestSpeakerClick: function handleTestSpeakerClick(testState) {
          var _this5$_volumeInspect2;
          (_this5$_volumeInspect2 = _this5._volumeInspector) === null || _this5$_volumeInspect2 === void 0 ? void 0 : _this5$_volumeInspect2.handleTestSpeakerClick(testState);
        },
        updateCurrentRingtone: function updateCurrentRingtone(id) {
          if (!_this5._ringtoneConfiguration) return;
          _this5._ringtoneConfiguration.setSelectedRingtoneId(id);
          _this5._ringtoneConfiguration.updateIncomingRingtone();
        },
        removeCustomRingtone: function removeCustomRingtone(id) {
          var _this5$_ringtoneConfi;
          (_this5$_ringtoneConfi = _this5._ringtoneConfiguration) === null || _this5$_ringtoneConfi === void 0 ? void 0 : _this5$_ringtoneConfi.removeCustomRingtone(id);
        },
        uploadCustomRingtone: function uploadCustomRingtone(audioInfo) {
          var _this5$_ringtoneConfi2;
          var id = "custom-".concat((0, _uuid.v4)());
          (_this5$_ringtoneConfi2 = _this5._ringtoneConfiguration) === null || _this5$_ringtoneConfi2 === void 0 ? void 0 : _this5$_ringtoneConfi2.uploadCustomRingtone({
            id: id,
            name: audioInfo.fileName,
            url: audioInfo.dataUrl,
            type: 'custom'
          },
          // only display alert on spring-ui mode
          process.env.THEME_SYSTEM === 'spring-ui');
          _this5.selectToRingtone(id);
        },
        showDangerAlert: function showDangerAlert(message) {
          var _this5$_ringtoneConfi3;
          (_this5$_ringtoneConfi3 = _this5._ringtoneConfiguration) === null || _this5$_ringtoneConfi3 === void 0 ? void 0 : _this5$_ringtoneConfi3.showDangerAlert(message);
        },
        onExit: function () {
          var _onExit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
            var _this5$_volumeInspect3;
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.n) {
                case 0:
                  if (!_this5.enableActiveCallAudioControl) {
                    _context6.n = 1;
                    break;
                  }
                  _context6.n = 1;
                  return (_this5$_volumeInspect3 = _this5._volumeInspector) === null || _this5$_volumeInspect3 === void 0 ? void 0 : _this5$_volumeInspect3.stopAudioTest();
                case 1:
                  return _context6.a(2);
              }
            }, _callee6);
          }));
          function onExit() {
            return _onExit.apply(this, arguments);
          }
          return onExit;
        }()
      };
    }
  }, {
    key: "enableActiveCallAudioControl",
    get: function get() {
      return this._audioSettings.enableActiveCallAudioControl;
    }
  }, {
    key: "selectToRingtone",
    value: function selectToRingtone(id) {
      var _this$_ringtoneConfig5, _this$_ringtoneConfig6;
      (_this$_ringtoneConfig5 = this._ringtoneConfiguration) === null || _this$_ringtoneConfig5 === void 0 ? void 0 : _this$_ringtoneConfig5.setSelectedRingtoneId(id);
      (_this$_ringtoneConfig6 = this._ringtoneConfiguration) === null || _this$_ringtoneConfig6 === void 0 ? void 0 : _this$_ringtoneConfig6.updateIncomingRingtone();
    }
  }, {
    key: "component",
    value: function component(props) {
      var _this6 = this,
        _this$_audioSettingsV4;
      var _useRef = (0, _react.useRef)(this.getUIFunctions()),
        uiFunctions = _useRef.current;
      var _props = (0, _nextCore.useConnector)(function () {
        var uiProps = _this6.getUIProps();
        return _objectSpread(_objectSpread({}, props), uiProps);
      });
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        var _this$_audioSettingsV3;
        var _Component = ((_this$_audioSettingsV3 = this._audioSettingsViewOptions) === null || _this$_audioSettingsV3 === void 0 ? void 0 : _this$_audioSettingsV3.component) || _AudioSettingsPanel2.AudioSettingsPanel;
        //@ts-expect-error
        return /*#__PURE__*/_react["default"].createElement(_Component, _extends({}, _props, uiFunctions));
      }
      var Component = ((_this$_audioSettingsV4 = this._audioSettingsViewOptions) === null || _this$_audioSettingsV4 === void 0 ? void 0 : _this$_audioSettingsV4.component) || (props.useV2 ? _AudioSettingsPanelV.AudioSettingsPanel : _AudioSettingsPanel.AudioSettingsPanel);

      //@ts-expect-error
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, _props, uiFunctions));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_theme", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_ringtoneConfiguration", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_volumeInspector", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_audioSettings", [_dec1, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_callingSettings", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_callMonitor", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_webphone", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_callAction", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "listenToMicrophonePermission", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "listenToMicrophonePermission"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replaceSessionInputStream", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "replaceSessionInputStream"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=AudioSettings.view.js.map
