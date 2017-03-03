'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConversationStatusReducer = getConversationStatusReducer;
exports.getConversationIdReducer = getConversationIdReducer;
exports.getMessagesReducer = getMessagesReducer;
exports.getSenderNumberReducer = getSenderNumberReducer;
exports.getRecipientsReducer = getRecipientsReducer;
exports.getMessageStoreUpdatedAtReducer = getMessageStoreUpdatedAtReducer;
exports.default = getConversationReducer;

var _redux = require('redux');

var _getModuleStatusReducer = require('../../lib/getModuleStatusReducer');

var _getModuleStatusReducer2 = _interopRequireDefault(_getModuleStatusReducer);

var _conversationStatus = require('./conversationStatus');

var _conversationStatus2 = _interopRequireDefault(_conversationStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConversationStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _conversationStatus2.default.idle;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.reply:
        return _conversationStatus2.default.pushing;
      case types.replySuccess:
      case types.replyError:
        return _conversationStatus2.default.idle;
      default:
        return state;
    }
  };
}

function getConversationIdReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        conversationId = _ref2.conversationId;

    switch (type) {
      case types.loadId:
      case types.load:
        return conversationId;
      case types.unload:
        return null;
      default:
        return state;
    }
  };
}

function getMessagesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref3 = arguments[1];
    var type = _ref3.type,
        messages = _ref3.messages;

    switch (type) {
      case types.load:
        return messages;
      case types.unload:
        return [];
      default:
        return state;
    }
  };
}

function getSenderNumberReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        senderNumber = _ref4.senderNumber;

    switch (type) {
      case types.load:
        return senderNumber;
      case types.unload:
        return null;
      default:
        return state;
    }
  };
}

function getRecipientsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref5 = arguments[1];
    var type = _ref5.type,
        recipients = _ref5.recipients;

    switch (type) {
      case types.load:
      case types.updateRecipients:
        return recipients;
      case types.unload:
        return [];
      default:
        return state;
    }
  };
}

function getMessageStoreUpdatedAtReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref6 = arguments[1];
    var type = _ref6.type,
        conversationsTimestamp = _ref6.conversationsTimestamp;

    switch (type) {
      case types.load:
        {
          return conversationsTimestamp;
        }
      default:
        return state;
    }
  };
}

function getConversationReducer(types) {
  return (0, _redux.combineReducers)({
    status: (0, _getModuleStatusReducer2.default)(types),
    conversationStatus: getConversationStatusReducer(types),
    id: getConversationIdReducer(types),
    messages: getMessagesReducer(types),
    senderNumber: getSenderNumberReducer(types),
    recipients: getRecipientsReducer(types),
    messageStoreUpdatedAt: getMessageStoreUpdatedAtReducer(types)
  });
}
//# sourceMappingURL=getConversationReducer.js.map
