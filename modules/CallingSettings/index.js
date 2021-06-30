"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _selector = require("../../lib/selector");

var _actionTypes = require("./actionTypes");

var _callingModes = _interopRequireDefault(require("./callingModes"));

var _callingOptions = _interopRequireDefault(require("./callingOptions"));

var _callingSettingsMessages = require("./callingSettingsMessages");

var _deprecatedCallingOptions = _interopRequireDefault(require("./deprecatedCallingOptions"));

var _getCallingSettingsReducer = require("./getCallingSettingsReducer");

var _mapOptionToMode = _interopRequireDefault(require("./mapOptionToMode"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var LOCATION_NUMBER_ORDER = ['Other', 'Main'];
/**
 * @class
 * @description Call setting managing module
 */

var CallingSettings = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Brand', 'ExtensionInfo', 'ExtensionPhoneNumber', 'ForwardingNumber', 'Storage', 'ExtensionFeatures', 'ExtensionDevice', {
    dep: 'CallerId',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'CallingSettingsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(CallingSettings, _RcModule);

  var _super = _createSuper(CallingSettings);

  function CallingSettings(_ref) {
    var _this;

    var alert = _ref.alert,
        brand = _ref.brand,
        extensionInfo = _ref.extensionInfo,
        extensionPhoneNumber = _ref.extensionPhoneNumber,
        forwardingNumber = _ref.forwardingNumber,
        storage = _ref.storage,
        extensionFeatures = _ref.extensionFeatures,
        tabManager = _ref.tabManager,
        onFirstLogin = _ref.onFirstLogin,
        webphone = _ref.webphone,
        callerId = _ref.callerId,
        _ref$emergencyCallAva = _ref.emergencyCallAvailable,
        emergencyCallAvailable = _ref$emergencyCallAva === void 0 ? false : _ref$emergencyCallAva,
        defaultRingoutPrompt = _ref.defaultRingoutPrompt,
        _ref$showCallWithJupi = _ref.showCallWithJupiter,
        showCallWithJupiter = _ref$showCallWithJupi === void 0 ? true : _ref$showCallWithJupi,
        extensionDevice = _ref.extensionDevice,
        options = _objectWithoutProperties(_ref, ["alert", "brand", "extensionInfo", "extensionPhoneNumber", "forwardingNumber", "storage", "extensionFeatures", "tabManager", "onFirstLogin", "webphone", "callerId", "emergencyCallAvailable", "defaultRingoutPrompt", "showCallWithJupiter", "extensionDevice"]);

    _classCallCheck(this, CallingSettings);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes.actionTypes
    }));

    _initializerDefineProperty(_this, "callWithOptions", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "myPhoneNumbers", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "otherPhoneNumbers", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "availableNumbers", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "availableNumbersWithLabel", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "fromNumbers", _descriptor6, _assertThisInitialized(_this));

    _this._alert = alert;
    _this._brand = brand;
    _this._extensionInfo = extensionInfo;
    _this._extensionPhoneNumber = extensionPhoneNumber;
    _this._forwardingNumber = forwardingNumber;
    _this._storage = storage;
    _this._extensionFeatures = extensionFeatures;
    _this._tabManager = tabManager;
    _this._webphone = webphone;
    _this._callerId = callerId;
    _this._storageKey = 'callingSettingsData';
    _this._emergencyCallAvailable = emergencyCallAvailable;
    _this._extensionDevice = extensionDevice;
    _this._onFirstLogin = onFirstLogin;
    _this.initRingoutPrompt = defaultRingoutPrompt;

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getCallingSettingsReducer.getCallingSettingsStorageReducer)(_this.actionTypes)
    });

    _this._reducer = (0, _getCallingSettingsReducer.getCallingSettingsReducer)(_this.actionTypes);
    _this._showCallWithJupiter = showCallWithJupiter;
    return _this;
  }

  _createClass(CallingSettings, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 7;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });
                _context.next = 4;
                return this._init();

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 18;
                break;

              case 7:
                if (!this._shouldReset()) {
                  _context.next = 11;
                  break;
                }

                this._reset();

                _context.next = 18;
                break;

              case 11:
                if (!this._shouldValidate()) {
                  _context.next = 18;
                  break;
                }

                this._ringoutEnabled = this._extensionFeatures.isRingOutEnabled;
                this._webphoneEnabled = this._extensionFeatures.isWebPhoneEnabled;
                this._myPhoneNumbers = this.myPhoneNumbers;
                this._otherPhoneNumbers = this.otherPhoneNumbers;
                _context.next = 18;
                return this._validateSettings();

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._storage.ready && this._extensionInfo.ready && this._extensionPhoneNumber.ready && this._forwardingNumber.ready && (!this._callerId || this._callerId.ready) && this._extensionFeatures.ready && this._extensionDevice.ready && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(this.ready && (!this._storage.ready || !this._extensionInfo.ready || !this._extensionPhoneNumber.ready || !this._forwardingNumber.ready || !this._extensionFeatures.ready || this._callerId && !this._callerId.ready || !this._extensionDevice.ready));
    }
  }, {
    key: "_shouldValidate",
    value: function _shouldValidate() {
      return this.ready && (this._ringoutEnabled !== this._extensionFeatures.isRingOutEnabled || this._webphoneEnabled !== this._extensionFeatures.isWebPhoneEnabled || this._myPhoneNumbers !== this.myPhoneNumbers || this._otherPhoneNumbers !== this.otherPhoneNumbers);
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var defaultCallWith;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._extensionFeatures.isCallingEnabled) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                this._myPhoneNumbers = this.myPhoneNumbers;
                this._otherPhoneNumbers = this.otherPhoneNumbers;
                this._availableNumbers = this.availableNumbers;
                this._ringoutEnabled = this._extensionFeatures.isRingOutEnabled;
                this._webphoneEnabled = this._extensionFeatures.isWebPhoneEnabled;

                if (!this.timestamp) {
                  // first time login
                  defaultCallWith = this.callWithOptions && this.callWithOptions[0];
                  this.store.dispatch({
                    type: this.actionTypes.setData,
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

                if (this.callWith === _deprecatedCallingOptions["default"].myphone || this.callWith === _deprecatedCallingOptions["default"].otherphone || this.callWith === _deprecatedCallingOptions["default"].customphone) {
                  this.store.dispatch({
                    type: this.actionTypes.setData,
                    callWith: _callingOptions["default"].ringout,
                    isCustomLocation: this.callWith === _deprecatedCallingOptions["default"].customphone
                  });
                }

                _context2.next = 11;
                return this._validateSettings();

              case 11:
                _context2.next = 13;
                return this._initFromNumber();

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
  }, {
    key: "_reset",
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "_initFromNumber",
    value: function () {
      var _initFromNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var fromNumber, _this$_callerId, defaultCallerId, _this$_callerId2, _this$_callerId2$ring, defaultPhoneNumber, defaultEntry;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fromNumber = this.fromNumber;

                if (fromNumber) {
                  _context3.next = 6;
                  break;
                }

                defaultCallerId = this.fromNumbers[0];

                if ((_this$_callerId = this._callerId) === null || _this$_callerId === void 0 ? void 0 : _this$_callerId.ringOut) {
                  if (this._callerId.ringOut.type === 'Blocked') {
                    defaultCallerId = {
                      phoneNumber: 'anonymous'
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

                _context3.next = 6;
                return this.updateFromNumber(defaultCallerId);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _initFromNumber() {
        return _initFromNumber2.apply(this, arguments);
      }

      return _initFromNumber;
    }()
  }, {
    key: "updateFromNumber",
    value: function () {
      var _updateFromNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(number) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateFromNumber,
                  number: number && number.phoneNumber
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateFromNumber(_x) {
        return _updateFromNumber.apply(this, arguments);
      }

      return updateFromNumber;
    }()
  }, {
    key: "_setSoftPhoneToCallWith",
    value: function () {
      var _setSoftPhoneToCallWith2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.setData,
                  callWith: _callingOptions["default"].softphone,
                  timestamp: Date.now()
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _setSoftPhoneToCallWith() {
        return _setSoftPhoneToCallWith2.apply(this, arguments);
      }

      return _setSoftPhoneToCallWith;
    }()
  }, {
    key: "_validateSettings",
    value: function () {
      var _validateSettings2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this._hasWebphonePermissionRemoved()) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 3;
                return this._setSoftPhoneToCallWith();

              case 3:
                this._alert.danger({
                  message: _callingSettingsMessages.callingSettingsMessages.webphonePermissionRemoved,
                  ttl: 0
                });

                _context6.next = 13;
                break;

              case 6:
                if (!this._hasPermissionChanged()) {
                  _context6.next = 12;
                  break;
                }

                _context6.next = 9;
                return this._setSoftPhoneToCallWith();

              case 9:
                this._alert.danger({
                  message: _callingSettingsMessages.callingSettingsMessages.permissionChanged,
                  ttl: 0
                });

                _context6.next = 13;
                break;

              case 12:
                if (this._hasPhoneNumberChanged()) {
                  this.store.dispatch({
                    type: this.actionTypes.setData,
                    callWith: _callingOptions["default"].ringout,
                    myLocation: this._myPhoneNumbers[0],
                    timestamp: Date.now()
                  });

                  this._alert.danger({
                    message: _callingSettingsMessages.callingSettingsMessages.phoneNumberChanged,
                    ttl: 0
                  });
                }

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _validateSettings() {
        return _validateSettings2.apply(this, arguments);
      }

      return _validateSettings;
    }()
  }, {
    key: "_hasWebphonePermissionRemoved",
    value: function _hasWebphonePermissionRemoved() {
      return !(this._webphoneEnabled && this._webphone) && this.callWith === _callingOptions["default"].browser;
    }
  }, {
    key: "_hasPermissionChanged",
    value: function _hasPermissionChanged() {
      return !this._ringoutEnabled && this.callWith === _callingOptions["default"].ringout;
    }
  }, {
    key: "_hasPhoneNumberChanged",
    value: function _hasPhoneNumberChanged() {
      return this.callWith === _callingOptions["default"].ringout && !this.isCustomLocation && this._availableNumbers.indexOf(this.myLocation) === -1;
    }
  }, {
    key: "_getLocationLabel",
    value: function _getLocationLabel(phoneNumber) {
      var devices = this._extensionDevice.devices;
      var flipNumbers = this._forwardingNumber.flipNumbers;
      var mainCompanyNumber = this._extensionPhoneNumber.mainCompanyNumber;
      var extensionNumber = this._extensionInfo.extensionNumber;
      var mainPhoneNumber = "".concat(mainCompanyNumber.phoneNumber, "*").concat(extensionNumber);
      var name = null;

      if (devices.length) {
        var registedWithDevice = false;
        devices.forEach(function (device) {
          var phoneLines = device.phoneLines;

          if (phoneLines.length) {
            registedWithDevice = phoneLines.find(function (phoneLine) {
              return phoneLine.phoneInfo.phoneNumber === phoneNumber;
            });

            if (registedWithDevice) {
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

      if (phoneNumber === mainPhoneNumber) {
        return 'Main';
      }

      return 'Other';
    }
  }, {
    key: "_warningEmergencyCallingNotAvailable",
    value: function () {
      var _warningEmergencyCallingNotAvailable2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.callWith === _callingOptions["default"].browser) {
                  this._alert.info({
                    message: _callingSettingsMessages.callingSettingsMessages.emergencyCallingNotAvailable,
                    ttl: 0
                  });
                }

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _warningEmergencyCallingNotAvailable() {
        return _warningEmergencyCallingNotAvailable2.apply(this, arguments);
      }

      return _warningEmergencyCallingNotAvailable;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_ref2, withPrompt) {
        var callWith, myLocation, ringoutPrompt, isCustomLocation;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                callWith = _ref2.callWith, myLocation = _ref2.myLocation, ringoutPrompt = _ref2.ringoutPrompt, isCustomLocation = _ref2.isCustomLocation;
                // TODO validate myLocation
                this.store.dispatch({
                  type: this.actionTypes.setData,
                  callWith: callWith,
                  myLocation: myLocation,
                  ringoutPrompt: ringoutPrompt,
                  isCustomLocation: isCustomLocation,
                  timestamp: Date.now()
                });

                if (withPrompt) {
                  if (this.callWith === _callingOptions["default"].softphone) {
                    this._alert.info({
                      message: _callingSettingsMessages.callingSettingsMessages.saveSuccessWithSoftphone
                    });
                  } else if (this.callWith === _callingOptions["default"].jupiter) {
                    this._alert.info({
                      message: _callingSettingsMessages.callingSettingsMessages.saveSuccessWithJupiter
                    });
                  } else {
                    this._alert.info({
                      message: _callingSettingsMessages.callingSettingsMessages.saveSuccess
                    });

                    if (!this._emergencyCallAvailable) {
                      this._warningEmergencyCallingNotAvailable();
                    }
                  }
                }

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setData(_x2, _x3) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
    /* ringtone */

  }, {
    key: "data",
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "callWith",
    get: function get() {
      return this.data.callWith;
    }
  }, {
    key: "callingMode",
    get: function get() {
      return (0, _mapOptionToMode["default"])(this.callWith);
    }
  }, {
    key: "ringoutPrompt",
    get: function get() {
      return this.data.ringoutPrompt;
    }
  }, {
    key: "defaultRingoutPrompt",
    get: function get() {
      return this.initRingoutPrompt;
    }
  }, {
    key: "myLocation",
    get: function get() {
      return this.data.myLocation;
    }
  }, {
    key: "isCustomLocation",
    get: function get() {
      return this.data.isCustomLocation;
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this.data.timestamp;
    }
  }, {
    key: "isWebphoneMode",
    get: function get() {
      return this.callingMode === _callingModes["default"].webphone;
    }
  }, {
    key: "fromNumber",
    get: function get() {
      return this.data.fromNumber;
    }
  }, {
    key: "isChangeRingToneAllowed",
    get: function get() {
      return this._webphone && (this._storage.driver === 'INDEXEDDB' || this._storage.driver === 'WEBSQL');
    }
  }]);

  return CallingSettings;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "_initFromNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_initFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateFromNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSoftPhoneToCallWith", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSoftPhoneToCallWith"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_validateSettings", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "callWithOptions", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3._extensionFeatures.isRingOutEnabled;
    }, function () {
      return _this3._extensionFeatures.isWebPhoneEnabled;
    }, function () {
      return _this3.otherPhoneNumbers.length > 0;
    }, function () {
      return _this3._extensionPhoneNumber.numbers.length > 0;
    }, function (ringoutEnabled, webphoneEnabled, hasOtherPhone, hasExtensionPhoneNumber) {
      if (!hasExtensionPhoneNumber) {
        return [_callingOptions["default"].softphone];
      }

      var callWithOptions = [];

      if (_this3._webphone && webphoneEnabled) {
        callWithOptions.push(_callingOptions["default"].browser);
      }

      if (_this3._brand && _this3._showCallWithJupiter) {
        callWithOptions.push(_callingOptions["default"].jupiter);
      }

      callWithOptions.push(_callingOptions["default"].softphone);

      if (ringoutEnabled) {
        callWithOptions.push(_callingOptions["default"].ringout);
      }

      return callWithOptions;
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "myPhoneNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4._extensionPhoneNumber.directNumbers;
    }, function () {
      return _this4._extensionPhoneNumber.mainCompanyNumber;
    }, function () {
      return _this4._extensionInfo.extensionNumber;
    }, function (directNumbers, mainCompanyNumber, extensionNumber) {
      var myPhoneNumbers = directNumbers.map(function (item) {
        return item.phoneNumber;
      });

      if (mainCompanyNumber && extensionNumber) {
        myPhoneNumbers.push("".concat(mainCompanyNumber.phoneNumber, "*").concat(extensionNumber));
      }

      return myPhoneNumbers;
    }];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "otherPhoneNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5._forwardingNumber.flipNumbers;
    }, function () {
      return _this5._extensionPhoneNumber.callerIdNumbers;
    }, function () {
      return _this5._extensionPhoneNumber.directNumbers;
    }, function (flipNumbers, callerIdNumbers, directNumbers) {
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
    }];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "availableNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.myPhoneNumbers;
    }, function () {
      return _this6.otherPhoneNumbers;
    }, function (myPhoneNumbers, otherPhoneNumbers) {
      var phoneNumbers = myPhoneNumbers.concat(otherPhoneNumbers);
      return phoneNumbers;
    }];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "availableNumbersWithLabel", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7.availableNumbers;
    }, function (availableNumbers) {
      var result = [];

      if (availableNumbers.length) {
        availableNumbers.forEach(function (phoneNumber) {
          var locationLabel = _this7._getLocationLabel(phoneNumber);

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
    }];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "fromNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8._extensionPhoneNumber.callerIdNumbers;
    }, function (phoneNumbers) {
      return phoneNumbers.sort(function (firstItem, lastItem) {
        if (firstItem.usageType === 'DirectNumber') return -1;
        if (lastItem.usageType === 'DirectNumber') return 1;
        if (firstItem.usageType === 'MainCompanyNumber') return -1;
        if (lastItem.usageType === 'MainCompanyNumber') return 1;
        if (firstItem.usageType < lastItem.usageType) return -1;
        if (firstItem.usageType > lastItem.usageType) return 1;
        return 0;
      });
    }];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype)), _class2)) || _class);
exports["default"] = CallingSettings;
//# sourceMappingURL=index.js.map
