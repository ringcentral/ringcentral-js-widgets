import { expect } from 'chai';
import getQuickAccessrReducer, {
  getupdatePageReducer,
} from './getQuickAccessReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import actionTypes from './actionTypes';

describe('getupdatePageReducer', () => {
  it('should be a function', () => {
    expect(getupdatePageReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getupdatePageReducer(actionTypes)).to.be.a('function');
  });
  describe('updatePageReducer', () => {
    const reducer = getupdatePageReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.equal(false);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' })).to.equal(originalState);
    });
    it('should return entered on updatePage', () => {
      const entered = 'foo';
      expect(
        reducer(null, {
          type: actionTypes.updatePage,
          entered,
        }),
      ).to.equal(entered);
    });
    it('should return originalState on updatePage if action.updatePage is undefined', () => {
      expect(
        reducer('foo', {
          type: actionTypes.updatePage,
        }),
      ).to.equal('foo');
    });
  });
});

describe('getQuickAccessrReducer', () => {
  it('should be a function', () => {
    expect(getQuickAccessrReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getQuickAccessrReducer(actionTypes)).to.be.a('function');
  });
  const reducer = getQuickAccessrReducer(actionTypes);
  const statusReducer = getModuleStatusReducer(actionTypes);
  const updatePageReducer = getupdatePageReducer(actionTypes);
  it('should return combined state', () => {
    expect(reducer(undefined, {})).to.deep.equal({
      status: statusReducer(undefined, {}),
      entered: updatePageReducer(undefined, {}),
    });
  });
});
