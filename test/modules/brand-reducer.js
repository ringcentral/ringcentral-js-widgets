import { expect } from 'chai';
import getReducer from '../../src/modules/brand/brand-reducer';
import brandActions from '../../src/modules/brand/brand-actions';
import { prefixActions } from '../../src/lib/redux-helper';
/* global describe it */

describe('brand-reducer', () => {
  const prefix = 'test';
  const initialState = {
    name: 'test brand',
    id: '1234',
  };
  const actions = prefixActions(brandActions, prefix);
  const brandReducer = getReducer(initialState, prefix);
  it('should be a function', () => {
    expect(brandReducer).to.be.a('function');
  });
  it('should return initalState', () => {
    expect(brandReducer()).to.deep.equal(initialState);
  });
  it('should handle setBrand', () => {
    expect(brandReducer(initialState, {
      type: actions.setBrand,
      payload: {
        name: 'new name',
        id: '5678',
      },
    })).to.deep.equal({
      name: 'new name',
      id: '5678',
    });
  });
  it('should return original state if given no actions or unknown actions', () => {
    const state = {
      name: 'some brand',
      id: '12345',
    };
    expect(brandReducer(state)).to.deep.equal(state);
    expect(brandReducer(state, {
      type: 'Unknown',
    })).to.deep.equal(state);
  });
});
