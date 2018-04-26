import { expect } from 'chai';
import {
  getContactsReducer,
  getMessagesReducer,
  getMessageStatusReducer
} from './getRecentMessagesReducer';
import actionTypes from './actionTypes';
import messageStatus from './messageStatus';

describe('RecentMessages :: getContactsReducer', () => {
  it('getContactsReducer should be a function', () => {
    expect(getContactsReducer).to.be.a('function');
  });
  it('getContactsReducer should return a reducer', () => {
    expect(getContactsReducer()).to.be.a('function');
  });

  describe('contactsReducer', () => {
    const reducer = getContactsReducer(actionTypes);
    it('should have initial state of empty object', () => {
      expect(reducer(undefined, {})).to.deep.equal({});
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = { 123: [] };
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return all contacts when new contact is passed in ', () => {
      expect(reducer({}, {
        type: actionTypes.loadSuccess,
        contact: {
          id: '171'
        },
      })).to.deep.equal({
        '171': {
          id: '171'
        }
      });
    });

    it('should return all contacts when new contact is passed in and on a call', () => {
      expect(reducer({}, {
        type: actionTypes.loadSuccess,
        contact: {
          id: '171'
        },
        sessionId: '191'
      })).to.deep.equal({
        '171-191': {
          id: '171'
        }
      });
    });

    it('contact should be removed when reset and not on a call', () => {
      const state = {
        '171': { id: '171' },
        '181': { id: '181' },
      };
      expect(reducer(state, {
        type: actionTypes.loadReset,
        contact: { id: '171' },
      })).to.deep.equal({
        '181': { id: '181' }
      });
    });

    it('contact should be removed when reset and on a call', () => {
      const state = {
        '171-191': { id: '171' },
        '181': { id: '181' },
      };
      expect(reducer(state, {
        type: actionTypes.loadReset,
        contact: { id: '171' },
        sessionId: '191'
      })).to.deep.equal({
        '181': { id: '181' }
      });
    });

    it('should return original state when contact is undefined', () => {
      const state = {
        '171': { id: '171' }
      };
      expect(reducer(state, {
        type: actionTypes.loadReset,
        contact: undefined
      })).to.deep.equal(state);
    });
  });
});

describe('RecentMessages :: getMessagesReducer', () => {
  it('getMessagesReducer should be a function', () => {
    expect(getMessagesReducer).to.be.a('function');
  });
  it('getMessagesReducer should return a reducer', () => {
    expect(getMessagesReducer()).to.be.a('function');
  });

  describe('messagesReducer', () => {
    const reducer = getMessagesReducer(actionTypes);
    it('should have initial state of empty object', () => {
      expect(reducer(undefined, {})).to.deep.equal({});
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = { 123: [] };
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return all messages when new message passed in and user is not on a call', () => {
      const messages = { id: 1 };
      expect(reducer({}, {
        type: actionTypes.loadSuccess,
        messages,
        contact: {
          id: '171'
        },
      })).to.deep.equal({
        '171': messages
      });
    });

    it('should return all messages when new message passed in and user is on a call', () => {
      const messages = { id: 1 };
      expect(reducer({}, {
        type: actionTypes.loadSuccess,
        messages,
        contact: {
          id: '171'
        },
        sessionId: '191'
      })).to.deep.equal({
        '171-191': messages
      });
    });

    it('messages should be removed when reset', () => {
      const state = {
        '171': []
      };
      expect(reducer(state, {
        type: actionTypes.loadReset,
        contact: { id: '171' },
      })).to.deep.equal({});
    });

    it('messages should be removed when reset', () => {
      const state = {
        '171-191': []
      };
      expect(reducer(state, {
        type: actionTypes.loadReset,
        contact: { id: '171' },
        sessionId: '191'
      })).to.deep.equal({});
    });
  });
});

describe('RecentMessages :: getMessageStatusReducer', () => {
  it('getMessageStatusReducer should be a function', () => {
    expect(getMessageStatusReducer).to.be.a('function');
  });
  it('getMessageStatusReducer should return a reducer', () => {
    expect(getMessageStatusReducer()).to.be.a('function');
  });

  describe('messageStatusReducer', () => {
    const reducer = getMessageStatusReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = actionTypes.initLoad;
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('messageLoad status should be set', () => {
      expect(reducer(null, {
        type: actionTypes.initLoad,
      })).to.equal(messageStatus.loading);
      expect(reducer(null, {
        type: actionTypes.loadReset,
      })).to.equal(messageStatus.loaded);
      expect(reducer(null, {
        type: actionTypes.loadSuccess,
      })).to.equal(messageStatus.loaded);
    });
  });
});
