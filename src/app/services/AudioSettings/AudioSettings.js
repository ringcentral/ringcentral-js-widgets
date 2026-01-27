"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_VALUE = exports.AudioSettings = void 0;
exports.polyfillGetUserMedia = polyfillGetUserMedia;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _FormattedMessage = _interopRequireDefault(require("@ringcentral-integration/widgets/components/FormattedMessage"));
var _Link = require("@ringcentral/juno/es6/components/Link/Link.js");
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _ramda = require("ramda");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireWildcard(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
/* eslint-disable react-hooks/rules-of-hooks */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t4 in e) "default" !== _t4 && {}.hasOwnProperty.call(e, _t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t4)) && (i.get || i.set) ? o(f, _t4, i) : f[_t4] = e[_t4]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var DEFAULT_DEVICE_ID = 'default';
// windows only
var DEFAULT_COMMUNICATION_DEVICE_ID = 'communications';
var DEFAULT_VALUE = exports.DEFAULT_VALUE = {
  // TODO: Remember to discuss migration plans if we change these properties. Changes that cause the volume settings to change can upset users.
  ringtoneVolume: 0.5,
  callVolume: 0.5,
  outputDeviceId: DEFAULT_DEVICE_ID,
  outputDeviceLabel: null,
  inputDeviceId: DEFAULT_DEVICE_ID,
  inputDeviceLabel: null,
  ringtoneDeviceId: DEFAULT_DEVICE_ID,
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
function polyfillGetUserMedia() {
  if (navigator.mediaDevices === undefined) {
    Object.assign(navigator, {
      mediaDevices: {}
    });
  }
  // @ts-ignore
  navigator.getUserMedia =
  // @ts-ignore
  navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  if (navigator.mediaDevices.getUserMedia === undefined &&
  // @ts-ignore
  navigator.getUserMedia) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      return new Promise(function (resolve, reject) {
        // @ts-ignore
        navigator.getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
}
polyfillGetUserMedia();
var AudioSettings = exports.AudioSettings = (_dec = (0, _nextCore.injectable)({
  name: 'AudioSettings'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('AudioSettingsOptions')(target, undefined, 7);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services2.ToastManager === "undefined" ? Object : _services2.ToastManager, typeof AudioSettingsOptions === "undefined" ? Object : AudioSettingsOptions]), _dec5 = Reflect.metadata("design:type", typeof AudioSettingsData === "undefined" ? Object : AudioSettingsData), _dec6 = Reflect.metadata("design:type", Array), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", []), _dec11 = (0, _nextCore.delegate)('server'), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", []), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Array]), _dec16 = (0, _nextCore.delegate)('server'), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [Array]), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [typeof AudioSettingsData === "undefined" ? Object : AudioSettingsData]), _dec21 = (0, _nextCore.delegate)('server'), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", []), _dec24 = (0, _nextCore.delegate)('mainClient'), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec27 = (0, _nextCore.delegate)('mainClient'), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", [Boolean]), _dec30 = (0, _nextCore.delegate)('all'), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", []), _dec33 = (0, _nextCore.delegate)('server'), _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", []), _dec36 = (0, _nextCore.delegate)('server'), _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", [Number]), _dec39 = (0, _nextCore.delegate)('server'), _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", []), _dec42 = (0, _nextCore.delegate)('server'), _dec43 = Reflect.metadata("design:type", Function), _dec44 = Reflect.metadata("design:paramtypes", [Object]), _dec45 = (0, _nextCore.delegate)('server'), _dec46 = Reflect.metadata("design:type", Function), _dec47 = Reflect.metadata("design:paramtypes", [void 0]), _dec48 = Reflect.metadata("design:type", Function), _dec49 = Reflect.metadata("design:paramtypes", []), _dec50 = (0, _nextCore.delegate)('server'), _dec51 = Reflect.metadata("design:type", Function), _dec52 = Reflect.metadata("design:paramtypes", [String]), _dec53 = Reflect.metadata("design:type", Function), _dec54 = Reflect.metadata("design:paramtypes", []), _dec55 = (0, _nextCore.delegate)('server'), _dec56 = Reflect.metadata("design:type", Function), _dec57 = Reflect.metadata("design:paramtypes", [String]), _dec58 = Reflect.metadata("design:type", Function), _dec59 = Reflect.metadata("design:paramtypes", []), _dec60 = Reflect.metadata("design:type", Function), _dec61 = Reflect.metadata("design:paramtypes", []), _dec62 = Reflect.metadata("design:type", Function), _dec63 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function AudioSettings(_auth, _toast, _brand, _storage, _appFeatures, _portManager, _toastManager, _audioSettingsOptions) {
    var _this;
    _classCallCheck(this, AudioSettings);
    _this = _callSuper(this, AudioSettings);
    _this._auth = _auth;
    _this._toast = _toast;
    _this._brand = _brand;
    _this._storage = _storage;
    _this._appFeatures = _appFeatures;
    _this._portManager = _portManager;
    _this._toastManager = _toastManager;
    _this._audioSettingsOptions = _audioSettingsOptions;
    _this.uniqueManager = _this._toastManager.createUniqueManager();
    _this._getUserMediaPromise = null;
    // in spring-ui, we always show the check media alert
    _this._showCheckMediaAlert = process.env.THEME_SYSTEM === 'spring-ui';
    _initializerDefineProperty(_this, "data", _descriptor, _this);
    _initializerDefineProperty(_this, "availableDevices", _descriptor2, _this);
    _initializerDefineProperty(_this, "hasUserMedia", _descriptor3, _this);
    _initializerDefineProperty(_this, "noPermissionToast", _descriptor4, _this);
    _this._storage.enable(_this, {
      migrations: [['data', 'AudioSettings-data']]
    });
    if (_this._portManager.shared) {
      _this._portManager.onMainTab(function () {
        return _this.initialize();
      });
    } else {
      _this.initialize();
    }
    if (process.env.THEME_SYSTEM !== 'spring-ui') {
      var _this$_audioSettingsO, _this$_audioSettingsO2;
      _this._showCheckMediaAlert = (_this$_audioSettingsO = (_this$_audioSettingsO2 = _this._audioSettingsOptions) === null || _this$_audioSettingsO2 === void 0 ? void 0 : _this$_audioSettingsO2.showCheckMediaAlert) !== null && _this$_audioSettingsO !== void 0 ? _this$_audioSettingsO : false;
    }
    return _this;
  }

  /**
   * Helper method to check if a device ID is one of the default IDs
   */
  _inherits(AudioSettings, _RcModule);
  return _createClass(AudioSettings, [{
    key: "_isDefaultDeviceId",
    value: function _isDefaultDeviceId(deviceId) {
      return deviceId === DEFAULT_DEVICE_ID || deviceId === DEFAULT_COMMUNICATION_DEVICE_ID;
    }

    /**
     * Helper method to handle default device fallback logic
     */
  }, {
    key: "_getDefaultDeviceFallback",
    value: function _getDefaultDeviceFallback(_ref) {
      var devices = _ref.devices,
        deviceKind = _ref.deviceKind,
        preferredDefaultId = _ref.preferredDefaultId;
      // Check if preferred default exists
      var hasPreferredDefault = (0, _ramda.find)(function (device) {
        return device.deviceId === preferredDefaultId && device.kind === deviceKind;
      }, devices);
      if (hasPreferredDefault) {
        return {
          deviceId: preferredDefaultId,
          label: hasPreferredDefault.label
        };
      }

      // Check if regular default exists
      var hasDefaultDevice = (0, _ramda.find)(function (device) {
        return device.deviceId === DEFAULT_DEVICE_ID && device.kind === deviceKind;
      }, devices);
      if (hasDefaultDevice) {
        return {
          deviceId: DEFAULT_DEVICE_ID,
          label: hasDefaultDevice.label
        };
      }

      // Fall back to first available device
      var firstDevice = (0, _ramda.find)(function (device) {
        return device.kind === deviceKind;
      }, devices);
      if (firstDevice) {
        return {
          deviceId: firstDevice.deviceId,
          label: firstDevice.label
        };
      }

      // No devices available
      return {
        deviceId: DEFAULT_DEVICE_ID,
        label: null
      };
    }

    /**
     * Helper method to find device by ID or label
     */
  }, {
    key: "_findDevice",
    value: function _findDevice(_ref2) {
      var devices = _ref2.devices,
        deviceIdOrLabel = _ref2.deviceIdOrLabel,
        deviceKind = _ref2.deviceKind,
        _ref2$searchByLabel = _ref2.searchByLabel,
        searchByLabel = _ref2$searchByLabel === void 0 ? false : _ref2$searchByLabel;
      if (!deviceIdOrLabel) return undefined;
      if (searchByLabel) {
        return (0, _ramda.find)(function (device) {
          return device.kind === deviceKind && device.label === deviceIdOrLabel;
        }, devices);
      }
      return (0, _ramda.find)(function (device) {
        return device.deviceId === deviceIdOrLabel && device.kind === deviceKind;
      }, devices);
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
      this.data.ringtoneDeviceId = '';
      this.data.outputDeviceId = '';
      this.data.inputDeviceId = '';
    }
  }, {
    key: "_setUserMediaSuccess",
    value: function _setUserMediaSuccess() {
      this.hasUserMedia = true;
    }
  }, {
    key: "setUserMediaSuccess",
    value: function () {
      var _setUserMediaSuccess2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setUserMediaSuccess();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setUserMediaSuccess() {
        return _setUserMediaSuccess2.apply(this, arguments);
      }
      return setUserMediaSuccess;
    }()
    /**
     * Helper function to handle device label update
     */
  }, {
    key: "_handleDeviceLabelUpdate",
    value: function _handleDeviceLabelUpdate(_ref3) {
      var type = _ref3.type,
        currentDevice = _ref3.currentDevice,
        currentDeviceLabel = _ref3.currentDeviceLabel,
        deviceLabelKey = _ref3.deviceLabelKey;
      var result = {};
      if (currentDevice.label !== currentDeviceLabel) {
        this.logger.info("".concat(type, " label updated"), {
          previousLabel: currentDeviceLabel,
          newLabel: currentDevice.label,
          deviceId: currentDevice.deviceId
        });
        result[deviceLabelKey] = currentDevice.label;
      }
      return result;
    }

    /**
     * Helper function to handle device found by label
     */
  }, {
    key: "_handleDeviceFoundByLabel",
    value: function _handleDeviceFoundByLabel(_ref4) {
      var type = _ref4.type,
        foundDevice = _ref4.foundDevice,
        currentDeviceId = _ref4.currentDeviceId,
        isOutput = _ref4.isOutput,
        deviceIdKey = _ref4.deviceIdKey,
        deviceLabelKey = _ref4.deviceLabelKey;
      var result = {};
      this.logger.info("".concat(type, " ID updated due to device change"), {
        previousDeviceId: currentDeviceId,
        newDeviceId: foundDevice.deviceId,
        deviceLabel: foundDevice.label
      });
      result[deviceIdKey] = foundDevice.deviceId;
      result[deviceLabelKey] = foundDevice.label;
      if (isOutput) {
        result.ringtoneDeviceId = foundDevice.deviceId;
      }
      return result;
    }

    /**
     * Helper function to handle fallback to default device
     */
  }, {
    key: "_handleFallbackToDefault",
    value: function _handleFallbackToDefault(_ref5) {
      var type = _ref5.type,
        devices = _ref5.devices,
        deviceKind = _ref5.deviceKind,
        currentDeviceId = _ref5.currentDeviceId,
        currentDeviceLabel = _ref5.currentDeviceLabel,
        isOutput = _ref5.isOutput,
        deviceIdKey = _ref5.deviceIdKey,
        deviceLabelKey = _ref5.deviceLabelKey;
      var result = {};
      var fallback = this._getDefaultDeviceFallback({
        devices: devices,
        deviceKind: deviceKind,
        preferredDefaultId: DEFAULT_DEVICE_ID
      });
      this.logger.info("".concat(type, " reset to default due to device unavailability"), {
        previousDeviceId: currentDeviceId,
        previousLabel: currentDeviceLabel,
        fallbackDeviceId: fallback.deviceId,
        fallbackLabel: fallback.label
      });
      result[deviceIdKey] = fallback.deviceId;
      result[deviceLabelKey] = fallback.label;
      if (isOutput) {
        result.ringtoneDeviceId = fallback.deviceId;
      }
      return result;
    }

    /**
     * Helper function to find fallback settings for a specific device type
     * @param devices - Available devices list
     * @param type - Device type ('inputDevice' or 'outputDevice')
     * @returns Partial settings object with updated device properties
     */
  }, {
    key: "_findFallBackSettings",
    value: function _findFallBackSettings(devices, type) {
      var isOutput = type === 'outputDevice';
      var deviceKind = isOutput ? 'audiooutput' : 'audioinput';
      var currentDeviceId = isOutput ? this.data.outputDeviceId : this.data.inputDeviceId;
      var currentDeviceLabel = isOutput ? this.data.outputDeviceLabel : this.data.inputDeviceLabel;
      var deviceIdKey = isOutput ? 'outputDeviceId' : 'inputDeviceId';
      var deviceLabelKey = isOutput ? 'outputDeviceLabel' : 'inputDeviceLabel';

      // Check if current device exists in new device list
      var currentDevice = this._findDevice({
        devices: devices,
        deviceIdOrLabel: currentDeviceId,
        deviceKind: deviceKind
      });
      if (currentDevice) {
        // Device exists, update label if different
        return this._handleDeviceLabelUpdate({
          type: type,
          currentDevice: currentDevice,
          currentDeviceLabel: currentDeviceLabel,
          deviceLabelKey: deviceLabelKey
        });
      }

      // Device doesn't exist, try to find by label first
      var foundDevice = this._findDevice({
        devices: devices,
        deviceIdOrLabel: currentDeviceLabel,
        deviceKind: deviceKind,
        searchByLabel: true
      });
      if (foundDevice) {
        // Found device with same label, update device ID
        return this._handleDeviceFoundByLabel({
          type: type,
          foundDevice: foundDevice,
          currentDeviceId: currentDeviceId,
          isOutput: isOutput,
          deviceIdKey: deviceIdKey,
          deviceLabelKey: deviceLabelKey
        });
      }

      // No device found by label, fall back to default
      return this._handleFallbackToDefault({
        type: type,
        devices: devices,
        deviceKind: deviceKind,
        currentDeviceId: currentDeviceId,
        currentDeviceLabel: currentDeviceLabel,
        isOutput: isOutput,
        deviceIdKey: deviceIdKey,
        deviceLabelKey: deviceLabelKey
      });
    }
  }, {
    key: "_setAvailableDevices",
    value: function _setAvailableDevices(devices) {
      var _this$availableDevice,
        _this2 = this;
      (_this$availableDevice = this.availableDevices).splice.apply(_this$availableDevice, [0, this.availableDevices.length].concat(_toConsumableArray(devices)));

      // Get fallback settings for both input and output devices
      var outputSettings = this._findFallBackSettings(devices, 'outputDevice');
      var inputSettings = this._findFallBackSettings(devices, 'inputDevice');

      // Merge settings and update state only if there are changes
      var combinedSettings = _objectSpread(_objectSpread({}, outputSettings), inputSettings);

      // Update state with the combined settings (only properties that have changed)
      Object.keys(combinedSettings).forEach(function (key) {
        var value = combinedSettings[key];
        if (value !== undefined && _this2.data[key] !== value) {
          _this2.data[key] = value;
        }
      });
    }
  }, {
    key: "setAvailableDevices",
    value: function () {
      var _setAvailableDevices2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(devices) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._setAvailableDevices(devices);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setAvailableDevices(_x) {
        return _setAvailableDevices2.apply(this, arguments);
      }
      return setAvailableDevices;
    }()
  }, {
    key: "_setData",
    value: function _setData(data) {
      Object.assign(this.data, data);
    }
  }, {
    key: "markAutoPrompted",
    value: function () {
      var _markAutoPrompted = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this.setHasAutoPrompted();
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function markAutoPrompted() {
        return _markAutoPrompted.apply(this, arguments);
      }
      return markAutoPrompted;
    }()
  }, {
    key: "initialize",
    value: function initialize() {
      var _this3 = this;
      if (navigator && navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
        navigator.mediaDevices.addEventListener('devicechange', function () {
          _this3.checkDevices();
        });
      }
      if (this.supportDevices) {
        this.checkDevices();
      }
      return (0, _nextCore.subscribe)(this, function () {
        if (_this3.ready && _this3._auth.loggedIn && _this3._appFeatures.isWebPhoneEnabled && !_this3.userMedia) {
          // Make sure it only prompts once
          if (_this3.hasAutoPrompted) return;
          _this3.markAutoPrompted();
          _this3.ensureGetUserMediaPermission();
        }
      });
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!this.supportDevices) {
                _context4.n = 1;
                break;
              }
              _context4.n = 1;
              return this.checkDevices();
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "onInitOnce",
    value: function () {
      var _onInitOnce = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this4 = this;
        var _this$ringtoneVolume, _this$callVolume, _this$data$outputDevi, _this$data$outputDevi2, _this$data$inputDevic, _this$data$inputDevic2, _this$isAGCEnabled, _this$ringtoneDeviceI;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              // We add more properties to the data object
              // need to check is there any key not exist value
              // if so assign the data to default value
              if (Object.keys(DEFAULT_VALUE).some(function (key) {
                return _this4.data[key] === undefined;
              })) {
                this.setData({
                  ringtoneVolume: (_this$ringtoneVolume = this.ringtoneVolume) !== null && _this$ringtoneVolume !== void 0 ? _this$ringtoneVolume : DEFAULT_VALUE.ringtoneVolume,
                  callVolume: (_this$callVolume = this.callVolume) !== null && _this$callVolume !== void 0 ? _this$callVolume : DEFAULT_VALUE.callVolume,
                  outputDeviceId: (_this$data$outputDevi = this.data.outputDeviceId) !== null && _this$data$outputDevi !== void 0 ? _this$data$outputDevi : DEFAULT_VALUE.outputDeviceId,
                  outputDeviceLabel: (_this$data$outputDevi2 = this.data.outputDeviceLabel) !== null && _this$data$outputDevi2 !== void 0 ? _this$data$outputDevi2 : DEFAULT_VALUE.outputDeviceLabel,
                  // make sure to use data.inputDeviceId here instead of inputDeviceId getter
                  inputDeviceId: (_this$data$inputDevic = this.data.inputDeviceId) !== null && _this$data$inputDevic !== void 0 ? _this$data$inputDevic : DEFAULT_VALUE.inputDeviceId,
                  inputDeviceLabel: (_this$data$inputDevic2 = this.data.inputDeviceLabel) !== null && _this$data$inputDevic2 !== void 0 ? _this$data$inputDevic2 : DEFAULT_VALUE.inputDeviceLabel,
                  isAGCEnabled: (_this$isAGCEnabled = this.isAGCEnabled) !== null && _this$isAGCEnabled !== void 0 ? _this$isAGCEnabled : DEFAULT_VALUE.isAGCEnabled,
                  ringtoneDeviceId: (_this$ringtoneDeviceI = this.ringtoneDeviceId) !== null && _this$ringtoneDeviceI !== void 0 ? _this$ringtoneDeviceI : DEFAULT_VALUE.ringtoneDeviceId
                });
              }
              (0, _nextCore.watch)(this, function () {
                return [_this4.isAGCEnabled, _this4.hasUserMedia];
              }, function () {
                if (_this4.hasUserMedia) {
                  _this4.setAutoGainControl(_this4.isAGCEnabled);
                }
              }, {
                multiple: true
              });
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function onInitOnce() {
        return _onInitOnce.apply(this, arguments);
      }
      return onInitOnce;
    }()
  }, {
    key: "setAutoGainControl",
    value: function () {
      var _setAutoGainControl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(isAGCEnabled) {
        var constraints, _t;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
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
              _context6.n = 1;
              return navigator.mediaDevices.getUserMedia({
                audio: constraints
              });
            case 1:
              _context6.n = 3;
              break;
            case 2:
              _context6.p = 2;
              _t = _context6.v;
              // eslint-disable-next-line no-console
              console.warn("setAutoGainControl error:", _t);
            case 3:
              return _context6.a(2);
          }
        }, _callee6, null, [[0, 2]]);
      }));
      function setAutoGainControl(_x2) {
        return _setAutoGainControl.apply(this, arguments);
      }
      return setAutoGainControl;
    }()
    /**
     * @description Force the module to re-enumerate the devices to get the latest devices data
     */
  }, {
    key: "checkDevices",
    value: (function () {
      var _checkDevices = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var devices, devicesData;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return navigator.mediaDevices.enumerateDevices();
            case 1:
              devices = _context7.v;
              devicesData = devices.map(function (x) {
                return {
                  deviceId: x.deviceId,
                  groupId: x.groupId,
                  kind: x.kind,
                  label: x.label
                };
              });
              if (!(0, _isEqual["default"])(devicesData, this.availableDevices)) {
                // avoid unnecessary updates
                this.setAvailableDevices(devicesData);
              }
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function checkDevices() {
        return _checkDevices.apply(this, arguments);
      }
      return checkDevices;
    }())
  }, {
    key: "_getUserMedia",
    value: function () {
      var _getUserMedia2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var audioConstraints,
          autoStop,
          stream,
          _args8 = arguments;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              audioConstraints = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : true;
              autoStop = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : true;
              _context8.n = 1;
              return navigator.mediaDevices.getUserMedia({
                audio: audioConstraints
              });
            case 1:
              stream = _context8.v;
              // autoStop is used when we only get the user media for permission check
              // we don't need to hold on the device audio stream
              // so we will just stop the stream
              if (autoStop) {
                if (typeof stream.getTracks === 'function') {
                  stream.getTracks().forEach(function (track) {
                    track.stop();
                  });
                } else if (typeof stream.stop === 'function') {
                  // TODO: check type;
                  stream.stop();
                }
              }
              return _context8.a(2, stream);
          }
        }, _callee8);
      }));
      function _getUserMedia() {
        return _getUserMedia2.apply(this, arguments);
      }
      return _getUserMedia;
    }()
    /**
     * Get user media permission
     * !!! Don't use `@delegate('client')` or `@delegate('mainClient')`  here,
     * !!! because in shared tab, server tab should be executed and in safari each tab has its own permission
     */
  }, {
    key: "ensureGetUserMediaPermission",
    value: (function () {
      var _ensureGetUserMediaPermission = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var _t2;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              if (global.document) {
                _context9.n = 1;
                break;
              }
              return _context9.a(2);
            case 1:
              if (navigator.mediaDevices.getUserMedia) {
                _context9.n = 2;
                break;
              }
              return _context9.a(2);
            case 2:
              _context9.p = 2;
              if (!this._getUserMediaPromise) {
                this._getUserMediaPromise = this._getUserMedia();
              }
              _context9.n = 3;
              return this._getUserMediaPromise;
            case 3:
              this._getUserMediaPromise = null;
              _context9.n = 4;
              return this._onGetUserMediaSuccess();
            case 4:
              _context9.n = 5;
              return this.checkDevices();
            case 5:
              _context9.n = 7;
              break;
            case 6:
              _context9.p = 6;
              _t2 = _context9.v;
              this._getUserMediaPromise = null;
              this.onGetUserMediaError();
            case 7:
              return _context9.a(2);
          }
        }, _callee9, this, [[2, 6]]);
      }));
      function ensureGetUserMediaPermission() {
        return _ensureGetUserMediaPermission.apply(this, arguments);
      }
      return ensureGetUserMediaPermission;
    }())
  }, {
    key: "_onGetUserMediaSuccess",
    value: function () {
      var _onGetUserMediaSuccess2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              _context0.n = 1;
              return this._toast.dismissByGroup([this.identifier]);
            case 1:
              this.setUserMediaSuccess();
            case 2:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function _onGetUserMediaSuccess() {
        return _onGetUserMediaSuccess2.apply(this, arguments);
      }
      return _onGetUserMediaSuccess;
    }()
  }, {
    key: "showPermissionAlert",
    value: function () {
      var _showPermissionAlert = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(ttl) {
        var _this5 = this;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              if (!this._showCheckMediaAlert) {
                _context1.n = 1;
                break;
              }
              return _context1.a(2, this.uniqueManager.unique(function () {
                return _this5._toast.open(_this5.noPermissionToast);
              }, 'keep'));
            case 1:
              this._toast.danger({
                message: this._getUserMediaPermissionMessage(),
                allowDuplicates: false,
                group: this.identifier,
                ttl: ttl
              });
            case 2:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function showPermissionAlert(_x3) {
        return _showPermissionAlert.apply(this, arguments);
      }
      return showPermissionAlert;
    }()
  }, {
    key: "onGetUserMediaError",
    value: function () {
      var _onGetUserMediaError = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              this.setUserMediaError();
              this.showPermissionAlert();
            case 1:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function onGetUserMediaError() {
        return _onGetUserMediaError.apply(this, arguments);
      }
      return onGetUserMediaError;
    }()
  }, {
    key: "_getUserMediaPermissionMessage",
    value: function _getUserMediaPermissionMessage() {
      return (0, _i18n.t)('userMediaPermission', {
        application: this._brand.appName
      });
    }
  }, {
    key: "checkAudioAvailable",
    value: function () {
      var _checkAudioAvailable = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(options) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              if (this.userMedia) {
                _context11.n = 1;
                break;
              }
              this.showPermissionAlert(30 * 1000);
              if (options.checkIfNoDevices) {
                _context11.n = 1;
                break;
              }
              return _context11.a(2);
            case 1:
              this.ensureGetUserMediaPermission();
            case 2:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function checkAudioAvailable(_x4) {
        return _checkAudioAvailable.apply(this, arguments);
      }
      return checkAudioAvailable;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(_ref6) {
        var _ref6$ringtoneVolume, ringtoneVolume, _ref6$callVolume, callVolume, _ref6$ringtoneDeviceI, ringtoneDeviceId, _ref6$outputDeviceId, outputDeviceId, _ref6$outputDeviceLab, outputDeviceLabel, _ref6$inputDeviceId, inputDeviceId, _ref6$inputDeviceLabe, inputDeviceLabel, _ref6$isAGCEnabled, isAGCEnabled, _ref6$hasAutoPrompted, hasAutoPrompted;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              _ref6$ringtoneVolume = _ref6.ringtoneVolume, ringtoneVolume = _ref6$ringtoneVolume === void 0 ? this.ringtoneVolume : _ref6$ringtoneVolume, _ref6$callVolume = _ref6.callVolume, callVolume = _ref6$callVolume === void 0 ? this.callVolume : _ref6$callVolume, _ref6$ringtoneDeviceI = _ref6.ringtoneDeviceId, ringtoneDeviceId = _ref6$ringtoneDeviceI === void 0 ? this.ringtoneDeviceId : _ref6$ringtoneDeviceI, _ref6$outputDeviceId = _ref6.outputDeviceId, outputDeviceId = _ref6$outputDeviceId === void 0 ? this.data.outputDeviceId : _ref6$outputDeviceId, _ref6$outputDeviceLab = _ref6.outputDeviceLabel, outputDeviceLabel = _ref6$outputDeviceLab === void 0 ? this.data.outputDeviceLabel : _ref6$outputDeviceLab, _ref6$inputDeviceId = _ref6.inputDeviceId, inputDeviceId = _ref6$inputDeviceId === void 0 ? this.data.inputDeviceId : _ref6$inputDeviceId, _ref6$inputDeviceLabe = _ref6.inputDeviceLabel, inputDeviceLabel = _ref6$inputDeviceLabe === void 0 ? this.data.inputDeviceLabel : _ref6$inputDeviceLabe, _ref6$isAGCEnabled = _ref6.isAGCEnabled, isAGCEnabled = _ref6$isAGCEnabled === void 0 ? this.isAGCEnabled : _ref6$isAGCEnabled, _ref6$hasAutoPrompted = _ref6.hasAutoPrompted, hasAutoPrompted = _ref6$hasAutoPrompted === void 0 ? this.data.hasAutoPrompted : _ref6$hasAutoPrompted;
              this._setData({
                ringtoneVolume: Math.min(1, Math.max(0, ringtoneVolume)),
                callVolume: Math.min(1, Math.max(0, callVolume)),
                ringtoneDeviceId: ringtoneDeviceId,
                outputDeviceId: outputDeviceId,
                outputDeviceLabel: outputDeviceLabel,
                inputDeviceId: inputDeviceId,
                inputDeviceLabel: inputDeviceLabel,
                isAGCEnabled: isAGCEnabled,
                hasAutoPrompted: hasAutoPrompted
              });
            case 1:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function setData(_x5) {
        return _setData2.apply(this, arguments);
      }
      return setData;
    }()
  }, {
    key: "ringtoneDeviceId",
    get: function get() {
      return this.data.ringtoneDeviceId;
    }
  }, {
    key: "outputDeviceId",
    get: function get() {
      var outputDeviceId = this.data.outputDeviceId;
      // https://issues.chromium.org/issues/40199570
      // there seems to be an issue where using the 'default' device id may be ambiguous
      // so here we do a best effort approach to use the actual device id if possible
      if (this._isDefaultDeviceId(outputDeviceId)) {
        var _this$availableOutput, _outputDevice$deviceI;
        var groupId = (_this$availableOutput = this.availableOutputDevices.find(function (device) {
          return device.deviceId === outputDeviceId;
        })) === null || _this$availableOutput === void 0 ? void 0 : _this$availableOutput.groupId;
        var outputDevice = this.availableOutputDevices.find(function (device) {
          return device.groupId === groupId && device.deviceId !== outputDeviceId;
        });
        return (_outputDevice$deviceI = outputDevice === null || outputDevice === void 0 ? void 0 : outputDevice.deviceId) !== null && _outputDevice$deviceI !== void 0 ? _outputDevice$deviceI : outputDeviceId;
      }
      return outputDeviceId;
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
    key: "outputDeviceLabel",
    get: function get() {
      return this.data.outputDeviceLabel;
    }
  }, {
    key: "setOutputDevice",
    value: function () {
      var _setOutputDevice = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(deviceId) {
        var _device$label;
        var device;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              device = (0, _ramda.find)(function (device) {
                return device.deviceId === deviceId;
              }, this.availableOutputDevices);
              this.setData({
                outputDeviceId: deviceId,
                outputDeviceLabel: (_device$label = device === null || device === void 0 ? void 0 : device.label) !== null && _device$label !== void 0 ? _device$label : null
              });
            case 1:
              return _context13.a(2);
          }
        }, _callee13, this);
      }));
      function setOutputDevice(_x6) {
        return _setOutputDevice.apply(this, arguments);
      }
      return setOutputDevice;
    }()
  }, {
    key: "inputDeviceId",
    get: function get() {
      var inputDeviceId = this.data.inputDeviceId;
      // https://issues.chromium.org/issues/40199570
      // there seems to be an issue where using the 'default' device id may be ambiguous
      // so here we do a best effort approach to use the actual device id if possible
      if (this._isDefaultDeviceId(inputDeviceId)) {
        var _this$availableInputD, _inputDevice$deviceId;
        var groupId = (_this$availableInputD = this.availableInputDevices.find(function (device) {
          return device.deviceId === inputDeviceId;
        })) === null || _this$availableInputD === void 0 ? void 0 : _this$availableInputD.groupId;
        var inputDevice = this.availableInputDevices.find(function (device) {
          return device.groupId === groupId && device.deviceId !== inputDeviceId;
        });
        return (_inputDevice$deviceId = inputDevice === null || inputDevice === void 0 ? void 0 : inputDevice.deviceId) !== null && _inputDevice$deviceId !== void 0 ? _inputDevice$deviceId : inputDeviceId;
      }
      return inputDeviceId;
    }
  }, {
    key: "getInputDeviceOptions",
    value: function () {
      var _getInputDeviceOptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var _t3;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              _context14.n = 1;
              return this.checkDevices();
            case 1:
              this.logger.info("getInputDeviceOptions: inputDeviceId: ".concat(this.inputDeviceId));
              if (!this.inputDeviceId) {
                _context14.n = 5;
                break;
              }
              _context14.p = 2;
              _context14.n = 3;
              return this._getUserMedia({
                deviceId: {
                  exact: this.inputDeviceId
                }
              });
            case 3:
              return _context14.a(2, {
                deviceId: {
                  exact: this.inputDeviceId
                }
              });
            case 4:
              _context14.p = 4;
              _t3 = _context14.v;
              this.logger.info("getInputDeviceOptions: browser doesn't accept the exact deviceId, err: ", _t3);
            case 5:
              this.logger.info('getInputDeviceOptions: default to true for audio constraints');
              return _context14.a(2, true);
          }
        }, _callee14, this, [[2, 4]]);
      }));
      function getInputDeviceOptions() {
        return _getInputDeviceOptions.apply(this, arguments);
      }
      return getInputDeviceOptions;
    }()
  }, {
    key: "inputDevice",
    get: function get() {
      var _this7 = this;
      return (0, _ramda.find)(function (device) {
        return device.kind === 'audioinput' && device.deviceId === _this7.inputDeviceId;
      }, this.availableDevices);
    }
  }, {
    key: "inputDeviceLabel",
    get: function get() {
      return this.data.inputDeviceLabel;
    }
  }, {
    key: "setInputDevice",
    value: function () {
      var _setInputDevice = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(deviceId) {
        var _device$label2;
        var device;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              device = (0, _ramda.find)(function (device) {
                return device.deviceId === deviceId;
              }, this.availableInputDevices);
              this.setData({
                inputDeviceId: deviceId,
                inputDeviceLabel: (_device$label2 = device === null || device === void 0 ? void 0 : device.label) !== null && _device$label2 !== void 0 ? _device$label2 : null
              });
            case 1:
              return _context15.a(2);
          }
        }, _callee15, this);
      }));
      function setInputDevice(_x7) {
        return _setInputDevice.apply(this, arguments);
      }
      return setInputDevice;
    }()
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
    key: "enableActiveCallAudioControl",
    get: function get() {
      return process.env.THEME_SYSTEM === 'spring-ui';
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
    key: "isAGCEnabled",
    get: function get() {
      return this.data.isAGCEnabled;
    }
  }, {
    key: "isSupportAGC",
    get: function get() {
      try {
        var constraints = navigator.mediaDevices.getSupportedConstraints();
        return !!constraints.autoGainControl;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('failed to get autoGainControl support:', err);
        return false;
      }
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "data", [_nextCore.userStorage, _nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _objectSpread({}, DEFAULT_VALUE);
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "availableDevices", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "hasUserMedia", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setHasAutoPrompted", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "setHasAutoPrompted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setUserMediaError", [_nextCore.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "setUserMediaError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setUserMediaSuccess", [_nextCore.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "_setUserMediaSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setUserMediaSuccess", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "setUserMediaSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setAvailableDevices", [_nextCore.action, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAvailableDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAvailableDevices", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "setAvailableDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setData", [_nextCore.action, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "_setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "markAutoPrompted", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "markAutoPrompted"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onInit", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "onInit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoGainControl", [_dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoGainControl"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ensureGetUserMediaPermission", [_dec30, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "ensureGetUserMediaPermission"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onGetUserMediaSuccess", [_dec33, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "_onGetUserMediaSuccess"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "noPermissionToast", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;
    return this._toast.create({
      view: function view() {
        var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
          t = _useLocale.t;
        var checkPermissionAction = process.env.THEME_SYSTEM === 'spring-ui' ? /*#__PURE__*/_react["default"].createElement("button", {
          type: "button",
          className: "underline",
          onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
            return _regenerator().w(function (_context16) {
              while (1) switch (_context16.n) {
                case 0:
                  _context16.n = 1;
                  return _this8.ensureGetUserMediaPermission();
                case 1:
                  return _context16.a(2);
              }
            }, _callee16);
          })),
          "data-sign": "checkPermissionAction"
        }, t('checkPermission')) : /*#__PURE__*/_react["default"].createElement(_Link.RcLink, {
          color: "inherit",
          underline: true,
          style: {
            fontStyle: 'inherit'
          },
          onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
            return _regenerator().w(function (_context17) {
              while (1) switch (_context17.n) {
                case 0:
                  _context17.n = 1;
                  return _this8.ensureGetUserMediaPermission();
                case 1:
                  return _context17.a(2);
              }
            }, _callee17);
          })),
          "data-sign": "checkPermissionAction"
        }, t('checkPermission'));
        return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
          message: t('checkMediaPermission'),
          values: {
            checkPermissionAction: checkPermissionAction,
            brandName: _this8._brand.name
          }
        });
      },
      props: function props() {
        return {
          level: 'warning',
          ttl: 0,
          group: _this8.identifier
        };
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "showPermissionAlert", [_dec36, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "showPermissionAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onGetUserMediaError", [_dec39, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "onGetUserMediaError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkAudioAvailable", [_dec42, _dec43, _dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "checkAudioAvailable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_dec45, _dec46, _dec47], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "outputDeviceId", [_nextCore.computed, _dec48, _dec49], Object.getOwnPropertyDescriptor(_class2.prototype, "outputDeviceId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOutputDevice", [_dec50, _dec51, _dec52], Object.getOwnPropertyDescriptor(_class2.prototype, "setOutputDevice"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inputDeviceId", [_nextCore.computed, _dec53, _dec54], Object.getOwnPropertyDescriptor(_class2.prototype, "inputDeviceId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setInputDevice", [_dec55, _dec56, _dec57], Object.getOwnPropertyDescriptor(_class2.prototype, "setInputDevice"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableOutputDevices", [_nextCore.computed, _dec58, _dec59], Object.getOwnPropertyDescriptor(_class2.prototype, "availableOutputDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableRingtoneDevices", [_nextCore.computed, _dec60, _dec61], Object.getOwnPropertyDescriptor(_class2.prototype, "availableRingtoneDevices"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableInputDevices", [_nextCore.computed, _dec62, _dec63], Object.getOwnPropertyDescriptor(_class2.prototype, "availableInputDevices"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=AudioSettings.js.map
