import { expect } from 'chai';
import getContactsReducer, {
  getSearchFilterReducer,
  getSourceFilterReducer,
  getPageNumberReducer,
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

describe('Contacts :: getPageNumberReducer', () => {
  it('getPageNumberReducer should be a function', () => {
    expect(getPageNumberReducer).to.be.a('function');
  });
  it('getPageNumberReducer should return a reducer', () => {
    expect(getPageNumberReducer()).to.be.a('function');
  });
  describe('pageNumberReducer', () => {
    const reducer = getPageNumberReducer(actionTypes);
    it('should have initial state of one', () => {
      expect(reducer(undefined, {})).to.equal(1);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return blank string on resetSuccess', () => {
      expect(reducer(2, {
        type: actionTypes.resetSuccess,
      })).to.equal(1);
    });
    it('should return new pageNumber on updateFilter', () => {
      expect(reducer(1, {
        type: actionTypes.updateFilter,
        pageNumber: 3,
      })).to.equal(3);
    });
    it('should return original page when pageNumber is undefined on updateFilter', () => {
      expect(reducer(5, {
        type: actionTypes.updateFilter,
        pageNumber: undefined,
      })).to.equal(5);
    });
    it('should return original page when pageNumber is zero on updateFilter', () => {
      expect(reducer(3, {
        type: actionTypes.updateFilter,
        searchFilter: 0,
      })).to.equal(3);
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
    const pageNumberReducer = getPageNumberReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      searchFilter: searchFilterReducer(undefined, {}),
      sourceFilter: sourceFilterReducer(undefined, {}),
      pageNumber: pageNumberReducer(undefined, {}),
    });
  });
});
