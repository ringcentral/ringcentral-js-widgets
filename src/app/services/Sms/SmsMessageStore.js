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
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmsMessageStore = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
var _messageHelper = require("@ringcentral-integration/commons/lib/messageHelper");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _MessageStoreBase2 = require("../MessageStore/MessageStoreBase");
var _MessageStoreEventSubscriber = require("../MessageStoreEventSubscriber");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
var SmsMessageStore = exports.SmsMessageStore = (_dec = (0, _nextCore.injectable)({
  name: 'SmsMessageStore'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 7);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('TabManager')(target, undefined, 8);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('SmsMessageStoreOptions')(target, undefined, 9);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.DataFetcher === "undefined" ? Object : _services.DataFetcher, typeof _services.ConnectivityMonitor === "undefined" ? Object : _services.ConnectivityMonitor, typeof _MessageStoreEventSubscriber.MessageStoreEventSubscriber === "undefined" ? Object : _MessageStoreEventSubscriber.MessageStoreEventSubscriber, typeof _services.AppFeatures === "undefined" ? Object : _services.AppFeatures, typeof _services.AvailabilityMonitor === "undefined" ? Object : _services.AvailabilityMonitor, Object, typeof SmsMessageStoreOptions === "undefined" ? Object : SmsMessageStoreOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = /*#__PURE__*/function (_MessageStoreBase) {
  function SmsMessageStore(_toast, _auth, _client, _dataFetcher, _connectivityMonitor, _messageEventSubscriber, _appFeatures, _availabilityMonitor, _tabManager, _messageStoreOptions) {
    var _this;
    _classCallCheck(this, SmsMessageStore);
    _this = _callSuper(this, SmsMessageStore, [_toast, _auth, _client, _dataFetcher, _connectivityMonitor, _appFeatures, _messageEventSubscriber, _availabilityMonitor, _tabManager, _objectSpread(_objectSpread({}, _messageStoreOptions), {}, {
      messageType: ['SMS', 'Text'],
      messageStoreKey: 'smsMessageStore'
    })]);
    // in SMS both inbound & outbound SMS could be unread status
    _this._toast = _toast;
    _this._auth = _auth;
    _this._client = _client;
    _this._dataFetcher = _dataFetcher;
    _this._connectivityMonitor = _connectivityMonitor;
    _this._messageEventSubscriber = _messageEventSubscriber;
    _this._appFeatures = _appFeatures;
    _this._availabilityMonitor = _availabilityMonitor;
    _this._tabManager = _tabManager;
    _this._messageStoreOptions = _messageStoreOptions;
    _this._messageIsUnreadFunc = _messageHelper.directionlessMessageIsUnread;
    return _this;
  }
  _inherits(SmsMessageStore, _MessageStoreBase);
  return _createClass(SmsMessageStore, [{
    key: "_findTargetMessages",
    value: function _findTargetMessages(_ref) {
      var conversationId = _ref.conversationId,
        messageId = _ref.messageId,
        readStatus = _ref.readStatus;
      var targetMessages = [];
      if (readStatus === 'Read') {
        // Mark as read -> MessageStore.readMessages, multiple messages
        var messageList = this.conversationStore[conversationId];
        if (!messageList || messageList.length === 0) {
          return;
        }
        var unreadMessageIds = messageList.filter(this._messageIsUnreadFunc);
        if (unreadMessageIds.length === 0) {
          return;
        }
        targetMessages = _toConsumableArray(unreadMessageIds);
      } else {
        var _this$data;
        // Mark as unread -> MessageStore.unreadMessage, one messages
        var oldDataSet = _objectSpread({}, (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.conversationStore);
        if (!oldDataSet) {
          return;
        }
        var targetConversation = JSON.parse(JSON.stringify(oldDataSet[conversationId]));
        var targetMessage = targetConversation.find(function (message) {
          return message.id === messageId;
        });
        targetMessages.push(targetMessage);
      }
      return targetMessages;
    }

    /**
     * manually update the local conversationStore before message-sync back
     */
  }, {
    key: "preUpdateReadStatus",
    value: function preUpdateReadStatus(_ref2) {
      var conversationId = _ref2.conversationId,
        messageId = _ref2.messageId,
        readStatus = _ref2.readStatus;
      var targetMessages = this._findTargetMessages({
        conversationId: conversationId,
        messageId: messageId,
        readStatus: readStatus
      });
      if (!targetMessages || targetMessages.length === 0) {
        return;
      }
      /*
       * 'conversation' and 'lastModifiedTime' data structure are must-have
       * for '_processRawConversationList' & '_processRawConversationStore'
       * 'lastModifiedTime + 1' to make sure update local message success
       * add extra 'preUpdateReadStatus' field, which will be erased when sync done
       */
      var newTargetMessages = targetMessages.map(function (msg) {
        return _objectSpread(_objectSpread({}, msg), {}, {
          preUpdateReadStatus: readStatus,
          conversation: {
            id: conversationId
          },
          lastModifiedTime: msg.lastModifiedTime + 1
        });
      });
      this.pushMessages(newTargetMessages);
    }
  }, {
    key: "rollbackPreUpdateReadStatus",
    value: function rollbackPreUpdateReadStatus(_ref3) {
      var conversationId = _ref3.conversationId;
      var messageList = this.conversationStore[conversationId];
      if (!messageList || messageList.length === 0) {
        return;
      }
      var rollbackMessages = messageList.filter(function (msg) {
        return msg.preUpdateReadStatus;
      }).map(function (msg) {
        var original = _objectSpread(_objectSpread({}, msg), {}, {
          conversation: {
            id: conversationId
          },
          lastModifiedTime: msg.lastModifiedTime + 1
        });
        delete original.preUpdateReadStatus;
        return original;
      });
      this.pushMessages(rollbackMessages);
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._appFeatures.hasReadTextPermission;
    }
  }, {
    key: "_setConversationAsRead",
    value: function () {
      var _setConversationAsRead2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(conversationId) {
        var messageList, unreadMessageIds, ownerId, updatedMessages;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              messageList = this.conversationStore[conversationId];
              if (!(!messageList || messageList.length === 0)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              unreadMessageIds = messageList
              // the only different with MessageStoreBase, could not use the _messageIsUnreadFunc
              // cause it will mix the preUpdateReadStatus and real readStatus
              .filter(function (msg) {
                return msg.readStatus === 'Unread' && !(0, _messageHelper.messageIsDeleted)(msg);
              }).map(function (m) {
                return m.id;
              });
              if (!(unreadMessageIds.length === 0)) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              ownerId = this._auth.ownerId;
              _context.n = 3;
              return this._updateMessagesApi(unreadMessageIds, 'Read');
            case 3:
              updatedMessages = _context.v;
              if (!(ownerId !== this._auth.ownerId)) {
                _context.n = 4;
                break;
              }
              return _context.a(2);
            case 4:
              this.pushMessages(updatedMessages);
            case 5:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _setConversationAsRead(_x) {
        return _setConversationAsRead2.apply(this, arguments);
      }
      return _setConversationAsRead;
    }()
  }]);
}(_MessageStoreBase2.MessageStoreBase)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=SmsMessageStore.js.map
