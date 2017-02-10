'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushMessageToConversationMessages = pushMessageToConversationMessages;
exports.pushMessageToMesages = pushMessageToMesages;
exports.getNewConversationsAndMessagesFromRecords = getNewConversationsAndMessagesFromRecords;
exports.filterConversationUnreadMessages = filterConversationUnreadMessages;
exports.updateMessagesUnreadCounts = updateMessagesUnreadCounts;
exports.getMessageSyncParams = getMessageSyncParams;

var _messageHelper = require('../../lib/messageHelper');

var messageHelper = _interopRequireWildcard(_messageHelper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function pushOrReplaceOrDeleteMessage(_ref) {
  var messages = _ref.messages,
      message = _ref.message,
      isFind = _ref.isFind,
      replaceMessage = _ref.replaceMessage,
      pushMessage = _ref.pushMessage,
      deleteMessage = _ref.deleteMessage;

  var messageLength = messages.length;
  var messageExistIndex = null;
  if (messageLength > 0) {
    for (var index = messageLength - 1; index >= 0; index -= 1) {
      if (isFind({
        oldMessage: messages[index],
        newMessage: message
      })) {
        messageExistIndex = index;
        break;
      }
    }
  }
  if (messageExistIndex === null) {
    if (messageHelper.messageIsAcceptable(message)) {
      pushMessage(message);
    }
    return;
  }
  if (messageHelper.messageIsDeleted(message)) {
    if (messages[messageExistIndex].id === message.id) {
      deleteMessage(messageExistIndex);
    }
    return;
  }
  replaceMessage({ index: messageExistIndex, newMessage: message });
}

function pushMessageToConversationMessages(_ref2) {
  var messages = _ref2.messages,
      message = _ref2.message;

  var isFind = function isFind(_ref3) {
    var oldMessage = _ref3.oldMessage,
        newMessage = _ref3.newMessage;
    return oldMessage.id === newMessage.id;
  };
  var replaceMessage = function replaceMessage(_ref4) {
    var index = _ref4.index,
        newMessage = _ref4.newMessage;

    messages[index] = newMessage;
  };
  var pushMessage = function pushMessage(newMessage) {
    messages.push(newMessage);
  };
  var deleteMessage = function deleteMessage(index) {
    messages.splice(index, 1);
  };
  pushOrReplaceOrDeleteMessage({
    messages: messages,
    message: message,
    isFind: isFind,
    replaceMessage: replaceMessage,
    pushMessage: pushMessage,
    deleteMessage: deleteMessage
  });
  return messages;
}

function pushMessageToMesages(_ref5) {
  var messages = _ref5.messages,
      message = _ref5.message;

  var isFind = function isFind(_ref6) {
    var oldMessage = _ref6.oldMessage,
        newMessage = _ref6.newMessage;
    return oldMessage.id === newMessage.id || oldMessage.conversation.id === newMessage.conversation.id;
  };
  var replaceMessage = function replaceMessage(_ref7) {
    var index = _ref7.index,
        newMessage = _ref7.newMessage;

    var oldCreated = new Date(messages[index].creationTime);
    var newCreated = new Date(message.creationTime);
    if (newCreated >= oldCreated) {
      messages.splice(index, 1);
      messages.push(newMessage);
    }
  };
  var pushMessage = function pushMessage(newMessage) {
    messages.push(newMessage);
  };
  var deleteMessage = function deleteMessage(index) {
    messages.splice(index, 1);
  };

  pushOrReplaceOrDeleteMessage({
    messages: messages,
    message: message,
    isFind: isFind,
    replaceMessage: replaceMessage,
    pushMessage: pushMessage,
    deleteMessage: deleteMessage
  });
  return messages;
}

function getNewConversationsAndMessagesFromRecords(_ref8) {
  var records = _ref8.records,
      syncToken = _ref8.syncToken,
      conversations = _ref8.conversations,
      messages = _ref8.messages;

  records.forEach(function (record) {
    if (!messageHelper.messaageIsTextMessage(record)) {
      return;
    }
    var conversationId = record.conversation.id;
    var conversation = conversations[conversationId];
    if (!conversation) {
      conversation = { messages: [] };
    }
    var oldMessages = conversation.messages;
    conversation.messages = pushMessageToConversationMessages({
      messages: oldMessages,
      message: record
    });
    if (syncToken) {
      conversation.syncToken = syncToken;
    }
    conversation.id = conversationId;
    conversations[conversationId] = conversation;
    messages = pushMessageToMesages({
      messages: messages,
      message: record
    });
  });
  return { conversations: conversations, messages: messages };
}

function filterConversationUnreadMessages(conversation) {
  var unReadMessages = conversation.messages.filter(function (record) {
    return record.direction === 'Inbound' && !messageHelper.messageIsDeleted(record) && record.readStatus !== 'Read';
  });
  return unReadMessages;
}

function updateMessagesUnreadCounts(messages, conversations) {
  var totalUnreadCounts = 0;
  for (var index = 0; index < messages.length; index += 1) {
    var message = messages[index];
    var conversation = conversations[message.conversation.id];
    var unReadMessages = filterConversationUnreadMessages(conversation);
    totalUnreadCounts += unReadMessages.length;
    message.isRead = unReadMessages.length === 0;
  }
  return {
    messages: messages,
    unreadCounts: totalUnreadCounts
  };
}

function getMessageSyncParams(_ref9) {
  var syncToken = _ref9.syncToken,
      conversationId = _ref9.conversationId;

  if (syncToken) {
    return {
      syncToken: syncToken,
      syncType: 'ISync'
    };
  }
  var lastSevenDate = new Date();
  lastSevenDate.setDate(lastSevenDate.getDate() - 7);
  var params = {
    syncType: 'FSync',
    dateFrom: lastSevenDate.toISOString()
  };
  if (conversationId) {
    params.conversationId = conversationId;
  }
  return params;
}
//# sourceMappingURL=messageStoreHelper.js.map
