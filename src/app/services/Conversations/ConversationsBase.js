"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.date.to-primitive.js");
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
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PER_PAGE = exports.DEFAULT_DAY_SPAN = exports.ConversationsBase = void 0;
exports.getUniqueNumbers = getUniqueNumbers;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-iso-string.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _messageTypes = require("@ringcentral-integration/commons/enums/messageTypes");
var _cleanNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/cleanNumber"));
var _messageHelper = require("@ringcentral-integration/commons/lib/messageHelper");
var _normalizeNumber = require("@ringcentral-integration/commons/lib/normalizeNumber");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services3 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ConversationLogger = require("../ConversationLogger");
var _MessageSender = require("../MessageSender");
var _SmsOptOut = require("../SmsOptOut");
var _conversationsStatus = require("./conversationsStatus");
var _helper = require("./helper");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _dec107, _dec108, _dec109, _dec110, _dec111, _dec112, _dec113, _dec114, _dec115, _dec116, _dec117, _dec118, _dec119, _dec120, _dec121, _dec122, _dec123, _dec124, _dec125, _dec126, _dec127, _dec128, _dec129, _dec130, _dec131, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1, _descriptor10, _descriptor11;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
function mergeMessages(messages, oldMessages) {
  var tmp = {};
  var currentMessages = [];
  messages.forEach(function (element) {
    currentMessages.push(element);
    tmp[element.id] = 1;
  });
  oldMessages.forEach(function (element) {
    if (!tmp[element.id]) {
      currentMessages.push(element);
    }
  });
  return currentMessages;
}
function getEarliestTime(messages) {
  var newTime = Date.now();
  messages.forEach(function (message) {
    var creationTime = new Date(message.creationTime).getTime();
    if (creationTime < newTime) {
      newTime = creationTime;
    }
  });
  return newTime;
}
var addUniqueNumber = function addUniqueNumber(message, uniqueNumbers) {
  var _message$to;
  if (message.from) {
    var fromNumber = message.from.phoneNumber || message.from.extensionNumber;
    if (fromNumber) {
      uniqueNumbers.add(fromNumber);
    }
  }
  (_message$to = message.to) === null || _message$to === void 0 ? void 0 : _message$to.forEach(function (toNumber) {
    if (!toNumber) {
      return;
    }
    var toPhoneNumber = toNumber.phoneNumber || toNumber.extensionNumber;
    if (toPhoneNumber) {
      uniqueNumbers.add(toPhoneNumber);
    }
  });
};
function getUniqueNumbers(conversations) {
  var uniqueNumbers = new Set();
  conversations.forEach(function (message) {
    addUniqueNumber(message, uniqueNumbers);
  });
  return Array.from(uniqueNumbers);
}
var DEFAULT_PER_PAGE = exports.DEFAULT_PER_PAGE = 20;
var DEFAULT_DAY_SPAN = exports.DEFAULT_DAY_SPAN = 90;
var ConversationsBase = exports.ConversationsBase = (_dec = function _dec(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 11);
}, _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _services3.Toast === "undefined" ? Object : _services3.Toast, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _MessageSender.MessageSender === "undefined" ? Object : _MessageSender.MessageSender, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof TMessageStore === "undefined" ? Object : TMessageStore, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.RegionSettings === "undefined" ? Object : _services.RegionSettings, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof _ConversationLogger.ConversationLogger === "undefined" ? Object : _ConversationLogger.ConversationLogger, typeof ConversationsOptions === "undefined" ? Object : ConversationsOptions, typeof _SmsOptOut.SmsOptOut === "undefined" ? Object : _SmsOptOut.SmsOptOut]), _dec4 = Reflect.metadata("design:type", typeof MessageTypes === "undefined" ? Object : MessageTypes), _dec5 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec6 = Reflect.metadata("design:type", Array), _dec7 = Reflect.metadata("design:type", typeof ObjectMapValue === "undefined" ? Object : ObjectMapValue), _dec8 = Reflect.metadata("design:type", String), _dec9 = Reflect.metadata("design:type", Array), _dec0 = Reflect.metadata("design:type", typeof ObjectMapValue === "undefined" ? Object : ObjectMapValue), _dec1 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec10 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec11 = Reflect.metadata("design:type", Array), _dec12 = Reflect.metadata("design:type", typeof CorrespondentResponse === "undefined" ? Object : CorrespondentResponse), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [void 0]), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [typeof MessageTypes === "undefined" ? Object : MessageTypes]), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", [typeof ReadStatusFilter === "undefined" ? Object : ReadStatusFilter, typeof MessageTypes === "undefined" ? Object : MessageTypes]), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [typeof ObjectMapValue === "undefined" ? Object : ObjectMapValue]), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [Array, Boolean]), _dec23 = Reflect.metadata("design:type", Function), _dec24 = Reflect.metadata("design:paramtypes", [String]), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec27 = Reflect.metadata("design:type", Function), _dec28 = Reflect.metadata("design:paramtypes", []), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", []), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", [String]), _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", [typeof ObjectMapValue === "undefined" ? Object : ObjectMapValue]), _dec35 = Reflect.metadata("design:type", Function), _dec36 = Reflect.metadata("design:paramtypes", [Array]), _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", [String, String]), _dec39 = Reflect.metadata("design:type", Function), _dec40 = Reflect.metadata("design:paramtypes", [String, typeof Attachment === "undefined" ? Object : Attachment]), _dec41 = Reflect.metadata("design:type", Function), _dec42 = Reflect.metadata("design:paramtypes", [String, typeof Attachment === "undefined" ? Object : Attachment]), _dec43 = Reflect.metadata("design:type", Function), _dec44 = Reflect.metadata("design:paramtypes", [String]), _dec45 = Reflect.metadata("design:type", Function), _dec46 = Reflect.metadata("design:paramtypes", [String, typeof ObjectMapValue === "undefined" ? Object : ObjectMapValue]), _dec47 = Reflect.metadata("design:type", Function), _dec48 = Reflect.metadata("design:paramtypes", [Array]), _dec49 = Reflect.metadata("design:type", Function), _dec50 = Reflect.metadata("design:paramtypes", [typeof CorrespondentMatch === "undefined" ? Object : CorrespondentMatch]), _dec51 = Reflect.metadata("design:type", Function), _dec52 = Reflect.metadata("design:paramtypes", [Array, void 0]), _dec53 = Reflect.metadata("design:type", Function), _dec54 = Reflect.metadata("design:paramtypes", [String]), _dec55 = Reflect.metadata("design:type", Function), _dec56 = Reflect.metadata("design:paramtypes", []), _dec57 = Reflect.metadata("design:type", Function), _dec58 = Reflect.metadata("design:paramtypes", []), _dec59 = (0, _nextCore.delegate)('server'), _dec60 = Reflect.metadata("design:type", Function), _dec61 = Reflect.metadata("design:paramtypes", [String]), _dec62 = (0, _nextCore.delegate)('server'), _dec63 = Reflect.metadata("design:type", Function), _dec64 = Reflect.metadata("design:paramtypes", [typeof MessageTypes === "undefined" ? Object : MessageTypes]), _dec65 = (0, _nextCore.delegate)('server'), _dec66 = Reflect.metadata("design:type", Function), _dec67 = Reflect.metadata("design:paramtypes", [typeof ReadStatusFilter === "undefined" ? Object : ReadStatusFilter, typeof MessageTypes === "undefined" ? Object : MessageTypes]), _dec68 = (0, _nextCore.delegate)('server'), _dec69 = Reflect.metadata("design:type", Function), _dec70 = Reflect.metadata("design:paramtypes", []), _dec71 = (0, _nextCore.delegate)('server'), _dec72 = Reflect.metadata("design:type", Function), _dec73 = Reflect.metadata("design:paramtypes", []), _dec74 = (0, _nextCore.delegate)('server'), _dec75 = Reflect.metadata("design:type", Function), _dec76 = Reflect.metadata("design:paramtypes", []), _dec77 = (0, _nextCore.delegate)('server'), _dec78 = Reflect.metadata("design:type", Function), _dec79 = Reflect.metadata("design:paramtypes", [String]), _dec80 = (0, _nextCore.delegate)('server'), _dec81 = Reflect.metadata("design:type", Function), _dec82 = Reflect.metadata("design:paramtypes", []), _dec83 = (0, _nextCore.delegate)('server'), _dec84 = Reflect.metadata("design:type", Function), _dec85 = Reflect.metadata("design:paramtypes", [void 0]), _dec86 = (0, _nextCore.delegate)('server'), _dec87 = Reflect.metadata("design:type", Function), _dec88 = Reflect.metadata("design:paramtypes", [String]), _dec89 = (0, _nextCore.delegate)('server'), _dec90 = Reflect.metadata("design:type", Function), _dec91 = Reflect.metadata("design:paramtypes", [Array]), _dec92 = (0, _nextCore.delegate)('server'), _dec93 = Reflect.metadata("design:type", Function), _dec94 = Reflect.metadata("design:paramtypes", [typeof Attachment === "undefined" ? Object : Attachment]), _dec95 = (0, _nextCore.delegate)('server'), _dec96 = Reflect.metadata("design:type", Function), _dec97 = Reflect.metadata("design:paramtypes", [typeof Attachment === "undefined" ? Object : Attachment]), _dec98 = (0, _nextCore.delegate)('server'), _dec99 = Reflect.metadata("design:type", Function), _dec100 = Reflect.metadata("design:paramtypes", [String, Array]), _dec101 = (0, _nextCore.delegate)('server'), _dec102 = Reflect.metadata("design:type", Function), _dec103 = Reflect.metadata("design:paramtypes", [String]), _dec104 = Reflect.metadata("design:type", Function), _dec105 = Reflect.metadata("design:paramtypes", []), _dec106 = Reflect.metadata("design:type", Function), _dec107 = Reflect.metadata("design:paramtypes", []), _dec108 = Reflect.metadata("design:type", Function), _dec109 = Reflect.metadata("design:paramtypes", []), _dec110 = Reflect.metadata("design:type", Function), _dec111 = Reflect.metadata("design:paramtypes", []), _dec112 = Reflect.metadata("design:type", Function), _dec113 = Reflect.metadata("design:paramtypes", []), _dec114 = Reflect.metadata("design:type", Function), _dec115 = Reflect.metadata("design:paramtypes", []), _dec116 = Reflect.metadata("design:type", Function), _dec117 = Reflect.metadata("design:paramtypes", []), _dec118 = Reflect.metadata("design:type", Function), _dec119 = Reflect.metadata("design:paramtypes", []), _dec120 = Reflect.metadata("design:type", Function), _dec121 = Reflect.metadata("design:paramtypes", []), _dec122 = Reflect.metadata("design:type", Function), _dec123 = Reflect.metadata("design:paramtypes", []), _dec124 = Reflect.metadata("design:type", Function), _dec125 = Reflect.metadata("design:paramtypes", []), _dec126 = Reflect.metadata("design:type", Function), _dec127 = Reflect.metadata("design:paramtypes", []), _dec128 = Reflect.metadata("design:type", Function), _dec129 = Reflect.metadata("design:paramtypes", []), _dec130 = Reflect.metadata("design:type", Function), _dec131 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function ConversationsBase(_toast, _auth, _client, _messageSender, _extensionInfo, _messageStore, _appFeatures, _regionSettings, _contactMatcher, _conversationLogger, _conversationsOptions, _smsOptOut) {
    var _this$_messageSender, _this$_messageSender2, _this$_messageSender3;
    var _this;
    _classCallCheck(this, ConversationsBase);
    _this = _callSuper(this, ConversationsBase);
    _this._toast = _toast;
    _this._auth = _auth;
    _this._client = _client;
    _this._messageSender = _messageSender;
    _this._extensionInfo = _extensionInfo;
    _this._messageStore = _messageStore;
    _this._appFeatures = _appFeatures;
    _this._regionSettings = _regionSettings;
    _this._contactMatcher = _contactMatcher;
    _this._conversationLogger = _conversationLogger;
    _this._conversationsOptions = _conversationsOptions;
    _this._smsOptOut = _smsOptOut;
    _this._olderDataExisted = true;
    _this._olderMessagesExisted = true;
    _this._minSearchStringLength = 3;
    _initializerDefineProperty(_this, "searchInput", _descriptor, _this);
    _initializerDefineProperty(_this, "typeFilter", _descriptor2, _this);
    _initializerDefineProperty(_this, "readStatusFilterMap", _descriptor3, _this);
    _initializerDefineProperty(_this, "oldConversations", _descriptor4, _this);
    _initializerDefineProperty(_this, "currentPage", _descriptor5, _this);
    _initializerDefineProperty(_this, "fetchConversationsStatus", _descriptor6, _this);
    _initializerDefineProperty(_this, "currentConversationId", _descriptor7, _this);
    _initializerDefineProperty(_this, "oldMessages", _descriptor8, _this);
    _initializerDefineProperty(_this, "fetchMessagesStatus", _descriptor9, _this);
    _initializerDefineProperty(_this, "inputContents", _descriptor0, _this);
    _initializerDefineProperty(_this, "conversationStatus", _descriptor1, _this);
    _initializerDefineProperty(_this, "correspondentMatch", _descriptor10, _this);
    _initializerDefineProperty(_this, "correspondentResponse", _descriptor11, _this);
    (_this$_messageSender = _this._messageSender) === null || _this$_messageSender === void 0 ? void 0 : _this$_messageSender.on((_this$_messageSender2 = _this._messageSender) === null || _this$_messageSender2 === void 0 ? void 0 : (_this$_messageSender3 = _this$_messageSender2.events) === null || _this$_messageSender3 === void 0 ? void 0 : _this$_messageSender3.send, function (_ref) {
      var toNumbers = _ref.toNumbers;
      _this.addEntities(toNumbers.map(function (number) {
        return {
          phoneNumber: number
        };
      }));
    });
    if (_this._contactMatcher && _this._enableContactMatch) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.allUniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._messageStore.ready;
        }
      });
    }
    return _this;
  }
  _inherits(ConversationsBase, _RcModule);
  return _createClass(ConversationsBase, [{
    key: "_perPage",
    get: function get() {
      var _this$_conversationsO, _this$_conversationsO2;
      return (_this$_conversationsO = (_this$_conversationsO2 = this._conversationsOptions) === null || _this$_conversationsO2 === void 0 ? void 0 : _this$_conversationsO2.perPage) !== null && _this$_conversationsO !== void 0 ? _this$_conversationsO : DEFAULT_PER_PAGE;
    }
  }, {
    key: "_daySpan",
    get: function get() {
      var _this$_conversationsO3, _this$_conversationsO4;
      return (_this$_conversationsO3 = (_this$_conversationsO4 = this._conversationsOptions) === null || _this$_conversationsO4 === void 0 ? void 0 : _this$_conversationsO4.daySpan) !== null && _this$_conversationsO3 !== void 0 ? _this$_conversationsO3 : DEFAULT_DAY_SPAN;
    }
  }, {
    key: "_enableLoadOldMessages",
    get: function get() {
      var _this$_conversationsO5, _this$_conversationsO6;
      return (_this$_conversationsO5 = (_this$_conversationsO6 = this._conversationsOptions) === null || _this$_conversationsO6 === void 0 ? void 0 : _this$_conversationsO6.enableLoadOldMessages) !== null && _this$_conversationsO5 !== void 0 ? _this$_conversationsO5 : false;
    }
  }, {
    key: "_showMMSAttachment",
    get: function get() {
      var _this$_conversationsO7, _this$_conversationsO8;
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        return true;
      }
      return (_this$_conversationsO7 = (_this$_conversationsO8 = this._conversationsOptions) === null || _this$_conversationsO8 === void 0 ? void 0 : _this$_conversationsO8.showMMSAttachment) !== null && _this$_conversationsO7 !== void 0 ? _this$_conversationsO7 : false;
    }
  }, {
    key: "_enableContactMatch",
    get: function get() {
      var _this$_conversationsO9, _this$_conversationsO0;
      return (_this$_conversationsO9 = (_this$_conversationsO0 = this._conversationsOptions) === null || _this$_conversationsO0 === void 0 ? void 0 : _this$_conversationsO0.enableContactMatch) !== null && _this$_conversationsO9 !== void 0 ? _this$_conversationsO9 : true;
    }
  }, {
    key: "_updateSearchInput",
    value: function _updateSearchInput() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.searchInput = input;
    }
  }, {
    key: "_updateTypeFilter",
    value: function _updateTypeFilter(typeFilter) {
      this.typeFilter = typeFilter;
      this.currentPage = 1;
      this.oldConversations = [];
    }
  }, {
    key: "_updateReadStatusFilterMap",
    value: function _updateReadStatusFilterMap(status, type) {
      this.readStatusFilterMap[type] = status;
      this.currentPage = 1;
    }
  }, {
    key: "_updateFetchConversationsStatus",
    value: function _updateFetchConversationsStatus(status) {
      this.fetchConversationsStatus = status;
    }
  }, {
    key: "_fetchOldConversationsSuccess",
    value: function _fetchOldConversationsSuccess(records, isIncreaseCurrentPage) {
      var _this$oldConversation;
      (_this$oldConversation = this.oldConversations).push.apply(_this$oldConversation, _toConsumableArray(records.map(_messageHelper.normalizeRecord)));
      this.fetchConversationsStatus = _conversationsStatus.conversationsStatus.idle;
      if (isIncreaseCurrentPage) {
        this.currentPage += 1;
      }
    }
  }, {
    key: "_deleteOldConversation",
    value: function _deleteOldConversation(conversationId) {
      this.oldConversations = this.oldConversations.filter(function (c) {
        return String(c.conversationId) !== String(conversationId);
      });
    }
  }, {
    key: "_cleanOldConversations",
    value: function _cleanOldConversations() {
      this.oldConversations = [];
    }
  }, {
    key: "_increaseCurrentPage",
    value: function _increaseCurrentPage() {
      this.currentPage += 1;
    }
  }, {
    key: "_resetCurrentPage",
    value: function _resetCurrentPage() {
      this.currentPage = 1;
    }
  }, {
    key: "_updateCurrentConversationId",
    value: function _updateCurrentConversationId(conversationId) {
      this.currentConversationId = conversationId;
      this.oldMessages = [];
    }
  }, {
    key: "_updateFetchMessagesStatus",
    value: function _updateFetchMessagesStatus(status) {
      this.fetchMessagesStatus = status;
    }
  }, {
    key: "_fetchOldMessagesSuccess",
    value: function _fetchOldMessagesSuccess(records) {
      var _this$oldMessages;
      (_this$oldMessages = this.oldMessages).push.apply(_this$oldMessages, _toConsumableArray(records.map(_messageHelper.normalizeRecord)));
      this.fetchMessagesStatus = _conversationsStatus.conversationsStatus.idle;
    }
  }, {
    key: "_updateMessageText",
    value: function _updateMessageText(conversationId, text) {
      var existedContent = this.inputContents[conversationId];
      if (existedContent) {
        existedContent.text = text;
      } else {
        this.inputContents[conversationId] = {
          conversationId: conversationId,
          text: text,
          attachments: []
        };
      }
    }
  }, {
    key: "_addAttachment",
    value: function _addAttachment(conversationId, attachment) {
      var existedContent = this.inputContents[conversationId];
      if (existedContent) {
        var attachments = (existedContent.attachments || []).filter(function (f) {
          return f.name !== attachment.name;
        });
        attachments.push(attachment);
        existedContent.attachments = attachments;
      } else {
        this.inputContents[conversationId] = {
          conversationId: conversationId,
          text: '',
          attachments: [attachment]
        };
      }
    }
  }, {
    key: "_removeAttachment",
    value: function _removeAttachment(conversationId, attachment) {
      var existedContent = this.inputContents[conversationId];
      if (existedContent) {
        existedContent.attachments = existedContent.attachments.filter(function (f) {
          return f.name !== attachment.name;
        });
      }
    }
  }, {
    key: "_removeInputContent",
    value: function _removeInputContent(conversationId) {
      delete this.inputContents[conversationId];
    }
  }, {
    key: "_updateConversationStatus",
    value: function _updateConversationStatus(conversationId, status) {
      this.conversationStatus[conversationId] = status;
    }
  }, {
    key: "_addCorrespondentMatchEntities",
    value: function _addCorrespondentMatchEntities(entities) {
      this.correspondentMatch = _toConsumableArray(entities);
    }
  }, {
    key: "_removeCorrespondentMatchEntity",
    value: function _removeCorrespondentMatchEntity(entity) {
      this.correspondentMatch = this.correspondentMatch.filter(function (item) {
        return item.rawId !== entity.id && item.id !== entity.id;
      });
    }
  }, {
    key: "_addCorrespondentResponses",
    value: function _addCorrespondentResponses() {
      var responses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var phoneNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      this.correspondentResponse = responses.reduce(function (accumulator, response) {
        var to = response.to,
          from = response.from,
          direction = response.direction,
          id = response.conversation.id;
        var number = direction === 'Inbound' ? from : to[0];
        phoneNumber = number.phoneNumber || number.extensionNumber;
        return _objectSpread(_objectSpread({}, accumulator), {}, _defineProperty({}, phoneNumber, id));
      }, {});
    }
  }, {
    key: "_removeCorrespondentResponses",
    value: function _removeCorrespondentResponses(phoneNumber) {
      delete this.correspondentResponse[phoneNumber];
    }
  }, {
    key: "_resetAllStatus",
    value: function _resetAllStatus() {
      this.searchInput = '';
      this.typeFilter = _messageTypes.messageTypes.all;
      this.oldConversations = [];
      this.currentPage = 1;
      this.fetchConversationsStatus = _conversationsStatus.conversationsStatus.idle;
      this.currentConversationId = null;
      this.oldMessages = [];
      this.fetchMessagesStatus = _conversationsStatus.conversationsStatus.idle;
      this.inputContents = {};
      this.conversationStatus = {};
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_superPropGet(ConversationsBase, "_shouldInit", this, 3)([]) && this._auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_superPropGet(ConversationsBase, "_shouldReset", this, 3)([]) || this.ready && !this._auth.loggedIn);
    }
  }, {
    key: "onInit",
    value: function onInit() {
      if (this._contactMatcher) {
        var _this$_conversationsO1;
        this._contactMatcher.triggerMatch({
          ignoreCache: !!((_this$_conversationsO1 = this._conversationsOptions) === null || _this$_conversationsO1 === void 0 ? void 0 : _this$_conversationsO1.contactMatchIgnoreCache)
        });
      }
    }
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {
      if (this.allConversations.length <= this._perPage && this._enableLoadOldMessages && this._hasPermission) {
        this.fetchOldConversations();
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this._olderDataExisted = true;
      this._olderMessagesExisted = true;
      this._resetAllStatus();
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _nextCore.watch)(this, function () {
        return _this2.shouldTriggerMatchConditions;
      }, function () {
        if (_this2._contactMatcher && _this2.ready) {
          _this2._contactMatcher.triggerMatch();
        }
      });
      (0, _nextCore.watch)(this, function () {
        return _this2._messageStore.allConversations;
      }, function () {
        var newValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var oldValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        if (newValue.length < oldValue.length) {
          if (_this2.oldConversations.length > 0) {
            _this2._cleanOldConversations();
            _this2._olderDataExisted = true;
          }
        }
      });
    }
  }, {
    key: "shouldTriggerMatchConditions",
    get: function get() {
      return [this.uniqueNumbers, this.currentPage, this.typeFilter, this.effectiveSearchString];
    }
  }, {
    key: "updateSearchInput",
    value: function () {
      var _updateSearchInput2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(input) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._updateSearchInput(input);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function updateSearchInput(_x) {
        return _updateSearchInput2.apply(this, arguments);
      }
      return updateSearchInput;
    }()
  }, {
    key: "updateTypeFilter",
    value: function () {
      var _updateTypeFilter2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(type) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(this.typeFilter === type)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              this._updateTypeFilter(type);
              this._olderDataExisted = true;
              this._olderMessagesExisted = true;
              if (this.pagingConversations.length <= this._perPage) {
                this.loadNextPage();
              }
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function updateTypeFilter(_x2) {
        return _updateTypeFilter2.apply(this, arguments);
      }
      return updateTypeFilter;
    }()
  }, {
    key: "updateReadStatusFilterMap",
    value: function () {
      var _updateReadStatusFilterMap2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(readStatus, type) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!(this.readStatusFilterMap[type] === readStatus)) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              this._updateReadStatusFilterMap(readStatus, type);
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function updateReadStatusFilterMap(_x3, _x4) {
        return _updateReadStatusFilterMap2.apply(this, arguments);
      }
      return updateReadStatusFilterMap;
    }()
  }, {
    key: "fetchOldConversations",
    value: function () {
      var _fetchOldConversations = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var dateFrom, dateTo, typeFilter, currentPage, params, result, records, recordsLength, isIncreaseCurrentPage, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (this._olderDataExisted) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              if (!this.loadingOldConversations) {
                _context4.n = 2;
                break;
              }
              return _context4.a(2);
            case 2:
              this._updateFetchConversationsStatus(_conversationsStatus.conversationsStatus.fetching);
              dateFrom = new Date();
              dateFrom.setDate(dateFrom.getDate() - this._daySpan);
              dateTo = new Date(this.earliestTime);
              if (dateTo.getTime() < dateFrom.getTime()) {
                dateFrom = new Date(dateTo.getTime() - 1000 * 3600 * 24);
              }
              typeFilter = this.typeFilter;
              currentPage = this.currentPage;
              params = {
                distinctConversations: true,
                perPage: this._perPage,
                dateFrom: dateFrom.toISOString(),
                dateTo: dateTo.toISOString()
              };
              if (typeFilter === _messageTypes.messageTypes.text) {
                params.messageType = [_messageTypes.messageTypes.sms, _messageTypes.messageTypes.pager];
              } else if (typeFilter !== _messageTypes.messageTypes.all) {
                params.messageType = [typeFilter];
              }
              _context4.p = 3;
              _context4.n = 4;
              return this._client.account().extension().messageStore().list(params);
            case 4:
              result = _context4.v;
              records = result.records;
              recordsLength = records.length;
              this._olderDataExisted = recordsLength === this._perPage;
              if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
                isIncreaseCurrentPage = recordsLength && this._perPage * this.currentPage < recordsLength + this.filteredConversations.length;
                this._fetchOldConversationsSuccess(records, !!isIncreaseCurrentPage);
              }
              _context4.n = 6;
              break;
            case 5:
              _context4.p = 5;
              _t = _context4.v;
              if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
                this._updateFetchConversationsStatus(_conversationsStatus.conversationsStatus.idle);
              }
            case 6:
              return _context4.a(2);
          }
        }, _callee4, this, [[3, 5]]);
      }));
      function fetchOldConversations() {
        return _fetchOldConversations.apply(this, arguments);
      }
      return fetchOldConversations;
    }()
  }, {
    key: "loadNextPage",
    value: function () {
      var _loadNextPage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var currentPage;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              currentPage = this.currentPage;
              if (!(currentPage * this._perPage < this.filteredConversations.length)) {
                _context5.n = 1;
                break;
              }
              this._increaseCurrentPage();
              return _context5.a(2);
            case 1:
              if (!(this.effectiveSearchString !== '')) {
                _context5.n = 2;
                break;
              }
              return _context5.a(2);
            case 2:
              if (!(!this._enableLoadOldMessages || !this._hasPermission)) {
                _context5.n = 3;
                break;
              }
              return _context5.a(2);
            case 3:
              _context5.n = 4;
              return this.fetchOldConversations();
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function loadNextPage() {
        return _loadNextPage.apply(this, arguments);
      }
      return loadNextPage;
    }()
  }, {
    key: "resetCurrentPage",
    value: function () {
      var _resetCurrentPage2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this._resetCurrentPage();
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function resetCurrentPage() {
        return _resetCurrentPage2.apply(this, arguments);
      }
      return resetCurrentPage;
    }()
  }, {
    key: "loadConversation",
    value: function () {
      var _loadConversation2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(conversationId) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this._loadConversation(conversationId);
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function loadConversation(_x5) {
        return _loadConversation2.apply(this, arguments);
      }
      return loadConversation;
    }()
  }, {
    key: "_loadConversation",
    value: function () {
      var _loadConversation3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(conversationId) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!(conversationId === this.currentConversationId)) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2);
            case 1:
              this._updateCurrentConversationId(conversationId);
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function _loadConversation(_x6) {
        return _loadConversation3.apply(this, arguments);
      }
      return _loadConversation;
    }()
  }, {
    key: "unloadConversation",
    value: function () {
      var _unloadConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              this._updateCurrentConversationId(null);
              this._olderMessagesExisted = true;
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function unloadConversation() {
        return _unloadConversation.apply(this, arguments);
      }
      return unloadConversation;
    }()
  }, {
    key: "fetchOldMessages",
    value: function () {
      var _fetchOldMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var perPage,
          conversationId,
          dateFrom,
          earliestTime,
          dateTo,
          result,
          records,
          _args0 = arguments,
          _t2;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              perPage = _args0.length > 0 && _args0[0] !== undefined ? _args0[0] : this._perPage;
              if (this._enableLoadOldMessages) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2);
            case 1:
              if (this._hasPermission) {
                _context0.n = 2;
                break;
              }
              return _context0.a(2);
            case 2:
              if (this._olderMessagesExisted) {
                _context0.n = 3;
                break;
              }
              return _context0.a(2);
            case 3:
              if (!this.loadingOldMessages) {
                _context0.n = 4;
                break;
              }
              return _context0.a(2);
            case 4:
              if (this.currentConversationId) {
                _context0.n = 5;
                break;
              }
              return _context0.a(2);
            case 5:
              this._updateFetchMessagesStatus(_conversationsStatus.conversationsStatus.fetching);
              conversationId = this.currentConversationId;
              dateFrom = new Date();
              dateFrom.setDate(dateFrom.getDate() - this._daySpan);
              earliestTime = getEarliestTime(this.currentConversation.messages);
              dateTo = new Date(earliestTime);
              if (dateTo.getTime() < dateFrom.getTime()) {
                dateFrom.setDate(dateFrom.getDate() - 1);
              }
              _context0.p = 6;
              _context0.n = 7;
              return this._client.account().extension().messageStore().list({
                conversationId: +conversationId,
                perPage: perPage,
                dateFrom: dateFrom.toISOString(),
                dateTo: dateTo.toISOString()
              });
            case 7:
              result = _context0.v;
              records = result.records;
              this._olderMessagesExisted = records.length === perPage;
              if (conversationId === this.currentConversationId) {
                this._fetchOldMessagesSuccess(records);
              }
              _context0.n = 9;
              break;
            case 8:
              _context0.p = 8;
              _t2 = _context0.v;
              if (conversationId === this.currentConversationId) {
                this._updateFetchMessagesStatus(_conversationsStatus.conversationsStatus.idle);
              }
            case 9:
              return _context0.a(2);
          }
        }, _callee0, this, [[6, 8]]);
      }));
      function fetchOldMessages() {
        return _fetchOldMessages.apply(this, arguments);
      }
      return fetchOldMessages;
    }()
  }, {
    key: "updateMessageText",
    value: function () {
      var _updateMessageText2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(text) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              if (!(text.length > 1000)) {
                _context1.n = 1;
                break;
              }
              this._toast.warning({
                message: (0, _i18n.t)('textTooLong'),
                ttl: 0
              });
              return _context1.a(2, true);
            case 1:
              this._updateMessageText(this.currentConversationId, text);
            case 2:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function updateMessageText(_x7) {
        return _updateMessageText2.apply(this, arguments);
      }
      return updateMessageText;
    }()
  }, {
    key: "checkAttachmentOverLimit",
    value: function checkAttachmentOverLimit(attachments) {
      var oldAttachments = this.attachments;
      if (attachments.length + oldAttachments.length > 10) {
        this._toast.danger({
          message: (0, _i18n.t)('attachmentCountLimitation'),
          ttl: 5000
        });
        return false;
      }
      var size = [].concat(_toConsumableArray(attachments), _toConsumableArray(oldAttachments)).reduce(function (prev, curr) {
        return prev + curr.size;
      }, 0);
      if (size > _MessageSender.ATTACHMENT_SIZE_LIMITATION) {
        this._toast.danger({
          message: (0, _i18n.t)('attachmentSizeLimitation'),
          ttl: 5000
        });
        return false;
      }
      return true;
    }
  }, {
    key: "addAttachments",
    value: function () {
      var _addAttachments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(attachments) {
        var isValid, _iterator, _step, attachment;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              isValid = this.checkAttachmentOverLimit(attachments);
              if (isValid) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2);
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
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function addAttachments(_x8) {
        return _addAttachments.apply(this, arguments);
      }
      return addAttachments;
    }()
  }, {
    key: "addAttachment",
    value: function () {
      var _addAttachment2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(attachment) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              this._addAttachment(this.currentConversationId, attachment);
            case 1:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function addAttachment(_x9) {
        return _addAttachment2.apply(this, arguments);
      }
      return addAttachment;
    }()
  }, {
    key: "removeAttachment",
    value: function () {
      var _removeAttachment2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(attachment) {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              this._removeAttachment(this.currentConversationId, attachment);
            case 1:
              return _context12.a(2);
          }
        }, _callee12, this);
      }));
      function removeAttachment(_x0) {
        return _removeAttachment2.apply(this, arguments);
      }
      return removeAttachment;
    }()
  }, {
    key: "replyToReceivers",
    value: function () {
      var _replyToReceivers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(text) {
        var attachments,
          conversationId,
          _this$_smsOptOut$atta,
          _this$_smsOptOut,
          _this$_messageSender4,
          messageText,
          responses,
          _this$_smsOptOut2,
          _args13 = arguments;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              attachments = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : [];
              conversationId = this.currentConversationId;
              this._updateConversationStatus(conversationId, _conversationsStatus.conversationsStatus.pushing);
              _context13.p = 1;
              messageText = (_this$_smsOptOut$atta = (_this$_smsOptOut = this._smsOptOut) === null || _this$_smsOptOut === void 0 ? void 0 : _this$_smsOptOut.attachOptOutHint(conversationId, text)) !== null && _this$_smsOptOut$atta !== void 0 ? _this$_smsOptOut$atta : text;
              _context13.n = 2;
              return (_this$_messageSender4 = this._messageSender) === null || _this$_messageSender4 === void 0 ? void 0 : _this$_messageSender4.send({
                fromNumber: this._getFromNumber(),
                toNumbers: this._getToNumbers(),
                text: messageText,
                attachments: attachments,
                replyOnMessageId: this._getReplyOnMessageId()
              });
            case 2:
              responses = _context13.v;
              if (!(responses && responses[0])) {
                _context13.n = 3;
                break;
              }
              // TODO: check type
              this._messageStore.pushMessage(responses[0]);
              this._updateConversationStatus(conversationId, _conversationsStatus.conversationsStatus.idle);
              this._removeInputContent(conversationId);
              (_this$_smsOptOut2 = this._smsOptOut) === null || _this$_smsOptOut2 === void 0 ? void 0 : _this$_smsOptOut2.resetOptOut(conversationId);
              return _context13.a(2, responses[0]);
            case 3:
              return _context13.a(2, null);
            case 4:
              _context13.p = 4;
              this._updateConversationStatus(conversationId, _conversationsStatus.conversationsStatus.idle);
              return _context13.f(4);
            case 5:
              return _context13.a(2);
          }
        }, _callee13, this, [[1,, 4, 5]]);
      }));
      function replyToReceivers(_x1) {
        return _replyToReceivers.apply(this, arguments);
      }
      return replyToReceivers;
    }()
  }, {
    key: "_getReplyOnMessageId",
    value: function _getReplyOnMessageId() {
      var messageList = this.currentConversation.messages;
      var lastMessage = messageList && messageList.length > 0 && messageList[messageList.length - 1];
      if (lastMessage && lastMessage.id) {
        return lastMessage.id;
      }
      return null;
    }
  }, {
    key: "_getFromNumber",
    value: function _getFromNumber() {
      var senderNumber = this.currentConversation.senderNumber;
      if (!senderNumber) {
        return null;
      }
      return senderNumber.extensionNumber || senderNumber.phoneNumber;
    }
  }, {
    key: "_getToNumbers",
    value: function _getToNumbers() {
      var recipients = this.currentConversation.recipients;
      return recipients.map(function (recipient) {
        return recipient.extensionNumber || recipient.phoneNumber;
      });
    }
  }, {
    key: "deleteConversation",
    value: function () {
      var _deleteConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(conversationId) {
        var conversation, _t3;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              if (conversationId) {
                _context14.n = 1;
                break;
              }
              return _context14.a(2);
            case 1:
              if (!this._messageStore.conversationStore[conversationId]) {
                _context14.n = 3;
                break;
              }
              _context14.n = 2;
              return this._messageStore.deleteConversationMessages(conversationId);
            case 2:
              return _context14.a(2);
            case 3:
              conversation = this.allConversationsMap.get(conversationId);
              if (conversation) {
                _context14.n = 4;
                break;
              }
              return _context14.a(2);
            case 4:
              if (!(0, _messageHelper.messageIsTextMessage)(conversation)) {
                _context14.n = 6;
                break;
              }
              _context14.n = 5;
              return this._messageStore.deleteConversation(conversationId);
            case 5:
              return _context14.a(2);
            case 6:
              _context14.p = 6;
              _context14.n = 7;
              return this._messageStore.deleteMessageApi(conversationId);
            case 7:
              this._deleteOldConversation(conversationId);
              _context14.n = 9;
              break;
            case 8:
              _context14.p = 8;
              _t3 = _context14.v;
              console.error(_t3);
            case 9:
              return _context14.a(2);
          }
        }, _callee14, this, [[6, 8]]);
      }));
      function deleteConversation(_x10) {
        return _deleteConversation.apply(this, arguments);
      }
      return deleteConversation;
    }()
  }, {
    key: "allConversations",
    get: function get() {
      var conversations = this._messageStore.allConversations;
      var oldConversations = this.oldConversations;
      if (oldConversations.length === 0) {
        return conversations;
      }
      var newConversations = [];
      var conversationMap = {};
      var pushConversation = function pushConversation(c) {
        // use conversationId when available, use id for VoiceMail/Fax/etc..
        var cid = c.conversationId || c.id;
        if (conversationMap[cid]) {
          return;
        }
        newConversations.push(c);
        conversationMap[cid] = 1;
      };
      conversations.forEach(pushConversation);
      oldConversations.forEach(pushConversation);
      return newConversations;
    }
  }, {
    key: "uniqueNumbers",
    get: function get() {
      return getUniqueNumbers(this.pagingConversations);
    }
  }, {
    key: "allConversationsInfo",
    get: function get() {
      var _this3 = this;
      var uniqueNumbers = new Set();
      var uniqueConversationMap = new Map();
      var map = new Map(this.allConversations.map(function (item) {
        addUniqueNumber(item, uniqueNumbers);
        try {
          var _item$to$map, _item$to;
          var uniqueConversationId = (0, _helper.buildConversationId)((_item$to$map = (_item$to = item.to) === null || _item$to === void 0 ? void 0 : _item$to.map(function (item) {
            return item.phoneNumber;
          })) !== null && _item$to$map !== void 0 ? _item$to$map : [], item.from.phoneNumber);
          uniqueConversationMap.set(uniqueConversationId, item);
        } catch (error) {
          // just avoid the server have wrong data, normally it will not happen
          // eslint-disable-next-line no-console
          _this3.logger.error('buildConversationId error', error);
        }
        return [item.conversationId, item];
      }));
      return {
        map: map,
        uniqueNumbers: Array.from(uniqueNumbers),
        uniqueConversationMap: uniqueConversationMap
      };
    }
  }, {
    key: "allConversationsMap",
    get: function get() {
      return this.allConversationsInfo.map;
    }
  }, {
    key: "allUniqueNumbers",
    get: function get() {
      return this.allConversationsInfo.uniqueNumbers;
    }
  }, {
    key: "effectiveSearchString",
    get: function get() {
      if (this.searchInput.length >= this._minSearchStringLength) {
        return this.searchInput;
      }
      return '';
    }
  }, {
    key: "typeFilteredConversations",
    get: function get() {
      var _this4 = this;
      var typeFilter = this.typeFilter;
      var allConversations = this.allConversations;
      switch (typeFilter) {
        case _messageTypes.messageTypes.text:
          return allConversations.filter(_messageHelper.messageIsTextMessage);
        case _messageTypes.messageTypes.voiceMail:
          return allConversations.filter(_messageHelper.messageIsVoicemail);
        case _messageTypes.messageTypes.fax:
          return allConversations.filter(_messageHelper.messageIsFax);
        default:
          return allConversations.filter(function (conversation) {
            return (_this4._appFeatures.hasReadTextPermission || !(0, _messageHelper.messageIsTextMessage)(conversation)) && (_this4._appFeatures.hasVoicemailPermission || !(0, _messageHelper.messageIsVoicemail)(conversation)) && (_this4._appFeatures.hasReadFaxPermission || !(0, _messageHelper.messageIsFax)(conversation));
          });
      }
    }
  }, {
    key: "typeFilteredConversationsMap",
    get: function get() {
      var _this5 = this;
      return this.filteredConversations.reduce(function (acc, conversation) {
        if ((0, _messageHelper.messageIsTextMessage)(conversation)) {
          // only push when has read text permission
          if (_this5._appFeatures.hasReadTextPermission && (0, _messageHelper.messageReadStatusMatched)(_this5.readStatusFilterMap[_messageTypes.messageTypes.text], conversation)) {
            acc[_messageTypes.messageTypes.text].push(conversation);
          }
        } else if ((0, _messageHelper.messageIsVoicemail)(conversation)) {
          if (_this5._appFeatures.hasVoicemailPermission && (0, _messageHelper.messageReadStatusMatched)(_this5.readStatusFilterMap[_messageTypes.messageTypes.voiceMail], conversation)) {
            acc[_messageTypes.messageTypes.voiceMail].push(conversation);
          }
        } else if ((0, _messageHelper.messageIsFax)(conversation)) {
          if (_this5._appFeatures.hasReadFaxPermission && (0, _messageHelper.messageReadStatusMatched)(_this5.readStatusFilterMap[_messageTypes.messageTypes.fax], conversation)) {
            acc[_messageTypes.messageTypes.fax].push(conversation);
          }
        }
        return acc;
      }, _defineProperty(_defineProperty(_defineProperty({}, _messageTypes.messageTypes.text, []), _messageTypes.messageTypes.voiceMail, []), _messageTypes.messageTypes.fax, []));
    }
  }, {
    key: "formattedConversations",
    get: function get() {
      var _this6 = this;
      var conversations = this.typeFilteredConversations;
      var extensionNumber = this._extensionInfo.extensionNumber;
      var contactMapping = this._contactMatcher && this._contactMatcher.dataMapping || {};
      var loggingMap = this._conversationLogger && this._conversationLogger.loggingMap || {};
      var conversationLogMapping = this._conversationLogger && this._conversationLogger.dataMapping || {};
      var accessToken = this._auth.accessToken;
      return conversations.map(function (message) {
        var result = (0, _messageHelper.getNumbersFromMessage)({
          extensionNumber: extensionNumber,
          message: message
        });
        var correspondents = result.correspondents || [];
        var self = result.self;
        var selfNumber = self && (self.phoneNumber || self.extensionNumber);
        var selfMatches = selfNumber && contactMapping[selfNumber] || [];
        var correspondentMatchesList = [];
        var correspondentMatches = correspondents.reduce(function (acc, curr) {
          var phoneNumber = curr.phoneNumber || curr.extensionNumber;

          // in new version correspondentMatchesList also same index as correspondents list one by one for easily to know the correspondent's matches
          if (process.env.THEME_SYSTEM === 'spring-ui') {
            correspondentMatchesList.push(contactMapping[phoneNumber] || []);
          }
          return phoneNumber && contactMapping[phoneNumber] && contactMapping[phoneNumber].length ? acc.concat(contactMapping[phoneNumber]) : acc;
        }, []);
        var conversationLogId = _this6._conversationLogger ? _this6._conversationLogger.getConversationLogId(message) : null;
        var isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
        var conversationMatches = conversationLogMapping[conversationLogId] || [];
        var voicemailAttachment = null;
        if ((0, _messageHelper.messageIsVoicemail)(message)) {
          voicemailAttachment = (0, _messageHelper.getVoicemailAttachment)(message, accessToken);
        }
        var faxAttachment = null;
        if ((0, _messageHelper.messageIsFax)(message)) {
          faxAttachment = (0, _messageHelper.getFaxAttachment)(message, accessToken);
        }
        var unreadCounts = message.unreadCounts;
        if (typeof unreadCounts === 'undefined') {
          unreadCounts = (0, _messageHelper.messageIsUnread)(message) ? 1 : 0;
        }
        var mmsAttachments = [];
        if ((0, _messageHelper.messageIsTextMessage)(message) && _this6._showMMSAttachment) {
          mmsAttachments = (0, _messageHelper.getMMSAttachments)(message, accessToken);
        }
        return _objectSpread(_objectSpread({}, message), {}, {
          unreadCounts: unreadCounts,
          self: self,
          selfMatches: selfMatches,
          correspondents: correspondents,
          correspondentMatches: correspondentMatches,
          correspondentMatchesList: correspondentMatchesList,
          conversationLogId: conversationLogId,
          isLogging: isLogging,
          conversationMatches: conversationMatches,
          voicemailAttachment: voicemailAttachment,
          faxAttachment: faxAttachment,
          mmsAttachments: mmsAttachments,
          lastMatchedCorrespondentEntity: _this6._conversationLogger && _this6._conversationLogger.getLastMatchedCorrespondentEntity(message) || null
        });
      });
    }
  }, {
    key: "formattedConversationsMap",
    get: function get() {
      return new Map(this.formattedConversations.map(function (conversation) {
        return [conversation.conversationId, conversation];
      }));
    }
  }, {
    key: "filteredConversations",
    get: function get() {
      var _this7 = this;
      var conversations = this.formattedConversations;
      var effectiveSearchString = this.effectiveSearchString;
      if (effectiveSearchString === '') {
        return conversations;
      }
      var searchResults = [];
      var cleanRegex = /[^\d*+#\s]/g;
      var searchString = effectiveSearchString.toLowerCase();
      var searchNumber = effectiveSearchString.replace(cleanRegex, '');
      conversations.forEach(function (message) {
        if (searchNumber === effectiveSearchString) {
          var cleanedNumber = (0, _cleanNumber["default"])(effectiveSearchString);
          if (message.correspondents.find(function (contact) {
            return (0, _cleanNumber["default"])(contact.phoneNumber || contact.extensionNumber || '').indexOf(cleanedNumber) > -1;
          })) {
            // match by phoneNumber or extensionNumber
            searchResults.push(_objectSpread(_objectSpread({}, message), {}, {
              matchOrder: 0
            }));
            return;
          }
        }
        if (message.correspondentMatches.length) {
          if (message.correspondentMatches.find(function (entity) {
            return (entity.name || '').toLowerCase().indexOf(searchString) > -1;
          })) {
            // match by entity's name
            searchResults.push(_objectSpread(_objectSpread({}, message), {}, {
              matchOrder: 0
            }));
            return;
          }
        } else if (message.correspondents.find(function (contact) {
          return (contact.name || '').toLowerCase().indexOf(searchString) > -1;
        })) {
          searchResults.push(_objectSpread(_objectSpread({}, message), {}, {
            matchOrder: 0
          }));
          return;
        }

        // try match messages of the same conversation
        if ((message.subject || '').toLowerCase().indexOf(searchString) > -1) {
          searchResults.push(_objectSpread(_objectSpread({}, message), {}, {
            matchOrder: 1
          }));
          return;
        }
        var messageList = _this7._messageStore.conversationStore[message.conversationId] || [];
        var matchedMessage = messageList.find(function (item) {
          return (item.subject || '').toLowerCase().indexOf(searchString) > -1;
        });
        if (matchedMessage) {
          searchResults.push(_objectSpread(_objectSpread({}, message), {}, {
            matchedMessage: matchedMessage,
            matchOrder: 1
          }));
        }
      });
      return searchResults.sort(_messageHelper.sortSearchResults);
    }
  }, {
    key: "pagingConversations",
    get: function get() {
      var pageNumber = this.currentPage;
      var lastIndex = pageNumber * this._perPage;
      return this.filteredConversations.slice(0, lastIndex);
    }
  }, {
    key: "earliestTime",
    get: function get() {
      return getEarliestTime(this.typeFilteredConversations);
    }
  }, {
    key: "currentConversation",
    get: function get() {
      var conversationId = this.currentConversationId;
      return this.getConversationFullInfo(conversationId);
    }
  }, {
    key: "getConversationFullInfo",
    value: function getConversationFullInfo(conversationId) {
      var _ref2;
      var extensionNumber = this._extensionInfo.extensionNumber;
      var contactMapping = this._contactMatcher && this._contactMatcher.dataMapping || {};
      var conversationLogMapping = this._conversationLogger && this._conversationLogger.dataMapping || {};
      var loggingMap = this._conversationLogger && this._conversationLogger.loggingMap || {};
      var conversation = this.allConversationsMap.get(conversationId);
      var currentConversation = _objectSpread({}, conversation);
      var result = (0, _messageHelper.getNumbersFromMessage)({
        extensionNumber: extensionNumber,
        message: conversation
      });
      var correspondents = (_ref2 = result.correspondents) !== null && _ref2 !== void 0 ? _ref2 : [];
      var correspondentMatches = correspondents.reduce(function (matches, contact) {
        var number = contact && (contact.phoneNumber || contact.extensionNumber);
        return number && contactMapping[number] && contactMapping[number].length ? matches.concat(contactMapping[number]) : matches;
      }, []);
      var conversationLogId = this._conversationLogger ? this._conversationLogger.getConversationLogId(conversation) : null;
      var conversationMatches = conversationLogMapping[conversationLogId] || [];
      currentConversation.conversationLogId = conversationLogId;
      currentConversation.correspondents = correspondents;
      currentConversation.correspondentMatches = correspondentMatches;
      currentConversation.conversationMatches = conversationMatches;
      var allMessages = this.getMessages(conversationId, true);
      currentConversation.messages = allMessages.reverse();
      currentConversation.senderNumber = (0, _messageHelper.getMyNumberFromMessage)({
        message: conversation,
        myExtensionNumber: this._extensionInfo.extensionNumber
      });
      currentConversation.recipients = (0, _messageHelper.getRecipientNumbersFromMessage)({
        message: conversation,
        myNumber: currentConversation.senderNumber
      });
      currentConversation.isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
      currentConversation.lastMatchedCorrespondentEntity = this._conversationLogger && conversation && this._conversationLogger.getLastMatchedCorrespondentEntity(conversation) || null;
      return currentConversation;
    }
  }, {
    key: "getMessages",
    value: function getMessages(conversationId) {
      var _this8 = this;
      var withOldMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var messages = this._messageStore.conversationStore[conversationId] || [];
      var oldMessages = withOldMessages ? this.oldMessages : [];
      var accessToken = this._auth.accessToken;
      return mergeMessages(messages, oldMessages).map(function (m) {
        if (!_this8._showMMSAttachment) {
          return m;
        }
        var mmsAttachments = (0, _messageHelper.getMMSAttachments)(m, accessToken);
        return _objectSpread(_objectSpread({}, m), {}, {
          mmsAttachments: mmsAttachments
        });
      });
    }
  }, {
    key: "messageText",
    get: function get() {
      var conversationId = this.currentConversationId;
      if (!conversationId) {
        return '';
      }
      var res = this.inputContents[conversationId];
      return res ? res.text : '';
    }
  }, {
    key: "attachments",
    get: function get() {
      var conversationId = this.currentConversationId;
      if (!conversationId) {
        return [];
      }
      var res = this.inputContents[conversationId];
      return res ? res.attachments : [];
    }
  }, {
    key: "loadingOldConversations",
    get: function get() {
      return this.fetchConversationsStatus === _conversationsStatus.conversationsStatus.fetching;
    }
  }, {
    key: "loadingOldMessages",
    get: function get() {
      return this.fetchMessagesStatus === _conversationsStatus.conversationsStatus.fetching;
    }
  }, {
    key: "pushing",
    get: function get() {
      var conversationId = this.currentConversationId;
      if (!conversationId) {
        return false;
      }
      return this.conversationStatus[conversationId] === _conversationsStatus.conversationsStatus.pushing;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._appFeatures.hasReadMessagesPermission;
    }
  }, {
    key: "addEntities",
    value: function addEntities(entities) {
      this._addCorrespondentMatchEntities(entities);
    }
  }, {
    key: "removeEntity",
    value: function removeEntity(entity) {
      this._removeCorrespondentMatchEntity(entity);
    }
  }, {
    key: "addResponses",
    value: function addResponses(responses) {
      this._addCorrespondentResponses(responses);
    }
  }, {
    key: "removeResponse",
    value: function removeResponse(phoneNumber) {
      this._removeCorrespondentResponses(phoneNumber);
    }
  }, {
    key: "relateCorrespondentEntity",
    value: function relateCorrespondentEntity(responses) {
      var _this9 = this;
      if (!this._contactMatcher || !this._conversationLogger || !this.correspondentMatch.length) {
        return;
      }
      this.addResponses(responses);
      var _this$_regionSettings = this._regionSettings,
        countryCode = _this$_regionSettings.countryCode,
        areaCode = _this$_regionSettings.areaCode;
      var formattedCorrespondentMatch = this.correspondentMatch.map(function (item) {
        var formatted = (0, _normalizeNumber.normalizeNumber)({
          phoneNumber: item.phoneNumber,
          countryCode: countryCode,
          areaCode: areaCode,
          removeExtension: false
        });
        return {
          phoneNumber: formatted,
          id: item.rawId
        };
      });
      formattedCorrespondentMatch.forEach(function (item) {
        var phoneNumber = item.phoneNumber;
        var conversationId = _this9.correspondentResponse[phoneNumber];
        var conversationLogger = _this9._conversationLogger;
        if (conversationLogger) {
          if (conversationLogger.autoLog) {
            conversationLogger.logConversation({
              entity: item,
              conversationId: conversationId
            });
          }
        }
        _this9.removeEntity(item);
        _this9.removeResponse(phoneNumber);
      });
    }

    /**
     * use phone number and current all senderNumbersList to find all matching conversations
     */
  }, {
    key: "getConversationByPhoneNumbers",
    value: function getConversationByPhoneNumbers(phoneNumbers) {
      var _this$_messageSender5;
      var senderNumbersList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ((_this$_messageSender5 = this._messageSender) === null || _this$_messageSender5 === void 0 ? void 0 : _this$_messageSender5.senderNumbersList) || [];
      var matchingConversations = [];
      var latestConversation = undefined;
      var latestTime = 0;
      var _iterator2 = _createForOfIteratorHelper(senderNumbersList),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var senderNumber = _step2.value;
          var currentUniqueId = (0, _helper.buildConversationId)(phoneNumbers, senderNumber.phoneNumber);
          var conversation = this.allConversationsInfo.uniqueConversationMap.get(currentUniqueId);
          if (conversation) {
            matchingConversations.push(conversation);
            var conversationTime = conversation.lastModifiedTime || 0;
            if (conversationTime > latestTime) {
              latestTime = conversationTime;
              latestConversation = conversation;
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return {
        conversations: matchingConversations,
        latest: latestConversation
      };
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "searchInput", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "typeFilter", [_nextCore.state, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _messageTypes.messageTypes.all;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "readStatusFilterMap", [_nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _messageTypes.messageTypes.all, 'All'), _messageTypes.messageTypes.text, 'All'), _messageTypes.messageTypes.voiceMail, 'All'), _messageTypes.messageTypes.fax, 'All'), _messageTypes.messageTypes.pager, 'All'), _messageTypes.messageTypes.sms, 'All');
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "oldConversations", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "currentPage", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "fetchConversationsStatus", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _conversationsStatus.conversationsStatus.idle;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "currentConversationId", [_nextCore.state, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "oldMessages", [_nextCore.state, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "fetchMessagesStatus", [_nextCore.state, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _conversationsStatus.conversationsStatus.idle;
  }
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "inputContents", [_nextCore.state, _dec1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor1 = _applyDecoratedDescriptor(_class2.prototype, "conversationStatus", [_nextCore.state, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "correspondentMatch", [_nextCore.state, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "correspondentResponse", [_nextCore.state, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateSearchInput", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateTypeFilter", [_nextCore.action, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateTypeFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateReadStatusFilterMap", [_nextCore.action, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateReadStatusFilterMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateFetchConversationsStatus", [_nextCore.action, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFetchConversationsStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchOldConversationsSuccess", [_nextCore.action, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchOldConversationsSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_deleteOldConversation", [_nextCore.action, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "_deleteOldConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_cleanOldConversations", [_nextCore.action, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "_cleanOldConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_increaseCurrentPage", [_nextCore.action, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "_increaseCurrentPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetCurrentPage", [_nextCore.action, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetCurrentPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateCurrentConversationId", [_nextCore.action, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateCurrentConversationId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateFetchMessagesStatus", [_nextCore.action, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFetchMessagesStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchOldMessagesSuccess", [_nextCore.action, _dec35, _dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchOldMessagesSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMessageText", [_nextCore.action, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addAttachment", [_nextCore.action, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "_addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeAttachment", [_nextCore.action, _dec41, _dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeInputContent", [_nextCore.action, _dec43, _dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeInputContent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateConversationStatus", [_nextCore.action, _dec45, _dec46], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateConversationStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addCorrespondentMatchEntities", [_nextCore.action, _dec47, _dec48], Object.getOwnPropertyDescriptor(_class2.prototype, "_addCorrespondentMatchEntities"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeCorrespondentMatchEntity", [_nextCore.action, _dec49, _dec50], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeCorrespondentMatchEntity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addCorrespondentResponses", [_nextCore.action, _dec51, _dec52], Object.getOwnPropertyDescriptor(_class2.prototype, "_addCorrespondentResponses"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeCorrespondentResponses", [_nextCore.action, _dec53, _dec54], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeCorrespondentResponses"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetAllStatus", [_nextCore.action, _dec55, _dec56], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetAllStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldTriggerMatchConditions", [_nextCore.computed, _dec57, _dec58], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldTriggerMatchConditions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSearchInput", [_dec59, _dec60, _dec61], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTypeFilter", [_dec62, _dec63, _dec64], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTypeFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateReadStatusFilterMap", [_dec65, _dec66, _dec67], Object.getOwnPropertyDescriptor(_class2.prototype, "updateReadStatusFilterMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchOldConversations", [_dec68, _dec69, _dec70], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchOldConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadNextPage", [_dec71, _dec72, _dec73], Object.getOwnPropertyDescriptor(_class2.prototype, "loadNextPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetCurrentPage", [_dec74, _dec75, _dec76], Object.getOwnPropertyDescriptor(_class2.prototype, "resetCurrentPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadConversation", [_dec77, _dec78, _dec79], Object.getOwnPropertyDescriptor(_class2.prototype, "loadConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unloadConversation", [_dec80, _dec81, _dec82], Object.getOwnPropertyDescriptor(_class2.prototype, "unloadConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchOldMessages", [_dec83, _dec84, _dec85], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchOldMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMessageText", [_dec86, _dec87, _dec88], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachments", [_dec89, _dec90, _dec91], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachments"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachment", [_dec92, _dec93, _dec94], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAttachment", [_dec95, _dec96, _dec97], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyToReceivers", [_dec98, _dec99, _dec100], Object.getOwnPropertyDescriptor(_class2.prototype, "replyToReceivers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteConversation", [_dec101, _dec102, _dec103], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allConversations", [_nextCore.computed, _dec104, _dec105], Object.getOwnPropertyDescriptor(_class2.prototype, "allConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_nextCore.computed, _dec106, _dec107], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allConversationsInfo", [_nextCore.computed, _dec108, _dec109], Object.getOwnPropertyDescriptor(_class2.prototype, "allConversationsInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "effectiveSearchString", [_nextCore.computed, _dec110, _dec111], Object.getOwnPropertyDescriptor(_class2.prototype, "effectiveSearchString"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "typeFilteredConversations", [_nextCore.computed, _dec112, _dec113], Object.getOwnPropertyDescriptor(_class2.prototype, "typeFilteredConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "typeFilteredConversationsMap", [_nextCore.computed, _dec114, _dec115], Object.getOwnPropertyDescriptor(_class2.prototype, "typeFilteredConversationsMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "formattedConversations", [_nextCore.computed, _dec116, _dec117], Object.getOwnPropertyDescriptor(_class2.prototype, "formattedConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "formattedConversationsMap", [_nextCore.computed, _dec118, _dec119], Object.getOwnPropertyDescriptor(_class2.prototype, "formattedConversationsMap"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filteredConversations", [_nextCore.computed, _dec120, _dec121], Object.getOwnPropertyDescriptor(_class2.prototype, "filteredConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pagingConversations", [_nextCore.computed, _dec122, _dec123], Object.getOwnPropertyDescriptor(_class2.prototype, "pagingConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "earliestTime", [_nextCore.computed, _dec124, _dec125], Object.getOwnPropertyDescriptor(_class2.prototype, "earliestTime"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentConversation", [_nextCore.computed, _dec126, _dec127], Object.getOwnPropertyDescriptor(_class2.prototype, "currentConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "messageText", [_nextCore.computed, _dec128, _dec129], Object.getOwnPropertyDescriptor(_class2.prototype, "messageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "attachments", [_nextCore.computed, _dec130, _dec131], Object.getOwnPropertyDescriptor(_class2.prototype, "attachments"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=ConversationsBase.js.map
