import { expect } from 'chai';
import getContactSearchReducer, {
  getContactSearchStatusReducer,
  getSearchingReducer,
} from './getContactSearchReducer';

import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import actionTypes from './actionTypes';
import contactSearchStatus from './contactSearchStatus';

describe('ContactSearch :: getContactSearchStatusReducer', () => {
  it('getContactSearchStatusReducer should be a function', () => {
    expect(getContactSearchStatusReducer).to.be.a('function');
  });
  it('getContactSearchStatusReducer should return a reducer', () => {
    expect(getContactSearchStatusReducer()).to.be.a('function');
  });
  describe('statusReducer', () => {
    const reducer = getContactSearchStatusReducer(actionTypes);
    it('should have initial state of idle', () => {
      expect(reducer(undefined, {})).to.equal(contactSearchStatus.idle);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return searching status on search', () => {
      [
        actionTypes.search,
      ].forEach(type => {
        expect(reducer('foo', {
          type,
        })).to.equal(contactSearchStatus.searching);
      });
    });
    it('should return idle state on prepareSearch, searchSuccess, searchError', () => {
      [
        actionTypes.prepareSearch,
        actionTypes.searchSuccess,
        actionTypes.searchError,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(contactSearchStatus.idle);
      });
    });
  });
});

describe('getSearchingReducer', () => {
  it('getSearchingReducer should be a function', () => {
    expect(getSearchingReducer).to.be.a('function');
  });
  it('getSearchingReducer should return a reducer', () => {
    expect(getSearchingReducer()).to.be.a('function');
  });
  describe('searchingReducer', () => {
    const reducer = getSearchingReducer(actionTypes);
    const initialState = { searchOnSources: [], searchString: '', result: [] };
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return original state on search', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'search' }))
        .to.equal(originalState);
    });
    it('should return initial state on resetSuccess, prepareSearch, reset and searchError', () => {
      [
        actionTypes.resetSuccess,
        actionTypes.prepareSearch,
        actionTypes.reset,
        actionTypes.searchError,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.deep.equal(initialState);
      });
    });

    it('should return searchString and result as key on searchSuccess', () => {
      const originalState = {};
      expect(reducer(originalState, {
        type: actionTypes.searchSuccess,
        searchString: '123',
        entities: [],
      })).to.include.keys('searchString', 'result');
    });
    it('should return data with searchString on searchSuccess', () => {
      const originalState = {};
      expect(reducer(originalState, {
        type: actionTypes.searchSuccess,
        searchString: 'test',
        entities: [],
      }).searchString).to.equal('test');
    });
    it('should return data with result on searchSuccess', () => {
      const originalState = {};
      const entities = [{
        entityType: 'account',
        id: '123',
        name: 'User One',
        phoneNumber: '12345678',
        phoneType: 'mobile'
      }];
      expect(reducer(originalState, {
        type: actionTypes.searchSuccess,
        searchString: 'test',
        entities,
      }).result).to.deep.equal(entities);
    });
    it('should return data with result concat with same searchString', () => {
      const originalState = {
        searchOnSources: ['testSource'],
        searchString: 'test',
        result: [{
          entityType: 'contact',
          id: '1',
          name: 'User Zero',
          phoneNumber: '1234567890',
          phoneType: 'mobile',
        }]
      };
      const entities = [{
        entityType: 'account',
        id: '123',
        name: 'User One',
        phoneNumber: '12345678',
        phoneType: 'mobile',
      }];
      const expectResult = [
        {
          entityType: 'contact',
          id: '1',
          name: 'User Zero',
          phoneNumber: '1234567890',
          phoneType: 'mobile'
        },
        {
          entityType: 'account',
          id: '123',
          name: 'User One',
          phoneNumber: '12345678',
          phoneType: 'mobile'
        }
      ];
      expect(reducer(originalState, {
        type: actionTypes.searchSuccess,
        searchOnSources: ['testSource'],
        searchString: 'test',
        entities,
      }).result).to.deep.equal(expectResult);
    });
  });
});

describe('getContactSearchReducer', () => {
  it('should be a function', () => {
    expect(getContactSearchReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getContactSearchReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getContactSearchReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const searchStatusReducer = getContactSearchStatusReducer(actionTypes);
    const searchingReducer = getSearchingReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      searchStatus: searchStatusReducer(undefined, {}),
      searching: searchingReducer(undefined, {}),
    });
  });
});
