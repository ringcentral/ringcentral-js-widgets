"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentMessages = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.date.to-iso-string.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
var _concurrentExecute = _interopRequireDefault(require("@ringcentral-integration/commons/lib/concurrentExecute"));
var _getDateFrom = _interopRequireDefault(require("@ringcentral-integration/commons/lib/getDateFrom"));
var _messageHelper = require("@ringcentral-integration/commons/lib/messageHelper");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _MessageStore = require("../MessageStore");
var _messageStatus = require("./messageStatus");
var _recentMessagesHelper = require("./recentMessagesHelper");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var RecentMessages = exports.RecentMessages = (_dec = (0, _nextCore.injectable)({
  name: 'RecentMessages'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _services.Client === "undefined" ? Object : _services.Client, typeof _MessageStore.MessageStore === "undefined" ? Object : _MessageStore.MessageStore]), _dec4 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec5 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec6 = Reflect.metadata("design:type", typeof _messageStatus.MessageStatus === "undefined" ? Object : _messageStatus.MessageStatus), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [typeof LoadSuccessOptions === "undefined" ? Object : LoadSuccessOptions]), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [typeof LoadResetOptions === "undefined" ? Object : LoadResetOptions]), _dec11 = (0, _nextCore.computed)(function (that) {
  return [that.messages];
}), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", []), _dec14 = (0, _nextCore.delegate)('server'), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [typeof GetMessagesOptions === "undefined" ? Object : GetMessagesOptions]), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function RecentMessages(_client, _messageStore) {
    var _this;
    _classCallCheck(this, RecentMessages);
    _this = _callSuper(this, RecentMessages);
    _this._client = _client;
    _this._messageStore = _messageStore;
    _initializerDefineProperty(_this, "contacts", _descriptor, _this);
    _initializerDefineProperty(_this, "messages", _descriptor2, _this);
    _initializerDefineProperty(_this, "messageStatus", _descriptor3, _this);
    return _this;
  }
  _inherits(RecentMessages, _RcModule);
  return _createClass(RecentMessages, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _nextCore.watch)(this, function () {
        return _this2._messageStore.timestamp;
      }, function () {
        if (_this2.ready && Object.keys(_this2.messages).length > 0) {
          for (var _i = 0, _Object$keys = Object.keys(_this2.contacts); _i < _Object$keys.length; _i++) {
            var key = _Object$keys[_i];
            _this2.getMessages({
              currentContact: _this2.contacts[key],
              sessionId: key.indexOf('-') > -1 ? key.split('-')[1] : null,
              fromLocal: false,
              forceUpdate: true
            });
          }
        }
      });
    }
  }, {
    key: "initLoad",
    value: function initLoad() {
      this.messageStatus = _messageStatus.MessageStatus.loading;
    }
  }, {
    key: "loadSuccess",
    value: function loadSuccess(_ref) {
      var contact = _ref.contact,
        messages = _ref.messages,
        sessionId = _ref.sessionId;
      this.messageStatus = _messageStatus.MessageStatus.loaded;
      var contactId = String(contact && contact.id);
      var id = sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId;
      this.contacts[id] = contact;
      this.messages[id] = messages;
    }
  }, {
    key: "loadReset",
    value: function loadReset(_ref2) {
      var contact = _ref2.contact,
        sessionId = _ref2.sessionId;
      var contactId = String(contact && contact.id);
      var id = sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId;
      delete this.contacts[id];
      delete this.messages[id];
    }
  }, {
    key: "unreadMessageCounts",
    get: function get() {
      var _this3 = this;
      return Object.keys(this.messages).reduce(function (unreadCounts, contactId) {
        unreadCounts[contactId] = _this3.messages[contactId].reduce(function (acc, cur) {
          return acc + (cur.readStatus !== 'Read' ? 1 : 0);
        }, 0);
        return unreadCounts;
      }, {});
    }
  }, {
    key: "isMessagesLoaded",
    get: function get() {
      return this.messageStatus === _messageStatus.MessageStatus.loaded;
    }
  }, {
    key: "getMessages",
    value: function () {
      var _getMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref3) {
        var currentContact, _ref3$sessionId, sessionId, _ref3$fromLocal, fromLocal, _ref3$forceUpdate, forceUpdate, contactId, messages;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              currentContact = _ref3.currentContact, _ref3$sessionId = _ref3.sessionId, sessionId = _ref3$sessionId === void 0 ? null : _ref3$sessionId, _ref3$fromLocal = _ref3.fromLocal, fromLocal = _ref3$fromLocal === void 0 ? false : _ref3$fromLocal, _ref3$forceUpdate = _ref3.forceUpdate, forceUpdate = _ref3$forceUpdate === void 0 ? false : _ref3$forceUpdate;
              if (currentContact) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              contactId = currentContact.id;
              if (!(!forceUpdate && !!this.messages[sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId])) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              this.initLoad();
              _context.n = 3;
              return this._getRecentMessages(currentContact, this._messageStore.textConversations, fromLocal);
            case 3:
              messages = _context.v;
              this.loadSuccess({
                messages: messages,
                contact: currentContact,
                sessionId: sessionId
              });
            case 4:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function getMessages(_x) {
        return _getMessages.apply(this, arguments);
      }
      return getMessages;
    }()
  }, {
    key: "cleanUpMessages",
    value: function cleanUpMessages(_ref4) {
      var contact = _ref4.contact,
        _ref4$sessionId = _ref4.sessionId,
        sessionId = _ref4$sessionId === void 0 ? null : _ref4$sessionId;
      this.loadReset({
        contact: contact,
        sessionId: sessionId
      });
    }

    /**
     * Searching for recent messages of specific contact.
     * @param currentContact - Current contact
     * @param messages - Messages in messageStore
     * @param fromLocal - Only get recent messages locally
     * @param daySpan - Find messages within certain days
     * @param length - Maximum length of recent messages
     * @return
     * @private
     */
  }, {
    key: "_getRecentMessages",
    value: (function () {
      var _getRecentMessages2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(currentContact) {
        var conversations,
          fromLocal,
          daySpan,
          length,
          dateFrom,
          recentMessages,
          dateTo,
          _args2 = arguments,
          _t,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              conversations = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
              fromLocal = _args2.length > 2 ? _args2[2] : undefined;
              daySpan = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 60;
              length = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : 5;
              dateFrom = (0, _getDateFrom["default"])(daySpan);
              recentMessages = this._getLocalRecentMessages(currentContact, conversations, dateFrom, length); // If we could not find enough recent messages,
              // we need to search for messages on server.
              if (!(!fromLocal && recentMessages.length < length)) {
                _context2.n = 4;
                break;
              }
              dateTo = recentMessages.length > 0 ? new Date(recentMessages[recentMessages.length - 1].creationTime) : undefined;
              _context2.p = 1;
              _t = recentMessages;
              _context2.n = 2;
              return this._fetchRemoteRecentMessages(currentContact, dateFrom.toISOString(), dateTo && dateTo.toISOString(), length);
            case 2:
              recentMessages = _t.concat.call(_t, _context2.v);
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              console.error(_t2);
            case 4:
              recentMessages = (0, _recentMessagesHelper.dedup)(recentMessages);
              return _context2.a(2, recentMessages.length > length ? recentMessages.slice(0, length) : recentMessages);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function _getRecentMessages(_x2) {
        return _getRecentMessages2.apply(this, arguments);
      }
      return _getRecentMessages;
    }()
    /**
     * Get recent messages from messageStore.
     */
    )
  }, {
    key: "_getLocalRecentMessages",
    value: function _getLocalRecentMessages(_ref5, conversations, dateFrom, length) {
      var phoneNumbers = _ref5.phoneNumbers;
      // Get all messages related to this contact
      var recentMessages = [];
      var matches;
      for (var i = conversations.length - 1; i >= 0; i -= 1) {
        var conversation = conversations[i];
        var messageList = this._messageStore.conversationStore[conversation.conversationId] || [];
        matches = phoneNumbers.find((0, _recentMessagesHelper.filterPhoneNumber)(conversation));
        // Check if message is within certain days
        if (!!matches && new Date(conversation.creationTime) > dateFrom) {
          recentMessages = recentMessages.concat(messageList);
        }
        if (recentMessages.length >= length) break;
      }
      return recentMessages.sort(_messageHelper.sortByDate).slice(0, length);
    }

    /**
     * Fetch recent messages from server by given current contact.
     */
  }, {
    key: "_fetchRemoteRecentMessages",
    value: (function () {
      var _fetchRemoteRecentMessages2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref6, dateFrom) {
        var _this4 = this;
        var phoneNumbers,
          dateTo,
          length,
          params,
          recentMessagesPromise,
          allMessages,
          messageRecords,
          remoteMessage,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              phoneNumbers = _ref6.phoneNumbers;
              dateTo = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : new Date().toISOString();
              length = _args3.length > 3 ? _args3[3] : undefined;
              params = {
                dateTo: dateTo,
                dateFrom: dateFrom,
                messageType: ['SMS', 'Text', 'Pager'],
                perPage: length
              };
              recentMessagesPromise = phoneNumbers.reduce(function (acc, _ref7) {
                var phoneNumber = _ref7.phoneNumber;
                if (phoneNumber) {
                  var promise = _this4._fetchMessageList(_objectSpread(_objectSpread({}, params), {}, {
                    phoneNumber: phoneNumber
                  }));
                  return acc.concat(promise);
                }
                return acc;
              }, []); // TODO: Because we need to navigate to the message page,
              // So we may need to push new messages to messageStore
              _context3.n = 1;
              return (0, _concurrentExecute["default"])(recentMessagesPromise, 5, {
                delay: 500
              });
            case 1:
              allMessages = _context3.v;
              messageRecords = (0, _recentMessagesHelper.flattenToMessageRecords)(allMessages);
              remoteMessage = (0, _recentMessagesHelper.markAsRemoteMessage)(messageRecords);
              return _context3.a(2, (0, _recentMessagesHelper.sortMessages)(remoteMessage));
          }
        }, _callee3);
      }));
      function _fetchRemoteRecentMessages(_x3, _x4) {
        return _fetchRemoteRecentMessages2.apply(this, arguments);
      }
      return _fetchRemoteRecentMessages;
    }())
  }, {
    key: "_fetchMessageList",
    value: function _fetchMessageList(params) {
      var _this5 = this;
      // TODO: Fix type
      return function () {
        return _this5._client.account().extension().messageStore().list(params);
      };
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "contacts", [_nextCore.state, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "messages", [_nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "messageStatus", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "initLoad", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "initLoad"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadSuccess", [_nextCore.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "loadSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadReset", [_nextCore.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "loadReset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unreadMessageCounts", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "unreadMessageCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMessages", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "getMessages"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=RecentMessages.js.map
