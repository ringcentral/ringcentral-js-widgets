"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageSender = exports.MULTIPART_MESSAGE_MAX_LENGTH = exports.MESSAGE_MAX_LENGTH = exports.ATTACHMENT_SIZE_LIMITATION = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _trackEvents = require("@ringcentral-integration/commons/enums/trackEvents");
var _chunkMessage = _interopRequireDefault(require("@ringcentral-integration/commons/lib/chunkMessage"));
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _events = require("events");
var _ramda = require("ramda");
var _uuid = require("uuid");
var _i18n = require("./i18n");
var _messageSenderEvents = require("./messageSenderEvents");
var _messageSenderStatus = require("./messageSenderStatus");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var MESSAGE_MAX_LENGTH = exports.MESSAGE_MAX_LENGTH = 1000;
var MULTIPART_MESSAGE_MAX_LENGTH = exports.MULTIPART_MESSAGE_MAX_LENGTH = MESSAGE_MAX_LENGTH * 5;
var SENDING_THRESHOLD = 30;
var ATTACHMENT_SIZE_LIMITATION = exports.ATTACHMENT_SIZE_LIMITATION = 1.5 * 1024 * 1024;
var MessageSender = exports.MessageSender = (_dec = (0, _nextCore.injectable)({
  name: 'MessageSender'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 9);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 10);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('MessageSenderOptions')(target, undefined, 11);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services3.Brand === "undefined" ? Object : _services3.Brand, typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services3.ToastManager === "undefined" ? Object : _services3.ToastManager, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services.ExtensionPhoneNumber === "undefined" ? Object : _services.ExtensionPhoneNumber, typeof _services2.NumberValidate === "undefined" ? Object : _services2.NumberValidate, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.NumberFormatter === "undefined" ? Object : _services.NumberFormatter, typeof _services2.CompanyContacts === "undefined" ? Object : _services2.CompanyContacts, typeof _services.AvailabilityMonitor === "undefined" ? Object : _services.AvailabilityMonitor, typeof MessageSenderOptions === "undefined" ? Object : MessageSenderOptions]), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [String]), _dec9 = (0, _services.track)(function (_, isGroupMessage, isPager) {
  return [_trackEvents.trackEvents.smsAttempt, {
    isGroupMessage: isGroupMessage,
    isPager: isPager
  }];
}), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [Boolean, Boolean]), _dec10 = (0, _services.track)(_trackEvents.trackEvents.smsSentSuccessfully), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec13 = (0, _services.track)(_trackEvents.trackEvents.smsSentFailed), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", []), _dec16 = (0, _nextCore.delegate)('server'), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [Array]), _dec19 = (0, _nextCore.delegate)('server'), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [typeof SendPayload === "undefined" ? Object : SendPayload]), _dec22 = (0, _nextCore.delegate)('server'), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [typeof SendSMSPayload === "undefined" ? Object : SendSMSPayload]), _dec25 = (0, _nextCore.delegate)('server'), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [typeof SendMMSPayload === "undefined" ? Object : SendMMSPayload]), _dec28 = (0, _nextCore.delegate)('server'), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", [Object]), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function MessageSender(_brand, _toast, _toastManager, _client, _extensionInfo, _extensionPhoneNumber, _numberValidate, _appFeatures, _numberFormatter, _companyContacts, _availabilityMonitor, _messageSenderOptions) {
    var _this;
    _classCallCheck(this, MessageSender);
    _this = _callSuper(this, MessageSender);
    _this._brand = _brand;
    _this._toast = _toast;
    _this._toastManager = _toastManager;
    _this._client = _client;
    _this._extensionInfo = _extensionInfo;
    _this._extensionPhoneNumber = _extensionPhoneNumber;
    _this._numberValidate = _numberValidate;
    _this._appFeatures = _appFeatures;
    _this._numberFormatter = _numberFormatter;
    _this._companyContacts = _companyContacts;
    _this._availabilityMonitor = _availabilityMonitor;
    _this._messageSenderOptions = _messageSenderOptions;
    _this._eventEmitter = new _events.EventEmitter();
    _this.uniqueManager = _this._toastManager.createUniqueManager();
    _initializerDefineProperty(_this, "sendStatus", _descriptor, _this);
    return _this;
  }
  _inherits(MessageSender, _RcModule);
  return _createClass(MessageSender, [{
    key: "setSendStatus",
    value: function setSendStatus(status) {
      this.sendStatus = status;
    }
  }, {
    key: "_smsAttempt",
    value: function _smsAttempt(isBulkMessage, isPage) {
      this.setSendStatus(_messageSenderStatus.messageSenderStatus.sending);
    }
  }, {
    key: "_smsSentOver",
    value: function _smsSentOver() {
      this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
    }
  }, {
    key: "_smsSentError",
    value: function _smsSentError() {
      this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
    }
  }, {
    key: "validateContent",
    value: function validateContent(text, attachments, multipart) {
      var _this2 = this;
      if ((0, _isBlank.isBlank)(text) && attachments.length === 0) {
        this.uniqueManager.unique(function () {
          return _this2._toast.warning({
            message: (0, _i18n.t)('textEmpty'),
            ttl: 0
          });
        });
        return false;
      }
      if (!multipart && text && text.length > MESSAGE_MAX_LENGTH) {
        this.uniqueManager.unique(function () {
          return _this2._toast.warning({
            message: (0, _i18n.t)('textTooLong'),
            ttl: 0
          });
        });
        return false;
      }
      if (multipart && text && text.length > MULTIPART_MESSAGE_MAX_LENGTH) {
        this.uniqueManager.unique(function () {
          return _this2._toast.warning({
            message: (0, _i18n.t)('multipartTextTooLong'),
            ttl: 0
          });
        });
        return false;
      }
      return true;
    }
  }, {
    key: "_validateToNumbersIsEmpty",
    value: function _validateToNumbersIsEmpty(toNumbers) {
      var _this3 = this;
      if (toNumbers.length === 0) {
        this.uniqueManager.unique(function () {
          return _this3._toast.warning({
            message: (0, _i18n.t)('recipientsEmpty'),
            ttl: 0
          });
        });
        return true;
      }
      return false;
    }
  }, {
    key: "_validateSenderNumber",
    value: function _validateSenderNumber(senderNumber) {
      var _this4 = this;
      var validateResult = true;
      if ((0, _isBlank.isBlank)(senderNumber)) {
        validateResult = false;
      }
      this.setSendStatus(_messageSenderStatus.messageSenderStatus.validating);
      if (validateResult) {
        var isMySenderNumber = (0, _ramda.find)(function (number) {
          return number.phoneNumber === senderNumber;
        }, this.senderNumbersList);
        if (!isMySenderNumber) {
          validateResult = false;
        }
      }
      if (!validateResult) {
        this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
        this.uniqueManager.unique(function () {
          return _this4._toast.warning({
            message: (0, _i18n.t)('senderNumberInvalid'),
            ttl: 0
          });
        });
      }
      return validateResult;
    }
  }, {
    key: "_validateToNumbers",
    value: function () {
      var _validateToNumbers2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(toNumbers) {
        var _this$_appFeatures,
          _this5 = this;
        var result, recipientNumbers, isEDPEnabled, numberValidateResult, parsedNumbers, _iterator, _step, number, _this$_companyContact, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              result = {
                result: false,
                extNumbers: [],
                noExtNumbers: []
              };
              if (!this._validateToNumbersIsEmpty(toNumbers)) {
                _context.n = 1;
                break;
              }
              return _context.a(2, result);
            case 1:
              recipientNumbers = toNumbers.filter(function (item, index, arr) {
                return arr.indexOf(item) === index;
              });
              this.setSendStatus(_messageSenderStatus.messageSenderStatus.validating);
              isEDPEnabled = (_this$_appFeatures = this._appFeatures) === null || _this$_appFeatures === void 0 ? void 0 : _this$_appFeatures.isEDPEnabled;
              if (!isEDPEnabled) {
                _context.n = 2;
                break;
              }
              _t = this._numberValidate.validate(recipientNumbers);
              _context.n = 4;
              break;
            case 2:
              _context.n = 3;
              return this._numberValidate.validateNumbers(recipientNumbers);
            case 3:
              _t = _context.v;
            case 4:
              numberValidateResult = _t;
              this._numberValidate.handleValidateToasts(numberValidateResult);
              if (numberValidateResult.result) {
                _context.n = 5;
                break;
              }
              this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
              return _context.a(2, result);
            case 5:
              if (!isEDPEnabled) {
                _context.n = 7;
                break;
              }
              _context.n = 6;
              return this._numberValidate.parseNumbers(recipientNumbers);
            case 6:
              parsedNumbers = _context.v;
              if (parsedNumbers) {
                result.result = true;
                parsedNumbers.forEach(function (item) {
                  if (item.isAnExtension) {
                    var _item$availableExtens;
                    result.extNumbers.push((_item$availableExtens = item.availableExtension) !== null && _item$availableExtens !== void 0 ? _item$availableExtens : item.parsedNumber);
                  } else {
                    result.noExtNumbers.push(item.parsedNumber);
                  }
                });
              }
              _context.n = 17;
              break;
            case 7:
              _iterator = _createForOfIteratorHelper(numberValidateResult.numbers);
              _context.p = 8;
              _iterator.s();
            case 9:
              if ((_step = _iterator.n()).done) {
                _context.n = 13;
                break;
              }
              number = _step.value;
              if (!(number.subAddress && number.subAddress.length > 0)) {
                _context.n = 11;
                break;
              }
              if (!(!((_this$_companyContact = this._companyContacts) === null || _this$_companyContact === void 0 ? void 0 : _this$_companyContact.enableCompanyPublicApi) && !this._numberValidate.isCompanyExtension(number.e164, number.subAddress))) {
                _context.n = 10;
                break;
              }
              this.uniqueManager.unique(function () {
                return _this5._toast.warning({
                  message: (0, _i18n.t)('notAnExtension'),
                  ttl: 0
                });
              });
              this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
              return _context.a(2, result);
            case 10:
              result.extNumbers.push(number.subAddress);
              _context.n = 12;
              break;
            case 11:
              if (number.isAnExtension) {
                result.extNumbers.push(number.availableExtension || number.e164);
              } else {
                result.noExtNumbers.push(number.e164);
              }
            case 12:
              _context.n = 9;
              break;
            case 13:
              _context.n = 15;
              break;
            case 14:
              _context.p = 14;
              _t2 = _context.v;
              _iterator.e(_t2);
            case 15:
              _context.p = 15;
              _iterator.f();
              return _context.f(15);
            case 16:
              result.result = true;
            case 17:
              return _context.a(2, result);
          }
        }, _callee, this, [[8, 14, 15, 16]]);
      }));
      function _validateToNumbers(_x) {
        return _validateToNumbers2.apply(this, arguments);
      }
      return _validateToNumbers;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref) {
        var _this6 = this;
        var fromNumber, toNumbers, text, replyOnMessageId, _ref$multipart, multipart, _ref$attachments, attachments, _ref$grouped, grouped, eventId, validateToNumberResult, extensionNumbers, recipientPhoneNumbers, hasAttachments, isBulkMessage, isPager, responses, chunks, total, shouldSleep, _iterator2, _step2, chunk, pagerResponse, _iterator3, _step3, _chunk, toNumberSections, _iterator4, _step4, _toNumbers, smsResponse, smsBody, _t3, _t4, _t5, _t6;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              fromNumber = _ref.fromNumber, toNumbers = _ref.toNumbers, text = _ref.text, replyOnMessageId = _ref.replyOnMessageId, _ref$multipart = _ref.multipart, multipart = _ref$multipart === void 0 ? false : _ref$multipart, _ref$attachments = _ref.attachments, attachments = _ref$attachments === void 0 ? [] : _ref$attachments, _ref$grouped = _ref.grouped, grouped = _ref$grouped === void 0 ? false : _ref$grouped;
              _context2.n = 1;
              return this.uniqueManager.dismissAll();
            case 1:
              eventId = (0, _uuid.v4)();
              if (this.validateContent(text, attachments, multipart)) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, null);
            case 2:
              _context2.p = 2;
              _context2.n = 3;
              return this._validateToNumbers(toNumbers);
            case 3:
              validateToNumberResult = _context2.v;
              if (validateToNumberResult.result) {
                _context2.n = 4;
                break;
              }
              return _context2.a(2, null);
            case 4:
              extensionNumbers = validateToNumberResult.extNumbers;
              recipientPhoneNumbers = validateToNumberResult.noExtNumbers;
              hasAttachments = attachments.length > 0;
              if (!(extensionNumbers.length > 0 && hasAttachments)) {
                _context2.n = 5;
                break;
              }
              this.uniqueManager.unique(function () {
                return _this6._toast.warning({
                  message: (0, _i18n.t)('noAttachmentToExtension'),
                  ttl: 3000
                });
              });
              this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
              return _context2.a(2, null);
            case 5:
              if (!(recipientPhoneNumbers.length > 0 && !this._validateSenderNumber(fromNumber))) {
                _context2.n = 6;
                break;
              }
              this.logger.error('Sender number is invalid', fromNumber);
              this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
              return _context2.a(2, null);
            case 6:
              this._eventEmitter.emit(_messageSenderEvents.messageSenderEvents.send, {
                eventId: eventId,
                fromNumber: fromNumber,
                toNumbers: toNumbers,
                text: text,
                replyOnMessageId: replyOnMessageId,
                multipart: multipart
              });
              isBulkMessage = Array.isArray(toNumbers) && toNumbers.length > 1;
              isPager = extensionNumbers.length > 0;
              this._smsAttempt(isBulkMessage, isPager);
              responses = [];
              chunks = multipart ? (0, _chunkMessage["default"])(text, MESSAGE_MAX_LENGTH) : [text];
              total = (recipientPhoneNumbers.length + 1) * chunks.length;
              shouldSleep = total > SENDING_THRESHOLD;
              if (!(extensionNumbers.length > 0)) {
                _context2.n = 15;
                break;
              }
              _iterator2 = _createForOfIteratorHelper(chunks);
              _context2.p = 7;
              _iterator2.s();
            case 8:
              if ((_step2 = _iterator2.n()).done) {
                _context2.n = 12;
                break;
              }
              chunk = _step2.value;
              if (!shouldSleep) {
                _context2.n = 9;
                break;
              }
              _context2.n = 9;
              return (0, _utils.sleep)(2000);
            case 9:
              _context2.n = 10;
              return this._sendPager({
                toNumbers: extensionNumbers,
                text: chunk,
                replyOnMessageId: replyOnMessageId
              });
            case 10:
              pagerResponse = _context2.v;
              responses.push(pagerResponse);
            case 11:
              _context2.n = 8;
              break;
            case 12:
              _context2.n = 14;
              break;
            case 13:
              _context2.p = 13;
              _t3 = _context2.v;
              _iterator2.e(_t3);
            case 14:
              _context2.p = 14;
              _iterator2.f();
              return _context2.f(14);
            case 15:
              if (!(recipientPhoneNumbers.length > 0)) {
                _context2.n = 33;
                break;
              }
              _iterator3 = _createForOfIteratorHelper(chunks);
              _context2.p = 16;
              _iterator3.s();
            case 17:
              if ((_step3 = _iterator3.n()).done) {
                _context2.n = 30;
                break;
              }
              _chunk = _step3.value;
              toNumberSections = grouped ? [recipientPhoneNumbers] // send all at once:
              : recipientPhoneNumbers.map(function (number) {
                return [number];
              }); // send one by one
              _iterator4 = _createForOfIteratorHelper(toNumberSections);
              _context2.p = 18;
              _iterator4.s();
            case 19:
              if ((_step4 = _iterator4.n()).done) {
                _context2.n = 26;
                break;
              }
              _toNumbers = _step4.value;
              smsResponse = void 0;
              smsBody = {
                fromNumber: fromNumber,
                toNumbers: _toNumbers,
                text: _chunk,
                attachments: attachments
              };
              if (!shouldSleep) {
                _context2.n = 20;
                break;
              }
              _context2.n = 20;
              return (0, _utils.sleep)(2000);
            case 20:
              if (!hasAttachments) {
                _context2.n = 22;
                break;
              }
              _context2.n = 21;
              return this._sendMMS(smsBody);
            case 21:
              smsResponse = _context2.v;
              _context2.n = 24;
              break;
            case 22:
              _context2.n = 23;
              return this._sendSMS(smsBody);
            case 23:
              smsResponse = _context2.v;
            case 24:
              (0, _services.trackEvent)('Int_Text_textSent', {
                textSentType: replyOnMessageId ? 'Reply' : 'Create',
                textType: hasAttachments ? 'MMS' : 'SMS',
                isGroupText: _toNumbers.length > 1,
                isPager: false
              });
              responses.push(smsResponse);
            case 25:
              _context2.n = 19;
              break;
            case 26:
              _context2.n = 28;
              break;
            case 27:
              _context2.p = 27;
              _t4 = _context2.v;
              _iterator4.e(_t4);
            case 28:
              _context2.p = 28;
              _iterator4.f();
              return _context2.f(28);
            case 29:
              _context2.n = 17;
              break;
            case 30:
              _context2.n = 32;
              break;
            case 31:
              _context2.p = 31;
              _t5 = _context2.v;
              _iterator3.e(_t5);
            case 32:
              _context2.p = 32;
              _iterator3.f();
              return _context2.f(32);
            case 33:
              this._smsSentOver();
              return _context2.a(2, responses);
            case 34:
              _context2.p = 34;
              _t6 = _context2.v;
              this._eventEmitter.emit(_messageSenderEvents.messageSenderEvents.sendError, {
                eventId: eventId,
                fromNumber: fromNumber,
                toNumbers: toNumbers,
                text: text,
                replyOnMessageId: replyOnMessageId,
                multipart: multipart
              });
              this._smsSentError();
              _context2.n = 35;
              return this._onSendError(_t6);
            case 35:
              throw _t6;
            case 36:
              return _context2.a(2);
          }
        }, _callee2, this, [[18, 27, 28, 29], [16, 31, 32, 33], [7, 13, 14, 15], [2, 34]]);
      }));
      function send(_x2) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "_sendSMS",
    value: function () {
      var _sendSMS2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref2) {
        var fromNumber, toNumbers, text, response;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              fromNumber = _ref2.fromNumber, toNumbers = _ref2.toNumbers, text = _ref2.text;
              _context3.n = 1;
              return this._client.account().extension().sms().post({
                from: {
                  phoneNumber: fromNumber
                },
                to: toNumbers.map(function (number) {
                  return {
                    phoneNumber: number
                  };
                }),
                text: text
              });
            case 1:
              response = _context3.v;
              return _context3.a(2, response);
          }
        }, _callee3, this);
      }));
      function _sendSMS(_x3) {
        return _sendSMS2.apply(this, arguments);
      }
      return _sendSMS;
    }()
  }, {
    key: "_sendMMS",
    value: function () {
      var _sendMMS2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref3) {
        var fromNumber, toNumbers, text, _ref3$attachments, attachments, body, attachment, responseData;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              fromNumber = _ref3.fromNumber, toNumbers = _ref3.toNumbers, text = _ref3.text, _ref3$attachments = _ref3.attachments, attachments = _ref3$attachments === void 0 ? [] : _ref3$attachments;
              body = {
                from: {
                  phoneNumber: fromNumber
                },
                to: toNumbers.map(function (number) {
                  return {
                    phoneNumber: number
                  };
                }),
                text: text
              }; // in some device, the file instance is broken, so we use base64 first
              attachment = attachments.map(function (attachment) {
                return attachment.base64Url ? (0, _utils.base64ToFile)(attachment.base64Url, attachment.name) : attachment.file;
              });
              _context4.n = 1;
              return this._client.multipart.post('/restapi/v1.0/account/~/extension/~/mms', {
                fields: {
                  json: body
                },
                files: {
                  attachment: attachment
                }
              });
            case 1:
              responseData = _context4.v;
              return _context4.a(2, responseData);
          }
        }, _callee4, this);
      }));
      function _sendMMS(_x4) {
        return _sendMMS2.apply(this, arguments);
      }
      return _sendMMS;
    }()
  }, {
    key: "_sendPager",
    value: function () {
      var _sendPager2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref4) {
        var toNumbers, text, replyOnMessageId, from, toUsers, params, response;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              toNumbers = _ref4.toNumbers, text = _ref4.text, replyOnMessageId = _ref4.replyOnMessageId;
              from = {
                extensionNumber: this._extensionInfo.extensionNumber
              };
              toUsers = toNumbers.map(function (number) {
                return {
                  extensionNumber: number
                };
              });
              params = {
                from: from,
                to: toUsers,
                text: text
              };
              if (replyOnMessageId) {
                params.replyOn = replyOnMessageId;
              }
              _context5.n = 1;
              return this._client.account().extension().companyPager().post(params);
            case 1:
              response = _context5.v;
              (0, _services.trackEvent)('Int_Text_textSent', {
                textSentType: replyOnMessageId ? 'Reply' : 'Create',
                textType: 'SMS',
                isGroupText: toNumbers.length > 1,
                isPager: true
              });
              return _context5.a(2, response);
          }
        }, _callee5, this);
      }));
      function _sendPager(_x5) {
        return _sendPager2.apply(this, arguments);
      }
      return _sendPager;
    }()
  }, {
    key: "_onSendError",
    value: function () {
      var _onSendError2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(error) {
        var _this7 = this;
        var errResp, errorJson, getToast, toast;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              errResp = error.response;
              if (!errResp) {
                _context7.n = 2;
                break;
              }
              _context7.n = 1;
              return errResp.clone().json();
            case 1:
              errorJson = _context7.v;
            case 2:
              getToast = /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
                  var _t7;
                  return _regenerator().w(function (_context6) {
                    while (1) switch (_context6.n) {
                      case 0:
                        if (!(errResp && !errResp.ok && errorJson && (errorJson.errorCode === 'InvalidParameter' || errorJson.errorCode === 'InternationalProhibited' || errorJson.errorCode === 'CMN-408'))) {
                          _context6.n = 1;
                          break;
                        }
                        errorJson.errors.forEach(function (err) {
                          if ((err.errorCode === 'CMN-101' || err.errorCode === 'CMN-102' || err.errorCode === 'CMN-414') && err.parameterName.startsWith('to')) {
                            // 101 : "Parameter [to.extensionNumber] value is invalid"
                            // 101 : "Parameter [to.phoneNumber] value is invalid"
                            // 102 : "Resource for parameter [to] is not found"
                            return _this7._toast.warning({
                              message: (0, _i18n.t)('recipientNumberInvalids'),
                              ttl: 0
                            });
                          }
                          if (err.errorCode === 'MSG-246') {
                            // MSG-246 : "Sending SMS from/to extension numbers is not available"
                            return _this7._toast.warning({
                              message: (0, _i18n.t)('notSmsToExtension'),
                              ttl: 0
                            });
                          }
                          if (err.errorCode === 'MSG-247') {
                            // MSG-247 : "Sending SMS to short numbers is not available"
                            return _this7._toast.warning({
                              message: (0, _i18n.t)('shortNumbersNotAvailable'),
                              ttl: 0
                            });
                          }
                          if (err.errorCode === 'MSG-240') {
                            // MSG-240 : "International SMS is not supported"
                            return _this7._toast.warning({
                              message: (0, _i18n.t)('internationalSMSNotSupported'),
                              ttl: 0
                            });
                          }
                          if (err.errorCode === 'CMN-408') {
                            // MSG-240 : "In order to call this API endpoint, user needs to have [InternalSMS] permission for requested resource."
                            return _this7._toast.warning({
                              message: (0, _i18n.t)('noInternalSMSPermission', {
                                brand: _this7._brand.name
                              }),
                              ttl: 0
                            });
                          }
                          if (err.errorCode === 'MSG-383') {
                            // International MMS feature is not available
                            // use common error temporarily
                            return _this7._toast.warning({
                              message: (0, _i18n.t)('sendError'),
                              ttl: 0
                            });
                          }
                          return;
                        });
                        return _context6.a(2);
                      case 1:
                        _t7 = _this7._availabilityMonitor;
                        if (!_t7) {
                          _context6.n = 3;
                          break;
                        }
                        _context6.n = 2;
                        return _this7._availabilityMonitor.checkIfHAError(error);
                      case 2:
                        _t7 = _context6.v;
                      case 3:
                        if (!_t7) {
                          _context6.n = 4;
                          break;
                        }
                        return _context6.a(2);
                      case 4:
                        return _context6.a(2, _this7._toast.warning({
                          message: (0, _i18n.t)('sendError'),
                          ttl: 0
                        }));
                    }
                  }, _callee6);
                }));
                return function getToast() {
                  return _ref5.apply(this, arguments);
                };
              }();
              _context7.n = 3;
              return getToast();
            case 3:
              toast = _context7.v;
              if (toast) {
                this.uniqueManager.unique(function () {
                  return toast;
                });
              }
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _onSendError(_x6) {
        return _onSendError2.apply(this, arguments);
      }
      return _onSendError;
    }()
  }, {
    key: "on",
    value: function on(event, handler) {
      this._eventEmitter.on(event, handler);
    }
  }, {
    key: "idle",
    get: function get() {
      return this.sendStatus === _messageSenderStatus.messageSenderStatus.idle;
    }
  }, {
    key: "senderNumbersList",
    get: function get() {
      return this._extensionPhoneNumber.smsSenderNumbers;
    }
  }, {
    key: "senderNumberMap",
    get: function get() {
      var _this8 = this;
      return this.senderNumbersList.reduce(function (acc, number) {
        var key = _this8._numberFormatter.formatNumber(number.phoneNumber);
        acc.set(key, number);
        return acc;
      }, new Map());
    }
  }, {
    key: "events",
    get: function get() {
      return _messageSenderEvents.messageSenderEvents;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "sendStatus", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _messageSenderStatus.messageSenderStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setSendStatus", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "setSendStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsAttempt", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsAttempt"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsSentOver", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsSentOver"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsSentError", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsSentError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_validateToNumbers", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateToNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "send", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendSMS", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendMMS", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendMMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendPager", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendPager"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "senderNumberMap", [_nextCore.computed, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "senderNumberMap"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=MessageSender.js.map
