import { expect } from 'chai';
import getDataReducer, {
  getMessageDataReducer,
  getUpdatedTimestampReducer,
  getSyncTokenReducer,
  getSyncTimestampReducer,
} from './getDataReducer';

import actionTypes from './actionTypes';

describe('MessageStore :: Data :: getMessageDataReducer', () => {
  it('should be a function', () => {
    expect(getMessageDataReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getMessageDataReducer()).to.be.a('function');
  });
  describe('conversationsReducer', () => {
    const reducer = getMessageDataReducer(actionTypes);
    const initialConversationsDataState = {
      conversations: [],
      conversationMap: {},
      messages: [],
    };
    const record = {
      id: 1234568,
      direction: 'Inbound',
      conversation: {
        id: '1234567890'
      },
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
    const records = [record];
    it('should have empty object for initial state ', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialConversationsDataState);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it(`should return data with conversations, conversationMap and messages as key
        on syncSuccess, updateMessages, syncConversationSuccess,
        updateConversationRecipients`, () => {
      const originalState = initialConversationsDataState;
      [
        actionTypes.syncSuccess,
        actionTypes.updateMessages,
        actionTypes.syncConversationSuccess,
        actionTypes.updateConversationRecipients,
      ].forEach((type) => {
        expect(reducer(originalState, {
          type,
          records,
        })).to.include.keys('conversations', 'conversationMap', 'messages');
      });
    });

    it('should return new state correctly with on syncSuccess, updateMessages', () => {
      const originalState = initialConversationsDataState;
      [
        actionTypes.syncSuccess,
        actionTypes.updateMessages,
      ].forEach((type) => {
        expect(reducer(originalState, {
          type,
          records,
        })).to.deep.equal({
          conversations: [{ ...record, conversationId: '1234567890', unreadCounts: 1 }],
          messages: [{ ...record, conversationId: '1234567890' }],
          conversationMap: {
            1234567890: {
              id: '1234567890',
              index: 0,
              unreadMessages: { 1234568: 1 },
            }
          }
        });
      });
    });

    it('should return new state correctly with on syncConversationSuccess', () => {
      const originalState = initialConversationsDataState;
      [
        actionTypes.syncConversationSuccess,
      ].forEach((type) => {
        expect(reducer(originalState, {
          type,
          records,
          syncConversationId: '1234567890',
          syncToken: 'abcd'
        })).to.deep.equal({
          conversations: [{ ...record, conversationId: '1234567890', unreadCounts: 1 }],
          messages: [{ ...record, conversationId: '1234567890' }],
          conversationMap: {
            1234567890: {
              id: '1234567890',
              index: 0,
              unreadMessages: { 1234568: 1 },
              syncToken: 'abcd',
            }
          }
        });
      });
    });

    it('should return new state correctly on syncConversationSuccess', () => {
      const originalState = initialConversationsDataState;
      [
        actionTypes.syncConversationSuccess,
      ].forEach((type) => {
        expect(reducer(originalState, {
          type,
          records,
          syncConversationId: '1234567890',
          syncToken: 'abcd'
        })).to.deep.equal({
          conversations: [{ ...record, conversationId: '1234567890', unreadCounts: 1 }],
          messages: [{ ...record, conversationId: '1234567890' }],
          conversationMap: {
            1234567890: {
              id: '1234567890',
              index: 0,
              unreadMessages: { 1234568: 1 },
              syncToken: 'abcd',
            }
          }
        });
      });
    });

    it('should save recipients successfully on updateConversationRecipients', () => {
      const originalState = {
        messages: [],
        conversations: [{
          id: 123456,
        }],
        conversationMap: {
          12345: {
            id: '12345',
            index: 0,
          },
        }
      };
      [
        actionTypes.updateConversationRecipients,
      ].forEach((type) => {
        expect(reducer(originalState, {
          type,
          records,
          conversationId: '12345',
          recipients: [{ extensionNumber: '111' }]
        })).to.deep.equal({
          conversations: [{
            id: 123456,
            recipients: [{ extensionNumber: '111' }],
          }],
          messages: [],
          conversationMap: {
            12345: {
              id: '12345',
              index: 0,
            },
          }
        });
      });
    });
   it('should return new state correctly on removeMessage', () => {
      const originalState = {
        conversations: [{conversationId:'123456789'},{conversationId:'987654321'}],
        conversationMap: {
          123456789: {
            id: '123456789',
            index: 0,
            unreadMessages: { 1234568: 1 },
            syncToken: 'abcd',
          },987654321: {
            id: '987654321',
            index: 0,
            unreadMessages: { 1234568: 1 },
            syncToken: 'abcd',
          }
        },
        messages: [{id:'123456789'}, {id:'987654321'}],
      };
      expect(reducer(originalState, {
          type: actionTypes.removeMessage,
          conversationId: '123456789',
          messageId: '123456789',
        })).to.deep.equal({
          conversations: [{conversationId: '987654321'}], 
          conversationMap: {
            987654321: {
              id: '987654321',
              index: 0,
              unreadMessages: { 1234568: 1 },
              syncToken: 'abcd',
            }
          },
          messages: [{id: '987654321'}],
        });
    });

    it('should return empty object on cleanUp', () => {
      const originalState = {
        data: ['test'],
        timestamp: Date.now(),
      };
      expect(reducer(originalState, {
        type: actionTypes.cleanUp,
      })).to.deep.equal(initialConversationsDataState);
    });
  });
});

describe('MessageStore :: Data :: getUpdatedTimestampReducer', () => {
  it('should be a function', () => {
    expect(getUpdatedTimestampReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getUpdatedTimestampReducer()).to.be.a('function');
  });
  describe('updatedTimestampReducer', () => {
    const reducer = getUpdatedTimestampReducer(actionTypes);
    it('should have null for initial state ', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = 'test';
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it(`should return data on syncSuccess, syncConversationSuccess,
        updateConversationRecipients, updateMessages`, () => {
      [
        actionTypes.syncSuccess,
        actionTypes.syncConversationSuccess,
        actionTypes.updateConversationRecipients,
        actionTypes.updateMessages,
      ].forEach((type) => {
        const now = Date.now();
        expect(reducer(123, {
          type,
        })).to.be.at.least(now);
      });
    });

    it('should return empty object on cleanUp', () => {
      const originalState = 'test';
      expect(reducer(originalState, {
        type: actionTypes.cleanUp,
      })).to.equal(null);
    });
  });
});

describe('MessageStore :: Data :: getSyncTokenReducer', () => {
  it('should be a function', () => {
    expect(getSyncTokenReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getSyncTokenReducer()).to.be.a('function');
  });
  describe('syncTokenReducer', () => {
    const reducer = getSyncTokenReducer(actionTypes);
    it('should have null for initial state ', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = 'test';
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return data on syncSuccess', () => {
      const originalState = '12345678';
      expect(reducer(originalState, {
        type: actionTypes.syncSuccess,
        syncToken: '123',
      })).to.equal('123');
    });

    it('should return empty object on cleanUp', () => {
      const originalState = 'test';
      expect(reducer(originalState, {
        type: actionTypes.cleanUp,
      })).to.equal(null);
    });
  });
});

describe('MessageStore :: Data :: getSyncTimestampReducer', () => {
  it('should be a function', () => {
    expect(getSyncTimestampReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getSyncTimestampReducer()).to.be.a('function');
  });
  describe('syncTimestampReducer', () => {
    const reducer = getSyncTimestampReducer(actionTypes);
    it('should have null for initial state ', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = 'test';
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return data on syncSuccess', () => {
      const originalState = 12345678;
      expect(reducer(originalState, {
        type: actionTypes.syncSuccess,
        syncTimestamp: 123,
      })).to.equal(123);
    });

    it('should return empty object on cleanUp and ', () => {
      const originalState = 'test';
      expect(reducer(originalState, {
        type: actionTypes.cleanUp,
      })).to.equal(null);
    });
  });
});

describe('getDataReducer', () => {
  it('should be a function', () => {
    expect(getDataReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getDataReducer(actionTypes)).to.be.a('function');
  });
  describe('dataReducer', () => {
    const reducer = getDataReducer(actionTypes);
    const dataReducer = getMessageDataReducer(actionTypes);
    const updatedTimestampReducer = getUpdatedTimestampReducer(actionTypes);
    const syncTokenReducer = getSyncTokenReducer(actionTypes);
    const syncTimestampReducer = getSyncTimestampReducer(actionTypes);
    it('should return combined state', () => {
      expect(reducer(undefined, {}))
        .to.deep.equal({
          data: dataReducer(undefined, {}),
          updatedTimestamp: updatedTimestampReducer(undefined, {}),
          syncToken: syncTokenReducer(undefined, {}),
          syncTimestamp: syncTimestampReducer(undefined, {}),
        });
    });
  });
});
