'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _dec, _class, _desc, _value, _class2;

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _messageStatus = require('./messageStatus');

var _messageStatus2 = _interopRequireDefault(_messageStatus);

var _getRecentMessagesReducer = require('./getRecentMessagesReducer');

var _getRecentMessagesReducer2 = _interopRequireDefault(_getRecentMessagesReducer);

var _getDateFrom = require('../../lib/getDateFrom');

var _getDateFrom2 = _interopRequireDefault(_getDateFrom);

var _concurrentExecute = require('../../lib/concurrentExecute');

var _concurrentExecute2 = _interopRequireDefault(_concurrentExecute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * @class
 * @description Retrieve all recent messages related to a specified contact.
 */
var RecentMessages = (_dec = (0, _di.Module)({
  deps: ['Client', 'MessageStore']
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(RecentMessages, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {MessageStore} params.messageStore - messageStore module instance
   * @param {Client} params.client - client module instance
   */
  function RecentMessages(_ref) {
    var client = _ref.client,
        messageStore = _ref.messageStore,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'messageStore']);
    (0, _classCallCheck3.default)(this, RecentMessages);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecentMessages.__proto__ || (0, _getPrototypeOf2.default)(RecentMessages)).call(this, (0, _extends3.default)({
      actionTypes: _actionTypes2.default
    }, options)));

    _this._client = _ensureExist2.default.call(_this, client, 'client');
    _this._messageStore = _ensureExist2.default.call(_this, messageStore, 'messageStore');
    _this._reducer = (0, _getRecentMessagesReducer2.default)(_this.actionTypes);

    _this.addSelector('unreadMessageCounts', function () {
      return _this.messages;
    }, function (messages) {
      return (0, _keys2.default)(messages).reduce(function (unreadCounts, contactId) {
        unreadCounts[contactId] = messages[contactId].reduce(function (acc, cur) {
          return acc + (cur.readStatus !== 'Read' ? 1 : 0);
        }, 0);
        return unreadCounts;
      }, {});
    });

    _this._prevMessageStoreTimestamp = null;
    return _this;
  }

  (0, _createClass3.default)(RecentMessages, [{
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
      if (this.pending && this._messageStore.ready) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this.ready && !this._messageStore.ready) {
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      } else if ((0, _keys2.default)(this.messages).length > 0) {
        // Listen to messageStore state changes
        if (this._messageStore.updatedTimestamp !== this._prevMessageStoreTimestamp) {
          this._prevMessageStoreTimestamp = this._messageStore.updatedTimestamp;
          // for (const contact of Object.values(this.contacts)) {
          //   this.getMessages(contact, false, true);
          // }
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(this.contacts)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var key = _step.value;

              this.getMessages({
                currentContact: this.contacts[key],
                sessionId: key.indexOf('-') > -1 ? key.split('-')[1] : null,
                fromLocale: false,
                forceUpdate: true
              });
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
        }
      }
    }
  }, {
    key: 'getMessages',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
        var currentContact = _ref3.currentContact,
            _ref3$sessionId = _ref3.sessionId,
            sessionId = _ref3$sessionId === undefined ? null : _ref3$sessionId,
            _ref3$fromLocal = _ref3.fromLocal,
            fromLocal = _ref3$fromLocal === undefined ? false : _ref3$fromLocal,
            _ref3$forceUpdate = _ref3.forceUpdate,
            forceUpdate = _ref3$forceUpdate === undefined ? false : _ref3$forceUpdate;
        var contactId, messages;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (currentContact) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                contactId = currentContact.id;

                if (!(!forceUpdate && !!this.messages[sessionId ? contactId + '-' + sessionId : contactId])) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return');

              case 5:
                this._prevMessageStoreTimestamp = this._messageStore.updatedTimestamp;
                this.store.dispatch({
                  type: this.actionTypes.initLoad
                });
                _context.next = 9;
                return this._getRecentMessages(currentContact, this._messageStore.messages, fromLocal);

              case 9:
                messages = _context.sent;

                this.store.dispatch({
                  type: this.actionTypes.loadSuccess,
                  messages: messages,
                  contact: currentContact,
                  sessionId: sessionId
                });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMessages(_x) {
        return _ref2.apply(this, arguments);
      }

      return getMessages;
    }()
  }, {
    key: 'cleanUpMessages',
    value: function cleanUpMessages(_ref4) {
      var contact = _ref4.contact,
          _ref4$sessionId = _ref4.sessionId,
          sessionId = _ref4$sessionId === undefined ? null : _ref4$sessionId;

      this.store.dispatch({
        type: this.actionTypes.loadReset,
        contact: contact,
        sessionId: sessionId
      });
    }
  }, {
    key: '_getRecentMessages',


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
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(currentContact) {
        var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var fromLocal = arguments[2];
        var daySpan = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 60;
        var length = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5;
        var dateFrom, recentMessages, dateTo;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                dateFrom = (0, _getDateFrom2.default)(daySpan);
                recentMessages = this._getLocalRecentMessages(currentContact, messages, dateFrom, length);

                // If we could not find enough recent messages,
                // we need to search for messages on server.

                if (!(!fromLocal && recentMessages.length < length)) {
                  _context2.next = 9;
                  break;
                }

                dateTo = recentMessages.length > 0 ? recentMessages[recentMessages.length - 1].creationTime : undefined;

                // This will always be sorted

                _context2.t0 = recentMessages;
                _context2.next = 7;
                return this._fetchRemoteRecentMessages(currentContact, dateFrom.toISOString(), dateTo, length);

              case 7:
                _context2.t1 = _context2.sent;
                recentMessages = _context2.t0.concat.call(_context2.t0, _context2.t1);

              case 9:

                recentMessages = this._dedup(recentMessages);
                return _context2.abrupt('return', recentMessages.length > length ? recentMessages.slice(0, length) : recentMessages);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _getRecentMessages(_x2) {
        return _ref5.apply(this, arguments);
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
    key: '_getLocalRecentMessages',
    value: function _getLocalRecentMessages(_ref6, messages, dateFrom, length) {
      var phoneNumbers = _ref6.phoneNumbers;

      // Get all messages related to this contact
      var recentMessages = [];
      var message = void 0;
      var matches = void 0;
      for (var i = messages.length - 1; i >= 0; i -= 1) {
        message = messages[i];
        matches = phoneNumbers.find(this._filterPhoneNumber(message));

        // Check if message is within certain days
        if (!!matches && new Date(message.creationTime) > dateFrom) {
          recentMessages.push(message);
        }
        if (recentMessages.length >= length) break;
      }
      return recentMessages;
    }
  }, {
    key: '_filterPhoneNumber',
    value: function _filterPhoneNumber(message) {
      return function (_ref7) {
        var phoneNumber = _ref7.phoneNumber;
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
    key: '_fetchRemoteRecentMessages',
    value: function _fetchRemoteRecentMessages(_ref8, dateFrom) {
      var phoneNumbers = _ref8.phoneNumbers;

      var _this3 = this;

      var dateTo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date().toISOString();
      var length = arguments[3];

      var params = {
        dateTo: dateTo,
        dateFrom: dateFrom,
        messageType: ['SMS', 'Text', 'Pager'],
        perPage: length
      };
      var recentMessagesPromise = phoneNumbers.reduce(function (acc, _ref9) {
        var phoneNumber = _ref9.phoneNumber;

        if (phoneNumber) {
          var promise = _this3._fetchMessageList((0, _assign2.default)({}, params, {
            phoneNumber: phoneNumber
          }));
          return acc.concat(promise);
        }
        return acc;
      }, []);

      // TODO: Because we need to navigate to the message page,
      // So we may need to push new messages to messageStore
      return (0, _concurrentExecute2.default)(recentMessagesPromise, 5, 500).then(this._flattenToMessageRecords).then(this._markAsRemoteMessage).then(function (messages) {
        return _this3._sortMessages(messages);
      });
    }
  }, {
    key: '_fetchMessageList',
    value: function _fetchMessageList(params) {
      var _this4 = this;

      return function () {
        return _this4._client.account().extension().messageStore().list(params);
      };
    }
  }, {
    key: '_countUnreadMessages',
    value: function _countUnreadMessages(messages) {
      return messages.reduce(function (acc, cur) {
        return acc + (cur.readStatus !== 'Read' ? 1 : 0);
      }, 0);
    }
  }, {
    key: '_flattenToMessageRecords',
    value: function _flattenToMessageRecords(allMessages) {
      return allMessages.reduce(function (acc, _ref10) {
        var records = _ref10.records;
        return acc.concat(records);
      }, []);
    }
  }, {
    key: '_sortMessages',
    value: function _sortMessages(recentMessages) {
      // Sort by time in descending order
      return recentMessages.sort(function (a, b) {
        return new Date(b.creationTime) - new Date(a.creationTime);
      });
    }
  }, {
    key: '_markAsRemoteMessage',
    value: function _markAsRemoteMessage(messages) {
      return messages.map(function (message) {
        message.fromRemote = true;
        return message;
      });
    }
  }, {
    key: '_dedup',
    value: function _dedup(messages) {
      var hash = {};
      return messages.reduce(function (acc, cur) {
        if (hash[cur.id]) return acc;
        hash[cur.id] = true;
        return acc.concat(cur);
      }, []);
    }
  }, {
    key: 'contacts',
    get: function get() {
      return this.state.contacts;
    }
  }, {
    key: 'messages',
    get: function get() {
      return this.state.messages;
    }
  }, {
    key: 'unreadMessageCounts',
    get: function get() {
      return this._selectors.unreadMessageCounts();
    }
  }, {
    key: 'isMessagesLoaded',
    get: function get() {
      return this.state.messageStatus === _messageStatus2.default.loaded;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }]);
  return RecentMessages;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'getMessages', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'getMessages'), _class2.prototype)), _class2)) || _class);
exports.default = RecentMessages;
//# sourceMappingURL=index.js.map
