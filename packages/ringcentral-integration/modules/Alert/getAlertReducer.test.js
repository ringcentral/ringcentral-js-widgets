import { expect } from 'chai';
import getAlertReducer, {
  getMessagesReducer,
} from './getAlertReducer';
import actionTypes from './actionTypes';

describe('getMessagesReducer', () => {
  it('should be a function', () => {
    expect(getMessagesReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getMessagesReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('messagesReducer', () => {
    const reducer = getMessagesReducer(actionTypes);
    it('should have initial state of []', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should add new message to state on alert', () => {
      expect(reducer([], {
        type: actionTypes.alert,
        id: 'foo',
        message: 'bar',
        payload: 'payload',
        ttl: 0,
        level: 'level',
        timestamp: 1234,
      })).to.deep.equal([{
        id: 'foo',
        message: 'bar',
        payload: 'payload',
        ttl: 0,
        level: 'level',
        timestamp: 1234
      }]);
      expect(reducer([{}, {}], {
        type: actionTypes.alert,
        id: 'foo',
        message: 'bar',
        payload: 'payload',
        ttl: 0,
        level: 'level',
        timestamp: 1234,
      })).to.deep.equal([{}, {}, {
        id: 'foo',
        message: 'bar',
        payload: 'payload',
        ttl: 0,
        level: 'level',
        timestamp: 1234
      }]);
    });
    it('should return state if allowDuplicates === false and message already exists', () => {
      const originalState = [{
        message: 'foo',
      }];
      expect(reducer(originalState, {
        type: actionTypes.alert,
        message: 'foo',
        allowDuplicates: false,
      })).to.equal(originalState);
    });
    it('should remove messages specified by the ids on dismiss', () => {
      expect(reducer([{ id: 'foo' }, { id: 'bar' }, { id: 'rogue' }], {
        type: actionTypes.dismiss,
        ids: ['foo', 'bar'],
      })).to.deep.equal([{
        id: 'rogue',
      }]);
    });
    it ('should remove all messages on dismissAll', () => {
      expect(reducer([{ id: 'foo' }, { id: 'bar' }, { id: 'rogue' }], {
        type: actionTypes.dismissAll,
      })).to.deep.equal([]);
    });
  });
});

describe('getAlertReducer', () => {
  it('should be a function', () => {
    expect(getAlertReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getAlertReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getAlertReducer(actionTypes);
    const messagesReducer = getMessagesReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      messages: messagesReducer(undefined, {}),
    });
  });
});
