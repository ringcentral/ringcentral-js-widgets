"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
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
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageSender = exports.MULTIPART_MESSAGE_MAX_LENGTH = exports.MESSAGE_MAX_LENGTH = exports.ATTACHMENT_SIZE_LIMITATION = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _events = require("events");
var _ramda = require("ramda");
var _uuid = require("uuid");
var _trackEvents = require("../../enums/trackEvents");
var _chunkMessage = _interopRequireDefault(require("../../lib/chunkMessage"));
var _di = require("../../lib/di");
var _isBlank = require("../../lib/isBlank");
var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));
var _messageSenderEvents = require("./messageSenderEvents");
var _messageSenderMessages = require("./messageSenderMessages");
var _messageSenderStatus = require("./messageSenderStatus");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
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

/**
 * @class
 * @description Message sender and validator module
 */
var MessageSender = exports.MessageSender = (_dec = (0, _di.Module)({
  name: 'MessageSender',
  deps: ['Alert', 'Client', 'ExtensionInfo', 'ExtensionPhoneNumber', 'NumberValidate', 'AccountInfo', 'AppFeatures', {
    dep: 'CompanyContacts',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'MessageSenderOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (_, isGroupMessage, isPager) {
  return [_trackEvents.trackEvents.smsAttempt, {
    isGroupMessage: isGroupMessage,
    isPager: isPager
  }];
}), _dec3 = (0, _core.track)(_trackEvents.trackEvents.smsSentSuccessfully), _dec4 = (0, _core.track)(_trackEvents.trackEvents.smsSentFailed), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function MessageSender(deps) {
    var _this;
    _classCallCheck(this, MessageSender);
    _this = _callSuper(this, MessageSender, [{
      deps: deps
    }]);
    _this._eventEmitter = new _events.EventEmitter();
    _initializerDefineProperty(_this, "sendStatus", _descriptor, _this);
    return _this;
  }
  _inherits(MessageSender, _RcModuleV);
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
    key: "_alertWarning",
    value: function _alertWarning(message) {
      if (message) {
        this._deps.alert.warning({
          message: message,
          ttl: 0
        });
        return true;
      }
      return false;
    }
  }, {
    key: "_validateContent",
    value: function _validateContent(text, attachments, multipart) {
      if ((0, _isBlank.isBlank)(text) && attachments.length === 0) {
        this._alertWarning(_messageSenderMessages.messageSenderMessages.textEmpty);
        return false;
      }
      if (!multipart && text && text.length > MESSAGE_MAX_LENGTH) {
        this._alertWarning(_messageSenderMessages.messageSenderMessages.textTooLong);
        return false;
      }
      if (multipart && text && text.length > MULTIPART_MESSAGE_MAX_LENGTH) {
        this._alertWarning(_messageSenderMessages.messageSenderMessages.multipartTextTooLong);
        return false;
      }
      return true;
    }
  }, {
    key: "_validateToNumbersIsEmpty",
    value: function _validateToNumbersIsEmpty(toNumbers) {
      if (toNumbers.length === 0) {
        this._alertWarning(_messageSenderMessages.messageSenderMessages.recipientsEmpty);
        return true;
      }
      return false;
    }
  }, {
    key: "_validateSenderNumber",
    value: function _validateSenderNumber(senderNumber) {
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
        this._alertWarning(_messageSenderMessages.messageSenderMessages.senderNumberInvalid);
      }
      return validateResult;
    }
  }, {
    key: "_alertInvalidRecipientErrors",
    value: function _alertInvalidRecipientErrors(errors) {
      var _this2 = this;
      errors.forEach(function (error) {
        var message = _messageSenderMessages.messageSenderMessages[error.type];
        if (!_this2._alertWarning(message)) {
          _this2._alertWarning(_messageSenderMessages.messageSenderMessages.recipientNumberInvalids);
        }
      });
    }
  }, {
    key: "_validateToNumbers",
    value: function () {
      var _validateToNumbers2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(toNumbers) {
        var _this$_deps$appFeatur;
        var result, recipientNumbers, isEDPEnabled, numberValidateResult, parsedNumbers, _iterator, _step, number, _this$_deps$companyCo, _t, _t2;
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
              isEDPEnabled = (_this$_deps$appFeatur = this._deps.appFeatures) === null || _this$_deps$appFeatur === void 0 ? void 0 : _this$_deps$appFeatur.isEDPEnabled;
              if (!isEDPEnabled) {
                _context.n = 2;
                break;
              }
              _t = this._deps.numberValidate.validate(recipientNumbers);
              _context.n = 4;
              break;
            case 2:
              _context.n = 3;
              return this._deps.numberValidate.validateNumbers(recipientNumbers);
            case 3:
              _t = _context.v;
            case 4:
              numberValidateResult = _t;
              if (numberValidateResult.result) {
                _context.n = 5;
                break;
              }
              this._alertInvalidRecipientErrors(numberValidateResult.errors);
              this.setSendStatus(_messageSenderStatus.messageSenderStatus.idle);
              return _context.a(2, result);
            case 5:
              if (!isEDPEnabled) {
                _context.n = 7;
                break;
              }
              _context.n = 6;
              return this._deps.numberValidate.parseNumbers(recipientNumbers);
            case 6:
              parsedNumbers = _context.v;
              if (parsedNumbers) {
                result.result = true;
                parsedNumbers.forEach(function (item) {
                  if (item.isAnExtension) {
                    var _result$extNumbers, _item$availableExtens;
                    (_result$extNumbers = result.extNumbers) === null || _result$extNumbers === void 0 ? void 0 : _result$extNumbers.push((_item$availableExtens = item.availableExtension) !== null && _item$availableExtens !== void 0 ? _item$availableExtens : item.parsedNumber);
                  } else {
                    var _result$noExtNumbers;
                    (_result$noExtNumbers = result.noExtNumbers) === null || _result$noExtNumbers === void 0 ? void 0 : _result$noExtNumbers.push(item.parsedNumber);
                  }
                });
              }
              _context.n = 17;
              break;
            case 7:
              // @ts-expect-error TS(2339): Property 'numbers' does not exist on type 'Validat... Remove this comment to see the full error message
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
              if (!(!((_this$_deps$companyCo = this._deps.companyContacts) === null || _this$_deps$companyCo === void 0 ? void 0 : _this$_deps$companyCo.enableCompanyPublicApi) && !this._deps.numberValidate.isCompanyExtension(number.e164, number.subAddress))) {
                _context.n = 10;
                break;
              }
              this._alertWarning(_messageSenderMessages.messageSenderMessages.notAnExtension);
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
        var fromNumber, toNumbers, text, replyOnMessageId, _ref$multipart, multipart, _ref$attachments, attachments, eventId, validateToNumberResult, extensionNumbers, phoneNumbers, isBulkMessage, isPager, responses, chunks, total, shouldSleep, _iterator2, _step2, chunk, pagerResponse, _iterator3, _step3, phoneNumber, _iterator4, _step4, _chunk, smsResponse, smsBody, _t3, _t4, _t5, _t6;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              fromNumber = _ref.fromNumber, toNumbers = _ref.toNumbers, text = _ref.text, replyOnMessageId = _ref.replyOnMessageId, _ref$multipart = _ref.multipart, multipart = _ref$multipart === void 0 ? false : _ref$multipart, _ref$attachments = _ref.attachments, attachments = _ref$attachments === void 0 ? [] : _ref$attachments;
              eventId = (0, _uuid.v4)();
              if (this._validateContent(text, attachments, multipart)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, null);
            case 1:
              _context2.p = 1;
              _context2.n = 2;
              return this._validateToNumbers(toNumbers);
            case 2:
              validateToNumberResult = _context2.v;
              if (validateToNumberResult.result) {
                _context2.n = 3;
                break;
              }
              return _context2.a(2, null);
            case 3:
              extensionNumbers = validateToNumberResult.extNumbers;
              phoneNumbers = validateToNumberResult.noExtNumbers;
              if (!(extensionNumbers.length > 0 && attachments.length > 0)) {
                _context2.n = 4;
                break;
              }
              this._alertWarning(_messageSenderMessages.messageSenderMessages.noAttachmentToExtension);
              this._smsSentError();
              return _context2.a(2, null);
            case 4:
              if (!(phoneNumbers.length > 0)) {
                _context2.n = 5;
                break;
              }
              if (this._validateSenderNumber(fromNumber)) {
                _context2.n = 5;
                break;
              }
              return _context2.a(2, null);
            case 5:
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
              total = (phoneNumbers.length + 1) * chunks.length;
              shouldSleep = total > SENDING_THRESHOLD;
              if (!(extensionNumbers.length > 0)) {
                _context2.n = 14;
                break;
              }
              _iterator2 = _createForOfIteratorHelper(chunks);
              _context2.p = 6;
              _iterator2.s();
            case 7:
              if ((_step2 = _iterator2.n()).done) {
                _context2.n = 11;
                break;
              }
              chunk = _step2.value;
              if (!shouldSleep) {
                _context2.n = 8;
                break;
              }
              _context2.n = 8;
              return (0, _utils.sleep)(2000);
            case 8:
              _context2.n = 9;
              return this._sendPager({
                toNumbers: extensionNumbers,
                text: chunk,
                // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
                replyOnMessageId: replyOnMessageId
              });
            case 9:
              pagerResponse = _context2.v;
              responses.push(pagerResponse);
            case 10:
              _context2.n = 7;
              break;
            case 11:
              _context2.n = 13;
              break;
            case 12:
              _context2.p = 12;
              _t3 = _context2.v;
              _iterator2.e(_t3);
            case 13:
              _context2.p = 13;
              _iterator2.f();
              return _context2.f(13);
            case 14:
              if (!(phoneNumbers.length > 0)) {
                _context2.n = 32;
                break;
              }
              _iterator3 = _createForOfIteratorHelper(phoneNumbers);
              _context2.p = 15;
              _iterator3.s();
            case 16:
              if ((_step3 = _iterator3.n()).done) {
                _context2.n = 29;
                break;
              }
              phoneNumber = _step3.value;
              _iterator4 = _createForOfIteratorHelper(chunks);
              _context2.p = 17;
              _iterator4.s();
            case 18:
              if ((_step4 = _iterator4.n()).done) {
                _context2.n = 25;
                break;
              }
              _chunk = _step4.value;
              if (!shouldSleep) {
                _context2.n = 19;
                break;
              }
              _context2.n = 19;
              return (0, _utils.sleep)(2000);
            case 19:
              smsResponse = void 0;
              smsBody = {
                fromNumber: fromNumber,
                toNumber: phoneNumber,
                text: _chunk,
                attachments: attachments
              };
              if (!(attachments.length > 0)) {
                _context2.n = 21;
                break;
              }
              _context2.n = 20;
              return this._sendMMS(smsBody);
            case 20:
              smsResponse = _context2.v;
              _context2.n = 23;
              break;
            case 21:
              _context2.n = 22;
              return this._sendSMS(smsBody);
            case 22:
              smsResponse = _context2.v;
            case 23:
              responses.push(smsResponse);
            case 24:
              _context2.n = 18;
              break;
            case 25:
              _context2.n = 27;
              break;
            case 26:
              _context2.p = 26;
              _t4 = _context2.v;
              _iterator4.e(_t4);
            case 27:
              _context2.p = 27;
              _iterator4.f();
              return _context2.f(27);
            case 28:
              _context2.n = 16;
              break;
            case 29:
              _context2.n = 31;
              break;
            case 30:
              _context2.p = 30;
              _t5 = _context2.v;
              _iterator3.e(_t5);
            case 31:
              _context2.p = 31;
              _iterator3.f();
              return _context2.f(31);
            case 32:
              this._smsSentOver();
              return _context2.a(2, responses);
            case 33:
              _context2.p = 33;
              _t6 = _context2.v;
              console.debug('sendComposeText e ', _t6);
              this._eventEmitter.emit(_messageSenderEvents.messageSenderEvents.sendError, {
                eventId: eventId,
                fromNumber: fromNumber,
                toNumbers: toNumbers,
                text: text,
                replyOnMessageId: replyOnMessageId,
                multipart: multipart
              });
              this._smsSentError();
              _context2.n = 34;
              return this._onSendError(_t6);
            case 34:
              throw _t6;
            case 35:
              return _context2.a(2);
          }
        }, _callee2, this, [[17, 26, 27, 28], [15, 30, 31, 32], [6, 12, 13, 14], [1, 33]]);
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
        var fromNumber, toNumber, text, toUsers, response;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              fromNumber = _ref2.fromNumber, toNumber = _ref2.toNumber, text = _ref2.text;
              toUsers = [{
                phoneNumber: toNumber
              }];
              _context3.n = 1;
              return this._deps.client.account().extension().sms().post({
                from: {
                  phoneNumber: fromNumber
                },
                to: toUsers,
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
        var fromNumber, toNumber, text, _ref3$attachments, attachments, body, attachment, responseData;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              fromNumber = _ref3.fromNumber, toNumber = _ref3.toNumber, text = _ref3.text, _ref3$attachments = _ref3.attachments, attachments = _ref3$attachments === void 0 ? [] : _ref3$attachments;
              body = {
                from: {
                  phoneNumber: fromNumber
                },
                to: [{
                  phoneNumber: toNumber
                }],
                text: text
              }; // in some device, the file instance is broken, so we use base64 first
              attachment = attachments.map(function (attachment) {
                return attachment.base64Url ? (0, _utils.base64ToFile)(attachment.base64Url, attachment.name) : attachment.file;
              });
              _context4.n = 1;
              return this._deps.client.multipart.post('/restapi/v1.0/account/~/extension/~/mms', {
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
                extensionNumber: this._deps.extensionInfo.extensionNumber
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
              return this._deps.client.account().extension().companyPager().post(params);
            case 1:
              response = _context5.v;
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
      var _onSendError2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(error) {
        var _this3 = this;
        var errResp, errorJson, _t7;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              errResp = error.response;
              if (!errResp) {
                _context6.n = 2;
                break;
              }
              _context6.n = 1;
              return errResp.clone().json();
            case 1:
              errorJson = _context6.v;
            case 2:
              if (!(errResp && !errResp.ok &&
              // @ts-expect-error TS(2454): Variable 'errorJson' is used before being assigned... Remove this comment to see the full error message
              errorJson && (errorJson.errorCode === 'InvalidParameter' || errorJson.errorCode === 'InternationalProhibited' || errorJson.errorCode === 'CMN-408'))) {
                _context6.n = 3;
                break;
              }
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              errorJson.errors.map(function (err) {
                if ((err.errorCode === 'CMN-101' || err.errorCode === 'CMN-102' || err.errorCode === 'CMN-414') && err.parameterName.startsWith('to')) {
                  // 101 : "Parameter [to.extensionNumber] value is invalid"
                  // 101 : "Parameter [to.phoneNumber] value is invalid"
                  // 102 : "Resource for parameter [to] is not found"
                  _this3._alertWarning(_messageSenderMessages.messageSenderMessages.recipientNumberInvalids);
                  return null;
                }
                if (err.errorCode === 'MSG-246') {
                  // MSG-246 : "Sending SMS from/to extension numbers is not available"
                  _this3._alertWarning(_messageSenderMessages.messageSenderMessages.notSmsToExtension);
                }
                if (err.errorCode === 'MSG-247') {
                  // MSG-247 : "Sending SMS to short numbers is not available"
                  _this3._alertWarning(_messageSenderMessages.messageSenderMessages.shortNumbersNotAvailable);
                }
                if (err.errorCode === 'MSG-240') {
                  // MSG-240 : "International SMS is not supported"
                  _this3._alertWarning(_messageSenderMessages.messageSenderMessages.internationalSMSNotSupported);
                }
                if (err.errorCode === 'CMN-408') {
                  // MSG-240 : "In order to call this API endpoint, user needs to have [InternalSMS] permission for requested resource."
                  _this3._alertWarning(_messageSenderMessages.messageSenderMessages.noInternalSMSPermission);
                }
                if (err.errorCode === 'MSG-383') {
                  // MSG-240: International MMS feature is not available
                  // use common error temporarily
                  _this3._alertWarning(_messageSenderMessages.messageSenderMessages.sendError);
                }
                return null;
              });
              return _context6.a(2);
            case 3:
              _t7 = this._deps.availabilityMonitor;
              if (!_t7) {
                _context6.n = 5;
                break;
              }
              _context6.n = 4;
              return this._deps.availabilityMonitor.checkIfHAError(error);
            case 4:
              _t7 = _context6.v;
            case 5:
              if (!_t7) {
                _context6.n = 6;
                break;
              }
              return _context6.a(2);
            case 6:
              this._alertWarning(_messageSenderMessages.messageSenderMessages.sendError);
            case 7:
              return _context6.a(2);
          }
        }, _callee6, this);
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
      // @ts-expect-error TS(2322): Type 'UserPhoneNumberInfo[]' is not assignable to ... Remove this comment to see the full error message
      return this._deps.extensionPhoneNumber.smsSenderNumbers;
    }
  }, {
    key: "events",
    get: function get() {
      return _messageSenderEvents.messageSenderEvents;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "sendStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _messageSenderStatus.messageSenderStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setSendStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setSendStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsAttempt", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsAttempt"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsSentOver", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsSentOver"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_smsSentError", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "_smsSentError"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_validateToNumbers", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_validateToNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "send", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendSMS", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_sendPager", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_sendPager"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=MessageSender.js.map
