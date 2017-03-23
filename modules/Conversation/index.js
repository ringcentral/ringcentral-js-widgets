'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _messageHelper = require('../../lib/messageHelper');

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getConversationReducer = require('./getConversationReducer');

var _getConversationReducer2 = _interopRequireDefault(_getConversationReducer);

var _conversationStatus = require('./conversationStatus');

var _conversationStatus2 = _interopRequireDefault(_conversationStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Conversation = function (_RcModule) {
  (0, _inherits3.default)(Conversation, _RcModule);

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
    _this.replyToReceivers = _this.replyToReceivers.bind(_this);
    _this.changeDefaultRecipient = _this.changeDefaultRecipient.bind(_this);
    _this.changeMatchedNames = _this.changeMatchedNames.bind(_this);
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
    value: function loadConversationById(id) {
      this._loadConversation(id);
      this._messageStore.readMessages(id);
    }
  }, {
    key: 'unloadConversation',
    value: function unloadConversation() {
      this.store.dispatch({
        type: this.actionTypes.unload
      });
    }
  }, {
    key: 'changeMatchedNames',
    value: function changeMatchedNames(matchedNames) {
      var recipients = this.recipients.slice();
      if (recipients.length !== 1) {
        return;
      }
      if (matchedNames) {
        recipients[0].matchedNames = matchedNames;
        this._updateConversationRecipients(recipients);
      }
    }
  }, {
    key: 'changeDefaultRecipient',
    value: function changeDefaultRecipient(phoneNumber) {
      if (this.recipients.length < 2) {
        return;
      }
      var recipients = this.recipients.slice();
      var defaultNumberIndex = recipients.findIndex(function (number) {
        return number.extensionNumber === phoneNumber || number.phoneNumber === phoneNumber;
      });
      if (defaultNumberIndex < 0) {
        return;
      }
      if (this.id) {
        var defaultNumber = recipients[defaultNumberIndex];
        recipients.splice(defaultNumberIndex, 1);
        var newRecipients = [defaultNumber].concat(recipients);
        this._updateConversationRecipients(newRecipients);
      }
    }
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
      var lastMessage = this._messageStore.conversations[conversation.index];
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
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(text) {
        var responses;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.reply
                });
                _context.prev = 1;
                _context.next = 4;
                return this._messageSender.send({
                  fromNumber: this._getFromNumber(),
                  toNumbers: this._getToNumbers(),
                  text: text,
                  replyOnMessageId: this._getReplyOnMessageId()
                });

              case 4:
                responses = _context.sent;

                if (!(responses && responses[0])) {
                  _context.next = 9;
                  break;
                }

                this._messageStore.pushMessage(responses[0]);
                this.store.dispatch({
                  type: this.actionTypes.replySuccess
                });
                return _context.abrupt('return', responses[0]);

              case 9:
                this._onReplyError();
                return _context.abrupt('return', null);

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](1);

                this._onReplyError();
                throw _context.t0;

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 13]]);
      }));

      function replyToReceivers(_x) {
        return _ref2.apply(this, arguments);
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
}(_RcModule3.default);

exports.default = Conversation;
//# sourceMappingURL=index.js.map
