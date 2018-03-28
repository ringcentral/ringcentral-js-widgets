import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import ComposeText from './index';
import getComposeTextReducer from './getComposeTextReducer';
import actionTypes from './actionTypes';
import messageSenderMessages from '../MessageSender/messageSenderMessages';

describe('ComposeText Unit Test', () => {
  let composeText;
  let store;

  beforeEach(() => {
    composeText = sinon.createStubInstance(ComposeText);
    store = createStore(getComposeTextReducer(actionTypes));
    composeText._store = store;
    composeText._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldReset',
      '_shouldHandleRecipient',
      '_handleRecipient',
      '_initSenderNumber',
      '_resetModuleStatus',
      '_alertWarning',
      '_validatePhoneNumber',
      'send',
      'updateSenderNumber',
      'updateTypingToNumber',
      'cleanTypingToNumber',
      'addToNumber',
      'removeToNumber',
      'updateMessageText',
      'clean',
    ].forEach((key) => {
      composeText[key].restore();
    });
  });

  describe('_onStateChange', () => {
    it('_initSenderNumber and clean should be called once', () => {
      composeText._messageSender = {
        senderNumbersList: [{ phoneNumber: '+1234567890'}]
      };
      composeText.senderNumbersList = [{ phoneNumber: '+1234567890'}];
      sinon.stub(composeText, 'ready', { get: () => false });
      sinon.stub(composeText, '_shouldInit').callsFake(() => true);
      sinon.stub(composeText, '_shouldHandleRecipient').callsFake(() => false);
      sinon.stub(composeText, '_shouldReset').callsFake(() => false);
      composeText._auth = {
        isFreshLogin: true
      };
      sinon.stub(composeText, '_initSenderNumber');
      sinon.stub(composeText, '_handleRecipient');
      sinon.stub(composeText, '_resetModuleStatus');
      sinon.stub(composeText, 'clean');
      composeText._onStateChange();
      sinon.assert.calledOnce(composeText._initSenderNumber);
      sinon.assert.notCalled(composeText._handleRecipient);
      sinon.assert.notCalled(composeText._resetModuleStatus);
      sinon.assert.calledOnce(composeText.clean);
    });
    it('_initSenderNumber should be called once', () => {
      composeText._messageSender = {
        senderNumbersList: [{ phoneNumber: '+1234567890'}]
      };
      composeText.senderNumbersList = [{ phoneNumber: '+1234567890'}];
      sinon.stub(composeText, 'ready', { get: () => false });

      sinon.stub(composeText, '_shouldInit').callsFake(() => true);
      sinon.stub(composeText, '_shouldHandleRecipient').callsFake(() => false);
      sinon.stub(composeText, '_shouldReset').callsFake(() => false);
      composeText._auth = {
        isFreshLogin: false
      };
      sinon.stub(composeText, '_initSenderNumber');
      sinon.stub(composeText, '_handleRecipient');
      sinon.stub(composeText, '_resetModuleStatus');
      sinon.stub(composeText, 'clean');
      composeText._onStateChange();
      sinon.assert.calledOnce(composeText._initSenderNumber);
      sinon.assert.notCalled(composeText._handleRecipient);
      sinon.assert.notCalled(composeText._resetModuleStatus);
      sinon.assert.notCalled(composeText.clean);
    });
    it('_handleRecipient should be called once', () => {
      composeText._messageSender = {
        senderNumbersList: [{ phoneNumber: '+1234567890'}]
      };
      composeText.senderNumbersList = [{ phoneNumber: '+1234567890'}];
      sinon.stub(composeText, 'ready', { get: () => false });

      sinon.stub(composeText, '_shouldInit').callsFake(() => false);
      sinon.stub(composeText, '_shouldHandleRecipient').callsFake(() => true);
      sinon.stub(composeText, '_shouldReset').callsFake(() => false);
      composeText._auth = {
        isFreshLogin: true
      };
      sinon.stub(composeText, '_resetModuleStatus');
      sinon.stub(composeText, '_initSenderNumber');
      sinon.stub(composeText, '_handleRecipient');
      sinon.stub(composeText, 'clean');
      composeText._onStateChange();
      sinon.assert.notCalled(composeText._initSenderNumber);
      sinon.assert.calledOnce(composeText._handleRecipient);
      sinon.assert.notCalled(composeText._resetModuleStatus);
      sinon.assert.notCalled(composeText.clean);
    });
    it('_handleRecipient should be called once when _shouldHandleRecipient is true', () => {
      composeText._messageSender = {
        senderNumbersList: [{ phoneNumber: '+1234567890'}]
      };
      composeText.senderNumbersList = [{ phoneNumber: '+1234567890'}];
      sinon.stub(composeText, 'ready', { get: () => false });

      sinon.stub(composeText, '_shouldInit').callsFake(() => false);
      sinon.stub(composeText, '_shouldHandleRecipient').callsFake(() => true);
      sinon.stub(composeText, '_shouldReset').callsFake(() => false);
      composeText._auth = {
        isFreshLogin: false
      };
      sinon.stub(composeText, '_resetModuleStatus');
      sinon.stub(composeText, '_initSenderNumber');
      sinon.stub(composeText, '_handleRecipient');
      sinon.stub(composeText, 'clean');
      composeText._onStateChange();
      sinon.assert.notCalled(composeText._initSenderNumber);
      sinon.assert.calledOnce(composeText._handleRecipient);
      sinon.assert.notCalled(composeText._resetModuleStatus);
      sinon.assert.notCalled(composeText.clean);
    });
    it('_resetModuleStatus should be called once', () => {
      composeText._messageSender = {
        senderNumbersList: [{ phoneNumber: '+1234567890'}]
      };
      composeText.senderNumbersList = [{ phoneNumber: '+1234567890'}];
      sinon.stub(composeText, 'ready', { get: () => false });

      sinon.stub(composeText, '_shouldInit').callsFake(() => false);
      sinon.stub(composeText, '_shouldHandleRecipient').callsFake(() => false);
      sinon.stub(composeText, '_shouldReset').callsFake(() => true);
      composeText._auth = {
        isFreshLogin: true
      };
      sinon.stub(composeText, '_resetModuleStatus');
      sinon.stub(composeText, '_initSenderNumber');
      sinon.stub(composeText, '_handleRecipient');
      sinon.stub(composeText, 'clean');
      composeText._onStateChange();
      sinon.assert.notCalled(composeText._initSenderNumber);
      sinon.assert.notCalled(composeText._handleRecipient);
      sinon.assert.calledOnce(composeText._resetModuleStatus);
      sinon.assert.notCalled(composeText.clean);
    });
    it('_resetModuleStatus should be called once when _shouldReset is true', () => {
      composeText._messageSender = {
        senderNumbersList: [{ phoneNumber: '+1234567890'}]
      };
      composeText.senderNumbersList = [{ phoneNumber: '+1234567890'}];
      sinon.stub(composeText, 'ready', { get: () => false });

      sinon.stub(composeText, '_shouldInit').callsFake(() => false);
      sinon.stub(composeText, '_shouldHandleRecipient').callsFake(() => false);
      sinon.stub(composeText, '_shouldReset').callsFake(() => true);
      composeText._auth = {
        isFreshLogin: false
      };
      sinon.stub(composeText, '_resetModuleStatus');
      sinon.stub(composeText, '_initSenderNumber');
      sinon.stub(composeText, '_handleRecipient');
      sinon.stub(composeText, 'clean');
      composeText._onStateChange();
      sinon.assert.notCalled(composeText._initSenderNumber);
      sinon.assert.notCalled(composeText._handleRecipient);
      sinon.assert.calledOnce(composeText._resetModuleStatus);
      sinon.assert.notCalled(composeText.clean);
    });
    it('_initSenderNumber and _resetModuleStatus and _handleRecipient and clean should Not be called', () => {
      composeText._messageSender = {
        senderNumbersList: [{ phoneNumber: '+1234567890'}]
      };
      composeText.senderNumbersList = [{ phoneNumber: '+1234567890'}];
      sinon.stub(composeText, 'ready', { get: () => false });

      sinon.stub(composeText, '_shouldInit').callsFake(() => false);
      sinon.stub(composeText, '_shouldReset').callsFake(() => false);
      sinon.stub(composeText, '_shouldHandleRecipient').callsFake(() => false);
      composeText._auth = {
        isFreshLogin: true
      };
      sinon.stub(composeText, '_resetModuleStatus');
      sinon.stub(composeText, '_initSenderNumber');
      sinon.stub(composeText, '_handleRecipient');
      sinon.stub(composeText, 'clean');
      composeText._onStateChange();
      sinon.assert.notCalled(composeText._resetModuleStatus);
      sinon.assert.notCalled(composeText._initSenderNumber);
      sinon.assert.notCalled(composeText._handleRecipient);
      sinon.assert.notCalled(composeText.clean);
    });
    it('_initSenderNumber and _resetModuleStatus and _shouldHandleRecipient and clean should Not be called', () => {
      composeText._messageSender = {
        senderNumbersList: [{ phoneNumber: '+1234567890'}]
      };
      composeText.senderNumbersList = [{ phoneNumber: '+1234567890'}];
      sinon.stub(composeText, 'ready', { get: () => false });

      sinon.stub(composeText, '_shouldInit').callsFake(() => false);
      sinon.stub(composeText, '_shouldReset').callsFake(() => false);
      sinon.stub(composeText, '_shouldHandleRecipient').callsFake(() => false);
      composeText._auth = {
        isFreshLogin: false
      };
      sinon.stub(composeText, '_resetModuleStatus');
      sinon.stub(composeText, '_initSenderNumber');
      sinon.stub(composeText, '_handleRecipient');
      sinon.stub(composeText, 'clean');
      composeText._onStateChange();
      sinon.assert.notCalled(composeText._resetModuleStatus);
      sinon.assert.notCalled(composeText._initSenderNumber);
      sinon.assert.notCalled(composeText._handleRecipient);
      sinon.assert.notCalled(composeText.clean);
    });
  });

  describe('_shouldInit', () => {
    describe('when composeText is not ready', () => {
      beforeEach(() => {
        sinon.stub(composeText, 'ready', { get: () => false });
      });
      it('Should return true when _messageSender is ready and _auth is ready', () => {
        composeText._messageSender = {
          ready: true
        };
        composeText._auth = {
          ready: true
        };
        expect(composeText._shouldInit()).to.equal(true);
      });

      it('Should return false when _messageSender is not ready and _auth is ready', () => {
        composeText._messageSender = {
          ready: false
        };
        composeText._auth = {
          ready: true
        };
        expect(composeText._shouldInit()).to.equal(false);
      });
      it('Should return false when _messageSender is ready and auth is not ready', () => {
        composeText._messageSender = {
          ready: true
        };
        composeText._auth = {
          ready: false
        };
        expect(composeText._shouldInit()).to.equal(false);
      });
      it('Should return false when _messageSender is not ready and auth is not ready', () => {
        composeText._messageSender = {
          ready: false
        };
        composeText._auth = {
          ready: false
        };
        expect(composeText._shouldInit()).to.equal(false);
      });
    });
    describe('when composeText is ready', () => {
      beforeEach(() => {
        sinon.stub(composeText, 'ready', { get: () => true });
      });
      it('Should return false when _messageSender is ready and _auth is ready', () => {
        composeText._messageSender = {
          ready: true
        };
        composeText._auth = {
          ready: true
        };
        expect(composeText._shouldInit()).to.equal(false);
      });
      it('Should return false when  _messageSender is ready and _auth is not ready', () => {
        composeText._messageSender = {
          ready: true
        };
        composeText._auth = {
          ready: false
        };
        expect(composeText._shouldInit()).to.equal(false);
      });
      it('Should return false when _messageSender is not ready and _auth is ready', () => {
        composeText._messageSender = {
          ready: false
        };
        composeText._auth = {
          ready: true
        };
        expect(composeText._shouldInit()).to.equal(false);
      });
      it('Should return false when _messageSender is not ready and _auth is not ready', () => {
        composeText._messageSender = {
          ready: false
        };
        composeText._auth = {
          ready: false
        };
        expect(composeText._shouldInit()).to.equal(false);
      });
    });
  });

  describe('_shouldReset', () => {
    it('Should return true when composeText is ready and _messageSender is not ready', () => {
      composeText._messageSender = {
        ready: false
      };
      sinon.stub(composeText, 'ready', { get: () => true });
      expect(composeText._shouldReset()).to.equal(true);
    });

    it('Should return false when composeText is ready and _messageSender is ready', () => {
      composeText._messageSender = {
        ready: true
      };
      sinon.stub(composeText, 'ready', { get: () => true });
      expect(composeText._shouldReset()).to.equal(false);
    });

    it('Should return false when composeText is not ready and _messageSender is ready', () => {
      composeText._messageSender = {
        ready: true
      };
      sinon.stub(composeText, 'ready', { get: () => false });
      expect(composeText._shouldReset()).to.equal(false);
    });

    it('Should return false when composeText is not ready and _messageSender is not ready', () => {
      composeText._messageSender = {
        ready: false
      };
      sinon.stub(composeText, 'ready', { get: () => false });
      expect(composeText._shouldReset()).to.equal(false);
    });
  });

  describe('_initSenderNumber', () => {
    it('Should return call updateSenderNumber with user\'s first senderNumber', () => {
      composeText._messageSender = {
        senderNumbersList: [{ phoneNumber: '+1234567890'}]
      };
      sinon.stub(composeText, 'cache', { get: () => ({}) });
      sinon.stub(composeText, 'updateSenderNumber');
      composeText._initSenderNumber();
      sinon.assert.calledWith(composeText.updateSenderNumber, '+1234567890');
    });

    it('Should return call updateSenderNumber with undefined', () => {
      composeText._messageSender = {
        senderNumbersList: []
      };
      sinon.stub(composeText, 'updateSenderNumber');
      sinon.stub(composeText, 'cache', { get: () => ({}) });
      composeText._initSenderNumber();
      sinon.assert.calledWith(composeText.updateSenderNumber, undefined);
    });

    it('Should return call updateSenderNumber with cachedPhoneNumber', () => {
      sinon.stub(composeText, 'cache', { get: () => ({ senderNumber: '+1234567891' }) });
      sinon.stub(composeText, 'updateSenderNumber');
      composeText._initSenderNumber();
      sinon.assert.calledWith(composeText.updateSenderNumber, '+1234567891');
    });
  });

  describe('_alertWarning', () => {
    it('_alertWarning should return false when message is undefined', () => {
      composeText._alert = {
        warning: () => null
      };
      const result = composeText._alertWarning();
      expect(result).to.equal(false);
    });

    it('_alertWarning should return false when message is null', () => {
      composeText._alert = {
        warning: () => null
      };
      const result = composeText._alertWarning(null);
      expect(result).to.equal(false);
    });

    it('_alertWarning should return true', () => {
      composeText._alert = {
        warning: () => null
      };
      const result = composeText._alertWarning('warning');
      expect(result).to.equal(true);
    });
  });

  describe('_validatePhoneNumber', () => {
    it('_validatePhoneNumber should return false and alert warning when validateFormat error', () => {
      composeText._numberValidate = {
        validateFormat: () => ({
          result: false,
          errors: [{
            type: 'noAreaCode',
          }],
        })
      };
      sinon.stub(composeText, '_alertWarning');
      const result = composeText._validatePhoneNumber('6545666');
      sinon.assert.calledWith(
        composeText._alertWarning,
        messageSenderMessages.noAreaCode
      );
      expect(result).to.equal(false);
    });

    it('_validatePhoneNumber should return true and not warning when validateFormat success', () => {
      composeText._numberValidate = {
        validateFormat: () => ({
          result: true,
        })
      };
      sinon.stub(composeText, '_alertWarning');
      const result = composeText._validatePhoneNumber('1234');
      sinon.assert.notCalled(composeText._alertWarning);
      expect(result).to.equal(true);
    });

    it('_validatePhoneNumber should return false and alert warning recipientNumberInvalids when validateFormat failed', () => {
      composeText._numberValidate = {
        validateFormat: () => ({
          result: false,
          errors: [{
            type: 'abc',
          }],
        })
      };
      sinon.stub(composeText, '_alertWarning');
      const result = composeText._validatePhoneNumber('');
      sinon.assert.calledWith(
        composeText._alertWarning,
        messageSenderMessages.recipientNumberInvalids
      );
      expect(result).to.equal(false);
    });
  });

  describe('send', () => {
    it('should call success and return response', async () => {
      composeText._messageSender = {
        send: ({ fromNumber, toNumbers, text }) =>
          ({ id: '123456', fromNumber, toNumbers, text })
      };
      sinon.stub(composeText, 'messageText', { get: () => 'abc' });
      sinon.stub(composeText, 'typingToNumber', { get: () => '' });
      sinon.stub(composeText, 'senderNumber', { get: () => '+1234567890' });
      sinon.stub(composeText, 'toNumbers', { get: () => [{ phoneNumber: '12345' }] });
      const result = await composeText.send();
      expect(result.id).to.equal('123456');
    });

    it('should add typingToNumber to toNumbers', async () => {
      composeText._messageSender = {
        send: ({ fromNumber, toNumbers, text }) =>
          ({ id: '1234567', fromNumber, toNumbers, text })
      };
      sinon.stub(composeText, '_validatePhoneNumber').callsFake(
        () => true
      );
      sinon.stub(composeText, 'messageText', { get: () => 'abc' });
      sinon.stub(composeText, 'typingToNumber', { get: () => '123' });
      sinon.stub(composeText, 'senderNumber', { get: () => '+1234567890' });
      sinon.stub(composeText, 'toNumbers', { get: () => [{ phoneNumber: '12345' }] });
      const result = await composeText.send();
      expect(result.toNumbers).to.deep.equal(['12345', '123']);
    });

    it('should return null when _validatePhoneNumber failed', async () => {
      composeText._messageSender = {
        send: ({ fromNumber, toNumbers, text }) =>
          ({ id: '1234567', fromNumber, toNumbers, text })
      };
      sinon.stub(composeText, '_validatePhoneNumber').callsFake(
        () => false
      );
      sinon.stub(composeText, 'messageText', { get: () => 'abc' });
      sinon.stub(composeText, 'typingToNumber', { get: () => '123' });
      sinon.stub(composeText, 'senderNumber', { get: () => '+1234567890' });
      sinon.stub(composeText, 'toNumbers', { get: () => [{ phoneNumber: '12345' }] });
      const result = await composeText.send();
      expect(result).to.equal(null);
    });
  });

  describe('updateSenderNumber', () => {
    it('should update senderNumber success', () => {
      composeText.updateSenderNumber('1234');
      expect(store.getState().senderNumber).to.equal('1234');
    });

    it('should update senderNumber blank when number is null', () => {
      composeText.updateSenderNumber(null);
      expect(store.getState().senderNumber).to.equal('');
    });

    it('should update senderNumber blank when number is undefined', () => {
      composeText.updateSenderNumber();
      expect(store.getState().senderNumber).to.equal('');
    });
  });

  describe('updateTypingToNumber', () => {
    it('should update typingToNumber success', () => {
      composeText.updateTypingToNumber('1234');
      expect(store.getState().typingToNumber).to.equal('1234');
    });

    it('should warning recipientNumberInvalids when number length over 30', () => {
      sinon.stub(composeText, '_alertWarning');
      composeText.updateTypingToNumber('a'.repeat(31));
      sinon.assert.calledWith(
        composeText._alertWarning,
        messageSenderMessages.recipientNumberInvalids
      );
    });
  });

  describe('addToNumber', () => {
    it('should add number to toNumbers success', () => {
      sinon.stub(composeText, '_validatePhoneNumber').callsFake(
        () => true
      );
      composeText.addToNumber({ phoneNumber: '1234' });
      expect(store.getState().toNumbers).to.deep.equal([{ phoneNumber: '1234' }]);
    });

    it('should return and not call _validatePhoneNumber when number.phoneNumber is blank', () => {
      sinon.stub(composeText, '_validatePhoneNumber');
      composeText.addToNumber({ phoneNumber: '' });
      sinon.assert.notCalled(composeText._validatePhoneNumber);
    });

    it('should return and not add to toNumbers when _validatePhoneNumber failed', () => {
      sinon.stub(composeText, '_validatePhoneNumber').callsFake(
        () => false
      );
      composeText.addToNumber({ phoneNumber: '1234' });
      expect(store.getState().toNumbers).to.not.deep.equal([{ phoneNumber: '1234' }]);
    });
  });

  describe('updateMessageText', () => {
    it('should update messageText success', () => {
      composeText.updateMessageText('abcd');
      expect(store.getState().messageText).to.equal('abcd');
    });

    it('should warning textTooLong when number length over 1000', () => {
      sinon.stub(composeText, '_alertWarning');
      composeText.updateMessageText('a'.repeat(1001));
      sinon.assert.calledWith(
        composeText._alertWarning,
        messageSenderMessages.textTooLong
      );
    });
  });
});
