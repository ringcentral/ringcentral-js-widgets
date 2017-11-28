'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _desc, _value, _class2;

exports.getLogId = getLogId;
exports.conversationLogIdentityFunction = conversationLogIdentityFunction;

var _di = require('../../lib/di');

var _LoggerBase2 = require('../../lib/LoggerBase');

var _LoggerBase3 = _interopRequireDefault(_LoggerBase2);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getDataReducer = require('./getDataReducer');

var _getDataReducer2 = _interopRequireDefault(_getDataReducer);

var _messageTypes = require('../../enums/messageTypes');

var _messageTypes2 = _interopRequireDefault(_messageTypes);

var _messageHelper = require('../../lib/messageHelper');

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

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

function getLogId(_ref) {
  var conversationId = _ref.conversationId,
      date = _ref.date;

  return conversationId + '/' + date;
}

function conversationLogIdentityFunction(conversation) {
  return conversation.conversationLogId;
}

/**
 * @class
 * @description Conversation logger module
 */
var ConversationLogger = (_dec = (0, _di.Module)({
  deps: ['Auth', 'Storage', { dep: 'TabManager', optional: true }, 'ContactMatcher', 'ConversationMatcher', 'DateTimeFormat', 'ExtensionInfo', 'MessageStore', 'RolesAndPermissions', { dep: 'ConversationLoggerOptions', optional: false }]
}), _dec(_class = (_class2 = function (_LoggerBase) {
  (0, _inherits3.default)(ConversationLogger, _LoggerBase);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   * @param {ConversationMatcher} params.conversationMatcher - conversationMatcher module instance
   * @param {DateTimeFormat} params.dateTimeFormat - dateTimeFormat module instance
   * @param {MessageStore} params.messageStore - messageStore module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermissions module instance
   * @param {Storage} params.storage - storage module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   * @param {Function} params.isLoggedContact - get if contact is logged
   * @param {Function} params.formatDateTime - data time format
   */
  function ConversationLogger(_ref2) {
    var auth = _ref2.auth,
        contactMatcher = _ref2.contactMatcher,
        conversationMatcher = _ref2.conversationMatcher,
        dateTimeFormat = _ref2.dateTimeFormat,
        extensionInfo = _ref2.extensionInfo,
        messageStore = _ref2.messageStore,
        rolesAndPermissions = _ref2.rolesAndPermissions,
        storage = _ref2.storage,
        tabManager = _ref2.tabManager,
        _ref2$isLoggedContact = _ref2.isLoggedContact,
        isLoggedContact = _ref2$isLoggedContact === undefined ? function () {
      return false;
    } : _ref2$isLoggedContact,
        _ref2$formatDateTime = _ref2.formatDateTime,
        formatDateTime = _ref2$formatDateTime === undefined ? function () {
      return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
    } : _ref2$formatDateTime,
        options = (0, _objectWithoutProperties3.default)(_ref2, ['auth', 'contactMatcher', 'conversationMatcher', 'dateTimeFormat', 'extensionInfo', 'messageStore', 'rolesAndPermissions', 'storage', 'tabManager', 'isLoggedContact', 'formatDateTime']);
    (0, _classCallCheck3.default)(this, ConversationLogger);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConversationLogger.__proto__ || (0, _getPrototypeOf2.default)(ConversationLogger)).call(this, (0, _extends3.default)({}, options, {
      name: 'conversationLogger',
      actionTypes: _actionTypes2.default,
      identityFunction: conversationLogIdentityFunction
    })));

    _this._auth = _ensureExist2.default.call(_this, auth, 'auth');
    _this._contactMatcher = _ensureExist2.default.call(_this, contactMatcher, 'contactMatcher');
    _this._conversationMatcher = _ensureExist2.default.call(_this, conversationMatcher, 'conversationMatcher');
    _this._dateTimeFormat = _ensureExist2.default.call(_this, dateTimeFormat, 'dateTimeFormat');
    _this._extensionInfo = _ensureExist2.default.call(_this, extensionInfo, 'extensionInfo');
    _this._messageStore = _ensureExist2.default.call(_this, messageStore, 'messageStore');
    _this._rolesAndPermissions = _ensureExist2.default.call(_this, rolesAndPermissions, 'rolesAndPermissions');
    _this._storage = _ensureExist2.default.call(_this, storage, 'storage');
    _this._tabManager = tabManager;
    _this._isLoggedContact = isLoggedContact;
    _this._formatDateTime = formatDateTime;
    _this._storageKey = _this._name + 'Data';
    _this._storage.registerReducer({
      key: _this._storageKey,
      reducer: (0, _getDataReducer2.default)(_this.actionTypes)
    });

    _this.addSelector('conversationLogMap', function () {
      return _this._messageStore.messages;
    }, function () {
      return _this._extensionInfo.extensionNumber;
    }, function () {
      return _this._conversationMatcher.dataMapping;
    }, function (messages, extensionNumber) {
      var conversationLogMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var mapping = {};
      messages.slice().sort(_messageHelper.sortByDate).forEach(function (message) {
        var conversationId = message.conversationId;

        var date = _this._formatDateTime({
          type: 'date',
          utcTimestamp: message.creationTime
        });
        if (!mapping[conversationId]) {
          mapping[conversationId] = {};
        }
        if (!mapping[conversationId][date]) {
          var conversationLogId = getLogId({ conversationId: conversationId, date: date });
          mapping[conversationId][date] = (0, _extends3.default)({
            conversationLogId: conversationLogId,
            conversationId: conversationId,
            creationTime: message.createTime, // for sorting
            date: date,
            type: message.type,
            messages: [],
            conversationLogMatches: conversationLogMapping[conversationLogId] || []
          }, (0, _messageHelper.getNumbersFromMessage)({ extensionNumber: extensionNumber, message: message }));
        }
        mapping[conversationId][date].messages.push(message);
      });
      return mapping;
    });

    _this.addSelector('conversationLogIds', _this._selectors.conversationLogMap, function (conversationLogMap) {
      var logIds = [];
      (0, _keys2.default)(conversationLogMap).forEach(function (conversationId) {
        (0, _keys2.default)(conversationLogMap[conversationId]).forEach(function (date) {
          logIds.push(conversationLogMap[conversationId][date].conversationLogId);
        });
      });
      return logIds;
    });
    _this.addSelector('uniqueNumbers', _this._selectors.conversationLogMap, function (conversationLogMap) {
      var output = [];
      var numberMap = {};
      function addIfNotExist(contact) {
        var number = contact.phoneNumber || contact.extensionNumber;
        if (number && !numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }
      (0, _keys2.default)(conversationLogMap).forEach(function (conversationId) {
        (0, _keys2.default)(conversationLogMap[conversationId]).forEach(function (date) {
          var conversation = conversationLogMap[conversationId][date];
          addIfNotExist(conversation.self);
          conversation.correspondents.forEach(addIfNotExist);
        });
      });
      return output;
    });

    _this._contactMatcher.addQuerySource({
      getQueriesFn: _this._selectors.uniqueNumbers,
      readyCheckFn: function readyCheckFn() {
        return _this._messageStore.ready && _this._extensionInfo.ready;
      }
    });
    _this._conversationMatcher.addQuerySource({
      getQueriesFn: _this._selectors.conversationLogIds,
      readyCheckFn: function readyCheckFn() {
        return _this._messageStore.ready && _this._extensionInfo.ready;
      }
    });

    _this._lastProcessedConversationLogMap = null;
    _this._autoLogQueue = [];
    _this._autoLogPromise = null;
    return _this;
  }

  (0, _createClass3.default)(ConversationLogger, [{
    key: '_shouldInit',
    value: function _shouldInit() {
      return this.pending && this._contactMatcher.ready && this._conversationMatcher.ready && this._dateTimeFormat.ready && this._extensionInfo.ready && this._messageStore.ready && this._rolesAndPermissions.ready && this._storage.ready && (!this._tabManager || this._tabManager.ready) && this._readyCheckFunction();
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return this.ready && (!this._contactMatcher.ready || !this._conversationMatcher.ready || !this._dateTimeFormat.ready || !this._extensionInfo.ready || !this._messageStore.ready || !this._rolesAndPermissions.ready || !this._storage.ready || this._tabManager && !this._tabManager.ready || !this._readyCheckFunction());
    }
  }, {
    key: '_onReset',
    value: function _onReset() {
      this._lastProcessedConversations = null;
      this._lastAutoLog = null;
      this._autoLogPromise = null;
      this._autoLogQueue = [];
    }
  }, {
    key: '_processQueue',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _this2 = this;

        var ownerId;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ownerId = this._auth.ownerId;
                _context.next = 3;
                return (0, _sleep2.default)(300);

              case 3:
                if (!(ownerId !== this._auth.ownerId)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return');

              case 5:
                _context.next = 7;
                return _promise2.default.all(this._autoLogQueue.splice(0, 10).map(function (conversation) {
                  return _this2._processConversationLog({ conversation: conversation });
                }));

              case 7:
                if (ownerId === this._auth.ownerId && this._autoLogQueue.length > 0) {
                  this._autoLogPromise = this._processQueue();
                } else {
                  this._autoLogPromise = null;
                }

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _processQueue() {
        return _ref3.apply(this, arguments);
      }

      return _processQueue;
    }()
  }, {
    key: '_queueAutoLogConversation',
    value: function _queueAutoLogConversation(_ref4) {
      var conversation = _ref4.conversation;

      this._autoLogQueue.push(conversation);
      if (!this._autoLogPromise) {
        this._autoLogPromise = this._processQueue();
      }
    }
  }, {
    key: '_getCorrespondentMatches',
    value: function _getCorrespondentMatches(conversation) {
      var _this3 = this;

      return conversation.correspondents && conversation.correspondents.reduce(function (result, contact) {
        var number = contact.phoneNumber || contact.extensionNumber;
        return number && _this3._contactMatcher.dataMapping[number] ? result.concat(_this3._contactMatcher.dataMapping[number]) : result;
      }, []) || [];
    }
  }, {
    key: 'getLastMatchedCorrespondentEntity',
    value: function getLastMatchedCorrespondentEntity(conversation) {
      var _this4 = this;

      var conversationLog = this.conversationLogMap[conversation.conversationId];
      if (!conversationLog) {
        return null;
      }
      var lastRecord = (0, _keys2.default)(conversationLog).map(function (date) {
        return _this4.conversationLogMap[conversation.conversationId][date];
      }).sort(_messageHelper.sortByDate).find(function (item) {
        return item.conversationLogMatches.length > 0;
      });
      if (lastRecord && this._conversationMatcher.dataMapping[lastRecord.conversationLogId] && this._conversationMatcher.dataMapping[lastRecord.conversationLogId].length) {
        var lastActivity = this._conversationMatcher.dataMapping[lastRecord.conversationLogId][0];
        var correspondentMatches = this._getCorrespondentMatches(lastRecord);
        return correspondentMatches.find(function (item) {
          return _this4._isLoggedContact(conversation, lastActivity, item);
        });
      }
      return null;
    }
  }, {
    key: '_processConversationLog',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref6) {
        var conversation = _ref6.conversation;
        var addIfNotExist, numbers, numberMap, selfNumber, selfMatches, correspondentMatches, selfEntity, correspondentEntity;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._conversationMatcher.match({ queries: [conversation.conversationLogId] });

              case 2:
                if (!(this._conversationMatcher.dataMapping[conversation.conversationLogId] && this._conversationMatcher.dataMapping[conversation.conversationLogId].length)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 5;
                return this._autoLogConversation({
                  conversation: conversation
                });

              case 5:
                _context2.next = 23;
                break;

              case 7:
                if (!(this.autoLog && conversation.type === _messageTypes2.default.sms)) {
                  _context2.next = 23;
                  break;
                }

                /* eslint { "no-inner-declarations": 0 } */
                addIfNotExist = function addIfNotExist(contact) {
                  var number = contact.phoneNumber || contact.extensionNumber;
                  if (number && !numberMap[number]) {
                    numbers.push(number);
                    numberMap[number] = true;
                  }
                };

                // new entry
                numbers = [];
                numberMap = {};

                addIfNotExist(conversation.self);
                conversation.correspondents.forEach(addIfNotExist);
                _context2.next = 15;
                return this._contactMatcher.match({ queries: numbers });

              case 15:
                selfNumber = conversation.self && (conversation.self.phoneNumber || conversation.self.extensionNumber);
                selfMatches = selfNumber && this._contactMatcher.dataMapping[conversation.self] || [];
                correspondentMatches = this._getCorrespondentMatches(conversation);
                selfEntity = selfMatches && selfMatches.length === 1 && selfMatches[0] || null;
                correspondentEntity = this.getLastMatchedCorrespondentEntity(conversation);


                correspondentEntity = correspondentEntity || correspondentMatches && correspondentMatches.length === 1 && correspondentMatches[0] || null;
                _context2.next = 23;
                return this._autoLogConversation({
                  conversation: conversation,
                  selfEntity: selfEntity,
                  correspondentEntity: correspondentEntity
                });

              case 23:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _processConversationLog(_x2) {
        return _ref5.apply(this, arguments);
      }

      return _processConversationLog;
    }()
  }, {
    key: '_processConversationLogMap',
    value: function _processConversationLogMap() {
      var _this5 = this;

      if (this.ready && this._lastAutoLog !== this.autoLog) {
        this._lastAutoLog = this.autoLog;
        if (this.autoLog) {
          // force conversation log checking when switch auto log to on
          this._lastProcessedConversations = null;
        }
      }
      if (this.ready && this._lastProcessedConversations !== this.conversationLogMap) {
        this._conversationMatcher.triggerMatch();
        this._contactMatcher.triggerMatch();
        var oldMap = this._lastProcessedConversations || {};
        this._lastProcessedConversations = this.conversationLogMap;
        if (!this._tabManager || this._tabManager.active) {
          (0, _keys2.default)(this._lastProcessedConversations).forEach(function (conversationId) {
            (0, _keys2.default)(_this5._lastProcessedConversations[conversationId]).forEach(function (date) {
              var conversation = _this5._lastProcessedConversations[conversationId][date];
              if (!oldMap[conversationId] || !oldMap[conversationId][date] || conversation.messages[0].id !== oldMap[conversationId][date].messages[0].id) {
                _this5._queueAutoLogConversation({
                  conversation: conversation
                });
              }
            });
          });
        }
      }
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _get3.default)(ConversationLogger.prototype.__proto__ || (0, _getPrototypeOf2.default)(ConversationLogger.prototype), '_onStateChange', this).call(this);

              case 2:
                this._processConversationLogMap();

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _onStateChange() {
        return _ref7.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_autoLogConversation',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref9) {
        var conversation = _ref9.conversation,
            selfEntity = _ref9.selfEntity,
            correspondentEntity = _ref9.correspondentEntity;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.log({
                  conversation: conversation,
                  selfEntity: selfEntity,
                  correspondentEntity: correspondentEntity
                });

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _autoLogConversation(_x3) {
        return _ref8.apply(this, arguments);
      }

      return _autoLogConversation;
    }()
  }, {
    key: 'log',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref11) {
        var conversation = _ref11.conversation,
            options = (0, _objectWithoutProperties3.default)(_ref11, ['conversation']);
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                (0, _get3.default)(ConversationLogger.prototype.__proto__ || (0, _getPrototypeOf2.default)(ConversationLogger.prototype), 'log', this).call(this, (0, _extends3.default)({ item: conversation }, options));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function log(_x4) {
        return _ref10.apply(this, arguments);
      }

      return log;
    }()
  }, {
    key: 'logConversation',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref13) {
        var _this6 = this;

        var conversationId = _ref13.conversationId,
            correspondentEntity = _ref13.correspondentEntity,
            redirect = _ref13.redirect,
            options = (0, _objectWithoutProperties3.default)(_ref13, ['conversationId', 'correspondentEntity', 'redirect']);
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.conversationLogMap[conversationId]) {
                  _context6.next = 3;
                  break;
                }

                _context6.next = 3;
                return _promise2.default.all((0, _keys2.default)(this.conversationLogMap[conversationId]).map(function (date) {
                  return _this6.conversationLogMap[conversationId][date];
                }).sort(_messageHelper.sortByDate).map(function (conversation, idx) {
                  var queueIndex = _this6._autoLogQueue.find(function (item) {
                    return item.conversationLogId === conversation.conversationLogId;
                  });
                  if (queueIndex > -1) {
                    _this6._autoLogQueue.splice(queueIndex, 1);
                  }
                  return _this6.log((0, _extends3.default)({}, options, {
                    conversation: conversation,
                    correspondentEntity: correspondentEntity,
                    redirect: redirect && idx === 0 // only direct on the first item
                  }));
                }));

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function logConversation(_x5) {
        return _ref12.apply(this, arguments);
      }

      return logConversation;
    }()
  }, {
    key: 'setAutoLog',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(autoLog) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.ready && autoLog !== this.autoLog) {
                  this.store.dispatch({
                    type: this.actionTypes.setAutoLog,
                    autoLog: autoLog
                  });
                }

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function setAutoLog(_x6) {
        return _ref14.apply(this, arguments);
      }

      return setAutoLog;
    }()
  }, {
    key: 'getConversationLogId',
    value: function getConversationLogId(message) {
      var conversationId = message.conversationId;

      var date = this._formatDateTime({
        type: 'date',
        utcTimestamp: message.creationTime
      });
      return getLogId({
        conversationId: conversationId,
        date: date
      });
    }
  }, {
    key: 'available',
    get: function get() {
      var _rolesAndPermissions$ = this._rolesAndPermissions.serviceFeatures,
          SMSReceiving = _rolesAndPermissions$.SMSReceiving,
          PagerReceiving = _rolesAndPermissions$.PagerReceiving;

      return !!(SMSReceiving && SMSReceiving.enabled || PagerReceiving && PagerReceiving.enabled);
    }
  }, {
    key: 'autoLog',
    get: function get() {
      return this._storage.getItem(this._storageKey).autoLog;
    }
  }, {
    key: 'conversationLogMap',
    get: function get() {
      return this._selectors.conversationLogMap();
    }
  }, {
    key: 'conversationLogIds',
    get: function get() {
      return this._selectors.conversationLogIds();
    }
  }, {
    key: 'dataMapping',
    get: function get() {
      return this._conversationMatcher.dataMapping;
    }
  }]);
  return ConversationLogger;
}(_LoggerBase3.default), (_applyDecoratedDescriptor(_class2.prototype, 'log', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'log'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'logConversation', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'logConversation'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'setAutoLog', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'setAutoLog'), _class2.prototype)), _class2)) || _class);
exports.default = ConversationLogger;
//# sourceMappingURL=index.js.map
