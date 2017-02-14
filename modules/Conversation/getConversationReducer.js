'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConversationStatusReducer = getConversationStatusReducer;
exports.getCurrentConversationReducer = getCurrentConversationReducer;
exports.getCurrentSenderNumberReducer = getCurrentSenderNumberReducer;
exports.getCurrentRecipientsReducer = getCurrentRecipientsReducer;
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

function getCurrentConversationReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type,
        conversation = _ref2.conversation;

    switch (type) {
      case types.load:
      case types.update:
        return conversation;
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

function getCurrentSenderNumberReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        senderNumber = _ref3.senderNumber;

    switch (type) {
      case types.updateSenderNumber:
        return senderNumber;
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

function getCurrentRecipientsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref4 = arguments[1];
    var type = _ref4.type,
        recipients = _ref4.recipients;

    switch (type) {
      case types.updateRecipients:
        return recipients;
      case types.cleanUp:
        return [];
      default:
        return state;
    }
  };
}

function getMessageStoreUpdatedAtReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref5 = arguments[1];
    var type = _ref5.type,
        updatedAt = _ref5.updatedAt;

    switch (type) {
      case types.updateMessageStoreUpdatedAt:
        {
          return updatedAt;
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
    conversation: getCurrentConversationReducer(types),
    senderNumber: getCurrentSenderNumberReducer(types),
    recipients: getCurrentRecipientsReducer(types),
    messageStoreUpdatedAt: getMessageStoreUpdatedAtReducer(types)
  });
}
//# sourceMappingURL=getConversationReducer.js.map
