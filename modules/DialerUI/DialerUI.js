"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialerUI = void 0;

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _di = require("@ringcentral-integration/commons/lib/di");

var _formatNumber = require("@ringcentral-integration/commons/lib/formatNumber");

var _normalizeNumber2 = require("@ringcentral-integration/commons/lib/normalizeNumber");

var _proxify = _interopRequireDefault(require("@ringcentral-integration/commons/lib/proxy/proxify"));

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _core = require("@ringcentral-integration/core");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var TIMEOUT = 60 * 1000;
var DialerUI = (_dec = (0, _di.Module)({
  name: 'DialerUI',
  deps: ['CallingSettings', 'ConnectivityManager', 'Locale', 'RateLimiter', 'RegionSettings', 'Alert', 'Call', 'ExtensionFeatures', {
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
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(DialerUI, _RcUIModuleV);

  var _super = _createSuper(DialerUI);

  /**
   * verify is that call can be continue before make call
   */
  function DialerUI(deps) {
    var _this;

    _classCallCheck(this, DialerUI);

    _this = _super.call(this, {
      deps: deps
    });
    _this._latestCallTime = 0;
    _this._callHooks = [];
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
    key: "resetState",
    value: function resetState() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        toNumberField: '',
        isLastInputFromDialpad: false,
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
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._setToNumberField('');

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
      var _setToNumberField2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(phoneNumber) {
        var fromDialPad,
            _this$_deps$dialerUIO,
            _this$toNumberField,
            _this$_deps$contactSe,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fromDialPad = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;

                if (this.toNumberField !== phoneNumber) {
                  this.resetState({
                    toNumberField: phoneNumber,
                    isLastInputFromDialpad: fromDialPad,
                    recipient: this.recipient
                  });

                  if (((_this$_deps$dialerUIO = this._deps.dialerUIOptions) === null || _this$_deps$dialerUIO === void 0 ? void 0 : _this$_deps$dialerUIO.useV2) && ((_this$toNumberField = this.toNumberField) === null || _this$toNumberField === void 0 ? void 0 : _this$toNumberField.length) >= 3) {
                    (_this$_deps$contactSe = this._deps.contactSearch) === null || _this$_deps$contactSe === void 0 ? void 0 : _this$_deps$contactSe.debouncedSearch({
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
                this.resetState({
                  toNumberField: '',
                  isLastInputFromDialpad: false,
                  recipient: recipient
                });

              case 1:
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
                  toNumberField: this.toNumberField,
                  isLastInputFromDialpad: false,
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
                  _context6.next = 25;
                  break;
                }

                this._latestCallTime = Date.now();
                this.resetState({
                  toNumberField: phoneNumber,
                  isLastInputFromDialpad: false,
                  recipient: recipient
                });

                if (!this.callVerify) {
                  _context6.next = 10;
                  break;
                }

                _context6.next = 7;
                return this.callVerify({
                  phoneNumber: phoneNumber,
                  recipient: recipient
                });

              case 7:
                _context6.t0 = _context6.sent;
                _context6.next = 11;
                break;

              case 10:
                _context6.t0 = true;

              case 11:
                continueCall = _context6.t0;

                if (continueCall) {
                  _context6.next = 14;
                  break;
                }

                return _context6.abrupt("return");

              case 14:
                _context6.next = 16;
                return this.triggerHook({
                  phoneNumber: phoneNumber,
                  recipient: recipient,
                  fromNumber: fromNumber
                });

              case 16:
                _context6.prev = 16;
                _context6.next = 19;
                return this._deps.call.call({
                  phoneNumber: this.toNumberField,
                  recipient: this.recipient,
                  fromNumber: fromNumber
                });

              case 19:
                this.resetState();
                _context6.next = 25;
                break;

              case 22:
                _context6.prev = 22;
                _context6.t1 = _context6["catch"](16);
                console.log('[DialerUI] make call error', _context6.t1);

              case 25:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[16, 22]]);
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
          message: _callErrors["default"].noToNumber
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
      var _normalizeNumber, _this$_deps$call$last;

      var latestNumber = (_normalizeNumber = (0, _normalizeNumber2.normalizeNumber)({
        phoneNumber: this._deps.call.lastPhoneNumber || ((_this$_deps$call$last = this._deps.call.lastRecipient) === null || _this$_deps$call$last === void 0 ? void 0 : _this$_deps$call$last.phoneNumber),
        countryCode: this._deps.regionSettings.countryCode,
        areaCode: this._deps.regionSettings.areaCode // if call out with extension number then only match main company number

      })) === null || _normalizeNumber === void 0 ? void 0 : _normalizeNumber.split('*')[0];

      if (latestNumber === phoneNumber && Date.now() - this._latestCallTime <= TIMEOUT) {
        this._latestCallTime = 0;
        return true;
      }

      return false;
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps$audioSett, _this$_deps$audioSett2, _this$_deps$audioSett3, _this$_deps$audioSett4, _this$_deps$dialerUIO2;

      return {
        currentLocale: this._deps.locale.currentLocale,
        callingMode: this._deps.callingSettings.callingMode,
        isWebphoneMode: this._deps.callingSettings.isWebphoneMode,
        callButtonDisabled: this.isCallButtonDisabled,
        fromNumber: this._deps.callingSettings.fromNumber,
        fromNumbers: this._deps.callingSettings.fromNumbers,
        toNumber: this.toNumberField,
        recipient: this.recipient,
        recipients: this.recipients,
        searchContactList: this.searchContactList,
        showSpinner: this.showSpinner,
        dialButtonVolume: (_this$_deps$audioSett = (_this$_deps$audioSett2 = this._deps.audioSettings) === null || _this$_deps$audioSett2 === void 0 ? void 0 : _this$_deps$audioSett2.dialButtonVolume) !== null && _this$_deps$audioSett !== void 0 ? _this$_deps$audioSett : 1,
        dialButtonMuted: (_this$_deps$audioSett3 = (_this$_deps$audioSett4 = this._deps.audioSettings) === null || _this$_deps$audioSett4 === void 0 ? void 0 : _this$_deps$audioSett4.dialButtonMuted) !== null && _this$_deps$audioSett3 !== void 0 ? _this$_deps$audioSett3 : false,
        isLastInputFromDialpad: this.isLastInputFromDialpad,
        disableFromField: this.disableFromField,
        useV2: (_this$_deps$dialerUIO2 = this._deps.dialerUIOptions) === null || _this$_deps$dialerUIO2 === void 0 ? void 0 : _this$_deps$dialerUIO2.useV2,
        showAnonymous: this.isShowAnonymous
      };
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
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
          var _this2$_deps$callingS;

          return (_this2$_deps$callingS = _this2._deps.callingSettings).updateFromNumber.apply(_this2$_deps$callingS, arguments);
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber.formatNumber)({
            phoneNumber: phoneNumber,
            areaCode: _this2._deps.regionSettings.areaCode,
            countryCode: _this2._deps.regionSettings.countryCode
          });
        },
        setRecipient: function setRecipient() {
          return _this2.setRecipient.apply(_this2, arguments);
        },
        clearRecipient: function clearRecipient() {
          return _this2.clearRecipient();
        },
        searchContact: function searchContact(searchString) {
          var _this2$_deps$contactS;

          return (_this2$_deps$contactS = _this2._deps.contactSearch) === null || _this2$_deps$contactS === void 0 ? void 0 : _this2$_deps$contactS.debouncedSearch({
            searchString: searchString
          });
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
}), _applyDecoratedDescriptor(_class2.prototype, "_setRecipient", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "recipients", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "recipients"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchContactList", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "searchContactList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "resetState"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearToNumberField", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "clearToNumberField"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setToNumberField", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setToNumberField"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setRecipient", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearRecipient", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "clearRecipient"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "call", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "call"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_loadLastPhoneNumberAction", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_loadLastPhoneNumberAction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onCallButtonClick", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "onCallButtonClick"), _class2.prototype)), _class2)) || _class);
exports.DialerUI = DialerUI;
//# sourceMappingURL=DialerUI.js.map
