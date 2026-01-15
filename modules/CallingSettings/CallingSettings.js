"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
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
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettings = exports.BLOCKED_ID_VALUE = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _core = require("@ringcentral-integration/core");
var _contactHelper = require("../../lib/contactHelper");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _callingModes = require("./callingModes");
var _callingOptions = require("./callingOptions");
var _callingSettingsMessages = require("./callingSettingsMessages");
var _deprecatedCallingOptions = require("./deprecatedCallingOptions");
var _mapOptionToMode = require("./mapOptionToMode");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2;
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
var LOCATION_NUMBER_ORDER = ['Other', 'Main'];
var BLOCKED_ID_VALUE = exports.BLOCKED_ID_VALUE = 'anonymous';
/**
 * @class
 * @description Call setting managing module
 */
var CallingSettings = exports.CallingSettings = (_dec = (0, _di.Module)({
  name: 'CallingSettings',
  deps: ['Alert', 'Brand', 'Storage', 'ExtensionInfo', 'ExtensionDevice', 'ForwardingNumber', 'AppFeatures', 'ExtensionFeatures', 'ExtensionPhoneNumber', {
    dep: 'CallerId',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'Softphone',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'CallingSettingsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.extensionPhoneNumber.directNumbers, that._deps.extensionPhoneNumber.mainCompanyNumber, that._deps.extensionInfo.extensionNumber];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.forwardingNumber.flipNumbers, that._deps.extensionPhoneNumber.callerIdNumbers, that._deps.extensionPhoneNumber.directNumbers];
}), _dec4 = (0, _core.computed)(function (that) {
  return [that._deps.appFeatures.isRingOutEnabled, that._deps.appFeatures.isWebPhoneEnabled, that._deps.appFeatures.isSoftphoneEnabled, that.otherPhoneNumbers.length, that._deps.extensionPhoneNumber.numbers.length];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that._deps.extensionPhoneNumber.callerIdNumbers];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.myPhoneNumbers, that.otherPhoneNumbers];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.availableNumbers];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function CallingSettings(deps) {
    var _this$_deps$callingSe, _this$_deps$callingSe2, _this$_deps$callingSe3, _this$_deps$callingSe4, _this$_deps$callingSe5, _this$_deps$callingSe6, _this$_deps$callingSe7, _this$_deps$callingSe8;
    var _this;
    _classCallCheck(this, CallingSettings);
    _this = _callSuper(this, CallingSettings, [{
      deps: deps,
      enableCache: true,
      storageKey: 'CallingSettings'
    }]);
    _this._myPhoneNumbers = void 0;
    _this._onFirstLogin = void 0;
    _this._ringoutEnabled = void 0;
    _this._otherPhoneNumbers = void 0;
    _this._webphoneEnabled = void 0;
    _this._blockedIdDisabled = void 0;
    _this._showCallWithJupiter = void 0;
    _this._emergencyCallAvailable = void 0;
    _this._showCustomPhoneLabel = void 0;
    _this._availableNumbers = void 0;
    _this.initRingoutPrompt = void 0;
    // For Japan Emergency Service notification
    _initializerDefineProperty(_this, "acknowledgeJPMessage", _descriptor, _this);
    _initializerDefineProperty(_this, "data", _descriptor2, _this);
    _this._onFirstLogin = (_this$_deps$callingSe = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe === void 0 ? void 0 : _this$_deps$callingSe.onFirstLogin;
    _this.initRingoutPrompt = (_this$_deps$callingSe2 = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe2 === void 0 ? void 0 : _this$_deps$callingSe2.defaultRingoutPrompt;
    _this._showCallWithJupiter = (_this$_deps$callingSe3 = (_this$_deps$callingSe4 = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe4 === void 0 ? void 0 : _this$_deps$callingSe4.showCallWithJupiter) !== null && _this$_deps$callingSe3 !== void 0 ? _this$_deps$callingSe3 : true;
    _this._emergencyCallAvailable = (_this$_deps$callingSe5 = (_this$_deps$callingSe6 = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe6 === void 0 ? void 0 : _this$_deps$callingSe6.emergencyCallAvailable) !== null && _this$_deps$callingSe5 !== void 0 ? _this$_deps$callingSe5 : !!_this._deps.webphone;
    _this._showCustomPhoneLabel = (_this$_deps$callingSe7 = (_this$_deps$callingSe8 = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe8 === void 0 ? void 0 : _this$_deps$callingSe8.showCustomPhoneLabel) !== null && _this$_deps$callingSe7 !== void 0 ? _this$_deps$callingSe7 : false;
    return _this;
  }
  _inherits(CallingSettings, _RcModuleV);
  return _createClass(CallingSettings, [{
    key: "callWith",
    get: function get() {
      return this.data.callWith;
    }
  }, {
    key: "ringoutPrompt",
    get: function get() {
      return this.data.ringoutPrompt;
    }
  }, {
    key: "myLocation",
    get: function get() {
      return this.data.myLocation;
    }
  }, {
    key: "fromNumber",
    get: function get() {
      return this.data.fromNumber;
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this.data.timestamp;
    }
  }, {
    key: "isCustomLocation",
    get: function get() {
      return this.data.isCustomLocation;
    }
  }, {
    key: "setDataAction",
    value: function setDataAction(_ref) {
      var _ref$callWith = _ref.callWith,
        callWith = _ref$callWith === void 0 ? this.callWith : _ref$callWith,
        _ref$ringoutPrompt = _ref.ringoutPrompt,
        ringoutPrompt = _ref$ringoutPrompt === void 0 ? this.ringoutPrompt : _ref$ringoutPrompt,
        _ref$myLocation = _ref.myLocation,
        myLocation = _ref$myLocation === void 0 ? this.myLocation : _ref$myLocation,
        _ref$timestamp = _ref.timestamp,
        timestamp = _ref$timestamp === void 0 ? this.timestamp : _ref$timestamp,
        _ref$isCustomLocation = _ref.isCustomLocation,
        isCustomLocation = _ref$isCustomLocation === void 0 ? this.isCustomLocation : _ref$isCustomLocation;
      this.data.callWith = callWith;
      this.data.ringoutPrompt = ringoutPrompt;
      this.data.myLocation = myLocation;
      this.data.timestamp = timestamp;
      this.data.isCustomLocation = isCustomLocation;
    }
  }, {
    key: "_updateFromNumber",
    value: function _updateFromNumber(number) {
      // TODO: should confirm is that should be undefined
      this.data.fromNumber = number === null || number === void 0 ? void 0 : number.phoneNumber;
    }
  }, {
    key: "updateFromNumber",
    value: function () {
      var _updateFromNumber2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(number) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._updateFromNumber(number);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function updateFromNumber(_x) {
        return _updateFromNumber2.apply(this, arguments);
      }
      return updateFromNumber;
    }()
  }, {
    key: "setAcknowledgeJPMessage",
    value: function setAcknowledgeJPMessage(value) {
      this.acknowledgeJPMessage = value;
    }
  }, {
    key: "resetSuccess",
    value: function resetSuccess() {
      this.data.fromNumber = null;
      this.setAcknowledgeJPMessage(false);
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(!this._shouldReset() && !this._shouldInit() && this._shouldValidate())) {
                _context2.n = 1;
                break;
              }
              this._ringoutEnabled = this._deps.appFeatures.isRingOutEnabled;
              this._webphoneEnabled = this._deps.appFeatures.isWebPhoneEnabled;
              this._myPhoneNumbers = this.myPhoneNumbers;
              this._otherPhoneNumbers = this.otherPhoneNumbers;
              this._blockedIdDisabled = this.isBlockedIdDisabled;
              _context2.n = 1;
              return this._validateSettings();
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "onInitSuccess",
    value: function () {
      var _onInitSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (this.isWebphoneMode) {
                this._verifyJPEmergency();
              }
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function onInitSuccess() {
        return _onInitSuccess.apply(this, arguments);
      }
      return onInitSuccess;
    }()
  }, {
    key: "_shouldValidate",
    value: function _shouldValidate() {
      return this.ready && (this._ringoutEnabled !== this._deps.appFeatures.isRingOutEnabled || this._webphoneEnabled !== this._deps.appFeatures.isWebPhoneEnabled || this._myPhoneNumbers !== this.myPhoneNumbers || this._otherPhoneNumbers !== this.otherPhoneNumbers || this._blockedIdDisabled !== this.isBlockedIdDisabled);
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._init();
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
    key: "onReset",
    value: function onReset() {
      this.resetSuccess();
    }
  }, {
    key: "_handleFirstTimeLogin",
    value: function _handleFirstTimeLogin() {
      if (!this.timestamp) {
        // first time login
        var defaultCallWith = this.callWithOptions && this.callWithOptions[0];
        this.setDataAction({
          callWith: defaultCallWith,
          timestamp: Date.now()
        });
        if (!this._emergencyCallAvailable) {
          this._warningEmergencyCallingNotAvailable();
        }
        if (typeof this._onFirstLogin === 'function') {
          this._onFirstLogin();
        }
      }
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (this._deps.appFeatures.isCallingEnabled) {
                _context5.n = 1;
                break;
              }
              this.setDataAction({
                callWith: null,
                timestamp: null
              });
              return _context5.a(2);
            case 1:
              this._myPhoneNumbers = this.myPhoneNumbers;
              this._otherPhoneNumbers = this.otherPhoneNumbers;
              this._availableNumbers = this.availableNumbers;
              this._ringoutEnabled = this._deps.appFeatures.isRingOutEnabled;
              this._webphoneEnabled = this._deps.appFeatures.isWebPhoneEnabled;
              this._blockedIdDisabled = this.isBlockedIdDisabled;
              this._handleFirstTimeLogin();
              if (this.callWith === _deprecatedCallingOptions.deprecatedCallingOptions.myphone || this.callWith === _deprecatedCallingOptions.deprecatedCallingOptions.otherphone || this.callWith === _deprecatedCallingOptions.deprecatedCallingOptions.customphone) {
                this.setDataAction({
                  callWith: _callingOptions.callingOptions.ringout,
                  isCustomLocation: this.callWith === _deprecatedCallingOptions.deprecatedCallingOptions.customphone
                });
              }
              _context5.n = 2;
              return this._validateSettings();
            case 2:
              _context5.n = 3;
              return this._initFromNumber();
            case 3:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _init() {
        return _init2.apply(this, arguments);
      }
      return _init;
    }()
  }, {
    key: "_warningEmergencyCallingNotAvailable",
    value: function () {
      var _warningEmergencyCallingNotAvailable2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (this.callWith === _callingOptions.callingOptions.browser) {
                this._deps.alert.warning({
                  message: _callingSettingsMessages.callingSettingsMessages.emergencyCallingNotAvailable,
                  ttl: 0
                });
              }
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function _warningEmergencyCallingNotAvailable() {
        return _warningEmergencyCallingNotAvailable2.apply(this, arguments);
      }
      return _warningEmergencyCallingNotAvailable;
    }()
  }, {
    key: "_validateSettings",
    value: function () {
      var _validateSettings2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!this._hasWebphonePermissionRemoved()) {
                _context7.n = 2;
                break;
              }
              if (!this._deps.appFeatures.isSoftphoneEnabled) {
                _context7.n = 1;
                break;
              }
              _context7.n = 1;
              return this._setSoftPhoneToCallWith();
            case 1:
              this._deps.alert.danger({
                message: _callingSettingsMessages.callingSettingsMessages.webphonePermissionRemoved,
                ttl: 0
              });
              _context7.n = 5;
              break;
            case 2:
              if (!this._hasPermissionChanged()) {
                _context7.n = 4;
                break;
              }
              if (!this._deps.appFeatures.isSoftphoneEnabled) {
                _context7.n = 3;
                break;
              }
              _context7.n = 3;
              return this._setSoftPhoneToCallWith();
            case 3:
              this._deps.alert.danger({
                message: _callingSettingsMessages.callingSettingsMessages.permissionChanged,
                ttl: 0
              });
              _context7.n = 5;
              break;
            case 4:
              if (this._hasPhoneNumberChanged()) {
                this.setDataAction({
                  callWith: _callingOptions.callingOptions.ringout,
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  myLocation: this._myPhoneNumbers[0],
                  timestamp: Date.now()
                });
                this._deps.alert.danger({
                  message: _callingSettingsMessages.callingSettingsMessages.phoneNumberChanged,
                  ttl: 0
                });
              }
            case 5:
              if (this.isBlockedIdDisabled && this.fromNumber === BLOCKED_ID_VALUE) {
                this._initFromNumber();
              }
            case 6:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _validateSettings() {
        return _validateSettings2.apply(this, arguments);
      }
      return _validateSettings;
    }()
  }, {
    key: "_verifyJPEmergency",
    value: function () {
      var _verifyJPEmergency2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var hasJapanNumber;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!this.acknowledgeJPMessage) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2);
            case 1:
              hasJapanNumber = !!this.fromNumbers.find(function (record) {
                var _record$country;
                return (record === null || record === void 0 ? void 0 : (_record$country = record.country) === null || _record$country === void 0 ? void 0 : _record$country.id) === '112';
              });
              if (hasJapanNumber) {
                this._deps.alert.warning({
                  message: _callingSettingsMessages.callingSettingsMessages.disableEmergencyInJapan,
                  ttl: 0
                });
                this.setAcknowledgeJPMessage(true);
              }
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function _verifyJPEmergency() {
        return _verifyJPEmergency2.apply(this, arguments);
      }
      return _verifyJPEmergency;
    }()
  }, {
    key: "_setSoftPhoneToCallWith",
    value: function () {
      var _setSoftPhoneToCallWith2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              this.setDataAction({
                callWith: _callingOptions.callingOptions.softphone,
                timestamp: Date.now()
              });
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function _setSoftPhoneToCallWith() {
        return _setSoftPhoneToCallWith2.apply(this, arguments);
      }
      return _setSoftPhoneToCallWith;
    }()
  }, {
    key: "_hasWebphonePermissionRemoved",
    value: function _hasWebphonePermissionRemoved() {
      return !(this._webphoneEnabled && this._deps.webphone) && this.callWith === _callingOptions.callingOptions.browser;
    }
  }, {
    key: "_hasPermissionChanged",
    value: function _hasPermissionChanged() {
      return !this._ringoutEnabled && this.callWith === _callingOptions.callingOptions.ringout;
    }
  }, {
    key: "_hasPhoneNumberChanged",
    value: function _hasPhoneNumberChanged() {
      return this.callWith === _callingOptions.callingOptions.ringout && !this.isCustomLocation && this._availableNumbers.indexOf(this.myLocation) === -1;
    }
  }, {
    key: "_getLocationLabel",
    value: function _getLocationLabel(phoneNumber) {
      var devices = this._deps.extensionDevice.devices;
      var flipNumbers = this._deps.forwardingNumber.flipNumbers;
      var _this$_deps$extension = this._deps.extensionPhoneNumber,
        mainCompanyNumber = _this$_deps$extension.mainCompanyNumber,
        numbers = _this$_deps$extension.numbers;
      var extensionNumber = this._deps.extensionInfo.extensionNumber;
      var name = null;
      if (this._showCustomPhoneLabel && numbers.length) {
        var label = (0, _contactHelper.getExtensionPhoneNumberLabel)(phoneNumber, numbers);
        if (label) {
          return label;
        }
      }
      if (devices.length) {
        var registeredWithDevice = false;
        devices.forEach(function (device) {
          var phoneLines = device.phoneLines;
          if (phoneLines === null || phoneLines === void 0 ? void 0 : phoneLines.length) {
            registeredWithDevice = !!phoneLines.find(function (phoneLine) {
              var _phoneLine$phoneInfo;
              return ((_phoneLine$phoneInfo = phoneLine.phoneInfo) === null || _phoneLine$phoneInfo === void 0 ? void 0 : _phoneLine$phoneInfo.phoneNumber) === phoneNumber;
            });
            if (registeredWithDevice) {
              name = device.name;
            }
          }
        });
        if (name) return name;
      }
      if (flipNumbers.length) {
        var isFlipNumber = flipNumbers.find(function (flipNumber) {
          return flipNumber.phoneNumber === phoneNumber;
        });
        if (isFlipNumber) {
          return isFlipNumber.label || 'Other';
        }
      }
      var mainPhoneNumber = "".concat(mainCompanyNumber === null || mainCompanyNumber === void 0 ? void 0 : mainCompanyNumber.phoneNumber, "*").concat(extensionNumber);
      if (phoneNumber === mainPhoneNumber) {
        return 'Main';
      }
      return 'Other';
    }
  }, {
    key: "_initFromNumber",
    value: function () {
      var _initFromNumber2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var fromNumber, _this$_deps$callerId, defaultCallerId, _this$_deps$callerId2, _this$_deps$callerId3, defaultPhoneNumber, defaultEntry;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              fromNumber = this.fromNumber;
              if (!(!fromNumber || fromNumber === BLOCKED_ID_VALUE && this.isBlockedIdDisabled)) {
                _context0.n = 1;
                break;
              }
              defaultCallerId = this.fromNumbers[0];
              if ((_this$_deps$callerId = this._deps.callerId) === null || _this$_deps$callerId === void 0 ? void 0 : _this$_deps$callerId.ringOut) {
                if (this._deps.callerId.ringOut.type === 'Blocked' && !this.isBlockedIdDisabled) {
                  defaultCallerId = {
                    phoneNumber: BLOCKED_ID_VALUE
                  };
                } else if (this._deps.callerId.ringOut.type === 'PhoneNumber') {
                  defaultPhoneNumber = (_this$_deps$callerId2 = this._deps.callerId) === null || _this$_deps$callerId2 === void 0 ? void 0 : (_this$_deps$callerId3 = _this$_deps$callerId2.ringOut.phoneInfo) === null || _this$_deps$callerId3 === void 0 ? void 0 : _this$_deps$callerId3.phoneNumber;
                  defaultEntry = this.fromNumbers.find(function (item) {
                    return item.phoneNumber === defaultPhoneNumber;
                  });
                  if (defaultEntry) {
                    defaultCallerId = defaultEntry;
                  }
                }
              }
              _context0.n = 1;
              return this.updateFromNumber(defaultCallerId);
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function _initFromNumber() {
        return _initFromNumber2.apply(this, arguments);
      }
      return _initFromNumber;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(_ref2, withPrompt) {
        var callWith, myLocation, ringoutPrompt, isCustomLocation;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              callWith = _ref2.callWith, myLocation = _ref2.myLocation, ringoutPrompt = _ref2.ringoutPrompt, isCustomLocation = _ref2.isCustomLocation;
              this.setDataAction({
                callWith: callWith,
                myLocation: myLocation,
                ringoutPrompt: ringoutPrompt,
                timestamp: Date.now(),
                isCustomLocation: isCustomLocation
              });
              if (withPrompt) {
                if (this.callWith === _callingOptions.callingOptions.softphone) {
                  this._deps.alert.success({
                    message: _callingSettingsMessages.callingSettingsMessages.saveSuccessWithSoftphone
                  });
                } else if (this.callWith === _callingOptions.callingOptions.jupiter) {
                  this._deps.alert.success({
                    message: _callingSettingsMessages.callingSettingsMessages.saveSuccessWithJupiter
                  });
                } else {
                  this._deps.alert.success({
                    message: _callingSettingsMessages.callingSettingsMessages.saveSuccess
                  });
                  if (!this._emergencyCallAvailable) {
                    this._warningEmergencyCallingNotAvailable();
                  }
                }
              }
              if (this.isWebphoneMode) {
                this._verifyJPEmergency();
              }
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function setData(_x2, _x3) {
        return _setData.apply(this, arguments);
      }
      return setData;
    }()
  }, {
    key: "myPhoneNumbers",
    get: function get() {
      var _this$_deps$extension2 = this._deps.extensionPhoneNumber,
        directNumbers = _this$_deps$extension2.directNumbers,
        mainCompanyNumber = _this$_deps$extension2.mainCompanyNumber;
      var extensionNumber = this._deps.extensionInfo.extensionNumber;
      var myPhoneNumbers = directNumbers.map(function (item) {
        return item.phoneNumber;
      });
      if (mainCompanyNumber && extensionNumber) {
        myPhoneNumbers.push("".concat(mainCompanyNumber.phoneNumber, "*").concat(extensionNumber));
      }
      return myPhoneNumbers;
    }
  }, {
    key: "otherPhoneNumbers",
    get: function get() {
      var flipNumbers = this._deps.forwardingNumber.flipNumbers;
      var _this$_deps$extension3 = this._deps.extensionPhoneNumber,
        callerIdNumbers = _this$_deps$extension3.callerIdNumbers,
        directNumbers = _this$_deps$extension3.directNumbers;
      var filterMapping = {};
      callerIdNumbers.forEach(function (item) {
        filterMapping[item.phoneNumber] = true;
      });
      directNumbers.forEach(function (item) {
        filterMapping[item.phoneNumber] = true;
      });
      return flipNumbers.filter(function (item) {
        return !filterMapping[item.phoneNumber];
      }).sort(function (a, b) {
        return a.label === 'Mobile' && a.label !== b.label ? -1 : 1;
      }).map(function (item) {
        return item.phoneNumber;
      });
    }
  }, {
    key: "callWithOptions",
    get: function get() {
      var _this$_deps$appFeatur = this._deps.appFeatures,
        isRingOutEnabled = _this$_deps$appFeatur.isRingOutEnabled,
        isWebPhoneEnabled = _this$_deps$appFeatur.isWebPhoneEnabled;
      var hasExtensionPhoneNumber = this._deps.extensionPhoneNumber.numbers.length > 0;
      if (!hasExtensionPhoneNumber && this._deps.appFeatures.isSoftphoneEnabled) {
        return [_callingOptions.callingOptions.softphone];
      }
      if (!hasExtensionPhoneNumber && !this._deps.appFeatures.isSoftphoneEnabled) {
        return [];
      }
      var callWithOptions = [];
      if (this._deps.webphone && isWebPhoneEnabled) {
        callWithOptions.push(_callingOptions.callingOptions.browser);
      }
      if (this._deps.brand && this._showCallWithJupiter && this._deps.appFeatures.isRingCentralAppEnabled) {
        callWithOptions.push(_callingOptions.callingOptions.jupiter);
      }
      if (this._deps.appFeatures.isSoftphoneEnabled) {
        callWithOptions.push(_callingOptions.callingOptions.softphone);
      }
      if (isRingOutEnabled && this._deps.appFeatures.isRingOutEnabled) {
        callWithOptions.push(_callingOptions.callingOptions.ringout);
      }
      return callWithOptions;
    }
  }, {
    key: "fromNumbers",
    get: function get() {
      var callerIdNumbers = this._deps.extensionPhoneNumber.callerIdNumbers;
      var sortedPhoneNumbers = callerIdNumbers.sort(function (firstItem, lastItem) {
        if (firstItem.usageType === 'DirectNumber') return -1;
        if (lastItem.usageType === 'DirectNumber') return 1;
        if (firstItem.usageType === 'MainCompanyNumber') return -1;
        if (lastItem.usageType === 'MainCompanyNumber') return 1;
        if (firstItem.usageType < lastItem.usageType) return -1;
        if (firstItem.usageType > lastItem.usageType) return 1;
        return 0;
      });
      return sortedPhoneNumbers;
    }
  }, {
    key: "availableNumbers",
    get: function get() {
      return this.myPhoneNumbers.concat(this.otherPhoneNumbers);
    }
  }, {
    key: "availableNumbersWithLabel",
    get: function get() {
      var _this2 = this;
      var availableNumbers = this.availableNumbers;
      var result = [];
      if (availableNumbers.length) {
        availableNumbers.forEach(function (phoneNumber) {
          var locationLabel = _this2._getLocationLabel(phoneNumber);
          result.push({
            label: locationLabel,
            value: phoneNumber
          });
        });
      }
      result.sort(function (a, b) {
        return LOCATION_NUMBER_ORDER.indexOf(a.label) - LOCATION_NUMBER_ORDER.indexOf(b.label);
      });
      return result;
    }
  }, {
    key: "callingMode",
    get: function get() {
      return (0, _mapOptionToMode.mapOptionToMode)(this.callWith);
    }
  }, {
    key: "defaultRingoutPrompt",
    get: function get() {
      return this.initRingoutPrompt;
    }
  }, {
    key: "isWebphoneMode",
    get: function get() {
      return this.callingMode === _callingModes.callingModes.webphone;
    }

    /* ringtone */
  }, {
    key: "isChangeRingToneAllowed",
    get: function get() {
      return this._deps.webphone && (this._deps.storage.driver === 'INDEXEDDB' || this._deps.storage.driver === 'WEBSQL');
    }
  }, {
    key: "jupiterAppName",
    get: function get() {
      var _this$_deps$softphone;
      return (_this$_deps$softphone = this._deps.softphone) === null || _this$_deps$softphone === void 0 ? void 0 : _this$_deps$softphone.jupiterAppName;
    }

    /* India go */
  }, {
    key: "isBlockedIdDisabled",
    get: function get() {
      var _this$_deps$extension4, _this$_deps$extension5;
      return ((_this$_deps$extension4 = this._deps.extensionFeatures.features) === null || _this$_deps$extension4 === void 0 ? void 0 : (_this$_deps$extension5 = _this$_deps$extension4.BlockingCallerId) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.available) === false;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "acknowledgeJPMessage", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      callWith: null,
      ringoutPrompt: true,
      myLocation: '',
      fromNumber: null,
      timestamp: null,
      isCustomLocation: false
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setDataAction", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDataAction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateFromNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateFromNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAcknowledgeJPMessage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAcknowledgeJPMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_validateSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_verifyJPEmergency", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_verifyJPEmergency"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSoftPhoneToCallWith", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSoftPhoneToCallWith"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initFromNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_initFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "myPhoneNumbers", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "myPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "otherPhoneNumbers", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "otherPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callWithOptions", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "callWithOptions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fromNumbers", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "fromNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableNumbers", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "availableNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableNumbersWithLabel", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "availableNumbersWithLabel"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=CallingSettings.js.map
