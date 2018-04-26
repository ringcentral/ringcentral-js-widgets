import { expect } from 'chai';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';

import getReducer, {
  getDataReducer,
  getPageNumberReducer,
  getSearchFilterReducer,
  getCurrentGroupIdReducer,
  getTimestampReducer,
} from './getReducer';

import actionTypes from './actionTypes';

describe('GlipGroups :: getDataReducer', () => {
  it('getDataReducer should be a function', () => {
    expect(getDataReducer).to.be.a('function');
  });
  it('getDataReducer should return a reducer', () => {
    expect(getDataReducer()).to.be.a('function');
  });
  describe('dataReducer', () => {
    const reducer = getDataReducer(actionTypes);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });

    it('should return records on fetchSuccess', () => {
      expect(reducer(undefined, {
        type: actionTypes.fetchSuccess,
        data: {
          records: [{ id: 1 }]
        }
      })).to.deep.equal([{ id: 1 }]);
    });

    it('should return updated records on updateGroup', () => {
      expect(reducer([{ id: 1 }], {
        type: actionTypes.updateGroup,
        group: { id: 1, data: '123' },
      })).to.deep.equal([{ id: 1, data: '123' }]);
    });

    it('should remove record on removeGroup', () => {
      expect(reducer([{ id: 1 }], {
        type: actionTypes.removeGroup,
        group: { id: 1 },
      })).to.deep.equal([]);
    });

    it('should return [] on resetSuccess', () => {
      expect(reducer([{ id: 1 }], {
        type: actionTypes.resetSuccess,
        group: { id: 1 },
      })).to.deep.equal([]);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
  });
});

describe('GlipGroups :: getPageNumberReducer', () => {
  it('getPageNumberReducer should be a function', () => {
    expect(getPageNumberReducer).to.be.a('function');
  });
  it('getPageNumberReducer should return a reducer', () => {
    expect(getPageNumberReducer()).to.be.a('function');
  });
  describe('pageNumberReducer', () => {
    const reducer = getPageNumberReducer(actionTypes);
    it('should have initial state of 1', () => {
      expect(reducer(undefined, {})).to.equal(1);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return pageNumber on updateFilter', () => {
      expect(reducer(1, {
        type: actionTypes.updateFilter,
        pageNumber: 2,
      })).to.equal(2);
    });

    it('should original state when pageNumber is undefined  on updateFilter', () => {
      expect(reducer(1, {
        type: actionTypes.updateFilter,
      })).to.equal(1);
    });
  });
});


describe('GlipGroups :: getSearchFilterReducer', () => {
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

    it('should return searchFilter on updateFilter', () => {
      expect(reducer(1, {
        type: actionTypes.updateFilter,
        searchFilter: 'test',
      })).to.equal('test');
    });

    it('should original state when pageNumber is undefined  on updateFilter', () => {
      expect(reducer('abc', {
        type: actionTypes.updateFilter,
      })).to.equal('abc');
    });
  });
});

describe('GlipGroups :: getCurrentGroupIdReducer', () => {
  it('getCurrentGroupIdReducer should be a function', () => {
    expect(getCurrentGroupIdReducer).to.be.a('function');
  });
  it('getCurrentGroupIdReducer should return a reducer', () => {
    expect(getCurrentGroupIdReducer()).to.be.a('function');
  });
  describe('currentGroupIdFilterReducer', () => {
    const reducer = getCurrentGroupIdReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.deep.equal(null);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return groupId on updateCurrentGroupId', () => {
      expect(reducer(1, {
        type: actionTypes.updateCurrentGroupId,
        groupId: '123',
      })).to.equal('123');
    });
  });
});

describe('GlipGroups :: getTimestampReducer', () => {
  it('getTimestampReducer should be a function', () => {
    expect(getSearchFilterReducer).to.be.a('function');
  });
  it('getTimestampReducer should return a reducer', () => {
    expect(getTimestampReducer()).to.be.a('function');
  });
  describe('timestampReducer', () => {
    const reducer = getTimestampReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.deep.equal(null);
    });

    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return timestamp on fetchSuccess', () => {
      expect(reducer(1, {
        type: actionTypes.fetchSuccess,
        timestamp: '123',
      })).to.equal('123');
    });

    it('should return null on resetSuccess', () => {
      expect(reducer(1, {
        type: actionTypes.resetSuccess,
      })).to.equal(null);
    });
  });
});

describe('GlipGroups :: getReducer', () => {
  it('should be a function', () => {
    expect(getReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getReducer(actionTypes)).to.be.a('function');
  });
  it('should return a combined reducer', () => {
    const reducer = getReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    const searchFilterReducer = getSearchFilterReducer(actionTypes);
    const pageNumberReducer = getPageNumberReducer(actionTypes);
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      searchFilter: searchFilterReducer(undefined, {}),
      pageNumber: pageNumberReducer(undefined, {}),
    });
  });
});
