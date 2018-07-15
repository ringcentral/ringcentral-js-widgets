import { expect } from 'chai';
import getContactsReducer, {
  getSearchFilterReducer,
  getSourceFilterReducer,
} from './getContactsReducer';

import { AllContactSourceName } from '../../lib/contactHelper';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import actionTypes from './actionTypes';

describe('Contacts :: getSearchFilterReducer', () => {
  it('getSearchFilterReducer should be a function', () => {
    expect(getSearchFilterReducer).to.be.a('function');
  });
  it('getSearchFilterReducer should return a reducer', () => {
    expect(getSearchFilterReducer()).to.be.a('function');
  });
  describe('searchFilterReducer', () => {
    const reducer = getSearchFilterReducer(actionTypes);
    it('should have initial state of blank string', () => {
      expect(reducer(undefined, {})).to.equal('');
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return new filter on updateFilter', () => {
      expect(reducer('foo', {
        type: actionTypes.updateFilter,
        searchFilter: 'test',
      })).to.equal('test');
    });
    it('should return blank string on resetSuccess', () => {
      expect(reducer('foo', {
        type: actionTypes.resetSuccess,
      })).to.equal('');
    });
    it('should return original filter when searchFilter is undefined on updateFilter', () => {
      expect(reducer('foo', {
        type: actionTypes.updateFilter,
        searchFilter: undefined,
      })).to.equal('foo');
    });
    it('should return original filter when searchFilter is null on updateFilter', () => {
      expect(reducer('foo', {
        type: actionTypes.updateFilter,
        searchFilter: null,
      })).to.equal('foo');
    });
  });
});

describe('Contacts :: getSourceFilterReducer', () => {
  it('getSourceFilterReducer should be a function', () => {
    expect(getSourceFilterReducer).to.be.a('function');
  });
  it('getSourceFilterReducer should return a reducer', () => {
    expect(getSourceFilterReducer()).to.be.a('function');
  });
  describe('sourceFilterReducer', () => {
    const reducer = getSourceFilterReducer(actionTypes);
    it('should have initial state of AllContactSourceName', () => {
      expect(reducer(undefined, {})).to.equal(AllContactSourceName);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return sourceFilter on updateFilter', () => {
      expect(reducer('foo', {
        type: actionTypes.updateFilter,
        sourceFilter: 'test',
      })).to.equal('test');
    });
    it('should return AllContactSourceName on resetSuccess', () => {
      expect(reducer('foo', {
        type: actionTypes.resetSuccess,
      })).to.equal(AllContactSourceName);
    });
    it('should return original filter when sourceFilter is undefined on updateFilter', () => {
      expect(reducer('foo', {
        type: actionTypes.updateFilter,
        sourceFilter: undefined,
      })).to.equal('foo');
    });
    it('should return original filter when sourceFilter is null on updateFilter', () => {
      expect(reducer('foo', {
        type: actionTypes.updateFilter,
        sourceFilter: null,
      })).to.equal('foo');
    });
  });
});

describe('getContactsReducer', () => {
  it('should be a function', () => {
    expect(getContactsReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getContactsReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getContactsReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const searchFilterReducer = getSearchFilterReducer(actionTypes);
    const sourceFilterReducer = getSourceFilterReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      searchFilter: searchFilterReducer(undefined, {}),
      sourceFilter: sourceFilterReducer(undefined, {}),
    });
  });
});
