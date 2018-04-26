import {expect} from 'chai';
import {
  getConversationStatusReducer,
  getConversationIdReducer,
  getMessagesReducer,
  getSenderNumberReducer,
  getRecipientsReducer,
  getMessageStoreUpdatedAtReducer,
  getMessageTextsReducer
} from './getConversationReducer';

import actionTypes from './actionTypes';
import conversationStatus from './conversationStatus';

describe('Conversation :: getConversationStatusReducer', () => {
  it('getConversationStatusReducer should be a function', () => {
    expect(getConversationStatusReducer).to.be.a('function');
  });
  it('getConversationStatusReducer should return a reducer', () => {
    expect(getConversationStatusReducer()).to.be.a('function');
  });
  describe('statusReducer', () => {
    const reducer = getConversationStatusReducer(actionTypes);
    it('should have initial state of pending', () => {
      expect(reducer(undefined, {})).to.equal(conversationStatus.idle);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, {type: 'foo'}))
        .to.equal(originalState);
    });
    it('should return pushing status on reply', () => {
      [
        actionTypes.reply
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(conversationStatus.pushing);
      });
    });
    it('should return idle status on reply error and reply success', () => {
      [
        actionTypes.replySuccess,
        actionTypes.replyError,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(conversationStatus.idle);
      });
    });
  });
});

describe('Conversation :: getConversationIdReducer', () => {
  it('getConversationIdReducer should be a function', () => {
    expect(getConversationIdReducer).to.be.a('function');
  });
  it('getConversationIdReducer should return a reducer', () => {
    expect(getConversationIdReducer()).to.be.a('function');
  });
  describe('conversationIdReducer', () => {
    const reducer = getConversationIdReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, {type: 'foo'}))
        .to.equal(originalState);
    });
    it('should return conversationId on load', () => {
      [
        actionTypes.load,
      ].forEach((type) => {
        const conversationId = '1234567890';
        expect(reducer('foo', {
          type,
          conversationId
        })).to.equal(conversationId);
      });
    });
    it('should return null on unload', () => {
      [
        actionTypes.unload,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(null);
      });
    });
  });
});

describe('Conversation :: getSenderNumberReducer', () => {
  it('getSenderNumberReducer should be a function', () => {
    expect(getSenderNumberReducer).to.be.a('function');
  });
  it('getSenderNumberReducer should return a reducer', () => {
    expect(getSenderNumberReducer()).to.be.a('function');
  });
  describe('senderNumberReducer', () => {
    const reducer = getSenderNumberReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, {type: 'foo'}))
        .to.equal(originalState);
    });
    it('should return sender number object on load', () => {
      [
        actionTypes.load,
      ].forEach((type) => {
        const senderNumber = {
          phone: '1234567890',
        };
        expect(reducer('foo', {
          type,
          senderNumber
        })).to.deep.equal(senderNumber);
      });
    });
    it('should return null on unload', () => {
      [
        actionTypes.unload,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(null);
      });
    });
  });
});

describe('Conversation :: getRecipientsReducer', () => {
  it('getRecipientsReducer should be a function', () => {
    expect(getRecipientsReducer).to.be.a('function');
  });
  it('getRecipientsReducer should return a reducer', () => {
    expect(getRecipientsReducer()).to.be.a('function');
  });
  describe('recipientsReducer', () => {
    const reducer = getRecipientsReducer(actionTypes);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, {type: 'foo'}))
        .to.equal(originalState);
    });
    it('should return toNumber array on updateRecipients and load', () => {
      [
        actionTypes.updateRecipients,
        actionTypes.load,
      ].forEach((type) => {
        const recipients = [{
          name: '1234567890',
        }];
        expect(reducer('foo', {
          type,
          recipients
        })).to.deep.equal(recipients);
      });
    });
    it('should return null on unload', () => {
      [
        actionTypes.unload,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.deep.equal([]);
      });
    });
  });
});

describe('Conversation :: getMessagesReducer', () => {
  it('getMessagesReducer should be a function', () => {
    expect(getMessagesReducer).to.be.a('function');
  });
  it('getMessagesReducer should return a reducer', () => {
    expect(getMessagesReducer()).to.be.a('function');
  });
  describe('messagesReducer', () => {
    const reducer = getMessagesReducer(actionTypes);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, {type: 'foo'}))
        .to.equal(originalState);
    });
    it('should return messages array on load', () => {
      [
        actionTypes.load,
      ].forEach((type) => {
        const messages = [{
          id: '1234567890',
        }];
        expect(reducer('foo', {
          type,
          messages
        })).to.deep.equal(messages);
      });
    });
    it('should return null on unload', () => {
      [
        actionTypes.unload,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.deep.equal([]);
      });
    });
  });
});

describe('Conversation :: getMessageStoreUpdatedAtReducer', () => {
  it('getMessageStoreUpdatedAtReducer should be a function', () => {
    expect(getMessageStoreUpdatedAtReducer).to.be.a('function');
  });
  it('getMessageStoreUpdatedAtReducer should return a reducer', () => {
    expect(getMessageStoreUpdatedAtReducer()).to.be.a('function');
  });
  describe('messageStoreUpdatedAtReducer', () => {
    const reducer = getMessageStoreUpdatedAtReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, {type: 'foo'}))
        .to.equal(originalState);
    });
    it('should return conversationsTimestamp on load', () => {
      [
        actionTypes.load,
      ].forEach((type) => {
        const conversationsTimestamp = 123456789;
        expect(reducer('foo', {
          type,
          conversationsTimestamp
        })).to.equal(conversationsTimestamp);
      });
    });
  });
});


describe('CompostText :: getMessageTextsReducer', () => {
  it('getMessageTextsReducer should be a function', () => {
    expect(getMessageTextsReducer).to.be.a('function');
  });
  it('getMessageTextsReducer should return a reducer', () => {
    expect(getMessageTextsReducer()).to.be.a('function');
  });
  describe('messageTextsReducer', () => {
    const reducer = getMessageTextsReducer(actionTypes);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {}).length).to.equal(0);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = [{id: 1, text: ''}];
      expect(reducer(originalState, {type: 'foo'}))
        .to.equal(originalState);
    });
    it('should updates the messages array on updateMessageText', () => {
      [
        actionTypes.updateMessages,
      ].forEach(type => {
        expect(reducer([{id: 1, text: ''}], {
          type,
          text: '12345678',
          id: 2
        }).length).to.equal(2);
      });
    });
    it('should return blank string on reply', () => {
      [
        actionTypes.removeMessage,
      ].forEach(type => {
        expect(reducer([], {
          type,
          id: 2
        }).length).to.equal(0);
      });
    });
  });
});
