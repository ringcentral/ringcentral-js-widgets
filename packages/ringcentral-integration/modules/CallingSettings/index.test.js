import { expect } from 'chai';
import sinon from 'sinon';
import { createStore } from 'redux';
import CallingSettings from './index';
import getCallingSettingsReducer from './getCallingSettingsReducer';
import actionTypes from './actionTypes';
import callingOptions from './callingOptions';
import callingSettingsMessages from './callingSettingsMessages';

describe('CallingSettings Unit Test', () => {
  let callingSettings;
  let store;
  beforeEach(() => {
    callingSettings = sinon.createStubInstance(CallingSettings);
    store = createStore(getCallingSettingsReducer(actionTypes));
    callingSettings._store = store;
    callingSettings._prefixedActionTypes = actionTypes;
    [
      '_onStateChange',
      '_shouldInit',
      '_shouldReset',
      '_shouldValidate',
      '_init',
      '_reset',
      '_initFromNumber',
      'updateFromNumber',
      '_setSoftPhoneToCallWith',
      '_validateSettings',
      '_hasWebphonePermissionRemoved',
      '_hasPermissionChanged',
      '_hasPhoneNumberChanged',
      '_warningEmergencyCallingNotAvailable',
      'setData'
    ].forEach((key) => {
      callingSettings[key].restore();
    });
  });
  describe('_onStateChange', async () => {
    it('_init should be called once when _shouldInit is true', async () => {
      sinon.stub(callingSettings, '_shouldInit').callsFake(() => true);
      sinon.stub(callingSettings, '_shouldReset').callsFake(() => false);
      sinon.stub(callingSettings, '_shouldValidate').callsFake(() => false);
      sinon.stub(callingSettings, '_init');
      sinon.stub(callingSettings, '_reset');
      sinon.stub(callingSettings, '_validateSettings');
      callingSettings._rolesAndPermissions = {
        ringoutEnabled: true,
        webphoneEnabled: true
      };
      sinon.stub(callingSettings, '_rolesAndPermissions');
      sinon.stub(callingSettings, 'myPhoneNumbers', { get: () => '456' });
      sinon.stub(callingSettings, 'otherPhoneNumbers', { get: () => '456' });
      await callingSettings._onStateChange();
      sinon.assert.calledOnce(callingSettings._init);
      sinon.assert.notCalled(callingSettings._reset);
      sinon.assert.notCalled(callingSettings._validateSettings);
    });
    it('_reset should be called once when _shouldReset is true', async () => {
      sinon.stub(callingSettings, '_shouldInit').callsFake(() => false);
      sinon.stub(callingSettings, '_shouldReset').callsFake(() => true);
      sinon.stub(callingSettings, '_shouldValidate').callsFake(() => false);
      sinon.stub(callingSettings, '_init');
      sinon.stub(callingSettings, '_reset');
      sinon.stub(callingSettings, '_validateSettings');
      callingSettings._rolesAndPermissions = {
        ringoutEnabled: true,
        webphoneEnabled: true
      };
      sinon.stub(callingSettings, '_rolesAndPermissions');
      sinon.stub(callingSettings, 'myPhoneNumbers', { get: () => '456' });
      sinon.stub(callingSettings, 'otherPhoneNumbers', { get: () => '456' });
      await callingSettings._onStateChange();
      sinon.assert.notCalled(callingSettings._init);
      sinon.assert.calledOnce(callingSettings._reset);
      sinon.assert.notCalled(callingSettings._validateSettings);
    });
    it('_validateSettings should be called once when _shouldValidate is true', async () => {
      sinon.stub(callingSettings, '_shouldInit').callsFake(() => false);
      sinon.stub(callingSettings, '_shouldReset').callsFake(() => false);
      sinon.stub(callingSettings, '_shouldValidate').callsFake(() => true);
      sinon.stub(callingSettings, '_init');
      sinon.stub(callingSettings, '_reset');
      sinon.stub(callingSettings, '_validateSettings');
      callingSettings._rolesAndPermissions = {
        ringoutEnabled: true,
        webphoneEnabled: true
      };
      sinon.stub(callingSettings, '_rolesAndPermissions');
      sinon.stub(callingSettings, 'myPhoneNumbers', { get: () => '456' });
      sinon.stub(callingSettings, 'otherPhoneNumbers', { get: () => '456' });
      await callingSettings._onStateChange();
      sinon.assert.notCalled(callingSettings._init);
      sinon.assert.notCalled(callingSettings._reset);
      sinon.assert.calledOnce(callingSettings._validateSettings);
    });
    it('_init and _reset and _validateSettings should not be called', async () => {
      sinon.stub(callingSettings, '_shouldInit').callsFake(() => false);
      sinon.stub(callingSettings, '_shouldReset').callsFake(() => false);
      sinon.stub(callingSettings, '_shouldValidate').callsFake(() => false);
      sinon.stub(callingSettings, '_init');
      sinon.stub(callingSettings, '_reset');
      sinon.stub(callingSettings, '_validateSettings');
      callingSettings._rolesAndPermissions = {
        ringoutEnabled: true,
        webphoneEnabled: true
      };
      sinon.stub(callingSettings, '_rolesAndPermissions');
      sinon.stub(callingSettings, 'myPhoneNumbers', { get: () => '456' });
      sinon.stub(callingSettings, 'otherPhoneNumbers', { get: () => '456' });
      await callingSettings._onStateChange();
      sinon.assert.notCalled(callingSettings._init);
      sinon.assert.notCalled(callingSettings._reset);
      sinon.assert.notCalled(callingSettings._validateSettings);
    });
  });
  function runBooleanTest(fn, variables = 1, args = []) {
    [true, false].forEach((value) => {
      if (variables <= 1) {
        fn(...[...args, value]);
      } else {
        runBooleanTest(fn, variables - 1, [...args, value]);
      }
    });
  }
  describe('_shouldInit', () => {
    runBooleanTest(
      (
        storageReady,
        extensionInfoReady,
        extensionPhoneNumberReady,
        forwardingNumberReady,
        rolesAndPermissionsReady,
        pending
      ) => {
        const result = (
          storageReady &&
          extensionInfoReady &&
          extensionPhoneNumberReady &&
          forwardingNumberReady &&
          rolesAndPermissionsReady &&
          pending
        );
        it(
          `should return ${result} when:
          storage.ready is ${storageReady} and
          extensionInfo.ready is ${extensionInfoReady} and
          extensionPhoneNumber.ready is ${extensionPhoneNumberReady} and
          forwardingNumber.ready is ${forwardingNumberReady} and
          rolesAndPermissions.ready is ${rolesAndPermissionsReady} and
          callingSettings.pending is ${pending}
          `,
          () => {
            callingSettings._storage = {
              ready: storageReady
            };
            callingSettings._extensionInfo = {
              ready: extensionInfoReady
            };
            callingSettings._extensionPhoneNumber = {
              ready: extensionPhoneNumberReady
            };
            callingSettings._forwardingNumber = {
              ready: forwardingNumberReady
            };
            callingSettings._rolesAndPermissions = {
              ready: rolesAndPermissionsReady
            };
            sinon.stub(callingSettings, 'pending', { get: () => pending });
            expect(callingSettings._shouldInit()).to.equal(result);
          }
        );
      },
      6
    );
  });
  describe('_shouldReset', () => {
    runBooleanTest(
      (
        ready,
        storageReady,
        extensionInfoReady,
        extensionPhoneNumberReady,
        forwardingNumberReady,
        rolesAndPermissionsReady,
      ) => {
        const result = (
          ready &&
          (
            !storageReady ||
            !extensionInfoReady ||
            !extensionPhoneNumberReady ||
            !forwardingNumberReady ||
            !rolesAndPermissionsReady
          )
        );
        it(
          `should return ${result} when:
          callingSettings.ready is ${ready}
          storage.ready is ${storageReady} and
          extensionInfo.ready is ${extensionInfoReady} and
          extensionPhoneNumber.ready is ${extensionPhoneNumberReady} and
          forwardingNumber.ready is ${forwardingNumberReady} and
          rolesAndPermissions.ready is ${rolesAndPermissionsReady}
          `,
          () => {
            sinon.stub(callingSettings, 'ready', { get: () => ready });
            callingSettings._storage = {
              ready: storageReady
            };
            callingSettings._extensionInfo = {
              ready: extensionInfoReady
            };
            callingSettings._extensionPhoneNumber = {
              ready: extensionPhoneNumberReady
            };
            callingSettings._forwardingNumber = {
              ready: forwardingNumberReady
            };
            callingSettings._rolesAndPermissions = {
              ready: rolesAndPermissionsReady
            };
            expect(callingSettings._shouldReset()).to.equal(result);
          }
        );
      },
      6
    );
  });
  describe('_shouldValidate', () => {
    runBooleanTest(
      (
        ready,
        ringoutEnabledChanged,
        webphoneEnabledChanged,
        myPhoneNumbersChanged,
        otherPhoneNumbersChanged,
      ) => {
        const result = (
          ready &&
          (
            ringoutEnabledChanged ||
            webphoneEnabledChanged ||
            myPhoneNumbersChanged ||
            otherPhoneNumbersChanged
          )
        );
        it(
          `should return ${result} when:
          callingSettings.ready is ${ready}
          callingSettings._ringoutEnabled is ${ringoutEnabledChanged ? 'not' : ''}
          equal to callingSettings._rolesAndPermissions.ringoutEnabled and
          callingSettings._webphoneEnabled is ${webphoneEnabledChanged ? 'not' : ''}
          equal to callingSettings._rolesAndPermissions.webphoneEnabled and
          callingSettings._myPhoneNumbers is ${myPhoneNumbersChanged ? 'not' : ''}
          equal to callingSettings.myPhoneNumbers and
          callingSettings._otherPhoneNumbers is ${myPhoneNumbersChanged ? 'not' : ''}
          equal to callingSettings.otherPhoneNumbers`,
          () => {
            sinon.stub(callingSettings, 'ready', { get: () => ready });
            callingSettings._rolesAndPermissions = {
              ringoutEnabled: true,
              webphoneEnabled: false,
            };
            sinon.stub(callingSettings, 'myPhoneNumbers', { get: () => '456' });
            sinon.stub(callingSettings, 'otherPhoneNumbers', { get: () => '456' });
            if (ringoutEnabledChanged) {
              callingSettings._ringoutEnabled = false;
            } else {
              callingSettings._ringoutEnabled = true;
            }
            if (webphoneEnabledChanged) {
              callingSettings._webphoneEnabled = true;
            } else {
              callingSettings._webphoneEnabled = false;
            }
            if (myPhoneNumbersChanged) {
              callingSettings._myPhoneNumbers = '123';
            } else {
              callingSettings._myPhoneNumbers = '456';
            }
            if (otherPhoneNumbersChanged) {
              callingSettings._otherPhoneNumbers = '123';
            } else {
              callingSettings._otherPhoneNumbers = '456';
            }
            expect(callingSettings._shouldValidate()).to.equal(result);
          }
        );
      },
      5
    );
  });
  describe('_initFromNumber', async () => {
    it('updateFromNumber should be called once when fromNumbers is equal to 0', async () => {
      sinon.stub(callingSettings, 'fromNumber', { get: () => 0 });
      sinon.stub(callingSettings, 'fromNumbers', { get: () => ['123'] });
      sinon.stub(callingSettings, 'updateFromNumber');
      await callingSettings._initFromNumber();
      sinon.assert.calledOnce(callingSettings.updateFromNumber);
    });
    it('updateFromNumber should not be called when from is not equal to 0', async () => {
      sinon.stub(callingSettings, 'fromNumber', { get: () => 1 });
      sinon.stub(callingSettings, 'fromNumbers', { get: () => ['123'] });
      sinon.stub(callingSettings, 'updateFromNumber');
      await callingSettings._initFromNumber();
      sinon.assert.notCalled(callingSettings.updateFromNumber);
    });
  });
  describe('_validateSettings', async () => {
    it(`setSoftPhoneToCallWith should be called once and should alert danger callingSettingsMessages.webphonePermissionRemoved
    when _hasWebphonePermissionRemoved is true`, async () => {
      sinon.stub(callingSettings, '_hasWebphonePermissionRemoved').callsFake(() => true);
      sinon.stub(callingSettings, '_hasPermissionChanged').callsFake(() => false);
      sinon.stub(callingSettings, '_hasPhoneNumberChanged').callsFake(() => false);
      sinon.stub(callingSettings, '_setSoftPhoneToCallWith');
      callingSettings._myPhoneNumbers = ['123'];
      callingSettings._alert = {
        danger: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callingSettings, '_alert');
      await callingSettings._validateSettings();
      sinon.assert.calledOnce(callingSettings._setSoftPhoneToCallWith);
      sinon.assert.calledWith(callingSettings._alert.danger,
        { message: callingSettingsMessages.webphonePermissionRemoved, ttl: 0 });
    });
    it(`setSoftPhoneToCallWith should be called once and should alert danger callingSettingsMessages.permissionChanged
    when _hasPermissionChanged is true`, async () => {
      sinon.stub(callingSettings, '_hasWebphonePermissionRemoved').callsFake(() => false);
      sinon.stub(callingSettings, '_hasPermissionChanged').callsFake(() => true);
      sinon.stub(callingSettings, '_hasPhoneNumberChanged').callsFake(() => false);
      sinon.stub(callingSettings, '_setSoftPhoneToCallWith');
      callingSettings._myPhoneNumbers = ['123'];
      callingSettings._alert = {
        danger: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callingSettings, '_alert');
      await callingSettings._validateSettings();
      sinon.assert.calledOnce(callingSettings._setSoftPhoneToCallWith);
      sinon.assert.calledWith(callingSettings._alert.danger,
        { message: callingSettingsMessages.permissionChanged, ttl: 0 });
    });
    it(`setSoftPhoneToCallWith should not be called and should alert danger callingSettingsMessages.phoneNumberChanged
    when _hasPhoneNumberChanged is true`, async () => {
      sinon.stub(callingSettings, '_hasWebphonePermissionRemoved').callsFake(() => false);
      sinon.stub(callingSettings, '_hasPermissionChanged').callsFake(() => false);
      sinon.stub(callingSettings, '_hasPhoneNumberChanged').callsFake(() => true);
      callingSettings._myPhoneNumbers = ['123'];
      sinon.stub(callingSettings, '_setSoftPhoneToCallWith');
      callingSettings._alert = {
        danger: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callingSettings, '_alert');
      await callingSettings._validateSettings();
      sinon.assert.notCalled(callingSettings._setSoftPhoneToCallWith);
      sinon.assert.calledWith(callingSettings._alert.danger,
        { message: callingSettingsMessages.phoneNumberChanged, ttl: 0 });
    });
    it('setSoftPhoneToCallWith and alert danger should not be called', async () => {
      sinon.stub(callingSettings, '_hasWebphonePermissionRemoved').callsFake(() => false);
      sinon.stub(callingSettings, '_hasPermissionChanged').callsFake(() => false);
      sinon.stub(callingSettings, '_hasPhoneNumberChanged').callsFake(() => false);
      sinon.stub(callingSettings, '_setSoftPhoneToCallWith');
      callingSettings._myPhoneNumbers = ['123'];
      callingSettings._alert = {
        danger: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callingSettings, '_alert');
      await callingSettings._validateSettings();
      sinon.assert.notCalled(callingSettings._setSoftPhoneToCallWith);
      sinon.assert.notCalled(callingSettings._alert.danger);
    });
  });
  describe('_hasWebphonePermissionRemoved', () => {
    it(`should return true when _webphoneEnabled is true and
    _webphone is false and callWith is equal to callingOptions.browser`, () => {
      callingSettings._webphoneEnabled = true;
      callingSettings._webphone = false;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.browser });
      expect(callingSettings._hasWebphonePermissionRemoved()).to.equal(true);
    });
    it(`should return true when _webphoneEnabled is false and
    _webphone is true and callWith is equal to callingOptions.browser`, () => {
      callingSettings._webphoneEnabled = false;
      callingSettings._webphone = true;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.browser });
      expect(callingSettings._hasWebphonePermissionRemoved()).to.equal(true);
    });
    it(`should return true when _webphoneEnabled is false and
    _webphone is false and callWith is equal to callingOptions.browser`, () => {
      callingSettings._webphoneEnabled = false;
      callingSettings._webphone = false;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.browser });
      expect(callingSettings._hasWebphonePermissionRemoved()).to.equal(true);
    });
    it(`should return false when _webphoneEnabled is true and
    _webphone is true and callWith is equal to callingOptions.browser`, () => {
      callingSettings._webphoneEnabled = true;
      callingSettings._webphone = true;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.browser });
      expect(callingSettings._hasWebphonePermissionRemoved()).to.equal(false);
    });
    it(`should return false when _webphoneEnabled is true and
    _webphone is false and callWith is not equal to callingOptions.browser`, () => {
      callingSettings._webphoneEnabled = true;
      callingSettings._webphone = false;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.softPhone });
      expect(callingSettings._hasWebphonePermissionRemoved()).to.equal(false);
    });
    it(`should return false when _webphoneEnabled is true and
    _webphone is true and callWith is not equal to callingOptions.browser`, () => {
      callingSettings._webphoneEnabled = true;
      callingSettings._webphone = true;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.softPhone });
      expect(callingSettings._hasWebphonePermissionRemoved()).to.equal(false);
    });
  });
  describe('_hasPermissionChanged', () => {
    it(`should return true when _ringoutEnabled is false and
    callWith is equal to callingOptions.myphone`, () => {
      callingSettings._ringoutEnabled = false;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.myphone });
      expect(callingSettings._hasPermissionChanged()).to.equal(true);
    });
    it(`should return true when _ringoutEnabled is false and
    callWith is equal to callingOptions.otherphone`, () => {
      callingSettings._ringoutEnabled = false;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.otherphone });
      expect(callingSettings._hasPermissionChanged()).to.equal(true);
    });
    it(`should return true when _ringoutEnabled is false and
    callWith is equal to callingOptions.customphone`, () => {
      callingSettings._ringoutEnabled = false;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.customphone });
      expect(callingSettings._hasPermissionChanged()).to.equal(true);
    });
    it(`should return false when _ringoutEnabled is false and
    callWith is not equal to callingOptions.myphone and callingOptions.otherphone and callingOptions.customphone`, () => {
      callingSettings._ringoutEnabled = false;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.browser });
      expect(callingSettings._hasPermissionChanged()).to.equal(false);
    });
    it(`should return false when _ringoutEnabled is true and
    callWith is equal to callingOptions.customphone`, () => {
      callingSettings._ringoutEnabled = true;
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.customphone });
      expect(callingSettings._hasPermissionChanged()).to.equal(false);
    });
  });
  describe('_hasPhoneNumberChanged', () => {
    it(`should return true when callWith is equal to callingOptions.otherphone and
    _otherPhoneNumbers index of myLocation is -1`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.otherphone });
      callingSettings._otherPhoneNumbers = '123';
      callingSettings._myPhoneNumbers = '123';
      sinon.stub(callingSettings, 'myLocation', { get: () => '456' });
      expect(callingSettings._hasPhoneNumberChanged()).to.equal(true);
    });
    it(`should return true when callWith is equal to callingOptions.myphone and
    _myPhoneNumbers index of myLocation is -1`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.myphone });
      callingSettings._otherPhoneNumbers = '123';
      callingSettings._myPhoneNumbers = '123';
      sinon.stub(callingSettings, 'myLocation', { get: () => '456' });
      expect(callingSettings._hasPhoneNumberChanged()).to.equal(true);
    });
    it(`should return false when callWith is not equal to callingOptions.otherphone and callingOptions.myphone and
    _myPhoneNumbers index of myLocation is -1`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.softphone });
      callingSettings._otherPhoneNumbers = '123';
      callingSettings._myPhoneNumbers = '123';
      sinon.stub(callingSettings, 'myLocation', { get: () => '456' });
      expect(callingSettings._hasPhoneNumberChanged()).to.equal(false);
    });
    it(`should return false when callWith is equal to callingOptions.otherphone and
    _otherPhoneNumbers index of myLocation is not equal to -1`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.otherphone });
      callingSettings._otherPhoneNumbers = '456';
      callingSettings._myPhoneNumbers = '123';
      sinon.stub(callingSettings, 'myLocation', { get: () => '456' });
      expect(callingSettings._hasPhoneNumberChanged()).to.equal(false);
    });
    it(`should return false when callWith is equal to callingOptions.myphone and
    _otherPhoneNumbers index of myLocation is not equal to -1`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.myphone });
      callingSettings._otherPhoneNumbers = '123';
      callingSettings._myPhoneNumbers = '456';
      sinon.stub(callingSettings, 'myLocation', { get: () => '456' });
      expect(callingSettings._hasPhoneNumberChanged()).to.equal(false);
    });
    it(`should return false when callWith is not equal to callingOptions.otherphone and callingOptions.myphone and
    _otherPhoneNumbers index of myLocation is not equal to -1`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.softphone });
      callingSettings._otherPhoneNumbers = '456';
      callingSettings._myPhoneNumbers = '456';
      sinon.stub(callingSettings, 'myLocation', { get: () => '456' });
      expect(callingSettings._hasPhoneNumberChanged()).to.equal(false);
    });
  });
  describe('_warningEmergencyCallingNotAvailable', () => {
    it(`should alert info callingSettingsMessages.emergencyCallingNotAvailable when
    callWith is equal to callingOptions.browser`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.browser });
      callingSettings._alert = {
        info: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callingSettings, '_alert');
      callingSettings._warningEmergencyCallingNotAvailable();
      sinon.assert.calledWith(callingSettings._alert.info,
        { message: callingSettingsMessages.emergencyCallingNotAvailable, ttl: 0 });
    });
    it(`should alert info callingSettingsMessages.emergencyCallingNotAvailable when
    callWith is not equal to callingOptions.browser`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.softphone });
      callingSettings._alert = {
        info: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callingSettings, '_alert');
      callingSettings._warningEmergencyCallingNotAvailable();
      sinon.assert.notCalled(callingSettings._alert.info);
    });
  });
  describe('setData', () => {
    it(`_warningEmergencyCallingNotAvailable should not be called and
    should alert info callingSettingsMessages.saveSuccessWithSoftphone when
    withPrompt is not equal to null and callWith is equal to callingOptions.softphone`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.softphone });
      callingSettings._alert = {
        info: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callingSettings, '_alert');
      sinon.stub(callingSettings, '_warningEmergencyCallingNotAvailable');
      callingSettings.setData({}, 'foo');
      sinon.assert.calledWith(callingSettings._alert.info,
        { message: callingSettingsMessages.saveSuccessWithSoftphone });
      sinon.assert.notCalled(callingSettings._warningEmergencyCallingNotAvailable);
    });
    it(`_warningEmergencyCallingNotAvailable should be called once and
    should alert info callingSettingsMessages.saveSuccess when
    withPrompt is not equal to null and callWith is not equal to callingOptions.softphone`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.browser });
      callingSettings._alert = {
        info: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callingSettings, '_alert');
      sinon.stub(callingSettings, '_warningEmergencyCallingNotAvailable');
      callingSettings.setData({}, 'foo');
      sinon.assert.calledWith(callingSettings._alert.info,
        { message: callingSettingsMessages.saveSuccess });
      sinon.assert.calledOnce(callingSettings._warningEmergencyCallingNotAvailable);
    });
    it(`_warningEmergencyCallingNotAvailable should not be called once and
    should not alert info when
    withPrompt is equal to null and callWith is not equal to callingOptions.softphone`, () => {
      sinon.stub(callingSettings, 'callWith', { get: () => callingOptions.browser });
      callingSettings._alert = {
        info: sinon.stub().callsFake(() => {})
      };
      sinon.stub(callingSettings, '_alert');
      sinon.stub(callingSettings, '_warningEmergencyCallingNotAvailable');
      callingSettings.setData({}, null);
      sinon.assert.notCalled(callingSettings._alert.info);
      sinon.assert.notCalled(callingSettings._warningEmergencyCallingNotAvailable);
    });
  });
});
