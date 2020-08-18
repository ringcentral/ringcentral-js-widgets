"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettings = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _callingModes = require("./callingModes");

var _callingOptions = require("./callingOptions");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _mapOptionToMode = require("./mapOptionToMode");

var _callingSettingsMessages = require("./callingSettingsMessages");

var _deprecatedCallingOptions = require("./deprecatedCallingOptions");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var LOCATION_NUMBER_ORDER = ['Other', 'Main'];
/**
 * @class
 * @description Call setting managing module
 */

var CallingSettings = (_dec = (0, _di.Module)({
  name: 'CallingSettings',
  deps: ['Alert', 'Brand', 'Storage', 'ExtensionInfo', 'ExtensionDevice', 'ForwardingNumber', 'RolesAndPermissions', 'ExtensionPhoneNumber', {
    dep: 'CallerId',
    optional: true
  }, {
    dep: 'Webphone',
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
  return [that._deps.rolesAndPermissions.ringoutEnabled, that._deps.rolesAndPermissions.webphoneEnabled, that.otherPhoneNumbers.length, that._deps.extensionPhoneNumber.numbers.length];
}), _dec5 = (0, _core.computed)(function (that) {
  return [that._deps.extensionPhoneNumber.callerIdNumbers];
}), _dec6 = (0, _core.computed)(function (that) {
  return [that.myPhoneNumbers, that.otherPhoneNumbers];
}), _dec7 = (0, _core.computed)(function (that) {
  return [that.availableNumbers];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(CallingSettings, _RcModuleV);

  var _super = _createSuper(CallingSettings);

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
  function CallingSettings(deps) {
    var _this$_deps$callingSe, _this$_deps$callingSe2, _this$_deps$callingSe3, _this$_deps$callingSe4, _this$_deps$callingSe5, _this$_deps$callingSe6;

    var _this;

    _classCallCheck(this, CallingSettings);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'callingSettingsData'
    });
    _this._myPhoneNumbers = void 0;
    _this._onFirstLogin = void 0;
    _this._ringoutEnabled = void 0;
    _this._otherPhoneNumbers = void 0;
    _this._webphoneEnabled = void 0;
    _this.initRingoutPrompt = void 0;
    _this._showCallWithJupiter = void 0;
    _this._emergencyCallAvailable = void 0;
    _this._availableNumbers = void 0;

    _initializerDefineProperty(_this, "callWith", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "ringoutPrompt", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "myLocation", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "fromNumber", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "timestamp", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isCustomLocation", _descriptor6, _assertThisInitialized(_this));

    _this._onFirstLogin = (_this$_deps$callingSe = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe === void 0 ? void 0 : _this$_deps$callingSe.onFirstLogin;
    _this.initRingoutPrompt = (_this$_deps$callingSe2 = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe2 === void 0 ? void 0 : _this$_deps$callingSe2.defaultRingoutPrompt;
    _this._showCallWithJupiter = (_this$_deps$callingSe3 = (_this$_deps$callingSe4 = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe4 === void 0 ? void 0 : _this$_deps$callingSe4.showCallWithJupiter) !== null && _this$_deps$callingSe3 !== void 0 ? _this$_deps$callingSe3 : true;
    _this._emergencyCallAvailable = (_this$_deps$callingSe5 = (_this$_deps$callingSe6 = _this._deps.callingSettingsOptions) === null || _this$_deps$callingSe6 === void 0 ? void 0 : _this$_deps$callingSe6.emergencyCallAvailable) !== null && _this$_deps$callingSe5 !== void 0 ? _this$_deps$callingSe5 : false;
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
      this.callWith = callWith;
      this.ringoutPrompt = ringoutPrompt;
      this.myLocation = myLocation;
      this.timestamp = timestamp;
      this.isCustomLocation = isCustomLocation;
    }
  }, {
    key: "updateFromNumber",
    value: function () {
      var _updateFromNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(number) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.fromNumber = number && (number === null || number === void 0 ? void 0 : number.phoneNumber);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateFromNumber(_x) {
        return _updateFromNumber.apply(this, arguments);
      }

      return updateFromNumber;
    }()
  }, {
    key: "resetSuccess",
    value: function resetSuccess() {
      this.fromNumber = null;
    }
  }, {
    key: "onStateChange",
    value: function () {
      var _onStateChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._shouldReset()) {
                  _context2.next = 4;
                  break;
                }

                this.__resetSuccessModule__();

                _context2.next = 11;
                break;

              case 4:
                if (!this._shouldValidate()) {
                  _context2.next = 11;
                  break;
                }

                this._ringoutEnabled = this._deps.rolesAndPermissions.ringoutEnabled;
                this._webphoneEnabled = this._deps.rolesAndPermissions.webphoneEnabled;
                this._myPhoneNumbers = this.myPhoneNumbers;
                this._otherPhoneNumbers = this.otherPhoneNumbers;
                _context2.next = 11;
                return this._validateSettings();

              case 11:
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
    key: "_shouldValidate",
    value: function _shouldValidate() {
      return this.ready && (this._ringoutEnabled !== this._deps.rolesAndPermissions.ringoutEnabled || this._webphoneEnabled !== this._deps.rolesAndPermissions.webphoneEnabled || this._myPhoneNumbers !== this.myPhoneNumbers || this._otherPhoneNumbers !== this.otherPhoneNumbers);
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._init();

              case 2:
              case "end":
                return _context3.stop();
            }
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
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var defaultCallWith;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._deps.rolesAndPermissions.callingEnabled) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                this._myPhoneNumbers = this.myPhoneNumbers;
                this._otherPhoneNumbers = this.otherPhoneNumbers;
                this._availableNumbers = this.availableNumbers;
                this._ringoutEnabled = this._deps.rolesAndPermissions.ringoutEnabled;
                this._webphoneEnabled = this._deps.rolesAndPermissions.webphoneEnabled;

                if (!this.timestamp) {
                  // first time login
                  defaultCallWith = this.callWithOptions && this.callWithOptions[0];
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

                if (this.callWith === _deprecatedCallingOptions.deprecatedCallingOptions.myphone || this.callWith === _deprecatedCallingOptions.deprecatedCallingOptions.otherphone || this.callWith === _deprecatedCallingOptions.deprecatedCallingOptions.customphone) {
                  this.setDataAction({
                    callWith: _callingOptions.callingOptions.ringout,
                    isCustomLocation: this.callWith === _deprecatedCallingOptions.deprecatedCallingOptions.customphone
                  });
                }

                _context4.next = 11;
                return this._validateSettings();

              case 11:
                _context4.next = 13;
                return this._initFromNumber();

              case 13:
              case "end":
                return _context4.stop();
            }
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
      var _warningEmergencyCallingNotAvailable2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.callWith === _callingOptions.callingOptions.browser) {
                  this._deps.alert.info({
                    message: _callingSettingsMessages.callingSettingsMessages.emergencyCallingNotAvailable,
                    ttl: 0
                  });
                }

              case 1:
              case "end":
                return _context5.stop();
            }
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
                this._deps.alert.danger({
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
                this._deps.alert.danger({
                  message: _callingSettingsMessages.callingSettingsMessages.permissionChanged,
                  ttl: 0
                });

                _context6.next = 13;
                break;

              case 12:
                if (this._hasPhoneNumberChanged()) {
                  this.setDataAction({
                    callWith: _callingOptions.callingOptions.ringout,
                    myLocation: this._myPhoneNumbers[0],
                    timestamp: Date.now()
                  });

                  this._deps.alert.danger({
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
    key: "_setSoftPhoneToCallWith",
    value: function () {
      var _setSoftPhoneToCallWith2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.setDataAction({
                  callWith: _callingOptions.callingOptions.softphone,
                  timestamp: Date.now()
                });

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
    key: "_initFromNumber",
    value: function () {
      var _initFromNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var fromNumber, _this$_deps$callerId, defaultCallerId, _this$_deps$callerId2, _this$_deps$callerId3, defaultPhoneNumber, defaultEntry;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                fromNumber = this.fromNumber;

                if (fromNumber) {
                  _context8.next = 6;
                  break;
                }

                defaultCallerId = this.fromNumbers[0];

                if ((_this$_deps$callerId = this._deps.callerId) === null || _this$_deps$callerId === void 0 ? void 0 : _this$_deps$callerId.ringOut) {
                  if (this._deps.callerId.ringOut.type === 'Blocked') {
                    defaultCallerId = {
                      phoneNumber: 'anonymous'
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

                _context8.next = 6;
                return this.updateFromNumber(defaultCallerId);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _initFromNumber() {
        return _initFromNumber2.apply(this, arguments);
      }

      return _initFromNumber;
    }()
  }, {
    key: "setData",
    value: function () {
      var _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref2, withPrompt) {
        var callWith, myLocation, ringoutPrompt, isCustomLocation;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                callWith = _ref2.callWith, myLocation = _ref2.myLocation, ringoutPrompt = _ref2.ringoutPrompt, isCustomLocation = _ref2.isCustomLocation;
                // TODO validate myLocation
                this.setDataAction({
                  callWith: callWith,
                  myLocation: myLocation,
                  ringoutPrompt: ringoutPrompt,
                  timestamp: Date.now(),
                  isCustomLocation: isCustomLocation
                });

                if (withPrompt) {
                  if (this.callWith === _callingOptions.callingOptions.softphone) {
                    this._deps.alert.info({
                      message: _callingSettingsMessages.callingSettingsMessages.saveSuccessWithSoftphone
                    });
                  } else if (this.callWith === _callingOptions.callingOptions.jupiter) {
                    this._deps.alert.info({
                      message: _callingSettingsMessages.callingSettingsMessages.saveSuccessWithJupiter
                    });
                  } else {
                    this._deps.alert.info({
                      message: _callingSettingsMessages.callingSettingsMessages.saveSuccess
                    });

                    if (!this._emergencyCallAvailable) {
                      this._warningEmergencyCallingNotAvailable();
                    }
                  }
                }

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function setData(_x2, _x3) {
        return _setData.apply(this, arguments);
      }

      return setData;
    }()
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
      var _this$_deps$rolesAndP = this._deps.rolesAndPermissions,
          ringoutEnabled = _this$_deps$rolesAndP.ringoutEnabled,
          webphoneEnabled = _this$_deps$rolesAndP.webphoneEnabled;
      var hasExtensionPhoneNumber = this._deps.extensionPhoneNumber.numbers.length > 0;

      if (!hasExtensionPhoneNumber) {
        return [_callingOptions.callingOptions.softphone];
      }

      var callWithOptions = [];

      if (this._deps.webphone && webphoneEnabled) {
        callWithOptions.push(_callingOptions.callingOptions.browser);
      } // only rc brand support call with RingCentral App


      if (this._deps.brand && (this._deps.brand.code === 'rc' || this._deps.brand.brandConfig && this._deps.brand.brandConfig.brandCode === 'rc') && this._showCallWithJupiter) {
        callWithOptions.push(_callingOptions.callingOptions.jupiter);
      }

      callWithOptions.push(_callingOptions.callingOptions.softphone);

      if (ringoutEnabled) {
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
  }]);

  return CallingSettings;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "callWith", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ringoutPrompt", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "myLocation", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fromNumber", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "timestamp", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "isCustomLocation", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setDataAction", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDataAction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateFromNumber", [_proxify["default"], _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "updateFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_warningEmergencyCallingNotAvailable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_validateSettings", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSoftPhoneToCallWith", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSoftPhoneToCallWith"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initFromNumber", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_initFromNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "myPhoneNumbers", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "myPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "otherPhoneNumbers", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "otherPhoneNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callWithOptions", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "callWithOptions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fromNumbers", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "fromNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableNumbers", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "availableNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "availableNumbersWithLabel", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "availableNumbersWithLabel"), _class2.prototype)), _class2)) || _class);
exports.CallingSettings = CallingSettings;
//# sourceMappingURL=CallingSettings.js.map
