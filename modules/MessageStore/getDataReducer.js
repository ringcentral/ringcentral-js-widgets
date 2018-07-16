'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getConversationListReducer = getConversationListReducer;
exports.getConversationStoreReducer = getConversationStoreReducer;
exports.getTimestampReducer = getTimestampReducer;
exports.getSyncInfoReducer = getSyncInfoReducer;
exports.default = getDataReducer;

var _redux = require('redux');

var _messageHelper = require('../../lib/messageHelper');

var messageHelper = _interopRequireWildcard(_messageHelper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConversationListReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        records = _ref.records,
        conversationId = _ref.conversationId,
        conversationStore = _ref.conversationStore;

    var newState = [];
    var stateMap = {};
    switch (type) {
      case types.conversationsISyncSuccess:
      case types.conversationsFSyncSuccess:
      case types.updateMessages:
        if (type !== types.conversationsFSyncSuccess) {
          if (!records || records.length === 0) {
            return state;
          }
          state.forEach(function (oldConversation) {
            newState.push(oldConversation);
            stateMap[oldConversation.id] = {
              index: newState.length - 1
            };
          });
        }
        records.forEach(function (record) {
          var message = messageHelper.normalizeRecord(record);
          var id = message.conversationId;
          var newCreationTime = message.creationTime;
          var isDeleted = messageHelper.messageIsDeleted(message);
          if (stateMap[id]) {
            var oldConversation = newState[stateMap[id].index];
            var creationTime = oldConversation.creationTime;
            if (creationTime < newCreationTime && !isDeleted) {
              newState[stateMap[id].index] = {
                id: id,
                creationTime: newCreationTime,
                type: message.type,
                messageId: message.id
              };
            }
            // when user deleted a coversation message
            if (isDeleted && message.id === oldConversation.messageId) {
              var oldMessageList = conversationStore[id] || [];
              var exsitedMessageList = oldMessageList.filter(function (m) {
                return m.id !== message.id;
              });
              if (exsitedMessageList.length > 0) {
                newState[stateMap[id].index] = {
                  id: id,
                  creationTime: exsitedMessageList[0].creationTime,
                  type: exsitedMessageList[0].type,
                  messageId: exsitedMessageList[0].id
                };
                return;
              }
              // when user delete conversation
              newState[stateMap[id].index] = null;
              delete stateMap[id];
            }
            return;
          }
          if (isDeleted || !messageHelper.messageIsAcceptable(message)) {
            return;
          }
          newState.push({
            id: id,
            creationTime: newCreationTime,
            type: message.type,
            messageId: message.id
          });
          stateMap[id] = {
            index: newState.length - 1
          };
        });
        return newState.filter(function (c) {
          return !!c;
        }).sort(messageHelper.sortByCreationTime);
      case types.deleteConversation:
        return state.filter(function (c) {
          return c.id !== conversationId;
        });
      case types.resetSuccess:
        return [];
      default:
        return state;
    }
  };
}

function getConversationStoreReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref2 = arguments[1];
    var type = _ref2.type,
        records = _ref2.records,
        conversationId = _ref2.conversationId;

    var newState = {};
    var updatedConversations = {};
    switch (type) {
      case types.conversationsISyncSuccess:
      case types.conversationsFSyncSuccess:
      case types.updateMessages:
        if (type !== types.conversationsFSyncSuccess) {
          if (!records || records.length === 0) {
            return state;
          }
          newState = (0, _extends3.default)({}, state);
        }
        records.forEach(function (record) {
          var message = messageHelper.normalizeRecord(record);
          var id = message.conversationId;
          var newMessages = newState[id] ? [].concat(newState[id]) : [];
          var oldMessageIndex = newMessages.findIndex(function (r) {
            return r.id === record.id;
          });
          if (messageHelper.messageIsDeleted(message)) {
            newState[id] = newMessages.filter(function (m) {
              return m.id !== message.id;
            });
            if (newState[id].length === 0) {
              delete newState[id];
            }
            return;
          }
          if (oldMessageIndex > -1) {
            if (newMessages[oldMessageIndex].lastModifiedTime < message.lastModifiedTime) {
              newMessages[oldMessageIndex] = message;
            }
          } else if (messageHelper.messageIsAcceptable(message)) {
            newMessages.push(message);
          }
          updatedConversations[id] = 1;
          newState[id] = newMessages;
        });
        (0, _keys2.default)(updatedConversations).forEach(function (id) {
          var noSorted = newState[id];
          newState[id] = noSorted.sort(messageHelper.sortByCreationTime);
        });
        return newState;
      case types.deleteConversation:
        if (!state[conversationId]) {
          return state;
        }
        newState = (0, _extends3.default)({}, state);
        delete newState[conversationId];
        return newState;
      case types.resetSuccess:
        return {};
      default:
        return state;
    }
  };
}

function getTimestampReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref3 = arguments[1];
    var type = _ref3.type,
        timestamp = _ref3.timestamp;

    switch (type) {
      case types.conversationsFSyncSuccess:
      case types.conversationsISyncSuccess:
        return timestamp;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getSyncInfoReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        syncInfo = _ref4.syncInfo;

    switch (type) {
      case types.conversationsFSyncSuccess:
      case types.conversationsISyncSuccess:
        return syncInfo;
      case types.resetSuccess:
        return null;
      default:
        return state;
    }
  };
}

function getDataReducer(types) {
  return (0, _redux.combineReducers)({
    conversationList: getConversationListReducer(types),
    conversationStore: getConversationStoreReducer(types),
    syncInfo: getSyncInfoReducer(types),
    timestamp: getTimestampReducer(types)
  });
}
//# sourceMappingURL=getDataReducer.js.map
