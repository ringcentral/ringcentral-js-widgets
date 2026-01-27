"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
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
exports.FaxSender = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _services4 = require("@ringcentral-integration/micro-phone/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _formData = _interopRequireDefault(require("form-data"));
var _MessageStore = require("../MessageStore");
var _FaxCover = require("./FaxCover");
var _constant = require("./constant");
var _i18n = require("./i18n");
var _isSupportedFaxFile = require("./utils/isSupportedFaxFile");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_MAX_RECIPIENTS = 10;
var FaxSender = exports.FaxSender = (_dec = (0, _nextCore.injectable)({
  name: 'FaxSender'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 12);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('FaxSenderOptions')(target, undefined, 13);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services.Client === "undefined" ? Object : _services.Client, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services3.Locale === "undefined" ? Object : _services3.Locale, typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services3.ToastManager === "undefined" ? Object : _services3.ToastManager, typeof _MessageStore.MessageStore === "undefined" ? Object : _MessageStore.MessageStore, typeof _services2.NumberValidate === "undefined" ? Object : _services2.NumberValidate, typeof _services.ExtensionPhoneNumber === "undefined" ? Object : _services.ExtensionPhoneNumber, typeof _services4.CallerId === "undefined" ? Object : _services4.CallerId, typeof _services.AvailabilityMonitor === "undefined" ? Object : _services.AvailabilityMonitor, typeof FaxSenderOptions === "undefined" ? Object : FaxSenderOptions]), _dec6 = Reflect.metadata("design:type", Array), _dec7 = Reflect.metadata("design:type", Array), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [Number]), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [String]), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [void 0]), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [void 0]), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [typeof Recipient === "undefined" ? Object : Recipient]), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [typeof Recipient === "undefined" ? Object : Recipient]), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", [typeof FileItem === "undefined" ? Object : FileItem]), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [String]), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [Number]), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", []), _dec26 = (0, _nextCore.delegate)('server'), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", []), _dec29 = (0, _nextCore.delegate)('server'), _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", [Array]), _dec32 = (0, _nextCore.delegate)('server'), _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", [typeof FileItem === "undefined" ? Object : FileItem]), _dec35 = (0, _nextCore.delegate)('server'), _dec36 = Reflect.metadata("design:type", Function), _dec37 = Reflect.metadata("design:paramtypes", [String]), _dec38 = (0, _nextCore.delegate)('server'), _dec39 = Reflect.metadata("design:type", Function), _dec40 = Reflect.metadata("design:paramtypes", [String]), _dec41 = (0, _nextCore.delegate)('server'), _dec42 = Reflect.metadata("design:type", Function), _dec43 = Reflect.metadata("design:paramtypes", []), _dec44 = (0, _nextCore.delegate)('server'), _dec45 = Reflect.metadata("design:type", Function), _dec46 = Reflect.metadata("design:paramtypes", [typeof Recipient === "undefined" ? Object : Recipient]), _dec47 = (0, _nextCore.delegate)('server'), _dec48 = Reflect.metadata("design:type", Function), _dec49 = Reflect.metadata("design:paramtypes", [Array]), _dec50 = (0, _nextCore.delegate)('server'), _dec51 = Reflect.metadata("design:type", Function), _dec52 = Reflect.metadata("design:paramtypes", [String]), _dec53 = (0, _nextCore.delegate)('server'), _dec54 = Reflect.metadata("design:type", Function), _dec55 = Reflect.metadata("design:paramtypes", [Number]), _dec56 = (0, _nextCore.delegate)('server'), _dec57 = Reflect.metadata("design:type", Function), _dec58 = Reflect.metadata("design:paramtypes", [String]), _dec59 = (0, _nextCore.delegate)('server'), _dec60 = Reflect.metadata("design:type", Function), _dec61 = Reflect.metadata("design:paramtypes", [String]), _dec62 = (0, _nextCore.delegate)('server'), _dec63 = Reflect.metadata("design:type", Function), _dec64 = Reflect.metadata("design:paramtypes", [typeof FaxMessagePayload === "undefined" ? Object : FaxMessagePayload, Object]), _dec65 = (0, _nextCore.delegate)('server'), _dec66 = Reflect.metadata("design:type", Function), _dec67 = Reflect.metadata("design:paramtypes", [String, Object]), _dec68 = (0, _nextCore.delegate)('server'), _dec69 = Reflect.metadata("design:type", Function), _dec70 = Reflect.metadata("design:paramtypes", [Number]), _dec71 = (0, _nextCore.computed)(function (that) {
  return [that._locale.currentLocale];
}), _dec72 = Reflect.metadata("design:type", Function), _dec73 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function FaxSender(_client, _storage, _auth, _locale, _toast, _accountInfo, _appFeatures, _toastManager, _messageStore, _numberValidate, _extensionPhoneNumber, _callerId, _availabilityMonitor, _faxSenderOptions) {
    var _this;
    _classCallCheck(this, FaxSender);
    _this = _callSuper(this, FaxSender);
    _this._client = _client;
    _this._storage = _storage;
    _this._auth = _auth;
    _this._locale = _locale;
    _this._toast = _toast;
    _this._accountInfo = _accountInfo;
    _this._appFeatures = _appFeatures;
    _this._toastManager = _toastManager;
    _this._messageStore = _messageStore;
    _this._numberValidate = _numberValidate;
    _this._extensionPhoneNumber = _extensionPhoneNumber;
    _this._callerId = _callerId;
    _this._availabilityMonitor = _availabilityMonitor;
    _this._faxSenderOptions = _faxSenderOptions;
    _initializerDefineProperty(_this, "senderNumber", _descriptor, _this);
    _initializerDefineProperty(_this, "typingToNumber", _descriptor2, _this);
    _initializerDefineProperty(_this, "toNumbers", _descriptor3, _this);
    _initializerDefineProperty(_this, "coverIndex", _descriptor4, _this);
    _initializerDefineProperty(_this, "coverNotes", _descriptor5, _this);
    _initializerDefineProperty(_this, "attachments", _descriptor6, _this);
    _initializerDefineProperty(_this, "attachmentsTotalSize", _descriptor7, _this);
    _this._storage.enable(_this);
    return _this;
  }
  _inherits(FaxSender, _RcModule);
  return _createClass(FaxSender, [{
    key: "_setCoverIndex",
    value: function _setCoverIndex(index) {
      this.coverIndex = index;
    }
  }, {
    key: "_setCoverNotes",
    value: function _setCoverNotes(notes) {
      this.coverNotes = notes;
    }
  }, {
    key: "_setSenderNumber",
    value: function _setSenderNumber() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.senderNumber = number;
    }
  }, {
    key: "_setTypingToNumber",
    value: function _setTypingToNumber() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.typingToNumber = number;
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
    value: function _removeAttachment(id) {
      var index = this.attachments.findIndex(function (it) {
        return it.id === id;
      });
      if (index > -1) {
        var fileSize = this.attachmentsTotalSize - this.attachments[index].size;
        this.attachments.splice(index, 1);
        this._setAttachmentsTotalSize(fileSize);
      }
    }
  }, {
    key: "_setAttachmentsTotalSize",
    value: function _setAttachmentsTotalSize(size) {
      this.attachmentsTotalSize = size;
    }
  }, {
    key: "_clean",
    value: function _clean() {
      var firstCover = this.getFirstCover();
      this.typingToNumber = '';
      this.toNumbers = [];
      this.coverIndex = (firstCover === null || firstCover === void 0 ? void 0 : firstCover.id) || _constant.FAX_COVER_NONE_VALUE;
      this.coverNotes = '';
      this.attachments = [];
      this.attachmentsTotalSize = 0;
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this$getFirstCover;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this._auth.isFreshLogin) {
                _context.n = 1;
                break;
              }
              _context.n = 1;
              return this.clean();
            case 1:
              _context.n = 2;
              return this._initSenderNumber();
            case 2:
              this._setCoverIndex(((_this$getFirstCover = this.getFirstCover()) === null || _this$getFirstCover === void 0 ? void 0 : _this$getFirstCover.id) || _constant.FAX_COVER_NONE_VALUE);
            case 3:
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
      (0, _nextCore.watch)(this, function () {
        return _this2.senderNumbersList;
      }, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!_this2.ready) {
                _context3.n = 1;
                break;
              }
              _context3.n = 1;
              return _this2._initSenderNumber();
            case 1:
              return _context3.a(2);
          }
        }, _callee3);
      })));
    }
  }, {
    key: "_initSenderNumber",
    value: function () {
      var _initSenderNumber2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var cachedPhoneNumber, userPhoneNumberInfo, success;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              cachedPhoneNumber = this.senderNumber;
              if (!(cachedPhoneNumber && cachedPhoneNumber === this._callerId.faxNumber && this.senderNumbersList.find(function (info) {
                return info.phoneNumber === cachedPhoneNumber;
              }))) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              userPhoneNumberInfo = this.senderNumbersList[0];
              if (userPhoneNumberInfo) {
                _context4.n = 2;
                break;
              }
              this.logger.log('Not have any sender number');
              return _context4.a(2);
            case 2:
              if (!userPhoneNumberInfo.id) {
                _context4.n = 4;
                break;
              }
              this.updateSenderNumber(userPhoneNumberInfo === null || userPhoneNumberInfo === void 0 ? void 0 : userPhoneNumberInfo.phoneNumber);
              _context4.n = 3;
              return this.setFaxCallerId("".concat(userPhoneNumberInfo.id));
            case 3:
              success = _context4.v;
              if (!success) {
                // if failed, rollback to empty
                this.updateSenderNumber('');
              }
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function _initSenderNumber() {
        return _initSenderNumber2.apply(this, arguments);
      }
      return _initSenderNumber;
    }()
  }, {
    key: "clean",
    value: function () {
      var _clean2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this._clean();
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function clean() {
        return _clean2.apply(this, arguments);
      }
      return clean;
    }()
  }, {
    key: "addAttachments",
    value: function () {
      var _addAttachments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(files) {
        var newList, isValid, _iterator, _step, attachment;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (files === null || files === void 0 ? void 0 : files.length) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              newList = files.filter(function (file) {
                return (0, _isSupportedFaxFile.isSupportedFaxFile)(file.file);
              });
              isValid = this.checkAttachmentOverLimit(newList);
              if (isValid) {
                _context6.n = 2;
                break;
              }
              return _context6.a(2);
            case 2:
              _iterator = _createForOfIteratorHelper(newList);
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
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function addAttachments(_x) {
        return _addAttachments.apply(this, arguments);
      }
      return addAttachments;
    }()
  }, {
    key: "addAttachment",
    value: function () {
      var _addAttachment2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(attachment) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this._addAttachment(attachment);
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function addAttachment(_x2) {
        return _addAttachment2.apply(this, arguments);
      }
      return addAttachment;
    }()
  }, {
    key: "removeAttachment",
    value: function () {
      var _removeAttachment2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(id) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              this._removeAttachment(id);
            case 1:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function removeAttachment(_x3) {
        return _removeAttachment2.apply(this, arguments);
      }
      return removeAttachment;
    }()
  }, {
    key: "updateSenderNumber",
    value: function () {
      var _updateSenderNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(number) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              this._setSenderNumber(number);
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function updateSenderNumber(_x4) {
        return _updateSenderNumber.apply(this, arguments);
      }
      return updateSenderNumber;
    }()
  }, {
    key: "cleanTypingToNumber",
    value: function () {
      var _cleanTypingToNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              this._setTypingToNumber('');
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function cleanTypingToNumber() {
        return _cleanTypingToNumber.apply(this, arguments);
      }
      return cleanTypingToNumber;
    }()
  }, {
    key: "removeToNumber",
    value: function () {
      var _removeToNumber2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(number) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              this._removeToNumber(number);
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function removeToNumber(_x5) {
        return _removeToNumber2.apply(this, arguments);
      }
      return removeToNumber;
    }()
  }, {
    key: "addToNumbers",
    value: function () {
      var _addToNumbers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(numbers) {
        var isValid, _iterator2, _step2, number, result;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              isValid = false;
              _iterator2 = _createForOfIteratorHelper(numbers);
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  number = _step2.value;
                  result = this.addToNumber(number);
                  isValid = isValid || result;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              return _context10.a(2, isValid);
          }
        }, _callee10, this);
      }));
      function addToNumbers(_x6) {
        return _addToNumbers.apply(this, arguments);
      }
      return addToNumbers;
    }()
  }, {
    key: "addToNumber",
    value: function addToNumber(number) {
      if ((0, _isBlank.isBlank)(number.phoneNumber)) {
        return false;
      }
      var isValid = this.isPhoneNumberValid(number.phoneNumber);
      this._addToNumber(_objectSpread(_objectSpread({}, number), {}, {
        error: !isValid
      }));
      return isValid;
    }
  }, {
    key: "updateTypingToNumber",
    value: function () {
      var _updateTypingToNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(number) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              if (!(number.length > 30)) {
                _context11.n = 1;
                break;
              }
              this._alertWarning((0, _i18n.t)('recipientNumberInvalids'));
              return _context11.a(2);
            case 1:
              this._setTypingToNumber(number);
            case 2:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function updateTypingToNumber(_x7) {
        return _updateTypingToNumber.apply(this, arguments);
      }
      return updateTypingToNumber;
    }()
  }, {
    key: "updateCoverIndex",
    value: function () {
      var _updateCoverIndex = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(index) {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              this._setCoverIndex(index);
            case 1:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function updateCoverIndex(_x8) {
        return _updateCoverIndex.apply(this, arguments);
      }
      return updateCoverIndex;
    }()
  }, {
    key: "updateCoverNotes",
    value: function () {
      var _updateCoverNotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(notes) {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              this._setCoverNotes(notes);
            case 1:
              return _context13.a(2);
          }
        }, _callee13, this);
      }));
      function updateCoverNotes(_x9) {
        return _updateCoverNotes.apply(this, arguments);
      }
      return updateCoverNotes;
    }()
  }, {
    key: "_alertSuccess",
    value: function _alertSuccess(message, ttl) {
      this._toast.success({
        message: message,
        allowDuplicates: false,
        ttl: ttl
      });
    }
  }, {
    key: "_alertWarning",
    value: function _alertWarning(message, ttl) {
      this._toast.warning({
        message: message,
        allowDuplicates: false,
        ttl: ttl
      });
    }
  }, {
    key: "_alertDanger",
    value: function _alertDanger(message) {
      this._toast.danger({
        message: message,
        allowDuplicates: false,
        ttl: 5000
      });
    }
  }, {
    key: "setFaxCallerId",
    value: function () {
      var _setFaxCallerId = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(callerId) {
        var _t;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              _context14.p = 0;
              _context14.n = 1;
              return this._callerId.setDefaultCallerId(callerId, 'FaxNumber');
            case 1:
              return _context14.a(2, true);
            case 2:
              _context14.p = 2;
              _t = _context14.v;
              this.logger.log('setFaxCallerId failed', _t);
              return _context14.a(2, false);
          }
        }, _callee14, this, [[0, 2]]);
      }));
      function setFaxCallerId(_x0) {
        return _setFaxCallerId.apply(this, arguments);
      }
      return setFaxCallerId;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(payload, opts) {
        var formData, response, data, _opts$preInsert, _t2;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              formData = this.buildFaxFormData(payload);
              _context15.n = 1;
              return this._client.service.platform().post('/restapi/v1.0/account/~/extension/~/fax', formData);
            case 1:
              response = _context15.v;
              _context15.n = 2;
              return response.json();
            case 2:
              data = _context15.v;
              if (data) {
                // push data to faxMessageStore directly before ISync
                // get better experience
                if ((_opts$preInsert = opts === null || opts === void 0 ? void 0 : opts.preInsert) !== null && _opts$preInsert !== void 0 ? _opts$preInsert : true) {
                  this._messageStore.preInsertData(data);
                }
                (0, _services.trackEvent)('Int_Fax_faxSent', {
                  faxAttachmentCount: payload.attachments.length
                });
                this._alertSuccess((0, _i18n.t)('faxSuccessSubmitted'));
              }
              return _context15.a(2, data);
            case 3:
              _context15.p = 3;
              _t2 = _context15.v;
              console.error('send fax error', _t2);
              this._alertDanger((0, _i18n.t)('faxSubmitFailed'));
            case 4:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 3]]);
      }));
      function send(_x1, _x10) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "resend",
    value: function () {
      var _resend = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(originalMessageId, opts) {
        var _opts$preInsert2;
        var response, data;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              _context16.n = 1;
              return this._client.service.platform().post('/restapi/v1.0/account/~/extension/~/fax', {
                originalMessageId: originalMessageId
              });
            case 1:
              response = _context16.v;
              _context16.n = 2;
              return response.json();
            case 2:
              data = _context16.v;
              // push data to faxMessageStore directly before ISync
              // get better experience
              if (data && ((_opts$preInsert2 = opts === null || opts === void 0 ? void 0 : opts.preInsert) !== null && _opts$preInsert2 !== void 0 ? _opts$preInsert2 : true)) {
                this._messageStore.preInsertData(data);
              }
              return _context16.a(2, data);
          }
        }, _callee16, this);
      }));
      function resend(_x11, _x12) {
        return _resend.apply(this, arguments);
      }
      return resend;
    }()
  }, {
    key: "downloadAttachment",
    value: function () {
      var _downloadAttachment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(id) {
        var res, fileBuffer;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              _context17.n = 1;
              return this._toastManager.catchError(this._client.service.platform().get("/restapi/v1.0/account/~/extension/~/message-store/".concat(id, "/content/").concat(id)), {
                network: (0, _i18n.t)('downloadFaxNetworkIssue'),
                server: (0, _i18n.t)('downloadFaxBackendError')
              }, {
                throwError: true
              });
            case 1:
              res = _context17.v;
              _context17.n = 2;
              return res.arrayBuffer();
            case 2:
              fileBuffer = _context17.v;
              return _context17.a(2, fileBuffer);
          }
        }, _callee17, this);
      }));
      function downloadAttachment(_x13) {
        return _downloadAttachment.apply(this, arguments);
      }
      return downloadAttachment;
    }()
  }, {
    key: "buildFaxFormData",
    value: function buildFaxFormData(_ref2) {
      var to = _ref2.to,
        faxResolution = _ref2.faxResolution,
        attachments = _ref2.attachments,
        coverIndex = _ref2.coverIndex,
        coverPageText = _ref2.coverPageText,
        sendTime = _ref2.sendTime;
      var body = {
        to: to,
        faxResolution: faxResolution || 'High',
        coverIndex: coverIndex,
        coverPageText: coverPageText,
        sendTime: sendTime
      };
      var formData = new _formData["default"]();
      // This is the mandatory part, the name and type should always be as follows
      formData.append('json', new File([JSON.stringify(body)], 'request.json', {
        type: 'application/json'
      }));
      // Iterate through all currently selected files
      attachments.forEach(function (attachment, idx) {
        formData.append('attachment_' + idx, attachment); // you can also use file.name instead of 'attachment'
      });
      return formData;
    }
  }, {
    key: "isPhoneNumberValid",
    value: function isPhoneNumberValid(phoneNumber) {
      if (!phoneNumber) {
        return false;
      }
      var purePhoneNumber = phoneNumber.trim();
      var validResult = this._appFeatures.isEDPEnabled ? this._numberValidate.validate([purePhoneNumber]) : this._numberValidate.validateFormat([purePhoneNumber]);
      var valid = validResult.result && !this._numberValidate.isAnExtensionNumber(purePhoneNumber) && !this._numberValidate.isAvailableExtension(purePhoneNumber);
      return valid;
    }
  }, {
    key: "checkAttachmentOverLimit",
    value: function checkAttachmentOverLimit(files) {
      var oldAttachments = this.attachments;
      var size = [].concat(_toConsumableArray(oldAttachments), _toConsumableArray(files)).reduce(function (prev, curr) {
        return prev + curr.size;
      }, 0);
      if (size > _constant.FAX_CONTENT_LIMIT.MAX_ATTACHMENT_STORAGE_SIZE) {
        this._alertDanger((0, _i18n.t)(files.length > 1 ? 'maxAttachmentsSizeReached' : 'maxAttachmentSizeReached', {
          maxAllowedSize: _constant.FAX_CONTENT_LIMIT.MAX_ATTACHMENT_STORAGE_SIZE_IN_MB
        }));
        return false;
      }
      this._setAttachmentsTotalSize(size);
      return true;
    }
  }, {
    key: "senderNumbersList",
    get: function get() {
      return this._extensionPhoneNumber.faxSenderNumbers;
    }
  }, {
    key: "maxRecipients",
    get: function get() {
      var _this$_faxSenderOptio, _this$_faxSenderOptio2;
      return (_this$_faxSenderOptio = (_this$_faxSenderOptio2 = this._faxSenderOptions) === null || _this$_faxSenderOptio2 === void 0 ? void 0 : _this$_faxSenderOptio2.maxRecipients) !== null && _this$_faxSenderOptio !== void 0 ? _this$_faxSenderOptio : DEFAULT_MAX_RECIPIENTS;
    }
  }, {
    key: "_checkLanguageIsUS",
    value: function _checkLanguageIsUS() {
      return this._locale.currentLocale.toLowerCase() === 'en-us';
    }
  }, {
    key: "getFirstCover",
    value: function getFirstCover() {
      if (this._checkLanguageIsUS()) {
        return _FaxCover.COVER_US_LIST[1];
      }
      return _FaxCover.COVER_NOT_US_LIST[1];
    }
  }, {
    key: "getAllFaxCoverInfos",
    value: function getAllFaxCoverInfos() {
      var result = [];
      if (this._checkLanguageIsUS()) {
        result.push.apply(result, _toConsumableArray(_FaxCover.COVER_US_LIST));
      } else {
        result.push.apply(result, _toConsumableArray(_FaxCover.COVER_NOT_US_LIST));
      }
      return result;
    }
  }, {
    key: "allCovers",
    get: function get() {
      return this.getAllFaxCoverInfos();
    }
  }, {
    key: "faxEditingInfo",
    get: function get() {
      return {
        senderNumber: this.senderNumber,
        recipients: this.toNumbers,
        coverIndex: this.coverIndex,
        coverNotes: this.coverNotes,
        attachments: this.attachments
      };
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "senderNumber", [_nextCore.userStorage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "typingToNumber", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "toNumbers", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "coverIndex", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _constant.FAX_COVER_NONE_VALUE;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "coverNotes", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "attachments", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "attachmentsTotalSize", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setCoverIndex", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "_setCoverIndex"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setCoverNotes", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "_setCoverNotes"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSenderNumber", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSenderNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setTypingToNumber", [_nextCore.action, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "_setTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addToNumber", [_nextCore.action, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "_addToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeToNumber", [_nextCore.action, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addAttachment", [_nextCore.action, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "_addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeAttachment", [_nextCore.action, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setAttachmentsTotalSize", [_nextCore.action, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAttachmentsTotalSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clean", [_nextCore.action, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "_clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clean", [_dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachments", [_dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachments"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachment", [_dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAttachment", [_dec35, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSenderNumber", [_dec38, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSenderNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanTypingToNumber", [_dec41, _dec42, _dec43], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeToNumber", [_dec44, _dec45, _dec46], Object.getOwnPropertyDescriptor(_class2.prototype, "removeToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addToNumbers", [_dec47, _dec48, _dec49], Object.getOwnPropertyDescriptor(_class2.prototype, "addToNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTypingToNumber", [_dec50, _dec51, _dec52], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTypingToNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCoverIndex", [_dec53, _dec54, _dec55], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCoverIndex"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCoverNotes", [_dec56, _dec57, _dec58], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCoverNotes"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setFaxCallerId", [_dec59, _dec60, _dec61], Object.getOwnPropertyDescriptor(_class2.prototype, "setFaxCallerId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "send", [_dec62, _dec63, _dec64], Object.getOwnPropertyDescriptor(_class2.prototype, "send"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resend", [_dec65, _dec66, _dec67], Object.getOwnPropertyDescriptor(_class2.prototype, "resend"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "downloadAttachment", [_dec68, _dec69, _dec70], Object.getOwnPropertyDescriptor(_class2.prototype, "downloadAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCovers", [_dec71, _dec72, _dec73], Object.getOwnPropertyDescriptor(_class2.prototype, "allCovers"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=FaxSender.js.map
