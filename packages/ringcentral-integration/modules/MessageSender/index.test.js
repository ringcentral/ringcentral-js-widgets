import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import MessageSender from './index';
import getMessageSenderReducer from './getMessageSenderReducer';
import actionTypes from './messageSenderActionTypes';
import messageSenderMessages from './messageSenderMessages';

describe('MessageSender Unit Test', () => {
  let messageSender;
  let store;

  beforeEach(() => {
    messageSender = sinon.createStubInstance(MessageSender);
    store = createStore(getMessageSenderReducer(actionTypes));
    messageSender._store = store;
    messageSender._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldReset',
      '_initModuleStatus',
      '_resetModuleStatus',
      '_alertWarning',
      '_validateText',
      '_validateToNumbersIsEmpty',
      '_validateSenderNumber',
      '_alertInvalidRecipientErrors',
      '_validateToNumbers',
      '_sendSms',
      '_sendPager',
      '_onSendError',
      'send',
    ].forEach((key) => {
      messageSender[key].restore();
    });
  });

  describe('_onStateChange', () => {
    it('_initModuleStatus should be called once when _shouldInit is true', () => {
      sinon.stub(messageSender, '_shouldInit').callsFake(() => true);
      sinon.stub(messageSender, '_shouldReset').callsFake(() => false);
      sinon.stub(messageSender, '_initModuleStatus');
      sinon.stub(messageSender, '_resetModuleStatus');
      messageSender._onStateChange();
      sinon.assert.calledOnce(messageSender._initModuleStatus);
      sinon.assert.notCalled(messageSender._resetModuleStatus);
    });

    it('_resetModuleStatus should be called once when _shouldReset is true', () => {
      sinon.stub(messageSender, '_shouldInit').callsFake(() => false);
      sinon.stub(messageSender, '_shouldReset').callsFake(() => true);
      sinon.stub(messageSender, '_resetModuleStatus');
      sinon.stub(messageSender, '_initModuleStatus');
      messageSender._onStateChange();
      sinon.assert.notCalled(messageSender._initModuleStatus);
      sinon.assert.calledOnce(messageSender._resetModuleStatus);
    });

    it('_initModuleStatus and _resetModuleStatus should Not be called', () => {
      sinon.stub(messageSender, '_shouldInit').callsFake(() => false);
      sinon.stub(messageSender, '_shouldReset').callsFake(() => false);
      sinon.stub(messageSender, '_resetModuleStatus');
      sinon.stub(messageSender, '_initModuleStatus');
      messageSender._onStateChange();
      sinon.assert.notCalled(messageSender._resetModuleStatus);
      sinon.assert.notCalled(messageSender._initModuleStatus);
    });
  });

  describe('_shouldInit', () => {
    describe('when messageSender is not ready', () => {
      beforeEach(() => {
        sinon.stub(messageSender, 'ready', { get: () => false });
      });

      it('Should return true when _extensionPhoneNumber and _extensionInfo is all ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: true
        };
        messageSender._extensionInfo = {
          ready: true
        };
        expect(messageSender._shouldInit()).to.equal(true);
      });

      it('Should return false when _extensionPhoneNumber and _extensionInfo is all not ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: false
        };
        messageSender._extensionInfo = {
          ready: false
        };
        expect(messageSender._shouldInit()).to.equal(false);
      });

      it('Should return false when _extensionPhoneNumber is not ready and _extensionInfo is ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: false
        };
        messageSender._extensionInfo = {
          ready: true
        };
        expect(messageSender._shouldInit()).to.equal(false);
      });

      it('Should return false when _extensionInfo is not ready and _extensionPhoneNumber is ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: true
        };
        messageSender._extensionInfo = {
          ready: false
        };
        expect(messageSender._shouldInit()).to.equal(false);
      });
    });

    describe('when messageSender is ready', () => {
      beforeEach(() => {
        sinon.stub(messageSender, 'ready', { get: () => true });
      });

      it('Should return false when _extensionInfo and _extensionPhoneNumber is all ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: true
        };
        messageSender._extensionInfo = {
          ready: true
        };
        expect(messageSender._shouldInit()).to.equal(false);
      });

      it('Should return false when  _extensionInfo is ready and _extensionPhoneNumber is not ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: false
        };
        messageSender._extensionInfo = {
          ready: true
        };
        expect(messageSender._shouldInit()).to.equal(false);
      });

      it('Should return false when _extensionPhoneNumber is ready and _extensionInfo is not ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: true
        };
        messageSender._extensionInfo = {
          ready: false
        };
        expect(messageSender._shouldInit()).to.equal(false);
      });

      it('Should return false when _extensionPhoneNumber and _extensionInfo is all not ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: false
        };
        messageSender._extensionInfo = {
          ready: false
        };
        expect(messageSender._shouldInit()).to.equal(false);
      });
    });
  });

  describe('_shouldReset', () => {
    describe('when messageSender is ready', () => {
      beforeEach(() => {
        sinon.stub(messageSender, 'ready', { get: () => true });
      });

      it('Should return true when _extensionPhoneNumber and _extensionInfo all not ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: false
        };
        messageSender._extensionInfo = {
          ready: false
        };
        expect(messageSender._shouldReset()).to.equal(true);
      });

      it('Should return true when _extensionInfo is ready and _extensionPhoneNumber is not ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: false
        };
        messageSender._extensionInfo = {
          ready: true
        };
        expect(messageSender._shouldReset()).to.equal(true);
      });

      it('Should return true when _extensionPhoneNumber is ready with _extensionInfo not ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: true
        };
        messageSender._extensionInfo = {
          ready: false
        };
        expect(messageSender._shouldReset()).to.equal(true);
      });

      it('Should return false when _extensionPhoneNumber and _extensionInfo all ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: true
        };
        messageSender._extensionInfo = {
          ready: true
        };
        expect(messageSender._shouldReset()).to.equal(false);
      });
    });

    describe('when messageSender is not ready', () => {
      beforeEach(() => {
        sinon.stub(messageSender, 'ready', { get: () => false });
      });

      it('Should return false when _extensionPhoneNumber and _extensionInfo is all ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: true
        };
        messageSender._extensionInfo = {
          ready: true
        };
        expect(messageSender._shouldReset()).to.equal(false);
      });

      it('Should return false when _extensionInfo is not ready and _extensionPhoneNumber is ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: true
        };
        messageSender._extensionInfo = {
          ready: false
        };
        expect(messageSender._shouldReset()).to.equal(false);
      });

      it('Should return false when _extensionPhoneNumber is not ready and _extensionInfo is ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: false
        };
        messageSender._extensionInfo = {
          ready: true
        };
        expect(messageSender._shouldReset()).to.equal(false);
      });

      it('Should return false when _extensionInfo and _extensionPhoneNumber is all not ready', () => {
        messageSender._extensionPhoneNumber = {
          ready: false
        };
        messageSender._extensionInfo = {
          ready: false
        };
        expect(messageSender._shouldReset()).to.equal(false);
      });
    });
  });

  describe('_alertWarning', () => {
    it('_alertWarning should return false when message is undefined', () => {
      messageSender._alert = {
        warning: () => null
      };
      const result = messageSender._alertWarning();
      expect(result).to.equal(false);
    });

    it('_alertWarning should return false when message is null', () => {
      messageSender._alert = {
        warning: () => null
      };
      const result = messageSender._alertWarning(null);
      expect(result).to.equal(false);
    });

    it('_alertWarning should return true', () => {
      messageSender._alert = {
        warning: () => null
      };
      const result = messageSender._alertWarning('warning');
      expect(result).to.equal(true);
    });
  });

  describe('_validateText', () => {
    it('should return true and not call warning', () => {
      sinon.stub(messageSender, '_alertWarning');
      const text = 'aaa';
      const result = messageSender._validateText(text);
      sinon.assert.notCalled(messageSender._alertWarning);
      expect(result).to.equal(true);
    });

    it('should return false and warning textEmpty when text is blank', () => {
      sinon.stub(messageSender, '_alertWarning');
      const result = messageSender._validateText('');
      sinon.assert.calledWith(messageSender._alertWarning, messageSenderMessages.textEmpty);
      expect(result).to.equal(false);
    });

    it('should return false and warning textEmpty when text is multi space', () => {
      sinon.stub(messageSender, '_alertWarning');
      const result = messageSender._validateText('  ');
      sinon.assert.calledWith(messageSender._alertWarning, messageSenderMessages.textEmpty);
      expect(result).to.equal(false);
    });

    it('should return false and warning textEmpty when text is null', () => {
      sinon.stub(messageSender, '_alertWarning');
      const result = messageSender._validateText(null);
      sinon.assert.calledWith(messageSender._alertWarning, messageSenderMessages.textEmpty);
      expect(result).to.equal(false);
    });

    it('should return false and warning textEmpty when text is undefined', () => {
      sinon.stub(messageSender, '_alertWarning');
      const result = messageSender._validateText();
      sinon.assert.calledWith(messageSender._alertWarning, messageSenderMessages.textEmpty);
      expect(result).to.equal(false);
    });

    it('should return false and warning textTooLong when text length is over 1000', () => {
      sinon.stub(messageSender, '_alertWarning');
      const text = 'a'.repeat(1001);
      const result = messageSender._validateText(text);
      sinon.assert.calledWith(messageSender._alertWarning, messageSenderMessages.textTooLong);
      expect(result).to.equal(false);
    });

    it('should return true and not call warning when text length is 1000', () => {
      sinon.stub(messageSender, '_alertWarning');
      const text = 'a'.repeat(1000);
      const result = messageSender._validateText(text);
      sinon.assert.notCalled(messageSender._alertWarning);
      expect(result).to.equal(true);
    });
  });

  describe('_validateToNumbersIsEmpty', () => {
    it('should return false and not call warning', () => {
      sinon.stub(messageSender, '_alertWarning');
      const toNumbers = [1];
      const result = messageSender._validateToNumbersIsEmpty(toNumbers);
      sinon.assert.notCalled(messageSender._alertWarning);
      expect(result).to.equal(false);
    });

    it('should return true and warning recipientsEmpty', () => {
      sinon.stub(messageSender, '_alertWarning');
      const toNumbers = [];
      const result = messageSender._validateToNumbersIsEmpty(toNumbers);
      sinon.assert.calledWith(messageSender._alertWarning, messageSenderMessages.recipientsEmpty);
      expect(result).to.equal(true);
    });
  });

  describe('_validateSenderNumber', () => {
    it('should return true and not call warning', () => {
      sinon.stub(messageSender, '_alertWarning');
      const senderNumber = '1234567891';
      sinon.stub(messageSender, 'senderNumbersList', { get: () => [{ phoneNumber: '1234567891' }] });
      const result = messageSender._validateSenderNumber(senderNumber);
      sinon.assert.notCalled(messageSender._alertWarning);
      expect(result).to.equal(true);
    });

    it('should return false and warning senderNumberInvalid when senderNumber is blank', () => {
      sinon.stub(messageSender, '_alertWarning');
      const senderNumber = '';
      sinon.stub(messageSender, 'senderNumbersList', { get: () => [{ phoneNumber: '1234567891' }] });
      const result = messageSender._validateSenderNumber(senderNumber);
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.senderNumberInvalid
      );
      expect(result).to.equal(false);
    });

    it('should return false and warning senderNumberInvalid when senderNumber is null', () => {
      sinon.stub(messageSender, '_alertWarning');
      const senderNumber = null;
      sinon.stub(messageSender, 'senderNumbersList', { get: () => [{ phoneNumber: '1234567891' }] });
      const result = messageSender._validateSenderNumber(senderNumber);
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.senderNumberInvalid
      );
      expect(result).to.equal(false);
    });

    it('should return false and warning senderNumberInvalid when senderNumber is undefined', () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, 'senderNumbersList', { get: () => [{ phoneNumber: '1234567891' }] });
      const result = messageSender._validateSenderNumber();
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.senderNumberInvalid
      );
      expect(result).to.equal(false);
    });

    it(`should return false and warning senderNumberInvalid
      when senderNumber is not included in senderNumbersList`, () => {
      const senderNumber = '123456789';
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, 'senderNumbersList', { get: () => [{ phoneNumber: '1234567891' }] });
      const result = messageSender._validateSenderNumber(senderNumber);
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.senderNumberInvalid
      );
      expect(result).to.equal(false);
    });
  });

  describe('_alertInvalidRecipientErrors', () => {
    it('should return warning noAreaCode', () => {
      sinon.stub(messageSender, '_alertWarning');
      const errors = [
        { type: 'noAreaCode' }
      ];
      messageSender._alertInvalidRecipientErrors(errors);
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.noAreaCode
      );
    });

    it('should return warning noToNumber', () => {
      sinon.stub(messageSender, '_alertWarning');
      const errors = [
        { type: 'noToNumber' }
      ];
      messageSender._alertInvalidRecipientErrors(errors);
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.noToNumber
      );
    });

    it('should not warning anything', () => {
      sinon.stub(messageSender, '_alertWarning');
      const errors = [];
      messageSender._alertInvalidRecipientErrors(errors);
      sinon.assert.notCalled(messageSender._alertWarning);
    });

    it('should return warning recipientNumberInvalids', () => {
      sinon.stub(messageSender, '_alertWarning');
      const errors = [
        { type: 'aaa' }
      ];
      messageSender._alertInvalidRecipientErrors(errors);
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.recipientNumberInvalids
      );
    });
  });

  describe('_validateToNumbers', async () => {
    it('should return result false and warning recipientsEmpty', async () => {
      sinon.stub(messageSender, '_alertWarning');
      const toNumbers = [];
      const result = await messageSender._validateToNumbers(toNumbers);
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.recipientsEmpty
      );
      expect(result.result).to.equal(false);
    });

    it('should return result false and calledOnce _alertInvalidRecipientErrors', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_alertInvalidRecipientErrors');
      const toNumbers = ['6545666'];
      messageSender._numberValidate = {
        validateNumbers: () => ({
          result: false,
          errors: [{
            type: 'noAreaCode',
          }],
        }),
      };
      const result = await messageSender._validateToNumbers(toNumbers);
      sinon.assert.calledOnce(messageSender._alertInvalidRecipientErrors);
      expect(result.result).to.equal(false);
    });


    it(`should return result false and _alertWarning notAnExtension
        if subAddress is not a extension number`, async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_alertInvalidRecipientErrors');
      const toNumbers = ['1234567890*999'];
      messageSender._numberValidate = {
        validateNumbers: () => ({
          result: true,
          numbers: [{
            e164: '+1234567890',
            subAddress: '999'
          }]
        }),
        isCompanyExtension: () => false,
      };
      const result = await messageSender._validateToNumbers(toNumbers);
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.notAnExtension
      );
      expect(result.result).to.equal(false);
    });

    it('should return result true if subAddress is a included extension number', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_alertInvalidRecipientErrors');
      const toNumbers = ['1234567890*101'];
      messageSender._numberValidate = {
        validateNumbers: () => ({
          result: true,
          numbers: [{
            e164: '+1234567890',
            subAddress: '101'
          }]
        }),
        isCompanyExtension: () => true,
      };
      const result = await messageSender._validateToNumbers(toNumbers);
      sinon.assert.notCalled(messageSender._alertInvalidRecipientErrors);
      sinon.assert.notCalled(messageSender._alertWarning);
      expect(result.result).to.equal(true);
      expect(result.numbers).to.deep.equal(['101']);
    });

    it('should return result true and numbers', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_alertInvalidRecipientErrors');
      const toNumbers = ['1234567890'];
      messageSender._numberValidate = {
        validateNumbers: () => ({
          result: true,
          numbers: [{
            e164: '+1234567890'
          }]
        }),
      };
      const result = await messageSender._validateToNumbers(toNumbers);
      sinon.assert.notCalled(messageSender._alertInvalidRecipientErrors);
      expect(result.result).to.equal(true);
      expect(result.numbers).to.deep.equal(['+1234567890']);
    });

    it('should return result true and numbers not repeat', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_alertInvalidRecipientErrors');
      const toNumbers = ['1234567890', '1234567890'];
      messageSender._numberValidate = {
        validateNumbers: () => ({
          result: true,
          numbers: [{
            e164: '+1234567890'
          }]
        }),
      };
      const result = await messageSender._validateToNumbers(toNumbers);
      sinon.assert.notCalled(messageSender._alertInvalidRecipientErrors);
      expect(result.result).to.equal(true);
      expect(result.numbers).to.deep.equal(['+1234567890']);
    });
  });

  describe('send', async () => {
    it('should return null and warning textEmpty when text is blank', async () => {
      sinon.stub(messageSender, '_alertWarning');
      const toNumbers = ['+1234567890'];
      const fromNumber = '+11111';
      const text = '';
      const result = await messageSender.send({
        fromNumber,
        toNumbers,
        text,
      });
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.textEmpty
      );
      expect(result).to.equal(null);
    });

    it('should return null and warning textTooLong', async () => {
      sinon.stub(messageSender, '_alertWarning');
      const toNumbers = ['+1234567890'];
      const fromNumber = '+11111';
      const text = 'a'.repeat(1001);
      const result = await messageSender.send({
        fromNumber,
        toNumbers,
        text,
      });
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.textTooLong
      );
      expect(result).to.equal(null);
    });

    it('should return null and warning senderNumberInvalid', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_validateToNumbers').callsFake(
        toNumbers => ({ result: true, numbers: toNumbers })
      );
      const toNumbers = ['+1234567890'];
      const fromNumber = '+11111';
      const text = 'abc';
      sinon.stub(messageSender, 'senderNumbersList', { get: () => ['1234567891'] });
      const result = await messageSender.send({
        fromNumber,
        toNumbers,
        text,
      });
      sinon.assert.calledWith(
        messageSender._alertWarning,
        messageSenderMessages.senderNumberInvalid
      );
      expect(result).to.equal(null);
    });

    it('should catch error and call _onSendError when sendSms error', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_onSendError');
      sinon.stub(messageSender, '_validateToNumbers').callsFake(
        toNumbers => ({ result: true, numbers: toNumbers })
      );
      sinon.stub(messageSender, '_validateSenderNumber').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_sendSms').throws(new Error('error'));
      const toNumbers = ['+1234567890'];
      const fromNumber = '+1234567891';
      const text = 'abc';
      try {
        await messageSender.send({
          fromNumber,
          toNumbers,
          text,
        });
      } catch (error) {}
      sinon.assert.calledOnce(messageSender._sendSms);
      sinon.assert.calledOnce(messageSender._onSendError);
    });

    it('should call _sendSms and not call _sendPager', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_validateToNumbers').callsFake(
        toNumbers => ({ result: true, numbers: toNumbers })
      );
      sinon.stub(messageSender, '_validateSenderNumber').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_validateText').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_sendPager');
      sinon.stub(messageSender, '_sendSms').callsFake(() => ({ id: '123456' }));
      const toNumbers = ['+1234567890'];
      const fromNumber = '+1234567891';
      const text = 'abc';
      const result = await messageSender.send({
        fromNumber,
        toNumbers,
        text,
      });
      sinon.assert.calledOnce(messageSender._sendSms);
      sinon.assert.notCalled(messageSender._sendPager);
      expect(result).to.deep.equal([{ id: '123456' }]);
    });

    it('should not call _sendSms and call _sendPager', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_validateToNumbers').callsFake(
        toNumbers => ({ result: true, numbers: toNumbers })
      );
      sinon.stub(messageSender, '_validateSenderNumber').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_validateText').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_sendSms');
      sinon.stub(messageSender, '_sendPager').callsFake(() => ({ id: '1234567' }));
      const toNumbers = ['1234'];
      const fromNumber = '+1234567891';
      const text = 'abc';
      const result = await messageSender.send({
        fromNumber,
        toNumbers,
        text,
      });
      sinon.assert.notCalled(messageSender._sendSms);
      sinon.assert.calledOnce(messageSender._sendPager);
      expect(result).to.deep.equal([{ id: '1234567' }]);
    });

    it('should call _sendSms and _sendPager together', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_validateToNumbers').callsFake(
        toNumbers => ({ result: true, numbers: toNumbers })
      );
      sinon.stub(messageSender, '_validateSenderNumber').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_validateText').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_sendSms').callsFake(() => ({ id: '123456' }));
      sinon.stub(messageSender, '_sendPager').callsFake(() => ({ id: '1234567' }));
      const toNumbers = ['1234', '+1234567890'];
      const fromNumber = '+1234567891';
      const text = 'abc';
      const result = await messageSender.send({
        fromNumber,
        toNumbers,
        text,
      });
      sinon.assert.calledOnce(messageSender._sendSms);
      sinon.assert.calledOnce(messageSender._sendPager);
      expect(result).to.deep.equal([{ id: '1234567' }, { id: '123456' }]);
    });

    it('should call _sendSms twice', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_validateToNumbers').callsFake(
        toNumbers => ({ result: true, numbers: toNumbers })
      );
      sinon.stub(messageSender, '_validateSenderNumber').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_validateText').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_sendPager');
      sinon.stub(messageSender, '_sendSms').callsFake(() => ({ id: '123456' }));
      const toNumbers = ['+1234567890', '+1234567892'];
      const fromNumber = '+1234567891';
      const text = 'abc';
      const result = await messageSender.send({
        fromNumber,
        toNumbers,
        text,
      });
      sinon.assert.callCount(messageSender._sendSms, 2);
      expect(result).to.deep.equal([{ id: '123456' }, { id: '123456' }]);
    });

    it('should call _sendPager only once for multiply extensionNumbers', async () => {
      sinon.stub(messageSender, '_alertWarning');
      sinon.stub(messageSender, '_validateToNumbers').callsFake(
        toNumbers => ({ result: true, numbers: toNumbers })
      );
      sinon.stub(messageSender, '_validateSenderNumber').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_validateText').callsFake(
        () => true
      );
      sinon.stub(messageSender, '_sendPager').callsFake(() => ({ id: '123456' }));
      const toNumbers = ['1234', '4321'];
      const fromNumber = '+1234567891';
      const text = 'abc';
      const result = await messageSender.send({
        fromNumber,
        toNumbers,
        text,
      });
      sinon.assert.callCount(messageSender._sendPager, 1);
      expect(result).to.deep.equal([{ id: '123456' }]);
    });
  });
});
