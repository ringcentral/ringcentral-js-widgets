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

var _dec, _class, _desc, _value, _class2;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _messageHelper = require('../../lib/messageHelper');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getConversationReducer = require('./getConversationReducer');

var _getConversationReducer2 = _interopRequireDefault(_getConversationReducer);

var _conversationStatus = require('./conversationStatus');

var _conversationStatus2 = _interopRequireDefault(_conversationStatus);

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
 * @description Conversation managing module
 */
var Conversation = (_dec = (0, _di.Module)({
  deps: ['MessageSender', 'ExtensionInfo', 'MessageStore']
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(Conversation, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {MessageSender} params.messageSender - messageSender module instance
   * @param {ExtensionInfo} params.extensionInfo - extensionInfo module instance
   * @param {MessageStore} params.messageStore - messageStore module instance
   */
  function Conversation(_ref) {
    var messageSender = _ref.messageSender,
        extensionInfo = _ref.extensionInfo,
        messageStore = _ref.messageStore,
        options = (0, _objectWithoutProperties3.default)(_ref, ['messageSender', 'extensionInfo', 'messageStore']);
    (0, _classCallCheck3.default)(this, Conversation);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Conversation.__proto__ || (0, _getPrototypeOf2.default)(Conversation)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._reducer = (0, _getConversationReducer2.default)(_this.actionTypes);
    _this._messageSender = messageSender;
    _this._extensionInfo = extensionInfo;
    _this._messageStore = messageStore;
    _this._promise = null;
    return _this;
  }

  (0, _createClass3.default)(Conversation, [{
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
        this._initModuleStatus();
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      } else if (this._shouldReloadConversation()) {
        this._loadConversation(this.id);
        this._messageStore.readMessages(this.id);
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._extensionInfo.ready && this._messageSender.ready && this._messageStore.ready && !this.ready;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._extensionInfo.ready || !this._messageSender.ready || !this._messageStore.ready) && this.ready;
    }
  }, {
    key: '_shouldReloadConversation',
    value: function _shouldReloadConversation() {
      return this.ready && !!this.id && this.messageStoreUpdatedAt !== this._messageStore.updatedTimestamp;
    }
  }, {
    key: '_initModuleStatus',
    value: function _initModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: 'loadConversationById',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.id !== id) {
                  this._loadConversation(id);
                  this._messageStore.readMessages(id);
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadConversationById(_x) {
        return _ref2.apply(this, arguments);
      }

      return loadConversationById;
    }()
  }, {
    key: 'unloadConversation',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.id) {
                  this.store.dispatch({
                    type: this.actionTypes.unload
                  });
                }

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function unloadConversation() {
        return _ref3.apply(this, arguments);
      }

      return unloadConversation;
    }()
  }, {
    key: 'changeMatchedNames',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(matchedNames) {
        var recipients;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                recipients = this.recipients.slice();

                if (!(recipients.length !== 1)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt('return');

              case 3:
                if (matchedNames) {
                  recipients[0].matchedNames = matchedNames;
                  this._updateConversationRecipients(recipients);
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function changeMatchedNames(_x2) {
        return _ref4.apply(this, arguments);
      }

      return changeMatchedNames;
    }()
  }, {
    key: 'changeDefaultRecipient',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(phoneNumber) {
        var recipients, defaultNumberIndex, defaultNumber, newRecipients;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.recipients.length < 2)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:
                recipients = this.recipients.slice();
                defaultNumberIndex = recipients.findIndex(function (number) {
                  return number.extensionNumber === phoneNumber || number.phoneNumber === phoneNumber;
                });

                if (!(defaultNumberIndex < 0)) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('return');

              case 6:
                if (this.id) {
                  defaultNumber = recipients[defaultNumberIndex];

                  recipients.splice(defaultNumberIndex, 1);
                  newRecipients = [defaultNumber].concat(recipients);

                  this._updateConversationRecipients(newRecipients);
                }

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function changeDefaultRecipient(_x3) {
        return _ref5.apply(this, arguments);
      }

      return changeDefaultRecipient;
    }()
  }, {
    key: '_updateConversationRecipients',
    value: function _updateConversationRecipients(newRecipients) {
      if (!this.id) {
        return;
      }
      this._messageStore.updateConversationRecipientList(this.id, newRecipients);
      this._updateRecipients(newRecipients);
    }
  }, {
    key: '_updateRecipients',
    value: function _updateRecipients(recipients) {
      this.store.dispatch({
        type: this.actionTypes.updateRecipients,
        recipients: recipients
      });
    }
  }, {
    key: '_loadConversation',
    value: function _loadConversation(conversationId) {
      var conversation = this._messageStore.findConversationById(conversationId);
      if (!conversation) {
        return;
      }
      var messages = this._messageStore.messages.filter(function (message) {
        return message.conversationId === conversationId;
      });
      var lastMessage = this._messageStore.allConversations[conversation.index];
      var senderNumber = this._getCurrentSenderNumber(lastMessage);
      var recipients = lastMessage && lastMessage.recipients;
      if (!recipients || recipients.length === 0) {
        recipients = this._getRecipients(lastMessage, senderNumber);
      }
      this.store.dispatch({
        type: this.actionTypes.load,
        conversationId: conversationId,
        messages: messages,
        conversationsTimestamp: this._messageStore.updatedTimestamp,
        senderNumber: senderNumber,
        recipients: recipients
      });
    }
  }, {
    key: '_getCurrentSenderNumber',
    value: function _getCurrentSenderNumber(lastMessage) {
      if (!lastMessage) {
        return null;
      }
      return (0, _messageHelper.getMyNumberFromMessage)({
        message: lastMessage,
        myExtensionNumber: this._extensionInfo.extensionNumber
      });
    }
  }, {
    key: '_getRecipients',
    value: function _getRecipients(lastMessage, senderNumber) {
      if (!lastMessage || !senderNumber) {
        return [];
      }
      return (0, _messageHelper.getRecipientNumbersFromMessage)({
        message: lastMessage,
        myNumber: senderNumber
      });
    }
  }, {
    key: '_getReplyOnMessageId',
    value: function _getReplyOnMessageId() {
      var lastMessage = this.messages && this.messages.length > 0 && this.messages[this.messages.length - 1];
      if (lastMessage && lastMessage.id) {
        return lastMessage.id;
      }
      return null;
    }
  }, {
    key: '_getFromNumber',
    value: function _getFromNumber() {
      if (!this.senderNumber) {
        return null;
      }
      return this.senderNumber.extensionNumber || this.senderNumber.phoneNumber;
    }
  }, {
    key: '_getToNumbers',
    value: function _getToNumbers() {
      return this.recipients.map(function (recipient) {
        return recipient.extensionNumber || recipient.phoneNumber;
      });
    }
  }, {
    key: 'replyToReceivers',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(text) {
        var responses;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.reply
                });
                _context5.prev = 1;
                _context5.next = 4;
                return this._messageSender.send({
                  fromNumber: this._getFromNumber(),
                  toNumbers: this._getToNumbers(),
                  text: text,
                  replyOnMessageId: this._getReplyOnMessageId()
                });

              case 4:
                responses = _context5.sent;

                if (!(responses && responses[0])) {
                  _context5.next = 9;
                  break;
                }

                this._messageStore.pushMessage(responses[0]);
                this.store.dispatch({
                  type: this.actionTypes.replySuccess
                });
                return _context5.abrupt('return', responses[0]);

              case 9:
                this._onReplyError();
                return _context5.abrupt('return', null);

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5['catch'](1);

                this._onReplyError();
                throw _context5.t0;

              case 17:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 13]]);
      }));

      function replyToReceivers(_x4) {
        return _ref6.apply(this, arguments);
      }

      return replyToReceivers;
    }()
  }, {
    key: '_onReplyError',
    value: function _onReplyError() {
      this.store.dispatch({
        type: this.actionTypes.replyError
      });
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'conversationStatus',
    get: function get() {
      return this.state.conversationStatus;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'pushing',
    get: function get() {
      return this.conversationStatus === _conversationStatus2.default.pushing;
    }
  }, {
    key: 'id',
    get: function get() {
      return this.state.id;
    }
  }, {
    key: 'messages',
    get: function get() {
      return this.state.messages;
    }
  }, {
    key: 'senderNumber',
    get: function get() {
      return this.state.senderNumber;
    }
  }, {
    key: 'recipients',
    get: function get() {
      return this.state.recipients;
    }
  }, {
    key: 'messageStoreUpdatedAt',
    get: function get() {
      return this.state.messageStoreUpdatedAt;
    }
  }]);
  return Conversation;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'loadConversationById', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'loadConversationById'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'unloadConversation', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'unloadConversation'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'changeMatchedNames', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'changeMatchedNames'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'changeDefaultRecipient', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'changeDefaultRecipient'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'replyToReceivers', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'replyToReceivers'), _class2.prototype)), _class2)) || _class);
exports.default = Conversation;
//# sourceMappingURL=index.js.map
