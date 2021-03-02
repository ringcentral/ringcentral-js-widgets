"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

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

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.string.trim");

require("regenerator-runtime/runtime");

var _di = require("ringcentral-integration/lib/di");

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _callErrors = _interopRequireDefault(require("ringcentral-integration/modules/Call/callErrors"));

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _selector = require("ringcentral-integration/lib/selector");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _getReducer = _interopRequireDefault(require("./getReducer"));

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DialerUI = (_dec = (0, _di.Module)({
  name: 'DialerUI',
  deps: ['CallingSettings', {
    dep: 'AudioSettings',
    optional: true
  }, 'CallingSettings', 'ConnectivityManager', {
    dep: 'ContactSearch',
    optional: true
  }, 'Locale', 'RateLimiter', 'RegionSettings', 'Alert', 'Call', 'RolesAndPermissions', {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'DialerUIOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcUIModule) {
  _inherits(DialerUI, _RcUIModule);

  var _super = _createSuper(DialerUI);

  function DialerUI(_ref) {
    var _this;

    var alert = _ref.alert,
        audioSettings = _ref.audioSettings,
        call = _ref.call,
        callingSettings = _ref.callingSettings,
        conferenceCall = _ref.conferenceCall,
        connectivityManager = _ref.connectivityManager,
        contactSearch = _ref.contactSearch,
        locale = _ref.locale,
        rateLimiter = _ref.rateLimiter,
        regionSettings = _ref.regionSettings,
        rolesAndPermissions = _ref.rolesAndPermissions,
        _ref$useV = _ref.useV2,
        useV2 = _ref$useV === void 0 ? false : _ref$useV,
        options = _objectWithoutProperties(_ref, ["alert", "audioSettings", "call", "callingSettings", "conferenceCall", "connectivityManager", "contactSearch", "locale", "rateLimiter", "regionSettings", "rolesAndPermissions", "useV2"]);

    _classCallCheck(this, DialerUI);

    _this = _super.call(this, _objectSpread({}, options));

    _initializerDefineProperty(_this, "recipients", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "searchContactList", _descriptor2, _assertThisInitialized(_this));

    _this._alert = alert;
    _this._audioSettings = audioSettings;
    _this._call = call;
    _this._callingSettings = callingSettings;
    _this._conferenceCall = conferenceCall;
    _this._connectivityManager = connectivityManager;
    _this._contactSearch = contactSearch;
    _this._locale = locale;
    _this._rateLimiter = rateLimiter;
    _this._regionSettings = regionSettings;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._reducer = (0, _getReducer["default"])(_this.actionTypes);
    _this._useV2 = useV2;
    _this._callHooks = [];
    return _this;
  }

  _createClass(DialerUI, [{
    key: "clearToNumberField",
    value: function () {
      var _clearToNumberField = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.clearToNumberField
                });

              case 1:
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
      var _setToNumberField = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(phoneNumber) {
        var fromDialPad,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fromDialPad = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;

                if (this.toNumberField !== phoneNumber) {
                  this.store.dispatch({
                    type: this.actionTypes.setToNumberField,
                    phoneNumber: phoneNumber,
                    fromDialPad: fromDialPad
                  });

                  if (this._useV2 && this.toNumberField && this.toNumberField.length >= 3 && this._contactSearch) {
                    this._contactSearch.debouncedSearch({
                      searchString: this.toNumberField
                    });
                  }
                }

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setToNumberField(_x) {
        return _setToNumberField.apply(this, arguments);
      }

      return setToNumberField;
    }()
  }, {
    key: "setRecipient",
    value: function () {
      var _setRecipient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(recipient) {
        var shouldClean,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                shouldClean = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : true;
                this.store.dispatch({
                  type: this.actionTypes.setRecipient,
                  recipient: recipient
                });

                if (!shouldClean) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 5;
                return this.clearToNumberField();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setRecipient(_x2) {
        return _setRecipient.apply(this, arguments);
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
                this.store.dispatch({
                  type: this.actionTypes.clearRecipient
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
    key: "call",
    value: function () {
      var _call = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref3) {
        var _ref3$phoneNumber, phoneNumber, _ref3$recipient, recipient, _ref3$fromNumber, fromNumber, continueCall;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref3$phoneNumber = _ref3.phoneNumber, phoneNumber = _ref3$phoneNumber === void 0 ? '' : _ref3$phoneNumber, _ref3$recipient = _ref3.recipient, recipient = _ref3$recipient === void 0 ? null : _ref3$recipient, _ref3$fromNumber = _ref3.fromNumber, fromNumber = _ref3$fromNumber === void 0 ? null : _ref3$fromNumber;

                if (!(phoneNumber || recipient)) {
                  _context6.next = 24;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.call,
                  phoneNumber: phoneNumber,
                  recipient: recipient
                });
                _context6.next = 5;
                return this.triggerHook({
                  phoneNumber: phoneNumber,
                  recipient: recipient,
                  fromNumber: fromNumber
                });

              case 5:
                if (!this.callVerify) {
                  _context6.next = 11;
                  break;
                }

                _context6.next = 8;
                return this.callVerify({
                  phoneNumber: phoneNumber,
                  recipient: recipient
                });

              case 8:
                _context6.t0 = _context6.sent;
                _context6.next = 12;
                break;

              case 11:
                _context6.t0 = true;

              case 12:
                continueCall = _context6.t0;

                if (continueCall) {
                  _context6.next = 15;
                  break;
                }

                return _context6.abrupt("return");

              case 15:
                _context6.prev = 15;
                _context6.next = 18;
                return this._call.call({
                  phoneNumber: this.toNumberField,
                  recipient: this.recipient,
                  fromNumber: fromNumber
                });

              case 18:
                this.store.dispatch({
                  type: this.actionTypes.callSuccess
                });
                _context6.next = 24;
                break;

              case 21:
                _context6.prev = 21;
                _context6.t1 = _context6["catch"](15);
                this.store.dispatch({
                  type: this.actionTypes.callError,
                  error: _context6.t1
                });

              case 24:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[15, 21]]);
      }));

      function call(_x4) {
        return _call.apply(this, arguments);
      }

      return call;
    }()
  }, {
    key: "_loadLastPhoneNumber",
    value: function _loadLastPhoneNumber() {
      if (!this._call.lastRecipient && !this._call.lastPhoneNumber) {
        this._alert.warning({
          message: _callErrors["default"].noToNumber
        });
      } else {
        this.store.dispatch({
          type: this.actionTypes.loadLastCallState,
          phoneNumber: this._call.lastPhoneNumber,
          recipient: this._call.lastRecipient
        });
      }
    }
  }, {
    key: "onCallButtonClick",
    value: function () {
      var _onCallButtonClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _ref4,
            fromNumber,
            fromSessionId,
            _args7 = arguments;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref4 = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {}, fromNumber = _ref4.fromNumber, fromSessionId = _ref4.fromSessionId;

                if (!("".concat(this.toNumberField).trim().length === 0 && !this.recipient)) {
                  _context7.next = 5;
                  break;
                }

                this._loadLastPhoneNumber();

                _context7.next = 8;
                break;

              case 5:
                this._onBeforeCall(fromSessionId);

                _context7.next = 8;
                return this.call({
                  phoneNumber: this.toNumberField,
                  recipient: this.recipient,
                  fromNumber: fromNumber
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
    }()
  }, {
    key: "_onBeforeCall",
    value: function _onBeforeCall() {
      if (this._conferenceCall) {
        this._conferenceCall.closeMergingPair();
      }
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return {
        currentLocale: this._locale.currentLocale,
        callingMode: this._callingSettings.callingMode,
        isWebphoneMode: this._callingSettings.isWebphoneMode,
        callButtonDisabled: this.isCallButtonDisabled,
        fromNumber: this._callingSettings.fromNumber,
        fromNumbers: this._callingSettings.fromNumbers,
        toNumber: this.toNumberField,
        recipient: this.recipient,
        recipients: this.recipients,
        searchContactList: this.searchContactList,
        showSpinner: this.showSpinner,
        dialButtonVolume: this._audioSettings ? this._audioSettings.dialButtonVolume : 1,
        dialButtonMuted: this._audioSettings ? this._audioSettings.dialButtonMuted : false,
        isLastInputFromDialpad: this.isLastInputFromDialpad,
        disableFromField: this.disableFromField,
        useV2: this._useV2
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        onToNumberChange: function onToNumberChange() {
          return _this2.setToNumberField.apply(_this2, arguments);
        },
        clearToNumber: function clearToNumber() {
          return _this2.clearToNumberField();
        },
        onCallButtonClick: function onCallButtonClick() {
          return _this2.onCallButtonClick();
        },
        changeFromNumber: function changeFromNumber() {
          var _this2$_callingSettin;

          return (_this2$_callingSettin = _this2._callingSettings).updateFromNumber.apply(_this2$_callingSettin, arguments);
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode
          });
        },
        setRecipient: function setRecipient(recipient) {
          return _this2.setRecipient(recipient);
        },
        clearRecipient: function clearRecipient() {
          return _this2.clearRecipient();
        },
        searchContact: function searchContact(searchString) {
          return _this2._contactSearch && _this2._contactSearch.debouncedSearch({
            searchString: searchString
          });
        }
      };
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _ObjectMap.ObjectMap.prefixKeys(['setToNumberField', 'clearToNumberField', 'setRecipient', 'clearRecipient', 'loadLastCallState', 'call', 'callError', 'callSuccess'], 'dialerUI');
    }
  }, {
    key: "toNumberField",
    get: function get() {
      return this.state.toNumberField;
    }
  }, {
    key: "recipient",
    get: function get() {
      return this.state.recipient;
    }
  }, {
    key: "isCallButtonDisabled",
    get: function get() {
      return !this._call.isIdle || this._connectivityManager.isOfflineMode || this._connectivityManager.isWebphoneUnavailableMode || this._connectivityManager.isWebphoneInitializing || this._rateLimiter.throttling;
    }
  }, {
    key: "showSpinner",
    get: function get() {
      return !(this._call.ready && this._callingSettings.ready && this._locale.ready && this._rolesAndPermissions.ready && this._connectivityManager.ready && (!this._audioSettings || this._audioSettings.ready) && !this._connectivityManager.isWebphoneInitializing);
    }
  }, {
    key: "isLastInputFromDialpad",
    get: function get() {
      return this.state.isLastInputFromDialpad;
    }
  }, {
    key: "disableFromField",
    get: function get() {
      return this._rolesAndPermissions.ready && !this._rolesAndPermissions.permissions.OutboundCallerId;
    }
  }]);

  return DialerUI;
}(_RcUIModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "clearToNumberField", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "clearToNumberField"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setToNumberField", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setToNumberField"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRecipient", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearRecipient", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "clearRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "call", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "call"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onCallButtonClick", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "onCallButtonClick"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "recipients", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3.recipient;
    }, function (recipient) {
      if (recipient) {
        return [recipient];
      }

      return [];
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "searchContactList", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4._contactSearch && _this4._contactSearch.sortedResult;
    }, function () {
      return _this4.toNumberField;
    }, function (sortedResult, toNumberField) {
      return toNumberField.length >= 3 && sortedResult.slice(0, 50) || [];
    }];
  }
})), _class2)) || _class);
exports["default"] = DialerUI;
//# sourceMappingURL=index.js.map
