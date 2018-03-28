import * as messageHelper from '../../lib/messageHelper';
import removeUri from '../../lib/removeUri';
import syncTypes from '../../enums/syncTypes';

export function normalizeRecord(record) {
  return {
    ...record,
    conversationId: `${(record.conversation && record.conversation.id) || record.id}`,
  };
}

export function messageIsUnread(message) {
  return (
    message.direction === 'Inbound' &&
    message.readStatus !== 'Read' &&
    !(messageHelper.messageIsDeleted(message))
  );
}

export function getMessageSyncParams({
  syncToken,
  conversationId,
  dateTo,
  daySpan = 7,
}) {
  if (syncToken) {
    return {
      syncToken,
      syncType: syncTypes.iSync,
    };
  }
  const lastSevenDate = new Date();
  lastSevenDate.setDate(lastSevenDate.getDate() - daySpan);
  const params = {
    syncType: syncTypes.fSync,
    dateFrom: lastSevenDate.toISOString(),
  };
  if (dateTo) {
    params.dateTo = new Date(dateTo).toISOString();
  }
  if (conversationId) {
    params.conversationId = conversationId;
  }
  return params;
}

export function prepareNewMessagesData({
  messages,
  conversations,
  conversationMap,
  syncToken,
  syncConversationId,
}) {
  const newConversations = [];
  const newConversationMap = {};
  const newMessages = [];
  const messageMap = {};
  // copy old conversationMap to new conversationMap hash
  Object.keys(conversationMap).forEach((key) => {
    const conversation = {
      ...conversationMap[key],
      unreadMessages: {
        ...conversationMap[key].unreadMessages,
      },
    };
    // if converstation is not sync with conversation Id, update all conversation sync token
    if (syncToken && (!syncConversationId || syncConversationId === key)) {
      conversation.syncToken = syncToken;
    }
    newConversationMap[key] = conversation;
  });
  // copy old conversations to new conversations array
  conversations.forEach((conversation) => {
    newConversations.push({ ...conversation });
  });
  messages.forEach((message) => {
    if (message.availability !== 'Purged') {
      newMessages.push({ ...message });
      messageMap[message.id] = newMessages.length - 1;
    }
  });
  return {
    newConversations,
    newConversationMap,
    newMessages,
    messageMap,
  };
}

export function filterNullFromConversations({
  conversations,
  conversationMap,
}) {
  const newConversations = [];
  // copy old conversationMap to new conversationMap hash
  // copy old conversations to new conversations array
  conversations.forEach((conversation) => {
    if (!conversation) {
      return;
    }
    newConversations.push({ ...conversation });
    conversationMap[conversation.conversationId].index = newConversations.length - 1;
  });
  return {
    conversations: newConversations,
    conversationMap,
  };
}

export function findIndexOfConversations(newConversationMap, { conversationId }) {
  if (!conversationId) {
    return -1;
  }
  const existedIndex =
    newConversationMap[conversationId] &&
    newConversationMap[conversationId].index;
  if (existedIndex !== undefined && existedIndex !== null) {
    return existedIndex;
  }
  return -1;
}

export function findIndexOfMessages(messageMap, message) {
  if (messageMap[message.id] !== undefined) {
    return messageMap[message.id];
  }
  return -1;
}

export function calcUnreadCount(conversation) {
  return Object.keys(conversation.unreadMessages).length;
}

export function pushRecordsToMessageData({
  messages,
  conversations,
  conversationMap,
  records,
  syncToken,
  syncConversationId,
}) {
  const {
    newConversations,
    newConversationMap,
    newMessages,
    messageMap,
  } = prepareNewMessagesData({
    messages,
    conversations,
    conversationMap,
    syncToken,
    syncConversationId,
  });
  const addMessageToMessageMap = (message, index) => {
    messageMap[message.id] = index;
  };
  const setSyncTokenToConversation = (conversation) => {
    if (
      syncToken &&
      (
        !syncConversationId ||
        (syncConversationId && syncConversationId === conversation.id)
      )
    ) {
      conversation.syncToken = syncToken;
    }
  };
  const addMessageToConversationMap = (message, index) => {
    const { conversationId } = message;
    const conversation = newConversationMap[conversationId] || { unreadMessages: {} };
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
  const pushMessageToConversations = (message) => {
    const newConversation = { ...message };
    const index = newConversations.length;
    addMessageToConversationMap(newConversation, index);
    const conversation = newConversationMap[newConversation.conversationId];
    if (conversation) {
      newConversation.unreadCounts = calcUnreadCount(conversation);
    } else {
      newConversation.unreadCounts = 0;
    }
    newConversations.push(newConversation);
  };
  const pushMessageToMessages = (message) => {
    const newMessage = { ...message };
    newMessages.push(newMessage);
    addMessageToMessageMap(newMessage, newMessages.length - 1);
  };
  // TODO: delete message or conversation?
  const deleteMessageFromConversations = (index, record) => {
    const message = newConversations[index];
    if (message.id === record.id) {
      const conversationMessages = newMessages.filter(oldMessage => (
        oldMessage && oldMessage.id !== message.id &&
          oldMessage.conversationId === message.conversationId
      ));
      if (conversationMessages.length === 0) {
        newConversations[index] = null;
        delete newConversationMap[record.conversationId];
        return;
      }
      newConversations[index] = conversationMessages[conversationMessages.length - 1];
    }
    const conversation = newConversationMap[record.conversationId];
    setSyncTokenToConversation(conversation);
    delete conversation.unreadMessages[record.id];
    message.unreadCounts = calcUnreadCount(conversation);
  };
  const deleteMessageFromMessages = (index, message) => {
    newMessages[index] = null;
    delete messageMap[message.id];
  };
  const replaceMessageInConversations = (index, message) => {
    const oldConversation = newConversations[index];
    const newMessage = {
      ...oldConversation,
      ...message,
    };
    const oldCreated = new Date(oldConversation.creationTime);
    const newCreated = new Date(message.creationTime);
    if (newCreated >= oldCreated) {
      // move the message to the top of new Messages
      newConversations[index] = null;
      newConversations.push(newMessage);
      addMessageToConversationMap(newMessage, newConversations.length - 1);
    } else {
      addMessageToConversationMap(newMessage, index);
    }
    const conversation = newConversationMap[newMessage.conversationId];
    newMessage.unreadCounts = calcUnreadCount(conversation);
  };
  const replaceMessageInMessages = (index, message) => {
    newMessages[index] = { ...message };
  };
  records.forEach((record) => {
    if (!record) {
      return;
    }
    const message = normalizeRecord(removeUri(record));
    const existedIndexofMessages = findIndexOfMessages(messageMap, message);
    const existedIndexofConversations = findIndexOfConversations(newConversationMap, message);
    const isDeleted = messageHelper.messageIsDeleted(message);
    const isTextMessage = messageHelper.messageIsTextMessage(message);
    const isAcceptable = messageHelper.messageIsAcceptable(message);
    if (existedIndexofMessages > -1) {
      if (isDeleted) {
        deleteMessageFromMessages(existedIndexofMessages, message);
      } else {
        replaceMessageInMessages(existedIndexofMessages, message);
      }
    } else if (isAcceptable && isTextMessage) {
      pushMessageToMessages(message);
    }
    if (existedIndexofConversations > -1) {
      if (isDeleted) {
        deleteMessageFromConversations(existedIndexofConversations, message);
      } else {
        replaceMessageInConversations(existedIndexofConversations, message);
      }
    } else if (isAcceptable) {
      pushMessageToConversations(message);
    }
  });
  const filteredConversation = filterNullFromConversations({
    conversations: newConversations,
    conversationMap: newConversationMap,
  });
  return {
    ...filteredConversation,
    messages: newMessages.filter(item => (item !== null)),
  };
}

export function updateConversationRecipients({
  messages,
  conversations,
  conversationMap,
  conversationId,
  recipients,
}) {
  const conversationIndex =
    conversationMap[conversationId] && conversationMap[conversationId].index;
  if (conversationIndex === undefined) {
    return { messages, conversationMap, conversations };
  }
  const newConversations = [];
  conversations.forEach((conversation) => {
    newConversations.push({ ...conversation });
  });
  const conversation = newConversations[conversationIndex];
  conversation.recipients = recipients.map(recipient => ({ ...recipient }));
  return {
    messages,
    conversationMap,
    conversations: newConversations,
  };
}
