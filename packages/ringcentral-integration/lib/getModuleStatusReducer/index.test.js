import { expect } from 'chai';
import getModuleStatusReducer from './';
import moduleStatuses from '../../enums/moduleStatuses';

const actionTypes = {
  init: 'init',
  initSuccess: 'initSuccess',
  reset: 'reset',
  resetSuccess: 'resetSuccess',
};

describe('getModuleStatusReducer', () => {
  it('should be a function', () => {
    expect(getModuleStatusReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getModuleStatusReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('defaultDataReducer', () => {
    const reducer = getModuleStatusReducer(actionTypes);
    it('should have initial state of moduleStatuses.pending', () => {
      expect(reducer(undefined, {})).to.equal(moduleStatuses.pending);
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return moduleStatuses.initializing on init', () => {
      expect(reducer(null, {
        type: actionTypes.init,
      })).to.equal(moduleStatuses.initializing);
    });
    it('should return moduleStatuses.ready on initSuccess', () => {
      expect(reducer(null, {
        type: actionTypes.initSuccess,
      })).to.equal(moduleStatuses.ready);
    });
    it('should return moduleStatuses.resetting on reset', () => {
      expect(reducer(null, {
        type: actionTypes.reset,
      })).to.equal(moduleStatuses.resetting);
    });
    it('should return moduleStatuses.pending on resetSuccess', () => {
      expect(reducer(null, {
        type: actionTypes.resetSuccess,
      })).to.equal(moduleStatuses.pending);
    });
  });
});
