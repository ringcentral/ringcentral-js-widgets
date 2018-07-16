'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

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

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

var _reselect = require('reselect');

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _getter = require('../../lib/getter');

var _getter2 = _interopRequireDefault(_getter);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _messageTypes = require('../../enums/messageTypes');

var _messageTypes2 = _interopRequireDefault(_messageTypes);

var _cleanNumber = require('../../lib/cleanNumber');

var _cleanNumber2 = _interopRequireDefault(_cleanNumber);

var _messageSenderMessages = require('../MessageSender/messageSenderMessages');

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

var _messageHelper = require('../../lib/messageHelper');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getReducer = require('./getReducer');

var _getReducer2 = _interopRequireDefault(_getReducer);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

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

function getEarliestTime(messages) {
  var newTime = Date.now();
  messages.forEach(function (message) {
    var creationTime = new Date(message.creationTime).getTime();
    if (creationTime < newTime) {
      newTime = creationTime;
    }
  });
  return newTime;
}

var DEFAULT_PER_PAGE = 20;
var DEFAULT_DAY_SPAN = 90;

var Conversations = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Auth', 'Client', 'MessageSender', 'ExtensionInfo', 'MessageStore', 'RolesAndPermissions', { dep: 'ContactMatcher', optional: true }, { dep: 'ConversationLogger', optional: true }, { dep: 'ConversationsOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Conversations, _RcModule);

  function Conversations(_ref) {
    var alert = _ref.alert,
        auth = _ref.auth,
        client = _ref.client,
        messageSender = _ref.messageSender,
        extensionInfo = _ref.extensionInfo,
        messageStore = _ref.messageStore,
        rolesAndPermissions = _ref.rolesAndPermissions,
        contactMatcher = _ref.contactMatcher,
        conversationLogger = _ref.conversationLogger,
        _ref$perPage = _ref.perPage,
        perPage = _ref$perPage === undefined ? DEFAULT_PER_PAGE : _ref$perPage,
        _ref$daySpan = _ref.daySpan,
        daySpan = _ref$daySpan === undefined ? DEFAULT_DAY_SPAN : _ref$daySpan,
        _ref$enableLoadOldMes = _ref.enableLoadOldMessages,
        enableLoadOldMessages = _ref$enableLoadOldMes === undefined ? false : _ref$enableLoadOldMes,
        options = (0, _objectWithoutProperties3.default)(_ref, ['alert', 'auth', 'client', 'messageSender', 'extensionInfo', 'messageStore', 'rolesAndPermissions', 'contactMatcher', 'conversationLogger', 'perPage', 'daySpan', 'enableLoadOldMessages']);
    (0, _classCallCheck3.default)(this, Conversations);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Conversations.__proto__ || (0, _getPrototypeOf2.default)(Conversations)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _initDefineProp(_this, 'allConversations', _descriptor, _this);

    _initDefineProp(_this, 'uniqueNumbers', _descriptor2, _this);

    _initDefineProp(_this, 'effectiveSearchString', _descriptor3, _this);

    _initDefineProp(_this, 'typeFilteredConversations', _descriptor4, _this);

    _initDefineProp(_this, 'formatedConversations', _descriptor5, _this);

    _initDefineProp(_this, 'filteredConversations', _descriptor6, _this);

    _initDefineProp(_this, 'pagingConversations', _descriptor7, _this);

    _initDefineProp(_this, 'earliestTime', _descriptor8, _this);

    _initDefineProp(_this, 'currentConversation', _descriptor9, _this);

    _initDefineProp(_this, 'messageText', _descriptor10, _this);

    _this._auth = _ensureExist2.default.call(_this, auth, 'auth');
    _this._alert = _ensureExist2.default.call(_this, alert, 'alert');
    _this._client = _ensureExist2.default.call(_this, client, 'client');
    _this._messageSender = _ensureExist2.default.call(_this, messageSender, 'messageSender');
    _this._extensionInfo = _ensureExist2.default.call(_this, extensionInfo, 'extensionInfo');
    _this._messageStore = _ensureExist2.default.call(_this, messageStore, 'messageStore');
    _this._rolesAndPermissions = _ensureExist2.default.call(_this, rolesAndPermissions, 'rolesAndPermissions');
    _this._contactMatcher = contactMatcher;
    _this._conversationLogger = conversationLogger;

    _this._reducer = (0, _getReducer2.default)(_this.actionTypes);

    _this._promise = null;
    _this._lastProcessedNumbers = null;
    _this._perPage = perPage;
    _this._daySpan = daySpan;
    _this._olderDataExsited = true;
    _this._olderMessagesExsited = true;
    _this._enableLoadOldMessages = enableLoadOldMessages;

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: function getQueriesFn() {
          return _this.uniqueNumbers;
        },
        readyCheckFn: function readyCheckFn() {
          return _this._messageStore.ready;
        }
      });
    }
    return _this;
  }

  (0, _createClass3.default)(Conversations, [{
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
        this._init();
      } else if (this._shouldReset()) {
        this._reset();
      } else if (this._lastProcessedNumbers !== this.uniqueNumbers) {
        this._lastProcessedNumbers = this.uniqueNumbers;
        if (this._contactMatcher) {
          this._contactMatcher.triggerMatch();
        }
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._auth.loggedIn && this._extensionInfo.ready && this._messageSender.ready && this._messageStore.ready && this._rolesAndPermissions.ready && (!this._contactMatcher || this._contactMatcher.ready) && (!this._conversationLogger || this._conversationLogger.ready) && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._auth.loggedIn || !this._extensionInfo.ready || !this._messageSender.ready || !this._rolesAndPermissions || !this._messageStore.ready || this._contactMatcher && !this._contactMatcher.ready || this._conversationLogger && !this._conversationLogger.ready) && this.ready;
    }
  }, {
    key: '_init',
    value: function _init() {
      this.store.dispatch({
        type: this.actionTypes.init
      });
      if (this._contactMatcher) {
        this._contactMatcher.triggerMatch();
      }
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
      if (this.allConversations.length <= this._perPage) {
        this.fetchOldConversations();
      }
    }
  }, {
    key: '_reset',
    value: function _reset() {
      this._lastProcessedNumbers = null;
      this._olderDataExsited = true;
      this._olderMessagesExsited = true;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: 'updateSearchInput',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(input) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateSearchInput,
                  input: input
                });

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateSearchInput(_x) {
        return _ref2.apply(this, arguments);
      }

      return updateSearchInput;
    }()
  }, {
    key: 'updateTypeFilter',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(type) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.typeFilter === type)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                this.store.dispatch({
                  type: this.actionTypes.updateTypeFilter,
                  typeFilter: type
                });
                this._olderDataExsited = true;
                this._olderMessagesExsited = true;
                if (this.pagingConversations.length <= this._perPage) {
                  this.loadNextPage();
                }

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateTypeFilter(_x2) {
        return _ref3.apply(this, arguments);
      }

      return updateTypeFilter;
    }()
  }, {
    key: 'fetchOldConversations',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var dateFrom, dateTo, typeFilter, currentPage, params, _ref5, records;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._olderDataExsited) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return');

              case 2:
                if (!this.loadingOldConversations) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return');

              case 4:
                this.store.dispatch({
                  type: this.actionTypes.fetchOldConverstaions
                });
                dateFrom = new Date();

                dateFrom.setDate(dateFrom.getDate() - this._daySpan);
                dateTo = new Date(this.earliestTime);

                if (dateTo.getTime() < dateFrom.getTime()) {
                  dateFrom.setDate(dateFrom.getDate() - 1);
                }
                typeFilter = this.typeFilter;
                currentPage = this.currentPage;
                params = {
                  distinctConversations: true,
                  perPage: this._perPage,
                  dateFrom: dateFrom.toISOString(),
                  dateTo: dateTo.toISOString()
                };

                if (typeFilter === _messageTypes2.default.text) {
                  params.messageType = [_messageTypes2.default.sms, _messageTypes2.default.pager];
                } else if (typeFilter && typeFilter !== '' && typeFilter !== _messageTypes2.default.all) {
                  params.messageType = typeFilter;
                }
                _context3.prev = 13;
                _context3.next = 16;
                return this._client.account().extension().messageStore().list(params);

              case 16:
                _ref5 = _context3.sent;
                records = _ref5.records;

                this._olderDataExsited = records.length === this._perPage;
                if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchOldConverstaionsSuccess,
                    records: records
                  });
                }
                _context3.next = 25;
                break;

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3['catch'](13);

                if (typeFilter === this.typeFilter && currentPage === this.currentPage) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchOldConverstaionsError
                  });
                }

              case 25:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[13, 22]]);
      }));

      function fetchOldConversations() {
        return _ref4.apply(this, arguments);
      }

      return fetchOldConversations;
    }()
  }, {
    key: 'loadNextPage',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var currentPage;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                currentPage = this.currentPage;

                if (!((currentPage + 1) * this._perPage <= this.filteredConversations.length)) {
                  _context4.next = 4;
                  break;
                }

                this.store.dispatch({
                  type: this.actionTypes.increaseCurrentPage
                });
                return _context4.abrupt('return');

              case 4:
                if (!(this.effectiveSearchString !== '')) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('return');

              case 6:
                if (this._enableLoadOldMessages) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt('return');

              case 8:
                _context4.next = 10;
                return this.fetchOldConversations();

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadNextPage() {
        return _ref6.apply(this, arguments);
      }

      return loadNextPage;
    }()
  }, {
    key: 'resetCurrentPage',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.resetCurrentPage
                });

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function resetCurrentPage() {
        return _ref7.apply(this, arguments);
      }

      return resetCurrentPage;
    }()
  }, {
    key: 'loadConversation',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(conversationId) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(conversationId === this.currentConversationId)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return');

              case 2:
                this.store.dispatch({
                  type: this.actionTypes.updateCurrentConversationId,
                  conversationId: conversationId
                });

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function loadConversation(_x3) {
        return _ref8.apply(this, arguments);
      }

      return loadConversation;
    }()
  }, {
    key: 'unloadConversation',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateCurrentConversationId,
                  conversationId: null
                });
                this._olderMessagesExsited = true;

              case 2:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function unloadConversation() {
        return _ref9.apply(this, arguments);
      }

      return unloadConversation;
    }()
  }, {
    key: 'fetchOldMessages',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        var perPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._perPage;

        var conversationId, dateFrom, earliestTime, dateTo, params, _ref11, records;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (this._enableLoadOldMessages) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt('return');

              case 2:
                if (this._olderMessagesExsited) {
                  _context8.next = 4;
                  break;
                }

                return _context8.abrupt('return');

              case 4:
                if (!this.loadingOldMessages) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt('return');

              case 6:
                if (this.currentConversationId) {
                  _context8.next = 8;
                  break;
                }

                return _context8.abrupt('return');

              case 8:
                this.store.dispatch({
                  type: this.actionTypes.fetchOldMessages
                });
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
                _context8.prev = 16;
                _context8.next = 19;
                return this._client.account().extension().messageStore().list(params);

              case 19:
                _ref11 = _context8.sent;
                records = _ref11.records;

                this._olderMessagesExsited = records.length === perPage;
                if (conversationId === this.currentConversationId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchOldMessagesSuccess,
                    records: records
                  });
                }
                _context8.next = 28;
                break;

              case 25:
                _context8.prev = 25;
                _context8.t0 = _context8['catch'](16);

                if (conversationId === this.currentConversationId) {
                  this.store.dispatch({
                    type: this.actionTypes.fetchOldMessagesError
                  });
                }

              case 28:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[16, 25]]);
      }));

      function fetchOldMessages() {
        return _ref10.apply(this, arguments);
      }

      return fetchOldMessages;
    }()
  }, {
    key: '_alertWarning',
    value: function _alertWarning(message) {
      if (message) {
        var ttlConfig = message !== _messageSenderMessages2.default.noAreaCode ? { ttl: 0 } : null;
        this._alert.warning((0, _extends3.default)({
          message: message
        }, ttlConfig));
        return true;
      }
      return false;
    }
  }, {
    key: 'updateMessageText',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(text) {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(text.length > 1000)) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt('return', this._alertWarning(_messageSenderMessages2.default.textTooLong));

              case 2:
                return _context9.abrupt('return', this.store.dispatch({
                  type: this.actionTypes.updateMessageText,
                  text: text,
                  conversationId: this.currentConversationId
                }));

              case 3:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function updateMessageText(_x5) {
        return _ref12.apply(this, arguments);
      }

      return updateMessageText;
    }()
  }, {
    key: 'replyToReceivers',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(text) {
        var responses;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.reply
                });
                _context10.prev = 1;
                _context10.next = 4;
                return this._messageSender.send({
                  fromNumber: this._getFromNumber(),
                  toNumbers: this._getToNumbers(),
                  text: text,
                  replyOnMessageId: this._getReplyOnMessageId()
                });

              case 4:
                responses = _context10.sent;

                if (!(responses && responses[0])) {
                  _context10.next = 10;
                  break;
                }

                this._messageStore.pushMessage(responses[0]);
                this.store.dispatch({
                  type: this.actionTypes.replySuccess
                });
                this.store.dispatch({
                  type: this.actionTypes.removeMessageText,
                  conversationId: this.currentConversationId
                });
                return _context10.abrupt('return', responses[0]);

              case 10:
                this._onReplyError();
                return _context10.abrupt('return', null);

              case 14:
                _context10.prev = 14;
                _context10.t0 = _context10['catch'](1);

                this._onReplyError();
                throw _context10.t0;

              case 18:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[1, 14]]);
      }));

      function replyToReceivers(_x6) {
        return _ref13.apply(this, arguments);
      }

      return replyToReceivers;
    }()
  }, {
    key: '_getReplyOnMessageId',
    value: function _getReplyOnMessageId() {
      var messageList = this.currentConversation.messages;
      var lastMessage = messageList && messageList.length > 0 && messageList[messageList.length - 1];
      if (lastMessage && lastMessage.id) {
        return lastMessage.id;
      }
      return null;
    }
  }, {
    key: '_getFromNumber',
    value: function _getFromNumber() {
      var senderNumber = this.currentConversation.senderNumber;
      if (!senderNumber) {
        return null;
      }
      return senderNumber.extensionNumber || senderNumber.phoneNumber;
    }
  }, {
    key: '_getToNumbers',
    value: function _getToNumbers() {
      var recipients = this.currentConversation.recipients;
      return recipients.map(function (recipient) {
        return recipient.extensionNumber || recipient.phoneNumber;
      });
    }
  }, {
    key: 'deleteCoversation',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(conversationId) {
        var conversation;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (conversationId) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt('return');

              case 2:
                if (!this._messageStore.conversationStore[conversationId]) {
                  _context11.next = 6;
                  break;
                }

                _context11.next = 5;
                return this._messageStore.deleteConversationMessages(conversationId);

              case 5:
                return _context11.abrupt('return');

              case 6:
                conversation = this.allConversations.find(function (c) {
                  return c.conversationId === conversationId;
                });

                if (conversation) {
                  _context11.next = 9;
                  break;
                }

                return _context11.abrupt('return');

              case 9:
                if (!(0, _messageHelper.messageIsTextMessage)(conversation)) {
                  _context11.next = 13;
                  break;
                }

                _context11.next = 12;
                return this._messageStore.deleteCoversation(conversationId);

              case 12:
                return _context11.abrupt('return');

              case 13:
                _context11.prev = 13;
                _context11.next = 16;
                return this._messageStore.deleteMessageApi(conversationId);

              case 16:
                this.store.dispatch({
                  type: this.actionTypes.deleteConversation,
                  conversationId: conversationId
                });
                _context11.next = 22;
                break;

              case 19:
                _context11.prev = 19;
                _context11.t0 = _context11['catch'](13);

                console.error(_context11.t0);

              case 22:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[13, 19]]);
      }));

      function deleteCoversation(_x7) {
        return _ref14.apply(this, arguments);
      }

      return deleteCoversation;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'searchInput',
    get: function get() {
      return this.state.searchInput;
    }
  }, {
    key: 'typeFilter',
    get: function get() {
      return this.state.typeFilter;
    }
  }, {
    key: 'currentPage',
    get: function get() {
      return this.state.currentPage;
    }
  }, {
    key: 'oldConversations',
    get: function get() {
      return this.state.oldConversations;
    }
  }, {
    key: 'fetchConversationsStatus',
    get: function get() {
      return this.state.fetchConversationsStatus;
    }
  }, {
    key: 'currentConversationId',
    get: function get() {
      return this.state.currentConversationId;
    }
  }, {
    key: 'fetchMessagesStatus',
    get: function get() {
      return this.state.fetchMessagesStatus;
    }
  }, {
    key: 'oldMessages',
    get: function get() {
      return this.state.oldMessages;
    }
  }, {
    key: 'loadingOldConversations',
    get: function get() {
      return this.fetchConversationsStatus === _status2.default.fetching;
    }
  }, {
    key: 'loadingOldMessages',
    get: function get() {
      return this.fetchMessagesStatus === _status2.default.fetching;
    }
  }, {
    key: 'pushing',
    get: function get() {
      return this.state.conversationStatus === _status2.default.pushing;
    }
  }]);
  return Conversations;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'updateSearchInput', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateSearchInput'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateTypeFilter', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateTypeFilter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'fetchOldConversations', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'fetchOldConversations'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'loadNextPage', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'loadNextPage'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'resetCurrentPage', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'resetCurrentPage'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'loadConversation', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'loadConversation'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'unloadConversation', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'unloadConversation'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'fetchOldMessages', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'fetchOldMessages'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'updateMessageText', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'updateMessageText'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'replyToReceivers', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'replyToReceivers'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'deleteCoversation', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'deleteCoversation'), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, 'allConversations', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return (0, _reselect.createSelector)(function () {
      return _this3._messageStore.allConversations;
    }, function () {
      return _this3.oldConversations;
    }, function (conversations, oldConversations) {
      var newConversations = [];
      var conversationMap = {};
      var pushConversation = function pushConversation(c) {
        if (conversationMap[c.id]) {
          return;
        }
        newConversations.push(c);
        conversationMap[c.id] = 1;
      };
      conversations.forEach(pushConversation);
      oldConversations.forEach(pushConversation);
      return newConversations;
    });
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'uniqueNumbers', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return (0, _reselect.createSelector)(function () {
      return _this4.allConversations;
    }, function (conversations) {
      var output = [];
      var numberMap = {};
      function addIfNotExist(number) {
        if (number && !numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }
      conversations.forEach(function (message) {
        if (message.from) {
          var fromNumber = message.from.phoneNumber || message.from.extensionNumber;
          addIfNotExist(fromNumber);
        }
        if (message.to && message.to.length > 0) {
          message.to.forEach(function (toNumber) {
            if (!toNumber) {
              return;
            }
            var toPhoneNumber = toNumber.phoneNumber || toNumber.extensionNumber;
            addIfNotExist(toPhoneNumber);
          });
        }
      });
      return output;
    });
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'effectiveSearchString', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return (0, _reselect.createSelector)(function () {
      return _this5.state.searchInput;
    }, function (input) {
      if (input.length >= 3) return input;
      return '';
    });
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'typeFilteredConversations', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return (0, _reselect.createSelector)(function () {
      return _this6.allConversations;
    }, function () {
      return _this6.typeFilter;
    }, function (allConversations, typeFilter) {
      switch (typeFilter) {
        case _messageTypes2.default.text:
          return allConversations.filter(_messageHelper.messageIsTextMessage);
        case _messageTypes2.default.voiceMail:
          return allConversations.filter(_messageHelper.messageIsVoicemail);
        case _messageTypes2.default.fax:
          return allConversations.filter(_messageHelper.messageIsFax);
        default:
          return allConversations.filter(function (conversation) {
            return (_this6._rolesAndPermissions.readTextPermissions || !(0, _messageHelper.messageIsTextMessage)(conversation)) && (_this6._rolesAndPermissions.voicemailPermissions || !(0, _messageHelper.messageIsVoicemail)(conversation)) && (_this6._rolesAndPermissions.readFaxPermissions || !(0, _messageHelper.messageIsFax)(conversation));
          });
      }
    });
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'formatedConversations', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return (0, _reselect.createSelector)(function () {
      return _this7.typeFilteredConversations;
    }, function () {
      return _this7._extensionInfo.extensionNumber;
    }, function () {
      return _this7._contactMatcher && _this7._contactMatcher.dataMapping;
    }, function () {
      return _this7._conversationLogger && _this7._conversationLogger.loggingMap;
    }, function () {
      return _this7._conversationLogger && _this7._conversationLogger.dataMapping;
    }, function () {
      return _this7._auth.accessToken;
    }, function (conversations, extensionNumber) {
      var contactMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var loggingMap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var conversationLogMapping = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var accessToken = arguments[5];
      return conversations.map(function (message) {
        var _getNumbersFromMessag = (0, _messageHelper.getNumbersFromMessage)({ extensionNumber: extensionNumber, message: message }),
            self = _getNumbersFromMessag.self,
            correspondents = _getNumbersFromMessag.correspondents;

        var selfNumber = self && (self.phoneNumber || self.extensionNumber);
        var selfMatches = selfNumber && contactMapping[selfNumber] || [];
        var correspondentMatches = correspondents.reduce(function (matches, contact) {
          var number = contact && (contact.phoneNumber || contact.extensionNumber);
          return number && contactMapping[number] && contactMapping[number].length ? matches.concat(contactMapping[number]) : matches;
        }, []);
        var conversationLogId = _this7._conversationLogger ? _this7._conversationLogger.getConversationLogId(message) : null;
        var isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
        var conversationMatches = conversationLogMapping[conversationLogId] || [];
        var voicemailAttachment = null;
        if ((0, _messageHelper.messageIsVoicemail)(message)) {
          voicemailAttachment = (0, _messageHelper.getVoicemailAttachment)(message, accessToken);
        }
        var faxAttachment = null;
        if ((0, _messageHelper.messageIsFax)(message)) {
          faxAttachment = (0, _messageHelper.getFaxAttachment)(message, accessToken);
        }
        var unreadCounts = message.unreadCounts;
        if (typeof unreadCounts === 'undefined') {
          unreadCounts = (0, _messageHelper.messageIsUnread)(message) ? 1 : 0;
        }
        return (0, _extends3.default)({}, message, {
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
          lastMatchedCorrespondentEntity: _this7._conversationLogger && _this7._conversationLogger.getLastMatchedCorrespondentEntity(message) || null
        });
      });
    });
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'filteredConversations', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return (0, _reselect.createSelector)(function () {
      return _this8.formatedConversations;
    }, function () {
      return _this8.effectiveSearchString;
    }, function (conversations, effectiveSearchString) {
      if (effectiveSearchString === '') {
        return conversations;
      }
      var searchResults = [];
      var cleanRegex = /[^\d*+#\s]/g;
      var searchString = effectiveSearchString.toLowerCase();
      var searchNumber = effectiveSearchString.replace(cleanRegex, '');
      conversations.forEach(function (message) {
        if (searchNumber === effectiveSearchString) {
          var cleanedNumber = (0, _cleanNumber2.default)(effectiveSearchString);
          if (message.correspondents.find(function (contact) {
            return (0, _cleanNumber2.default)(contact.phoneNumber || contact.extensionNumber || '').indexOf(cleanedNumber) > -1;
          })) {
            // match by phoneNumber or extensionNumber
            searchResults.push((0, _extends3.default)({}, message, {
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
            searchResults.push((0, _extends3.default)({}, message, {
              matchOrder: 0
            }));
            return;
          }
        } else if (message.correspondents.find(function (contact) {
          return (contact.name || '').toLowerCase().indexOf(searchString) > -1;
        })) {
          searchResults.push((0, _extends3.default)({}, message, {
            matchOrder: 0
          }));
          return;
        }

        // try match messages of the same conversation
        if ((message.subject || '').toLowerCase().indexOf(searchString) > -1) {
          searchResults.push((0, _extends3.default)({}, message, {
            matchOrder: 1
          }));
          return;
        }
        var messageList = _this8._messageStore.conversationStore[message.conversationId] || [];
        var matchedMessage = messageList.find(function (item) {
          return (item.subject || '').toLowerCase().indexOf(searchString) > -1;
        });
        if (matchedMessage) {
          searchResults.push((0, _extends3.default)({}, message, {
            matchedMessage: matchedMessage,
            matchOrder: 1
          }));
        }
      });
      return searchResults.sort(_messageHelper.sortSearchResults);
    });
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'pagingConversations', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this9 = this;

    return (0, _reselect.createSelector)(function () {
      return _this9.filteredConversations;
    }, function () {
      return _this9.currentPage;
    }, function (conversations, pageNumber) {
      var lastIndex = pageNumber * _this9._perPage - 1;
      return conversations.slice(0, lastIndex);
    });
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'earliestTime', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this10 = this;

    return (0, _reselect.createSelector)(function () {
      return _this10.typeFilteredConversations;
    }, getEarliestTime);
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'currentConversation', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this11 = this;

    return (0, _reselect.createSelector)(function () {
      return _this11.currentConversationId;
    }, function () {
      return _this11.oldMessages;
    }, function () {
      return _this11._messageStore.conversationStore;
    }, function () {
      return _this11.formatedConversations;
    }, function (conversationId, oldMessages, conversationStore, conversations) {
      var conversation = conversations.find(function (c) {
        return c.conversationId === conversationId;
      });
      var messages = [].concat(conversationStore[conversationId] || []);
      var currentConversation = (0, _extends3.default)({}, conversation);
      var allMessages = messages.concat(oldMessages).slice();
      currentConversation.messages = allMessages.reverse();
      currentConversation.senderNumber = (0, _messageHelper.getMyNumberFromMessage)({
        message: conversation,
        myExtensionNumber: _this11._extensionInfo.extensionNumber
      });
      currentConversation.recipients = (0, _messageHelper.getRecipientNumbersFromMessage)({
        message: conversation,
        myNumber: currentConversation.senderNumber
      });
      return currentConversation;
    });
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'messageText', [_getter2.default], {
  enumerable: true,
  initializer: function initializer() {
    var _this12 = this;

    return (0, _reselect.createSelector)(function () {
      return _this12.state.messageTexts;
    }, function () {
      return _this12.currentConversationId;
    }, function (messageTexts, conversationId) {
      var res = messageTexts.find(function (msg) {
        return (typeof msg === 'undefined' ? 'undefined' : (0, _typeof3.default)(msg)) === 'object' && msg.conversationId === conversationId;
      });
      return res ? res.text : '';
    });
  }
})), _class2)) || _class);
exports.default = Conversations;
//# sourceMappingURL=index.js.map
