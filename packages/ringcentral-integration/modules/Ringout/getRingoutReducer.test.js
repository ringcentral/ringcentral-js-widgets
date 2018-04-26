import { expect } from 'chai';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import getRingoutReducer, {
  getRingoutStatusReducer,
} from './getRingoutReducer';
import ringoutStatus from './ringoutStatus';
import ringoutActionTypes from './actionTypes';

describe('Ringout', () => {
  describe('getRingoutStatusReducer', () => {
    const reducer = getRingoutStatusReducer(ringoutActionTypes);
    it('should be a function', () => {
      expect(getRingoutStatusReducer).to.be.a('function');
    });
    it('should have initial state of idle', () => {
      expect(reducer(undefined, {})).to.equal(ringoutStatus.idle);
    });
    it('should return original state if actionType is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });
    it('should return idle status if actionType is connectSuccess or connectError', () => {
      [
        ringoutActionTypes.connectSuccess,
        ringoutActionTypes.connectError,
      ].forEach(type => {
        expect(reducer('foo', {
          type,
        })).to.equal(ringoutStatus.idle);
      });
    });
    it('should return connecting status if actionType is startToConnect', () => {
      [
        ringoutActionTypes.startToConnect,
      ].forEach(type => {
        expect(reducer('foo', {
          type,
        })).to.equal(ringoutStatus.connecting);
      });
    });
  });
  describe('getRingoutReducer', () => {
    it('should be a function', () => {
      expect(getRingoutReducer).to.be.a('function');
    });
    it('should return a reducer', () => {
      const reducer = getRingoutReducer();
      const moduleStatusReducer = getModuleStatusReducer();
      const ringoutStatusReducer = getRingoutStatusReducer();
      it('should return combined state', () => {
        expect(reducer(undefined, {}))
          .to.deep.equal({
            status: moduleStatusReducer(undefined, {}),
            ringoutStatus: ringoutStatusReducer(undefined, {})
          });
      });
    });
  });
});
