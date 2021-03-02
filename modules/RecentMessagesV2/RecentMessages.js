"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentMessages = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.date.to-iso-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _core = require("@ringcentral-integration/core");

var _proxify = require("../../lib/proxy/proxify");

var _di = require("../../lib/di");

var _messageStatus = require("./messageStatus");

var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));

var _concurrentExecute = _interopRequireDefault(require("../../lib/concurrentExecute"));

var _messageHelper = require("../../lib/messageHelper");

var _recentMessagesHelper = require("./recentMessagesHelper");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * Retrieve all recent messages related to a specified contact.
 */
var RecentMessages = (_dec = (0, _di.Module)({
  name: 'RecentMessages',
  deps: ['Client', 'MessageStore']
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.messages];
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
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
     * @param {Object} currentContact - Current contact
     * @param {Array} messages - Messages in messageStore
     * @param {Boolean} fromLocal - Only get recent messages locally
     * @param {Number} daySpan - Find messages within certain days
     * @param {Number} length - Maximum length of recent messages
     * @return {Array}
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

                dateTo = recentMessages.length > 0 ? new Date(recentMessages[recentMessages.length - 1].creationTime) : undefined;
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
        var messageList = this._deps.messageStore.conversationStore[conversation.conversationId] || [];
        matches = phoneNumbers.find((0, _recentMessagesHelper.filterPhoneNumber)(conversation)); // Check if message is within certain days

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
    value: function _fetchRemoteRecentMessages(_ref6, dateFrom) {
      var _this3 = this;

      var phoneNumbers = _ref6.phoneNumbers;
      var dateTo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date().toISOString();
      var length = arguments.length > 3 ? arguments[3] : undefined;
      var params = {
        dateTo: dateTo,
        dateFrom: dateFrom,
        messageType: ['SMS', 'Text', 'Pager'],
        perPage: length
      };
      var recentMessagesPromise = phoneNumbers.reduce(function (acc, _ref7) {
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

      return (0, _concurrentExecute["default"])(recentMessagesPromise, 5, 500).then(_recentMessagesHelper.flattenToMessageRecords).then(_recentMessagesHelper.markAsRemoteMessage).then(function (messages) {
        return (0, _recentMessagesHelper.sortMessages)(messages);
      });
    }
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
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "contacts", [_core.state], {
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
