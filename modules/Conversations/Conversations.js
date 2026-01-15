"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
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
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PER_PAGE = exports.DEFAULT_DAY_SPAN = exports.Conversations = void 0;
exports.getUniqueNumbers = getUniqueNumbers;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-iso-string.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _core = require("@ringcentral-integration/core");
var _messageDirection = require("../../enums/messageDirection");
var _messageTypes = require("../../enums/messageTypes");
var _cleanNumber = _interopRequireDefault(require("../../lib/cleanNumber"));
var _di = require("../../lib/di");
var _messageHelper = require("../../lib/messageHelper");
var _normalizeNumber = require("../../lib/normalizeNumber");
var _proxify = require("../../lib/proxy/proxify");
var _MessageSender = require("../MessageSender");
var _conversationsStatus = require("./conversationsStatus");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor0, _descriptor1, _descriptor10;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    tmp[element.id] = 1;
  });
  oldMessages.forEach(function (element) {
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    if (!tmp[element.id]) {
      currentMessages.push(element);
    }
  });
  return currentMessages;
}
function getEarliestTime(messages) {
  var newTime = Date.now();
  messages.forEach(function (message) {
    // @ts-expect-error TS(2769): No overload matches this call.
    var creationTime = new Date(message.creationTime).getTime();
    if (creationTime < newTime) {
      newTime = creationTime;
    }
  });
  return newTime;
}
function getUniqueNumbers(conversations) {
  var output = [];
  var numberMap = {};
  function addIfNotExist(number) {
    if (number && !numberMap[number]) {
      output.push(number);
      numberMap[number] = true;
    }
  }
  conversations.forEach(function (message) {
    if (message.from && message.direction === _messageDirection.messageDirection.inbound) {
      var fromNumber = message.from.phoneNumber || message.from.extensionNumber;
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      addIfNotExist(fromNumber);
    }
    if (message.to && message.to.length > 0 && message.direction === _messageDirection.messageDirection.outbound) {
      message.to.forEach(function (toNumber) {
        if (!toNumber) {
          return;
        }
        var toPhoneNumber = toNumber.phoneNumber || toNumber.extensionNumber;
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        addIfNotExist(toPhoneNumber);
      });
    }
  });
  return output;
}
var DEFAULT_PER_PAGE = exports.DEFAULT_PER_PAGE = 20;
var DEFAULT_DAY_SPAN = exports.DEFAULT_DAY_SPAN = 90;
var Conversations = exports.Conversations = (_dec = (0, _di.Module)({
  name: 'Conversations',
  deps: ['Alert', 'Auth', 'Client', 'MessageSender', 'ExtensionInfo', 'MessageStore', 'AppFeatures', 'RegionSettings', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ConversationLogger',
    optional: true
  }, {
    dep: 'ConversationsOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var allUniqueNumbers = _ref.allUniqueNumbers,
    currentPage = _ref.currentPage,
    typeFilter = _ref.typeFilter,
    effectiveSearchString = _ref.effectiveSearchString;
  return [allUniqueNumbers, currentPage, typeFilter, effectiveSearchString];
}), _dec3 = (0, _core.computed)(function (that) {
  return [that._deps.messageStore.allConversations, that.oldConversations];
}), _dec4 = (0, _core.computed)(function (_ref2) {
  var pagingConversations = _ref2.pagingConversations;
  return [pagingConversations];
}), _dec5 = (0, _core.computed)(function (_ref3) {
  var pagingConversations = _ref3.pagingConversations;
  return [pagingConversations];
}), _dec6 = (0, _core.computed)(function (_ref4) {
  var searchInput = _ref4.searchInput;
  return [searchInput];
}), _dec7 = (0, _core.computed)(function (_ref5) {
  var allConversations = _ref5.allConversations,
    typeFilter = _ref5.typeFilter;
  return [allConversations, typeFilter];
}), _dec8 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa, _that$_deps$conversat, _that$_deps$conversat2;
  return [that.typeFilteredConversations, that._deps.extensionInfo.extensionNumber, (_that$_deps$contactMa = that._deps.contactMatcher) === null || _that$_deps$contactMa === void 0 ? void 0 : _that$_deps$contactMa.dataMapping, (_that$_deps$conversat = that._deps.conversationLogger) === null || _that$_deps$conversat === void 0 ? void 0 : _that$_deps$conversat.loggingMap, (_that$_deps$conversat2 = that._deps.conversationLogger) === null || _that$_deps$conversat2 === void 0 ? void 0 : _that$_deps$conversat2.dataMapping, that._deps.auth.accessToken];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.formattedConversations, that.effectiveSearchString, that._deps.messageStore.conversationStore];
}), _dec0 = (0, _core.computed)(function (_ref6) {
  var filteredConversations = _ref6.filteredConversations,
    currentPage = _ref6.currentPage;
  return [filteredConversations, currentPage];
}), _dec1 = (0, _core.computed)(function (_ref7) {
  var typeFilteredConversations = _ref7.typeFilteredConversations;
  return [typeFilteredConversations];
}), _dec10 = (0, _core.computed)(function (that) {
  var _that$_deps$contactMa2, _that$_deps$conversat3, _that$_deps$conversat4;
  return [that.currentConversationId, that._deps.extensionInfo.extensionNumber, (_that$_deps$contactMa2 = that._deps.contactMatcher) === null || _that$_deps$contactMa2 === void 0 ? void 0 : _that$_deps$contactMa2.dataMapping, that.oldMessages, that._deps.messageStore.conversationStore, that.allConversations, that._deps.auth.accessToken, (_that$_deps$conversat3 = that._deps.conversationLogger) === null || _that$_deps$conversat3 === void 0 ? void 0 : _that$_deps$conversat3.dataMapping, (_that$_deps$conversat4 = that._deps.conversationLogger) === null || _that$_deps$conversat4 === void 0 ? void 0 : _that$_deps$conversat4.loggingMap];
}), _dec11 = (0, _core.computed)(function (_ref8) {
  var inputContents = _ref8.inputContents,
    currentConversationId = _ref8.currentConversationId;
  return [inputContents, currentConversationId];
}), _dec12 = (0, _core.computed)(function (_ref9) {
  var inputContents = _ref9.inputContents,
    currentConversationId = _ref9.currentConversationId;
  return [inputContents, currentConversationId];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function Conversations(deps) {
    var _this$_deps$conversat, _this$_deps$conversat2, _this$_deps$conversat3, _this$_deps$conversat4, _this$_deps$conversat5, _this$_deps$conversat6, _this$_deps$conversat7, _this$_deps$conversat8, _this$_deps$conversat9, _this$_deps$conversat0;
    var _this;
    _classCallCheck(this, Conversations);
    _this = _callSuper(this, Conversations, [{
      deps: deps
    }]);
    _this._olderDataExisted = true;
    _this._olderMessagesExisted = true;
    _this._perPage = void 0;
    _this._daySpan = void 0;
    _this._enableLoadOldMessages = void 0;
    _this._showMMSAttachment = void 0;
    _this._enableContactMatch = void 0;
    _initializerDefineProperty(_this, "searchInput", _descriptor, _this);
    _initializerDefineProperty(_this, "typeFilter", _descriptor2, _this);
    _initializerDefineProperty(_this, "oldConversations", _descriptor3, _this);
    _initializerDefineProperty(_this, "currentPage", _descriptor4, _this);
    _initializerDefineProperty(_this, "fetchConversationsStatus", _descriptor5, _this);
    _initializerDefineProperty(_this, "currentConversationId", _descriptor6, _this);
    _initializerDefineProperty(_this, "oldMessages", _descriptor7, _this);
    _initializerDefineProperty(_this, "fetchMessagesStatus", _descriptor8, _this);
    _initializerDefineProperty(_this, "inputContents", _descriptor9, _this);
    _initializerDefineProperty(_this, "conversationStatus", _descriptor0, _this);
    _initializerDefineProperty(_this, "correspondentMatch", _descriptor1, _this);
    _initializerDefineProperty(_this, "correspondentResponse", _descriptor10, _this);
    _this._perPage = (_this$_deps$conversat = (_this$_deps$conversat2 = _this._deps.conversationsOptions) === null || _this$_deps$conversat2 === void 0 ? void 0 : _this$_deps$conversat2.perPage) !== null && _this$_deps$conversat !== void 0 ? _this$_deps$conversat : DEFAULT_PER_PAGE;
    _this._daySpan = (_this$_deps$conversat3 = (_this$_deps$conversat4 = _this._deps.conversationsOptions) === null || _this$_deps$conversat4 === void 0 ? void 0 : _this$_deps$conversat4.daySpan) !== null && _this$_deps$conversat3 !== void 0 ? _this$_deps$conversat3 : DEFAULT_DAY_SPAN;
    _this._enableLoadOldMessages = (_this$_deps$conversat5 = (_this$_deps$conversat6 = _this._deps.conversationsOptions) === null || _this$_deps$conversat6 === void 0 ? void 0 : _this$_deps$conversat6.enableLoadOldMessages) !== null && _this$_deps$conversat5 !== void 0 ? _this$_deps$conversat5 : false;
    _this._showMMSAttachment = (_this$_deps$conversat7 = (_this$_deps$conversat8 = _this._deps.conversationsOptions) === null || _this$_deps$conversat8 === void 0 ? void 0 : _this$_deps$conversat8.showMMSAttachment) !== null && _this$_deps$conversat7 !== void 0 ? _this$_deps$conversat7 : false;
    _this._enableContactMatch = (_this$_deps$conversat9 = (_this$_deps$conversat0 = _this._deps.conversationsOptions) === null || _this$_deps$conversat0 === void 0 ? void 0 : _this$_deps$conversat0.enableContactMatch) !== null && _this$_deps$conversat9 !== void 0 ? _this$_deps$conversat9 : true;
    _this._deps.messageSender.on(_this._deps.messageSender.events.send, function (_ref0) {
      var toNumbers = _ref0.toNumbers;
      _this.addEntities(toNumbers.map(function (number) {
        return {
          phoneNumber: number
        };
      }));
    });
    if (_this._deps.contactMatcher && _this._enableContactMatch) {
      _this._deps.contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._deps.messageStore.ready;
        }
      });
    }
    return _this;
  }
  _inherits(Conversations, _RcModuleV);
  return _createClass(Conversations, [{
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
      var existedContent = this.inputContents.find(function (content) {
        return content.conversationId === conversationId;
      });
      if (existedContent) {
        existedContent.text = text;
      } else {
        this.inputContents.push({
          conversationId: conversationId,
          text: text,
          attachments: []
        });
      }
    }
  }, {
    key: "_addAttachment",
    value: function _addAttachment(conversationId, attachment) {
      var existedContent = this.inputContents.find(function (content) {
        return content.conversationId === conversationId;
      });
      if (existedContent) {
        var attachments = (existedContent.attachments || []).filter(function (f) {
          return f.name !== attachment.name;
        });
        attachments.push(attachment);
        existedContent.attachments = attachments;
      } else {
        this.inputContents.push({
          conversationId: conversationId,
          text: '',
          attachments: [attachment]
        });
      }
    }
  }, {
    key: "_removeAttachment",
    value: function _removeAttachment(conversationId, attachment) {
      var existedContent = this.inputContents.find(function (content) {
        return content.conversationId === conversationId;
      });
      if (existedContent) {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        existedContent.attachments = existedContent.attachments.filter(function (f) {
          return f.name !== attachment.name;
        });
      }
    }
  }, {
    key: "_removeInputContent",
    value: function _removeInputContent(conversationId) {
      this.inputContents = this.inputContents.filter(function (msg) {
        return _typeof(msg) === 'object' && msg.conversationId !== conversationId;
      });
    }
  }, {
    key: "_updateConversationStatus",
    value: function _updateConversationStatus(status) {
      this.conversationStatus = status;
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
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
      this.currentConversationId = null;
      this.oldMessages = [];
      this.fetchMessagesStatus = _conversationsStatus.conversationsStatus.idle;
      this.inputContents = [];
      this.conversationStatus = _conversationsStatus.conversationsStatus.idle;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_superPropGet(Conversations, "_shouldInit", this, 3)([]) && this._deps.auth.loggedIn);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_superPropGet(Conversations, "_shouldReset", this, 3)([]) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "onInit",
    value: function onInit() {
      if (this._deps.contactMatcher) {
        this._deps.contactMatcher.triggerMatch();
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
      (0, _core.watch)(this, function () {
        return _this2.shouldTriggerMatchConditions;
      }, function () {
        if (_this2._deps.contactMatcher && _this2.ready) {
          _this2._deps.contactMatcher.triggerMatch();
        }
      });
      (0, _core.watch)(this, function () {
        return _this2._deps.messageStore.allConversations;
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
      return [this.allUniqueNumbers, this.currentPage, this.typeFilter, this.effectiveSearchString];
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
    key: "fetchOldConversations",
    value: function () {
      var _fetchOldConversations = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var dateFrom, dateTo, typeFilter, currentPage, params, _yield$this$_deps$cli, records, recordsLength, isIncreaseCurrentPage, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (this._olderDataExisted) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              if (!this.loadingOldConversations) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2);
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
              _context3.p = 3;
              _context3.n = 4;
              return this._deps.client.account().extension().messageStore()
              // @ts-expect-error TS(2345): Argument of type 'ListMessagesParameters' is not a... Remove this comment to see the full error message
              .list(params);
            case 4:
              _yield$this$_deps$cli = _context3.v;
              records = _yield$this$_deps$cli.records;
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              recordsLength = records.length;
              this._olderDataExisted = recordsLength === this._perPage;
              if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
                isIncreaseCurrentPage = recordsLength && this._perPage * this.currentPage < recordsLength + this.filteredConversations.length; // @ts-expect-error TS(2345): Argument of type 'GetMessageInfoResponse[] | undef... Remove this comment to see the full error message
                this._fetchOldConversationsSuccess(records, isIncreaseCurrentPage);
              }
              _context3.n = 6;
              break;
            case 5:
              _context3.p = 5;
              _t = _context3.v;
              if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
                this._updateFetchConversationsStatus(_conversationsStatus.conversationsStatus.idle);
              }
            case 6:
              return _context3.a(2);
          }
        }, _callee3, this, [[3, 5]]);
      }));
      function fetchOldConversations() {
        return _fetchOldConversations.apply(this, arguments);
      }
      return fetchOldConversations;
    }()
  }, {
    key: "loadNextPage",
    value: function () {
      var _loadNextPage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var currentPage;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              currentPage = this.currentPage;
              if (!(currentPage * this._perPage < this.filteredConversations.length)) {
                _context4.n = 1;
                break;
              }
              this._increaseCurrentPage();
              return _context4.a(2);
            case 1:
              if (!(this.effectiveSearchString !== '')) {
                _context4.n = 2;
                break;
              }
              return _context4.a(2);
            case 2:
              if (!(!this._enableLoadOldMessages || !this._hasPermission)) {
                _context4.n = 3;
                break;
              }
              return _context4.a(2);
            case 3:
              _context4.n = 4;
              return this.fetchOldConversations();
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function loadNextPage() {
        return _loadNextPage.apply(this, arguments);
      }
      return loadNextPage;
    }()
  }, {
    key: "resetCurrentPage",
    value: function () {
      var _resetCurrentPage2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this._resetCurrentPage();
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function resetCurrentPage() {
        return _resetCurrentPage2.apply(this, arguments);
      }
      return resetCurrentPage;
    }()
  }, {
    key: "loadConversation",
    value: function () {
      var _loadConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(conversationId) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!(conversationId === this.currentConversationId)) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              this._updateCurrentConversationId(conversationId);
            case 2:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function loadConversation(_x3) {
        return _loadConversation.apply(this, arguments);
      }
      return loadConversation;
    }()
  }, {
    key: "unloadConversation",
    value: function () {
      var _unloadConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
              this._updateCurrentConversationId(null);
              this._olderMessagesExisted = true;
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function unloadConversation() {
        return _unloadConversation.apply(this, arguments);
      }
      return unloadConversation;
    }()
  }, {
    key: "fetchOldMessages",
    value: function () {
      var _fetchOldMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var perPage,
          conversationId,
          dateFrom,
          earliestTime,
          dateTo,
          params,
          _yield$this$_deps$cli2,
          records,
          _args8 = arguments,
          _t2;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              perPage = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : this._perPage;
              if (this._enableLoadOldMessages) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2);
            case 1:
              if (this._hasPermission) {
                _context8.n = 2;
                break;
              }
              return _context8.a(2);
            case 2:
              if (this._olderMessagesExisted) {
                _context8.n = 3;
                break;
              }
              return _context8.a(2);
            case 3:
              if (!this.loadingOldMessages) {
                _context8.n = 4;
                break;
              }
              return _context8.a(2);
            case 4:
              if (this.currentConversationId) {
                _context8.n = 5;
                break;
              }
              return _context8.a(2);
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
              params = {
                conversationId: conversationId,
                perPage: perPage,
                dateFrom: dateFrom.toISOString(),
                dateTo: dateTo.toISOString()
              };
              _context8.p = 6;
              _context8.n = 7;
              return this._deps.client.account().extension().messageStore()
              // @ts-expect-error TS(2345): Argument of type 'ListMessagesParameters' is not a... Remove this comment to see the full error message
              .list(params);
            case 7:
              _yield$this$_deps$cli2 = _context8.v;
              records = _yield$this$_deps$cli2.records;
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._olderMessagesExisted = records.length === perPage;
              if (conversationId === this.currentConversationId) {
                // @ts-expect-error TS(2345): Argument of type 'GetMessageInfoResponse[] | undef... Remove this comment to see the full error message
                this._fetchOldMessagesSuccess(records);
              }
              _context8.n = 9;
              break;
            case 8:
              _context8.p = 8;
              _t2 = _context8.v;
              if (conversationId === this.currentConversationId) {
                this._updateFetchMessagesStatus(_conversationsStatus.conversationsStatus.idle);
              }
            case 9:
              return _context8.a(2);
          }
        }, _callee8, this, [[6, 8]]);
      }));
      function fetchOldMessages() {
        return _fetchOldMessages.apply(this, arguments);
      }
      return fetchOldMessages;
    }()
  }, {
    key: "_alertWarning",
    value: function _alertWarning(message) {
      if (message) {
        var ttlConfig = message !== _MessageSender.messageSenderMessages.noAreaCode ? {
          ttl: 0
        } : null;
        this._deps.alert.warning(_objectSpread({
          message: message
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
    key: "updateMessageText",
    value: function () {
      var _updateMessageText2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(text) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              if (!(text.length > 1000)) {
                _context9.n = 1;
                break;
              }
              return _context9.a(2, this._alertWarning(_MessageSender.messageSenderMessages.textTooLong));
            case 1:
              // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
              this._updateMessageText(this.currentConversationId, text);
            case 2:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function updateMessageText(_x4) {
        return _updateMessageText2.apply(this, arguments);
      }
      return updateMessageText;
    }()
  }, {
    key: "checkAttachmentOverLimit",
    value: function checkAttachmentOverLimit(attachments) {
      var oldAttachments = this.attachments;
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (oldAttachments.length + attachments.length > 10) {
        this._alertDanger(_MessageSender.messageSenderMessages.attachmentCountLimitation);
        return false;
      }
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      var size = [].concat(_toConsumableArray(oldAttachments), _toConsumableArray(attachments)).reduce(function (prev, curr) {
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
      var _addAttachments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(attachments) {
        var isValid, _iterator, _step, attachment;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              isValid = this.checkAttachmentOverLimit(attachments);
              if (isValid) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2);
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
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function addAttachments(_x5) {
        return _addAttachments.apply(this, arguments);
      }
      return addAttachments;
    }()
  }, {
    key: "addAttachment",
    value: function () {
      var _addAttachment2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(attachment) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
              this._addAttachment(this.currentConversationId, attachment);
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function addAttachment(_x6) {
        return _addAttachment2.apply(this, arguments);
      }
      return addAttachment;
    }()
  }, {
    key: "removeAttachment",
    value: function () {
      var _removeAttachment2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(attachment) {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
              this._removeAttachment(this.currentConversationId, attachment);
            case 1:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function removeAttachment(_x7) {
        return _removeAttachment2.apply(this, arguments);
      }
      return removeAttachment;
    }()
  }, {
    key: "replyToReceivers",
    value: function () {
      var _replyToReceivers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(text) {
        var attachments,
          responses,
          _args11 = arguments,
          _t3;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              attachments = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : [];
              this._updateConversationStatus(_conversationsStatus.conversationsStatus.pushing);
              _context11.p = 1;
              _context11.n = 2;
              return this._deps.messageSender.send({
                // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
                fromNumber: this._getFromNumber(),
                // @ts-expect-error TS(2322): Type '(string | undefined)[]' is not assignable to... Remove this comment to see the full error message
                toNumbers: this._getToNumbers(),
                text: text,
                attachments: attachments,
                // @ts-expect-error TS(2322): Type 'number | null' is not assignable to type 'nu... Remove this comment to see the full error message
                replyOnMessageId: this._getReplyOnMessageId()
              });
            case 2:
              responses = _context11.v;
              if (!(responses && responses[0])) {
                _context11.n = 3;
                break;
              }
              // @ts-expect-error TS(2345): Argument of type 'import("/Users/declan.zou/Projec... Remove this comment to see the full error message
              this._deps.messageStore.pushMessage(responses[0]);
              this._updateConversationStatus(_conversationsStatus.conversationsStatus.idle);
              // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
              this._removeInputContent(this.currentConversationId);
              return _context11.a(2, responses[0]);
            case 3:
              this._onReplyError();
              return _context11.a(2, null);
            case 4:
              _context11.p = 4;
              _t3 = _context11.v;
              this._onReplyError();
              throw _t3;
            case 5:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 4]]);
      }));
      function replyToReceivers(_x8) {
        return _replyToReceivers.apply(this, arguments);
      }
      return replyToReceivers;
    }()
  }, {
    key: "_onReplyError",
    value: function _onReplyError() {
      this._updateConversationStatus(_conversationsStatus.conversationsStatus.idle);
    }
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
      var _deleteConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(conversationId) {
        var conversation, _t4;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              if (conversationId) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2);
            case 1:
              if (!this._deps.messageStore.conversationStore[conversationId]) {
                _context12.n = 3;
                break;
              }
              _context12.n = 2;
              return this._deps.messageStore.deleteConversationMessages(conversationId);
            case 2:
              return _context12.a(2);
            case 3:
              conversation = this.allConversations.find(function (c) {
                return c.conversationId === conversationId;
              });
              if (conversation) {
                _context12.n = 4;
                break;
              }
              return _context12.a(2);
            case 4:
              if (!(0, _messageHelper.messageIsTextMessage)(conversation)) {
                _context12.n = 6;
                break;
              }
              _context12.n = 5;
              return this._deps.messageStore.deleteConversation(conversationId);
            case 5:
              return _context12.a(2);
            case 6:
              _context12.p = 6;
              _context12.n = 7;
              return this._deps.messageStore.deleteMessageApi(conversationId);
            case 7:
              this._deleteOldConversation(conversationId);
              _context12.n = 9;
              break;
            case 8:
              _context12.p = 8;
              _t4 = _context12.v;
              console.error(_t4);
            case 9:
              return _context12.a(2);
          }
        }, _callee12, this, [[6, 8]]);
      }));
      function deleteConversation(_x9) {
        return _deleteConversation.apply(this, arguments);
      }
      return deleteConversation;
    }()
  }, {
    key: "allConversations",
    get: function get() {
      var conversations = this._deps.messageStore.allConversations;
      var oldConversations = this.oldConversations;
      if (oldConversations.length === 0) {
        return conversations;
      }
      var newConversations = [];
      var conversationMap = {};
      var pushConversation = function pushConversation(c) {
        // use conversationId when available, use id for VoiceMail/Fax/etc..
        var cid = c.conversationId || c.id;
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        if (conversationMap[cid]) {
          return;
        }
        newConversations.push(c);
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
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
    key: "allUniqueNumbers",
    get: function get() {
      return getUniqueNumbers(this.allConversations);
    }
  }, {
    key: "effectiveSearchString",
    get: function get() {
      if (this.searchInput.length >= 3) {
        return this.searchInput;
      }
      return '';
    }
  }, {
    key: "typeFilteredConversations",
    get: function get() {
      var _this3 = this;
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
            return (_this3._deps.appFeatures.hasReadTextPermission || !(0, _messageHelper.messageIsTextMessage)(conversation)) && (_this3._deps.appFeatures.hasVoicemailPermission || !(0, _messageHelper.messageIsVoicemail)(conversation)) && (_this3._deps.appFeatures.hasReadFaxPermission || !(0, _messageHelper.messageIsFax)(conversation));
          });
      }
    }
  }, {
    key: "formattedConversations",
    get: function get() {
      var _this4 = this;
      var conversations = this.typeFilteredConversations;
      var extensionNumber = this._deps.extensionInfo.extensionNumber;
      var contactMapping = this._deps.contactMatcher && this._deps.contactMatcher.dataMapping || {};
      var loggingMap = this._deps.conversationLogger && this._deps.conversationLogger.loggingMap || {};
      var conversationLogMapping = this._deps.conversationLogger && this._deps.conversationLogger.dataMapping || {};
      var accessToken = this._deps.auth.accessToken;
      // @ts-expect-error TS(2322): Type '{ unreadCounts: number; self: any; selfMatch... Remove this comment to see the full error message
      return conversations.map(function (message) {
        var _getNumbersFromMessag = (0, _messageHelper.getNumbersFromMessage)({
            // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
            extensionNumber: extensionNumber,
            message: message
          }),
          self = _getNumbersFromMessag.self,
          correspondents = _getNumbersFromMessag.correspondents;
        var selfNumber = self && (self.phoneNumber || self.extensionNumber);
        var selfMatches = selfNumber && contactMapping[selfNumber] || [];
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        var correspondentMatches = correspondents.reduce(function (matches, contact) {
          var number = contact && (contact.phoneNumber || contact.extensionNumber);
          return number && contactMapping[number] && contactMapping[number].length ? matches.concat(contactMapping[number]) : matches;
        }, []);
        var conversationLogId = _this4._deps.conversationLogger ? _this4._deps.conversationLogger.getConversationLogId(message) : null;
        var isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
        var conversationMatches =
        // @ts-expect-error TS(2538): Type 'null' cannot be used as an index type.
        conversationLogMapping[conversationLogId] || [];
        var voicemailAttachment = null;
        if ((0, _messageHelper.messageIsVoicemail)(message)) {
          // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
          voicemailAttachment = (0, _messageHelper.getVoicemailAttachment)(message, accessToken);
        }
        var faxAttachment = null;
        if ((0, _messageHelper.messageIsFax)(message)) {
          // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
          faxAttachment = (0, _messageHelper.getFaxAttachment)(message, accessToken);
        }
        var unreadCounts = message.unreadCounts;
        if (typeof unreadCounts === 'undefined') {
          unreadCounts = (0, _messageHelper.messageIsUnread)(message) ? 1 : 0;
        }
        var mmsAttachments = [];
        if ((0, _messageHelper.messageIsTextMessage)(message) && _this4._showMMSAttachment) {
          // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
          mmsAttachments = (0, _messageHelper.getMMSAttachments)(message, accessToken);
        }
        return _objectSpread(_objectSpread({}, message), {}, {
          unreadCounts: unreadCounts,
          self: self,
          selfMatches: selfMatches,
          correspondents: correspondents,
          correspondentMatches: correspondentMatches,
          conversationLogId: conversationLogId,
          isLogging: isLogging,
          conversationMatches: conversationMatches,
          voicemailAttachment: voicemailAttachment,
          faxAttachment: faxAttachment,
          mmsAttachments: mmsAttachments,
          lastMatchedCorrespondentEntity: _this4._deps.conversationLogger && _this4._deps.conversationLogger.getLastMatchedCorrespondentEntity(
          // @ts-expect-error TS(2345): Argument of type 'Message' is not assignable to pa... Remove this comment to see the full error message
          message) || null
        });
      });
    }
  }, {
    key: "filteredConversations",
    get: function get() {
      var _this5 = this;
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
        var messageList =
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        _this5._deps.messageStore.conversationStore[message.conversationId] || [];
        // @ts-expect-error TS(2322): Type 'Message | undefined' is not assignable to ty... Remove this comment to see the full error message
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
      var _this6 = this;
      var conversationId = this.currentConversationId;
      var extensionNumber = this._deps.extensionInfo.extensionNumber;
      var contactMapping = this._deps.contactMatcher && this._deps.contactMatcher.dataMapping || {};
      var oldMessages = this.oldMessages;
      var conversationStore = this._deps.messageStore.conversationStore;
      var conversations = this.allConversations;
      var accessToken = this._deps.auth.accessToken;
      var conversationLogMapping = this._deps.conversationLogger && this._deps.conversationLogger.dataMapping || {};
      var loggingMap = this._deps.conversationLogger && this._deps.conversationLogger.loggingMap || {};
      var conversation = conversations.find(function (c) {
        return c.conversationId === conversationId;
      });
      var messages = [].concat(
      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      conversationStore[conversationId] || []);
      var currentConversation = _objectSpread({}, conversation);
      var allMessages = mergeMessages(messages, oldMessages).map(function (m) {
        if (!_this6._showMMSAttachment) {
          return m;
        }
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        var mmsAttachments = (0, _messageHelper.getMMSAttachments)(m, accessToken);
        return _objectSpread(_objectSpread({}, m), {}, {
          mmsAttachments: mmsAttachments
        });
      });
      var _getNumbersFromMessag2 = (0, _messageHelper.getNumbersFromMessage)({
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          extensionNumber: extensionNumber,
          // @ts-expect-error TS(2322): Type 'Message | undefined' is not assignable to ty... Remove this comment to see the full error message
          message: conversation
        }),
        _getNumbersFromMessag3 = _getNumbersFromMessag2.correspondents,
        correspondents = _getNumbersFromMessag3 === void 0 ? [] : _getNumbersFromMessag3;
      var correspondentMatches = correspondents.reduce(function (matches, contact) {
        var number = contact && (contact.phoneNumber || contact.extensionNumber);
        return number && contactMapping[number] && contactMapping[number].length ? matches.concat(contactMapping[number]) : matches;
      }, []);
      var conversationLogId = this._deps.conversationLogger ?
      // @ts-expect-error TS(2345): Argument of type 'Message | undefined' is not assi... Remove this comment to see the full error message
      this._deps.conversationLogger.getConversationLogId(conversation) : null;
      // @ts-expect-error TS(2538): Type 'null' cannot be used as an index type.
      var conversationMatches = conversationLogMapping[conversationLogId] || [];
      // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
      currentConversation.conversationLogId = conversationLogId;
      currentConversation.correspondents = correspondents;
      currentConversation.correspondentMatches = correspondentMatches;
      currentConversation.conversationMatches = conversationMatches;
      currentConversation.messages = allMessages.reverse();
      // @ts-expect-error TS(2322): Type 'MessageStoreCallerInfoResponseFrom | null | ... Remove this comment to see the full error message
      currentConversation.senderNumber = (0, _messageHelper.getMyNumberFromMessage)({
        // @ts-expect-error TS(2322): Type 'Message | undefined' is not assignable to ty... Remove this comment to see the full error message
        message: conversation,
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        myExtensionNumber: this._deps.extensionInfo.extensionNumber
      });
      currentConversation.recipients = (0, _messageHelper.getRecipientNumbersFromMessage)({
        // @ts-expect-error TS(2322): Type 'Message | undefined' is not assignable to ty... Remove this comment to see the full error message
        message: conversation,
        myNumber: currentConversation.senderNumber
      });
      currentConversation.isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
      // @ts-expect-error TS(2322): Type 'Entity | null' is not assignable to type 'La... Remove this comment to see the full error message
      currentConversation.lastMatchedCorrespondentEntity = this._deps.conversationLogger && conversation && this._deps.conversationLogger.getLastMatchedCorrespondentEntity(
      // @ts-expect-error TS(2345): Argument of type 'Message' is not assignable to pa... Remove this comment to see the full error message
      conversation) || null;
      return currentConversation;
    }
  }, {
    key: "messageText",
    get: function get() {
      var conversationId = this.currentConversationId;
      var res = this.inputContents.find(function (msg) {
        return _typeof(msg) === 'object' && msg.conversationId === conversationId;
      });
      return res ? res.text : '';
    }
  }, {
    key: "attachments",
    get: function get() {
      var conversationId = this.currentConversationId;
      var res = this.inputContents.find(function (msg) {
        return _typeof(msg) === 'object' && msg.conversationId === conversationId;
      });
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
      return this.conversationStatus === _conversationsStatus.conversationsStatus.pushing;
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._deps.appFeatures.hasReadMessagesPermission;
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
      var _this7 = this;
      if (!this._deps.contactMatcher || !this._deps.conversationLogger || !this.correspondentMatch.length) {
        return;
      }
      this.addResponses(responses);
      var _this$_deps$regionSet = this._deps.regionSettings,
        countryCode = _this$_deps$regionSet.countryCode,
        areaCode = _this$_deps$regionSet.areaCode;
      var formattedCorrespondentMatch = this.correspondentMatch.map(function (item) {
        var formatted = (0, _normalizeNumber.normalizeNumber)({
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
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
        var conversationId = _this7.correspondentResponse[phoneNumber];
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        if (_this7._deps.conversationLogger.autoLog) {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          _this7._deps.conversationLogger.logConversation({
            entity: item,
            conversationId: conversationId
          });
        }
        _this7.removeEntity(item);
        _this7.removeResponse(phoneNumber);
      });
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "searchInput", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "typeFilter", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _messageTypes.messageTypes.all;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "oldConversations", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentPage", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "fetchConversationsStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _conversationsStatus.conversationsStatus.idle;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "currentConversationId", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "oldMessages", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "fetchMessagesStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _conversationsStatus.conversationsStatus.idle;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "inputContents", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor0 = _applyDecoratedDescriptor(_class2.prototype, "conversationStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _conversationsStatus.conversationsStatus.idle;
  }
}), _descriptor1 = _applyDecoratedDescriptor(_class2.prototype, "correspondentMatch", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "correspondentResponse", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateSearchInput", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateTypeFilter", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateTypeFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateFetchConversationsStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFetchConversationsStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchOldConversationsSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchOldConversationsSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_deleteOldConversation", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_deleteOldConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_cleanOldConversations", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_cleanOldConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_increaseCurrentPage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_increaseCurrentPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetCurrentPage", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetCurrentPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateCurrentConversationId", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateCurrentConversationId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateFetchMessagesStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateFetchMessagesStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchOldMessagesSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchOldMessagesSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateMessageText", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addAttachment", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeAttachment", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeInputContent", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeInputContent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateConversationStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateConversationStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addCorrespondentMatchEntities", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addCorrespondentMatchEntities"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeCorrespondentMatchEntity", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeCorrespondentMatchEntity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addCorrespondentResponses", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addCorrespondentResponses"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeCorrespondentResponses", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeCorrespondentResponses"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_resetAllStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_resetAllStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shouldTriggerMatchConditions", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "shouldTriggerMatchConditions"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSearchInput", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSearchInput"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTypeFilter", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTypeFilter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchOldConversations", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchOldConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadNextPage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "loadNextPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetCurrentPage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "resetCurrentPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadConversation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "loadConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unloadConversation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unloadConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchOldMessages", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchOldMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMessageText", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMessageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachments", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachments"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addAttachment", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "addAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeAttachment", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAttachment"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replyToReceivers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "replyToReceivers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteConversation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allConversations", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "allConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniqueNumbers", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "uniqueNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allUniqueNumbers", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "allUniqueNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "effectiveSearchString", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "effectiveSearchString"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "typeFilteredConversations", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "typeFilteredConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "formattedConversations", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "formattedConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filteredConversations", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "filteredConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pagingConversations", [_dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "pagingConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "earliestTime", [_dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "earliestTime"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentConversation", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "currentConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "messageText", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "messageText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "attachments", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "attachments"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=Conversations.js.map
