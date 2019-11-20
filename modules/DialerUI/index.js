"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var _di = require("ringcentral-integration/lib/di");

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _callErrors = _interopRequireDefault(require("ringcentral-integration/modules/Call/callErrors"));

var _Enum = _interopRequireDefault(require("ringcentral-integration/lib/Enum"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _selector = require("ringcentral-integration/lib/selector");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _getReducer = _interopRequireDefault(require("./getReducer"));

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  }, 'Locale', 'RateLimiter', 'RegionSettings', 'Alert', 'Call', {
    dep: 'ConferenceCall',
    optional: true
  }, {
    dep: 'DialerUIOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(DialerUI, _RcUIModule);

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
        _ref$useV = _ref.useV2,
        useV2 = _ref$useV === void 0 ? false : _ref$useV,
        options = _objectWithoutProperties(_ref, ["alert", "audioSettings", "call", "callingSettings", "conferenceCall", "connectivityManager", "contactSearch", "locale", "rateLimiter", "regionSettings", "useV2"]);

    _classCallCheck(this, DialerUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DialerUI).call(this, _objectSpread({}, options)));

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
    _this._reducer = (0, _getReducer["default"])(_this.actionTypes);
    _this._useV2 = useV2;
    _this._callHooks = [];
    return _this;
  }

  _createClass(DialerUI, [{
    key: "clearToNumberField",
    value: function clearToNumberField() {
      return regeneratorRuntime.async(function clearToNumberField$(_context) {
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
      }, null, this);
    }
  }, {
    key: "setToNumberField",
    value: function setToNumberField(phoneNumber) {
      var fromDialPad,
          _args2 = arguments;
      return regeneratorRuntime.async(function setToNumberField$(_context2) {
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
      }, null, this);
    }
  }, {
    key: "setRecipient",
    value: function setRecipient(recipient) {
      var shouldClean,
          _args3 = arguments;
      return regeneratorRuntime.async(function setRecipient$(_context3) {
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
              return regeneratorRuntime.awrap(this.clearToNumberField());

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "clearRecipient",
    value: function clearRecipient() {
      return regeneratorRuntime.async(function clearRecipient$(_context4) {
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
      }, null, this);
    }
  }, {
    key: "call",
    value: function call(_ref2) {
      var _ref2$phoneNumber, phoneNumber, _ref2$recipient, recipient, _ref2$fromNumber, fromNumber, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, hook;

      return regeneratorRuntime.async(function call$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ref2$phoneNumber = _ref2.phoneNumber, phoneNumber = _ref2$phoneNumber === void 0 ? '' : _ref2$phoneNumber, _ref2$recipient = _ref2.recipient, recipient = _ref2$recipient === void 0 ? null : _ref2$recipient, _ref2$fromNumber = _ref2.fromNumber, fromNumber = _ref2$fromNumber === void 0 ? null : _ref2$fromNumber;

              if (!(phoneNumber || recipient)) {
                _context5.next = 38;
                break;
              }

              this.store.dispatch({
                type: this.actionTypes.call,
                phoneNumber: phoneNumber,
                recipient: recipient
              });
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context5.prev = 6;
              _iterator = this._callHooks[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context5.next = 15;
                break;
              }

              hook = _step.value;
              _context5.next = 12;
              return regeneratorRuntime.awrap(hook({
                phoneNumber: phoneNumber,
                recipient: recipient,
                fromNumber: fromNumber
              }));

            case 12:
              _iteratorNormalCompletion = true;
              _context5.next = 8;
              break;

            case 15:
              _context5.next = 21;
              break;

            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5["catch"](6);
              _didIteratorError = true;
              _iteratorError = _context5.t0;

            case 21:
              _context5.prev = 21;
              _context5.prev = 22;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 24:
              _context5.prev = 24;

              if (!_didIteratorError) {
                _context5.next = 27;
                break;
              }

              throw _iteratorError;

            case 27:
              return _context5.finish(24);

            case 28:
              return _context5.finish(21);

            case 29:
              _context5.prev = 29;
              _context5.next = 32;
              return regeneratorRuntime.awrap(this._call.call({
                phoneNumber: this.toNumberField,
                recipient: this.recipient,
                fromNumber: fromNumber
              }));

            case 32:
              this.store.dispatch({
                type: this.actionTypes.callSuccess
              });
              _context5.next = 38;
              break;

            case 35:
              _context5.prev = 35;
              _context5.t1 = _context5["catch"](29);
              this.store.dispatch({
                type: this.actionTypes.callError,
                error: _context5.t1
              });

            case 38:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[6, 17, 21, 29], [22,, 24, 28], [29, 35]]);
    }
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
    value: function onCallButtonClick() {
      var _ref3,
          fromNumber,
          fromSessionId,
          _args6 = arguments;

      return regeneratorRuntime.async(function onCallButtonClick$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ref3 = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {}, fromNumber = _ref3.fromNumber, fromSessionId = _ref3.fromSessionId;

              if (!("".concat(this.toNumberField).trim().length === 0 && !this.recipient)) {
                _context6.next = 5;
                break;
              }

              this._loadLastPhoneNumber();

              _context6.next = 8;
              break;

            case 5:
              this._onBeforeCall(fromSessionId);

              _context6.next = 8;
              return regeneratorRuntime.awrap(this.call({
                phoneNumber: this.toNumberField,
                recipient: this.recipient,
                fromNumber: fromNumber
              }));

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
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
      return new _Enum["default"](['setToNumberField', 'clearToNumberField', 'setRecipient', 'clearRecipient', 'loadLastCallState', 'call', 'callError', 'callSuccess'], 'dialerUI');
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
      return !(this._call.ready && this._callingSettings.ready && this._locale.ready && this._connectivityManager.ready && (!this._audioSettings || this._audioSettings.ready) && !this._connectivityManager.isWebphoneInitializing);
    }
  }, {
    key: "isLastInputFromDialpad",
    get: function get() {
      return this.state.isLastInputFromDialpad;
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
