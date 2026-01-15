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
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TO_NUMBER = exports.FROM_NUMBER = exports.Call = exports.ANONYMOUS = void 0;
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _core = require("@ringcentral-integration/core");
var _extractControls2 = _interopRequireDefault(require("@ringcentral-integration/phone-number/lib/extractControls"));
var _trackEvents = require("../../enums/trackEvents");
var _di = require("../../lib/di");
var _isBlank = require("../../lib/isBlank");
var _proxify = require("../../lib/proxy/proxify");
var _validateNumbers = require("../../lib/validateNumbers");
var _CallingSettings = require("../CallingSettings");
var _Ringout = require("../Ringout");
var _callErrors = require("./callErrors");
var _callStatus = require("./callStatus");
var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
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
/**
 * @class
 * @description Call managing module
 */
var Call = exports.Call = (_dec = (0, _di.Module)({
  name: 'Call',
  deps: ['Alert', 'Storage', 'Brand', 'Softphone', 'Ringout', 'RegionSettings', 'CallingSettings', 'ExtensionFeatures', 'NumberValidate', 'AppFeatures', {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'CallOptions',
    optional: true
  }, {
    dep: 'ActiveCallControl',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (_, _ref) {
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
}), _dec3 = (0, _core.track)(function (_, callSettingMode) {
  return [callSettingMode === _CallingSettings.callingModes.webphone ? _trackEvents.trackEvents.outboundWebRTCCallConnected : _trackEvents.trackEvents.outboundCallConnected, {
    callSettingMode: callSettingMode
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function Call(deps) {
    var _this$_deps$callOptio, _this$_deps$callOptio2;
    var _this;
    _classCallCheck(this, Call);
    _this = _callSuper(this, Call, [{
      deps: deps,
      enableCache: true,
      storageKey: 'callData'
    }]);
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
    _this._callSettingMode = null;
    _this._useCallControlToMakeCall = void 0;
    _initializerDefineProperty(_this, "callStatus", _descriptor, _this);
    _initializerDefineProperty(_this, "toNumberEntities", _descriptor2, _this);
    _initializerDefineProperty(_this, "data", _descriptor3, _this);
    _this._useCallControlToMakeCall = (_this$_deps$callOptio = (_this$_deps$callOptio2 = _this._deps.callOptions) === null || _this$_deps$callOptio2 === void 0 ? void 0 : _this$_deps$callOptio2.useCallControlToMakeCall) !== null && _this$_deps$callOptio !== void 0 ? _this$_deps$callOptio : false;
    return _this;
  }
  _inherits(Call, _RcModuleV);
  return _createClass(Call, [{
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
    value: function connect(_ref2) {
      var isConference = _ref2.isConference,
        _ref2$phoneNumber = _ref2.phoneNumber,
        phoneNumber = _ref2$phoneNumber === void 0 ? null : _ref2$phoneNumber,
        _ref2$recipient = _ref2.recipient,
        recipient = _ref2$recipient === void 0 ? null : _ref2$recipient,
        callSettingMode = _ref2.callSettingMode,
        isValidNumber = _ref2.isValidNumber,
        clickDialerToCall = _ref2.clickDialerToCall,
        contactResourceType = _ref2.contactResourceType;
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
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this.ready) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return this._processCall();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function onStateChange() {
        return _onStateChange.apply(this, arguments);
      }
      return onStateChange;
    }()
  }, {
    key: "onInit",
    value: function onInit() {
      this._initCallModule();
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this._resetCallModule();
      this.cleanToNumberEntities();
    }
  }, {
    key: "_initCallModule",
    value: function () {
      var _initCallModule2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
              this._callSettingMode = this._deps.callingSettings.callingMode;
              if (!(this._callSettingMode === _CallingSettings.callingModes.webphone && this._deps.webphone)) {
                _context2.n = 1;
                break;
              }
              _context2.n = 1;
              return this._deps.webphone.connect();
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _initCallModule() {
        return _initCallModule2.apply(this, arguments);
      }
      return _initCallModule;
    }()
  }, {
    key: "_resetCallModule",
    value: function _resetCallModule() {
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      this._callSettingMode = this._deps.callingSettings.callingMode;
      if (this._callSettingMode === _CallingSettings.callingModes.webphone && this._deps.webphone) {
        this._deps.webphone.disconnect();
      }
    }
  }, {
    key: "_processCall",
    value: function () {
      var _processCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var oldCallSettingMode;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              oldCallSettingMode = this._callSettingMode;
              if (!(this._deps.callingSettings.callingMode !== oldCallSettingMode && this._deps.webphone)) {
                _context3.n = 2;
                break;
              }
              // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
              this._callSettingMode = this._deps.callingSettings.callingMode;
              if (!(oldCallSettingMode === _CallingSettings.callingModes.webphone)) {
                _context3.n = 1;
                break;
              }
              this._deps.webphone.disconnect();
              _context3.n = 2;
              break;
            case 1:
              if (!(this._callSettingMode === _CallingSettings.callingModes.webphone)) {
                _context3.n = 2;
                break;
              }
              _context3.n = 2;
              return this._deps.webphone.connect();
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _processCall() {
        return _processCall2.apply(this, arguments);
      }
      return _processCall;
    }() // save the click to dial entity, only when call took place
  }, {
    key: "onToNumberMatch",
    value: function onToNumberMatch(_ref3) {
      var entityId = _ref3.entityId,
        startTime = _ref3.startTime;
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
      var _call = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref4) {
        var input, recipient, fromNumber, _ref4$isConference, isConference, clickDialerToCall, isValidNumber, session, _extractControls, phoneNumber, extendedControls, toNumber, _this$_deps$appFeatur, validatedNumbers, _error$response, _error$response2, _ref5, feature, statusCode, _t, _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              input = _ref4.phoneNumber, recipient = _ref4.recipient, fromNumber = _ref4.fromNumber, _ref4$isConference = _ref4.isConference, isConference = _ref4$isConference === void 0 ? false : _ref4$isConference, clickDialerToCall = _ref4.clickDialerToCall, isValidNumber = _ref4.isValidNumber;
              session = null;
              if (!this.isIdle) {
                _context4.n = 12;
                break;
              }
              _extractControls = (0, _extractControls2["default"])(input), phoneNumber = _extractControls.phoneNumber, extendedControls = _extractControls.extendedControls;
              toNumber = recipient && (recipient.phoneNumber || recipient.extension) || phoneNumber;
              if (!(0, _isBlank.isBlank)(toNumber)) {
                _context4.n = 1;
                break;
              }
              this._deps.alert.warning({
                message: _callErrors.callErrors.noToNumber
              });
              _context4.n = 12;
              break;
            case 1:
              this.connect({
                isConference: isConference,
                phoneNumber: phoneNumber,
                recipient: recipient,
                // @ts-expect-error TS(2339): Property 'type' does not exist on type 'NonNullabl... Remove this comment to see the full error message
                contactResourceType: (recipient === null || recipient === void 0 ? void 0 : recipient.type) || null,
                callSettingMode: this._callSettingMode,
                // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
                isValidNumber: isValidNumber,
                // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
                clickDialerToCall: clickDialerToCall
              });
              _context4.p = 2;
              if (fromNumber === 'undefined') {
                // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
                fromNumber = null;
              }
              if (!((_this$_deps$appFeatur = this._deps.appFeatures) === null || _this$_deps$appFeatur === void 0 ? void 0 : _this$_deps$appFeatur.isEDPEnabled)) {
                _context4.n = 4;
                break;
              }
              _context4.n = 3;
              return this._getValidatedNumbers({
                toNumber: toNumber,
                fromNumber: fromNumber,
                isConference: isConference
              });
            case 3:
              validatedNumbers = _context4.v;
              _context4.n = 5;
              break;
            case 4:
              validatedNumbers = this._getNumbers({
                toNumber: toNumber,
                fromNumber: fromNumber,
                isConference: isConference
              });
            case 5:
              if (!validatedNumbers) {
                _context4.n = 7;
                break;
              }
              validatedNumbers.toNumber && this.setLastValidatedToNumber(validatedNumbers.toNumber);
              // @ts-expect-error TS(2345): Argument of type '{ extendedControls: string[]; to... Remove this comment to see the full error message
              _context4.n = 6;
              return this._makeCall(_objectSpread(_objectSpread({}, validatedNumbers), {}, {
                extendedControls: extendedControls
              }));
            case 6:
              session = _context4.v;
              this.connectSuccess(this._callSettingMode);
              _context4.n = 8;
              break;
            case 7:
              this.connectError();
            case 8:
              _context4.n = 12;
              break;
            case 9:
              _context4.p = 9;
              _t = _context4.v;
              _context4.n = 10;
              return _t === null || _t === void 0 ? void 0 : (_error$response = _t.response) === null || _error$response === void 0 ? void 0 : _error$response.clone().json();
            case 10:
              _t2 = _context4.v;
              if (_t2) {
                _context4.n = 11;
                break;
              }
              _t2 = {};
            case 11:
              _ref5 = _t2;
              feature = _ref5.feature;
              statusCode = _t === null || _t === void 0 ? void 0 : (_error$response2 = _t.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status;
              if (!_t.message && _t.type && _callErrors.callErrors[_t.type]) {
                // validate format error
                this._deps.alert.warning({
                  message: _callErrors.callErrors[_t.type],
                  payload: {
                    phoneNumber: _t.phoneNumber
                  }
                });
              } else if (_t.message === _Ringout.ringoutErrors.firstLegConnectFailed) {
                this._deps.alert.warning({
                  message: _callErrors.callErrors.connectFailed,
                  payload: _t
                });
              } else if (_t.message === 'Failed to fetch') {
                this._deps.alert.danger({
                  message: _callErrors.callErrors.networkError,
                  payload: _t
                });
              } else if (feature && feature.includes('InternationalCalls') && statusCode === 403) {
                // ringout call may not have international permission, then first leg can't be create
                // directly, customer will not be able to hear the voice prompt, so show a warning
                this._deps.alert.danger({
                  message: _callErrors.callErrors.noInternational
                });
              } else if (_t.message !== 'Refresh token has expired') {
                if (!this._deps.availabilityMonitor || !this._deps.availabilityMonitor.checkIfHAError(_t)) {
                  this._deps.alert.danger({
                    message: _callErrors.callErrors.internalError,
                    payload: _t
                  });
                }
              }
              this.connectError();
              throw _t;
            case 12:
              return _context4.a(2, session);
          }
        }, _callee4, this, [[2, 9]]);
      }));
      function call(_x) {
        return _call.apply(this, arguments);
      }
      return call;
    }()
  }, {
    key: "_getNumbers",
    value: function _getNumbers(_ref6) {
      var toNumber = _ref6.toNumber,
        fromNumber = _ref6.fromNumber,
        isConference = _ref6.isConference;
      var isWebphone = this._deps.callingSettings.callingMode === _CallingSettings.callingModes.webphone;
      var theFromNumber = fromNumber || (isWebphone ? this._deps.callingSettings.fromNumber : this._deps.callingSettings.myLocation);
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
          allowRegionSettings: !!this._deps.brand.brandConfig.allowRegionSettings,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
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
      var _getValidatedNumbers2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref7) {
        var _parsedToNumber, _parsedFromNumber;
        var toNumber, fromNumber, isConference, isWebphone, theFromNumber, waitingValidateNumbers, parsedToNumber, parsedFromNumber, numbers, validResult, parsedNumbers, toNumberIndex, fromNumberIndex, parsedToNumberE164, parsedFromNumberE164, _t3;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              toNumber = _ref7.toNumber, fromNumber = _ref7.fromNumber, isConference = _ref7.isConference;
              isWebphone = this._deps.callingSettings.callingMode === _CallingSettings.callingModes.webphone;
              theFromNumber = fromNumber || (isWebphone ? this._deps.callingSettings.fromNumber : this._deps.callingSettings.myLocation);
              if (!(isWebphone && (theFromNumber === null || theFromNumber === ''))) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, null);
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
                _context5.n = 6;
                break;
              }
              numbers = waitingValidateNumbers.map(function (x) {
                return x.number;
              });
              _context5.n = 2;
              return this._deps.numberValidate.validate(numbers);
            case 2:
              validResult = _context5.v;
              if (validResult.result) {
                _context5.n = 3;
                break;
              }
              if (validResult.result) {
                _context5.n = 3;
                break;
              }
              validResult.errors.forEach(function (error) {
                // TODO: determine how to deal with multiple errors
                // this._deps.alert.warning({
                //   message: callErrors[error.type],
                //   payload: {
                //     phoneNumber: error.phoneNumber,
                //   },
                // });
                throw error;
              });
              return _context5.a(2, null);
            case 3:
              _context5.n = 4;
              return this._deps.numberValidate.parseNumbers(numbers);
            case 4:
              _t3 = _context5.v;
              if (_t3) {
                _context5.n = 5;
                break;
              }
              _t3 = [];
            case 5:
              parsedNumbers = _t3;
              toNumberIndex = waitingValidateNumbers.findIndex(function (x) {
                return x.type === TO_NUMBER;
              });
              fromNumberIndex = waitingValidateNumbers.findIndex(function (x) {
                return x.type === FROM_NUMBER;
              });
              parsedToNumber = parsedNumbers[toNumberIndex];
              parsedFromNumber = parsedNumbers[fromNumberIndex];
            case 6:
              parsedToNumberE164 = (_parsedToNumber = parsedToNumber) === null || _parsedToNumber === void 0 ? void 0 : _parsedToNumber.parsedNumber;
              parsedFromNumberE164 = (_parsedFromNumber = parsedFromNumber) === null || _parsedFromNumber === void 0 ? void 0 : _parsedFromNumber.parsedNumber;
              if (isWebphone && theFromNumber === ANONYMOUS) {
                parsedFromNumberE164 = ANONYMOUS;
              }
              return _context5.a(2, {
                toNumber: isConference ? parsedToNumberE164 || toNumber : parsedToNumberE164,
                fromNumber: parsedFromNumberE164
              });
          }
        }, _callee5, this);
      }));
      function _getValidatedNumbers(_x2) {
        return _getValidatedNumbers2.apply(this, arguments);
      }
      return _getValidatedNumbers;
    }()
  }, {
    key: "_makeCall",
    value: function () {
      var _makeCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(_ref8) {
        var toNumber, fromNumber, _ref8$callingMode, callingMode, _ref8$extendedControl, extendedControls, homeCountryId, session, _t4;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              toNumber = _ref8.toNumber, fromNumber = _ref8.fromNumber, _ref8$callingMode = _ref8.callingMode, callingMode = _ref8$callingMode === void 0 ? this._deps.callingSettings.callingMode : _ref8$callingMode, _ref8$extendedControl = _ref8.extendedControls, extendedControls = _ref8$extendedControl === void 0 ? [] : _ref8$extendedControl;
              homeCountryId = this._deps.regionSettings.homeCountryId;
              _t4 = callingMode;
              _context6.n = _t4 === _CallingSettings.callingModes.softphone ? 1 : _t4 === _CallingSettings.callingModes.jupiter ? 1 : _t4 === _CallingSettings.callingModes.ringout ? 2 : _t4 === _CallingSettings.callingModes.webphone ? 4 : 9;
              break;
            case 1:
              session = this._deps.softphone.makeCall(toNumber, callingMode);
              return _context6.a(3, 10);
            case 2:
              _context6.n = 3;
              return this._deps.ringout.makeCall({
                fromNumber: fromNumber,
                toNumber: toNumber && toNumber.split('*')[0],
                // remove extension number in ringout mode
                prompt: this._deps.callingSettings.ringoutPrompt
              });
            case 3:
              session = _context6.v;
              return _context6.a(3, 10);
            case 4:
              if (!this.isActiveCallControlApplicable) {
                _context6.n = 6;
                break;
              }
              _context6.n = 5;
              return this._deps.activeCallControl.makeCall({
                fromNumber: fromNumber,
                toNumber: toNumber,
                homeCountryId: homeCountryId,
                extendedControls: extendedControls
              });
            case 5:
              session = _context6.v;
              _context6.n = 8;
              break;
            case 6:
              if (!this._deps.webphone) {
                _context6.n = 8;
                break;
              }
              _context6.n = 7;
              return this._deps.webphone.makeCall({
                fromNumber: fromNumber,
                toNumber: toNumber,
                homeCountryId: homeCountryId,
                extendedControls: extendedControls
              });
            case 7:
              session = _context6.v;
            case 8:
              return _context6.a(3, 10);
            case 9:
              return _context6.a(3, 10);
            case 10:
              return _context6.a(2, session);
          }
        }, _callee6, this);
      }));
      function _makeCall(_x3) {
        return _makeCall2.apply(this, arguments);
      }
      return _makeCall;
    }()
  }, {
    key: "isActiveCallControlApplicable",
    get: function get() {
      return !!(this._deps.activeCallControl && this._useCallControlToMakeCall);
    }
  }, {
    key: "isIdle",
    get: function get() {
      return this.callStatus === _callStatus.callStatus.idle;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "callStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _callStatus.callStatus.idle;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "toNumberEntities", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "toNumberMatched", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "toNumberMatched"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanToNumberEntities", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanToNumberEntities"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastValidatedToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastValidatedToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connect", [_dec2, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectSuccess", [_dec3, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "connectSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "connectError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "call", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "call"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getValidatedNumbers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_getValidatedNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_makeCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_makeCall"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=Call.js.map
