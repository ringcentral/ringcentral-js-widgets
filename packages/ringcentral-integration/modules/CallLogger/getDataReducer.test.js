import { expect } from 'chai';

import actionTypes from './actionTypes';
import {
  getAutoLogReducer,
  getLogOnRingingReducer,
  getTransferredCallsReducer,
} from './getDataReducer';

describe('getAutoLogReducer', () => {
  it('should be a function', () => {
    expect(getAutoLogReducer).to.be.a('function');
  });
  it('should return a function', () => {
    expect(getAutoLogReducer(actionTypes)).to.be.a('function');
  });
  describe('autoLogReducer', () => {
    const reducer = getAutoLogReducer(actionTypes);
    it('should have initial state of true', () => {
      expect(reducer(undefined, {})).to.equal(true);
    });
    it('should return true when type === setAutoLog and action.autoLog is true', () => {
      expect(
        reducer(true, {
          type: actionTypes.setAutoLog,
          autoLog: true,
        }),
      ).to.equal(true);
      expect(
        reducer(false, {
          type: actionTypes.setAutoLog,
          autoLog: true,
        }),
      ).to.equal(true);
    });
    it('should return true when type === setAutoLog and action.autoLog is false', () => {
      expect(
        reducer(true, {
          type: actionTypes.setAutoLog,
          autoLog: false,
        }),
      ).to.equal(false);
      expect(
        reducer(false, {
          type: actionTypes.setAutoLog,
          autoLog: false,
        }),
      ).to.equal(false);
    });
    it('should return originalState for other actionTypes', () => {
      const originalState = {};
      expect(
        reducer(originalState, {
          type: 'foo',
        }),
      ).to.equal(originalState);
    });
  });
});

describe('getLogOnRingingReducer', () => {
  it('should be a function', () => {
    expect(getLogOnRingingReducer).to.be.a('function');
  });
  it('should return a function', () => {
    expect(getLogOnRingingReducer(actionTypes)).to.be.a('function');
  });
  describe('logOnRingingReducer', () => {
    const reducer = getLogOnRingingReducer(actionTypes);
    it('should have initial state of true', () => {
      expect(reducer(undefined, {})).to.equal(true);
    });
    it('should return true when type === setLogOnRinging and action.logOnRinging is true', () => {
      expect(
        reducer(true, {
          type: actionTypes.setLogOnRinging,
          logOnRinging: true,
        }),
      ).to.equal(true);
      expect(
        reducer(false, {
          type: actionTypes.setLogOnRinging,
          logOnRinging: true,
        }),
      ).to.equal(true);
    });
    it('should return true when type === setLogOnRinging and action.logOnRinging is false', () => {
      expect(
        reducer(true, {
          type: actionTypes.setLogOnRinging,
          logOnRinging: false,
        }),
      ).to.equal(false);
      expect(
        reducer(false, {
          type: actionTypes.setLogOnRinging,
          logOnRinging: false,
        }),
      ).to.equal(false);
    });
    it('should return originalState for other actionTypes', () => {
      const originalState = {};
      expect(
        reducer(originalState, {
          type: 'foo',
        }),
      ).to.equal(originalState);
    });
  });
});

describe('getTransferredCallsReducer', () => {
  it('should be a function', () => {
    expect(getTransferredCallsReducer).to.be.a('function');
  });
  it('should return a function', () => {
    expect(getTransferredCallsReducer(actionTypes)).to.be.a('function');
  });
  describe('getTransferredCallsReducer', () => {
    const opacity = 5;
    const reducer = getTransferredCallsReducer(actionTypes, opacity);
    it('should have initial state of []', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state when actionType  is not recognized', () => {
      const originalState = [{ 123: true }];
      expect(reducer(originalState, { type: 'foo' })).to.deep.equal(
        originalState,
      );
    });
    it('should add new matcher when actionType is addTransferredCall', () => {
      const originalState = [
        {
          123: true,
        },
      ];
      expect(
        reducer(originalState, {
          type: actionTypes.addTransferredCall,
          sessionId: '456',
          transferredMiddleNumber: '101',
        }),
      ).to.deep.equal([
        { 123: true },
        { 456: { transferredMiddleNumber: '101' } },
      ]);
    });
    it('should remove oldest matcher when actionType is addTransferredCall andsize of temporary matcher exceed the opacity', () => {
      const originalState = [];
      const opacity = 5;
      originalState.push(
        { 1: true },
        { 2: true },
        { 3: true },
        { 4: true },
        { 5: true },
      );
      expect(originalState.length).to.equal(opacity);
      expect(
        reducer(originalState, {
          type: actionTypes.addTransferredCall,
          sessionId: '456',
        }).length,
      ).to.equal(opacity);
      expect(
        reducer(originalState, {
          type: actionTypes.addTransferredCall,
          sessionId: '456',
          transferredMiddleNumber: '101',
        })[opacity - 1],
      ).to.deep.equal({ 456: { transferredMiddleNumber: '101' } });
    });
  });
});
