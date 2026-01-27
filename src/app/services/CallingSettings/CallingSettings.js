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
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettings = exports.BLOCKED_ID_VALUE = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.every.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _FormattedMessage = _interopRequireDefault(require("@ringcentral-integration/widgets/components/FormattedMessage"));
var _Link = require("@ringcentral/juno/es6/components/Link/Link.js");
var _react = _interopRequireDefault(require("react"));
var _rxjs = require("rxjs");
var _CallerId = require("../CallerId");
var _ForwardingNumber = require("../ForwardingNumber");
var _Softphone = require("../Softphone");
var _Webphone = require("../Webphone");
var _callingModes = require("./callingModes");
var _callingOptions = require("./callingOptions");
var _i18n = _interopRequireWildcard(require("./i18n"));
var _mapOptionToMode = require("./mapOptionToMode");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _class, _class2, _descriptor, _descriptor2, _descriptor3;
/* eslint-disable react-hooks/rules-of-hooks */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var LOCATION_NUMBER_ORDER = ['Other', 'Main'];
var BLOCKED_ID_VALUE = exports.BLOCKED_ID_VALUE = 'anonymous';
var CallingSettings = exports.CallingSettings = (_dec = (0, _nextCore.injectable)({
  name: 'CallingSettings'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 10);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 11);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 12);
}, _dec5 = function _dec5(target, key) {
  return (0, _nextCore.optional)('TabManager')(target, undefined, 13);
}, _dec6 = function _dec6(target, key) {
  return (0, _nextCore.optional)('CallingSettingsOptions')(target, undefined, 14);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services.ExtensionDevice === "undefined" ? Object : _services.ExtensionDevice, typeof _ForwardingNumber.ForwardingNumber === "undefined" ? Object : _ForwardingNumber.ForwardingNumber, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.ExtensionFeatures === "undefined" ? Object : _services.ExtensionFeatures, typeof _services.ExtensionPhoneNumber === "undefined" ? Object : _services.ExtensionPhoneNumber, typeof _CallerId.CallerId === "undefined" ? Object : _CallerId.CallerId, typeof _Webphone.Webphone === "undefined" ? Object : _Webphone.Webphone, typeof _Softphone.Softphone === "undefined" ? Object : _Softphone.Softphone, Object, typeof CallingSettingsOptions === "undefined" ? Object : CallingSettingsOptions]), _dec9 = Reflect.metadata("design:type", Object), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [Object]), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [Object]), _dec12 = (0, _nextCore.delegate)('server'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [Object]), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [Boolean]), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec19 = (0, _nextCore.delegate)('server'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", []), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", []), _dec25 = (0, _nextCore.delegate)('server'), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", []), _dec28 = (0, _nextCore.delegate)('server'), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", []), _dec31 = (0, _nextCore.delegate)('server'), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", []), _dec34 = (0, _nextCore.delegate)('server'), _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", [typeof SetCallingSettingsData === "undefined" ? Object : SetCallingSettingsData, Boolean]), _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", []), _dec39 = Reflect.metadata("design:type", Function), _dec40 = Reflect.metadata("design:paramtypes", []), _dec41 = Reflect.metadata("design:type", Function), _dec42 = Reflect.metadata("design:paramtypes", []), _dec43 = Reflect.metadata("design:type", Function), _dec44 = Reflect.metadata("design:paramtypes", []), _dec45 = Reflect.metadata("design:type", Function), _dec46 = Reflect.metadata("design:paramtypes", []), _dec47 = Reflect.metadata("design:type", Function), _dec48 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function CallingSettings(_router, _toast, _brand, _storage, _extensionInfo, _extensionDevice, _forwardingNumber, _appFeatures, _extensionFeatures, _extensionPhoneNumber, _callerId, _webphone, _softphone, _tabManager, _callingSettingsOptions) {
    var _this$_callingSetting, _this$_callingSetting2, _this$_callingSetting3, _this$_callingSetting4, _this$_callingSetting5, _this$_callingSetting6;
    var _this;
    _classCallCheck(this, CallingSettings);
    _this = _callSuper(this, CallingSettings);
    _this._router = _router;
    _this._toast = _toast;
    _this._brand = _brand;
    _this._storage = _storage;
    _this._extensionInfo = _extensionInfo;
    _this._extensionDevice = _extensionDevice;
    _this._forwardingNumber = _forwardingNumber;
    _this._appFeatures = _appFeatures;
    _this._extensionFeatures = _extensionFeatures;
    _this._extensionPhoneNumber = _extensionPhoneNumber;
    _this._callerId = _callerId;
    _this._webphone = _webphone;
    _this._softphone = _softphone;
    _this._tabManager = _tabManager;
    _this._callingSettingsOptions = _callingSettingsOptions;
    _this._onFirstLogin = (_this$_callingSetting = _this._callingSettingsOptions) === null || _this$_callingSetting === void 0 ? void 0 : _this$_callingSetting.onFirstLogin;
    _this.initRingoutPrompt = (_this$_callingSetting2 = _this._callingSettingsOptions) === null || _this$_callingSetting2 === void 0 ? void 0 : _this$_callingSetting2.defaultRingoutPrompt;
    _this._showCallWithJupiter = (_this$_callingSetting3 = (_this$_callingSetting4 = _this._callingSettingsOptions) === null || _this$_callingSetting4 === void 0 ? void 0 : _this$_callingSetting4.showCallWithJupiter) !== null && _this$_callingSetting3 !== void 0 ? _this$_callingSetting3 : true;
    _this._emergencyCallAvailable = (_this$_callingSetting5 = (_this$_callingSetting6 = _this._callingSettingsOptions) === null || _this$_callingSetting6 === void 0 ? void 0 : _this$_callingSetting6.emergencyCallAvailable) !== null && _this$_callingSetting5 !== void 0 ? _this$_callingSetting5 : !!_this._webphone;
    /**
     * For Japan Emergency Service notification
     */
    _initializerDefineProperty(_this, "acknowledgeJPMessage", _descriptor, _this);
    _initializerDefineProperty(_this, "data", _descriptor2, _this);
    _initializerDefineProperty(_this, "linkToast", _descriptor3, _this);
    _this._storage.enable(_this, {
      migrations: [['data', 'CallingSettings-data'], ['acknowledgeJPMessage', 'CallingSettings-acknowledgeJPMessage']]
    });
    return _this;
  }
  _inherits(CallingSettings, _RcModule);
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
      var _this2 = this;
      var _ref$callWith = _ref.callWith,
        callWith = _ref$callWith === void 0 ? this.callWith : _ref$callWith,
        _ref$ringoutPrompt = _ref.ringoutPrompt,
        ringoutPrompt = _ref$ringoutPrompt === void 0 ? this.ringoutPrompt : _ref$ringoutPrompt,
        _ref$myLocation = _ref.myLocation,
        myLocation = _ref$myLocation === void 0 ? this.myLocation : _ref$myLocation,
        _ref$timestamp = _ref.timestamp,
        timestamp = _ref$timestamp === void 0 ? this.timestamp : _ref$timestamp;
      this.data.callWith = callWith;
      this.data.ringoutPrompt = ringoutPrompt;
      this.data.myLocation = myLocation;
      this.data.timestamp = timestamp;
      var isCustomLocation = this.availableNumbersWithLabel.every(function (item) {
        return item.value !== _this2.myLocation;
      });

      // save the custom location status in state to prevent the availableNumbersWithLabel change after user have custom that
      this.data.isCustomLocation = isCustomLocation;
    }
  }, {
    key: "_updateFromNumber",
    value: function _updateFromNumber(number) {
      this.data.fromNumber = number && (number === null || number === void 0 ? void 0 : number.phoneNumber) || null;
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
    key: "onInitSuccess",
    value: function () {
      var _onInitSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (this.isWebphoneMode) {
                this._verifyJPEmergency();
              }
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function onInitSuccess() {
        return _onInitSuccess.apply(this, arguments);
      }
      return onInitSuccess;
    }()
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _this3 = this;
        var validateSettings$;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this._init();
            case 1:
              validateSettings$ = (0, _nextCore.fromWatchValue)(this, function () {
                return [_this3._appFeatures.isRingOutEnabled, _this3._appFeatures.isWebPhoneEnabled, _this3.myPhoneNumbers, _this3.otherPhoneNumbers, _this3.isBlockedIdDisabled];
              }, {
                multiple: true
              }).pipe((0, _rxjs.distinctUntilChanged)(function (prev, curr) {
                return JSON.stringify(prev) === JSON.stringify(curr);
              }), (0, _rxjs.switchMap)(function () {
                return _this3._validateSettings();
              }), (0, _rxjs.takeUntil)(this.resetting$), _nextCore.takeUntilAppDestroy);
              validateSettings$.subscribe();
            case 2:
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
      var _init2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (this._appFeatures.isCallingEnabled) {
                _context4.n = 1;
                break;
              }
              this.setDataAction({
                callWith: null,
                timestamp: null
              });
              return _context4.a(2);
            case 1:
              this._handleFirstTimeLogin();
              _context4.n = 2;
              return this._initFromNumber();
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function _init() {
        return _init2.apply(this, arguments);
      }
      return _init;
    }()
  }, {
    key: "_warningEmergencyCallingNotAvailable",
    value: function () {
      var _warningEmergencyCallingNotAvailable2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (this.callWith === _callingOptions.callingOptions.browser) {
                this._toast.warning({
                  message: (0, _i18n.t)('emergencyCallingNotAvailable'),
                  ttl: 0
                });
              }
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _warningEmergencyCallingNotAvailable() {
        return _warningEmergencyCallingNotAvailable2.apply(this, arguments);
      }
      return _warningEmergencyCallingNotAvailable;
    }()
  }, {
    key: "_validateSettings",
    value: function () {
      var _validateSettings2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!this._hasWebphonePermissionRemoved()) {
                _context6.n = 2;
                break;
              }
              if (!this._appFeatures.isSoftphoneEnabled) {
                _context6.n = 1;
                break;
              }
              _context6.n = 1;
              return this._setSoftPhoneToCallWith();
            case 1:
              this._toast.danger({
                message: (0, _i18n.t)('webphonePermissionRemoved'),
                ttl: 0
              });
              _context6.n = 5;
              break;
            case 2:
              if (!this._hasPermissionChanged()) {
                _context6.n = 4;
                break;
              }
              if (!this._appFeatures.isSoftphoneEnabled) {
                _context6.n = 3;
                break;
              }
              _context6.n = 3;
              return this._setSoftPhoneToCallWith();
            case 3:
              this._toast.open(this.linkToast, {
                message: 'permissionChanged'
              });
              _context6.n = 5;
              break;
            case 4:
              if (this.validateRingoutNumberVariable()) {
                this.setDataAction({
                  callWith: _callingOptions.callingOptions.ringout,
                  myLocation: this.myPhoneNumbers[0],
                  timestamp: Date.now()
                });
                this._toast.open(this.linkToast, {
                  message: 'phoneNumberChanged'
                });
              }
            case 5:
              if (this.isBlockedIdDisabled && this.fromNumber === BLOCKED_ID_VALUE) {
                this._initFromNumber();
              }
            case 6:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function _validateSettings() {
        return _validateSettings2.apply(this, arguments);
      }
      return _validateSettings;
    }()
  }, {
    key: "_verifyJPEmergency",
    value: function () {
      var _verifyJPEmergency2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var hasJapanNumber;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!this.acknowledgeJPMessage) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2);
            case 1:
              hasJapanNumber = !!this.fromNumbers.find(function (record) {
                var _record$country;
                return (record === null || record === void 0 ? void 0 : (_record$country = record.country) === null || _record$country === void 0 ? void 0 : _record$country.id) === '112';
              });
              if (hasJapanNumber) {
                this._toast.warning({
                  message: (0, _i18n.t)('disableEmergencyInJapan'),
                  ttl: 0
                });
                this.setAcknowledgeJPMessage(true);
              }
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _verifyJPEmergency() {
        return _verifyJPEmergency2.apply(this, arguments);
      }
      return _verifyJPEmergency;
    }()
  }, {
    key: "_setSoftPhoneToCallWith",
    value: function () {
      var _setSoftPhoneToCallWith2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              this.setDataAction({
                callWith: _callingOptions.callingOptions.softphone,
                timestamp: Date.now()
              });
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function _setSoftPhoneToCallWith() {
        return _setSoftPhoneToCallWith2.apply(this, arguments);
      }
      return _setSoftPhoneToCallWith;
    }()
  }, {
    key: "_hasWebphonePermissionRemoved",
    value: function _hasWebphonePermissionRemoved() {
      return !(this._appFeatures.isWebPhoneEnabled && this._webphone) && this.callWith === _callingOptions.callingOptions.browser;
    }
  }, {
    key: "callingOptions",
    get: function get() {
      return _callingOptions.callingOptions;
    }
  }, {
    key: "_hasPermissionChanged",
    value: function _hasPermissionChanged() {
      return !this._appFeatures.isRingOutEnabled && this.callWith === _callingOptions.callingOptions.ringout;
    }
  }, {
    key: "validateRingoutNumberVariable",
    value: function validateRingoutNumberVariable() {
      var _this$availableNumber;
      return this.callWith === _callingOptions.callingOptions.ringout && !this.isCustomLocation && ((_this$availableNumber = this.availableNumbers) === null || _this$availableNumber === void 0 ? void 0 : _this$availableNumber.indexOf(this.myLocation)) === -1;
    }
  }, {
    key: "_getLocationLabel",
    value: function _getLocationLabel(phoneNumber) {
      var devices = this._extensionDevice.devices;
      var flipNumbers = this._forwardingNumber.flipNumbers;
      var mainCompanyNumber = this._extensionPhoneNumber.mainCompanyNumber;
      var extensionNumber = this._extensionInfo.extensionNumber;
      var name = null;
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
      var _initFromNumber2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var fromNumber, _this$_callerId, defaultCallerId, _this$_callerId2, _this$_callerId2$ring, defaultPhoneNumber, defaultEntry;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              fromNumber = this.fromNumber;
              if (!(!fromNumber || fromNumber === BLOCKED_ID_VALUE && this.isBlockedIdDisabled)) {
                _context9.n = 1;
                break;
              }
              defaultCallerId = this.fromNumbers[0];
              if ((_this$_callerId = this._callerId) === null || _this$_callerId === void 0 ? void 0 : _this$_callerId.ringOut) {
                if (this._callerId.ringOut.type === 'Blocked' && !this.isBlockedIdDisabled) {
                  defaultCallerId = {
                    phoneNumber: BLOCKED_ID_VALUE
                  };
                } else if (this._callerId.ringOut.type === 'PhoneNumber') {
                  defaultPhoneNumber = (_this$_callerId2 = this._callerId) === null || _this$_callerId2 === void 0 ? void 0 : (_this$_callerId2$ring = _this$_callerId2.ringOut.phoneInfo) === null || _this$_callerId2$ring === void 0 ? void 0 : _this$_callerId2$ring.phoneNumber;
                  defaultEntry = this.fromNumbers.find(function (item) {
                    return item.phoneNumber === defaultPhoneNumber;
                  });
                  if (defaultEntry) {
                    defaultCallerId = defaultEntry;
                  }
                }
              }
              _context9.n = 1;
              return this.updateFromNumber(defaultCallerId);
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function _initFromNumber() {
        return _initFromNumber2.apply(this, arguments);
      }
      return _initFromNumber;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(_ref2, withPrompt) {
        var callWith, myLocation, ringoutPrompt, _this$_brand$brandCon, _this$_brand$brandCon2;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              callWith = _ref2.callWith, myLocation = _ref2.myLocation, ringoutPrompt = _ref2.ringoutPrompt;
              this.setDataAction({
                callWith: callWith,
                myLocation: myLocation,
                ringoutPrompt: ringoutPrompt,
                timestamp: Date.now()
              });
              if (withPrompt) {
                if (this.callWith === _callingOptions.callingOptions.softphone) {
                  if (process.env.THEME_SYSTEM !== 'spring-ui') {
                    this._toast.success({
                      message: (0, _i18n.t)('saveSuccessWithSoftphone', {
                        brand: (_this$_brand$brandCon = this._brand.brandConfig.callWithSoftphone) === null || _this$_brand$brandCon === void 0 ? void 0 : _this$_brand$brandCon.name
                      })
                    });
                  }
                } else if (this.callWith === _callingOptions.callingOptions.jupiter) {
                  if (process.env.THEME_SYSTEM !== 'spring-ui') {
                    this._toast.success({
                      message: (0, _i18n.t)('saveSuccessWithJupiter', {
                        brand: (_this$_brand$brandCon2 = this._brand.brandConfig.callWithJupiter) === null || _this$_brand$brandCon2 === void 0 ? void 0 : _this$_brand$brandCon2.name
                      })
                    });
                  }
                } else {
                  if (process.env.THEME_SYSTEM !== 'spring-ui') {
                    this._toast.success({
                      message: (0, _i18n.t)('saveSuccess')
                    });
                  }
                  if (!this._emergencyCallAvailable) {
                    this._warningEmergencyCallingNotAvailable();
                  }
                }
              }
              if (this.isWebphoneMode) {
                this._verifyJPEmergency();
              }
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function setData(_x2, _x3) {
        return _setData.apply(this, arguments);
      }
      return setData;
    }()
  }, {
    key: "myPhoneNumbers",
    get: function get() {
      var _this$_extensionPhone = this._extensionPhoneNumber,
        directNumbers = _this$_extensionPhone.directNumbers,
        mainCompanyNumber = _this$_extensionPhone.mainCompanyNumber;
      var extensionNumber = this._extensionInfo.extensionNumber;
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
      var flipNumbers = this._forwardingNumber.flipNumbers;
      var _this$_extensionPhone2 = this._extensionPhoneNumber,
        callerIdNumbers = _this$_extensionPhone2.callerIdNumbers,
        directNumbers = _this$_extensionPhone2.directNumbers;
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
      var _this$_appFeatures = this._appFeatures,
        isRingOutEnabled = _this$_appFeatures.isRingOutEnabled,
        isWebPhoneEnabled = _this$_appFeatures.isWebPhoneEnabled;
      var hasExtensionPhoneNumber = this._extensionPhoneNumber.numbers.length > 0;
      if (!hasExtensionPhoneNumber && this._appFeatures.isSoftphoneEnabled) {
        return [_callingOptions.callingOptions.softphone];
      }
      if (!hasExtensionPhoneNumber && !this._appFeatures.isSoftphoneEnabled) {
        return [];
      }
      var callWithOptions = [];
      if (this._webphone && isWebPhoneEnabled) {
        callWithOptions.push(_callingOptions.callingOptions.browser);
      }
      if (this._brand && this._showCallWithJupiter && this._appFeatures.isRingCentralAppEnabled) {
        callWithOptions.push(_callingOptions.callingOptions.jupiter);
      }
      if (this._appFeatures.isSoftphoneEnabled) {
        callWithOptions.push(_callingOptions.callingOptions.softphone);
      }
      if (isRingOutEnabled && this._appFeatures.isRingOutEnabled) {
        callWithOptions.push(_callingOptions.callingOptions.ringout);
      }
      return callWithOptions;
    }
  }, {
    key: "fromNumbers",
    get: function get() {
      var callerIdNumbers = this._extensionPhoneNumber.callerIdNumbers;
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
      var _this4 = this;
      var availableNumbers = this.availableNumbers;
      var result = [];
      if (availableNumbers.length) {
        availableNumbers.forEach(function (phoneNumber) {
          var locationLabel = _this4._getLocationLabel(phoneNumber);
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
  }, {
    key: "isChangeRingToneAllowed",
    get: function get() {
      return this._webphone && this._storage.driver === _nextCore.DriverType.IndexedDB;
    }
  }, {
    key: "jupiterAppName",
    get: function get() {
      var _this$_softphone;
      return (_this$_softphone = this._softphone) === null || _this$_softphone === void 0 ? void 0 : _this$_softphone.jupiterAppName;
    }

    /* India go */
  }, {
    key: "isBlockedIdDisabled",
    get: function get() {
      var _this$_extensionFeatu, _this$_extensionFeatu2;
      return ((_this$_extensionFeatu = this._extensionFeatures.features) === null || _this$_extensionFeatu === void 0 ? void 0 : (_this$_extensionFeatu2 = _this$_extensionFeatu.BlockingCallerId) === null || _this$_extensionFeatu2 === void 0 ? void 0 : _this$_extensionFeatu2.available) === false;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "acknowledgeJPMessage", [_nextCore.userStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "data", [_nextCore.userStorage, _nextCore.state, _dec9], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "setDataAction", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "setDataAction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateFromNumber", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateFromNumber", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "updateFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAcknowledgeJPMessage", [_nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "setAcknowledgeJPMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetSuccess", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "resetSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "linkToast", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;
    return this._toast.create({
      view: function view() {
        var _useToastItemView = (0, _views.useToastItemView)(),
          action = _useToastItemView.action,
          props = _useToastItemView.props;
        var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
          t = _useLocale.t;
        var link = /*#__PURE__*/_react["default"].createElement(_Link.RcLink, {
          onClick: function onClick() {
            _this5._router.push('/settings/calling');
            action.close();
          }
        }, t('link'));
        return /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
          message: t(props.payload.message),
          values: {
            link: link
          }
        });
      },
      props: function props() {
        return {
          level: 'danger',
          ttl: 0
        };
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_validateSettings", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_verifyJPEmergency", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "_verifyJPEmergency"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSoftPhoneToCallWith", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSoftPhoneToCallWith"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initFromNumber", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "_initFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_dec34, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "myPhoneNumbers", [_nextCore.computed, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "myPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "otherPhoneNumbers", [_nextCore.computed, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "otherPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callWithOptions", [_nextCore.computed, _dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "callWithOptions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fromNumbers", [_nextCore.computed, _dec43, _dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "fromNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableNumbers", [_nextCore.computed, _dec45, _dec46], Object.getOwnPropertyDescriptor(_class2.prototype, "availableNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableNumbersWithLabel", [_nextCore.computed, _dec47, _dec48], Object.getOwnPropertyDescriptor(_class2.prototype, "availableNumbersWithLabel"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallingSettings.js.map
