"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeText = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.timers.js");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _isBlank = require("../../lib/isBlank");
var _proxify = require("../../lib/proxy/proxify");
var _MessageSender = require("../MessageSender");
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
/**
 * @class
 * @description Compose text managing module
 */
var ComposeText = exports.ComposeText = (_dec = (0, _di.Module)({
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
  function ComposeText(deps) {
    var _this;
    _classCallCheck(this, ComposeText);
    _this = _callSuper(this, ComposeText, [{
      deps: deps,
      enableCache: true,
      storageKey: 'composeText'
    }]);
    _this._lastContactSearchResult = null;
    _this.smsVerify = void 0;
    _initializerDefineProperty(_this, "senderNumber", _descriptor, _this);
    _initializerDefineProperty(_this, "typingToNumber", _descriptor2, _this);
    _initializerDefineProperty(_this, "toNumbers", _descriptor3, _this);
    _initializerDefineProperty(_this, "messageText", _descriptor4, _this);
    _initializerDefineProperty(_this, "toNumberEntity", _descriptor5, _this);
    _initializerDefineProperty(_this, "attachments", _descriptor6, _this);
    return _this;
  }
  _inherits(ComposeText, _RcModuleV);
  return _createClass(ComposeText, [{
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
      return !!(_superPropGet(ComposeText, "_shouldInit", this, 3)([]) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_superPropGet(ComposeText, "_shouldReset", this, 3)([]) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this._deps.auth.isFreshLogin) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return this.clean();
            case 1:
              this._initSenderNumber();
            case 2:
              return _context.a(2);
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
      var _onReset = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this.clean();
            case 1:
              return _context2.a(2);
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
    key: "_alertDanger",
    value: function _alertDanger(message) {
      this._deps.alert.danger({
        message: message,
        allowDuplicates: false,
        ttl: 5000
      });
    }
  }, {
    key: "_validatePhoneNumber",
    value: function () {
      var _validatePhoneNumber2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(phoneNumber) {
        var _this$_deps$appFeatur;
        var isEDPEnabled, validateResult, error;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this._validateIsOnlyPager(phoneNumber);
            case 1:
              if (!_context3.v) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2, null);
            case 2:
              isEDPEnabled = (_this$_deps$appFeatur = this._deps.appFeatures) === null || _this$_deps$appFeatur === void 0 ? void 0 : _this$_deps$appFeatur.isEDPEnabled;
              validateResult = isEDPEnabled ? this._deps.numberValidate.validate([phoneNumber]) : this._deps.numberValidate.validateFormat([phoneNumber]);
              if (validateResult.result) {
                _context3.n = 4;
                break;
              }
              error = validateResult.errors[0];
              if (!(error && this._alertWarning(_MessageSender.messageSenderMessages[error.type]))) {
                _context3.n = 3;
                break;
              }
              return _context3.a(2, false);
            case 3:
              this._alertWarning(_MessageSender.messageSenderMessages.recipientNumberInvalids);
              return _context3.a(2, false);
            case 4:
              return _context3.a(2, true);
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
      var _validateIsOnlyPager2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(phoneNumber) {
        var validate, _ref, _ref2, isAnExtension, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              validate = this._deps.numberValidate.validate([phoneNumber]);
              if (validate.result) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2, false);
            case 1:
              _context4.n = 2;
              return this._deps.numberValidate.parseNumbers([phoneNumber]);
            case 2:
              _t = _context4.v;
              if (_t) {
                _context4.n = 3;
                break;
              }
              _t = [{}];
            case 3:
              _ref = _t;
              _ref2 = _slicedToArray(_ref, 1);
              isAnExtension = _ref2[0].isAnExtension;
              if (!(phoneNumber.length >= 7 && !isAnExtension && !this._deps.appFeatures.hasOutboundSMSPermission)) {
                _context4.n = 4;
                break;
              }
              this._alertWarning(_MessageSender.messageSenderMessages.noSMSPermission);
              return _context4.a(2, true);
            case 4:
              return _context4.a(2, false);
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
      var _validatePhoneNumber3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(phoneNumber) {
        var validateResult;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this._validateIsOnlyPager(phoneNumber);
            case 1:
              if (!_context5.v) {
                _context5.n = 2;
                break;
              }
              return _context5.a(2, false);
            case 2:
              validateResult = this._deps.numberValidate.validateFormat([phoneNumber]);
              return _context5.a(2, !!validateResult.result);
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
      var _send = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(text) {
        var _this3 = this;
        var attachments,
          toNumbers,
          typingToNumber,
          continueSend,
          timeoutID,
          responses,
          _args6 = arguments,
          _t2,
          _t3;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              attachments = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : [];
              toNumbers = this.toNumbers.map(function (number) {
                return number.phoneNumber;
              });
              typingToNumber = this.typingToNumber;
              if ((0, _isBlank.isBlank)(typingToNumber)) {
                _context6.n = 3;
                break;
              }
              _context6.n = 1;
              return this._validatePhoneNumber(typingToNumber);
            case 1:
              if (!_context6.v) {
                _context6.n = 2;
                break;
              }
              toNumbers.push(typingToNumber);
              _context6.n = 3;
              break;
            case 2:
              return _context6.a(2, null);
            case 3:
              if (!this.smsVerify) {
                _context6.n = 5;
                break;
              }
              _context6.n = 4;
              return this.smsVerify({
                toNumbers: this.toNumbers,
                typingToNumber: typingToNumber
              });
            case 4:
              _t2 = _context6.v;
              _context6.n = 6;
              break;
            case 5:
              _t2 = true;
            case 6:
              continueSend = _t2;
              if (continueSend) {
                _context6.n = 7;
                break;
              }
              return _context6.a(2, null);
            case 7:
              timeoutID = setTimeout(function () {
                var _this3$_deps$routerIn;
                if (((_this3$_deps$routerIn = _this3._deps.routerInteraction) === null || _this3$_deps$routerIn === void 0 ? void 0 : _this3$_deps$routerIn.currentPath) === '/composeText') {
                  _this3.alertMessageSending();
                }
                // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
                timeoutID = null;
              }, 10000);
              _context6.p = 8;
              _context6.n = 9;
              return this._deps.messageSender.send({
                fromNumber: this.senderNumber,
                toNumbers: toNumbers,
                text: text,
                attachments: attachments
              });
            case 9:
              responses = _context6.v;
              if (timeoutID) {
                clearTimeout(timeoutID);
                // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
                timeoutID = null;
              }
              this.dismissMessageSending();
              return _context6.a(2, responses);
            case 10:
              _context6.p = 10;
              _t3 = _context6.v;
              if (timeoutID) {
                clearTimeout(timeoutID);
                // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Timeout'.
                timeoutID = null;
              }
              throw _t3;
            case 11:
              return _context6.a(2);
          }
        }, _callee6, this, [[8, 10]]);
      }));
      function send(_x4) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "updateSenderNumber",
    value: function () {
      var _updateSenderNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(number) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this._setSenderNumber(number);
            case 1:
              return _context7.a(2);
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
      var _updateTypingToNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(number) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!(number.length > 30)) {
                _context8.n = 1;
                break;
              }
              this._alertWarning(_MessageSender.messageSenderMessages.recipientNumberInvalids);
              return _context8.a(2);
            case 1:
              this._setTypingToNumber(number);
            case 2:
              return _context8.a(2);
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
      var _onToNumberMatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(_ref3) {
        var entityId;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              entityId = _ref3.entityId;
              this._setToNumberEntity(entityId);
            case 1:
              return _context9.a(2);
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
      var _addToRecipients = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(recipient) {
        var shouldClean,
          isAdded,
          _args0 = arguments;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              shouldClean = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : true;
              _context0.n = 1;
              return this.addToNumber(recipient);
            case 1:
              isAdded = _context0.v;
              if (isAdded && shouldClean) {
                this._setTypingToNumber('');
              }
            case 2:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function addToRecipients(_x8) {
        return _addToRecipients.apply(this, arguments);
      }
      return addToRecipients;
    }()
  }, {
    key: "cleanTypingToNumber",
    value: function () {
      var _cleanTypingToNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              this._setTypingToNumber('');
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function cleanTypingToNumber() {
        return _cleanTypingToNumber.apply(this, arguments);
      }
      return cleanTypingToNumber;
    }()
  }, {
    key: "addToNumber",
    value: function () {
      var _addToNumber2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(number) {
        var isValid;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              if (!(0, _isBlank.isBlank)(number.phoneNumber)) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2, false);
            case 1:
              _context10.n = 2;
              return this._validatePhoneNumber(number.phoneNumber);
            case 2:
              isValid = _context10.v;
              if (isValid) {
                _context10.n = 3;
                break;
              }
              return _context10.a(2, false);
            case 3:
              this._addToNumber(number);
              return _context10.a(2, true);
          }
        }, _callee10, this);
      }));
      function addToNumber(_x9) {
        return _addToNumber2.apply(this, arguments);
      }
      return addToNumber;
    }()
  }, {
    key: "removeToNumber",
    value: function () {
      var _removeToNumber2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(number) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              this._removeToNumber(number);
            case 1:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function removeToNumber(_x0) {
        return _removeToNumber2.apply(this, arguments);
      }
      return removeToNumber;
    }()
  }, {
    key: "updateMessageText",
    value: function () {
      var _updateMessageText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(text) {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              if (!(text.length > 1000)) {
                _context12.n = 1;
                break;
              }
              this._alertWarning(_MessageSender.messageSenderMessages.textTooLong);
              return _context12.a(2);
            case 1:
              this._setMessageText(text);
            case 2:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function updateMessageText(_x1) {
        return _updateMessageText.apply(this, arguments);
      }
      return updateMessageText;
    }()
  }, {
    key: "checkAttachmentOverLimit",
    value: function checkAttachmentOverLimit(attachments) {
      if (this.attachments.length + attachments.length > 10) {
        this._alertDanger(_MessageSender.messageSenderMessages.attachmentCountLimitation);
        return false;
      }
      var size = [].concat(_toConsumableArray(attachments), _toConsumableArray(this.attachments)).reduce(function (prev, curr) {
        return prev + curr.size;
      }, 0);
      if (size > _MessageSender.ATTACHMENT_SIZE_LIMITATION) {
        this._alertDanger(_MessageSender.messageSenderMessages.attachmentSizeLimitation);
        return false;
      }
      return true;
    }
  }, {
    key: "addAttachments",
    value: function () {
      var _addAttachments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(attachments) {
        var isValid, _iterator, _step, attachment;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              isValid = this.checkAttachmentOverLimit(attachments);
              if (isValid) {
                _context13.n = 1;
                break;
              }
              return _context13.a(2);
            case 1:
              _iterator = _createForOfIteratorHelper(attachments);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  attachment = _step.value;
                  this.addAttachment(attachment);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            case 2:
              return _context13.a(2);
          }
        }, _callee13, this);
      }));
      function addAttachments(_x10) {
        return _addAttachments.apply(this, arguments);
      }
      return addAttachments;
    }()
  }, {
    key: "addAttachment",
    value: function () {
      var _addAttachment2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(attachment) {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              this._addAttachment(attachment);
            case 1:
              return _context14.a(2);
          }
        }, _callee14, this);
      }));
      function addAttachment(_x11) {
        return _addAttachment2.apply(this, arguments);
      }
      return addAttachment;
    }()
  }, {
    key: "removeAttachment",
    value: function () {
      var _removeAttachment2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(attachment) {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              this._removeAttachment(attachment);
            case 1:
              return _context15.a(2);
          }
        }, _callee15, this);
      }));
      function removeAttachment(_x12) {
        return _removeAttachment2.apply(this, arguments);
      }
      return removeAttachment;
    }()
  }, {
    key: "clean",
    value: function () {
      var _clean2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              this._clean();
            case 1:
              return _context16.a(2);
          }
        }, _callee16, this);
      }));
      function clean() {
        return _clean2.apply(this, arguments);
      }
      return clean;
    }()
  }, {
    key: "alertMessageSending",
    value: function () {
      var _alertMessageSending = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              this._deps.alert.warning({
                message: _MessageSender.messageSenderMessages.sending,
                ttl: 0
              });
            case 1:
              return _context17.a(2);
          }
        }, _callee17, this);
      }));
      function alertMessageSending() {
        return _alertMessageSending.apply(this, arguments);
      }
      return alertMessageSending;
    }()
  }, {
    key: "dismissMessageSending",
    value: function () {
      var _dismissMessageSending = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
        var alertMessage;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              alertMessage = this._deps.alert.messages.find(function (m) {
                return m.message === _MessageSender.messageSenderMessages.sending;
              });
              if (alertMessage && alertMessage.id) {
                this._deps.alert.dismiss(alertMessage.id);
              }
            case 1:
              return _context18.a(2);
          }
        }, _callee18, this);
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
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "senderNumber", [_core.storage, _core.state], {
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
}), _applyDecoratedDescriptor(_class2.prototype, "_setSenderNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSenderNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setTypingToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setToNumberEntity", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setToNumberEntity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeToNumber", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setMessageText", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addAttachment", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeAttachment", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clean", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "validatePhoneNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "validatePhoneNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "send", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSenderNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSenderNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTypingToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onToNumberMatch", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onToNumberMatch"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addToRecipients", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addToRecipients"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanTypingToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeToNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMessageText", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachments", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachments"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachment", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAttachment", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clean", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alertMessageSending", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "alertMessageSending"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dismissMessageSending", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "dismissMessageSending"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=ComposeText.js.map
