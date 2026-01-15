"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageStore = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _core = require("@ringcentral-integration/core");
var _utils = require("@ringcentral-integration/utils");
var _events = require("events");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _trackEvents = require("../../enums/trackEvents");
var _batchApiHelper = require("../../lib/batchApiHelper");
var _debounceThrottle = require("../../lib/debounce-throttle");
var _di = require("../../lib/di");
var messageHelper = _interopRequireWildcard(require("../../lib/messageHelper"));
var _proxify = require("../../lib/proxy/proxify");
var _CallingSettings = require("../CallingSettings");
var _DataFetcherV = require("../DataFetcherV2");
var _messageStoreErrors = require("./messageStoreErrors");
var _messageStoreHelper = require("./messageStoreHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _class, _class2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t10 in e) "default" !== _t10 && {}.hasOwnProperty.call(e, _t10) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t10)) && (i.get || i.set) ? o(f, _t10, i) : f[_t10] = e[_t10]); return f; })(e, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var DEFAULT_CONVERSATIONS_LOAD_LENGTH = 10;
var DEFAULT_CONVERSATION_LOAD_LENGTH = 100;
var DEFAULT_POLLING_INTERVAL = 30 * 60 * 1000; // 30 min
var DEFAULT_TTL = 5 * 60 * 1000; // 5 min
var DEFAULT_RETRY = 62 * 1000; // 62 sec

var DEFAULT_DAY_SPAN = 7; // default to load 7 days messages
var DEFAULT_MESSAGES_FILTER = function DEFAULT_MESSAGES_FILTER(list) {
  return list;
};
var UPDATE_MESSAGE_ONCE_COUNT = 20; // Number of messages to be updated in one time

// reference: https://developers.ringcentral.com/api-reference/Message-Store/syncMessages
var INVALID_TOKEN_ERROR_CODES = ['CMN-101', 'MSG-333'];

/**
 * Messages data managing module
 * fetch conversations
 * handle new message subscription
 */
var MessageStore = exports.MessageStore = (_dec = (0, _di.Module)({
  name: 'MessageStore',
  deps: ['Alert', 'Auth', 'Client', 'DataFetcherV2', 'Subscription', 'ConnectivityMonitor', 'AppFeatures', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'MessageStoreOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.flagVoicemail), _dec3 = (0, _core.track)(function (that, conversationId) {
  var _that$conversationSto;
  // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
  var _ref = (_that$conversationSto = that.conversationStore[conversationId]) !== null && _that$conversationSto !== void 0 ? _that$conversationSto : [],
    _ref2 = _slicedToArray(_ref, 1),
    conversation = _ref2[0];
  if (!conversation) return;
  if (conversation.type === 'VoiceMail') {
    return [_trackEvents.trackEvents.deleteVoicemail];
  }
  if (conversation.type === 'Fax') {
    return [_trackEvents.trackEvents.deleteFax];
  }
}), _dec4 = (0, _core.track)(_trackEvents.trackEvents.clickToSMSVoicemailList), _dec5 = (0, _core.track)(function (_, action) {
  if (action.fromType === 'Pager' || action.fromType === 'SMS') {
    return [_trackEvents.trackEvents.clickToDialTextList];
  }
  if (action.fromType === 'VoiceMail') {
    return [_trackEvents.trackEvents.clickToDialVoicemailList];
  }
}), _dec6 = (0, _core.track)(function (that) {
  var _callingSettings;
  if (
  // TODO: refactor for Analytics
  ((_callingSettings = that.parentModule.callingSettings) === null || _callingSettings === void 0 ? void 0 : _callingSettings.callingMode) === _CallingSettings.callingModes.ringout) {
    return [_trackEvents.trackEvents.callPlaceRingOutCallSMSHistory];
  }
}), _dec7 = (0, _core.computed)(function (that) {
  var _that$data;
  return [(_that$data = that.data) === null || _that$data === void 0 ? void 0 : _that$data.conversationStore];
}), _dec8 = (0, _core.computed)(function (that) {
  var _that$data2;
  return [(_that$data2 = that.data) === null || _that$data2 === void 0 ? void 0 : _that$data2.conversationList, that.conversationStore];
}), _dec9 = (0, _core.computed)(function (that) {
  return [that.allConversations];
}), _dec0 = (0, _core.computed)(function (that) {
  return [that.textConversations];
}), _dec1 = (0, _core.computed)(function (that) {
  return [that.allConversations];
}), _dec10 = (0, _core.computed)(function (that) {
  return [that.faxMessages];
}), _dec11 = (0, _core.computed)(function (that) {
  return [that.allConversations];
}), _dec12 = (0, _core.computed)(function (that) {
  return [that.voicemailMessages];
}), _dec13 = (0, _core.computed)(function (that) {
  return [that.voiceUnreadCounts, that.textUnreadCounts, that.faxUnreadCounts];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  function MessageStore(deps) {
    var _this$_deps$messageSt, _this$_deps$messageSt2, _this$_deps$messageSt3, _this$_deps$messageSt4, _this$_deps$messageSt5, _this$_deps$messageSt6, _this$_deps$messageSt7, _this$_deps$messageSt8, _this$_deps$messageSt9;
    var _this;
    _classCallCheck(this, MessageStore);
    _this = _callSuper(this, MessageStore, [{
      deps: deps
    }]);
    _this._conversationsLoadLength = (_this$_deps$messageSt = (_this$_deps$messageSt2 = _this._deps.messageStoreOptions) === null || _this$_deps$messageSt2 === void 0 ? void 0 : _this$_deps$messageSt2.conversationsLoadLength) !== null && _this$_deps$messageSt !== void 0 ? _this$_deps$messageSt : DEFAULT_CONVERSATIONS_LOAD_LENGTH;
    _this._conversationLoadLength = (_this$_deps$messageSt3 = (_this$_deps$messageSt4 = _this._deps.messageStoreOptions) === null || _this$_deps$messageSt4 === void 0 ? void 0 : _this$_deps$messageSt4.conversationLoadLength) !== null && _this$_deps$messageSt3 !== void 0 ? _this$_deps$messageSt3 : DEFAULT_CONVERSATION_LOAD_LENGTH;
    _this._messagesFilter = (_this$_deps$messageSt5 = (_this$_deps$messageSt6 = _this._deps.messageStoreOptions) === null || _this$_deps$messageSt6 === void 0 ? void 0 : _this$_deps$messageSt6.messagesFilter) !== null && _this$_deps$messageSt5 !== void 0 ? _this$_deps$messageSt5 : DEFAULT_MESSAGES_FILTER;
    _this._daySpan = (_this$_deps$messageSt7 = (_this$_deps$messageSt8 = _this._deps.messageStoreOptions) === null || _this$_deps$messageSt8 === void 0 ? void 0 : _this$_deps$messageSt8.daySpan) !== null && _this$_deps$messageSt7 !== void 0 ? _this$_deps$messageSt7 : DEFAULT_DAY_SPAN;
    _this._eventEmitter = new _events.EventEmitter();
    _this._dispatchedMessageIds = [];
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'GetMessageI... Remove this comment to see the full error message
    _this._handledRecord = null;
    _this._debouncedSetConversationAsRead = (0, _debounceThrottle.debounce)({
      fn: _this._setConversationAsRead,
      threshold: 500,
      leading: true
    });
    var _ref3 = (_this$_deps$messageSt9 = _this._deps.messageStoreOptions) !== null && _this$_deps$messageSt9 !== void 0 ? _this$_deps$messageSt9 : {},
      _ref3$disableCache = _ref3.disableCache,
      disableCache = _ref3$disableCache === void 0 ? false : _ref3$disableCache,
      _ref3$polling = _ref3.polling,
      polling = _ref3$polling === void 0 ? false : _ref3$polling,
      _ref3$timeToRetry = _ref3.timeToRetry,
      timeToRetry = _ref3$timeToRetry === void 0 ? DEFAULT_RETRY : _ref3$timeToRetry,
      _ref3$pollingInterval = _ref3.pollingInterval,
      pollingInterval = _ref3$pollingInterval === void 0 ? DEFAULT_POLLING_INTERVAL : _ref3$pollingInterval,
      _ref3$ttl = _ref3.ttl,
      ttl = _ref3$ttl === void 0 ? DEFAULT_TTL : _ref3$ttl;
    // @ts-expect-error TS(2322): Type 'DataSource<{ conversationList: ConversationI... Remove this comment to see the full error message
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, _this._deps.messageStoreOptions), {}, {
      key: 'messageStore',
      disableCache: disableCache,
      ttl: ttl,
      polling: polling,
      timeToRetry: timeToRetry,
      pollingInterval: pollingInterval,
      cleanOnReset: true,
      permissionCheckFunction: function permissionCheckFunction() {
        return _this._hasPermission;
      },
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.appFeatures.ready;
      },
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                return _context.a(2, _this._syncData());
            }
          }, _callee);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }()
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    _this._deps.subscription.register(_this, {
      filters: [_subscriptionFilters.subscriptionFilters.messageStore, _subscriptionFilters.subscriptionFilters.instantMessage]
    });
    return _this;
  }
  _inherits(MessageStore, _DataFetcherV2Consume);
  return _createClass(MessageStore, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      if (this._deps.connectivityMonitor) {
        (0, _core.watch)(this, function () {
          return _this2._deps.connectivityMonitor.connectivity;
        }, function (newValue) {
          if (_this2.ready && _this2._deps.connectivityMonitor.ready && newValue) {
            _this2._deps.dataFetcherV2.fetchData(_this2._source);
          }
        });
      }
      (0, _core.watch)(this, function () {
        return _this2._deps.subscription.message;
      }, /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(newValue) {
          var _newValue$body;
          var messageStoreEvent, instantMessageEvent, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                if (!(!newValue || !_this2.ready || !_this2._hasPermission || _this2._deps.tabManager && !_this2._deps.tabManager.active)) {
                  _context2.n = 1;
                  break;
                }
                return _context2.a(2);
              case 1:
                messageStoreEvent = /\/message-store$/;
                instantMessageEvent = /\/message-store\/instant\?type=SMS$/;
                if (!(messageStoreEvent.test(newValue.event) && ((_newValue$body = newValue.body) === null || _newValue$body === void 0 ? void 0 : _newValue$body.changes))) {
                  _context2.n = 6;
                  break;
                }
                _context2.p = 2;
                _context2.n = 3;
                return _this2.fetchData({
                  passive: true
                });
              case 3:
                _context2.n = 5;
                break;
              case 4:
                _context2.p = 4;
                _t = _context2.v;
                console.error('[MessageStore] > subscription > fetchData', _t);
              case 5:
                _context2.n = 7;
                break;
              case 6:
                if (instantMessageEvent.test(newValue.event)) {
                  _this2.pushMessage(messageHelper.normalizeInstantEvent(newValue));
                }
              case 7:
                return _context2.a(2);
            }
          }, _callee2, null, [[2, 4]]);
        }));
        return function (_x) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_updateData",
    value: function () {
      var _updateData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(data) {
        var timestamp,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              timestamp = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : Date.now();
              this._deps.dataFetcherV2.updateData(this._source, data, timestamp);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _updateData(_x2) {
        return _updateData2.apply(this, arguments);
      }
      return _updateData;
    }()
  }, {
    key: "_processRawConversationList",
    value: function _processRawConversationList(_ref5) {
      var _this$data;
      var records = _ref5.records,
        conversationStore = _ref5.conversationStore,
        isFSyncSuccess = _ref5.isFSyncSuccess;
      var state = ((_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.conversationList) || [];
      var newState = [];
      var stateMap = {};
      if (!isFSyncSuccess) {
        if (!records || records.length === 0) {
          return state;
        }
        state.forEach(function (oldConversation) {
          newState.push(oldConversation);
          stateMap[oldConversation.id] = {
            index: newState.length - 1
          };
        });
      }
      records.forEach(function (record) {
        var message = messageHelper.normalizeRecord(record);
        var id = message.conversationId;
        var newCreationTime = message.creationTime;
        var isDeleted = messageHelper.messageIsDeleted(message);
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        if (stateMap[id]) {
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
          var oldConversation = newState[stateMap[id].index];
          var creationTime = oldConversation.creationTime;
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          if (creationTime < newCreationTime && !isDeleted) {
            // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
            newState[stateMap[id].index] = {
              // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
              id: id,
              // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
              creationTime: newCreationTime,
              type: message.type,
              messageId: message.id
            };
          }
          // when user deleted a coversation message
          if (isDeleted && message.id === oldConversation.messageId) {
            // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
            var oldMessageList = conversationStore[id] || [];
            var existedMessageList = oldMessageList.filter(function (m) {
              return m.id !== message.id;
            });
            if (existedMessageList.length > 0) {
              // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
              newState[stateMap[id].index] = {
                // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                id: id,
                creationTime: existedMessageList[0].creationTime,
                type: existedMessageList[0].type,
                messageId: existedMessageList[0].id
              };
              return;
            }
            // when user delete conversation
            // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Conversatio... Remove this comment to see the full error message
            newState[stateMap[id].index] = null;
            // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
            delete stateMap[id];
          }
          return;
        }
        if (isDeleted || !messageHelper.messageIsAcceptable(message)) {
          return;
        }
        newState.push({
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          id: id,
          // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
          creationTime: newCreationTime,
          type: message.type,
          messageId: message.id
        });
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        stateMap[id] = {
          index: newState.length - 1
        };
      });
      return newState.filter(function (c) {
        return !!c && typeof c.creationTime === 'number';
      }).sort(messageHelper.sortByCreationTime);
    }
  }, {
    key: "_processRawConversationStore",
    value: function _processRawConversationStore(_ref6) {
      var _this$data$conversati, _this$data2;
      var records = _ref6.records,
        isFSyncSuccess = _ref6.isFSyncSuccess;
      var state = (_this$data$conversati = (_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.conversationStore) !== null && _this$data$conversati !== void 0 ? _this$data$conversati : {};
      var newState = {};
      var updatedConversations = {};
      if (!isFSyncSuccess) {
        if (!records || records.length === 0) {
          return state;
        }
        newState = _objectSpread({}, state);
      }
      records.forEach(function (record) {
        var message = messageHelper.normalizeRecord(record);
        var id = message.conversationId;
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        var newMessages = newState[id] ? [].concat(newState[id]) : [];
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        var oldMessageIndex = newMessages.findIndex(function (r) {
          return r.id === record.id;
        });
        if (messageHelper.messageIsDeleted(message)) {
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
          newState[id] = newMessages.filter(function (m) {
            return m.id !== message.id;
          });
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
          if (newState[id].length === 0) {
            // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
            delete newState[id];
          }
          return;
        }
        if (oldMessageIndex > -1) {
          if (
          // @ts-expect-error TS(2339): Property 'lastModifiedTime' does not exist on type... Remove this comment to see the full error message
          newMessages[oldMessageIndex].lastModifiedTime <
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          message.lastModifiedTime) {
            // @ts-expect-error TS(2322): Type 'Message' is not assignable to type 'never'.
            newMessages[oldMessageIndex] = message;
          }
        } else if (messageHelper.messageIsAcceptable(message)) {
          // @ts-expect-error TS(2345): Argument of type 'Message' is not assignable to pa... Remove this comment to see the full error message
          newMessages.push(message);
        }
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        updatedConversations[id] = 1;
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        newState[id] = newMessages;
      });
      Object.keys(updatedConversations).forEach(function (id) {
        var noSorted = newState[id];
        newState[id] = noSorted.sort(messageHelper.sortByCreationTime);
      });
      return newState;
    }
  }, {
    key: "_syncFunction",
    value: function () {
      var _syncFunction2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref7) {
        var recordCount, conversationLoadLength, dateFrom, dateTo, syncToken, _ref7$receivedRecords, receivedRecordsLength, params, _yield$this$_deps$cli, records, _yield$this$_deps$cli2, syncInfo, olderDateTo, olderRecordResult;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              recordCount = _ref7.recordCount, conversationLoadLength = _ref7.conversationLoadLength, dateFrom = _ref7.dateFrom, dateTo = _ref7.dateTo, syncToken = _ref7.syncToken, _ref7$receivedRecords = _ref7.receivedRecordsLength, receivedRecordsLength = _ref7$receivedRecords === void 0 ? 0 : _ref7$receivedRecords;
              params = (0, _messageStoreHelper.getSyncParams)({
                recordCount: recordCount,
                conversationLoadLength: conversationLoadLength,
                dateFrom: dateFrom,
                dateTo: dateTo,
                syncToken: syncToken
              });
              _context4.n = 1;
              return this._deps.client.account().extension().messageSync().list(params);
            case 1:
              _yield$this$_deps$cli = _context4.v;
              records = _yield$this$_deps$cli.records;
              _yield$this$_deps$cli2 = _yield$this$_deps$cli.syncInfo;
              syncInfo = _yield$this$_deps$cli2 === void 0 ? {} : _yield$this$_deps$cli2;
              receivedRecordsLength += records.length;
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              if (!(!syncInfo.olderRecordsExist || receivedRecordsLength >= recordCount)) {
                _context4.n = 2;
                break;
              }
              return _context4.a(2, {
                records: records,
                syncInfo: syncInfo
              });
            case 2:
              _context4.n = 3;
              return (0, _utils.sleep)(500);
            case 3:
              // @ts-expect-error TS(2769): No overload matches this call.
              olderDateTo = new Date(records[records.length - 1].creationTime);
              _context4.n = 4;
              return this._syncFunction({
                conversationLoadLength: conversationLoadLength,
                dateFrom: dateFrom,
                dateTo: olderDateTo
              });
            case 4:
              olderRecordResult = _context4.v;
              return _context4.a(2, {
                records: records.concat(olderRecordResult.records),
                syncInfo: syncInfo
              });
          }
        }, _callee4, this);
      }));
      function _syncFunction(_x3) {
        return _syncFunction2.apply(this, arguments);
      }
      return _syncFunction;
    }() // @ts-expect-error TS(2352): Conversion of type 'null' to type 'Date' may be a ... Remove this comment to see the full error message
  }, {
    key: "_syncData",
    value: function () {
      var _syncData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _ref8,
          _ref8$dateTo,
          dateTo,
          _ref8$passive,
          passive,
          conversationsLoadLength,
          conversationLoadLength,
          ownerId,
          _this$syncInfo,
          dateFrom,
          syncToken,
          recordCount,
          data,
          _error$response,
          _responseResult$error,
          error,
          responseResult,
          records,
          isFSyncSuccess,
          _args5 = arguments,
          _t2,
          _t3;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _ref8 = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {}, _ref8$dateTo = _ref8.dateTo, dateTo = _ref8$dateTo === void 0 ? null : _ref8$dateTo, _ref8$passive = _ref8.passive, passive = _ref8$passive === void 0 ? false : _ref8$passive;
              conversationsLoadLength = this._conversationsLoadLength;
              conversationLoadLength = this._conversationLoadLength;
              ownerId = this._deps.auth.ownerId;
              _context5.p = 1;
              dateFrom = new Date();
              dateFrom.setDate(dateFrom.getDate() - this._daySpan);
              syncToken = dateTo ? undefined : (_this$syncInfo = this.syncInfo) === null || _this$syncInfo === void 0 ? void 0 : _this$syncInfo.syncToken;
              recordCount = conversationsLoadLength * conversationLoadLength;
              _context5.p = 2;
              _context5.n = 3;
              return this._syncFunction({
                recordCount: recordCount,
                conversationLoadLength: conversationLoadLength,
                dateFrom: dateFrom,
                syncToken: syncToken,
                dateTo: dateTo
              });
            case 3:
              data = _context5.v;
              _context5.n = 8;
              break;
            case 4:
              _context5.p = 4;
              _t2 = _context5.v;
              error = _t2;
              _context5.n = 5;
              return (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.clone().json();
            case 5:
              responseResult = _context5.v;
              if (!(responseResult === null || responseResult === void 0 ? void 0 : (_responseResult$error = responseResult.errors) === null || _responseResult$error === void 0 ? void 0 : _responseResult$error.some(function () {
                var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                  _ref9$errorCode = _ref9.errorCode,
                  errorCode = _ref9$errorCode === void 0 ? '' : _ref9$errorCode;
                return INVALID_TOKEN_ERROR_CODES.includes(errorCode);
              }))) {
                _context5.n = 7;
                break;
              }
              _context5.n = 6;
              return this._syncFunction({
                recordCount: recordCount,
                conversationLoadLength: conversationLoadLength,
                dateFrom: dateFrom,
                syncToken: undefined,
                dateTo: dateTo
              });
            case 6:
              data = _context5.v;
              syncToken = undefined;
              _context5.n = 8;
              break;
            case 7:
              throw error;
            case 8:
              if (!(this._deps.auth.ownerId === ownerId)) {
                _context5.n = 9;
                break;
              }
              records = this._messagesFilter(data.records);
              isFSyncSuccess = !syncToken; // this is only executed in passive sync mode (aka. invoked by subscription)
              if (passive) {
                this._handledRecord = records;
              }
              return _context5.a(2, {
                conversationList: this._processRawConversationList({
                  records: records,
                  conversationStore: this.conversationStore,
                  isFSyncSuccess: isFSyncSuccess
                }),
                conversationStore: this._processRawConversationStore({
                  records: records,
                  isFSyncSuccess: isFSyncSuccess
                }),
                syncInfo: data.syncInfo
              });
            case 9:
              _context5.n = 11;
              break;
            case 10:
              _context5.p = 10;
              _t3 = _context5.v;
              if (!(this._deps.auth.ownerId === ownerId)) {
                _context5.n = 11;
                break;
              }
              console.error('[MessageStore] > _syncData', _t3);
              throw _t3;
            case 11:
              return _context5.a(2);
          }
        }, _callee5, this, [[2, 4], [1, 10]]);
      }));
      function _syncData() {
        return _syncData2.apply(this, arguments);
      }
      return _syncData;
    }()
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _ref0,
          _ref0$passive,
          passive,
          data,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _ref0 = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {}, _ref0$passive = _ref0.passive, passive = _ref0$passive === void 0 ? false : _ref0$passive;
              _context6.n = 1;
              return this._syncData({
                passive: passive
              });
            case 1:
              data = _context6.v;
              this._updateData(data);
              if (passive && this._handledRecord) {
                this._dispatchMessageHandlers(this._handledRecord);
                // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'GetMessageI... Remove this comment to see the full error message
                this._handledRecord = null;
              }
            case 2:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function fetchData() {
        return _fetchData.apply(this, arguments);
      }
      return fetchData;
    }()
  }, {
    key: "onNewInboundMessage",
    value: function onNewInboundMessage(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on('newInboundMessageNotification', handler);
      }
    }
  }, {
    key: "onMessageUpdated",
    value: function onMessageUpdated(handler) {
      if (typeof handler === 'function') {
        this._eventEmitter.on('messageUpdated', handler);
      }
    }

    /**
     * Dispatch events to different handlers
     */
  }, {
    key: "_dispatchMessageHandlers",
    value: function _dispatchMessageHandlers(records) {
      // Sort all records by creation time
      records = records.slice().sort(function (a, b) {
        return (
          // @ts-expect-error TS(2769): No overload matches this call.
          new Date(a.creationTime).getTime() -
          // @ts-expect-error TS(2769): No overload matches this call.
          new Date(b.creationTime).getTime()
        );
      });
      var _iterator = _createForOfIteratorHelper(records),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var record = _step.value;
          var _ref1 = record || {},
            id = _ref1.id,
            direction = _ref1.direction,
            availability = _ref1.availability,
            messageStatus = _ref1.messageStatus,
            readStatus = _ref1.readStatus,
            lastModifiedTime = _ref1.lastModifiedTime,
            creationTime = _ref1.creationTime;
          // Notify when new message incoming
          // fix mix old messages and new messages logic error.
          if (!this._messageDispatched(record)) {
            // Mark last 10 messages that dispatched
            // To present dispatching same record twice
            // @ts-expect-error TS(2322): Type '{ id: number | undefined; lastModifiedTime: ... Remove this comment to see the full error message
            this._dispatchedMessageIds = [{
              id: id,
              lastModifiedTime: lastModifiedTime
            }].concat(this._dispatchedMessageIds).slice(0, 20);
            this._eventEmitter.emit('messageUpdated', record);
            // For new inbound message notification
            if (direction === 'Inbound' && readStatus === 'Unread' && messageStatus === 'Received' && availability === 'Alive' &&
            // @ts-expect-error TS(2769): No overload matches this call.
            new Date(creationTime).getTime() >
            // @ts-expect-error TS(2769): No overload matches this call.
            new Date(lastModifiedTime).getTime() - 600 * 1000) {
              this._eventEmitter.emit('newInboundMessageNotification', record);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_messageDispatched",
    value: function _messageDispatched(message) {
      return this._dispatchedMessageIds.some(function (m) {
        return m.id === message.id && m.lastModifiedTime === message.lastModifiedTime;
      });
    }
  }, {
    key: "pushMessages",
    value: function () {
      var _pushMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(records) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this._deps.dataFetcherV2.updateData(this._source, _objectSpread(_objectSpread({}, this.data), {}, {
                conversationList: this._processRawConversationList({
                  records: records,
                  conversationStore: this.conversationStore
                }),
                conversationStore: this._processRawConversationStore({
                  records: records
                })
              }),
              // @ts-expect-error TS(2345): Argument of type 'number | null' is not assignable... Remove this comment to see the full error message
              this.timestamp);
            case 1:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function pushMessages(_x4) {
        return _pushMessages.apply(this, arguments);
      }
      return pushMessages;
    }()
  }, {
    key: "pushMessage",
    value: function pushMessage(record) {
      this.pushMessages([record]);
    }
  }, {
    key: "_updateMessageApi",
    value: function () {
      var _updateMessageApi2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(messageId, status) {
        var body, updateRequest;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              body = {
                readStatus: status
              };
              _context8.n = 1;
              return this._deps.client.account().extension().messageStore(messageId).put(body);
            case 1:
              updateRequest = _context8.v;
              return _context8.a(2, updateRequest);
          }
        }, _callee8, this);
      }));
      function _updateMessageApi(_x5, _x6) {
        return _updateMessageApi2.apply(this, arguments);
      }
      return _updateMessageApi;
    }()
  }, {
    key: "deleteMessageApi",
    value: function () {
      var _deleteMessageApi = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(messageId) {
        var response;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              _context9.n = 1;
              return this._deps.client.account().extension().messageStore(messageId)["delete"]();
            case 1:
              response = _context9.v;
              return _context9.a(2, response);
          }
        }, _callee9, this);
      }));
      function deleteMessageApi(_x7) {
        return _deleteMessageApi.apply(this, arguments);
      }
      return deleteMessageApi;
    }()
    /**
     * Batch update messages status
     */
  }, {
    key: "_batchUpdateMessagesApi",
    value: (function () {
      var _batchUpdateMessagesApi2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(messageIds, body) {
        var ids, platform, responses;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              if (!(!messageIds || messageIds.length === 0)) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2);
            case 1:
              ids = decodeURIComponent(messageIds.join(','));
              platform = this._deps.client.service.platform();
              _context0.n = 2;
              return (0, _batchApiHelper.batchPutApi)({
                platform: platform,
                url: "/restapi/v1.0/account/~/extension/~/message-store/".concat(ids),
                body: body
              });
            case 2:
              responses = _context0.v;
              return _context0.a(2, responses);
          }
        }, _callee0, this);
      }));
      function _batchUpdateMessagesApi(_x8, _x9) {
        return _batchUpdateMessagesApi2.apply(this, arguments);
      }
      return _batchUpdateMessagesApi;
    }()
    /**
     * Change messages' status to `READ` or `UNREAD`.
     * Update 20 messages per time with `_batchUpdateMessagesApi`,
     * or `_updateMessageApi` one by one in recursion.
     */
    )
  }, {
    key: "_updateMessagesApi",
    value: (function () {
      var _updateMessagesApi2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(messageIds, status) {
        var allMessageIds, results, index, nextLength, result, leftIds, body, responses, ownerId;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              allMessageIds = messageIds;
              if (!(!allMessageIds || allMessageIds.length === 0)) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2, []);
            case 1:
              results = [];
              index = 0;
            case 2:
              nextLength = (index + 1) * UPDATE_MESSAGE_ONCE_COUNT;
              if (nextLength > allMessageIds.length) {
                nextLength = allMessageIds.length - index * UPDATE_MESSAGE_ONCE_COUNT;
              } else {
                nextLength = UPDATE_MESSAGE_ONCE_COUNT;
              }

              // If there's only one message, use another api to update its status
              if (!(nextLength === 1)) {
                _context10.n = 4;
                break;
              }
              _context10.n = 3;
              return this._updateMessageApi(messageIds[0], status);
            case 3:
              result = _context10.v;
              return _context10.a(2, [result]);
            case 4:
              leftIds = allMessageIds.slice(index * UPDATE_MESSAGE_ONCE_COUNT, index * UPDATE_MESSAGE_ONCE_COUNT + nextLength);
              body = leftIds.map(function () {
                return {
                  body: {
                    readStatus: status
                  }
                };
              });
              _context10.n = 5;
              return this._batchUpdateMessagesApi(leftIds, body);
            case 5:
              responses = _context10.v;
              _context10.n = 6;
              return Promise.all(
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              responses.map(/*#__PURE__*/function () {
                var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(res) {
                  var _result;
                  return _regenerator().w(function (_context1) {
                    while (1) switch (_context1.n) {
                      case 0:
                        if (!(res.status === 200)) {
                          _context1.n = 2;
                          break;
                        }
                        _context1.n = 1;
                        return res.json();
                      case 1:
                        _result = _context1.v;
                        results.push(_result);
                      case 2:
                        return _context1.a(2);
                    }
                  }, _callee1);
                }));
                return function (_x10) {
                  return _ref10.apply(this, arguments);
                };
              }()));
            case 6:
              ownerId = this._deps.auth.ownerId;
              if (!(allMessageIds.length > (index + 1) * UPDATE_MESSAGE_ONCE_COUNT)) {
                _context10.n = 9;
                break;
              }
              _context10.n = 7;
              return (0, _utils.sleep)(1300);
            case 7:
              if (!(ownerId !== this._deps.auth.ownerId)) {
                _context10.n = 8;
                break;
              }
              return _context10.a(2, []);
            case 8:
              _context10.n = 10;
              break;
            case 9:
              return _context10.a(3, 11);
            case 10:
              index++;
              _context10.n = 2;
              break;
            case 11:
              return _context10.a(2, results);
          }
        }, _callee10, this);
      }));
      function _updateMessagesApi(_x0, _x1) {
        return _updateMessagesApi2.apply(this, arguments);
      }
      return _updateMessagesApi;
    }()
    /**
     * Set message status to `READ`.
     */
    )
  }, {
    key: "readMessages",
    value: (function () {
      var _readMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(conversationId) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              this._debouncedSetConversationAsRead(conversationId);
            case 1:
              return _context11.a(2);
          }
        }, _callee11, this);
      }));
      function readMessages(_x11) {
        return _readMessages.apply(this, arguments);
      }
      return readMessages;
    }())
  }, {
    key: "_setConversationAsRead",
    value: function () {
      var _setConversationAsRead2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(conversationId) {
        var messageList, unreadMessageIds, ownerId, updatedMessages, _t4, _t5;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
              messageList = this.conversationStore[conversationId];
              if (!(!messageList || messageList.length === 0)) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2);
            case 1:
              unreadMessageIds = messageList.filter(messageHelper.messageIsUnread).map(function (m) {
                return m.id;
              });
              if (!(unreadMessageIds.length === 0)) {
                _context12.n = 2;
                break;
              }
              return _context12.a(2);
            case 2:
              _context12.p = 2;
              ownerId = this._deps.auth.ownerId;
              _context12.n = 3;
              return this._updateMessagesApi(unreadMessageIds, 'Read');
            case 3:
              updatedMessages = _context12.v;
              if (!(ownerId !== this._deps.auth.ownerId)) {
                _context12.n = 4;
                break;
              }
              return _context12.a(2);
            case 4:
              this.pushMessages(updatedMessages);
              _context12.n = 8;
              break;
            case 5:
              _context12.p = 5;
              _t4 = _context12.v;
              console.error(_t4);
              _t5 = !this._deps.availabilityMonitor;
              if (_t5) {
                _context12.n = 7;
                break;
              }
              _context12.n = 6;
              return this._deps.availabilityMonitor.checkIfHAError(_t4);
            case 6:
              _t5 = !_context12.v;
            case 7:
              if (!_t5) {
                _context12.n = 8;
                break;
              }
              this._deps.alert.warning({
                message: _messageStoreErrors.messageStoreErrors.readFailed
              });
            case 8:
              return _context12.a(2);
          }
        }, _callee12, this, [[2, 5]]);
      }));
      function _setConversationAsRead(_x12) {
        return _setConversationAsRead2.apply(this, arguments);
      }
      return _setConversationAsRead;
    }()
    /**
     * Set message status to `UNREAD`.
     */
  }, {
    key: "unreadMessage",
    value: (function () {
      var _unreadMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(messageId) {
        var message, _t6, _t7;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              this.onUnmarkMessages();
              _context13.p = 1;
              _context13.n = 2;
              return this._updateMessageApi(messageId, 'Unread');
            case 2:
              message = _context13.v;
              this.pushMessage(message);
              _context13.n = 6;
              break;
            case 3:
              _context13.p = 3;
              _t6 = _context13.v;
              console.error(_t6);
              _t7 = !this._deps.availabilityMonitor;
              if (_t7) {
                _context13.n = 5;
                break;
              }
              _context13.n = 4;
              return this._deps.availabilityMonitor.checkIfHAError(_t6);
            case 4:
              _t7 = !_context13.v;
            case 5:
              if (!_t7) {
                _context13.n = 6;
                break;
              }
              this._deps.alert.warning({
                message: _messageStoreErrors.messageStoreErrors.unreadFailed
              });
            case 6:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3]]);
      }));
      function unreadMessage(_x13) {
        return _unreadMessage.apply(this, arguments);
      }
      return unreadMessage;
    }())
  }, {
    key: "onUnmarkMessages",
    value: function () {
      var _onUnmarkMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              return _context14.a(2);
          }
        }, _callee14);
      }));
      function onUnmarkMessages() {
        return _onUnmarkMessages.apply(this, arguments);
      }
      return onUnmarkMessages;
    }()
  }, {
    key: "onDeleteConversation",
    value: function () {
      var _onDeleteConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(conversationId) {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              return _context15.a(2);
          }
        }, _callee15);
      }));
      function onDeleteConversation(_x14) {
        return _onDeleteConversation.apply(this, arguments);
      }
      return onDeleteConversation;
    }()
  }, {
    key: "_deleteConversationStore",
    value: function _deleteConversationStore(conversationId) {
      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      if (!this.conversationStore[conversationId]) {
        return this.conversationStore;
      }
      var newState = _objectSpread({}, this.conversationStore);
      // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
      delete newState[conversationId];
      return newState;
    }
  }, {
    key: "_deleteConversation",
    value: function _deleteConversation(conversationId) {
      var _this$data$conversati2, _this$data3;
      var conversationList = ((_this$data$conversati2 = (_this$data3 = this.data) === null || _this$data3 === void 0 ? void 0 : _this$data3.conversationList) !== null && _this$data$conversati2 !== void 0 ? _this$data$conversati2 : []).filter(function (c) {
        return c.id !== conversationId;
      });
      this.onDeleteConversation(conversationId);
      var conversationStore = this._deleteConversationStore(conversationId);
      this._deps.dataFetcherV2.updateData(this._source, _objectSpread(_objectSpread({}, this.data), {}, {
        conversationList: conversationList,
        conversationStore: conversationStore
      }),
      // @ts-expect-error TS(2345): Argument of type 'number | null' is not assignable... Remove this comment to see the full error message
      this.timestamp);
    }
  }, {
    key: "deleteConversationMessages",
    value: function () {
      var _deleteConversationMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(conversationId) {
        var messageList, messageId, _t8, _t9;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              if (conversationId) {
                _context16.n = 1;
                break;
              }
              return _context16.a(2);
            case 1:
              messageList = this.conversationStore[conversationId];
              if (!(!messageList || messageList.length === 0)) {
                _context16.n = 2;
                break;
              }
              return _context16.a(2);
            case 2:
              messageId = messageList.map(function (m) {
                return m.id;
              }).join(',');
              _context16.p = 3;
              _context16.n = 4;
              return this.deleteMessageApi(messageId);
            case 4:
              this._deleteConversation(conversationId);
              _context16.n = 8;
              break;
            case 5:
              _context16.p = 5;
              _t8 = _context16.v;
              console.error(_t8);
              _t9 = !this._deps.availabilityMonitor;
              if (_t9) {
                _context16.n = 7;
                break;
              }
              _context16.n = 6;
              return this._deps.availabilityMonitor.checkIfHAError(_t8);
            case 6:
              _t9 = !_context16.v;
            case 7:
              if (!_t9) {
                _context16.n = 8;
                break;
              }
              this._deps.alert.warning({
                message: _messageStoreErrors.messageStoreErrors.deleteFailed
              });
            case 8:
              return _context16.a(2);
          }
        }, _callee16, this, [[3, 5]]);
      }));
      function deleteConversationMessages(_x15) {
        return _deleteConversationMessages.apply(this, arguments);
      }
      return deleteConversationMessages;
    }()
  }, {
    key: "deleteConversation",
    value: function () {
      var _deleteConversation2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(conversationId) {
        var _t0, _t1;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              if (conversationId) {
                _context17.n = 1;
                break;
              }
              return _context17.a(2);
            case 1:
              _context17.p = 1;
              _context17.n = 2;
              return this._deps.client.account().extension().messageStore()["delete"]({
                conversationId: conversationId
              });
            case 2:
              this._deleteConversation(conversationId);
              _context17.n = 6;
              break;
            case 3:
              _context17.p = 3;
              _t0 = _context17.v;
              console.error(_t0);
              _t1 = !this._deps.availabilityMonitor;
              if (_t1) {
                _context17.n = 5;
                break;
              }
              _context17.n = 4;
              return this._deps.availabilityMonitor.checkIfHAError(_t0);
            case 4:
              _t1 = !_context17.v;
            case 5:
              if (!_t1) {
                _context17.n = 6;
                break;
              }
              this._deps.alert.warning({
                message: _messageStoreErrors.messageStoreErrors.deleteFailed
              });
            case 6:
              return _context17.a(2);
          }
        }, _callee17, this, [[1, 3]]);
      }));
      function deleteConversation(_x16) {
        return _deleteConversation2.apply(this, arguments);
      }
      return deleteConversation;
    }()
  }, {
    key: "onClickToSMS",
    value: function () {
      var _onClickToSMS = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              return _context18.a(2);
          }
        }, _callee18);
      }));
      function onClickToSMS() {
        return _onClickToSMS.apply(this, arguments);
      }
      return onClickToSMS;
    }()
  }, {
    key: "onClickToCall",
    value: function () {
      var _onClickToCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(_ref11) {
        var _ref11$fromType, fromType;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              _ref11$fromType = _ref11.fromType, fromType = _ref11$fromType === void 0 ? '' : _ref11$fromType;
              // for track click to call in message list
              this.onClickToCallWithRingout();
            case 1:
              return _context19.a(2);
          }
        }, _callee19, this);
      }));
      function onClickToCall(_x17) {
        return _onClickToCall.apply(this, arguments);
      }
      return onClickToCall;
    }()
  }, {
    key: "onClickToCallWithRingout",
    value: function () {
      var _onClickToCallWithRingout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              return _context20.a(2);
          }
        }, _callee20);
      }));
      function onClickToCallWithRingout() {
        return _onClickToCallWithRingout.apply(this, arguments);
      }
      return onClickToCallWithRingout;
    }()
  }, {
    key: "data",
    get: function get() {
      return this._deps.dataFetcherV2.getData(this._source);
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this._deps.dataFetcherV2.getTimestamp(this._source);
    }
  }, {
    key: "syncInfo",
    get: function get() {
      var _this$data4;
      return (_this$data4 = this.data) === null || _this$data4 === void 0 ? void 0 : _this$data4.syncInfo;
    }
  }, {
    key: "conversationStore",
    get: function get() {
      var _this$data5;
      return ((_this$data5 = this.data) === null || _this$data5 === void 0 ? void 0 : _this$data5.conversationStore) || {};
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._deps.appFeatures.hasReadMessagesPermission;
    }
  }, {
    key: "allConversations",
    get: function get() {
      var _this$data6,
        _this3 = this;
      var _ref12 = (_this$data6 = this.data) !== null && _this$data6 !== void 0 ? _this$data6 : {},
        _ref12$conversationLi = _ref12.conversationList,
        conversationList = _ref12$conversationLi === void 0 ? [] : _ref12$conversationLi;
      return conversationList.map(function (conversationItem) {
        var messageList = _this3.conversationStore[conversationItem.id] || [];
        return _objectSpread(_objectSpread({}, messageList[0]), {}, {
          unreadCounts: messageList.filter(messageHelper.messageIsUnread).length
        });
      });
    }
  }, {
    key: "textConversations",
    get: function get() {
      return this.allConversations.filter(function (conversation) {
        return messageHelper.messageIsTextMessage(conversation);
      });
    }
  }, {
    key: "textUnreadCounts",
    get: function get() {
      return this.textConversations.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    }
  }, {
    key: "faxMessages",
    get: function get() {
      return this.allConversations.filter(function (conversation) {
        return messageHelper.messageIsFax(conversation);
      });
    }
  }, {
    key: "faxUnreadCounts",
    get: function get() {
      return this.faxMessages.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    }
  }, {
    key: "voicemailMessages",
    get: function get() {
      return this.allConversations.filter(function (conversation) {
        return messageHelper.messageIsVoicemail(conversation);
      });
    }
  }, {
    key: "voiceUnreadCounts",
    get: function get() {
      return this.voicemailMessages.reduce(function (a, b) {
        return a + b.unreadCounts;
      }, 0);
    }
  }, {
    key: "unreadCounts",
    get: function get() {
      var unreadCounts = 0;
      if (this._deps.appFeatures.hasReadTextPermission) {
        unreadCounts += this.textUnreadCounts;
      }
      if (this._deps.appFeatures.hasVoicemailPermission) {
        unreadCounts += this.voiceUnreadCounts;
      }
      if (this._deps.appFeatures.hasReadFaxPermission) {
        unreadCounts += this.faxUnreadCounts;
      }
      return unreadCounts;
    }
  }]);
}(_DataFetcherV.DataFetcherV2Consumer), _applyDecoratedDescriptor(_class2.prototype, "_updateData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pushMessages", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "pushMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "readMessages", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "readMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unreadMessage", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "unreadMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onUnmarkMessages", [_dec2, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onUnmarkMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onDeleteConversation", [_dec3, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onDeleteConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteConversationMessages", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteConversationMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteConversation", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteConversation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToSMS", [_dec4, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToCall", [_dec5, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onClickToCallWithRingout", [_dec6, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "onClickToCallWithRingout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "conversationStore", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "conversationStore"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allConversations", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "allConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "textConversations", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "textConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "textUnreadCounts", [_dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "textUnreadCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "faxMessages", [_dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "faxMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "faxUnreadCounts", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "faxUnreadCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "voicemailMessages", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "voicemailMessages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "voiceUnreadCounts", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "voiceUnreadCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unreadCounts", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "unreadCounts"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=MessageStore.js.map
