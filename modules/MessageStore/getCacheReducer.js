'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConversationsReducer = getConversationsReducer;
exports.getMessagesReducer = getMessagesReducer;
exports.getSyncTokenReducer = getSyncTokenReducer;
exports.getUnreadCountsReducer = getUnreadCountsReducer;
exports.default = getCacheReducer;

var _redux = require('redux');

function getConversationsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        data = _ref.data;

    switch (type) {
      case types.saveConversations:
        {
          return {
            data: data,
            timestamp: Date.now()
          };
        }
      case types.cleanUp:
        return {};
      default:
        return state;
    }
  };
}

function getMessagesReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref2 = arguments[1];
    var type = _ref2.type,
        messages = _ref2.messages;

    switch (type) {
      case types.saveMessages:
        {
          return {
            data: messages,
            timestamp: Date.now()
          };
        }
      case types.cleanUp:
        return {};
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
      case types.saveSyncToken:
        {
          return syncToken;
        }
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

function getUnreadCountsReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var _ref4 = arguments[1];
    var type = _ref4.type,
        unreadCounts = _ref4.unreadCounts;

    switch (type) {
      case types.saveMessages:
        return unreadCounts;
      default:
        return state;
    }
  };
}

function getCacheReducer(types) {
  return (0, _redux.combineReducers)({
    conversations: getConversationsReducer(types),
    messages: getMessagesReducer(types),
    syncToken: getSyncTokenReducer(types),
    unreadCounts: getUnreadCountsReducer(types)
  });
}
//# sourceMappingURL=getCacheReducer.js.map
