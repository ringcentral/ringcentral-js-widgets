import { expect } from 'chai';
import {
  getCallsReducer,
  getCallStatusReducer
} from './getRecentCallsReducer';
import actionTypes from './actionTypes';
import callStatus from './callStatus';

describe('RecentCalls :: getCallsReducer', () => {
  it('getCallsReducer should be a function', () => {
    expect(getCallsReducer).to.be.a('function');
  });
  it('getCallsReducer should return a reducer', () => {
    expect(getCallsReducer()).to.be.a('function');
  });

  describe('callsreducer', () => {
    const reducer = getCallsReducer(actionTypes);
    it('should have initial state of empty object', () => {
      expect(reducer(undefined, {})).to.deep.equal({});
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = { '171': [] };
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return all calls when new contact is passed in and user is not on a call', () => {
      const state = { '181': [] };
      expect(reducer(state, {
        type: actionTypes.loadSuccess,
        calls: [],
        contact: { id: '171' },
      })).to.deep.equal({
        '181': [],
        '171': []
      });
    });

    it('should return all calls when new contact is passed in and user is on a call', () => {
      const state = { '181': [] };
      expect(reducer(state, {
        type: actionTypes.loadSuccess,
        calls: [],
        contact: { id: '171' },
        sessionId: '191',
      })).to.deep.equal({
        '181': [],
        '171-191': []
      });
    });

    it('call should be removed when reset', () => {
      const state = {
        '171': []
      };
      expect(reducer(state, {
        type: actionTypes.loadReset,
        contact: { id: '171' },
      })).to.deep.equal({});
    });

    it('call should be removed when reset and user is on a call', () => {
      const state = {
        '171-191': []
      };
      expect(reducer(state, {
        type: actionTypes.loadReset,
        contact: { id: '171' },
        sessionId: '191'
      })).to.deep.equal({});
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


describe('RecentCalls :: getCallStatusReducer', () => {
  it('getCallStatusReducer should be a function', () => {
    expect(getCallStatusReducer).to.be.a('function');
  });
  it('getCallStatusReducer should return a reducer', () => {
    expect(getCallStatusReducer()).to.be.a('function');
  });

  describe('callStatusReducer', () => {
    const reducer = getCallStatusReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = actionTypes.initLoad;
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('call status can be set', () => {
      expect(reducer(null, {
        type: actionTypes.initLoad,
      })).to.equal(callStatus.loading);
      expect(reducer(null, {
        type: actionTypes.loadReset,
      })).to.equal(callStatus.loaded);
      expect(reducer(null, {
        type: actionTypes.loadSuccess,
      })).to.equal(callStatus.loaded);
    });
  });
});
