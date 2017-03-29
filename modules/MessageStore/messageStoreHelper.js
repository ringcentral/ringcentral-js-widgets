'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.normalizeRecord = normalizeRecord;
exports.messageIsUnread = messageIsUnread;
exports.getMessageSyncParams = getMessageSyncParams;
exports.prepareNewMessagesData = prepareNewMessagesData;
exports.filterNullFromConversations = filterNullFromConversations;
exports.findIndexOfConversations = findIndexOfConversations;
exports.findIndexOfMessages = findIndexOfMessages;
exports.calcUnreadCount = calcUnreadCount;
exports.pushRecordsToMessageData = pushRecordsToMessageData;
exports.updateConversationRecipients = updateConversationRecipients;

var _messageHelper = require('../../lib/messageHelper');

var messageHelper = _interopRequireWildcard(_messageHelper);

var _removeUri = require('../../lib/removeUri');

var _removeUri2 = _interopRequireDefault(_removeUri);

var _syncTypes = require('../../enums/syncTypes');

var _syncTypes2 = _interopRequireDefault(_syncTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizeRecord(record) {
  return (0, _extends3.default)({}, record, {
    conversationId: record.conversation.id
  });
}

function messageIsUnread(message) {
  return message.direction === 'Inbound' && message.readStatus !== 'Read' && !messageHelper.messageIsDeleted(message);
}

function getMessageSyncParams(_ref) {
  var syncToken = _ref.syncToken,
      conversationId = _ref.conversationId,
      _ref$dateTo = _ref.dateTo,
      dateTo = _ref$dateTo === undefined ? new Date() : _ref$dateTo,
      _ref$recordCount = _ref.recordCount,
      recordCount = _ref$recordCount === undefined ? 250 : _ref$recordCount;

  if (syncToken) {
    return {
      syncToken: syncToken,
      syncType: _syncTypes2.default.iSync
    };
  }
  var lastSevenDate = new Date();
  lastSevenDate.setDate(lastSevenDate.getDate() - 7);
  var params = {
    syncType: _syncTypes2.default.fSync,
    dateFrom: lastSevenDate.toISOString(),
    dateTo: new Date(dateTo).toISOString(),
    recordCount: recordCount
  };
  if (conversationId) {
    params.conversationId = conversationId;
  }
  return params;
}

function prepareNewMessagesData(_ref2) {
  var messages = _ref2.messages,
      conversations = _ref2.conversations,
      conversationMap = _ref2.conversationMap,
      syncToken = _ref2.syncToken,
      syncConversationId = _ref2.syncConversationId;

  var newConversations = [];
  var newConversationMap = {};
  var newMessages = [];
  var messageMap = {};
  // copy old conversationMap to new conversationMap hash
  (0, _keys2.default)(conversationMap).forEach(function (key) {
    var conversation = (0, _extends3.default)({}, conversationMap[key], {
      unreadMessages: (0, _extends3.default)({}, conversationMap[key].unreadMessages)
    });
    // if converstation is not sync with conversation Id, update all conversation sync token
    if (syncToken && (!syncConversationId || syncConversationId === key)) {
      conversation.syncToken = syncToken;
    }
    newConversationMap[key] = conversation;
  });
  // copy old conversations to new conversations array
  conversations.forEach(function (conversation) {
    newConversations.push((0, _extends3.default)({}, conversation));
  });
  messages.forEach(function (message) {
    newMessages.push((0, _extends3.default)({}, message));
    messageMap[message.id] = newMessages.length - 1;
  });
  return {
    newConversations: newConversations,
    newConversationMap: newConversationMap,
    newMessages: newMessages,
    messageMap: messageMap
  };
}

function filterNullFromConversations(_ref3) {
  var conversations = _ref3.conversations,
      conversationMap = _ref3.conversationMap;

  var newConversations = [];
  // copy old conversationMap to new conversationMap hash
  // copy old conversations to new conversations array
  conversations.forEach(function (conversation) {
    if (!conversation) {
      return;
    }
    var conversationId = conversation.conversationId;
    newConversations.push((0, _extends3.default)({}, conversation));
    conversationMap[conversationId].index = newConversations.length - 1;
  });
  return {
    conversations: newConversations,
    conversationMap: conversationMap
  };
}

function findIndexOfConversations(newConversationMap, record) {
  var conversationId = record.conversation && record.conversation.id;
  var existedIndex = newConversationMap[conversationId] && newConversationMap[conversationId].index;
  if (existedIndex !== undefined && existedIndex !== null) {
    return existedIndex;
  }
  return -1;
}

function findIndexOfMessages(messageMap, record) {
  if (messageMap[record.id] !== undefined) {
    return messageMap[record.id];
  }
  return -1;
}

function calcUnreadCount(conversation) {
  return (0, _keys2.default)(conversation.unreadMessages).length;
}

function pushRecordsToMessageData(_ref4) {
  var messages = _ref4.messages,
      conversations = _ref4.conversations,
      conversationMap = _ref4.conversationMap,
      records = _ref4.records,
      syncToken = _ref4.syncToken,
      syncConversationId = _ref4.syncConversationId;

  var _prepareNewMessagesDa = prepareNewMessagesData({
    messages: messages,
    conversations: conversations,
    conversationMap: conversationMap,
    syncToken: syncToken,
    syncConversationId: syncConversationId
  }),
      newConversations = _prepareNewMessagesDa.newConversations,
      newConversationMap = _prepareNewMessagesDa.newConversationMap,
      newMessages = _prepareNewMessagesDa.newMessages,
      messageMap = _prepareNewMessagesDa.messageMap;

  var addMessageToMessageMap = function addMessageToMessageMap(message, index) {
    messageMap[message.id] = index;
  };
  var setSyncTokenToConversation = function setSyncTokenToConversation(conversation) {
    if (syncToken && (!syncConversationId || syncConversationId && syncConversationId === conversation.id)) {
      conversation.syncToken = syncToken;
    }
  };
  var addMessageToConversationMap = function addMessageToConversationMap(message, index) {
    var conversationId = message.conversationId;
    var conversation = newConversationMap[conversationId] || { unreadMessages: {} };
    conversation.index = index;
    conversation.id = conversationId;
    setSyncTokenToConversation(conversation);
    if (messageIsUnread(message)) {
      conversation.unreadMessages[message.id] = 1;
    } else if (conversation.unreadMessages[message.id]) {
      delete conversation.unreadMessages[message.id];
    }
    newConversationMap[conversationId] = conversation;
  };
  var pushMessageToConversations = function pushMessageToConversations(record) {
    var message = normalizeRecord((0, _removeUri2.default)(record));
    var index = newConversations.length;
    addMessageToConversationMap(message, index);
    var conversation = newConversationMap[message.conversationId];
    if (conversation) {
      message.unreadCounts = calcUnreadCount(conversation);
    } else {
      message.unreadCounts = 0;
    }
    newConversations.push(message);
  };
  var pushMessageToMessages = function pushMessageToMessages(record) {
    var message = normalizeRecord((0, _removeUri2.default)(record));
    newMessages.push(message);
    addMessageToMessageMap(message, newMessages.length - 1);
  };
  // TODO: delete message or conversation?
  var deleteMessageFromConversations = function deleteMessageFromConversations(index, record) {
    var message = newConversations[index];
    if (message.id === record.id) {
      var conversationMessages = newMessages.filter(function (oldMessage) {
        return oldMessage && oldMessage.id !== message.id && oldMessage.conversationId === message.conversationId;
      });
      if (conversationMessages.length === 0) {
        newConversations[index] = null;
        delete newConversationMap[record.conversation.id];
        return;
      }
      newConversations[index] = conversationMessages[conversationMessages.length - 1];
    }
    var conversation = newConversationMap[record.conversation.id];
    setSyncTokenToConversation(conversation);
    delete conversation.unreadMessages[record.id];
    message.unreadCounts = calcUnreadCount(conversation);
  };
  var deleteMessageFromMessages = function deleteMessageFromMessages(index, record) {
    newMessages[index] = null;
    delete messageMap[record.id];
  };
  var replaceMessageInConversations = function replaceMessageInConversations(index, record) {
    var oldConversation = newConversations[index];
    var newMessage = (0, _extends3.default)({}, oldConversation, normalizeRecord((0, _removeUri2.default)(record)));
    var oldCreated = new Date(oldConversation.creationTime);
    var newCreated = new Date(record.creationTime);
    if (newCreated >= oldCreated) {
      // move the message to the top of new Messages
      newConversations[index] = null;
      newConversations.push(newMessage);
      addMessageToConversationMap(newMessage, newConversations.length - 1);
    } else {
      addMessageToConversationMap(newMessage, index);
    }
    var conversation = newConversationMap[newMessage.conversationId];
    newMessage.unreadCounts = calcUnreadCount(conversation);
  };
  var replaceMessageInMessages = function replaceMessageInMessages(index, record) {
    newMessages[index] = normalizeRecord((0, _removeUri2.default)(record));
  };
  records.forEach(function (record) {
    if (!record.conversation) {
      return;
    }
    var existedIndexofMessages = findIndexOfMessages(messageMap, record);
    var existedIndexofConversations = findIndexOfConversations(newConversationMap, record);
    var isDeleted = messageHelper.messageIsDeleted(record);
    var isAcceptable = messageHelper.messageIsAcceptable(record);
    if (existedIndexofMessages > -1) {
      if (isDeleted) {
        deleteMessageFromMessages(existedIndexofMessages, record);
      } else {
        replaceMessageInMessages(existedIndexofMessages, record);
      }
    } else if (isAcceptable) {
      pushMessageToMessages(record);
    }
    if (existedIndexofConversations > -1) {
      if (isDeleted) {
        deleteMessageFromConversations(existedIndexofConversations, record);
      } else {
        replaceMessageInConversations(existedIndexofConversations, record);
      }
    } else if (isAcceptable) {
      pushMessageToConversations(record);
    }
  });
  var filteredConversation = filterNullFromConversations({
    conversations: newConversations,
    conversationMap: newConversationMap
  });
  return (0, _extends3.default)({}, filteredConversation, {
    messages: newMessages.filter(function (item) {
      return item !== null;
    })
  });
}

function updateConversationRecipients(_ref5) {
  var messages = _ref5.messages,
      conversations = _ref5.conversations,
      conversationMap = _ref5.conversationMap,
      conversationId = _ref5.conversationId,
      recipients = _ref5.recipients;

  var conversationIndex = conversationMap[conversationId] && conversationMap[conversationId].index;
  if (conversationIndex === undefined) {
    return { messages: messages, conversationMap: conversationMap, conversations: conversations };
  }
  var newConversations = [];
  conversations.forEach(function (conversation) {
    newConversations.push((0, _extends3.default)({}, conversation));
  });
  var conversation = newConversations[conversationIndex];
  conversation.recipients = recipients.map(function (recipient) {
    return (0, _extends3.default)({}, recipient);
  });
  return {
    messages: messages,
    conversationMap: conversationMap,
    conversations: newConversations
  };
}
//# sourceMappingURL=messageStoreHelper.js.map
