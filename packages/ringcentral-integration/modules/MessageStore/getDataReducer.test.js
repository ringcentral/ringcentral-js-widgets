import { expect } from 'chai';
import actionTypes from './actionTypes';
import {
  getConversationListReducer,
  getConversationStoreReducer,
  getTimestampReducer,
  getSyncInfoReducer,
} from './getDataReducer';

import { normalizeRecord } from '../../lib/messageHelper';

const recordTemplate = `{
  "uri": "https://platform.ringcentral.com/restapi/v1.0/account/208594004/extension/208594004/message-store/5475922005",
  "id": 5475922005,
  "to": [
    {
      "extensionNumber": "101",
      "name": "Something1 New1"
    }
  ],
  "from": {
    "extensionNumber": "101",
    "name": "Something1 New1"
  },
  "type": "Pager",
  "creationTime": "2017-06-01T02:24:02.000Z",
  "readStatus": "Unread",
  "priority": "Normal",
  "attachments": [
    {
      "id": 5475922005,
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/208594004/extension/208594004/message-store/5475922005/content/5475922005",
      "type": "Text",
      "contentType": "text/plain"
    }
  ],
  "direction": "Inbound",
  "availability": "Alive",
  "subject": "test 2",
  "messageStatus": "Sent",
  "conversationId": 6015823250778200202,
  "conversation": {
    "id": "6015823250778200202",
    "uri": "https://platform.ringcentral.com/restapi/v1.0/conversation/6015823250778200202"
  },
  "lastModifiedTime": "2017-06-01T02:24:08.238Z",
  "pgToDepartment": false
}`;

describe('MessageStore: getConversationListReducer', () => {
  it('should be a function', () => {
    expect(getConversationListReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getConversationListReducer()).to.be.a('function');
  });
  describe('conversationListReducer', () => {
    const reducer = getConversationListReducer(actionTypes);

    it('should have initial state of []', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return empty array when records is empty with conversationsFSyncSuccess', () => {
      expect(reducer([{}], {
        type: actionTypes.conversationsFSyncSuccess,
        records: [],
      })).to.deep.equal([]);
    });
    it('should return original state when records is empty with conversationsISyncSuccess and updateMessages', () => {
      [
        actionTypes.conversationsISyncSuccess,
        actionTypes.updateMessages
      ].forEach((type) => {
        expect(reducer([{}], {
          type,
          records: [],
        })).to.deep.equal([{}]);
      });
    });
    it('should return conversation list when conversationsFSyncSuccess', () => {
      const record = JSON.parse(recordTemplate);
      const message = normalizeRecord(record);
      expect(reducer([], {
        type: actionTypes.conversationsFSyncSuccess,
        records: [record],
      })).to.deep.equal([{
        id: message.conversationId,
        creationTime: message.creationTime,
        type: message.type,
        messageId: message.id,
      }]);
    });
    it('should return new conversation list without old data when conversationsFSyncSuccess', () => {
      const record = JSON.parse(recordTemplate);
      const message = normalizeRecord(record);
      expect(reducer([{}], {
        type: actionTypes.conversationsFSyncSuccess,
        records: [record],
      })).to.deep.equal([{
        id: message.conversationId,
        creationTime: message.creationTime,
        type: message.type,
        messageId: message.id,
      }]);
    });
    it('should return new conversation with new message when conversationsISyncSuccess and updateMessages', () => {
      [
        actionTypes.conversationsISyncSuccess,
        actionTypes.updateMessages
      ].forEach((type) => {
        const record = JSON.parse(recordTemplate);
        const oldMessage = normalizeRecord(record);
        const oldConversation = {
          id: oldMessage.conversationId,
          creationTime: oldMessage.creationTime,
          type: oldMessage.type,
          messageId: oldMessage.id,
        };
        const newRecord = JSON.parse(recordTemplate);
        newRecord.messageId = 5475922006;
        newRecord.creationTime = '2017-06-02T02:24:02.000Z';
        const newMessage = normalizeRecord(newRecord);
        expect(reducer([oldConversation], {
          type,
          records: [newRecord],
        })).to.deep.equal([{
          id: newMessage.conversationId,
          creationTime: newMessage.creationTime,
          type: newMessage.type,
          messageId: newMessage.id,
        }]);
      });
    });

    it('should return original conversation when conversationsISyncSuccess and updateMessages with old message', () => {
      [
        actionTypes.conversationsISyncSuccess,
        actionTypes.updateMessages
      ].forEach((type) => {
        const record = JSON.parse(recordTemplate);
        const oldMessage = normalizeRecord(record);
        const oldConversation = {
          id: oldMessage.conversationId,
          creationTime: oldMessage.creationTime,
          type: oldMessage.type,
          messageId: oldMessage.id,
        };
        const newRecord = JSON.parse(recordTemplate);
        newRecord.messageId = 5475922006;
        newRecord.creationTime = '2017-06-01T01:24:02.000Z';
        expect(reducer([oldConversation], {
          type,
          records: [newRecord],
        })).to.deep.equal([oldConversation]);
      });
    });

    it('should delete conversation when conversationsISyncSuccess and updateMessages with current message deleted', () => {
      [
        actionTypes.conversationsISyncSuccess,
        actionTypes.updateMessages
      ].forEach((type) => {
        const record = JSON.parse(recordTemplate);
        const oldMessage = normalizeRecord(record);
        const oldConversation = {
          id: oldMessage.conversationId,
          creationTime: oldMessage.creationTime,
          type: oldMessage.type,
          messageId: oldMessage.id,
        };
        const newRecord = JSON.parse(recordTemplate);
        newRecord.availability = 'Deleted';
        expect(reducer([oldConversation], {
          type,
          records: [newRecord],
          conversationStore: {}
        })).to.deep.equal([]);
      });
    });

    it('should delete conversation when deleteConversation', () => {
      const record = JSON.parse(recordTemplate);
      const oldMessage = normalizeRecord(record);
      const oldConversation = {
        id: oldMessage.conversationId,
        creationTime: oldMessage.creationTime,
        type: oldMessage.type,
        messageId: oldMessage.id,
      };
      expect(reducer([oldConversation], {
        type: actionTypes.deleteConversation,
        conversationId: oldMessage.conversationId,
      })).to.deep.equal([]);
    });

    it('should return [] when resetSuccess', () => {
      expect(reducer([{}], {
        type: actionTypes.resetSuccess,
      })).to.deep.equal([]);
    });
  });
});


describe('MessageStore: getConversationStoreReducer', () => {
  it('should be a function', () => {
    expect(getConversationStoreReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getConversationStoreReducer()).to.be.a('function');
  });

  describe('conversationStoreReducer', () => {
    const reducer = getConversationStoreReducer(actionTypes);

    it('should return {} when resetSuccess', () => {
      expect(reducer({ a: {} }, {
        type: actionTypes.resetSuccess,
      })).to.deep.equal({});
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should have initial state of {}', () => {
      expect(reducer(undefined, {})).to.deep.equal({});
    });

    it('should delete conversation data when deleteConversation', () => {
      expect(reducer({ 123: {} }, {
        type: actionTypes.deleteConversation,
        conversationId: 123,
      })).to.deep.equal({});
    });

    it('should return empty object when conversationsFSyncSuccess with empty records', () => {
      expect(reducer({ 123: {} }, {
        type: actionTypes.conversationsFSyncSuccess,
        records: []
      })).to.deep.equal({});
    });

    it('should return messages list in object when conversationsFSyncSuccess', () => {
      const record = JSON.parse(recordTemplate);
      const message = normalizeRecord(record);
      expect(reducer({}, {
        type: actionTypes.conversationsFSyncSuccess,
        records: [record],
      })).to.deep.equal({
        [message.conversationId]: [message]
      });
    });

    it('should return messages list in object with other conversation in object when conversationsISyncSuccess and updateMessages', () => {
      const record = JSON.parse(recordTemplate);
      const message = normalizeRecord(record);
      [
        actionTypes.conversationsISyncSuccess,
        actionTypes.updateMessages,
      ].forEach((type) => {
        expect(reducer({ 123: [] }, {
          type,
          records: [record],
        })).to.deep.equal({
          123: [],
          [message.conversationId]: [message]
        });
      });
    });

    it('should update message when old message existed when conversationsISyncSuccess and updateMessages', () => {
      [
        actionTypes.conversationsISyncSuccess,
        actionTypes.updateMessages,
      ].forEach((type) => {
        const oldRecord = JSON.parse(recordTemplate);
        const oldMessage = normalizeRecord(oldRecord);
        const newRecord = JSON.parse(recordTemplate);
        newRecord.lastModifiedTime = '2017-06-02T02:24:08.238Z';
        const newMessage = normalizeRecord(newRecord);
        expect(
          reducer({ [oldMessage.conversationId]: [oldMessage] }, {
            type,
            records: [newRecord],
          })
        ).to.deep.equal({
          [newMessage.conversationId]: [newMessage]
        });
      });
    });

    it('should push message to message list when conversationsISyncSuccess and updateMessages', () => {
      [
        actionTypes.conversationsISyncSuccess,
        actionTypes.updateMessages,
      ].forEach((type) => {
        const oldRecord = JSON.parse(recordTemplate);
        const oldMessage = normalizeRecord(oldRecord);
        const newRecord = JSON.parse(recordTemplate);
        newRecord.id = 123456;
        newRecord.creationTime = '2017-06-02T02:24:08.238Z';
        const newMessage = normalizeRecord(newRecord);
        expect(reducer({ [oldMessage.conversationId]: [oldMessage] }, {
          type,
          records: [newRecord],
        })).to.deep.equal({
          [newMessage.conversationId]: [newMessage, oldMessage]
        });
      });
    });

    it('should delete message when record is deleted on conversationsISyncSuccess and updateMessages', () => {
      [
        actionTypes.conversationsISyncSuccess,
        actionTypes.updateMessages,
      ].forEach((type) => {
        const oldRecord = JSON.parse(recordTemplate);
        const oldMessage = normalizeRecord(oldRecord);
        const newRecord = JSON.parse(recordTemplate);
        newRecord.lastModifiedTime = '2017-06-02T02:24:08.238Z';
        newRecord.availability = 'Deleted';
        expect(
          reducer({ [oldMessage.conversationId]: [oldMessage] }, {
            type,
            records: [newRecord],
          })
        ).to.deep.equal({});
      });
    });

    it('should delete conversation object when deleteConversation', () => {
      const oldRecord = JSON.parse(recordTemplate);
      const oldMessage = normalizeRecord(oldRecord);
      expect(reducer({ [oldMessage.conversationId]: [oldMessage] }, {
        type: actionTypes.deleteConversation,
        conversationId: oldMessage.conversationId,
      })).to.deep.equal({});
    });
  });
});

describe('MessageStore: :: getTimestampReducer', () => {
  it('getTimestampReducer should be a function', () => {
    expect(getTimestampReducer).to.be.a('function');
  });
  it('getTimestampReducer should return a reducer', () => {
    expect(getTimestampReducer()).to.be.a('function');
  });
  describe('timestampReducer', () => {
    const reducer = getTimestampReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return timestamp on conversationsFSyncSuccess and conversationsISyncSuccess', () => {
      [
        actionTypes.conversationsISyncSuccess,
        actionTypes.conversationsFSyncSuccess,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
          timestamp: 12345678
        })).to.equal(12345678);
      });
    });
    it('should return null on resetSuccess', () => {
      expect(reducer('foo', {
        type: actionTypes.resetSuccess,
      })).to.equal(null);
    });
  });
});

describe('MessageStore: :: getSyncInfoReducer', () => {
  it('getSyncInfoReducer should be a function', () => {
    expect(getSyncInfoReducer).to.be.a('function');
  });
  it('getSyncInfoReducer should return a reducer', () => {
    expect(getSyncInfoReducer()).to.be.a('function');
  });
  describe('syncInfoReducer', () => {
    const reducer = getSyncInfoReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return syncInfo on conversationsFSyncSuccess and conversationsISyncSuccess', () => {
      [
        actionTypes.conversationsISyncSuccess,
        actionTypes.conversationsFSyncSuccess,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
          syncInfo: {}
        })).to.deep.equal({});
      });
    });
    it('should return null on resetSuccess', () => {
      expect(reducer('foo', {
        type: actionTypes.resetSuccess,
      })).to.equal(null);
    });
  });
});
