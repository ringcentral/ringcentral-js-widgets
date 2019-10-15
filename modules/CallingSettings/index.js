"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _getCallingSettingsReducer = require("./getCallingSettingsReducer");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _mapOptionToMode = _interopRequireDefault(require("./mapOptionToMode"));

var _callingOptions = _interopRequireDefault(require("./callingOptions"));

var _callingModes = _interopRequireDefault(require("./callingModes"));

var _callingSettingsMessages = _interopRequireDefault(require("./callingSettingsMessages"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _selector = require("../../lib/selector");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var CallingSettings = (
/**
 * @class
 * @description Call setting managing module
 */
_dec = (0, _di.Module)({
  deps: ['Alert', 'Brand', 'ExtensionInfo', 'ExtensionPhoneNumber', 'ForwardingNumber', 'Storage', 'RolesAndPermissions', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'CallingSettingsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(CallingSettings, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Alert} params.alert - alert module instance
   * @param {Brand} params.brand - brand module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {ExtensionPhoneNumber} params.extensionPhoneNumber - extensionPhoneNumber module instance
   * @param {ForwardingNumber} params.forwardingNumber - forwardingNumber module instance
   * @param {Storage} params.storage - storage module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {Webphone} params.webphone - webphone module instance
   * @param {Function} params.onFirstLogin - func on first login
   */
  function CallingSettings(_ref) {
    var _this;

    var alert = _ref.alert,
        brand = _ref.brand,
        extensionInfo = _ref.extensionInfo,
        extensionPhoneNumber = _ref.extensionPhoneNumber,
        forwardingNumber = _ref.forwardingNumber,
        storage = _ref.storage,
        rolesAndPermissions = _ref.rolesAndPermissions,
        tabManager = _ref.tabManager,
        onFirstLogin = _ref.onFirstLogin,
        webphone = _ref.webphone,
        _ref$emergencyCallAva = _ref.emergencyCallAvailable,
        emergencyCallAvailable = _ref$emergencyCallAva === void 0 ? false : _ref$emergencyCallAva,
        defaultRingoutPrompt = _ref.defaultRingoutPrompt,
        options = _objectWithoutProperties(_ref, ["alert", "brand", "extensionInfo", "extensionPhoneNumber", "forwardingNumber", "storage", "rolesAndPermissions", "tabManager", "onFirstLogin", "webphone", "emergencyCallAvailable", "defaultRingoutPrompt"]);

    _classCallCheck(this, CallingSettings);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallingSettings).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));

    _initializerDefineProperty(_this, "callWithOptions", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "myPhoneNumbers", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "otherPhoneNumbers", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "availableNumbers", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "fromNumbers", _descriptor5, _assertThisInitialized(_this));

    _this._alert = alert;
    _this._brand = brand;
    _this._extensionInfo = extensionInfo;
    _this._extensionPhoneNumber = extensionPhoneNumber;
    _this._forwardingNumber = forwardingNumber;
    _this._storage = storage;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._tabManager = tabManager;
    _this._webphone = webphone;
    _this._storageKey = 'callingSettingsData';
    _this._emergencyCallAvailable = emergencyCallAvailable;
    _this._onFirstLogin = onFirstLogin;
    _this.initRingoutPrompt = defaultRingoutPrompt;

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getCallingSettingsReducer.getCallingSettingsStorageReducer)(_this.actionTypes)
    });

    _this._reducer = (0, _getCallingSettingsReducer.getCallingSettingsReducer)(_this.actionTypes);
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
      var _onStateChange2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
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

                this._ringoutEnabled = this._rolesAndPermissions.ringoutEnabled;
                this._webphoneEnabled = this._rolesAndPermissions.webphoneEnabled;
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
      return this._storage.ready && this._extensionInfo.ready && this._extensionPhoneNumber.ready && this._forwardingNumber.ready && this._rolesAndPermissions.ready && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && (!this._storage.ready || !this._extensionInfo.ready || !this._extensionPhoneNumber.ready || !this._forwardingNumber.ready || !this._rolesAndPermissions.ready);
    }
  }, {
    key: "_shouldValidate",
    value: function _shouldValidate() {
      return this.ready && (this._ringoutEnabled !== this._rolesAndPermissions.ringoutEnabled || this._webphoneEnabled !== this._rolesAndPermissions.webphoneEnabled || this._myPhoneNumbers !== this.myPhoneNumbers || this._otherPhoneNumbers !== this.otherPhoneNumbers);
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var defaultCallWith;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._rolesAndPermissions.callingEnabled) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                this._myPhoneNumbers = this.myPhoneNumbers;
                this._otherPhoneNumbers = this.otherPhoneNumbers;
                this._ringoutEnabled = this._rolesAndPermissions.ringoutEnabled;
                this._webphoneEnabled = this._rolesAndPermissions.webphoneEnabled;

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

                _context2.next = 9;
                return this._validateSettings();

              case 9:
                _context2.next = 11;
                return this._initFromNumber();

              case 11:
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
      var _initFromNumber2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var fromNumber, fromNumberList;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fromNumber = this.fromNumber;

                if (fromNumber) {
                  _context3.next = 5;
                  break;
                }

                fromNumberList = this.fromNumbers;
                _context3.next = 5;
                return this.updateFromNumber(fromNumberList[0]);

              case 5:
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
      var _updateFromNumber = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(number) {
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
      var _setSoftPhoneToCallWith2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
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
      var _validateSettings2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
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
                  message: _callingSettingsMessages["default"].webphonePermissionRemoved,
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
                  message: _callingSettingsMessages["default"].permissionChanged,
                  ttl: 0
                });

                _context6.next = 13;
                break;

              case 12:
                if (this._hasPhoneNumberChanged()) {
                  this.store.dispatch({
                    type: this.actionTypes.setData,
                    callWith: _callingOptions["default"].myphone,
                    myLocation: this._myPhoneNumbers[0],
                    timestamp: Date.now()
                  });

                  this._alert.danger({
                    message: _callingSettingsMessages["default"].phoneNumberChanged,
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
      return !this._ringoutEnabled && (this.callWith === _callingOptions["default"].myphone || this.callWith === _callingOptions["default"].otherphone || this.callWith === _callingOptions["default"].customphone);
    }
  }, {
    key: "_hasPhoneNumberChanged",
    value: function _hasPhoneNumberChanged() {
      return this.callWith === _callingOptions["default"].otherphone && this._otherPhoneNumbers.indexOf(this.myLocation) === -1 || this.callWith === _callingOptions["default"].myphone && this._myPhoneNumbers.indexOf(this.myLocation) === -1;
    }
  }, {
    key: "_warningEmergencyCallingNotAvailable",
    value: function () {
      var _warningEmergencyCallingNotAvailable2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.callWith === _callingOptions["default"].browser) {
                  this._alert.info({
                    message: _callingSettingsMessages["default"].emergencyCallingNotAvailable,
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
      var _setData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(_ref2, withPrompt) {
        var callWith, myLocation, ringoutPrompt;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                callWith = _ref2.callWith, myLocation = _ref2.myLocation, ringoutPrompt = _ref2.ringoutPrompt;
                // TODO validate myLocation
                this.store.dispatch({
                  type: this.actionTypes.setData,
                  callWith: callWith,
                  myLocation: myLocation,
                  ringoutPrompt: ringoutPrompt,
                  timestamp: Date.now()
                });

                if (withPrompt) {
                  if (this.callWith === _callingOptions["default"].softphone) {
                    this._alert.info({
                      message: _callingSettingsMessages["default"].saveSuccessWithSoftphone
                    });
                  } else {
                    this._alert.info({
                      message: _callingSettingsMessages["default"].saveSuccess
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
  }]);

  return CallingSettings;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_initFromNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_initFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateFromNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSoftPhoneToCallWith", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSoftPhoneToCallWith"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_validateSettings", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "callWithOptions", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3._rolesAndPermissions.ringoutEnabled;
    }, function () {
      return _this3._rolesAndPermissions.webphoneEnabled;
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

      callWithOptions.push(_callingOptions["default"].softphone);

      if (ringoutEnabled) {
        callWithOptions.push(_callingOptions["default"].myphone);

        if (hasOtherPhone) {
          callWithOptions.push(_callingOptions["default"].otherphone);
        }

        callWithOptions.push(_callingOptions["default"].customphone);
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
      var _ref3;

      return _ref3 = {}, _defineProperty(_ref3, _callingOptions["default"].myphone, myPhoneNumbers), _defineProperty(_ref3, _callingOptions["default"].otherphone, otherPhoneNumbers), _ref3;
    }];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "fromNumbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7._extensionPhoneNumber.callerIdNumbers;
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
