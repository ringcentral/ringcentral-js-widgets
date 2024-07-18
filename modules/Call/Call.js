"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TO_NUMBER = exports.FROM_NUMBER = exports.Call = exports.ANONYMOUS = void 0;
require("regenerator-runtime/runtime");
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
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var TO_NUMBER = 'toNumber';
exports.TO_NUMBER = TO_NUMBER;
var FROM_NUMBER = 'fromNumber';
exports.FROM_NUMBER = FROM_NUMBER;
var ANONYMOUS = 'anonymous';
exports.ANONYMOUS = ANONYMOUS;
/**
 * @class
 * @description Call managing module
 */
var Call = (_dec = (0, _di.Module)({
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
  _inherits(Call, _RcModuleV);
  var _super = _createSuper(Call);
  function Call(deps) {
    var _this$_deps$callOptio, _this$_deps$callOptio2;
    var _this;
    _classCallCheck(this, Call);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'callData'
    });
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
    _this._callSettingMode = null;
    _this._useCallControlToMakeCall = void 0;
    _initializerDefineProperty(_this, "callStatus", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "toNumberEntities", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "data", _descriptor3, _assertThisInitialized(_this));
    _this._useCallControlToMakeCall = (_this$_deps$callOptio = (_this$_deps$callOptio2 = _this._deps.callOptions) === null || _this$_deps$callOptio2 === void 0 ? void 0 : _this$_deps$callOptio2.useCallControlToMakeCall) !== null && _this$_deps$callOptio !== void 0 ? _this$_deps$callOptio : false;
    return _this;
  }
  _createClass(Call, [{
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
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.ready) {
                  _context.next = 3;
                  break;
                }
                _context.next = 3;
                return this._processCall();
              case 3:
              case "end":
                return _context.stop();
            }
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
      var _initCallModule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
                this._callSettingMode = this._deps.callingSettings.callingMode;
                if (!(this._callSettingMode === _CallingSettings.callingModes.webphone && this._deps.webphone)) {
                  _context2.next = 4;
                  break;
                }
                _context2.next = 4;
                return this._deps.webphone.connect();
              case 4:
              case "end":
                return _context2.stop();
            }
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
      var _processCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var oldCallSettingMode;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                oldCallSettingMode = this._callSettingMode;
                if (!(this._deps.callingSettings.callingMode !== oldCallSettingMode && this._deps.webphone)) {
                  _context3.next = 10;
                  break;
                }
                // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
                this._callSettingMode = this._deps.callingSettings.callingMode;
                if (!(oldCallSettingMode === _CallingSettings.callingModes.webphone)) {
                  _context3.next = 7;
                  break;
                }
                this._deps.webphone.disconnect();
                _context3.next = 10;
                break;
              case 7:
                if (!(this._callSettingMode === _CallingSettings.callingModes.webphone)) {
                  _context3.next = 10;
                  break;
                }
                _context3.next = 10;
                return this._deps.webphone.connect();
              case 10:
              case "end":
                return _context3.stop();
            }
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
      var _call = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
        var input, recipient, fromNumber, _ref4$isConference, isConference, clickDialerToCall, isValidNumber, session, _extractControls, phoneNumber, extendedControls, toNumber, _this$_deps$appFeatur, validatedNumbers, _error$response, _error$response2, _ref5, feature, statusCode;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                input = _ref4.phoneNumber, recipient = _ref4.recipient, fromNumber = _ref4.fromNumber, _ref4$isConference = _ref4.isConference, isConference = _ref4$isConference === void 0 ? false : _ref4$isConference, clickDialerToCall = _ref4.clickDialerToCall, isValidNumber = _ref4.isValidNumber;
                session = null;
                if (!this.isIdle) {
                  _context4.next = 43;
                  break;
                }
                _extractControls = (0, _extractControls2["default"])(input), phoneNumber = _extractControls.phoneNumber, extendedControls = _extractControls.extendedControls;
                toNumber = recipient && (recipient.phoneNumber || recipient.extension) || phoneNumber;
                if (!(0, _isBlank.isBlank)(toNumber)) {
                  _context4.next = 9;
                  break;
                }
                this._deps.alert.warning({
                  message: _callErrors.callErrors.noToNumber
                });
                _context4.next = 43;
                break;
              case 9:
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
                _context4.prev = 10;
                if (fromNumber === 'undefined') {
                  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
                  fromNumber = null;
                }
                if (!((_this$_deps$appFeatur = this._deps.appFeatures) === null || _this$_deps$appFeatur === void 0 ? void 0 : _this$_deps$appFeatur.isEDPEnabled)) {
                  _context4.next = 18;
                  break;
                }
                _context4.next = 15;
                return this._getValidatedNumbers({
                  toNumber: toNumber,
                  fromNumber: fromNumber,
                  isConference: isConference
                });
              case 15:
                validatedNumbers = _context4.sent;
                _context4.next = 19;
                break;
              case 18:
                validatedNumbers = this._getNumbers({
                  toNumber: toNumber,
                  fromNumber: fromNumber,
                  isConference: isConference
                });
              case 19:
                if (!validatedNumbers) {
                  _context4.next = 27;
                  break;
                }
                validatedNumbers.toNumber && this.setLastValidatedToNumber(validatedNumbers.toNumber);
                // @ts-expect-error TS(2345): Argument of type '{ extendedControls: string[]; to... Remove this comment to see the full error message
                _context4.next = 23;
                return this._makeCall(_objectSpread(_objectSpread({}, validatedNumbers), {}, {
                  extendedControls: extendedControls
                }));
              case 23:
                session = _context4.sent;
                this.connectSuccess(this._callSettingMode);
                _context4.next = 28;
                break;
              case 27:
                this.connectError();
              case 28:
                _context4.next = 43;
                break;
              case 30:
                _context4.prev = 30;
                _context4.t0 = _context4["catch"](10);
                _context4.next = 34;
                return _context4.t0 === null || _context4.t0 === void 0 ? void 0 : (_error$response = _context4.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.clone().json();
              case 34:
                _context4.t1 = _context4.sent;
                if (_context4.t1) {
                  _context4.next = 37;
                  break;
                }
                _context4.t1 = {};
              case 37:
                _ref5 = _context4.t1;
                feature = _ref5.feature;
                statusCode = _context4.t0 === null || _context4.t0 === void 0 ? void 0 : (_error$response2 = _context4.t0.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status;
                if (!_context4.t0.message && _context4.t0.type && _callErrors.callErrors[_context4.t0.type]) {
                  // validate format error
                  this._deps.alert.warning({
                    message: _callErrors.callErrors[_context4.t0.type],
                    payload: {
                      phoneNumber: _context4.t0.phoneNumber
                    }
                  });
                } else if (_context4.t0.message === _Ringout.ringoutErrors.firstLegConnectFailed) {
                  this._deps.alert.warning({
                    message: _callErrors.callErrors.connectFailed,
                    payload: _context4.t0
                  });
                } else if (_context4.t0.message === 'Failed to fetch') {
                  this._deps.alert.danger({
                    message: _callErrors.callErrors.networkError,
                    payload: _context4.t0
                  });
                } else if (feature && feature.includes('InternationalCalls') && statusCode === 403) {
                  // ringout call may not have international permission, then first leg can't be create
                  // directly, customer will not be able to hear the voice prompt, so show a warning
                  this._deps.alert.danger({
                    message: _callErrors.callErrors.noInternational
                  });
                } else if (_context4.t0.message !== 'Refresh token has expired') {
                  if (!this._deps.availabilityMonitor || !this._deps.availabilityMonitor.checkIfHAError(_context4.t0)) {
                    this._deps.alert.danger({
                      message: _callErrors.callErrors.internalError,
                      payload: _context4.t0
                    });
                  }
                }
                this.connectError();
                throw _context4.t0;
              case 43:
                return _context4.abrupt("return", session);
              case 44:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[10, 30]]);
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
      var _getValidatedNumbers2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref7) {
        var _parsedToNumber, _parsedFromNumber;
        var toNumber, fromNumber, isConference, isWebphone, theFromNumber, waitingValidateNumbers, parsedToNumber, parsedFromNumber, numbers, validResult, parsedNumbers, toNumberIndex, fromNumberIndex, parsedToNumberE164, parsedFromNumberE164;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                toNumber = _ref7.toNumber, fromNumber = _ref7.fromNumber, isConference = _ref7.isConference;
                isWebphone = this._deps.callingSettings.callingMode === _CallingSettings.callingModes.webphone;
                theFromNumber = fromNumber || (isWebphone ? this._deps.callingSettings.fromNumber : this._deps.callingSettings.myLocation);
                if (!(isWebphone && (theFromNumber === null || theFromNumber === ''))) {
                  _context5.next = 5;
                  break;
                }
                return _context5.abrupt("return", null);
              case 5:
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
                  _context5.next = 27;
                  break;
                }
                numbers = waitingValidateNumbers.map(function (x) {
                  return x.number;
                });
                _context5.next = 12;
                return this._deps.numberValidate.validate(numbers);
              case 12:
                validResult = _context5.sent;
                if (validResult.result) {
                  _context5.next = 17;
                  break;
                }
                if (validResult.result) {
                  _context5.next = 17;
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
                return _context5.abrupt("return", null);
              case 17:
                _context5.next = 19;
                return this._deps.numberValidate.parseNumbers(numbers);
              case 19:
                _context5.t0 = _context5.sent;
                if (_context5.t0) {
                  _context5.next = 22;
                  break;
                }
                _context5.t0 = [];
              case 22:
                parsedNumbers = _context5.t0;
                toNumberIndex = waitingValidateNumbers.findIndex(function (x) {
                  return x.type === TO_NUMBER;
                });
                fromNumberIndex = waitingValidateNumbers.findIndex(function (x) {
                  return x.type === FROM_NUMBER;
                });
                parsedToNumber = parsedNumbers[toNumberIndex];
                parsedFromNumber = parsedNumbers[fromNumberIndex];
              case 27:
                parsedToNumberE164 = (_parsedToNumber = parsedToNumber) === null || _parsedToNumber === void 0 ? void 0 : _parsedToNumber.parsedNumber;
                parsedFromNumberE164 = (_parsedFromNumber = parsedFromNumber) === null || _parsedFromNumber === void 0 ? void 0 : _parsedFromNumber.parsedNumber;
                if (isWebphone && theFromNumber === ANONYMOUS) {
                  parsedFromNumberE164 = ANONYMOUS;
                }
                return _context5.abrupt("return", {
                  toNumber: isConference ? parsedToNumberE164 || toNumber : parsedToNumberE164,
                  fromNumber: parsedFromNumberE164
                });
              case 31:
              case "end":
                return _context5.stop();
            }
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
      var _makeCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref8) {
        var toNumber, fromNumber, _ref8$callingMode, callingMode, _ref8$extendedControl, extendedControls, homeCountryId, session;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                toNumber = _ref8.toNumber, fromNumber = _ref8.fromNumber, _ref8$callingMode = _ref8.callingMode, callingMode = _ref8$callingMode === void 0 ? this._deps.callingSettings.callingMode : _ref8$callingMode, _ref8$extendedControl = _ref8.extendedControls, extendedControls = _ref8$extendedControl === void 0 ? [] : _ref8$extendedControl;
                homeCountryId = this._deps.regionSettings.homeCountryId;
                _context6.t0 = callingMode;
                _context6.next = _context6.t0 === _CallingSettings.callingModes.softphone ? 5 : _context6.t0 === _CallingSettings.callingModes.jupiter ? 5 : _context6.t0 === _CallingSettings.callingModes.ringout ? 7 : _context6.t0 === _CallingSettings.callingModes.webphone ? 11 : 22;
                break;
              case 5:
                session = this._deps.softphone.makeCall(toNumber, callingMode);
                return _context6.abrupt("break", 23);
              case 7:
                _context6.next = 9;
                return this._deps.ringout.makeCall({
                  fromNumber: fromNumber,
                  toNumber: toNumber && toNumber.split('*')[0],
                  // remove extension number in ringout mode
                  prompt: this._deps.callingSettings.ringoutPrompt
                });
              case 9:
                session = _context6.sent;
                return _context6.abrupt("break", 23);
              case 11:
                if (!this.isActiveCallControlApplicable) {
                  _context6.next = 17;
                  break;
                }
                _context6.next = 14;
                return this._deps.activeCallControl.makeCall({
                  fromNumber: fromNumber,
                  toNumber: toNumber,
                  homeCountryId: homeCountryId,
                  extendedControls: extendedControls
                });
              case 14:
                session = _context6.sent;
                _context6.next = 21;
                break;
              case 17:
                if (!this._deps.webphone) {
                  _context6.next = 21;
                  break;
                }
                _context6.next = 20;
                return this._deps.webphone.makeCall({
                  fromNumber: fromNumber,
                  toNumber: toNumber,
                  homeCountryId: homeCountryId,
                  extendedControls: extendedControls
                });
              case 20:
                session = _context6.sent;
              case 21:
                return _context6.abrupt("break", 23);
              case 22:
                return _context6.abrupt("break", 23);
              case 23:
                return _context6.abrupt("return", session);
              case 24:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function _makeCall(_x3) {
        return _makeCall2.apply(this, arguments);
      }
      return _makeCall;
    }()
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
  return Call;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "callStatus", [_core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "toNumberMatched", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "toNumberMatched"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanToNumberEntities", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanToNumberEntities"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastValidatedToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastValidatedToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connect", [_dec2, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectSuccess", [_dec3, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "connectSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "connectError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "call", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "call"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getValidatedNumbers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_getValidatedNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_makeCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_makeCall"), _class2.prototype)), _class2)) || _class);
exports.Call = Call;
//# sourceMappingURL=Call.js.map
