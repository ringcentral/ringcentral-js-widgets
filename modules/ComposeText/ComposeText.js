"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.map");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeText = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _isBlank = require("../../lib/isBlank");
var _proxify = require("../../lib/proxy/proxify");
var _MessageSender = require("../MessageSender");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));) { ; } return t; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
/**
 * @class
 * @description Compose text managing module
 */
var ComposeText = (_dec = (0, _di.Module)({
  name: 'ComposeText',
  deps: ['Alert', 'Auth', 'Storage', 'MessageSender', 'NumberValidate', 'AppFeatures', {
    dep: 'ContactSearch',
    optional: true
  }, {
    dep: 'ComposeTextOptions',
    optional: true
  }, {
    dep: 'RouterInteraction',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(ComposeText, _RcModuleV);
  var _super = _createSuper(ComposeText);
  function ComposeText(deps) {
    var _this;
    _classCallCheck(this, ComposeText);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'composeText'
    });
    _this._lastContactSearchResult = null;
    _this.smsVerify = void 0;
    _initializerDefineProperty(_this, "senderNumber", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "typingToNumber", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "toNumbers", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "messageText", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "toNumberEntity", _descriptor5, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "attachments", _descriptor6, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(ComposeText, [{
    key: "_setSenderNumber",
    value: function _setSenderNumber() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.senderNumber = number;
    }
  }, {
    key: "_setTypingToNumber",
    value: function _setTypingToNumber(number) {
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      this.typingToNumber = number;
    }
  }, {
    key: "_setToNumberEntity",
    value: function _setToNumberEntity(entityId) {
      this.toNumberEntity = entityId;
    }
  }, {
    key: "_addToNumber",
    value: function _addToNumber(number) {
      if (number.id) {
        var idx = this.toNumbers.findIndex(function (item) {
          return number.id === item.id || number.phoneNumber === item.phoneNumber;
        });
        if (idx > -1) {
          // replace old one if found
          this.toNumbers[idx] = number;
          return;
        }
      } else {
        var oldNumber = this.toNumbers.find(function (item) {
          return number.phoneNumber === item.phoneNumber;
        });
        if (oldNumber) {
          return;
        }
      }
      this.toNumbers.push(number);
    }
  }, {
    key: "_removeToNumber",
    value: function _removeToNumber(number) {
      this.toNumbers = this.toNumbers.filter(function (item) {
        return item.phoneNumber !== number.phoneNumber;
      });
    }
  }, {
    key: "_setMessageText",
    value: function _setMessageText(text) {
      this.messageText = text;
    }
  }, {
    key: "_addAttachment",
    value: function _addAttachment(attachment) {
      var newAttachments = this.attachments.filter(function (f) {
        return f.name !== attachment.name;
      });
      newAttachments.push(attachment);
      this.attachments = newAttachments;
    }
  }, {
    key: "_removeAttachment",
    value: function _removeAttachment(attachment) {
      this.attachments = this.attachments.filter(function (f) {
        return f.name !== attachment.name;
      });
    }
  }, {
    key: "_clean",
    value: function _clean() {
      this.typingToNumber = '';
      this.toNumbers = [];
      this.messageText = '';
      this.attachments = [];
      this.toNumberEntity = '';
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      if (this._shouldHandleRecipient()) {
        this._handleRecipient();
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(ComposeText.prototype), "_shouldInit", this).call(this) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(ComposeText.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._deps.auth.isFreshLogin) {
                  _context.next = 3;
                  break;
                }
                _context.next = 3;
                return this.clean();
              case 3:
                this._initSenderNumber();
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function onInit() {
        return _onInit.apply(this, arguments);
      }
      return onInit;
    }()
  }, {
    key: "onReset",
    value: function () {
      var _onReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.clean();
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function onReset() {
        return _onReset.apply(this, arguments);
      }
      return onReset;
    }()
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _core.watch)(this, function () {
        return _this2._deps.messageSender.senderNumbersList;
      }, function () {
        if (_this2.ready) {
          _this2._initSenderNumber();
        }
      });
    }
  }, {
    key: "_shouldHandleRecipient",
    value: function _shouldHandleRecipient() {
      return this.ready && !!this._deps.contactSearch && this._deps.contactSearch.ready && this._deps.contactSearch.searchResult.length > 0 && this._deps.contactSearch.searchResult !== this._lastContactSearchResult;
    }
  }, {
    key: "_initSenderNumber",
    value: function _initSenderNumber() {
      var cachedPhoneNumber = this.senderNumber;
      if (cachedPhoneNumber && this._deps.messageSender.senderNumbersList.find(function (number) {
        return number.phoneNumber === cachedPhoneNumber;
      })) {
        return;
      }
      this.updateSenderNumber(this._deps.messageSender.senderNumbersList[0] && this._deps.messageSender.senderNumbersList[0].phoneNumber);
    }
  }, {
    key: "_handleRecipient",
    value: function _handleRecipient() {
      var dummy = this.toNumbers.find(function (toNumber) {
        return !toNumber.entityType;
      });
      if (dummy) {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        var recipient = this._deps.contactSearch.searchResult.find(function (item) {
          return item.id === dummy.id;
        });
        if (recipient) {
          this.addToNumber(recipient);
          this._lastContactSearchResult =
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          this._deps.contactSearch.searchResult.slice();
        }
      }
    }
  }, {
    key: "_alertWarning",
    value: function _alertWarning(message) {
      if (message) {
        var ttlConfig = message !== _MessageSender.messageSenderMessages.noAreaCode ? {
          ttl: 0
        } : null;
        this._deps.alert.warning(_objectSpread({
          message: message,
          allowDuplicates: false
        }, ttlConfig));
        return true;
      }
      return false;
    }
  }, {
    key: "_validatePhoneNumber",
    value: function () {
      var _validatePhoneNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(phoneNumber) {
        var _this$_deps$appFeatur;
        var isEDPEnabled, validateResult, error;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._validateIsOnlyPager(phoneNumber);
              case 2:
                if (!_context3.sent) {
                  _context3.next = 4;
                  break;
                }
                return _context3.abrupt("return", null);
              case 4:
                isEDPEnabled = (_this$_deps$appFeatur = this._deps.appFeatures) === null || _this$_deps$appFeatur === void 0 ? void 0 : _this$_deps$appFeatur.isEDPEnabled;
                validateResult = isEDPEnabled ? this._deps.numberValidate.validate([phoneNumber]) : this._deps.numberValidate.validateFormat([phoneNumber]);
                if (validateResult.result) {
                  _context3.next = 12;
                  break;
                }
                error = validateResult.errors[0];
                if (!(error && this._alertWarning(_MessageSender.messageSenderMessages[error.type]))) {
                  _context3.next = 10;
                  break;
                }
                return _context3.abrupt("return", false);
              case 10:
                this._alertWarning(_MessageSender.messageSenderMessages.recipientNumberInvalids);
                return _context3.abrupt("return", false);
              case 12:
                return _context3.abrupt("return", true);
              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function _validatePhoneNumber(_x) {
        return _validatePhoneNumber2.apply(this, arguments);
      }
      return _validatePhoneNumber;
    }()
  }, {
    key: "_validateIsOnlyPager",
    value: function () {
      var _validateIsOnlyPager2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(phoneNumber) {
        var validate, _ref, _ref2, isAnExtension;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                validate = this._deps.numberValidate.validate([phoneNumber]);
                if (validate.result) {
                  _context4.next = 3;
                  break;
                }
                return _context4.abrupt("return", false);
              case 3:
                _context4.next = 5;
                return this._deps.numberValidate.parseNumbers([phoneNumber]);
              case 5:
                _context4.t0 = _context4.sent;
                if (_context4.t0) {
                  _context4.next = 8;
                  break;
                }
                _context4.t0 = [{}];
              case 8:
                _ref = _context4.t0;
                _ref2 = _slicedToArray(_ref, 1);
                isAnExtension = _ref2[0].isAnExtension;
                if (!(phoneNumber.length >= 7 && !isAnExtension && !this._deps.appFeatures.hasOutboundSMSPermission)) {
                  _context4.next = 14;
                  break;
                }
                this._alertWarning(_MessageSender.messageSenderMessages.noSMSPermission);
                return _context4.abrupt("return", true);
              case 14:
                return _context4.abrupt("return", false);
              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function _validateIsOnlyPager(_x2) {
        return _validateIsOnlyPager2.apply(this, arguments);
      }
      return _validateIsOnlyPager;
    }()
  }, {
    key: "validatePhoneNumber",
    value: function () {
      var _validatePhoneNumber3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(phoneNumber) {
        var validateResult;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._validateIsOnlyPager(phoneNumber);
              case 2:
                if (!_context5.sent) {
                  _context5.next = 4;
                  break;
                }
                return _context5.abrupt("return", false);
              case 4:
                validateResult = this._deps.numberValidate.validateFormat([phoneNumber]);
                return _context5.abrupt("return", !!validateResult.result);
              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function validatePhoneNumber(_x3) {
        return _validatePhoneNumber3.apply(this, arguments);
      }
      return validatePhoneNumber;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(text) {
        var _this3 = this;
        var attachments,
          toNumbers,
          typingToNumber,
          continueSend,
          timeoutID,
          responses,
          _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                attachments = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : [];
                toNumbers = this.toNumbers.map(function (number) {
                  return number.phoneNumber;
                });
                typingToNumber = this.typingToNumber;
                if ((0, _isBlank.isBlank)(typingToNumber)) {
                  _context6.next = 11;
                  break;
                }
                _context6.next = 6;
                return this._validatePhoneNumber(typingToNumber);
              case 6:
                if (!_context6.sent) {
                  _context6.next = 10;
                  break;
                }
                toNumbers.push(typingToNumber);
                _context6.next = 11;
                break;
              case 10:
                return _context6.abrupt("return", null);
              case 11:
                if (!this.smsVerify) {
                  _context6.next = 17;
                  break;
                }
                _context6.next = 14;
                return this.smsVerify({
                  toNumbers: this.toNumbers,
                  typingToNumber: typingToNumber
                });
              case 14:
                _context6.t0 = _context6.sent;
                _context6.next = 18;
                break;
              case 17:
                _context6.t0 = true;
              case 18:
                continueSend = _context6.t0;
                if (continueSend) {
                  _context6.next = 21;
                  break;
                }
                return _context6.abrupt("return", null);
              case 21:
                timeoutID = setTimeout(function () {
                  var _this3$_deps$routerIn;
                  if (((_this3$_deps$routerIn = _this3._deps.routerInteraction) === null || _this3$_deps$routerIn === void 0 ? void 0 : _this3$_deps$routerIn.currentPath) === '/composeText') {
                    _this3.alertMessageSending();
                  }
                  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
                  timeoutID = null;
                }, 10000);
                _context6.prev = 22;
                _context6.next = 25;
                return this._deps.messageSender.send({
                  fromNumber: this.senderNumber,
                  toNumbers: toNumbers,
                  text: text,
                  attachments: attachments
                });
              case 25:
                responses = _context6.sent;
                if (timeoutID) {
                  clearTimeout(timeoutID);
                  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
                  timeoutID = null;
                }
                this.dismissMessageSending();
                return _context6.abrupt("return", responses);
              case 31:
                _context6.prev = 31;
                _context6.t1 = _context6["catch"](22);
                if (timeoutID) {
                  clearTimeout(timeoutID);
                  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
                  timeoutID = null;
                }
                throw _context6.t1;
              case 35:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[22, 31]]);
      }));
      function send(_x4) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "updateSenderNumber",
    value: function () {
      var _updateSenderNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(number) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this._setSenderNumber(number);
              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function updateSenderNumber(_x5) {
        return _updateSenderNumber.apply(this, arguments);
      }
      return updateSenderNumber;
    }()
  }, {
    key: "updateTypingToNumber",
    value: function () {
      var _updateTypingToNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(number) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(number.length > 30)) {
                  _context8.next = 3;
                  break;
                }
                this._alertWarning(_MessageSender.messageSenderMessages.recipientNumberInvalids);
                return _context8.abrupt("return");
              case 3:
                this._setTypingToNumber(number);
              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function updateTypingToNumber(_x6) {
        return _updateTypingToNumber.apply(this, arguments);
      }
      return updateTypingToNumber;
    }()
  }, {
    key: "onToNumberMatch",
    value: function () {
      var _onToNumberMatch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref3) {
        var entityId;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                entityId = _ref3.entityId;
                this._setToNumberEntity(entityId);
              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function onToNumberMatch(_x7) {
        return _onToNumberMatch.apply(this, arguments);
      }
      return onToNumberMatch;
    }()
  }, {
    key: "addToRecipients",
    value: function () {
      var _addToRecipients = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(recipient) {
        var shouldClean,
          isAdded,
          _args10 = arguments;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                shouldClean = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : true;
                _context10.next = 3;
                return this.addToNumber(recipient);
              case 3:
                isAdded = _context10.sent;
                if (isAdded && shouldClean) {
                  this._setTypingToNumber('');
                }
              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function addToRecipients(_x8) {
        return _addToRecipients.apply(this, arguments);
      }
      return addToRecipients;
    }()
  }, {
    key: "cleanTypingToNumber",
    value: function () {
      var _cleanTypingToNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this._setTypingToNumber('');
              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function cleanTypingToNumber() {
        return _cleanTypingToNumber.apply(this, arguments);
      }
      return cleanTypingToNumber;
    }()
  }, {
    key: "addToNumber",
    value: function () {
      var _addToNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(number) {
        var isValid;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!(0, _isBlank.isBlank)(number.phoneNumber)) {
                  _context12.next = 2;
                  break;
                }
                return _context12.abrupt("return", false);
              case 2:
                _context12.next = 4;
                return this._validatePhoneNumber(number.phoneNumber);
              case 4:
                isValid = _context12.sent;
                if (isValid) {
                  _context12.next = 7;
                  break;
                }
                return _context12.abrupt("return", false);
              case 7:
                this._addToNumber(number);
                return _context12.abrupt("return", true);
              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function addToNumber(_x9) {
        return _addToNumber2.apply(this, arguments);
      }
      return addToNumber;
    }()
  }, {
    key: "removeToNumber",
    value: function () {
      var _removeToNumber2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(number) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                this._removeToNumber(number);
              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function removeToNumber(_x10) {
        return _removeToNumber2.apply(this, arguments);
      }
      return removeToNumber;
    }()
  }, {
    key: "updateMessageText",
    value: function () {
      var _updateMessageText = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(text) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (!(text.length > 1000)) {
                  _context14.next = 3;
                  break;
                }
                this._alertWarning(_MessageSender.messageSenderMessages.textTooLong);
                return _context14.abrupt("return");
              case 3:
                this._setMessageText(text);
              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));
      function updateMessageText(_x11) {
        return _updateMessageText.apply(this, arguments);
      }
      return updateMessageText;
    }()
  }, {
    key: "addAttachment",
    value: function () {
      var _addAttachment2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(attachment) {
        var size;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!(this.attachments.length >= 10)) {
                  _context15.next = 3;
                  break;
                }
                this._alertWarning(_MessageSender.messageSenderMessages.attachmentCountLimitation);
                return _context15.abrupt("return");
              case 3:
                size = this.attachments.reduce(function (prev, curr) {
                  return prev + curr.size;
                }, 0);
                if (!(size + attachment.size > _MessageSender.ATTACHMENT_SIZE_LIMITATION)) {
                  _context15.next = 7;
                  break;
                }
                this._alertWarning(_MessageSender.messageSenderMessages.attachmentSizeLimitation);
                return _context15.abrupt("return");
              case 7:
                this._addAttachment(attachment);
              case 8:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
      function addAttachment(_x12) {
        return _addAttachment2.apply(this, arguments);
      }
      return addAttachment;
    }()
  }, {
    key: "removeAttachment",
    value: function () {
      var _removeAttachment2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(attachment) {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this._removeAttachment(attachment);
              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));
      function removeAttachment(_x13) {
        return _removeAttachment2.apply(this, arguments);
      }
      return removeAttachment;
    }()
  }, {
    key: "clean",
    value: function () {
      var _clean2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                this._clean();
              case 1:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));
      function clean() {
        return _clean2.apply(this, arguments);
      }
      return clean;
    }()
  }, {
    key: "alertMessageSending",
    value: function () {
      var _alertMessageSending = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                this._deps.alert.warning({
                  message: _MessageSender.messageSenderMessages.sending,
                  ttl: 0
                });
              case 1:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));
      function alertMessageSending() {
        return _alertMessageSending.apply(this, arguments);
      }
      return alertMessageSending;
    }()
  }, {
    key: "dismissMessageSending",
    value: function () {
      var _dismissMessageSending = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var alertMessage;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                alertMessage = this._deps.alert.messages.find(function (m) {
                  return m.message === _MessageSender.messageSenderMessages.sending;
                });
                if (alertMessage && alertMessage.id) {
                  this._deps.alert.dismiss(alertMessage.id);
                }
              case 2:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));
      function dismissMessageSending() {
        return _dismissMessageSending.apply(this, arguments);
      }
      return dismissMessageSending;
    }()
  }, {
    key: "senderNumbersList",
    get: function get() {
      return this._deps.messageSender.senderNumbersList;
    }
  }]);
  return ComposeText;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "senderNumber", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "typingToNumber", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "toNumbers", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "messageText", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "toNumberEntity", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "attachments", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setSenderNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSenderNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setTypingToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setToNumberEntity", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setToNumberEntity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setMessageText", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addAttachment", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeAttachment", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clean", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "validatePhoneNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "validatePhoneNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "send", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSenderNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSenderNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTypingToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onToNumberMatch", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onToNumberMatch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addToRecipients", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addToRecipients"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanTypingToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMessageText", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachment", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAttachment", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clean", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alertMessageSending", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "alertMessageSending"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissMessageSending", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissMessageSending"), _class2.prototype)), _class2)) || _class);
exports.ComposeText = ComposeText;
//# sourceMappingURL=ComposeText.js.map
