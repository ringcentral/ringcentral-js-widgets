"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettings = exports.BLOCKED_ID_VALUE = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _callingModes = require("./callingModes");
var _callingOptions = require("./callingOptions");
var _callingSettingsMessages = require("./callingSettingsMessages");
var _deprecatedCallingOptions = require("./deprecatedCallingOptions");
var _mapOptionToMode = require("./mapOptionToMode");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2;
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
var LOCATION_NUMBER_ORDER = ['Other', 'Main'];
var BLOCKED_ID_VALUE = 'anonymous';
/**
 * @class
 * @description Call setting managing module
 */
exports.BLOCKED_ID_VALUE = BLOCKED_ID_VALUE;
var CallingSettings = (_dec = (0, _di.Module)({
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
  _inherits(CallingSettings, _RcModuleV);
  var _super = _createSuper(CallingSettings);
  function CallingSettings(deps) {
    var _this$_deps$callingSe, _this$_deps$callingSe2, _this$_deps$callingSe3, _this$_deps$callingSe4, _this$_deps$callingSe5, _this$_deps$callingSe6;
    var _this;
    _classCallCheck(this, CallingSettings);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'CallingSettings'
    });
    _this._myPhoneNumbers = void 0;
    _this._onFirstLogin = void 0;
    _this._ringoutEnabled = void 0;
    _this._otherPhoneNumbers = void 0;
    _this._webphoneEnabled = void 0;
    _this._blockedIdDisabled = void 0;
    _this._showCallWithJupiter = void 0;
    _this._emergencyCallAvailable = void 0;
    _this._availableNumbers = void 0;
    _this.initRingoutPrompt = void 0;
    // For Japan Emergency Service notification
    _initializerDefineProperty(_this, "acknowledgeJPMessage", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "data", _descriptor2, _assertThisInitialized(_this));
    _this._onFirstLogin = (_this$_deps$callingSe = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe === void 0 ? void 0 : _this$_deps$callingSe.onFirstLogin;
    _this.initRingoutPrompt = (_this$_deps$callingSe2 = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe2 === void 0 ? void 0 : _this$_deps$callingSe2.defaultRingoutPrompt;
    _this._showCallWithJupiter = (_this$_deps$callingSe3 = (_this$_deps$callingSe4 = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe4 === void 0 ? void 0 : _this$_deps$callingSe4.showCallWithJupiter) !== null && _this$_deps$callingSe3 !== void 0 ? _this$_deps$callingSe3 : true;
    _this._emergencyCallAvailable = (_this$_deps$callingSe5 = (_this$_deps$callingSe6 = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe6 === void 0 ? void 0 : _this$_deps$callingSe6.emergencyCallAvailable) !== null && _this$_deps$callingSe5 !== void 0 ? _this$_deps$callingSe5 : !!_this._deps.webphone;
    return _this;
  }
  _createClass(CallingSettings, [{
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
      var _updateFromNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(number) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._updateFromNumber(number);
              case 1:
              case "end":
                return _context.stop();
            }
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
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this._shouldReset() && !this._shouldInit() && this._shouldValidate())) {
                  _context2.next = 8;
                  break;
                }
                this._ringoutEnabled = this._deps.appFeatures.isRingOutEnabled;
                this._webphoneEnabled = this._deps.appFeatures.isWebPhoneEnabled;
                this._myPhoneNumbers = this.myPhoneNumbers;
                this._otherPhoneNumbers = this.otherPhoneNumbers;
                this._blockedIdDisabled = this.isBlockedIdDisabled;
                _context2.next = 8;
                return this._validateSettings();
              case 8:
              case "end":
                return _context2.stop();
            }
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
      var _onInitSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.isWebphoneMode) {
                  this._verifyJPEmergency();
                }
              case 1:
              case "end":
                return _context3.stop();
            }
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
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._init();
              case 2:
              case "end":
                return _context4.stop();
            }
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
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this._deps.appFeatures.isCallingEnabled) {
                  _context5.next = 3;
                  break;
                }
                this.setDataAction({
                  callWith: null,
                  timestamp: null
                });
                return _context5.abrupt("return");
              case 3:
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
                _context5.next = 13;
                return this._validateSettings();
              case 13:
                _context5.next = 15;
                return this._initFromNumber();
              case 15:
              case "end":
                return _context5.stop();
            }
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
      var _warningEmergencyCallingNotAvailable2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.callWith === _callingOptions.callingOptions.browser) {
                  this._deps.alert.warning({
                    message: _callingSettingsMessages.callingSettingsMessages.emergencyCallingNotAvailable,
                    ttl: 0
                  });
                }
              case 1:
              case "end":
                return _context6.stop();
            }
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
      var _validateSettings2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this._hasWebphonePermissionRemoved()) {
                  _context7.next = 7;
                  break;
                }
                if (!this._deps.appFeatures.isSoftphoneEnabled) {
                  _context7.next = 4;
                  break;
                }
                _context7.next = 4;
                return this._setSoftPhoneToCallWith();
              case 4:
                this._deps.alert.danger({
                  message: _callingSettingsMessages.callingSettingsMessages.webphonePermissionRemoved,
                  ttl: 0
                });
                _context7.next = 15;
                break;
              case 7:
                if (!this._hasPermissionChanged()) {
                  _context7.next = 14;
                  break;
                }
                if (!this._deps.appFeatures.isSoftphoneEnabled) {
                  _context7.next = 11;
                  break;
                }
                _context7.next = 11;
                return this._setSoftPhoneToCallWith();
              case 11:
                this._deps.alert.danger({
                  message: _callingSettingsMessages.callingSettingsMessages.permissionChanged,
                  ttl: 0
                });
                _context7.next = 15;
                break;
              case 14:
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
              case 15:
                if (this.isBlockedIdDisabled && this.fromNumber === BLOCKED_ID_VALUE) {
                  this._initFromNumber();
                }
              case 16:
              case "end":
                return _context7.stop();
            }
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
      var _verifyJPEmergency2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var hasJapanNumber;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this.acknowledgeJPMessage) {
                  _context8.next = 2;
                  break;
                }
                return _context8.abrupt("return");
              case 2:
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
              case 4:
              case "end":
                return _context8.stop();
            }
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
      var _setSoftPhoneToCallWith2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.setDataAction({
                  callWith: _callingOptions.callingOptions.softphone,
                  timestamp: Date.now()
                });
              case 1:
              case "end":
                return _context9.stop();
            }
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
      var mainCompanyNumber = this._deps.extensionPhoneNumber.mainCompanyNumber;
      var extensionNumber = this._deps.extensionInfo.extensionNumber;
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
      var _initFromNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var fromNumber, _this$_deps$callerId, defaultCallerId, _this$_deps$callerId2, _this$_deps$callerId3, defaultPhoneNumber, defaultEntry;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                fromNumber = this.fromNumber;
                if (!(!fromNumber || fromNumber === BLOCKED_ID_VALUE && this.isBlockedIdDisabled)) {
                  _context10.next = 6;
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
                _context10.next = 6;
                return this.updateFromNumber(defaultCallerId);
              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function _initFromNumber() {
        return _initFromNumber2.apply(this, arguments);
      }
      return _initFromNumber;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_ref2, withPrompt) {
        var callWith, myLocation, ringoutPrompt, isCustomLocation;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
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
              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function setData(_x2, _x3) {
        return _setData.apply(this, arguments);
      }
      return setData;
    }()
  }, {
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
    key: "myPhoneNumbers",
    get: function get() {
      var _this$_deps$extension = this._deps.extensionPhoneNumber,
        directNumbers = _this$_deps$extension.directNumbers,
        mainCompanyNumber = _this$_deps$extension.mainCompanyNumber;
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
      var _this$_deps$extension2 = this._deps.extensionPhoneNumber,
        callerIdNumbers = _this$_deps$extension2.callerIdNumbers,
        directNumbers = _this$_deps$extension2.directNumbers;
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
    } /* ringtone */
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
    } /* India go */
  }, {
    key: "isBlockedIdDisabled",
    get: function get() {
      var _this$_deps$extension3, _this$_deps$extension4;
      return ((_this$_deps$extension3 = this._deps.extensionFeatures.features) === null || _this$_deps$extension3 === void 0 ? void 0 : (_this$_deps$extension4 = _this$_deps$extension3.BlockingCallerId) === null || _this$_deps$extension4 === void 0 ? void 0 : _this$_deps$extension4.available) === false;
    }
  }]);
  return CallingSettings;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "acknowledgeJPMessage", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "setDataAction", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDataAction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateFromNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateFromNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAcknowledgeJPMessage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setAcknowledgeJPMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_validateSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_verifyJPEmergency", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_verifyJPEmergency"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSoftPhoneToCallWith", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSoftPhoneToCallWith"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initFromNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_initFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "myPhoneNumbers", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "myPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "otherPhoneNumbers", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "otherPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callWithOptions", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "callWithOptions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fromNumbers", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "fromNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableNumbers", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "availableNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableNumbersWithLabel", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "availableNumbersWithLabel"), _class2.prototype)), _class2)) || _class);
exports.CallingSettings = CallingSettings;
//# sourceMappingURL=CallingSettings.js.map
