import { expect } from 'chai';
import getComposeTextReducer, {
  getComposeTextStatusReducer,
  getSenderNumber,
  getTypingToNumber,
  getToNumbers,
  getMessageText,
} from './getComposeTextReducer';

import composeTextActionTypes from './actionTypes';
import composeTextStatus from './composeTextStatus';

describe('CompostText :: getSenderNumber', () => {
  it('getSenderNumber should be a function', () => {
    expect(getSenderNumber).to.be.a('function');
  });
  it('getSenderNumber should return a reducer', () => {
    expect(getSenderNumber()).to.be.a('function');
  });
  describe('senderNumberReducer', () => {
    const reducer = getSenderNumber(composeTextActionTypes);
    it('should have initial state of blank', () => {
      expect(reducer(undefined, {})).to.equal('');
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = '123';
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });
    it('should return phoneNumber string on updateSenderNumber', () => {
      [
        composeTextActionTypes.updateSenderNumber,
      ].forEach(type => {
        expect(reducer('123456', {
          type,
          number: '12345678'
        })).to.equal('12345678');
      });
    });
  });
});

describe('CompostText :: getTypingToNumber', () => {
  it('getTypingToNumber should be a function', () => {
    expect(getTypingToNumber).to.be.a('function');
  });
  it('getTypingToNumber should return a reducer', () => {
    expect(getTypingToNumber()).to.be.a('function');
  });
  describe('typingToNumberReducer', () => {
    const reducer = getTypingToNumber(composeTextActionTypes);
    it('should have initial state of blank', () => {
      expect(reducer(undefined, {})).to.equal('');
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = '123';
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });
    it('should return typing string on updateTypingToNumber', () => {
      [
        composeTextActionTypes.updateTypingToNumber,
      ].forEach(type => {
        expect(reducer('123456', {
          type,
          number: '12345678'
        })).to.equal('12345678');
      });
    });
    it('should return blank string on cleanTypingToNumber and clean', () => {
      [
        composeTextActionTypes.cleanTypingToNumber,
        composeTextActionTypes.clean,
      ].forEach(type => {
        expect(reducer('123456', {
          type,
        })).to.equal('');
      });
    });
  });
});

describe('CompostText :: getToNumbers', () => {
  it('getToNumbers should be a function', () => {
    expect(getToNumbers).to.be.a('function');
  });
  it('getToNumbers should return a reducer', () => {
    expect(getToNumbers()).to.be.a('function');
  });
  describe('toNumbersReducer', () => {
    const reducer = getToNumbers(composeTextActionTypes);
    it('should have initial state of empty array', () => {
      expect(reducer(undefined, {})).to.deep.equal([]);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = ['123'];
      expect(reducer(originalState, { type: 'foo' }))
      .to.deep.equal(originalState);
    });
    it('should return new array on addToNumber', () => {
      [
        composeTextActionTypes.addToNumber,
      ].forEach(type => {
        const originalState = [
          {
            phoneNumber: '123456',
          }
        ];
        const expectState = [
          {
            phoneNumber: '123456',
          },
          {
            phoneNumber: '12345678',
          }
        ];
        expect(reducer(originalState, {
          type,
          number: {
            phoneNumber: '12345678',
          }
        })).to.deep.equal(expectState);
      });
    });
    it('should return new array on addToNumber with not exist entity id', () => {
      [
        composeTextActionTypes.addToNumber,
      ].forEach(type => {
        const originalState = [
          {
            id: 'bbb',
            phoneNumber: '123456',
          }
        ];
        const expectState = [
          {
            id: 'bbb',
            phoneNumber: '123456',
          },
          {
            id: 'aaa',
            phoneNumber: '12345678',
          }
        ];
        expect(reducer(originalState, {
          type,
          number: {
            id: 'aaa',
            phoneNumber: '12345678',
          }
        })).to.deep.equal(expectState);
      });
    });
    it('should replace the toNumber on addToNumber even the phoneNumber exist but new entity id', () => {
      [
        composeTextActionTypes.addToNumber,
      ].forEach(type => {
        const originalState = [
          {
            id: 'bbb',
            phoneNumber: '123456',
          }
        ];
        const expectState = [
          {
            id: 'aaa',
            phoneNumber: '123456',
          }
        ];
        expect(reducer(originalState, {
          type,
          number: {
            id: 'aaa',
            phoneNumber: '123456',
          }
        })).to.deep.equal(expectState);
      });
    });
    it('should return old array on addToNumber with phoneNumber exsit', () => {
      [
        composeTextActionTypes.addToNumber,
      ].forEach(type => {
        const originalState = [
          {
            phoneNumber: '123456',
          }
        ];
        expect(reducer(originalState, {
          type,
          number: {
            phoneNumber: '123456',
          }
        })).to.deep.equal(originalState);
      });
    });
    it('should return new array without appointed phoneNumber on removeToNumber', () => {
      [
        composeTextActionTypes.removeToNumber,
      ].forEach(type => {
        const originalState = [
          {
            phoneNumber: '123456',
          }
        ];
        expect(reducer(originalState, {
          type,
          number: {
            phoneNumber: '123456',
          }
        })).to.deep.equal([]);
      });
    });
    it('should return blank string on clean', () => {
      [
        composeTextActionTypes.clean,
      ].forEach(type => {
        const originalState = [
          {
            phoneNumber: '123456',
          }
        ];
        expect(reducer(originalState, {
          type,
        })).to.deep.equal([]);
      });
    });
  });
});

describe('CompostText :: getMessageText', () => {
  it('getMessageText should be a function', () => {
    expect(getMessageText).to.be.a('function');
  });
  it('getMessageText should return a reducer', () => {
    expect(getMessageText()).to.be.a('function');
  });
  describe('messageTextReducer', () => {
    const reducer = getMessageText(composeTextActionTypes);
    it('should have initial state of blank', () => {
      expect(reducer(undefined, {})).to.equal('');
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = '123';
      expect(reducer(originalState, { type: 'foo' }))
      .to.equal(originalState);
    });
    it('should return typing string on updateMessageText', () => {
      [
        composeTextActionTypes.updateMessageText,
      ].forEach(type => {
        expect(reducer('123456', {
          type,
          text: '12345678'
        })).to.equal('12345678');
      });
    });
    it('should return blank string on clean', () => {
      [
        composeTextActionTypes.clean,
      ].forEach(type => {
        expect(reducer('123456', {
          type,
        })).to.equal('');
      });
    });
  });
});

