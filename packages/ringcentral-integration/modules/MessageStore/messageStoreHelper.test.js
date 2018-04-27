import { expect } from 'chai';
import * as messageStoreHelper from './messageStoreHelper';

describe('MessageStore:: Helper :: normalizeRecord', () => {
  it('should return new object with conversationId key', () => {
    const record = { id: 123, conversation: { id: '123456' } };
    const result = messageStoreHelper.normalizeRecord(record);
    const expectResult = {
      id: 123,
      conversation: { id: '123456' },
      conversationId: '123456',
    };
    expect(result).to.deep.equal(expectResult);
    expect(result).to.not.equal(record);
  });
});

describe('MessageStore:: Helper :: messageIsUnread', () => {
  it('should return true is message is unread and Inbound', () => {
    const message = {
      direction: 'Inbound',
      readStatus: 'Unread',
      availability: 'Active',
    };
    const result = messageStoreHelper.messageIsUnread(message);
    expect(result).to.equal(true);
  });

  it('should return false is message is unread and Outbound', () => {
    const message = {
      direction: 'Outbound',
      readStatus: 'Unread',
      availability: 'Active',
    };
    const result = messageStoreHelper.messageIsUnread(message);
    expect(result).to.equal(false);
  });

  it('should return false is message is Read and Inbound', () => {
    const message = {
      direction: 'Inbound',
      readStatus: 'Read',
      availability: 'Active',
    };
    const result = messageStoreHelper.messageIsUnread(message);
    expect(result).to.equal(false);
  });

  it('should return false is message is deleted', () => {
    const message = {
      direction: 'Inbound',
      readStatus: 'Unread',
      availability: 'Deleted',
    };
    const result = messageStoreHelper.messageIsUnread(message);
    expect(result).to.equal(false);
  });
});

describe('MessageStore:: Helper :: getMessageSyncParams', () => {
  it('should return syncToken and syncType is ISync when syncToken exist', () => {
    const syncToken = 'aabbccdd';
    const conversationId = null;
    const result = messageStoreHelper.getMessageSyncParams({
      syncToken,
      conversationId,
    });
    expect(result).to.deep.equal({ syncToken, syncType: 'ISync' });
  });

  it('should return syncToken and syncType is ISync when syncToken exist', () => {
    const result = messageStoreHelper.getMessageSyncParams({});
    expect(result.syncType).to.equal('FSync');
    expect(Object.keys(result)).to.deep.equal(['syncType', 'dateFrom']);
  });

  it('should return params with conversationId when conversationId exist', () => {
    const conversationId = '12345678';
    const result = messageStoreHelper.getMessageSyncParams({ conversationId });
    expect(result.syncType).to.equal('FSync');
    expect(result.conversationId).to.equal('12345678');
    expect(Object.keys(result)).to.deep.equal([
      'syncType',
      'dateFrom',
      'conversationId'
    ]);
  });
});

describe('MessageStore:: Helper :: prepareNewMessagesData', () => {
  let messages;
  let conversations;
  let conversationMap;
  beforeEach(() => {
    messages = [{
      id: 12345,
      conversationId: '123456',
    }];
    conversations = [{
      id: 12345,
      conversationId: '123456',
    }];
    conversationMap = {};
    conversationMap['123456'] = {
      id: '123456',
      index: 0,
      unreadMessages: {},
    };
  });

  it(`should return new object of newConversations,
      newConversationMap, newMessages, messageMap`, () => {
    const {
      newConversations,
      newConversationMap,
      newMessages,
      messageMap
    } = messageStoreHelper.prepareNewMessagesData({
      messages,
      conversations,
      conversationMap,
    });
    expect(newConversations).to.deep.equal(conversations);
    expect(newConversationMap).to.deep.equal(conversationMap);
    expect(newMessages).to.deep.equal(newMessages);
    expect(messageMap).to.deep.equal({
      12345: 0,
    });
    expect(newConversations).to.not.equal(conversations);
    expect(newConversationMap).to.not.equal(conversationMap);
    expect(newMessages).to.not.equal(messages);
  });

  it('should set syncToken to conversationMap if syncToken existed', () => {
    const {
      newConversations,
      newConversationMap,
      newMessages,
      messageMap
    } = messageStoreHelper.prepareNewMessagesData({
      messages,
      conversations,
      conversationMap,
      syncToken: '123456789',
    });
    expect(newConversations).to.deep.equal(conversations);
    const expectConversationMap = {};
    expectConversationMap['123456'] = {
      id: '123456',
      index: 0,
      unreadMessages: {},
      syncToken: '123456789',
    };
    expect(newConversationMap).to.deep.equal(expectConversationMap);
    expect(newMessages).to.deep.equal(newMessages);
    expect(messageMap).to.deep.equal({
      12345: 0,
    });
  });

  it('should not set syncToken to conversationMap if syncConversationId is not found', () => {
    const {
      newConversations,
      newConversationMap,
      newMessages,
      messageMap
    } = messageStoreHelper.prepareNewMessagesData({
      messages,
      conversations,
      conversationMap,
      syncToken: '123456789',
      syncConversationId: '1234',
    });
    expect(newConversations).to.deep.equal(conversations);
    expect(newConversationMap).to.deep.equal(conversationMap);
    expect(newMessages).to.deep.equal(newMessages);
    expect(messageMap).to.deep.equal({
      12345: 0,
    });
  });

  it('should set syncToken to conversationMap if syncConversationId is same as id', () => {
    const {
      newConversations,
      newConversationMap,
      newMessages,
      messageMap
    } = messageStoreHelper.prepareNewMessagesData({
      messages,
      conversations,
      conversationMap,
      syncToken: '123456789',
      syncConversationId: '123456',
    });
    expect(newConversations).to.deep.equal(conversations);
    const expectConversationMap = {};
    expectConversationMap['123456'] = {
      id: '123456',
      index: 0,
      unreadMessages: {},
      syncToken: '123456789',
    };
    expect(newConversationMap).to.deep.equal(expectConversationMap);
    expect(newMessages).to.deep.equal(newMessages);
    expect(messageMap).to.deep.equal({
      12345: 0,
    });
  });

  it('should return empty object if input is empty', () => {
    messages = [];
    conversations = [];
    conversationMap = {};
    const {
      newConversations,
      newConversationMap,
      newMessages,
      messageMap
    } = messageStoreHelper.prepareNewMessagesData({
      messages,
      conversations,
      conversationMap,
    });
    expect(newConversations).to.deep.equal([]);
    expect(newConversationMap).to.deep.equal({});
    expect(newMessages).to.deep.equal([]);
    expect(messageMap).to.deep.equal({});
  });
});

describe('MessageStore:: Helper :: filterNullFromConversations', () => {
  it('should return new conversations and conversationMap without null item', () => {
    const conversations = [
      {
        id: 12345,
        conversationId: '123456',
      },
      null,
      {
        id: 123456,
        conversationId: '1234567',
      },
    ];
    const conversationMap = {};
    conversationMap['123456'] = {
      id: '123456',
      index: 0,
      unreadMessages: {},
    };
    conversationMap['1234567'] = {
      id: '1234567',
      index: 2,
      unreadMessages: {},
    };
    const expectConversationMap = {};
    expectConversationMap['123456'] = {
      id: '123456',
      index: 0,
      unreadMessages: {},
    };
    expectConversationMap['1234567'] = {
      id: '1234567',
      index: 1,
      unreadMessages: {},
    };
    const result = messageStoreHelper.filterNullFromConversations({
      conversations,
      conversationMap,
    });
    expect(result.conversations).to.deep.equal([
      {
        id: 12345,
        conversationId: '123456',
      },
      {
        id: 123456,
        conversationId: '1234567',
      },
    ]);
    expect(result.conversationMap).to.deep.equal(expectConversationMap);
  });
});

describe('MessageStore:: Helper :: findIndexOfConversations', () => {
  it('should return index of conversation in conversations correctly', () => {
    const conversationMap = {};
    conversationMap['123456'] = {
      id: '123456',
      index: 1,
      unreadMessages: {},
    };
    const record = {
      conversationId: '123456',
    };
    const result = messageStoreHelper.findIndexOfConversations(conversationMap, record);
    expect(result).to.equal(1);
  });

  it('should return -1 if record is not found', () => {
    const conversationMap = {};
    const record = {
      conversationId: '123456',
    };
    const result = messageStoreHelper.findIndexOfConversations(conversationMap, record);
    expect(result).to.equal(-1);
  });
});

describe('MessageStore:: Helper :: findIndexOfMessages', () => {
  it('should return index of record in messages correctly', () => {
    const messageMap = {};
    messageMap[123456] = 1;
    const record = {
      id: 123456,
    };
    const result = messageStoreHelper.findIndexOfMessages(messageMap, record);
    expect(result).to.equal(1);
  });

  it('should return -1 if record is not found', () => {
    const messageMap = {};
    const record = {
      id: 123456,
    };
    const result = messageStoreHelper.findIndexOfMessages(messageMap, record);
    expect(result).to.equal(-1);
  });
});

describe('MessageStore:: Helper :: calcUnreadCount', () => {
  it('should return unread counts correctly', () => {
    const conversation = {
      id: '123456',
      unreadMessages: { a: 1, b: 1 }
    };
    const result = messageStoreHelper.calcUnreadCount(conversation);
    expect(result).to.equal(2);
  });

  it('should return zero if unreadMessages message is empty', () => {
    const conversation = {
      id: '123456',
      unreadMessages: {}
    };
    const result = messageStoreHelper.calcUnreadCount(conversation);
    expect(result).to.equal(0);
  });
});

describe('MessageStore:: Helper :: updateConversationRecipients', () => {
  it('should return new conversations with conversation recipients updated', () => {
    const messages = [];
    const conversations = [{
      id: 123456,
    }];
    const conversationMap = {};
    conversationMap['12345'] = {
      id: '12345',
      index: 0,
    };
    const conversationId = '12345';
    const recipients = [{ extensionNumber: '111' }];
    const result = messageStoreHelper.updateConversationRecipients({
      messages,
      conversations,
      conversationMap,
      conversationId,
      recipients,
    });
    expect(result.conversations).to.deep.equal([{
      id: 123456,
      recipients: [{ extensionNumber: '111' }],
    }]);
  });

  it('should not update if conversationId is not exsited', () => {
    const messages = [];
    const conversations = [];
    const conversationMap = {};
    const conversationId = '12345';
    const recipients = [{ extensionNumber: '111' }];
    const result = messageStoreHelper.updateConversationRecipients({
      messages,
      conversations,
      conversationMap,
      conversationId,
      recipients,
    });
    expect(result.conversations).to.deep.equal(conversations);
  });
});

describe('MessageStore:: Helper :: pushRecordsToMessageData', () => {
  let messages;
  let conversations;
  let conversationMap;
  let record;
  let records;

  const fillRecordToOldData = () => {
    messages = [{ ...record, conversationId: '1234567890' }];
    conversations = [{ ...record, conversationId: '1234567890', unreadCounts: 1 }];
    conversationMap = {};
    conversationMap['1234567890'] = {
      id: '1234567890',
      index: 0,
      unreadMessages: { 1234568: 1 },
    };
  };

  beforeEach(() => {
    record = {
      id: 1234568,
      direction: 'Inbound',
      conversation: {
        id: '1234567890'
      },
      conversationId: '1234567890',
      type: 'SMS',
      subject: 'test1',
      availability: 'Alive',
      readStatus: 'Unread',
      creationTime: '2017-02-03T09:55:49.000Z',
      to: [{
        phoneNumber: '+1234567890',
      }],
      from: { phoneNumber: '+1234567891' },
    };
    records = [record];
  });
  it('should return new data when record is new one', () => {
    messages = [];
    conversations = [];
    conversationMap = {};
    const result = messageStoreHelper.pushRecordsToMessageData({
      messages,
      conversations,
      conversationMap,
      records,
      syncToken: 'abcd',
    });
    const expectMessage = { ...record, conversationId: '1234567890' };
    const expectConversation = { ...record, conversationId: '1234567890', unreadCounts: 1 };
    const expectConversationMap = {};
    expectConversationMap['1234567890'] = {
      id: '1234567890',
      index: 0,
      unreadMessages: { 1234568: 1 },
      syncToken: 'abcd',
    };
    expect(result.messages).to.deep.equal([expectMessage]);
    expect(result.conversations).to.deep.equal([expectConversation]);
    expect(result.conversationMap).to.deep.equal(expectConversationMap);
  });

  it('should update data when record is existed', () => {
    fillRecordToOldData();
    const newRecord = { ...record, readStatus: 'Read' };
    records = [newRecord];
    const result = messageStoreHelper.pushRecordsToMessageData({
      messages,
      conversations,
      conversationMap,
      records,
    });
    const expectMessage = { ...newRecord, conversationId: '1234567890' };
    const expectConversation = { ...newRecord, conversationId: '1234567890', unreadCounts: 0 };
    const expectConversationMap = {};
    expectConversationMap['1234567890'] = {
      id: '1234567890',
      index: 0,
      unreadMessages: {},
    };
    expect(result.messages).to.deep.equal([expectMessage]);
    expect(result.conversations).to.deep.equal([expectConversation]);
    expect(result.conversationMap).to.deep.equal(expectConversationMap);
  });

  it('should update data when record conversation is existed', () => {
    fillRecordToOldData();
    const newRecord = { ...record, id: 1234567 };
    records = [newRecord];
    const result = messageStoreHelper.pushRecordsToMessageData({
      messages,
      conversations,
      conversationMap,
      records,
    });
    const expectMessages = [
      { ...record, conversationId: '1234567890' },
      { ...newRecord, conversationId: '1234567890' },
    ];
    const expectConversation = { ...newRecord, conversationId: '1234567890', unreadCounts: 2 };
    const expectConversationMap = {};
    expectConversationMap['1234567890'] = {
      id: '1234567890',
      index: 0,
      unreadMessages: { 1234568: 1, 1234567: 1 },
    };
    expect(result.messages).to.deep.equal(expectMessages);
    expect(result.conversations).to.deep.equal([expectConversation]);
    expect(result.conversationMap).to.deep.equal(expectConversationMap);
  });

  it('should update conversations if records include a new one and a existed conversation', () => {
    fillRecordToOldData();
    const newConversationRecord = { ...record, id: 1234567, conversation: { id: '1234567891' } };
    const newRecord = { ...record, readStatus: 'Read' };
    records = [newConversationRecord, newRecord];
    const result = messageStoreHelper.pushRecordsToMessageData({
      messages,
      conversations,
      conversationMap,
      records,
    });
    const expectMessages = [
      { ...newRecord, conversationId: '1234567890' },
      { ...newConversationRecord, conversationId: '1234567891' },
    ];
    const expectConversations = [
      { ...newConversationRecord, conversationId: '1234567891', unreadCounts: 1 },
      { ...newRecord, conversationId: '1234567890', unreadCounts: 0 }
    ];
    const expectConversationMap = {};
    expectConversationMap['1234567890'] = {
      id: '1234567890',
      index: 1,
      unreadMessages: {},
    };
    expectConversationMap['1234567891'] = {
      id: '1234567891',
      index: 0,
      unreadMessages: { 1234567: 1 },
    };
    expect(result.messages).to.deep.equal(expectMessages);
    expect(result.conversations).to.deep.equal(expectConversations);
    expect(result.conversationMap).to.deep.equal(expectConversationMap);
  });

  it('should save syncToken to converationMap if syncToken and syncConversationId existed', () => {
    messages = [];
    conversations = [];
    conversationMap = {};
    const result = messageStoreHelper.pushRecordsToMessageData({
      messages,
      conversations,
      conversationMap,
      records,
      syncToken: 'abcde',
      syncConversationId: '1234567890',
    });
    const expectMessage = { ...record, conversationId: '1234567890' };
    const expectConversation = { ...record, conversationId: '1234567890', unreadCounts: 1 };
    const expectConversationMap = {};
    expectConversationMap['1234567890'] = {
      id: '1234567890',
      index: 0,
      unreadMessages: { 1234568: 1 },
      syncToken: 'abcde',
    };
    expect(result.messages).to.deep.equal([expectMessage]);
    expect(result.conversations).to.deep.equal([expectConversation]);
    expect(result.conversationMap).to.deep.equal(expectConversationMap);
  });
});
