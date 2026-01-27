"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
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
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TO_NUMBER = exports.FROM_NUMBER = exports.Call = exports.ANONYMOUS = void 0;
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _validateNumbers = require("@ringcentral-integration/commons/lib/validateNumbers");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _extractControls2 = _interopRequireDefault(require("@ringcentral-integration/phone-number/lib/extractControls"));
var _utils = require("@ringcentral-integration/utils");
var _rxjs = require("rxjs");
var _ActiveCallControl = require("../ActiveCallControl");
var _CallingSettings = require("../CallingSettings");
var _Ringout = require("../Ringout");
var _Softphone = require("../Softphone");
var _Webphone = require("../Webphone");
var _callStatus = require("./callStatus");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var TO_NUMBER = exports.TO_NUMBER = 'toNumber';
var FROM_NUMBER = exports.FROM_NUMBER = 'fromNumber';
var ANONYMOUS = exports.ANONYMOUS = 'anonymous';
var Call = exports.Call = (_dec = (0, _nextCore.injectable)({
  name: 'Call'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 12);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 13);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('CallOptions')(target, undefined, 14);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _Softphone.Softphone === "undefined" ? Object : _Softphone.Softphone, typeof _Ringout.Ringout === "undefined" ? Object : _Ringout.Ringout, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _CallingSettings.CallingSettings === "undefined" ? Object : _CallingSettings.CallingSettings, typeof _services.ExtensionFeatures === "undefined" ? Object : _services.ExtensionFeatures, typeof _services2.NumberValidate === "undefined" ? Object : _services2.NumberValidate, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _ActiveCallControl.ActiveCallControl === "undefined" ? Object : _ActiveCallControl.ActiveCallControl, typeof _Webphone.Webphone === "undefined" ? Object : _Webphone.Webphone, typeof _services.AvailabilityMonitor === "undefined" ? Object : _services.AvailabilityMonitor, typeof CallOptions === "undefined" ? Object : CallOptions]), _dec7 = Reflect.metadata("design:type", Array), _dec8 = Reflect.metadata("design:type", Object), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [typeof ToNumberMatched === "undefined" ? Object : ToNumberMatched]), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", []), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [String]), _dec13 = (0, _services.track)(function (_, _ref) {
  var callSettingMode = _ref.callSettingMode,
    isValidNumber = _ref.isValidNumber,
    contactResourceType = _ref.contactResourceType,
    clickDialerToCall = _ref.clickDialerToCall;
  return [callSettingMode === _CallingSettings.callingModes.webphone ? _trackEvents.trackEvents.callAttemptWebRTC : _trackEvents.trackEvents.callAttempt, {
    callSettingMode: callSettingMode,
    contactResourceType: contactResourceType,
    isValidNumber: isValidNumber,
    clickDialerToCall: clickDialerToCall
  }];
}), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [typeof ConnectOptions === "undefined" ? Object : ConnectOptions]), _dec16 = (0, _services.track)(function (_, callSettingMode) {
  return [callSettingMode === _CallingSettings.callingModes.webphone ? _trackEvents.trackEvents.outboundWebRTCCallConnected : _trackEvents.trackEvents.outboundCallConnected, {
    callSettingMode: callSettingMode
  }];
}), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [String]), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec21 = (0, _nextCore.delegate)('server'), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [typeof MakeCallParams === "undefined" ? Object : MakeCallParams]), _dec24 = (0, _nextCore.delegate)('server'), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [Object]), _dec27 = (0, _nextCore.delegate)('server'), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", [Object]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Call(_toast, _storage, _brand, _softphone, _ringout, _regionSettings, _callingSettings, _extensionFeatures, _numberValidate, _appFeatures, _portManager, _activeCallControl, _webphone, _availabilityMonitor, _callOptions) {
    var _this;
    _classCallCheck(this, Call);
    _this = _callSuper(this, Call);
    _this._toast = _toast;
    _this._storage = _storage;
    _this._brand = _brand;
    _this._softphone = _softphone;
    _this._ringout = _ringout;
    _this._regionSettings = _regionSettings;
    _this._callingSettings = _callingSettings;
    _this._extensionFeatures = _extensionFeatures;
    _this._numberValidate = _numberValidate;
    _this._appFeatures = _appFeatures;
    _this._portManager = _portManager;
    _this._activeCallControl = _activeCallControl;
    _this._webphone = _webphone;
    _this._availabilityMonitor = _availabilityMonitor;
    _this._callOptions = _callOptions;
    _initializerDefineProperty(_this, "callStatus", _descriptor, _this);
    _initializerDefineProperty(_this, "toNumberEntities", _descriptor2, _this);
    _initializerDefineProperty(_this, "data", _descriptor3, _this);
    _this._storage.enable(_this);
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.listenWebphone();
      });
    } else {
      _this.listenWebphone();
    }
    return _this;
  }
  _inherits(Call, _RcModule);
  return _createClass(Call, [{
    key: "listenWebphone",
    value: function listenWebphone() {
      var _this2 = this;
      var webphone = this._webphone;
      if (!webphone) return;
      (0, _rxjs.merge)((0, _nextCore.fromWatchValue)(this, function () {
        return _this2._callingSettings.isWebphoneMode;
      }), this._portManager.onMainTabChange$,
      // when resetting(logout), we should disconnect the webphone
      this.resetting$).pipe((0, _rxjs.tap)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              if (!_this2._callingSettings.isWebphoneMode) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return webphone.connect();
            case 1:
              _context.n = 3;
              break;
            case 2:
              _context.n = 3;
              return webphone.disconnect();
            case 3:
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              _this2.logger.error('webphone process error', _t);
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[0, 4]]);
      }))), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "lastPhoneNumber",
    get: function get() {
      return this.data.lastPhoneNumber;
    }
  }, {
    key: "lastRecipient",
    get: function get() {
      return this.data.lastRecipient;
    }
  }, {
    key: "lastValidatedToNumber",
    get: function get() {
      return this.data.lastValidatedToNumber;
    }
  }, {
    key: "toNumberMatched",
    value: function toNumberMatched(data) {
      this.toNumberEntities.push(data);
    }
  }, {
    key: "cleanToNumberEntities",
    value: function cleanToNumberEntities() {
      this.toNumberEntities = [];
    }
  }, {
    key: "setLastValidatedToNumber",
    value: function setLastValidatedToNumber(phoneNumber) {
      this.data.lastValidatedToNumber = phoneNumber;
    }
  }, {
    key: "connect",
    value: function connect(_ref3) {
      var isConference = _ref3.isConference,
        _ref3$phoneNumber = _ref3.phoneNumber,
        phoneNumber = _ref3$phoneNumber === void 0 ? null : _ref3$phoneNumber,
        _ref3$recipient = _ref3.recipient,
        recipient = _ref3$recipient === void 0 ? null : _ref3$recipient;
      this.callStatus = _callStatus.callStatus.connecting;
      if (!isConference) {
        this.data.lastPhoneNumber = phoneNumber;
        this.data.lastRecipient = recipient;
      }
    }
  }, {
    key: "connectSuccess",
    value: function connectSuccess(callSettingMode) {
      this.callStatus = _callStatus.callStatus.idle;
    }
  }, {
    key: "connectError",
    value: function connectError() {
      this.callStatus = _callStatus.callStatus.idle;
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.cleanToNumberEntities();
    }

    // save the click to dial entity, only when call took place
  }, {
    key: "onToNumberMatch",
    value: function onToNumberMatch(_ref4) {
      var entityId = _ref4.entityId,
        startTime = _ref4.startTime;
      if (this.isIdle) {
        this.toNumberMatched({
          entityId: entityId,
          startTime: startTime
        });
      }
    }
  }, {
    key: "call",
    value: function () {
      var _call = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref5) {
        var input, recipient, fromNumber, _ref5$isConference, isConference, clickDialerToCall, isValidNumber, session, _extractControls, phoneNumber, extendedControls, toNumber, _this$_appFeatures, validatedNumbers, _error$response, _error$response2, _ref6, feature, statusCode, errorType, _t2, _t3;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              input = _ref5.phoneNumber, recipient = _ref5.recipient, fromNumber = _ref5.fromNumber, _ref5$isConference = _ref5.isConference, isConference = _ref5$isConference === void 0 ? false : _ref5$isConference, clickDialerToCall = _ref5.clickDialerToCall, isValidNumber = _ref5.isValidNumber;
              session = null;
              if (!this.isIdle) {
                _context2.n = 13;
                break;
              }
              _extractControls = (0, _extractControls2["default"])(input), phoneNumber = _extractControls.phoneNumber, extendedControls = _extractControls.extendedControls;
              toNumber = recipient && (recipient.phoneNumber || recipient.extension) || phoneNumber;
              if (!(0, _isBlank.isBlank)(toNumber)) {
                _context2.n = 1;
                break;
              }
              this._toast.warning({
                message: (0, _i18n.t)('noToNumber')
              });
              _context2.n = 13;
              break;
            case 1:
              this.connect({
                isConference: isConference,
                phoneNumber: phoneNumber,
                recipient: recipient,
                contactResourceType: (recipient === null || recipient === void 0 ? void 0 : recipient.type) || null,
                callSettingMode: this._callingSettings.callingMode,
                isValidNumber: isValidNumber,
                clickDialerToCall: clickDialerToCall
              });
              _context2.p = 2;
              if (fromNumber === 'undefined') {
                fromNumber = null;
              }
              if (!(this._callingSettings.callingMode === _CallingSettings.callingModes.ringout && this._callingSettings.myLocation === toNumber)) {
                _context2.n = 3;
                break;
              }
              this._toast.danger({
                message: (0, _i18n.t)('fromAndToNumberIsSame'),
                ttl: 0
              });
              this.connectError();
              return _context2.a(2, null);
            case 3:
              if (!((_this$_appFeatures = this._appFeatures) === null || _this$_appFeatures === void 0 ? void 0 : _this$_appFeatures.isEDPEnabled)) {
                _context2.n = 5;
                break;
              }
              _context2.n = 4;
              return this._getValidatedNumbers({
                toNumber: toNumber,
                fromNumber: fromNumber,
                isConference: isConference
              });
            case 4:
              validatedNumbers = _context2.v;
              _context2.n = 6;
              break;
            case 5:
              validatedNumbers = this._getNumbers({
                toNumber: toNumber,
                fromNumber: fromNumber,
                isConference: isConference
              });
            case 6:
              if (!validatedNumbers) {
                _context2.n = 8;
                break;
              }
              validatedNumbers.toNumber && this.setLastValidatedToNumber(validatedNumbers.toNumber);
              _context2.n = 7;
              return this._makeCall(_objectSpread(_objectSpread({}, validatedNumbers), {}, {
                extendedControls: extendedControls,
                toNumber: validatedNumbers.toNumber,
                fromNumber: validatedNumbers.fromNumber
              }));
            case 7:
              session = _context2.v;
              this.connectSuccess(this._callingSettings.callingMode);
              _context2.n = 9;
              break;
            case 8:
              this.connectError();
            case 9:
              _context2.n = 13;
              break;
            case 10:
              _context2.p = 10;
              _t2 = _context2.v;
              _context2.n = 11;
              return _t2 === null || _t2 === void 0 ? void 0 : (_error$response = _t2.response) === null || _error$response === void 0 ? void 0 : _error$response.clone().json();
            case 11:
              _t3 = _context2.v;
              if (_t3) {
                _context2.n = 12;
                break;
              }
              _t3 = {};
            case 12:
              _ref6 = _t3;
              feature = _ref6.feature;
              statusCode = _t2 === null || _t2 === void 0 ? void 0 : (_error$response2 = _t2.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status;
              errorType = _t2 === null || _t2 === void 0 ? void 0 : _t2.type;
              if (errorType && !_t2.message && (
              // when error is in i18n map or be a noAreaCode error
              (0, _i18n.t)(errorType) !== errorType || errorType === 'noAreaCode')) {
                // validate format error
                if (errorType === 'noAreaCode') {
                  this._numberValidate.openNoAreaCodeToast();
                } else {
                  this._toast.warning({
                    message: (0, _i18n.t)(errorType, {
                      brand: this._brand.name
                    }),
                    allowDuplicates: false
                  });
                }
              } else if (_t2.message === _Ringout.ringoutErrors.firstLegConnectFailed) {
                this._toast.warning({
                  message: (0, _i18n.t)('connectFailed')
                });
              } else if (_t2.message === 'Failed to fetch') {
                this._toast.danger({
                  message: (0, _i18n.t)('networkError')
                });
              } else if (feature && feature.includes('InternationalCalls') && statusCode === 403) {
                // ringout call may not have international permission, then first leg can't be create
                // directly, customer will not be able to hear the voice prompt, so show a warning
                this._toast.danger({
                  message: (0, _i18n.t)('noInternational', {
                    brand: this._brand.name
                  })
                });
              } else if (_t2.message !== 'Refresh token has expired') {
                if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(_t2)) {
                  this._toast.danger({
                    message: (0, _i18n.t)('internalError')
                  });
                }
              }
              this.connectError();
              throw _t2;
            case 13:
              return _context2.a(2, session);
          }
        }, _callee2, this, [[2, 10]]);
      }));
      function call(_x) {
        return _call.apply(this, arguments);
      }
      return call;
    }()
  }, {
    key: "_getNumbers",
    value: function _getNumbers(_ref7) {
      var toNumber = _ref7.toNumber,
        fromNumber = _ref7.fromNumber,
        isConference = _ref7.isConference;
      var isWebphone = this._callingSettings.isWebphoneMode;
      var theFromNumber = fromNumber || (isWebphone ? this._callingSettings.fromNumber : this._callingSettings.myLocation);
      if (isWebphone && (theFromNumber === null || theFromNumber === '')) {
        return null;
      }
      var waitingValidateNumbers = [];
      if (!isConference) {
        waitingValidateNumbers.push({
          type: TO_NUMBER,
          number: toNumber
        });
      }
      if (theFromNumber && theFromNumber.length > 0 && !(isWebphone && theFromNumber === ANONYMOUS)) {
        waitingValidateNumbers.push({
          type: FROM_NUMBER,
          number: theFromNumber
        });
      }
      var parsedToNumber;
      var parsedFromNumber;
      if (waitingValidateNumbers.length) {
        var numbers = waitingValidateNumbers.map(function (x) {
          return x.number;
        });
        var validatedResult = (0, _validateNumbers.validateNumbers)({
          allowRegionSettings: !!this._brand.brandConfig.allowRegionSettings,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          phoneNumbers: numbers
        });
        var toNumberIndex = waitingValidateNumbers.findIndex(function (x) {
          return x.type === TO_NUMBER;
        });
        var fromNumberIndex = waitingValidateNumbers.findIndex(function (x) {
          return x.type === FROM_NUMBER;
        });
        if (Array.isArray(validatedResult)) {
          parsedToNumber = validatedResult[toNumberIndex];
          parsedFromNumber = validatedResult[fromNumberIndex];
        }
        // TODO: should that need handle validated fail state?
      }
      if (isWebphone && theFromNumber === ANONYMOUS) {
        parsedFromNumber = ANONYMOUS;
      }
      return {
        toNumber: parsedToNumber || toNumber,
        fromNumber: parsedFromNumber
      };
    }
  }, {
    key: "_getValidatedNumbers",
    value: function () {
      var _getValidatedNumbers2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref8) {
        var _parsedToNumber, _parsedFromNumber;
        var toNumber, fromNumber, isConference, isWebphone, theFromNumber, waitingValidateNumbers, parsedToNumber, parsedFromNumber, numbers, validResult, parsedNumbers, toNumberIndex, fromNumberIndex, parsedToNumberE164, parsedFromNumberE164, _t4;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              toNumber = _ref8.toNumber, fromNumber = _ref8.fromNumber, isConference = _ref8.isConference;
              isWebphone = this._callingSettings.isWebphoneMode;
              theFromNumber = fromNumber || (isWebphone ? this._callingSettings.fromNumber : this._callingSettings.myLocation);
              if (!(isWebphone && (theFromNumber === null || theFromNumber === ''))) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2, null);
            case 1:
              waitingValidateNumbers = [];
              if (!isConference) {
                waitingValidateNumbers.push({
                  type: TO_NUMBER,
                  number: toNumber
                });
              }
              if (theFromNumber && theFromNumber.length > 0 && !(isWebphone && theFromNumber === ANONYMOUS)) {
                waitingValidateNumbers.push({
                  type: FROM_NUMBER,
                  number: theFromNumber
                });
              }
              if (!waitingValidateNumbers.length) {
                _context3.n = 8;
                break;
              }
              numbers = waitingValidateNumbers.map(function (x) {
                return x.number;
              });
              _context3.n = 2;
              return this._numberValidate.validate(numbers);
            case 2:
              validResult = _context3.v;
              if (validResult.result) {
                _context3.n = 4;
                break;
              }
              this._numberValidate.handleValidateToasts(validResult);
              if (!(validResult.errors.length > 0)) {
                _context3.n = 3;
                break;
              }
              throw validResult.errors[0];
            case 3:
              return _context3.a(2, null);
            case 4:
              _context3.n = 5;
              return this._numberValidate.parseNumbers(numbers);
            case 5:
              _t4 = _context3.v;
              if (_t4) {
                _context3.n = 6;
                break;
              }
              _t4 = [];
            case 6:
              parsedNumbers = _t4;
              if (!(process.env.THEME_SYSTEM === 'spring-ui' && !parsedNumbers.length)) {
                _context3.n = 7;
                break;
              }
              return _context3.a(2, null);
            case 7:
              toNumberIndex = waitingValidateNumbers.findIndex(function (x) {
                return x.type === TO_NUMBER;
              });
              fromNumberIndex = waitingValidateNumbers.findIndex(function (x) {
                return x.type === FROM_NUMBER;
              });
              parsedToNumber = parsedNumbers[toNumberIndex];
              parsedFromNumber = parsedNumbers[fromNumberIndex];
            case 8:
              parsedToNumberE164 = (_parsedToNumber = parsedToNumber) === null || _parsedToNumber === void 0 ? void 0 : _parsedToNumber.parsedNumber;
              parsedFromNumberE164 = (_parsedFromNumber = parsedFromNumber) === null || _parsedFromNumber === void 0 ? void 0 : _parsedFromNumber.parsedNumber;
              if (isWebphone && theFromNumber === ANONYMOUS) {
                parsedFromNumberE164 = ANONYMOUS;
              }
              return _context3.a(2, {
                toNumber: isConference ? parsedToNumberE164 || toNumber : parsedToNumberE164,
                fromNumber: parsedFromNumberE164
              });
          }
        }, _callee3, this);
      }));
      function _getValidatedNumbers(_x2) {
        return _getValidatedNumbers2.apply(this, arguments);
      }
      return _getValidatedNumbers;
    }()
  }, {
    key: "_makeCall",
    value: function () {
      var _makeCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref9) {
        var toNumber, fromNumber, _ref9$callingMode, callingMode, _ref9$extendedControl, extendedControls, homeCountryId, session, _t5;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              toNumber = _ref9.toNumber, fromNumber = _ref9.fromNumber, _ref9$callingMode = _ref9.callingMode, callingMode = _ref9$callingMode === void 0 ? this._callingSettings.callingMode : _ref9$callingMode, _ref9$extendedControl = _ref9.extendedControls, extendedControls = _ref9$extendedControl === void 0 ? [] : _ref9$extendedControl;
              this.logger.log('make call', {
                toNumber: (0, _utils.maskPhoneNumber)(toNumber),
                fromNumber: (0, _utils.maskPhoneNumber)(fromNumber),
                callingMode: callingMode,
                extendedControls: extendedControls
              });
              homeCountryId = this._regionSettings.homeCountryId;
              session = null;
              _t5 = callingMode;
              _context4.n = _t5 === _CallingSettings.callingModes.softphone ? 1 : _t5 === _CallingSettings.callingModes.jupiter ? 1 : _t5 === _CallingSettings.callingModes.ringout ? 3 : _t5 === _CallingSettings.callingModes.webphone ? 5 : 7;
              break;
            case 1:
              _context4.n = 2;
              return this._softphone.makeCall(toNumber, callingMode);
            case 2:
              session = _context4.v;
              return _context4.a(3, 8);
            case 3:
              _context4.n = 4;
              return this._ringout.makeCall({
                fromNumber: fromNumber,
                toNumber: toNumber && toNumber.split('*')[0],
                // remove extension number in ringout mode
                prompt: this._callingSettings.ringoutPrompt
              });
            case 4:
              session = _context4.v;
              return _context4.a(3, 8);
            case 5:
              _context4.n = 6;
              return this._activeCallControl.makeCall({
                fromNumber: fromNumber,
                toNumber: toNumber,
                homeCountryId: homeCountryId,
                extendedControls: extendedControls
              });
            case 6:
              session = _context4.v;
              return _context4.a(3, 8);
            case 7:
              return _context4.a(3, 8);
            case 8:
              return _context4.a(2, session);
          }
        }, _callee4, this);
      }));
      function _makeCall(_x3) {
        return _makeCall2.apply(this, arguments);
      }
      return _makeCall;
    }()
  }, {
    key: "isIdle",
    get: function get() {
      return this.callStatus === _callStatus.callStatus.idle;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "callStatus", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _callStatus.callStatus.idle;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "toNumberEntities", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "data", [_nextCore.storage, _nextCore.state, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      lastPhoneNumber: null,
      lastRecipient: null,
      lastValidatedToNumber: null
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "toNumberMatched", [_nextCore.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "toNumberMatched"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanToNumberEntities", [_nextCore.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanToNumberEntities"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastValidatedToNumber", [_nextCore.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastValidatedToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connect", [_dec13, _nextCore.action, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectSuccess", [_dec16, _nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "connectSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectError", [_nextCore.action, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "connectError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "call", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "call"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getValidatedNumbers", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "_getValidatedNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_makeCall", [_dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "_makeCall"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Call.js.map
