import { expect } from 'chai';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import getCallReducer, {
  getCallStatusReducer,
  getToNumberReducer,
  getLastPhoneNumberReducer,
} from './getCallReducer';

import actionTypes from './actionTypes';
import callStatus from './callStatus';

describe('Call ::', () => {
  it('getCallReducer should be a function', () => {
    expect(getCallReducer).to.be.a('function');
  });
  describe('getLastPhoneNumberReducer', () => {
    it('should be a function', () => {
      expect(getLastPhoneNumberReducer).to.be.a('function');
    });
    const reducer = getLastPhoneNumberReducer(actionTypes);
    it('should be null as initial state', () => {
      expect(reducer(undefined, {})).to.be.null;
    });
    it('should return original state if actionType is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });
    it('should return action.number on connect', () => {
      const number = {};
      expect(reducer(null, {
        type: actionTypes.connect,
        phoneNumber: number,
      })).to.equal(number);
    });
  });
  describe('getCallStatusReducer', () => {
    it('should be a function', () => {
      expect(getCallStatusReducer).to.be.a('function');
    });
    const reducer = getCallStatusReducer(actionTypes);
    it('should have initiate state of idle', () => {
      expect(reducer(undefined, {})).to.equal(callStatus.idle);
    });
    it('should return original state if actionType is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });
    it('should return connecting status if actionType is connect', () => {
      expect(reducer('foo', {
        type: actionTypes.connect,
      })).to.equal(callStatus.connecting);
    });
    it('should return idle status if actionType is connectSuccess or connectError', () => {
      expect(reducer('foo', {
        type: actionTypes.connectSuccess,
      })).to.equal(callStatus.idle);
      expect(reducer('foo', {
        type: actionTypes.connectError,
      })).to.equal(callStatus.idle);

    });
  });
});
