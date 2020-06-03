"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConversationListReducer = getConversationListReducer;
exports.getConversationStoreReducer = getConversationStoreReducer;
exports.getTimestampReducer = getTimestampReducer;
exports.getSyncInfoReducer = getSyncInfoReducer;
exports["default"] = getDataReducer;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.for-each");

var _redux = require("redux");

var messageHelper = _interopRequireWildcard(require("../../lib/messageHelper"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getConversationListReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type,
        records = _ref.records,
        conversationId = _ref.conversationId,
        conversationStore = _ref.conversationStore,
        messageIds = _ref.messageIds;

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
            } // when user deleted a coversation message


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
              } // when user delete conversation


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

      case types.sliceConversations:
        return state.filter(function (_ref2) {
          var messageId = _ref2.messageId;
          return messageIds.indexOf(messageId) > -1;
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

    var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref3.type,
        records = _ref3.records,
        conversationId = _ref3.conversationId,
        messageIds = _ref3.messageIds;

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

          newState = _objectSpread({}, state);
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
        Object.keys(updatedConversations).forEach(function (id) {
          var noSorted = newState[id];
          newState[id] = noSorted.sort(messageHelper.sortByCreationTime);
        });
        return newState;

      case types.deleteConversation:
        if (!state[conversationId]) {
          return state;
        }

        newState = _objectSpread({}, state);
        delete newState[conversationId];
        return newState;

      case types.sliceConversations:
        {
          var keys = Object.keys(state);
          return keys.reduce(function (acc, key) {
            var messages = state[key];
            var persist = messages.filter(function (_ref4) {
              var id = _ref4.id;
              return messageIds.indexOf(id) > -1;
            });

            if (!persist.length) {
              return acc;
            }

            acc[key] = persist;
            return acc;
          }, {});
        }

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

    var _ref5 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref5.type,
        timestamp = _ref5.timestamp;

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

    var _ref6 = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref6.type,
        syncInfo = _ref6.syncInfo;

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
