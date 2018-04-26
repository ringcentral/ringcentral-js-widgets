import { expect } from 'chai';
import getDefaultDataReducer from './getDefaultDataReducer';
import actionTypes from './baseActionTypes';

describe('getDefaultDataReducer', () => {
  it('should be a function', () => {
    expect(getDefaultDataReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getDefaultDataReducer(actionTypes))
      .to.be.a('function');
  });
  describe('defaultDataReducer', () => {
    const reducer = getDefaultDataReducer(actionTypes);
    it('should have initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal({});
    });
    it('should return original state on unhandled actions', () => {
      const originalState = {};
      expect(reducer(originalState, {
        type: 'foo',
      })).to.equal(originalState);
    });
    it('should reset to empty object on resetSuccess', () => {
      expect(reducer(
        {
          foo: 'bar',
        }, {
          type: actionTypes.resetSuccess,
        }
      )).to.deep.equal({});
    });

    it('should return new state with new data on matchSuccess', () => {
      const data = {
        foo: ['bar'],
      };
      const name = 'rogue';
      const now = Date.now();
      expect(reducer({}, {
        type: actionTypes.matchSuccess,
        data,
        name,
        queries: ['foo'],
        timestamp: now,
      })).to.deep.equal({
        foo: {
          [name]: {
            data: data.foo,
            _t: now,
          },
        },
      });
    });
    it('should mark an entry with timestamp if match is not found', () => {
      const data = {
        foo: [],
      };
      const name = 'rogue';
      const now = Date.now();
      expect(reducer({}, {
        type: actionTypes.matchSuccess,
        data,
        name,
        queries: ['foo'],
        timestamp: now,
      })).to.deep.equal({
        foo: {
          [name]: {
            _t: now,
            data: [],
          },
        },
      });
    });

    it('should mark entry with timestamp if it is no longer in queries', () => {
      const state = {
        foo: {
          bar: {},
        },
      };
      const ttl = 30;
      const now = Date.now();
      expect(reducer(state, {
        type: actionTypes.cleanUp,
        ttl,
        timestamp: now,
        queries: [],
      })).to.deep.equal({
        foo: {
          _t: now,
          bar: {},
        },
      });
    });

    it('should remove entry from state if it is marked for longer than ttl', () => {
      const now = Date.now();
      const state = {
        foo: {
          _t: now - 50,
          bar: {},
        },
      };
      const ttl = 30;
      expect(reducer(state, {
        type: actionTypes.cleanUp,
        ttl,
        queries: [],
        timestamp: now,
      })).to.deep.equal({});
    });
    it('should return original state if nothing has changed', () => {
      const state = {
        foo: {
          bar: {},
        },
      };
      const ttl = 30;
      const now = Date.now();
      expect(reducer(state, {
        type: actionTypes.cleanUp,
        ttl,
        timestamp: now,
        queries: ['foo'],
      })).to.equal(state);
    });
    it('should not remove entry if the marked time is less than ttl', () => {
      const now = Date.now();
      const state = {
        foo: {
          _t: now - 20,
          bar: {},
        },
      };
      const ttl = 30;
      expect(reducer(state, {
        type: actionTypes.cleanUp,
        ttl,
        queries: [],
        timestamp: now,
      })).to.equal(state);
    });
    it('should remove timestamp on entries if it is found in queries again', () => {
      const now = Date.now();
      const state = {
        foo: {
          _t: now - 50,
          bar: {},
        },
      };
      const ttl = 30;
      expect(reducer(state, {
        type: actionTypes.cleanUp,
        ttl,
        queries: ['foo'],
        timestamp: now,
      })).to.deep.equal({
        foo: {
          bar: {},
        },
      });
    });
  });
});
