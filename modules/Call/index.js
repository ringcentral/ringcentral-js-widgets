"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

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

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.string.trim");

require("regenerator-runtime/runtime");

var _redux = require("redux");

var _extractControls2 = _interopRequireDefault(require("@ringcentral-integration/phone-number/lib/extractControls"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _callingModes = _interopRequireDefault(require("../CallingSettings/callingModes"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getCallReducer = _interopRequireWildcard(require("./getCallReducer"));

var _callStatus = require("./callStatus");

var _callErrors = _interopRequireDefault(require("./callErrors"));

var _ringoutErrors = require("../Ringout/ringoutErrors");

var _validateNumbers = _interopRequireDefault(require("../../lib/validateNumbers"));

var _dec, _class, _class2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var TO_NUMBER = 'toNumber';
var FROM_NUMBER = 'fromNumber';
var ANONYMOUS = 'anonymous';
/**
 * @class
 * @description Call managing module
 */

var Call = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Storage', 'Brand', 'Softphone', 'Ringout', 'NumberValidate', 'RegionSettings', 'CallingSettings', 'ExtensionFeatures', {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'CallOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(Call, _RcModule);

  var _super = _createSuper(Call);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Brand} params.brand - brand module instance
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {CallingSettings} params.callingSettings - callingSettings module instance
   * @param {Softphone} params.softphone - softphone module instance
   * @param {Ringout} params.ringout - ringout module instance
   * @param {Webphone} params.webphone - webphone module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   */
  function Call(_ref) {
    var _this;

    var alert = _ref.alert,
        brand = _ref.brand,
        storage = _ref.storage,
        callingSettings = _ref.callingSettings,
        softphone = _ref.softphone,
        ringout = _ref.ringout,
        webphone = _ref.webphone,
        numberValidate = _ref.numberValidate,
        regionSettings = _ref.regionSettings,
        extensionFeatures = _ref.extensionFeatures,
        _ref$internationalChe = _ref.internationalCheck,
        internationalCheck = _ref$internationalChe === void 0 ? true : _ref$internationalChe,
        _ref$permissionCheck = _ref.permissionCheck,
        permissionCheck = _ref$permissionCheck === void 0 ? true : _ref$permissionCheck,
        availabilityMonitor = _ref.availabilityMonitor,
        options = _objectWithoutProperties(_ref, ["alert", "brand", "storage", "callingSettings", "softphone", "ringout", "webphone", "numberValidate", "regionSettings", "extensionFeatures", "internationalCheck", "permissionCheck", "availabilityMonitor"]);

    _classCallCheck(this, Call);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: _actionTypes["default"]
    }));
    _this._brand = brand;
    _this._alert = _ensureExist["default"].call(_assertThisInitialized(_this), alert, 'alert');
    _this._storage = _ensureExist["default"].call(_assertThisInitialized(_this), storage, 'storage');
    _this._storageKey = 'callData';
    _this._reducer = (0, _getCallReducer["default"])(_this.actionTypes);
    _this._callingSettings = _ensureExist["default"].call(_assertThisInitialized(_this), callingSettings, 'callingSettings');
    _this._ringout = _ensureExist["default"].call(_assertThisInitialized(_this), ringout, 'ringout');
    _this._softphone = _ensureExist["default"].call(_assertThisInitialized(_this), softphone, 'softphone');
    _this._webphone = webphone;
    _this._numberValidate = _ensureExist["default"].call(_assertThisInitialized(_this), numberValidate, 'numberValidate');
    _this._regionSettings = _ensureExist["default"].call(_assertThisInitialized(_this), regionSettings, 'regionSettings');
    _this._extensionFeatures = extensionFeatures;
    _this._internationalCheck = internationalCheck;
    _this._availabilityMonitor = availabilityMonitor;
    _this._callSettingMode = null;
    _this._permissionCheck = permissionCheck;

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _redux.combineReducers)({
        lastPhoneNumber: (0, _getCallReducer.getLastPhoneNumberReducer)(_this.actionTypes),
        lastRecipient: (0, _getCallReducer.getLastRecipientReducer)(_this.actionTypes)
      })
    });

    return _this;
  }

  _createClass(Call, [{
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
                  _context.next = 6;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.init
                });

                this._initCallModule();

                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });
                _context.next = 13;
                break;

              case 6:
                if (!this._shouldReset()) {
                  _context.next = 10;
                  break;
                }

                this._resetCallModule();

                _context.next = 13;
                break;

              case 10:
                if (!this.ready) {
                  _context.next = 13;
                  break;
                }

                _context.next = 13;
                return this._processCall();

              case 13:
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
      return this._numberValidate.ready && this._callingSettings.ready && this._storage.ready && this._regionSettings.ready && (!this._webphone || this._webphone.ready) && (!this._availabilityMonitor || this._availabilityMonitor.ready) && this._ringout.ready && this._softphone.ready && this._extensionFeatures.ready && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._numberValidate.ready || !this._callingSettings.ready || !this._regionSettings.ready || !!this._webphone && !this._webphone.ready || !!this._availabilityMonitor && !this._availabilityMonitor.ready || !this._ringout.ready || !this._softphone.ready || !this._extensionFeatures.ready || !this._storage.ready) && this.ready;
    }
  }, {
    key: "_initCallModule",
    value: function () {
      var _initCallModule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._callSettingMode = this._callingSettings.callingMode;

                if (!(this._callSettingMode === _callingModes["default"].webphone && this._webphone)) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 4;
                return this._webphone.connect();

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
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
      this._callSettingMode = this._callingSettings.callingMode;

      if (this._callSettingMode === _callingModes["default"].webphone && this._webphone) {
        this._webphone.disconnect();
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

                if (!(this._callingSettings.callingMode !== oldCallSettingMode)) {
                  _context3.next = 11;
                  break;
                }

                this._callSettingMode = this._callingSettings.callingMode;

                if (!this._webphone) {
                  _context3.next = 11;
                  break;
                }

                if (!(oldCallSettingMode === _callingModes["default"].webphone)) {
                  _context3.next = 8;
                  break;
                }

                this._webphone.disconnect();

                _context3.next = 11;
                break;

              case 8:
                if (!(this._callSettingMode === _callingModes["default"].webphone)) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 11;
                return this._webphone.connect();

              case 11:
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
    }()
  }, {
    key: "onToNumberChange",
    value: function () {
      var _onToNumberChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(value) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.toNumberChanged,
                  data: value
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onToNumberChange(_x) {
        return _onToNumberChange.apply(this, arguments);
      }

      return onToNumberChange;
    }() // save the click to dial entity, only when call took place

  }, {
    key: "onToNumberMatch",
    value: function onToNumberMatch(_ref2) {
      var entityId = _ref2.entityId,
          startTime = _ref2.startTime;

      if (this.isIdle) {
        this.store.dispatch({
          type: this.actionTypes.toNumberMatched,
          data: {
            entityId: entityId,
            startTime: startTime
          }
        });
      }
    }
  }, {
    key: "cleanToNumberEntities",
    value: function cleanToNumberEntities() {
      this.store.dispatch({
        type: this.actionTypes.cleanToNumberEntities
      });
    }
  }, {
    key: "call",
    value: function () {
      var _call = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref3) {
        var input, recipient, fromNumber, _ref3$isConference, isConference, session, _extractControls, phoneNumber, extendedControls, toNumber, validatedNumbers;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                input = _ref3.phoneNumber, recipient = _ref3.recipient, fromNumber = _ref3.fromNumber, _ref3$isConference = _ref3.isConference, isConference = _ref3$isConference === void 0 ? false : _ref3$isConference;
                session = null;

                if (!this.isIdle) {
                  _context5.next = 52;
                  break;
                }

                _extractControls = (0, _extractControls2["default"])(input), phoneNumber = _extractControls.phoneNumber, extendedControls = _extractControls.extendedControls;
                toNumber = recipient && (recipient.phoneNumber || recipient.extension) || phoneNumber;

                if (!(!toNumber || "".concat(toNumber).trim().length === 0)) {
                  _context5.next = 9;
                  break;
                }

                this._alert.warning({
                  message: _callErrors["default"].noToNumber
                });

                _context5.next = 52;
                break;

              case 9:
                this.store.dispatch({
                  type: this.actionTypes.connect,
                  isConference: isConference,
                  phoneNumber: phoneNumber,
                  recipient: recipient,
                  callSettingMode: this._callSettingMode // for Track

                });
                _context5.prev = 10;

                if (!this._permissionCheck) {
                  _context5.next = 17;
                  break;
                }

                _context5.next = 14;
                return this._getValidatedNumbers({
                  toNumber: toNumber,
                  fromNumber: fromNumber,
                  isConference: isConference
                });

              case 14:
                validatedNumbers = _context5.sent;
                _context5.next = 18;
                break;

              case 17:
                validatedNumbers = this._getNumbers({
                  toNumber: toNumber,
                  fromNumber: fromNumber,
                  isConference: isConference
                });

              case 18:
                if (!validatedNumbers) {
                  _context5.next = 25;
                  break;
                }

                _context5.next = 21;
                return this._makeCall(_objectSpread(_objectSpread({}, validatedNumbers), {}, {
                  extendedControls: extendedControls
                }));

              case 21:
                session = _context5.sent;
                this.store.dispatch({
                  type: this.actionTypes.connectSuccess,
                  callSettingMode: this._callSettingMode // for Track

                });
                _context5.next = 26;
                break;

              case 25:
                this.store.dispatch({
                  type: this.actionTypes.connectError
                });

              case 26:
                _context5.next = 52;
                break;

              case 28:
                _context5.prev = 28;
                _context5.t0 = _context5["catch"](10);

                if (!(!_context5.t0.message && _context5.t0.type && _callErrors["default"][_context5.t0.type])) {
                  _context5.next = 34;
                  break;
                }

                // validate format error
                this._alert.warning({
                  message: _callErrors["default"][_context5.t0.type],
                  payload: {
                    phoneNumber: _context5.t0.phoneNumber
                  }
                });

                _context5.next = 50;
                break;

              case 34:
                if (!(_context5.t0.message === _ringoutErrors.ringoutErrors.firstLegConnectFailed)) {
                  _context5.next = 38;
                  break;
                }

                this._alert.warning({
                  message: _callErrors["default"].connectFailed,
                  payload: _context5.t0
                });

                _context5.next = 50;
                break;

              case 38:
                if (!(_context5.t0.message === 'Failed to fetch')) {
                  _context5.next = 42;
                  break;
                }

                this._alert.danger({
                  message: _callErrors["default"].networkError,
                  payload: _context5.t0
                });

                _context5.next = 50;
                break;

              case 42:
                if (!(_context5.t0.message !== 'Refresh token has expired')) {
                  _context5.next = 50;
                  break;
                }

                _context5.t1 = !this._availabilityMonitor;

                if (_context5.t1) {
                  _context5.next = 48;
                  break;
                }

                _context5.next = 47;
                return this._availabilityMonitor.checkIfHAError(_context5.t0);

              case 47:
                _context5.t1 = !_context5.sent;

              case 48:
                if (!_context5.t1) {
                  _context5.next = 50;
                  break;
                }

                this._alert.danger({
                  message: _callErrors["default"].internalError,
                  payload: _context5.t0
                });

              case 50:
                this.store.dispatch({
                  type: this.actionTypes.connectError
                });
                throw _context5.t0;

              case 52:
                return _context5.abrupt("return", session);

              case 53:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[10, 28]]);
      }));

      function call(_x2) {
        return _call.apply(this, arguments);
      }

      return call;
    }()
  }, {
    key: "_getNumbers",
    value: function _getNumbers(_ref4) {
      var toNumber = _ref4.toNumber,
          fromNumber = _ref4.fromNumber,
          isConference = _ref4.isConference;
      var isWebphone = this._callingSettings.callingMode === _callingModes["default"].webphone;
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
        var validatedResult = (0, _validateNumbers["default"])(numbers, this._regionSettings, this._brand.id);
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
      var _getValidatedNumbers2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref5) {
        var toNumber, fromNumber, isConference, isWebphone, theFromNumber, waitingValidateNumbers, parsedToNumber, parsedFromNumber, numbers, validatedResult, toNumberIndex, fromNumberIndex, _this$_extensionFeatu, _this$_extensionFeatu2, error, parsedToNumberE164, parsedFromNumberE164;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                toNumber = _ref5.toNumber, fromNumber = _ref5.fromNumber, isConference = _ref5.isConference;
                isWebphone = this._callingSettings.callingMode === _callingModes["default"].webphone;
                theFromNumber = fromNumber || (isWebphone ? this._callingSettings.fromNumber : this._callingSettings.myLocation);

                if (!(isWebphone && (theFromNumber === null || theFromNumber === ''))) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return", null);

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
                  _context6.next = 20;
                  break;
                }

                numbers = waitingValidateNumbers.map(function (x) {
                  return x.number;
                });
                _context6.next = 12;
                return this._numberValidate.validateNumbers(numbers);

              case 12:
                validatedResult = _context6.sent;

                if (validatedResult.result) {
                  _context6.next = 16;
                  break;
                }

                validatedResult.errors.forEach(function (error) {
                  // this._alert.warning({
                  //   message: callErrors[error.type],
                  //   payload: {
                  //     phoneNumber: error.phoneNumber
                  //   }
                  // });
                  throw error;
                });
                return _context6.abrupt("return", null);

              case 16:
                toNumberIndex = waitingValidateNumbers.findIndex(function (x) {
                  return x.type === TO_NUMBER;
                });
                fromNumberIndex = waitingValidateNumbers.findIndex(function (x) {
                  return x.type === FROM_NUMBER;
                });
                parsedToNumber = validatedResult.numbers[toNumberIndex];
                parsedFromNumber = validatedResult.numbers[fromNumberIndex];

              case 20:
                if (!this._internationalCheck) {
                  _context6.next = 24;
                  break;
                }

                if (!(parsedToNumber && parsedToNumber.international && !((_this$_extensionFeatu = this._extensionFeatures.features) === null || _this$_extensionFeatu === void 0 ? void 0 : (_this$_extensionFeatu2 = _this$_extensionFeatu.InternationalCalling) === null || _this$_extensionFeatu2 === void 0 ? void 0 : _this$_extensionFeatu2.available))) {
                  _context6.next = 24;
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

                return _context6.abrupt("return", {
                  toNumber: parsedToNumberE164,
                  fromNumber: parsedFromNumberE164
                });

              case 29:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _getValidatedNumbers(_x3) {
        return _getValidatedNumbers2.apply(this, arguments);
      }

      return _getValidatedNumbers;
    }()
  }, {
    key: "_makeCall",
    value: function () {
      var _makeCall2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref6) {
        var toNumber, fromNumber, _ref6$callingMode, callingMode, _ref6$extendedControl, extendedControls, homeCountryId, session;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                toNumber = _ref6.toNumber, fromNumber = _ref6.fromNumber, _ref6$callingMode = _ref6.callingMode, callingMode = _ref6$callingMode === void 0 ? this._callingSettings.callingMode : _ref6$callingMode, _ref6$extendedControl = _ref6.extendedControls, extendedControls = _ref6$extendedControl === void 0 ? [] : _ref6$extendedControl;
                homeCountryId = this._regionSettings.homeCountryId;
                _context7.t0 = callingMode;
                _context7.next = _context7.t0 === _callingModes["default"].softphone ? 5 : _context7.t0 === _callingModes["default"].jupiter ? 5 : _context7.t0 === _callingModes["default"].ringout ? 7 : _context7.t0 === _callingModes["default"].webphone ? 11 : 16;
                break;

              case 5:
                session = this._softphone.makeCall(toNumber, callingMode);
                return _context7.abrupt("break", 17);

              case 7:
                _context7.next = 9;
                return this._ringout.makeCall({
                  fromNumber: fromNumber,
                  toNumber: toNumber && toNumber.split('*')[0],
                  // remove extension number in ringout mode
                  prompt: this._callingSettings.ringoutPrompt
                });

              case 9:
                session = _context7.sent;
                return _context7.abrupt("break", 17);

              case 11:
                if (!this._webphone) {
                  _context7.next = 15;
                  break;
                }

                _context7.next = 14;
                return this._webphone.makeCall({
                  fromNumber: fromNumber,
                  toNumber: toNumber,
                  homeCountryId: homeCountryId,
                  extendedControls: extendedControls
                });

              case 14:
                session = _context7.sent;

              case 15:
                return _context7.abrupt("break", 17);

              case 16:
                return _context7.abrupt("break", 17);

              case 17:
                return _context7.abrupt("return", session);

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _makeCall(_x4) {
        return _makeCall2.apply(this, arguments);
      }

      return _makeCall;
    }()
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "callStatus",
    get: function get() {
      return this.state.callStatus;
    }
  }, {
    key: "isIdle",
    get: function get() {
      return this.state.callStatus === _callStatus.callStatus.idle;
    }
  }, {
    key: "lastPhoneNumber",
    get: function get() {
      return this._storage.getItem(this._storageKey).lastPhoneNumber;
    }
  }, {
    key: "lastRecipient",
    get: function get() {
      return this._storage.getItem(this._storageKey).lastRecipient;
    }
  }, {
    key: "toNumber",
    get: function get() {
      return this.state.toNumber;
    }
  }, {
    key: "toNumberEntities",
    get: function get() {
      return this.state.toNumberEntities;
    }
  }]);

  return Call;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "onToNumberChange", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "onToNumberChange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "call", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "call"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getNumbers", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_getNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_getValidatedNumbers", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_getValidatedNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_makeCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_makeCall"), _class2.prototype)), _class2)) || _class);
exports["default"] = Call;
//# sourceMappingURL=index.js.map
