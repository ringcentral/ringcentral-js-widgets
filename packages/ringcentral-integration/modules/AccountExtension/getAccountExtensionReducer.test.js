import { expect } from 'chai';
import {
  getTimestampReducer,
  getDataReducer,
} from './getAccountExtensionReducer';
import actionTypes from './actionTypes';

describe('getDataReducer', () => {
  it('should be a function', () => {
    expect(getDataReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getDataReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('defaultDataReducer', () => {
    const reducer = getDataReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(null);
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.data on fetchSuccess', () => {
      const data = {};
      expect(reducer(null, {
        type: actionTypes.fetchSuccess,
        data,
      })).to.equal(data);
    });
    it('should return null on resetSuccess', () => {
      expect(reducer([], {
        type: actionTypes.resetSuccess,
      })).to.equal(null);
    });
    it('should add action.data to state on add', () => {
      expect(reducer(['foo'], {
        type: actionTypes.add,
        data: 'bar',
      })).to.deep.equal(['foo', 'bar']);
    });
    it('should remove item from state on delete', () => {
      expect(reducer([{
        id: 'foo',
      }, {
        id: 'bar',
      }], {
        type: actionTypes.delete,
        id: 'foo',
      })).to.deep.equal([{
        id: 'bar',
      }]);
    });
  });
});
describe('getTimestampReducer', () => {
  it('should be a function', () => {
    expect(getTimestampReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getTimestampReducer({ types: actionTypes })).to.be.a('function');
  });
  describe('timestampReducer', () => {
    const reducer = getTimestampReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state if type is not recognized', () => {
      const originalState = [];
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.timestamp on fetchSuccess, add, and delete', () => {
      const timestamp = Date.now();
      expect(reducer(null, {
        type: actionTypes.fetchSuccess,
        timestamp,
      })).to.equal(timestamp);
      expect(reducer(null, {
        type: actionTypes.add,
        timestamp,
      })).to.equal(timestamp);
      expect(reducer(null, {
        type: actionTypes.delete,
        timestamp,
      })).to.equal(timestamp);
    });
    it('should return null on resetSuccess', () => {
      expect(reducer(Date.now(), {
        type: actionTypes.resetSuccess,
      })).to.be.null;
    });
  });
});
