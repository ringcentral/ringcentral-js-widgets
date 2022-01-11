"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

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
exports.Call = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.map");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.string.trim");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _extractControls2 = _interopRequireDefault(require("@ringcentral-integration/phone-number/lib/extractControls"));

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _validateNumbers = require("../../lib/validateNumbers");

var _Analytics = require("../Analytics");

var _callingModes = _interopRequireDefault(require("../CallingSettings/callingModes"));

var _ringoutErrors = require("../Ringout/ringoutErrors");

var _callErrors = require("./callErrors");

var _callStatus = require("./callStatus");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var TO_NUMBER = 'toNumber';
var FROM_NUMBER = 'fromNumber';
var ANONYMOUS = 'anonymous';
/**
 * @class
 * @description Call managing module
 */

var Call = (_dec = (0, _di.Module)({
  name: 'Call',
  deps: ['Alert', 'Storage', 'Brand', 'Softphone', 'Ringout', 'NumberValidate', 'RegionSettings', 'CallingSettings', 'ExtensionFeatures', {
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
  var callSettingMode = _ref.callSettingMode;
  return [callSettingMode === _callingModes["default"].webphone ? _Analytics.trackEvents.callAttemptWebRTC : _Analytics.trackEvents.callAttempt, {
    callSettingMode: callSettingMode
  }];
}), _dec3 = (0, _core.track)(function (_, callSettingMode) {
  return [callSettingMode === _callingModes["default"].webphone ? _Analytics.trackEvents.outboundWebRTCCallConnected : _Analytics.trackEvents.outboundCallConnected, {
    callSettingMode: callSettingMode
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Call, _RcModuleV);

  var _super = _createSuper(Call);

  function Call(deps) {
    var _this$_deps$callOptio, _this$_deps$callOptio2, _this$_deps$callOptio3, _this$_deps$callOptio4, _this$_deps$callOptio5, _this$_deps$callOptio6;

    var _this;

    _classCallCheck(this, Call);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'callData'
    });
    _this._internationalCheck = void 0;
    _this._permissionCheck = void 0;
    _this._callSettingMode = null;
    _this._useCallControlToMakeCall = void 0;

    _initializerDefineProperty(_this, "callStatus", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "toNumberEntities", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "data", _descriptor3, _assertThisInitialized(_this));

    _this._internationalCheck = (_this$_deps$callOptio = (_this$_deps$callOptio2 = _this._deps.callOptions) === null || _this$_deps$callOptio2 === void 0 ? void 0 : _this$_deps$callOptio2.internationalCheck) !== null && _this$_deps$callOptio !== void 0 ? _this$_deps$callOptio : true;
    _this._permissionCheck = (_this$_deps$callOptio3 = (_this$_deps$callOptio4 = _this._deps.callOptions) === null || _this$_deps$callOptio4 === void 0 ? void 0 : _this$_deps$callOptio4.permissionCheck) !== null && _this$_deps$callOptio3 !== void 0 ? _this$_deps$callOptio3 : true;
    _this._useCallControlToMakeCall = (_this$_deps$callOptio5 = (_this$_deps$callOptio6 = _this._deps.callOptions) === null || _this$_deps$callOptio6 === void 0 ? void 0 : _this$_deps$callOptio6.useCallControlToMakeCall) !== null && _this$_deps$callOptio5 !== void 0 ? _this$_deps$callOptio5 : false;
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
    key: "connect",
    value: function connect(_ref2) {
      var isConference = _ref2.isConference,
          _ref2$phoneNumber = _ref2.phoneNumber,
          phoneNumber = _ref2$phoneNumber === void 0 ? null : _ref2$phoneNumber,
          _ref2$recipient = _ref2.recipient,
          recipient = _ref2$recipient === void 0 ? null : _ref2$recipient,
          callSettingMode = _ref2.callSettingMode;
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
                this._callSettingMode = this._deps.callingSettings.callingMode;

                if (!(this._callSettingMode === _callingModes["default"].webphone && this._deps.webphone)) {
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
      this._callSettingMode = this._deps.callingSettings.callingMode;

      if (this._callSettingMode === _callingModes["default"].webphone && this._deps.webphone) {
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

                this._callSettingMode = this._deps.callingSettings.callingMode;

                if (!(oldCallSettingMode === _callingModes["default"].webphone)) {
                  _context3.next = 7;
                  break;
                }

                this._deps.webphone.disconnect();

                _context3.next = 10;
                break;

              case 7:
                if (!(this._callSettingMode === _callingModes["default"].webphone)) {
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
        var input, recipient, fromNumber, _ref4$isConference, isConference, session, _extractControls, phoneNumber, extendedControls, toNumber, validatedNumbers, _error$response, _error$response2, _ref5, feature, statusCode;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                input = _ref4.phoneNumber, recipient = _ref4.recipient, fromNumber = _ref4.fromNumber, _ref4$isConference = _ref4.isConference, isConference = _ref4$isConference === void 0 ? false : _ref4$isConference;
                session = null;

                if (!this.isIdle) {
                  _context4.next = 41;
                  break;
                }

                _extractControls = (0, _extractControls2["default"])(input), phoneNumber = _extractControls.phoneNumber, extendedControls = _extractControls.extendedControls;
                toNumber = recipient && (recipient.phoneNumber || recipient.extension) || phoneNumber;

                if (!(!toNumber || "".concat(toNumber).trim().length === 0)) {
                  _context4.next = 9;
                  break;
                }

                this._deps.alert.warning({
                  message: _callErrors.callErrors.noToNumber
                });

                _context4.next = 41;
                break;

              case 9:
                this.connect({
                  isConference: isConference,
                  phoneNumber: phoneNumber,
                  recipient: recipient,
                  callSettingMode: this._callSettingMode
                });
                _context4.prev = 10;

                if (!this._permissionCheck) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 14;
                return this._getValidatedNumbers({
                  toNumber: toNumber,
                  fromNumber: fromNumber,
                  isConference: isConference
                });

              case 14:
                validatedNumbers = _context4.sent;
                _context4.next = 18;
                break;

              case 17:
                validatedNumbers = this._getNumbers({
                  toNumber: toNumber,
                  fromNumber: fromNumber,
                  isConference: isConference
                });

              case 18:
                if (!validatedNumbers) {
                  _context4.next = 25;
                  break;
                }

                _context4.next = 21;
                return this._makeCall(_objectSpread(_objectSpread({}, validatedNumbers), {}, {
                  extendedControls: extendedControls
                }));

              case 21:
                session = _context4.sent;
                this.connectSuccess(this._callSettingMode);
                _context4.next = 26;
                break;

              case 25:
                this.connectError();

              case 26:
                _context4.next = 41;
                break;

              case 28:
                _context4.prev = 28;
                _context4.t0 = _context4["catch"](10);
                _context4.next = 32;
                return _context4.t0 === null || _context4.t0 === void 0 ? void 0 : (_error$response = _context4.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.clone().json();

              case 32:
                _context4.t1 = _context4.sent;

                if (_context4.t1) {
                  _context4.next = 35;
                  break;
                }

                _context4.t1 = {};

              case 35:
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
                } else if (_context4.t0.message === _ringoutErrors.ringoutErrors.firstLegConnectFailed) {
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

              case 41:
                return _context4.abrupt("return", session);

              case 42:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[10, 28]]);
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
      var isWebphone = this._deps.callingSettings.callingMode === _callingModes["default"].webphone;
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
          allowRegionSettings: this._deps.brand.brandConfig.allowRegionSettings,
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
        parsedToNumber = validatedResult[toNumberIndex];
        parsedFromNumber = validatedResult[fromNumberIndex];
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
        var toNumber, fromNumber, isConference, isWebphone, theFromNumber, waitingValidateNumbers, parsedToNumber, parsedFromNumber, numbers, validatedResult, toNumberIndex, fromNumberIndex, _this$_deps$extension, _this$_deps$extension2, error, parsedToNumberE164, parsedFromNumberE164;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                toNumber = _ref7.toNumber, fromNumber = _ref7.fromNumber, isConference = _ref7.isConference;
                isWebphone = this._deps.callingSettings.callingMode === _callingModes["default"].webphone;
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
                  _context5.next = 20;
                  break;
                }

                numbers = waitingValidateNumbers.map(function (x) {
                  return x.number;
                });
                _context5.next = 12;
                return this._deps.numberValidate.validateNumbers(numbers);

              case 12:
                validatedResult = _context5.sent;

                if (validatedResult.result) {
                  _context5.next = 16;
                  break;
                }

                validatedResult.errors.forEach(function (error) {
                  // TODO: determine how to deal with multiple errors
                  // this._deps.alert.warning({
                  //   message: callErrors[error.type],
                  //   payload: {
                  //     phoneNumber: error.phoneNumber
                  //   }
                  // });
                  throw error;
                });
                return _context5.abrupt("return", null);

              case 16:
                toNumberIndex = waitingValidateNumbers.findIndex(function (x) {
                  return x.type === TO_NUMBER;
                });
                fromNumberIndex = waitingValidateNumbers.findIndex(function (x) {
                  return x.type === FROM_NUMBER;
                }); // TODO: fix `validatedResult` type in `numberValidate` module.

                parsedToNumber = validatedResult.numbers[toNumberIndex];
                parsedFromNumber = validatedResult.numbers[fromNumberIndex];

              case 20:
                if (!this._internationalCheck) {
                  _context5.next = 24;
                  break;
                }

                if (!(parsedToNumber && parsedToNumber.international && !((_this$_deps$extension = this._deps.extensionFeatures.features) === null || _this$_deps$extension === void 0 ? void 0 : (_this$_deps$extension2 = _this$_deps$extension.InternationalCalling) === null || _this$_deps$extension2 === void 0 ? void 0 : _this$_deps$extension2.available))) {
                  _context5.next = 24;
                  break;
                }

                error = {
                  phoneNumber: parsedToNumber.originalString,
                  type: 'noInternational'
                };
                throw error;

              case 24:
                parsedToNumberE164 = toNumber;

                if (parsedToNumber) {
                  parsedToNumberE164 = parsedToNumber.e164; // add ext back if any

                  if (parsedToNumber.e164 && parsedToNumber.subAddress) {
                    parsedToNumberE164 = [parsedToNumber.e164, parsedToNumber.subAddress].join('*');
                  }
                } // using e164 in response to call


                if (parsedFromNumber) {
                  parsedFromNumberE164 = parsedFromNumber.e164; // add ext back if any

                  if (parsedFromNumber.e164 && parsedFromNumber.subAddress) {
                    parsedFromNumberE164 = [parsedFromNumber.e164, parsedFromNumber.subAddress].join('*');
                  }
                }

                if (isWebphone && theFromNumber === ANONYMOUS) {
                  parsedFromNumberE164 = ANONYMOUS;
                }

                return _context5.abrupt("return", {
                  toNumber: parsedToNumberE164,
                  fromNumber: parsedFromNumberE164
                });

              case 29:
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
                _context6.next = _context6.t0 === _callingModes["default"].softphone ? 5 : _context6.t0 === _callingModes["default"].jupiter ? 5 : _context6.t0 === _callingModes["default"].ringout ? 7 : _context6.t0 === _callingModes["default"].webphone ? 11 : 22;
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
                if (!(this._deps.activeCallControl && this._useCallControlToMakeCall)) {
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
      lastRecipient: null
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "toNumberMatched", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "toNumberMatched"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanToNumberEntities", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanToNumberEntities"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connect", [_dec2, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "connect"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectSuccess", [_dec3, _core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "connectSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "connectError", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "connectError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "call", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "call"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getValidatedNumbers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_getValidatedNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_makeCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_makeCall"), _class2.prototype)), _class2)) || _class);
exports.Call = Call;
//# sourceMappingURL=Call.js.map
