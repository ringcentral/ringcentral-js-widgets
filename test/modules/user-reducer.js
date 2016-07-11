import { expect } from 'chai';
import getReducer from '../../src/modules/user/user-reducer';
import userActions from '../../src/modules/user/user-actions';
import { prefixActions } from '../../src/lib/redux-helper';
import { createStore } from 'redux';
/* global describe it */

describe('user-reducer', () => {
  const prefix = 'test';
  const actions = prefixActions(userActions, prefix);
  const userReducer = getReducer(prefix);
  it('should be a function', () => {
    expect(userReducer).to.be.a('function');
  });
  it('should return initalState', () => {
    expect(userReducer()).to.be.a('object');
  });
  it('should always return the same initialState', () => {
    expect(userReducer()).to.deep.equal(userReducer());
  });
  it('should return original state if given no actions or unknown actions', () => {
    const state = userReducer();
    expect(userReducer(state)).to.deep.equal(state);
    expect(userReducer(state, {
      type: 'Unknown',
    })).to.deep.equal(state);
  });
});
