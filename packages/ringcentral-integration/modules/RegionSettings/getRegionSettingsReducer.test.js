import { expect } from 'chai';
import getRegionSettingsReducer, {
  getCountryCodeReducer,
  getAreaCodeReducer,
} from './getRegionSettingsReducer';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import actionTypes from './actionTypes';

describe('getCountryCodeReducer', () => {
  it('should be a function', () => {
    expect(getCountryCodeReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getCountryCodeReducer(actionTypes)).to.be.a('function');
  });
  describe('countryCodeReducer', () => {
    const reducer = getCountryCodeReducer(actionTypes);
    it('should have initial state of null', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.countryCode on setData', () => {
      const countryCode = 'foo';
      expect(reducer(null, {
        type: actionTypes.setData,
        countryCode,
      })).to.equal(countryCode);
    });
    it('should return originalState on setData if action.countryCode is undefined', () => {
      expect(reducer('foo', {
        type: actionTypes.setData,
      })).to.equal('foo');
    });
  });
});

describe('getAreaCodeReducer', () => {
  it('should be a function', () => {
    expect(getAreaCodeReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getAreaCodeReducer(actionTypes)).to.be.a('function');
  });
  describe('areaCodeReducer', () => {
    const reducer = getAreaCodeReducer(actionTypes);
    it('should have initial state of ""', () => {
      expect(reducer(undefined, {})).to.equal('');
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return action.areaCode on setData', () => {
      const areaCode = 'foo';
      expect(reducer(null, {
        type: actionTypes.setData,
        areaCode,
      })).to.equal(areaCode);
    });
    it('should return originalState on setData if action.areaCode is undefined', () => {
      expect(reducer('foo', {
        type: actionTypes.setData,
      })).to.equal('foo');
    });
  });
});

describe('getRegionSettingsReducer', () => {
  it('should be a function', () => {
    expect(getRegionSettingsReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getRegionSettingsReducer(actionTypes)).to.be.a('function');
  });
  describe('regionSettingsReducer', () => {
    const reducer = getRegionSettingsReducer(actionTypes);
    const statusReducer = getModuleStatusReducer(actionTypes);
    it('should be a combined reducer', () => {
      expect(reducer(undefined, {})).to.deep.equal({
        status: statusReducer(undefined, {}),
      });
    });
  });
});

