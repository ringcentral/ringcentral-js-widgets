'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

exports.processResponseData = processResponseData;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

var _batchApiHelper = require('../../lib/batchApiHelper');

var _messageStoreHelper = require('./messageStoreHelper');

var messageStoreHelper = _interopRequireWildcard(_messageStoreHelper);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getMessageStoreReducer = require('./getMessageStoreReducer');

var _getMessageStoreReducer2 = _interopRequireDefault(_getMessageStoreReducer);

var _getDataReducer = require('./getDataReducer');

var _getDataReducer2 = _interopRequireDefault(_getDataReducer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processResponseData(data) {
  var records = data.records.slice();
  return {
    records: records.reverse(),
    syncTimestamp: new Date(data.syncInfo.syncTime).getTime(),
    syncToken: data.syncInfo.syncToken
  };
}

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
      actionTypes: _actionTypes2.default
    })));

    _this._alert = alert;
    _this._client = client;
    _this._storage = storage;
    _this._subscription = subscription;
    _this._reducer = (0, _getMessageStoreReducer2.default)(_this.actionTypes);
    _this._ttl = ttl;
    _this._auth = auth;
    _this._promise = null;
    _this._lastSubscriptionMessage = null;
    _this._storageKey = 'messageStore';

    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getDataReducer2.default)(_this.actionTypes)
    });

    _this.addSelector('unreadCounts', function () {
      return _this.conversations;
    }, function (conversations) {
      return conversations.reduce(function (pre, cur) {
        return pre + cur.unreadCounts;
      }, 0);
    });

    _this.syncConversation = _this.syncConversation.bind(_this);
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
      return this._auth.isFreshLogin || Date.now() - this.updatedTimestamp > this._ttl;
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
    key: 'findConversationById',
    value: function findConversationById(id) {
      return this.conversationMap[id.toString()];
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
      if (message && message !== this._lastSubscriptionMessage && accountExtesionEndPoint.test(message.event) && message.body && message.body.changes) {
        this._lastSubscriptionMessage = this._subscription.message;
        this._syncMessages();
      }
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
    key: '_updateMessagesFromSync',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var oldSyncToken, params, response, _processResponseData, records, syncTimestamp, syncToken;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.sync
                });
                oldSyncToken = this.syncToken;
                params = messageStoreHelper.getMessageSyncParams({ syncToken: oldSyncToken });
                _context3.next = 5;
                return this._messageSyncApi(params);

              case 5:
                response = _context3.sent;
                _processResponseData = processResponseData(response), records = _processResponseData.records, syncTimestamp = _processResponseData.syncTimestamp, syncToken = _processResponseData.syncToken;

                this.store.dispatch({
                  type: this.actionTypes.syncSuccess,
                  records: records,
                  syncTimestamp: syncTimestamp,
                  syncToken: syncToken
                });

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _updateMessagesFromSync() {
        return _ref4.apply(this, arguments);
      }

      return _updateMessagesFromSync;
    }()
  }, {
    key: '_updateConversationFromSync',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(conversationId) {
        var conversation, oldSyncToken, params, response, _processResponseData2, records, syncTimestamp, syncToken;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                conversation = this.conversationMap[conversationId.toString()];

                if (conversation) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt('return');

              case 3:
                this.store.dispatch({
                  type: this.actionTypes.sync
                });
                oldSyncToken = conversation.syncToken;
                params = messageStoreHelper.getMessageSyncParams({
                  syncToken: oldSyncToken,
                  conversationId: conversation.id
                });
                _context4.next = 8;
                return this._messageSyncApi(params);

              case 8:
                response = _context4.sent;
                _processResponseData2 = processResponseData(response), records = _processResponseData2.records, syncTimestamp = _processResponseData2.syncTimestamp, syncToken = _processResponseData2.syncToken;

                this.store.dispatch({
                  type: this.actionTypes.syncConversationSuccess,
                  records: records,
                  syncTimestamp: syncTimestamp,
                  syncToken: syncToken,
                  syncConversationId: conversation.id
                });

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _updateConversationFromSync(_x2) {
        return _ref5.apply(this, arguments);
      }

      return _updateConversationFromSync;
    }()
  }, {
    key: '_syncMessages',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._sync((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
                  return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return _this3._updateMessagesFromSync();

                        case 2:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, _this3);
                })));

              case 2:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _syncMessages() {
        return _ref6.apply(this, arguments);
      }

      return _syncMessages;
    }()
  }, {
    key: 'syncConversation',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(id) {
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
                          return _this4._updateConversationFromSync(id);

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

      function syncConversation(_x3) {
        return _ref8.apply(this, arguments);
      }

      return syncConversation;
    }()
  }, {
    key: '_sync',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(syncFunction) {
        var _this5 = this;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!this._promise) {
                  this._promise = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
                    return _regenerator2.default.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            _context9.prev = 0;
                            _context9.next = 3;
                            return syncFunction();

                          case 3:
                            _this5._promise = null;
                            _context9.next = 11;
                            break;

                          case 6:
                            _context9.prev = 6;
                            _context9.t0 = _context9['catch'](0);

                            _this5._onSyncError();
                            _this5._promise = null;
                            throw _context9.t0;

                          case 11:
                          case 'end':
                            return _context9.stop();
                        }
                      }
                    }, _callee9, _this5, [[0, 6]]);
                  }))();
                }
                _context10.next = 3;
                return this._promise;

              case 3:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _sync(_x4) {
        return _ref10.apply(this, arguments);
      }

      return _sync;
    }()
  }, {
    key: '_onSyncError',
    value: function _onSyncError() {
      this.store.dispatch({
        type: this.actionTypes.syncError
      });
    }
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
      var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(conversationId) {
        var conversation, unreadMessageIds, updatedMessages;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                conversation = this.conversationMap[conversationId];

                if (conversation) {
                  _context14.next = 3;
                  break;
                }

                return _context14.abrupt('return', null);

              case 3:
                unreadMessageIds = (0, _keys2.default)(conversation.unreadMessages);

                if (!(unreadMessageIds.length === 0)) {
                  _context14.next = 6;
                  break;
                }

                return _context14.abrupt('return', null);

              case 6:
                _context14.prev = 6;
                _context14.next = 9;
                return this._updateMessagesApi(unreadMessageIds, 'Read');

              case 9:
                updatedMessages = _context14.sent;

                this.store.dispatch({
                  type: this.actionTypes.updateMessages,
                  records: updatedMessages
                });
                _context14.next = 16;
                break;

              case 13:
                _context14.prev = 13;
                _context14.t0 = _context14['catch'](6);

                console.error(_context14.t0);

              case 16:
                return _context14.abrupt('return', null);

              case 17:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[6, 13]]);
      }));

      function readMessages(_x11) {
        return _ref15.apply(this, arguments);
      }

      return readMessages;
    }()
  }, {
    key: 'searchMessagesText',
    value: function searchMessagesText(searchText) {
      return this.messages.filter(function (message) {
        if (message.subject && message.subject.toLowerCase().indexOf(searchText) >= 0) {
          return true;
        }
        return false;
      });
    }
  }, {
    key: 'updateConversationRecipientList',
    value: function updateConversationRecipientList(conversationId, recipients) {
      this.store.dispatch({
        type: this.actionTypes.updateConversationRecipients,
        conversationId: conversationId,
        recipients: recipients
      });
    }
  }, {
    key: 'pushMessages',
    value: function pushMessages(records) {
      this.store.dispatch({
        type: this.actionTypes.updateMessages,
        records: records
      });
    }
  }, {
    key: 'pushMessage',
    value: function pushMessage(record) {
      this.pushMessages([record]);
    }
  }, {
    key: 'cache',
    get: function get() {
      return this._storage.getItem(this._storageKey);
    }
  }, {
    key: 'messages',
    get: function get() {
      return this.cache.data.messages;
    }
  }, {
    key: 'conversations',
    get: function get() {
      return this.cache.data.conversations;
    }
  }, {
    key: 'conversationMap',
    get: function get() {
      return this.cache.data.conversationMap;
    }
  }, {
    key: 'updatedTimestamp',
    get: function get() {
      return this.cache.updatedTimestamp;
    }
  }, {
    key: 'syncTimestamp',
    get: function get() {
      return this.cache.data.syncTimestamp;
    }
  }, {
    key: 'syncToken',
    get: function get() {
      return this.cache.syncToken;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'unreadCounts',
    get: function get() {
      return this._selectors.unreadCounts();
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
