import { expect } from 'chai';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import getReducer, {
  getGlipPersonsStatusReducer,
  getGlipPersonStoreReducer,
} from './getReducer';

import actionTypes from './actionTypes';
import status from './status';

describe('GlipPersons :: getGlipPersonsStatusReducer', () => {
  it('getGlipPersonsStatusReducer should be a function', () => {
    expect(getGlipPersonsStatusReducer).to.be.a('function');
  });
  it('getGlipPersonsStatusReducer should return a reducer', () => {
    expect(getGlipPersonsStatusReducer()).to.be.a('function');
  });
  describe('glipPersonsStatusReducer', () => {
    const reducer = getGlipPersonsStatusReducer(actionTypes);
    it('should have initial state of status.idle', () => {
      expect(reducer(undefined, {})).to.equal(status.idle);
    });

    it('should return fetching status on fetch', () => {
      expect(reducer('foo', {
        type: actionTypes.fetch,
      })).to.equal(status.fetching);
    });

    it('should return idle status on fetchSuccess, batchFetchSuccess or fetchError', () => {
      [
        actionTypes.fetchSuccess,
        actionTypes.fetchError,
        actionTypes.batchFetchSuccess,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(status.idle);
      });
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
  });
});

describe('GlipPersons :: getGlipPersonStoreReducer', () => {
  it('getGlipPersonStoreReducer should be a function', () => {
    expect(getGlipPersonStoreReducer).to.be.a('function');
  });
  it('getGlipPersonStoreReducer should return a reducer', () => {
    expect(getGlipPersonStoreReducer()).to.be.a('function');
  });
  describe('glipPersonStoreReducer', () => {
    const reducer = getGlipPersonStoreReducer(actionTypes);
    it('should have initial state of empty object', () => {
      expect(reducer(undefined, {})).to.deep.equal({});
    });

    it('should return new person in map on fetchSuccess', () => {
      expect(reducer({}, {
        type: actionTypes.fetchSuccess,
        person: {
          id: '1234'
        }
      })).to.deep.equal({
        1234: {
          id: '1234'
        }
      });
    });

    it('should return new persons in map on batchFetchSuccess', () => {
      expect(reducer({}, {
        type: actionTypes.batchFetchSuccess,
        persons: [{
          id: '1234'
        }, {
          id: '2222'
        }],
      })).to.deep.equal({
        1234: {
          id: '1234'
        },
        2222: {
          id: '2222'
        }
      });
    });

    it('should return empty object on cleanUp or resetSuccess', () => {
      [
        actionTypes.cleanUp,
        actionTypes.resetSuccess,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.deep.equal({});
      });
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
  });
});

describe('GlipPersons :: getReducer', () => {
  it('should be a function', () => {
    expect(getReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const glipPersonsStatusReducer = getGlipPersonsStatusReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      glipPostsStatus: glipPersonsStatusReducer(undefined, {}),
    });
  });
});
