'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _desc, _value, _class;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getMessagesReducer = require('./getMessagesReducer');

var _getMessagesReducer2 = _interopRequireDefault(_getMessagesReducer);

var _messageHelper = require('../../lib/messageHelper');

var _cleanNumber = require('../../lib/cleanNumber');

var _cleanNumber2 = _interopRequireDefault(_cleanNumber);

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

/**
 * @class
 * @description Conversation list managing module
 */
var Messages = (_class = function (_RcModule) {
  (0, _inherits3.default)(Messages, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {MessageStore} params.messageStore - messageStore module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   * @param {ConversationMatcher} params.conversationMatcher - conversationMatcher module instance
   * @param {ConversationLogger} params.conversationLogger - conversationLogger module instance
   * @param {Number} params.defaultPerPage - default numbers of perPage, default 20
   */
  function Messages(_ref) {
    var messageStore = _ref.messageStore,
        extensionInfo = _ref.extensionInfo,
        _ref$defaultPerPage = _ref.defaultPerPage,
        defaultPerPage = _ref$defaultPerPage === undefined ? 20 : _ref$defaultPerPage,
        contactMatcher = _ref.contactMatcher,
        conversationMatcher = _ref.conversationMatcher,
        conversationLogger = _ref.conversationLogger,
        options = (0, _objectWithoutProperties3.default)(_ref, ['messageStore', 'extensionInfo', 'defaultPerPage', 'contactMatcher', 'conversationMatcher', 'conversationLogger']);
    (0, _classCallCheck3.default)(this, Messages);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Messages.__proto__ || (0, _getPrototypeOf2.default)(Messages)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._contactMatcher = contactMatcher;
    _this._conversationLogger = conversationLogger;
    _this._messageStore = _ensureExist2.default.call(_this, messageStore, 'messageStore');
    _this._extensionInfo = _ensureExist2.default.call(_this, extensionInfo, 'extensionInfo');
    _this._reducer = (0, _getMessagesReducer2.default)(_this.actionTypes, defaultPerPage);

    _this.addSelector('uniqueNumbers', function () {
      return _this._messageStore.conversations;
    }, function (messages) {
      var output = [];
      var numberMap = {};
      function addIfNotExist(number) {
        if (!numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }
      messages.forEach(function (message) {
        if (message.from && message.from.phoneNumber) {
          addIfNotExist(message.from.phoneNumber);
        } else if (message.from && message.from.extensionNumber) {
          addIfNotExist(message.from.extensionNumber);
        }
        if (message.to && message.to.length > 0) {
          message.to.forEach(function (toUser) {
            if (toUser && toUser.phoneNumber) {
              addIfNotExist(toUser.phoneNumber);
            } else if (toUser && toUser.extensionNumber) {
              addIfNotExist(toUser.extensionNumber);
            }
          });
        }
      });
      return output;
    });
    _this.addSelector('effectiveSearchString', function () {
      return _this.state.searchInput;
    }, function (input) {
      if (input.length >= 3) return input;
      return '';
    });
    _this.addSelector('allConversations', function () {
      return _this._messageStore.conversations;
    }, function () {
      return _this._extensionInfo.extensionNumber;
    }, function () {
      return _this._contactMatcher && _this._contactMatcher.dataMapping;
    }, function () {
      return _this._conversationLogger && _this._conversationLogger.loggingMap;
    }, function () {
      return _this._conversationLogger && _this._conversationLogger.dataMapping;
    }, function (conversations, extensionNumber) {
      var contactMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var loggingMap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var conversationLogMapping = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
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
        var conversationLogId = _this._conversationLogger ? _this._conversationLogger.getConversationLogId(message) : null;
        var isLogging = !!(conversationLogId && loggingMap[conversationLogId]);
        var conversationMatches = conversationLogMapping[conversationLogId] || [];
        return (0, _extends3.default)({}, message, {
          self: self,
          selfMatches: selfMatches,
          correspondents: correspondents,
          correspondentMatches: correspondentMatches,
          conversationLogId: conversationLogId,
          isLogging: isLogging,
          conversationMatches: conversationMatches,
          lastMatchedCorrespondentEntity: _this._conversationLogger && _this._conversationLogger.getLastMatchedCorrespondentEntity(message) || null
        });
      });
    });
    _this.addSelector('filteredConversations', _this._selectors.allConversations, function () {
      return _this._selectors.effectiveSearchString();
    }, function (allConversations, effectiveSearchString) {
      if (effectiveSearchString !== '') {
        var searchResults = [];
        allConversations.forEach(function (message) {
          var searchNumber = (0, _cleanNumber2.default)(effectiveSearchString, false);
          var searchRegExp = new RegExp(effectiveSearchString, 'i');
          if (searchNumber !== '' && message.correspondents.find(function (contact) {
            return (0, _cleanNumber2.default)(contact.phoneNumber || contact.extensionNumber || '').indexOf(searchNumber) > -1;
          })) {
            // match by phoneNumber or extensionNumber
            searchResults.push((0, _extends3.default)({}, message, {
              matchOrder: 0
            }));
            return;
          }
          if (message.correspondentMatches.length) {
            if (message.correspondentMatches.find(function (entity) {
              return entity.name && searchRegExp.test(entity.name);
            })) {
              // match by entity's name
              searchResults.push((0, _extends3.default)({}, message, {
                matchOrder: 0
              }));
              return;
            }
          } else if (message.correspondents.find(function (contact) {
            return searchRegExp.test(contact.name || '');
          })) {
            searchResults.push((0, _extends3.default)({}, message, {
              matchOrder: 0
            }));
            return;
          }

          // try match messages of the same conversation
          if (searchRegExp.test(message.subject)) {
            searchResults.push((0, _extends3.default)({}, message, {
              matchOrder: 1
            }));
            return;
          }
          var matchedMessage = _this._messageStore.messages.find(function (item) {
            return item.conversationId === message.conversationId && searchRegExp.test(item.subject);
          });
          if (matchedMessage) {
            searchResults.push((0, _extends3.default)({}, message, {
              matchedMessage: matchedMessage,
              matchOrders: 1
            }));
          }
        });
        return searchResults.sort(_messageHelper.sortSearchResults);
      }
      return allConversations.sort(_messageHelper.sortSearchResults);
    });

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: _this._selectors.uniqueNumbers,
        readyCheckFn: function readyCheckFn() {
          return _this._messageStore.ready;
        }
      });
    }

    _this._lastProcessedNumbers = null;
    return _this;
  }

  (0, _createClass3.default)(Messages, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
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

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _ref2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return !!(this._messageStore.ready && this._extensionInfo.ready && (!this._contactMatcher || this._contactMatcher.ready) && (!this._conversationLogger || this._conversationLogger.ready) && this.pending);
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
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return !!((!this._messageStore.ready || !this._extensionInfo.ready || this._contactMatcher && !this._contactMatcher.ready || this._conversationLogger && !this._conversationLogger.ready) && this.ready);
    }
  }, {
    key: '_reset',
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.reset
      });
      this._lastProcessedNumbers = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: '_getCurrentPageMessages',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(page) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.setPage,
                  page: page
                });

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _getCurrentPageMessages(_x4) {
        return _ref3.apply(this, arguments);
      }

      return _getCurrentPageMessages;
    }()
  }, {
    key: 'loadNextPageMessages',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.nextPage
                });

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadNextPageMessages() {
        return _ref4.apply(this, arguments);
      }

      return loadNextPageMessages;
    }()
  }, {
    key: 'updateSearchInput',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(input) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.updateSearchInput,
                  input: input
                });

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateSearchInput(_x5) {
        return _ref5.apply(this, arguments);
      }

      return updateSearchInput;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'pending',
    get: function get() {
      return this.status === _moduleStatuses2.default.pending;
    }
  }, {
    key: 'searchInput',
    get: function get() {
      return this.state.searchInput;
    }
  }, {
    key: 'allConversations',
    get: function get() {
      return this._selectors.allConversations();
    }
  }, {
    key: 'filteredConversations',
    get: function get() {
      return this._selectors.filteredConversations();
    }
  }]);
  return Messages;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class.prototype, '_getCurrentPageMessages', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_getCurrentPageMessages'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadNextPageMessages', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'loadNextPageMessages'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateSearchInput', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateSearchInput'), _class.prototype)), _class);
exports.default = Messages;
//# sourceMappingURL=index.js.map
