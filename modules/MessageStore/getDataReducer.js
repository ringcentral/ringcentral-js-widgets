'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getMessageDataReducer = getMessageDataReducer;
exports.getUpdatedTimestampReducer = getUpdatedTimestampReducer;
exports.getSyncTokenReducer = getSyncTokenReducer;
exports.getSyncTimestampReducer = getSyncTimestampReducer;
exports.default = getDataReducer;

var _redux = require('redux');

var _messageStoreHelper = require('./messageStoreHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialConversationsDataState = {
  conversations: [],
  conversationMap: {},
  messages: []
};
function getMessageDataReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialConversationsDataState;
    var _ref = arguments[1];
    var type = _ref.type,
        records = _ref.records,
        _ref$syncToken = _ref.syncToken,
        syncToken = _ref$syncToken === undefined ? null : _ref$syncToken,
        _ref$syncConversation = _ref.syncConversationId,
        syncConversationId = _ref$syncConversation === undefined ? null : _ref$syncConversation,
        _ref$conversationId = _ref.conversationId,
        conversationId = _ref$conversationId === undefined ? null : _ref$conversationId,
        _ref$messageId = _ref.messageId,
        messageId = _ref$messageId === undefined ? null : _ref$messageId,
        _ref$recipients = _ref.recipients,
        recipients = _ref$recipients === undefined ? null : _ref$recipients;

    switch (type) {
      case types.syncSuccess:
      case types.updateMessages:
        return (0, _messageStoreHelper.pushRecordsToMessageData)((0, _extends3.default)({}, state, {
          records: records,
          syncToken: syncToken
        }));
      case types.syncConversationSuccess:
        return (0, _messageStoreHelper.pushRecordsToMessageData)((0, _extends3.default)({}, state, {
          records: records,
          syncToken: syncToken,
          syncConversationId: syncConversationId
        }));
      case types.updateConversationRecipients:
        return (0, _messageStoreHelper.updateConversationRecipients)((0, _extends3.default)({}, state, {
          conversationId: conversationId,
          recipients: recipients
        }));
      case types.removeMessage:
        {
          var newConversationMap = {};
          var newConversations = [];
          state.conversations.forEach(function (conversation) {
            if (conversation && conversation.conversationId !== conversationId) {
              newConversations.push((0, _extends3.default)({}, conversation));
              if (state.conversationMap[conversation.conversationId]) {
                newConversationMap[conversation.conversationId] = (0, _extends3.default)({}, state.conversationMap[conversation.conversationId], {
                  index: newConversations.length - 1,
                  unreadMessages: (0, _extends3.default)({}, state.conversationMap[conversation.conversationId].unreadMessages)
                });
              }
            }
          });
          return {
            conversations: newConversations,
            conversationMap: newConversationMap,
            messages: state.messages.filter(function (message) {
              return message.id !== messageId;
            })
          };
        }
      case types.cleanUp:
      case types.resetSuccess:
        return initialConversationsDataState;
      default:
        return state;
    }
  };
}

function getUpdatedTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref2 = arguments[1];
    var type = _ref2.type;

    switch (type) {
      case types.syncSuccess:
      case types.syncConversationSuccess:
      case types.updateConversationRecipients:
      case types.updateMessages:
        return Date.now();
      case types.resetSuccess:
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

function getSyncTokenReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        syncToken = _ref3.syncToken;

    switch (type) {
      case types.syncSuccess:
        return syncToken;
      case types.resetSuccess:
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

function getSyncTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        syncTimestamp = _ref4.syncTimestamp;

    switch (type) {
      case types.syncSuccess:
        return syncTimestamp;
      case types.resetSuccess:
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

function getDataReducer(types) {
  return (0, _redux.combineReducers)({
    data: getMessageDataReducer(types),
    updatedTimestamp: getUpdatedTimestampReducer(types),
    syncToken: getSyncTokenReducer(types),
    syncTimestamp: getSyncTimestampReducer(types)
  });
}
//# sourceMappingURL=getDataReducer.js.map
