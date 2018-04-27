import { expect } from 'chai';
import {
  getCurrentPageReducer,
  getSearchInputReducer,
  getPerPageReducer,
} from './getMessagesReducer';

import actionTypes from './actionTypes';

//TODO need to be updated

describe('Messages :: getCurrentPageReducer', () => {
  it('getCurrentPageReducer should be a function', () => {
    expect(getCurrentPageReducer).to.be.a('function');
  });
  it('getCurrentPageReducer should return a reducer', () => {
    expect(getCurrentPageReducer()).to.be.a('function');
  });
  describe('currentPageReducer', () => {
    const reducer = getCurrentPageReducer(actionTypes);
    it('should have initial state of 0', () => {
      expect(reducer(undefined, {})).to.equal(0);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = 3;
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return next page on nextPage', () => {
      [
        actionTypes.nextPage
      ].forEach((type) => {
        expect(reducer(2, {
          type,
        })).to.equal(3);
      });
    });
    it('should return previous page on previousPage', () => {
      [
        actionTypes.previousPage
      ].forEach((type) => {
        expect(reducer(3, {
          type,
        })).to.equal(2);
      });
    });
    it('should return page on setPage', () => {
      [
        actionTypes.setPage
      ].forEach((type) => {
        expect(reducer(2, {
          type,
          page: 4,
        })).to.equal(4);
      });
    });

    it('should return 0 on resetSuccess', () => {
      [
        actionTypes.resetSuccess,
      ].forEach((type) => {
        expect(reducer(3, {
          type,
        })).to.equal(0);
      });
    });
  });
});

describe('Messages :: getSearchInputReducer', () => {
  it('getSearchInputReducer should be a function', () => {
    expect(getSearchInputReducer).to.be.a('function');
  });
  it('getSearchInputReducer should return a reducer', () => {
    expect(getSearchInputReducer()).to.be.a('function');
  });
  describe('searchInputReducer', () => {
    const reducer = getSearchInputReducer(actionTypes);
    it('should have initial state of empty string', () => {
      expect(reducer(undefined, {})).to.equal('');
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = '123';
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return new inputString on updateSearchInput', () => {
      [
        actionTypes.updateSearchInput
      ].forEach((type) => {
        const input = '123321';
        expect(reducer('', {
          type,
          input
        })).to.equal(input);
      });
    });
    it('should return blank string on resetSuccess', () => {
      [
        actionTypes.resetSuccess
      ].forEach((type) => {
        expect(reducer('123', {
          type,
        })).to.equal('');
      });
    });
  });
});

describe('Messages :: getPerPageReducer', () => {
  it('getPerPageReducer should be a function', () => {
    expect(getPerPageReducer).to.be.a('function');
  });
  it('getPerPageReducer should return a reducer', () => {
    expect(getPerPageReducer()).to.be.a('function');
  });
  describe('perPageReducer', () => {
    const reducer = getPerPageReducer(actionTypes);
    it('should have initial state of 20', () => {
      expect(reducer(undefined, {})).to.equal(20);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.deep.equal(originalState);
    });
  });
});
