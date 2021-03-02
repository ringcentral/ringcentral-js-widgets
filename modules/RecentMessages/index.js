"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

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

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _selector = require("../../lib/selector");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _messageStatus = _interopRequireDefault(require("./messageStatus"));

var _getRecentMessagesReducer = _interopRequireDefault(require("./getRecentMessagesReducer"));

var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));

var _concurrentExecute = _interopRequireDefault(require("../../lib/concurrentExecute"));

var _messageHelper = require("../../lib/messageHelper");

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var RecentMessages = (
/**
 * @class
 * @description Retrieve all recent messages related to a specified contact.
 */
_dec = (0, _di.Module)({
  deps: ['Client', 'MessageStore']
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(RecentMessages, _RcModule);

  var _super = _createSuper(RecentMessages);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {MessageStore} params.messageStore - messageStore module instance
   * @param {Client} params.client - client module instance
   */
  function RecentMessages(_ref) {
    var _this;

    var client = _ref.client,
        messageStore = _ref.messageStore,
        options = _objectWithoutProperties(_ref, ["client", "messageStore"]);

    _classCallCheck(this, RecentMessages);

    _this = _super.call(this, _objectSpread({
      actionTypes: _actionTypes["default"]
    }, options));

    _initializerDefineProperty(_this, "unreadMessageCounts", _descriptor, _assertThisInitialized(_this));

    _this._client = _ensureExist["default"].call(_assertThisInitialized(_this), client, 'client');
    _this._messageStore = _ensureExist["default"].call(_assertThisInitialized(_this), messageStore, 'messageStore');
    _this._reducer = (0, _getRecentMessagesReducer["default"])(_this.actionTypes);
    _this._prevMessageStoreTimestamp = null;
    return _this;
  }

  _createClass(RecentMessages, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this.pending && this._messageStore.ready) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this.ready && !this._messageStore.ready) {
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      } else if (Object.keys(this.messages).length > 0) {
        // Listen to messageStore state changes
        if (this._messageStore.timestamp !== this._prevMessageStoreTimestamp) {
          this._prevMessageStoreTimestamp = this._messageStore.timestamp; // for (const contact of Object.values(this.contacts)) {
          //   this.getMessages(contact, false, true);
          // }

          for (var _i = 0, _Object$keys = Object.keys(this.contacts); _i < _Object$keys.length; _i++) {
            var key = _Object$keys[_i];
            this.getMessages({
              currentContact: this.contacts[key],
              sessionId: key.indexOf('-') > -1 ? key.split('-')[1] : null,
              fromLocale: false,
              forceUpdate: true
            });
          }
        }
      }
    }
  }, {
    key: "getMessages",
    value: function () {
      var _getMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var currentContact, _ref2$sessionId, sessionId, _ref2$fromLocal, fromLocal, _ref2$forceUpdate, forceUpdate, contactId, messages;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                currentContact = _ref2.currentContact, _ref2$sessionId = _ref2.sessionId, sessionId = _ref2$sessionId === void 0 ? null : _ref2$sessionId, _ref2$fromLocal = _ref2.fromLocal, fromLocal = _ref2$fromLocal === void 0 ? false : _ref2$fromLocal, _ref2$forceUpdate = _ref2.forceUpdate, forceUpdate = _ref2$forceUpdate === void 0 ? false : _ref2$forceUpdate;

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
                this._prevMessageStoreTimestamp = this._messageStore.timestamp;
                this.store.dispatch({
                  type: this.actionTypes.initLoad
                });
                _context.next = 10;
                return this._getRecentMessages(currentContact, this._messageStore.textConversations, fromLocal);

              case 10:
                messages = _context.sent;
                this.store.dispatch({
                  type: this.actionTypes.loadSuccess,
                  messages: messages,
                  contact: currentContact,
                  sessionId: sessionId
                });

              case 12:
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
    value: function cleanUpMessages(_ref3) {
      var contact = _ref3.contact,
          _ref3$sessionId = _ref3.sessionId,
          sessionId = _ref3$sessionId === void 0 ? null : _ref3$sessionId;
      this.store.dispatch({
        type: this.actionTypes.loadReset,
        contact: contact,
        sessionId: sessionId
      });
    }
  }, {
    key: "_getRecentMessages",

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
                recentMessages = this._dedup(recentMessages);
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
     * @param {Object} currentContact
     * @param {Array} messages
     * @param {Date} dateFrom
     * @param {Number} length
     */

  }, {
    key: "_getLocalRecentMessages",
    value: function _getLocalRecentMessages(_ref4, conversations, dateFrom, length) {
      var phoneNumbers = _ref4.phoneNumbers;
      // Get all messages related to this contact
      var recentMessages = [];
      var matches;

      for (var i = conversations.length - 1; i >= 0; i -= 1) {
        var conversation = conversations[i];
        var messageList = this._messageStore.conversationStore[conversation.conversationId] || [];
        matches = phoneNumbers.find(this._filterPhoneNumber(conversation)); // Check if message is within certain days

        if (!!matches && new Date(conversation.creationTime) > dateFrom) {
          recentMessages = recentMessages.concat(messageList);
        }

        if (recentMessages.length >= length) break;
      }

      return recentMessages.sort(_messageHelper.sortByDate).slice(0, length);
    }
  }, {
    key: "_filterPhoneNumber",
    value: function _filterPhoneNumber(message) {
      return function (_ref5) {
        var phoneNumber = _ref5.phoneNumber;
        return phoneNumber === message.from.phoneNumber || !!message.to.find(function (to) {
          return to.phoneNumber === phoneNumber;
        }) || phoneNumber === message.from.extensionNumber || !!message.to.find(function (to) {
          return to.extensionNumber === phoneNumber;
        });
      };
    }
    /**
     * Fetch recent messages from server by given current contact.
     * @param {Object} currentContact
     * @param {String} dateFrom
     * @param {String} dateTo
     * @param {Number} length The number of messages
     * @return {Array}
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

      return (0, _concurrentExecute["default"])(recentMessagesPromise, 5, 500).then(this._flattenToMessageRecords).then(this._markAsRemoteMessage).then(function (messages) {
        return _this3._sortMessages(messages);
      });
    }
  }, {
    key: "_fetchMessageList",
    value: function _fetchMessageList(params) {
      var _this4 = this;

      return function () {
        return _this4._client.account().extension().messageStore().list(params);
      };
    }
  }, {
    key: "_countUnreadMessages",
    value: function _countUnreadMessages(messages) {
      return messages.reduce(function (acc, cur) {
        return acc + (cur.readStatus !== 'Read' ? 1 : 0);
      }, 0);
    }
  }, {
    key: "_flattenToMessageRecords",
    value: function _flattenToMessageRecords(allMessages) {
      return allMessages.reduce(function (acc, _ref8) {
        var records = _ref8.records;
        return acc.concat(records);
      }, []);
    }
  }, {
    key: "_sortMessages",
    value: function _sortMessages(recentMessages) {
      // Sort by time in descending order
      return recentMessages.sort(function (a, b) {
        return new Date(b.creationTime) - new Date(a.creationTime);
      });
    }
  }, {
    key: "_markAsRemoteMessage",
    value: function _markAsRemoteMessage(messages) {
      return messages.map(function (message) {
        message.fromRemote = true;
        return message;
      });
    }
  }, {
    key: "_dedup",
    value: function _dedup(messages) {
      var hash = {};
      return messages.reduce(function (acc, cur) {
        if (hash[cur.id]) return acc;
        hash[cur.id] = true;
        return acc.concat(cur);
      }, []);
    }
  }, {
    key: "contacts",
    get: function get() {
      return this.state.contacts;
    }
  }, {
    key: "messages",
    get: function get() {
      return this.state.messages;
    }
  }, {
    key: "isMessagesLoaded",
    get: function get() {
      return this.state.messageStatus === _messageStatus["default"].loaded;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }]);

  return RecentMessages;
}(_RcModule2["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "unreadMessageCounts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5.messages;
    }, function (messages) {
      return Object.keys(messages).reduce(function (unreadCounts, contactId) {
        unreadCounts[contactId] = messages[contactId].reduce(function (acc, cur) {
          return acc + (cur.readStatus !== 'Read' ? 1 : 0);
        }, 0);
        return unreadCounts;
      }, {});
    }];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "getMessages", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getMessages"), _class2.prototype)), _class2)) || _class);
exports["default"] = RecentMessages;
//# sourceMappingURL=index.js.map
