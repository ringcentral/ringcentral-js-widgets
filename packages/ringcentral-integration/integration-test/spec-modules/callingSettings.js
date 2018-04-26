import callingOptions from '../../modules/CallingSettings/callingOptions';
import callingModes from '../../modules/CallingSettings/callingModes';
import callingSettingsMessages from '../..//modules/CallingSettings/callingSettingsMessages';
import loginStatus from '../../modules/Auth/loginStatus';
import { containsErrorMessage, ensureLogin } from '../utils/HelpUtil';
import { waitUntilEqual } from '../utils/WaitUtil';
import * as mock from '../mock';

const authzProfileBody = require('../mock/data/authzProfile');

export default (auth, client, alert, account, callingSettings, extensionPhoneNumber, extensionInfo) => {
  describe('Calling Settings', async function () {
    this.timeout(20000);
    mock.mockClient(client);
    let isLoginSuccess;

    describe('When has permission', async function () {
      this.timeout(20000);

      before(async function () {
        mock.mockForLogin();
        isLoginSuccess = await ensureLogin(auth, account);
        if (!isLoginSuccess) {
          console.error('Skip test case as failed to login with credential ', account);
          this.skip();
        }
      });

      it('Should Be Make Call with Softphone by Default', async function () {
        expect(callingSettings.callWith).to.equals(callingOptions.softphone);
        expect(callingSettings.callingMode).to.equals(callingModes.softphone);
      });

      describe('Should Save Calling Mode', function () {
        this.timeout(20000);
        it('Should Save My RingCentral Phone', async function () {
          callingSettings.setData({
            callWith: callingOptions.myphone
          });
          expect(callingSettings.callWith).to.equals(callingOptions.myphone);
          expect(callingSettings.callingMode).to.equals(callingModes.ringout);
        });
        it('Should Save Other Phone', async function () {
          callingSettings.setData({
            callWith: callingOptions.otherphone
          });
          expect(callingSettings.callWith).to.equals(callingOptions.otherphone);
          expect(callingSettings.callingMode).to.equals(callingModes.ringout);
        });
        it('Should Save Custom Phone', async function () {
          callingSettings.setData({
            callWith: callingOptions.customphone
          });
          expect(callingSettings.callWith).to.equals(callingOptions.customphone);
          expect(callingSettings.callingMode).to.equals(callingModes.ringout);
        });
      });

      describe('Should Save Options in RingOut Mode', function () {
        this.timeout(20000);
        it('Should Save From Number', async function () {
           callingSettings.setData({
            myLocation: '123'
          });
          expect(callingSettings.myLocation).to.equals('123');
        });
        it('Should Save RingoutPrompt', async function () {
           callingSettings.setData({
            ringoutPrompt: '123'
          });
          expect(callingSettings.ringoutPrompt).to.equals('123');
        });
      });

      describe('Should Allow Alert', function () {
        this.timeout(20000);
        beforeEach(async function () {
          const isAlertClear = await waitUntilEqual(() => {
            alert.dismissAll();
            return alert.state.messages.length;
          }, 'Alert', 0, 5);
          if (!isAlertClear) {
            console.error('Alert is not cleared after dismissAll');
            this.skip();
          }
        });
        describe('Should Prompt Alerts when withPrompt Equals True', function () {
          it('Should Prompt Alert of saveSuccessWithSoftphone', async function () {
            callingSettings.setData({
              callWith: callingOptions.softphone
            }, true);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccessWithSoftphone)).to.not.equal(undefined);
          });
          it('Should Prompt Alert of saveSuccess when Calling Option is Other Phone', async function () {
            callingSettings.setData({
              callWith: callingOptions.otherphone
            }, true);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccess)).to.not.equal(undefined);
          });
          it('Should Prompt Alert of saveSuccess when Calling Option is My RingCentral Phone', async function () {
            callingSettings.setData({
              callWith: callingOptions.myphone
            }, true);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccess)).to.not.equal(undefined);
          });
          it('Should Prompt Alert of saveSuccess when Calling Option is Custom Phone', async function () {
            callingSettings.setData({
              callWith: callingOptions.customphone
            }, true);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccess)).to.not.equal(undefined);
          });

        });
        describe('Should Not Prompt Alerts when withPrompt Equals False', function() {
          it('Should Not Prompt Alert when Calling Option is Softphone', async function () {
            callingSettings.setData({
              callWith: callingOptions.softphone
            }, false);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccess)).to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccessWithSoftphone)).to.equal(undefined);
          });
          it('Should Not Prompt Alert when Calling Option is My RingCentral Phone', async function () {
            callingSettings.setData({
              callWith: callingOptions.myphone
            }, false);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccess)).to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccessWithSoftphone)).to.equal(undefined);
          });
          it('Should Not Prompt Alert when Calling Option is Other Phone', async function () {
            callingSettings.setData({
              callWith: callingOptions.otherphone
            }, false);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccess)).to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccessWithSoftphone)).to.equal(undefined);
          });
          it('Should Not Prompt Alert when Calling Option is Custom Phone', async function () {
            callingSettings.setData({
              callWith: callingOptions.customphone
            }, false);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccess)).to.equal(undefined);
            expect(containsErrorMessage(alert.state.messages, callingSettingsMessages.saveSuccessWithSoftphone)).to.equal(undefined);
          });
        });
      });
      describe('Should Remember after Logout', function () {
        this.timeout(20000);
        it('Should Remember Calling Settings after Re-login', async function () {
          this.timeout(20000);
          callingSettings.setData({
            callWith: callingOptions.customphone,
            myLocation: '456',
            ringoutPrompt: '456'
          });
          auth.logout();
          await waitUntilEqual(() => auth.loginStatus, 'LoginStatus', loginStatus.notLoggedIn, 3);
          mock.restore();
          mock.mockForLogin();
          await ensureLogin(auth, account);
          expect(callingSettings.ringoutPrompt).to.equals('456');
          expect(callingSettings.myLocation).to.equals('456');
          expect(callingSettings.callWith).to.equals(callingOptions.customphone);
          expect(callingSettings.callingMode).to.equals(callingModes.ringout);
        });
      });
      describe('Should Have Required Phone Numbers', function () {
        this.timeout(20000);
        it('Should Have My Phone Numbers', async function () {
          const myPhoneNumbers = extensionPhoneNumber.directNumbers.map(item => item.phoneNumber);
          const { mainCompanyNumber } = extensionPhoneNumber;
          const { extensionNumber } = extensionInfo;
          if (mainCompanyNumber && extensionNumber) {
            myPhoneNumbers.push(`${mainCompanyNumber.phoneNumber}*${extensionNumber}`);
          }
          expect(callingSettings.myPhoneNumbers.length).to.equal(myPhoneNumbers.length);
          callingSettings.myPhoneNumbers.forEach((number) => {
            expect(myPhoneNumbers).to.include(number);
          });
        });
        //TODO: Add test cases for Other Phone Numbers
      });
    });

    it('Should only include softphone when ReadUserPhoneNumbers is false', async () => {
      mock.restore();
      mock.mockForLogin({ mockAuthzProfile: false });
      mock.authzProfile({
        permissions: authzProfileBody.permissions.filter(p => p.permission.id !== 'ReadUserPhoneNumbers')
      });
      await ensureLogin(auth, account);
      expect(callingSettings.callWithOptions).to.deep.equals([callingOptions.softphone]);
      expect(callingSettings.callingMode).to.equals(callingModes.softphone);
    });

    it('Should only include softphone when ReadUserForwardingFlipNumbers is false', async () => {
      mock.restore();
      mock.mockForLogin({ mockAuthzProfile: false });
      mock.authzProfile({
        permissions: authzProfileBody.permissions.filter(p => p.permission.id !== 'ReadUserForwardingFlipNumbers')
      });
      await ensureLogin(auth, account);
      expect(callingSettings.callWithOptions).to.deep.equals([
        callingOptions.softphone,
        callingOptions.myphone,
        callingOptions.customphone
      ]);
    });
  });
};
