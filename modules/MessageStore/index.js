'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _batchApiHelper = require('../../lib/batchApiHelper');

var _messageStoreHelper = require('./messageStoreHelper');

var messageStoreHelper = _interopRequireWildcard(_messageStoreHelper);

var _messageStoreActionTypes = require('./messageStoreActionTypes');

var _messageStoreActionTypes2 = _interopRequireDefault(_messageStoreActionTypes);

var _getMessageStoreReducer = require('./getMessageStoreReducer');

var _getMessageStoreReducer2 = _interopRequireDefault(_getMessageStoreReducer);

var _getCacheReducer = require('./getCacheReducer');

var _getCacheReducer2 = _interopRequireDefault(_getCacheReducer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageStore = function (_RcModule) {
  (0, _inherits3.default)(MessageStore, _RcModule);

  function MessageStore(_ref) {
    var alert = _ref.alert,
        client = _ref.client,
        auth = _ref.auth,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? 30 * 60 * 1000 : _ref$ttl,
        storage = _ref.storage,
        subscription = _ref.subscription,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'client', 'auth', 'ttl', 'storage', 'subscription']);
    (0, _classCallCheck3.default)(this, MessageStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessageStore.__proto__ || (0, _getPrototypeOf2.default)(MessageStore)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _messageStoreActionTypes2.default
    })));

    _this._alert = alert;
    _this._client = client;
    _this._storage = storage;
    _this._storageKey = 'messageStore';
    _this._subscription = subscription;
    _this._reducer = (0, _getMessageStoreReducer2.default)(_this.actionTypes);
    _this._cacheReducer = (0, _getCacheReducer2.default)(_this.actionTypes);
    _this._ttl = ttl;
    _this._auth = auth;
    _this._promise = null;
    _this.syncConversation = _this.syncConversation.bind(_this);
    storage.registerReducer({ key: _this._storageKey, reducer: _this._cacheReducer });
    return _this;
  }

  (0, _createClass3.default)(MessageStore, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.init
        });
        if (this._shouleCleanCache()) {
          this._cleanUpCache();
        }
        this._initMessageStore();
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      } else if (this.ready) {
        this._subscriptionHandler();
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._storage.ready && this._subscription.ready && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._storage.ready || !this._subscription.ready) && this.ready;
    }
  }, {
    key: '_shouleCleanCache',
    value: function _shouleCleanCache() {
      return this._auth.isFreshLogin || Date.now() - this.conversationsTimestamp > this._ttl || Date.now() - this.messagesTimestamp > this._ttl;
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: '_cleanUpCache',
    value: function _cleanUpCache() {
      this.store.dispatch({
        type: this.actionTypes.cleanUp
      });
    }
  }, {
    key: '_initMessageStore',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._syncMessages();

              case 2:
                this._subscription.subscribe('/account/~/extension/~/message-store');
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _initMessageStore() {
        return _ref2.apply(this, arguments);
      }

      return _initMessageStore;
    }()
  }, {
    key: '_subscriptionHandler',
    value: function _subscriptionHandler() {
      var accountExtesionEndPoint = /\/message-store$/;
      var message = this._subscription.message;
      if (message !== null && accountExtesionEndPoint.test(message.event) && message.body && message.body.changes) {
        this._syncMessages();
      }
    }
  }, {
    key: 'findConversationById',
    value: function findConversationById(id) {
      return this.conversations[id.toString()];
    }
  }, {
    key: '_messageSyncApi',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(params) {
        var response;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._client.account().extension().messageSync().list(params);

              case 2:
                response = _context2.sent;
                return _context2.abrupt('return', response);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _messageSyncApi(_x) {
        return _ref3.apply(this, arguments);
      }

      return _messageSyncApi;
    }()
  }, {
    key: '_updateConversationFromSync',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(id) {
        var oldConversation, syncToken, params, newConversationRequest, _getConversationsAndM, conversations, messages;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                oldConversation = this.findConversationById(id);
                syncToken = oldConversation && oldConversation.syncToken;
                params = messageStoreHelper.getMessageSyncParams({
                  syncToken: syncToken,
                  conversationId: id
                });
                _context3.next = 5;
                return this._messageSyncApi(params);

              case 5:
                newConversationRequest = _context3.sent;
                _getConversationsAndM = this._getConversationsAndMessagesFromSyncResponse(newConversationRequest), conversations = _getConversationsAndM.conversations, messages = _getConversationsAndM.messages;

                this._saveConversationsAndMessages(conversations, messages, null);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _updateConversationFromSync(_x2) {
        return _ref4.apply(this, arguments);
      }

      return _updateConversationFromSync;
    }()
  }, {
    key: '_updateMessagesFromSync',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var syncToken, params, newConversationRequest, _getConversationsAndM2, conversations, messages;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                syncToken = this.syncToken;
                params = messageStoreHelper.getMessageSyncParams({ syncToken: syncToken });
                _context4.next = 4;
                return this._messageSyncApi(params);

              case 4:
                newConversationRequest = _context4.sent;
                _getConversationsAndM2 = this._getConversationsAndMessagesFromSyncResponse(newConversationRequest), conversations = _getConversationsAndM2.conversations, messages = _getConversationsAndM2.messages;

                this._saveConversationsAndMessages(conversations, messages, newConversationRequest.syncInfo.syncToken);

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _updateMessagesFromSync() {
        return _ref5.apply(this, arguments);
      }

      return _updateMessagesFromSync;
    }()
  }, {
    key: '_getConversationsAndMessagesFromSyncResponse',
    value: function _getConversationsAndMessagesFromSyncResponse(conversationResponse) {
      var records = conversationResponse.records.reverse();
      var syncToken = conversationResponse.syncInfo.syncToken;
      return messageStoreHelper.getNewConversationsAndMessagesFromRecords({
        records: records,
        syncToken: syncToken,
        conversations: this.conversations,
        messages: this.messages
      });
    }
  }, {
    key: '_sync',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(syncFunction) {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this._promise) {
                  this._promise = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
                    return _regenerator2.default.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.prev = 0;

                            _this3.store.dispatch({
                              type: _this3.actionTypes.sync
                            });
                            _context5.next = 4;
                            return syncFunction();

                          case 4:
                            _this3.store.dispatch({
                              type: _this3.actionTypes.syncOver
                            });
                            _this3._promise = null;
                            _context5.next = 13;
                            break;

                          case 8:
                            _context5.prev = 8;
                            _context5.t0 = _context5['catch'](0);

                            _this3.store.dispatch({
                              type: _this3.actionTypes.syncError
                            });
                            _this3._promise = null;
                            throw _context5.t0;

                          case 13:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, _this3, [[0, 8]]);
                  }))();
                }
                _context6.next = 3;
                return this._promise;

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _sync(_x3) {
        return _ref6.apply(this, arguments);
      }

      return _sync;
    }()
  }, {
    key: '_syncMessages',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
        var _this4 = this;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._sync((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
                  return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return _this4._updateMessagesFromSync();

                        case 2:
                        case 'end':
                          return _context7.stop();
                      }
                    }
                  }, _callee7, _this4);
                })));

              case 2:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _syncMessages() {
        return _ref8.apply(this, arguments);
      }

      return _syncMessages;
    }()
  }, {
    key: 'syncConversation',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(id) {
        var _this5 = this;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._sync((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
                  return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return _this5._updateConversationFromSync(id);

                        case 2:
                        case 'end':
                          return _context9.stop();
                      }
                    }
                  }, _callee9, _this5);
                })));

              case 2:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function syncConversation(_x4) {
        return _ref10.apply(this, arguments);
      }

      return syncConversation;
    }()
  }, {
    key: '_updateMessageApi',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(messageId, status) {
        var body, updateRequest;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                body = {
                  readStatus: status
                };
                _context11.next = 3;
                return this._client.account().extension().messageStore(messageId).put(body);

              case 3:
                updateRequest = _context11.sent;
                return _context11.abrupt('return', updateRequest);

              case 5:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function _updateMessageApi(_x5, _x6) {
        return _ref12.apply(this, arguments);
      }

      return _updateMessageApi;
    }()
  }, {
    key: '_batchUpdateMessagesApi',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(messageIds, body) {
        var ids, platform, responses;
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                ids = decodeURIComponent(messageIds.join(','));
                platform = this._client.service.platform();
                _context12.next = 4;
                return (0, _batchApiHelper.batchPutApi)({
                  platform: platform,
                  url: '/account/~/extension/~/message-store/' + ids,
                  body: body
                });

              case 4:
                responses = _context12.sent;
                return _context12.abrupt('return', responses);

              case 6:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _batchUpdateMessagesApi(_x7, _x8) {
        return _ref13.apply(this, arguments);
      }

      return _batchUpdateMessagesApi;
    }()
  }, {
    key: '_updateMessagesApi',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(messageIds, status) {
        var result, UPDATE_MESSAGE_ONCE_COUNT, leftIds, rightIds, body, responses, results, rightResults;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!(messageIds.length === 1)) {
                  _context13.next = 5;
                  break;
                }

                _context13.next = 3;
                return this._updateMessageApi(messageIds[0], status);

              case 3:
                result = _context13.sent;
                return _context13.abrupt('return', [result]);

              case 5:
                UPDATE_MESSAGE_ONCE_COUNT = 20;
                leftIds = messageIds.slice(0, UPDATE_MESSAGE_ONCE_COUNT);
                rightIds = messageIds.slice(UPDATE_MESSAGE_ONCE_COUNT);
                body = leftIds.map(function () {
                  return { body: { readStatus: status } };
                });
                _context13.next = 11;
                return this._batchUpdateMessagesApi(leftIds, body);

              case 11:
                responses = _context13.sent;
                results = [];

                responses.forEach(function (res) {
                  if (res.response().status === 200) {
                    results.push(res.json());
                  }
                });

                if (!(rightIds.length > 0)) {
                  _context13.next = 19;
                  break;
                }

                _context13.next = 17;
                return this._updateMessagesApi(rightIds, status);

              case 17:
                rightResults = _context13.sent;

                if (rightResults.length > 0) {
                  results.concat(rightResults);
                }

              case 19:
                return _context13.abrupt('return', results);

              case 20:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function _updateMessagesApi(_x9, _x10) {
        return _ref14.apply(this, arguments);
      }

      return _updateMessagesApi;
    }()
  }, {
    key: 'readMessages',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(conversation) {
        var unReadMessages, unreadMessageIds, updatedMessages;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                unReadMessages = messageStoreHelper.filterConversationUnreadMessages(conversation);

                if (!(unReadMessages.length === 0)) {
                  _context14.next = 3;
                  break;
                }

                return _context14.abrupt('return', null);

              case 3:
                unreadMessageIds = unReadMessages.map(function (message) {
                  return message.id;
                });
                _context14.prev = 4;
                _context14.next = 7;
                return this._updateMessagesApi(unreadMessageIds, 'Read');

              case 7:
                updatedMessages = _context14.sent;

                this._updateConversationsMessagesFromRecords(updatedMessages);
                _context14.next = 14;
                break;

              case 11:
                _context14.prev = 11;
                _context14.t0 = _context14['catch'](4);

                console.error(_context14.t0);

              case 14:
                return _context14.abrupt('return', null);

              case 15:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[4, 11]]);
      }));

      function readMessages(_x11) {
        return _ref15.apply(this, arguments);
      }

      return readMessages;
    }()
  }, {
    key: 'matchMessageText',
    value: function matchMessageText(message, searchText) {
      if (message.subject.toLowerCase().indexOf(searchText) >= 0) {
        return message;
      }
      var conversation = this.conversations[message.conversation.id];
      if (!conversation) {
        return null;
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(conversation.messages), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subMessage = _step.value;

          if (subMessage.subject.toLowerCase().indexOf(searchText) >= 0) {
            return message;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: 'updateConversationRecipientList',
    value: function updateConversationRecipientList(conversationId, recipients) {
      var conversation = this.findConversationById(conversationId);
      if (!conversation) {
        return;
      }
      conversation.recipients = recipients;
      this._saveConversation(conversation);
      var messages = this.messages;
      var messageIndex = messages.findIndex(function (message) {
        return message.conversation && message.conversation.id === conversationId;
      });
      if (messageIndex > -1) {
        var message = messages[messageIndex];
        message.recipients = recipients;
        this._saveMessages(messages);
      }
    }
  }, {
    key: 'pushMessage',
    value: function pushMessage(conversationId, message) {
      var oldConversation = this.findConversationById(conversationId);
      var newConversation = { messages: [] };
      if (oldConversation) {
        newConversation = oldConversation;
      }
      newConversation.id = conversationId;
      newConversation.messages = messageStoreHelper.pushMessageToConversationMessages({
        messages: newConversation.messages,
        message: message
      });
      var messages = messageStoreHelper.pushMessageToMesages({
        messages: this.messages,
        message: message
      });
      this._saveConversationAndMessages(newConversation, messages);
    }
  }, {
    key: '_updateConversationsMessagesFromRecords',
    value: function _updateConversationsMessagesFromRecords(records) {
      var _messageStoreHelper$g = messageStoreHelper.getNewConversationsAndMessagesFromRecords({
        records: records,
        conversations: this.conversations,
        messages: this.messages
      }),
          conversations = _messageStoreHelper$g.conversations,
          messages = _messageStoreHelper$g.messages;

      this._saveConversationsAndMessages(conversations, messages, null);
    }
  }, {
    key: '_saveConversationAndMessages',
    value: function _saveConversationAndMessages(conversation, messages) {
      this._saveConversation(conversation);

      var unReadMessagesRusult = messageStoreHelper.updateMessagesUnreadCounts(messages, this.conversations);
      this._saveUnreadCounts(unReadMessagesRusult.unreadCounts);
      this._saveMessages(unReadMessagesRusult.messages);
    }
  }, {
    key: '_saveConversationsAndMessages',
    value: function _saveConversationsAndMessages(conversations, messages, syncToken) {
      this._saveConversations(conversations);
      var unReadMessagesRusult = messageStoreHelper.updateMessagesUnreadCounts(messages, this.conversations);
      this._saveMessages(unReadMessagesRusult.messages);
      this._saveUnreadCounts(unReadMessagesRusult.unreadCounts);
      if (syncToken) {
        this._saveSyncToken(syncToken);
      }
    }
  }, {
    key: '_saveConversation',
    value: function _saveConversation(conversation) {
      var conversations = this.conversations;
      var id = conversation.id;
      conversations[id] = conversation;
      this._saveConversations(conversations);
    }
  }, {
    key: '_saveConversations',
    value: function _saveConversations(conversations) {
      this.store.dispatch({
        type: this.actionTypes.saveConversations,
        data: conversations
      });
    }
  }, {
    key: '_saveMessages',
    value: function _saveMessages(messages) {
      this.store.dispatch({
        type: this.actionTypes.saveMessages,
        data: messages
      });
    }
  }, {
    key: '_saveSyncToken',
    value: function _saveSyncToken(syncToken) {
      this.store.dispatch({
        type: this.actionTypes.saveSyncToken,
        syncToken: syncToken
      });
    }
  }, {
    key: '_saveUnreadCounts',
    value: function _saveUnreadCounts(unreadCounts) {
      this.store.dispatch({
        type: this.actionTypes.updateUnreadCounts,
        unreadCounts: unreadCounts
      });
    }
  }, {
    key: 'cache',
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: 'conversations',
    get: function get() {
      var conversations = this.cache.conversations.data;
      if (!conversations) {
        return {};
      }
      return conversations;
    }
  }, {
    key: 'conversationsTimestamp',
    get: function get() {
      return this.cache.conversations.timestamp;
    }
  }, {
    key: 'messages',
    get: function get() {
      var messages = this.cache.messages.data;
      if (!messages) {
        return [];
      }
      return messages;
    }
  }, {
    key: 'messagesTimestamp',
    get: function get() {
      return this.cache.messages.timestamp;
    }
  }, {
    key: 'syncToken',
    get: function get() {
      return this.cache.syncToken;
    }
  }, {
    key: 'unreadCounts',
    get: function get() {
      return this.cache.unreadCounts;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'messageStoreStatus',
    get: function get() {
      return this.state.messageStoreStatus;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatus2.default.ready;
    }
  }, {
    key: 'pending',
    get: function get() {
      return this.status === _moduleStatus2.default.pending;
    }
  }]);
  return MessageStore;
}(_RcModule3.default);

exports.default = MessageStore;
//# sourceMappingURL=index.js.map
