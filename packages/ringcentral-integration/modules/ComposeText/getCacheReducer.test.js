import { expect } from 'chai';
import getCacheReducer, {
  getSenderNumberReducer,
} from './getCacheReducer';

import composeTextActionTypes from './actionTypes';

describe('ComposeText :: Cache :: getSenderNumberReducer', () => {
  it('should be a function', () => {
    expect(getSenderNumberReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getSenderNumberReducer()).to.be.a('function');
  });
  describe('contactSearchReducer', () => {
    const reducer = getSenderNumberReducer(composeTextActionTypes);
    it('should have empty object for initial state ', () => {
      expect(reducer(undefined, {})).to.deep.equal(null);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = '123';
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });

    it('should return phoneNumber string on updateSenderNumber', () => {
      const originalState = '';
      expect(reducer(originalState, {
        type: composeTextActionTypes.updateSenderNumber,
        number: '12345678'
      })).to.equal('12345678');
    });

    it('should return null on cleanUp', () => {
      [
        composeTextActionTypes.cleanUp,
      ].forEach(type => {
        const originalState = '12345678';
        expect(reducer(originalState, {
          type,
        })).to.deep.equal(null);
      });
    });
  });
});

describe('ComposeText :: Cache:: getCacheReducer', () => {
  it('should be a function', () => {
    expect(getCacheReducer).to.be.a('function');
  });
  it('should return a reducer', () => {
    expect(getCacheReducer(composeTextActionTypes)).to.be.a('function');
  });
  describe('contactSearchReducer', () => {
    const reducer = getCacheReducer(composeTextActionTypes);
    const senderNumberReducer = getSenderNumberReducer(composeTextActionTypes);
    it('should return combined state', () => {
      expect(reducer(undefined, {}))
        .to.deep.equal({
          senderNumber: senderNumberReducer(undefined, {})
        });
    });
  });
});
