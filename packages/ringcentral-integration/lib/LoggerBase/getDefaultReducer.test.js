import { expect } from 'chai';

import actionTypes from './baseActionTypes';
import getDefaultReducer, { getLoggingListReducer } from './getDefaultReducer';
import getModuleStatusReducer from '../getModuleStatusReducer';

describe('getLoggingListReducer', () => {
  it('should be a function', () => {
    expect(getLoggingListReducer).to.be.a('function');
  });
  it('should return a function', () => {
    expect(getLoggingListReducer(actionTypes)).to.be.a('function');
  });
  describe('loggingListReducer', () => {
    const reducer = getLoggingListReducer(actionTypes);
    it('should have initial state of []', () => {
      expect(reducer(undefined, { action: 'foo' }))
        .to.deep.equal([]);
    });
    it('should add action.id to state on log', () => {
      const id = 'bar';
      expect(reducer([], {
        type: actionTypes.log,
        id,
      })).to.deep.equal([id]);
    });
    it('should not add duplicate entries on log', () => {
      const id = 'bar';
      expect(reducer([id], {
        type: actionTypes.log,
        id,
      })).to.deep.equal([id]);
    });
    it('should remove item from state on logSuccess', () => {
      const id = 'bar';
      const otherId = 'baz';
      expect(reducer([id, otherId], {
        type: actionTypes.logSuccess,
        id,
      })).to.deep.equal([otherId]);
    });
    it('should remove item from state on logError', () => {
      const id = 'bar';
      const otherId = 'baz';
      expect(
        reducer(
          [
            id,
            otherId,
          ], {
            type: actionTypes.logSuccess,
            id,
          })).to.deep.equal([otherId]);
    });
    it('should return originalState on other action types', () => {
      const originalState = [];
      expect(reducer(originalState, {
        type: 'foo',
      })).to.equal(originalState);
    });
  });
});

describe('getDefaultReducer', () => {
  it('should return a function', () => {
    expect(getDefaultReducer(actionTypes)).to.be.a('function');
  });
  describe('defaultReducer', () => {
    const defaultReducer = getDefaultReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const loggingListReducer = getLoggingListReducer(actionTypes);
    it('should have combined loggingList and status state', () => {
      expect(defaultReducer(undefined, { type: 'foo' }))
        .to.deep.equal({
          status: statusReducer(undefined, { type: 'foo' }),
          loggingList: loggingListReducer(undefined, { type: 'foo' }),
        });
    });
  });
});
