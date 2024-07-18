"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.split");
require("core-js/modules/es.string.trim");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerUI = void 0;
require("regenerator-runtime/runtime");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _di = require("@ringcentral-integration/commons/lib/di");
var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");
var _getCallingOption = require("@ringcentral-integration/commons/lib/getCallingOption");
var _normalizeNumber2 = require("@ringcentral-integration/commons/lib/normalizeNumber");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _Call = require("@ringcentral-integration/commons/modules/Call");
var _core = require("@ringcentral-integration/core");
var _phoneNumber = require("@ringcentral-integration/phone-number");
var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
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
var TIMEOUT = 60 * 1000;
var DialerUI = (_dec = (0, _di.Module)({
  name: 'DialerUI',
  deps: ['CallingSettings', 'ConnectivityManager', 'Locale', 'RateLimiter', 'RegionSettings', 'Alert', 'Call', 'ExtensionFeatures', 'AccountInfo', {
    dep: 'AudioSettings',
    optional: true
  }, {
    dep: 'ContactSearch',
    optional: true
  }, {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'DialerUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.recipient];
}), _dec3 = (0, _core.computed)(function (that) {
  var _that$_deps$contactSe;
  return [(_that$_deps$contactSe = that._deps.contactSearch) === null || _that$_deps$contactSe === void 0 ? void 0 : _that$_deps$contactSe.sortedResult, that.toNumberField];
}), _dec4 = (0, _core.track)(function (that, trackCallMadeFrom) {
  var callingOption = (0, _getCallingOption.getCallingOption)(that._deps.callingSettings.callingMode);
  return [_trackEvents.trackEvents.callMade, {
    callingOption: callingOption,
    Location: trackCallMadeFrom
  }];
}), _dec5 = (0, _core.track)(function (that, eventName, contactType) {
  return [eventName, {
    contactType: contactType,
    location: 'Dialpad'
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(DialerUI, _RcUIModuleV);
  var _super = _createSuper(DialerUI);
  function DialerUI(deps) {
    var _this;
    _classCallCheck(this, DialerUI);
    _this = _super.call(this, {
      deps: deps
    });
    _this._latestCallTime = 0;
    _this._lastSearchInput = '';
    _this._callHooks = [];
    /**
     * verify is that call can be continue before make call
     */
    _this.callVerify = void 0;
    _initializerDefineProperty(_this, "toNumberField", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "isLastInputFromDialpad", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "recipient", _descriptor3, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(DialerUI, [{
    key: "_setToNumberField",
    value: function _setToNumberField(val) {
      this.toNumberField = val;
    }
  }, {
    key: "setIsLastInputFromDialpad",
    value: function setIsLastInputFromDialpad(val) {
      this.isLastInputFromDialpad = val;
    }
  }, {
    key: "_setRecipient",
    value: function _setRecipient(val) {
      this.recipient = val;
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.resetState({
        toNumberField: '',
        isLastInputFromDialpad: false,
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Recipient'.
        recipient: null
      });
      this._lastSearchInput = '';
    }
  }, {
    key: "resetState",
    value: function resetState() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          toNumberField: '',
          isLastInputFromDialpad: false,
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Recipient'.
          recipient: null
        },
        toNumberField = _ref.toNumberField,
        isLastInputFromDialpad = _ref.isLastInputFromDialpad,
        recipient = _ref.recipient;
      this.toNumberField = toNumberField;
      this.isLastInputFromDialpad = isLastInputFromDialpad;
      this.recipient = recipient;
    }
  }, {
    key: "clearToNumberField",
    value: function () {
      var _clearToNumberField = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$_deps$contactSe;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._setToNumberField('');
                _context.next = 3;
                return (_this$_deps$contactSe = this._deps.contactSearch) === null || _this$_deps$contactSe === void 0 ? void 0 : _this$_deps$contactSe.clearAndReset();
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function clearToNumberField() {
        return _clearToNumberField.apply(this, arguments);
      }
      return clearToNumberField;
    }()
  }, {
    key: "setToNumberField",
    value: function () {
      var _setToNumberField2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(phoneNumber) {
        var fromDialPad,
          _this$_deps$dialerUIO,
          _this$toNumberField,
          _this$_deps$contactSe2,
          _this$_deps$contactSe3,
          _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fromDialPad = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
                if (!(this.toNumberField !== phoneNumber)) {
                  _context2.next = 7;
                  break;
                }
                this.resetState({
                  toNumberField: phoneNumber,
                  isLastInputFromDialpad: fromDialPad,
                  recipient: this.recipient
                });
                if (!(((_this$_deps$dialerUIO = this._deps.dialerUIOptions) === null || _this$_deps$dialerUIO === void 0 ? void 0 : _this$_deps$dialerUIO.useV2) && ((_this$toNumberField = this.toNumberField) === null || _this$toNumberField === void 0 ? void 0 : _this$toNumberField.length) >= 3)) {
                  _context2.next = 7;
                  break;
                }
                _context2.next = 6;
                return (_this$_deps$contactSe2 = this._deps.contactSearch) === null || _this$_deps$contactSe2 === void 0 ? void 0 : _this$_deps$contactSe2.setPrepareSearch();
              case 6:
                (_this$_deps$contactSe3 = this._deps.contactSearch) === null || _this$_deps$contactSe3 === void 0 ? void 0 : _this$_deps$contactSe3.debouncedSearch({
                  searchString: this.toNumberField
                });
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function setToNumberField(_x) {
        return _setToNumberField2.apply(this, arguments);
      }
      return setToNumberField;
    }()
  }, {
    key: "setRecipient",
    value: function () {
      var _setRecipient2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(recipient) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._lastSearchInput = this.toNumberField;
                this.resetState({
                  toNumberField: '',
                  isLastInputFromDialpad: false,
                  recipient: recipient
                });
              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function setRecipient(_x2) {
        return _setRecipient2.apply(this, arguments);
      }
      return setRecipient;
    }()
  }, {
    key: "clearRecipient",
    value: function () {
      var _clearRecipient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.resetState({
                  toNumberField: '',
                  isLastInputFromDialpad: false,
                  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Recipient'.
                  recipient: null
                });
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function clearRecipient() {
        return _clearRecipient.apply(this, arguments);
      }
      return clearRecipient;
    }()
  }, {
    key: "triggerHook",
    value: function () {
      var _triggerHook = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref2) {
        var _ref2$phoneNumber, phoneNumber, _ref2$recipient, recipient, _ref2$fromNumber, fromNumber, _iterator, _step, hook;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref2$phoneNumber = _ref2.phoneNumber, phoneNumber = _ref2$phoneNumber === void 0 ? '' : _ref2$phoneNumber, _ref2$recipient = _ref2.recipient, recipient = _ref2$recipient === void 0 ? null : _ref2$recipient, _ref2$fromNumber = _ref2.fromNumber, fromNumber = _ref2$fromNumber === void 0 ? null : _ref2$fromNumber;
                _iterator = _createForOfIteratorHelper(this._callHooks);
                _context5.prev = 2;
                _iterator.s();
              case 4:
                if ((_step = _iterator.n()).done) {
                  _context5.next = 10;
                  break;
                }
                hook = _step.value;
                _context5.next = 8;
                return hook({
                  phoneNumber: phoneNumber,
                  recipient: recipient,
                  fromNumber: fromNumber
                });
              case 8:
                _context5.next = 4;
                break;
              case 10:
                _context5.next = 15;
                break;
              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](2);
                _iterator.e(_context5.t0);
              case 15:
                _context5.prev = 15;
                _iterator.f();
                return _context5.finish(15);
              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 12, 15, 18]]);
      }));
      function triggerHook(_x3) {
        return _triggerHook.apply(this, arguments);
      }
      return triggerHook;
    }()
  }, {
    key: "trackCallMade",
    value: function trackCallMade(trackCallMadeFrom) {
      //
    }
  }, {
    key: "call",
    value: function () {
      var _call = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref3) {
        var _ref3$phoneNumber, phoneNumber, _ref3$recipient, recipient, _ref3$fromNumber, fromNumber, trackCallMadeFrom, _ref3$clickDialerToCa, clickDialerToCall, continueCall, _parse, hasInvalidChars, isValid, isValidNumber;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref3$phoneNumber = _ref3.phoneNumber, phoneNumber = _ref3$phoneNumber === void 0 ? '' : _ref3$phoneNumber, _ref3$recipient = _ref3.recipient, recipient = _ref3$recipient === void 0 ? null : _ref3$recipient, _ref3$fromNumber = _ref3.fromNumber, fromNumber = _ref3$fromNumber === void 0 ? null : _ref3$fromNumber, trackCallMadeFrom = _ref3.trackCallMadeFrom, _ref3$clickDialerToCa = _ref3.clickDialerToCall, clickDialerToCall = _ref3$clickDialerToCa === void 0 ? false : _ref3$clickDialerToCa;
                if (phoneNumber) {
                  phoneNumber = phoneNumber.trim();
                }
                if (recipient === null || recipient === void 0 ? void 0 : recipient.phoneNumber) {
                  recipient.phoneNumber = recipient.phoneNumber.trim();
                }
                if (!(phoneNumber || recipient)) {
                  _context6.next = 30;
                  break;
                }
                this._latestCallTime = Date.now();
                this.resetState({
                  toNumberField: phoneNumber,
                  isLastInputFromDialpad: false,
                  recipient: recipient
                });
                if (!this.callVerify) {
                  _context6.next = 12;
                  break;
                }
                _context6.next = 9;
                return this.callVerify({
                  phoneNumber: phoneNumber,
                  recipient: recipient
                });
              case 9:
                _context6.t0 = _context6.sent;
                _context6.next = 13;
                break;
              case 12:
                _context6.t0 = true;
              case 13:
                continueCall = _context6.t0;
                if (continueCall) {
                  _context6.next = 16;
                  break;
                }
                return _context6.abrupt("return");
              case 16:
                _context6.next = 18;
                return this.triggerHook({
                  phoneNumber: phoneNumber,
                  recipient: recipient,
                  fromNumber: fromNumber
                });
              case 18:
                // for data tracking
                _parse = (0, _phoneNumber.parse)({
                  input: this._lastSearchInput || this.toNumberField
                }), hasInvalidChars = _parse.hasInvalidChars, isValid = _parse.isValid;
                isValidNumber = !hasInvalidChars && isValid;
                _context6.prev = 20;
                _context6.next = 23;
                return this._deps.call.call({
                  phoneNumber: this.toNumberField,
                  recipient: this.recipient,
                  fromNumber: fromNumber,
                  clickDialerToCall: clickDialerToCall,
                  isValidNumber: isValidNumber
                });
              case 23:
                if (trackCallMadeFrom) {
                  this.trackCallMade(trackCallMadeFrom);
                }
                this.resetState();
                _context6.next = 30;
                break;
              case 27:
                _context6.prev = 27;
                _context6.t1 = _context6["catch"](20);
                console.log('[DialerUI] make call error', _context6.t1);
              case 30:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[20, 27]]);
      }));
      function call(_x4) {
        return _call.apply(this, arguments);
      }
      return call;
    }()
  }, {
    key: "_loadLastPhoneNumberAction",
    value: function _loadLastPhoneNumberAction() {
      this.resetState({
        // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        toNumberField: this._deps.call.lastPhoneNumber,
        recipient: this._deps.call.lastRecipient,
        isLastInputFromDialpad: false
      });
    }
  }, {
    key: "_loadLastPhoneNumber",
    value: function _loadLastPhoneNumber() {
      if (!this._deps.call.lastRecipient && !this._deps.call.lastPhoneNumber) {
        this._deps.alert.warning({
          message: _Call.callErrors.noToNumber
        });
        return;
      }
      this._loadLastPhoneNumberAction();
    }
  }, {
    key: "onCallButtonClick",
    value: function () {
      var _onCallButtonClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _ref4,
          fromNumber,
          fromSessionId,
          clickDialerToCall,
          _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref4 = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {}, fromNumber = _ref4.fromNumber, fromSessionId = _ref4.fromSessionId, clickDialerToCall = _ref4.clickDialerToCall;
                if (!("".concat(this.toNumberField).trim().length === 0 && !this.recipient)) {
                  _context7.next = 5;
                  break;
                }
                this._loadLastPhoneNumber();
                _context7.next = 8;
                break;
              case 5:
                // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
                this._onBeforeCall(fromSessionId);
                _context7.next = 8;
                return this.call({
                  phoneNumber: this.toNumberField,
                  recipient: this.recipient,
                  fromNumber: fromNumber,
                  clickDialerToCall: clickDialerToCall,
                  trackCallMadeFrom: 'Dialer'
                });
              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function onCallButtonClick() {
        return _onCallButtonClick.apply(this, arguments);
      }
      return onCallButtonClick;
    }() // * that fromSessionId send to children class
  }, {
    key: "_onBeforeCall",
    value: function _onBeforeCall(fromSessionId) {
      var _this$_deps$conferenc;
      (_this$_deps$conferenc = this._deps.conferenceCall) === null || _this$_deps$conferenc === void 0 ? void 0 : _this$_deps$conferenc.closeMergingPair();
    }
    /**
     * TODO: refactor with a better way to check if a call is placed by current device
     *
     * Check if a call is placed by current device, including call with browser, jupiter and ringcentral phone,
     * and timeout 60s is for when call with ringcentral phone or jupiter we can't make sure the call is placed immediately
     * so just in case other device make a call with same phone number when call from current device fail then we
     * should not count it as current device call
     * @deprecated
     */
  }, {
    key: "isCallFromCurrentDevice",
    value: function isCallFromCurrentDevice(phoneNumber) {
      var _this$_deps$call$last, _normalizeNumber, _this$_deps$call$last2;
      var originalPhoneNumber = this._deps.call.lastPhoneNumber || ((_this$_deps$call$last = this._deps.call.lastRecipient) === null || _this$_deps$call$last === void 0 ? void 0 : _this$_deps$call$last.phoneNumber);
      var formattedPhoneNumber = (_normalizeNumber = (0, _normalizeNumber2.normalizeNumber)({
        phoneNumber: this._deps.call.lastPhoneNumber || ((_this$_deps$call$last2 = this._deps.call.lastRecipient) === null || _this$_deps$call$last2 === void 0 ? void 0 : _this$_deps$call$last2.phoneNumber),
        countryCode: this._deps.regionSettings.countryCode,
        areaCode: this._deps.regionSettings.areaCode,
        maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength
        // if call out with extension number then only match main company number
      })) === null || _normalizeNumber === void 0 ? void 0 : _normalizeNumber.split('*')[0];
      // use includes since after we introduced EDP, the number dialed at to field maybe different to server parsed number.
      if (((phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.includes(formattedPhoneNumber)) || (phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.includes(originalPhoneNumber)) || phoneNumber === this._deps.call.lastValidatedToNumber) && Date.now() - this._latestCallTime <= TIMEOUT) {
        this._latestCallTime = 0;
        return true;
      }
      return false;
    }
  }, {
    key: "triggerEventTracking",
    value: function () {
      var _triggerEventTracking = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(eventName, contactType) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));
      function triggerEventTracking(_x5, _x6) {
        return _triggerEventTracking.apply(this, arguments);
      }
      return triggerEventTracking;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps$audioSett, _this$_deps$audioSett2, _this$_deps$audioSett3, _this$_deps$audioSett4, _this$_deps$dialerUIO2;
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        autoFocusToField = _ref5.autoFocusToField;
      return {
        currentLocale: this._deps.locale.currentLocale,
        // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        callingMode: this._deps.callingSettings.callingMode,
        isWebphoneMode: this._deps.callingSettings.isWebphoneMode,
        callButtonDisabled: this.isCallButtonDisabled,
        // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        fromNumber: this._deps.callingSettings.fromNumber,
        fromNumbers: this._deps.callingSettings.fromNumbers,
        toNumber: this.toNumberField,
        recipient: this.recipient,
        recipients: this.recipients,
        searchContactList: this.searchContactList,
        showSpinner: this.showSpinner,
        callVolume: (_this$_deps$audioSett = (_this$_deps$audioSett2 = this._deps.audioSettings) === null || _this$_deps$audioSett2 === void 0 ? void 0 : _this$_deps$audioSett2.callVolume) !== null && _this$_deps$audioSett !== void 0 ? _this$_deps$audioSett : 1,
        outputDeviceId: (_this$_deps$audioSett3 = (_this$_deps$audioSett4 = this._deps.audioSettings) === null || _this$_deps$audioSett4 === void 0 ? void 0 : _this$_deps$audioSett4.outputDeviceId) !== null && _this$_deps$audioSett3 !== void 0 ? _this$_deps$audioSett3 : '',
        isLastInputFromDialpad: this.isLastInputFromDialpad,
        disableFromField: this.disableFromField,
        // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
        useV2: (_this$_deps$dialerUIO2 = this._deps.dialerUIOptions) === null || _this$_deps$dialerUIO2 === void 0 ? void 0 : _this$_deps$dialerUIO2.useV2,
        // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
        showAnonymous: this.isShowAnonymous,
        autoFocus: autoFocusToField
      };
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;
      return {
        triggerEventTracking: function triggerEventTracking(eventName, contactType) {
          return _this2.triggerEventTracking(eventName, contactType);
        },
        onToNumberChange: function onToNumberChange() {
          return _this2.setToNumberField.apply(_this2, arguments);
        },
        clearToNumber: function clearToNumber() {
          return _this2.clearToNumberField();
        },
        onCallButtonClick: function onCallButtonClick() {
          return _this2.onCallButtonClick.apply(_this2, arguments);
        },
        changeFromNumber: function changeFromNumber() {
          var _this2$_deps$callingS;
          return (_this2$_deps$callingS = _this2._deps.callingSettings).updateFromNumber.apply(_this2$_deps$callingS, arguments);
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (
            // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
            (0, _formatNumber.formatNumber)({
              phoneNumber: phoneNumber,
              areaCode: _this2._deps.regionSettings.areaCode,
              countryCode: _this2._deps.regionSettings.countryCode,
              maxExtensionLength: _this2._deps.accountInfo.maxExtensionNumberLength
            })
          );
        },
        setRecipient: function setRecipient() {
          return _this2.setRecipient.apply(_this2, arguments);
        },
        clearRecipient: function clearRecipient() {
          return _this2.clearRecipient();
        },
        searchContact: function searchContact(searchString) {
          var _this2$_deps$contactS;
          return (// @ts-expect-error TS(2322): Type 'Promise<void> | undefined' is not assignable... Remove this comment to see the full error message
            (_this2$_deps$contactS = _this2._deps.contactSearch) === null || _this2$_deps$contactS === void 0 ? void 0 : _this2$_deps$contactS.debouncedSearch({
              searchString: searchString
            })
          );
        }
      };
    }
  }, {
    key: "recipients",
    get: function get() {
      if (this.recipient) {
        return [this.recipient];
      }
      return [];
    }
  }, {
    key: "searchContactList",
    get: function get() {
      if (this.toNumberField.length < 3 || !this._deps.contactSearch) {
        return [];
      }
      return this._deps.contactSearch.sortedResult.slice(0, 50);
    }
  }, {
    key: "isCallButtonDisabled",
    get: function get() {
      return !this._deps.call.isIdle || this._deps.connectivityManager.isOfflineMode || this._deps.connectivityManager.isWebphoneUnavailableMode || this._deps.connectivityManager.isWebphoneInitializing || this._deps.rateLimiter.throttling;
    }
  }, {
    key: "showSpinner",
    get: function get() {
      return !(this._deps.call.ready && this._deps.callingSettings.ready && this._deps.locale.ready && this._deps.extensionFeatures.ready && this._deps.connectivityManager.ready && (!this._deps.audioSettings || this._deps.audioSettings.ready) && !this._deps.connectivityManager.isWebphoneInitializing);
    }
  }, {
    key: "disableFromField",
    get: function get() {
      var _this$_deps$extension, _this$_deps$extension2;
      return this._deps.extensionFeatures.ready && !((_this$_deps$extension = this._deps.extensionFeatures.features) === null || _this$_deps$extension === void 0 ? void 0 : (_this$_deps$extension2 = _this$_deps$extension.EditOutboundCallerId) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.available);
    }
  }, {
    key: "isShowAnonymous",
    get: function get() {
      var _this$_deps$extension3, _this$_deps$extension4;
      return this._deps.extensionFeatures.ready && ((_this$_deps$extension3 = this._deps.extensionFeatures.features) === null || _this$_deps$extension3 === void 0 ? void 0 : (_this$_deps$extension4 = _this$_deps$extension3.BlockingCallerId) === null || _this$_deps$extension4 === void 0 ? void 0 : _this$_deps$extension4.available);
    }
  }]);
  return DialerUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "toNumberField", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setToNumberField", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setToNumberField"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isLastInputFromDialpad", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setIsLastInputFromDialpad", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setIsLastInputFromDialpad"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "recipient", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setRecipient", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "recipients", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "recipients"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchContactList", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "searchContactList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearToNumberField", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "clearToNumberField"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setToNumberField", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setToNumberField"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRecipient", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearRecipient", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "clearRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackCallMade", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "trackCallMade"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "call", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "call"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_loadLastPhoneNumberAction", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_loadLastPhoneNumberAction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onCallButtonClick", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onCallButtonClick"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "triggerEventTracking", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerEventTracking"), _class2.prototype)), _class2)) || _class);
exports.DialerUI = DialerUI;
//# sourceMappingURL=DialerUI.js.map
