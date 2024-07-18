"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.reduce");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.array.sort");
require("core-js/modules/es.date.to-iso-string");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentMessages = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _concurrentExecute = _interopRequireDefault(require("../../lib/concurrentExecute"));
var _di = require("../../lib/di");
var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));
var _messageHelper = require("../../lib/messageHelper");
var _proxify = require("../../lib/proxy/proxify");
var _messageStatus = require("./messageStatus");
var _recentMessagesHelper = require("./recentMessagesHelper");
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
 * Retrieve all recent messages related to a specified contact.
 */
var RecentMessages = (_dec = (0, _di.Module)({
  name: 'RecentMessages',
  deps: ['Client', 'MessageStore']
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.messages];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(RecentMessages, _RcModuleV);
  var _super = _createSuper(RecentMessages);
  function RecentMessages(deps) {
    var _this;
    _classCallCheck(this, RecentMessages);
    _this = _super.call(this, {
      deps: deps
    });
    _initializerDefineProperty(_this, "contacts", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "messages", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "messageStatus", _descriptor3, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(RecentMessages, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _core.watch)(this, function () {
        return _this2._deps.messageStore.timestamp;
      }, function () {
        if (_this2.ready && Object.keys(_this2.messages).length > 0) {
          for (var _i = 0, _Object$keys = Object.keys(_this2.contacts); _i < _Object$keys.length; _i++) {
            var key = _Object$keys[_i];
            _this2.getMessages({
              currentContact: _this2.contacts[key],
              // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
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
    key: "getMessages",
    value: function () {
      var _getMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref3) {
        var currentContact, _ref3$sessionId, sessionId, _ref3$fromLocal, fromLocal, _ref3$forceUpdate, forceUpdate, contactId, messages;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currentContact = _ref3.currentContact, _ref3$sessionId = _ref3.sessionId, sessionId = _ref3$sessionId === void 0 ? null : _ref3$sessionId, _ref3$fromLocal = _ref3.fromLocal, fromLocal = _ref3$fromLocal === void 0 ? false : _ref3$fromLocal, _ref3$forceUpdate = _ref3.forceUpdate, forceUpdate = _ref3$forceUpdate === void 0 ? false : _ref3$forceUpdate;
                if (currentContact) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return");
              case 3:
                contactId = currentContact.id;
                if (!(!forceUpdate && !!this.messages[sessionId ? "".concat(contactId, "-").concat(sessionId) : contactId])) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return");
              case 6:
                this.initLoad();
                _context.next = 9;
                return this._getRecentMessages(currentContact, this._deps.messageStore.textConversations, fromLocal);
              case 9:
                messages = _context.sent;
                this.loadSuccess({
                  messages: messages,
                  contact: currentContact,
                  sessionId: sessionId
                });
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function getMessages(_x) {
        return _getMessages.apply(this, arguments);
      }
      return getMessages;
    }() // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
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
    value: function () {
      var _getRecentMessages2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(currentContact) {
        var conversations,
          fromLocal,
          daySpan,
          length,
          dateFrom,
          recentMessages,
          dateTo,
          _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                conversations = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
                fromLocal = _args2.length > 2 ? _args2[2] : undefined;
                daySpan = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 60;
                length = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : 5;
                dateFrom = (0, _getDateFrom["default"])(daySpan);
                recentMessages = this._getLocalRecentMessages(currentContact, conversations, dateFrom, length); // If we could not find enough recent messages,
                // we need to search for messages on server.
                if (!(!fromLocal && recentMessages.length < length)) {
                  _context2.next = 19;
                  break;
                }
                dateTo = recentMessages.length > 0 ?
                // @ts-expect-error TS(2769): No overload matches this call.
                new Date(recentMessages[recentMessages.length - 1].creationTime) : undefined;
                _context2.prev = 8;
                _context2.t0 = recentMessages;
                _context2.next = 12;
                return this._fetchRemoteRecentMessages(currentContact, dateFrom.toISOString(), dateTo && dateTo.toISOString(), length);
              case 12:
                _context2.t1 = _context2.sent;
                recentMessages = _context2.t0.concat.call(_context2.t0, _context2.t1);
                _context2.next = 19;
                break;
              case 16:
                _context2.prev = 16;
                _context2.t2 = _context2["catch"](8);
                console.error(_context2.t2);
              case 19:
                recentMessages = (0, _recentMessagesHelper.dedup)(recentMessages);
                return _context2.abrupt("return", recentMessages.length > length ? recentMessages.slice(0, length) : recentMessages);
              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 16]]);
      }));
      function _getRecentMessages(_x2) {
        return _getRecentMessages2.apply(this, arguments);
      }
      return _getRecentMessages;
    }()
    /**
     * Get recent messages from messageStore.
     */
  }, {
    key: "_getLocalRecentMessages",
    value: function _getLocalRecentMessages(_ref5, conversations, dateFrom, length) {
      var phoneNumbers = _ref5.phoneNumbers;
      // Get all messages related to this contact
      var recentMessages = [];
      var matches;
      for (var i = conversations.length - 1; i >= 0; i -= 1) {
        var conversation = conversations[i];
        var messageList = this._deps.messageStore.conversationStore[
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        conversation.conversationId] || [];
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        matches = phoneNumbers.find((0, _recentMessagesHelper.filterPhoneNumber)(conversation));
        // Check if message is within certain days
        // @ts-expect-error TS(2769): No overload matches this call.
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
    value: function () {
      var _fetchRemoteRecentMessages2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6, dateFrom) {
        var _this3 = this;
        var phoneNumbers,
          dateTo,
          length,
          params,
          recentMessagesPromise,
          allMessages,
          messageRecords,
          remoteMessage,
          _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                phoneNumbers = _ref6.phoneNumbers;
                dateTo = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : new Date().toISOString();
                length = _args3.length > 3 ? _args3[3] : undefined;
                params = {
                  dateTo: dateTo,
                  dateFrom: dateFrom,
                  messageType: ['SMS', 'Text', 'Pager'],
                  perPage: length
                }; // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                recentMessagesPromise = phoneNumbers.reduce(function (acc, _ref7) {
                  var phoneNumber = _ref7.phoneNumber;
                  if (phoneNumber) {
                    var promise = _this3._fetchMessageList(_objectSpread(_objectSpread({}, params), {}, {
                      phoneNumber: phoneNumber
                    }));
                    return acc.concat(promise);
                  }
                  return acc;
                }, []); // TODO: Because we need to navigate to the message page,
                // So we may need to push new messages to messageStore
                _context3.next = 7;
                return (0, _concurrentExecute["default"])(recentMessagesPromise, 5, {
                  delay: 500
                });
              case 7:
                allMessages = _context3.sent;
                messageRecords = (0, _recentMessagesHelper.flattenToMessageRecords)(allMessages);
                remoteMessage = (0, _recentMessagesHelper.markAsRemoteMessage)(messageRecords);
                return _context3.abrupt("return", (0, _recentMessagesHelper.sortMessages)(remoteMessage));
              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      function _fetchRemoteRecentMessages(_x3, _x4) {
        return _fetchRemoteRecentMessages2.apply(this, arguments);
      }
      return _fetchRemoteRecentMessages;
    }()
  }, {
    key: "_fetchMessageList",
    value: function _fetchMessageList(params) {
      var _this4 = this;
      return function () {
        return _this4._deps.client.account().extension().messageStore().list(params);
      };
    }
  }, {
    key: "unreadMessageCounts",
    get: function get() {
      var _this5 = this;
      return Object.keys(this.messages).reduce(function (unreadCounts, contactId) {
        unreadCounts[contactId] = _this5.messages[contactId].reduce(function (acc, cur) {
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
  }]);
  return RecentMessages;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "contacts", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "messages", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "messageStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "initLoad", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "initLoad"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadSuccess", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "loadSuccess"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadReset", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "loadReset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "unreadMessageCounts", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "unreadMessageCounts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMessages", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMessages"), _class2.prototype)), _class2)) || _class);
exports.RecentMessages = RecentMessages;
//# sourceMappingURL=RecentMessages.js.map
