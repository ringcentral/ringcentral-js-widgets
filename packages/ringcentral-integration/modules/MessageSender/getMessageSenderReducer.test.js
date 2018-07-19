import { expect } from 'chai';
import { getMessageSenderStatusReducer } from './getMessageSenderReducer';

import messageSenderActionTypes from './messageSenderActionTypes';
import messageSenderStatus from './messageSenderStatus';

describe('MessageSender :: getMessageSenderStatusReducer', () => {
  it('getMessageSenderStatusReducer should be a function', () => {
    expect(getMessageSenderStatusReducer).to.be.a('function');
  });
  it('getMessageSenderStatusReducer should return a reducer', () => {
    expect(getMessageSenderStatusReducer()).to.be.a('function');
  });
  describe('statusReducer', () => {
    const reducer = getMessageSenderStatusReducer(messageSenderActionTypes);
    it('should have initial state of idle', () => {
      expect(reducer(undefined, {})).to.equal(messageSenderStatus.idle);
    });
    it('should return original state of actionTypes is not recognized', () => {
      const originalState = {};
      expect(reducer(originalState, { type: 'foo' }))
        .to.equal(originalState);
    });
    it('should return idle status on sendError and sendOver', () => {
      [
        messageSenderActionTypes.sendError,
        messageSenderActionTypes.sendOver,
      ].forEach((type) => {
        expect(reducer('foo', {
          type,
        })).to.equal(messageSenderStatus.idle);
      });
    });
    it('should return sending status on send', () => {
      expect(reducer('foo', {
        type: messageSenderActionTypes.send,
      })).to.equal(messageSenderStatus.sending);
    });
  });
});
