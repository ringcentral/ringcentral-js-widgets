import { ensureLogin, containsErrorMessage } from '../utils/HelpUtil';
import callErrors from '../../modules/Call/callErrors';
import { waitUntilEqual, waitInSeconds } from '../utils/WaitUtil';

export default (Auth, Alert, Client, RegionSettings, Call, accountWithMultiDP) => {
  describe('Number Validation when Making Phone Call', async function () {
    this.timeout(20000);

    before(async function () {
      Call._makeCall = ({ toNumber }) => {
        Call.__toNumber = toNumber;
      };
      const isLoginSuccess = await ensureLogin(Auth, accountWithMultiDP);
      if (!isLoginSuccess) {
        console.error('Skip test case as failed to login with credential ', accountWithMultiDP);
        this.skip();
      }
      await waitInSeconds(1);
    });

    afterEach(async function () {
      Call.__toNumber = null;
    });

    describe('Basic Validation', function () {
      this.timeout(10000);
      beforeEach(async function () {
        const isAlertClear = await waitUntilEqual(() => {
          Alert.dismissAll();
          return Alert.state.messages.length;
        }, 'Alert', 0, 5);
        if (!isAlertClear) {
          console.error('Alert is not cleared after dismissAll');
        }
      });
      it('Should Alert Invalid Number - Invalid Char in ToNumber', async () => {
        try {
          await Call.call({ phoneNumber: "iamn%@onedi!@$%^&()_=\\][';/.,~nu><.,,?/mber#*" });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber))
          .to.not.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
      });
      it('Should Alert Invalid Number - Valid Special Char but No Digital Number', async () => {
        try {
          await Call.call({ phoneNumber: '+#' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber))
          .to.not.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
      });
      it('Should Not Alert Anything - Call Number in E.164 Format', async () => {
        try {
          await Call.call({ phoneNumber: '+13065221112' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
      });
    });

    describe('Validation with US/CA Local Number Format', function () {
      this.timeout(10000);
      beforeEach(async function () {
        const isAlertClear = await waitUntilEqual(() => {
          Alert.dismissAll();
          return Alert.state.messages.length;
        }, 'Alert', 0, 5);
        if (!isAlertClear) {
          console.error('Alert is not cleared after dismissAll');
          this.skip();
        }
      });
      it('Should Not Alert Anything - Call Number in (xxx)xxx-xxxx Format', async () => {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '(650)827-5672' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber))
          .to.equal(undefined);
      });
      it('Should Not Alert Anything - Call Number in (xxx) xxx-xxxx Format', async () => {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '(650) 827-5672' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber))
          .to.equal(undefined);
      });
      it('Should Not Alert Anything - Call Number in (xxx)xxx-xxxx*xxx Format', async () => {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '(650)827-5672*101' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber))
          .to.equal(undefined);
      });
      it('Should Not Alert Anything - Call Number in (xxx) xxx-xxxx Format', async () => {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '(650) 827-5672*101' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber))
          .to.equal(undefined);
      });
      it('Should Not Alert Anything - Call Number in xxx-xxx-xxxx Format', async () => {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '650-827-5672' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber))
          .to.equal(undefined);
      });
      it('Should Not Alert Anything - Call Number in xxx-xxx-xxxx*xxx Format', async () => {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '650-827-5672*101' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber))
          .to.equal(undefined);
      });
    });

    describe('Validation with Region Setting', function () {
      this.timeout(10000);
      beforeEach(async function () {
        const isAlertClear = await waitUntilEqual(() => {
          Alert.dismissAll();
          return Alert.state.messages.length;
        }, 'Alert', 0, 5);
        if (!isAlertClear) {
          console.error('Alert is not cleared after dismissAll');
          this.skip();
        }
      });
      it('Should Alert No AreaCode - Call 7 Digital Number with US Dialing Plan without Area Code', async () => {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '6545672' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode))
          .to.not.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber))
          .to.equal(undefined);
      });
      it('Should Alert No AreaCode - Call 7 Digital Number with CA Dialing Plan without Area Code', async () => {
        RegionSettings.setData({ countryCode: 'CA', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '6545672' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode))
          .to.not.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension))
          .to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber))
          .to.equal(undefined);
      });
      it('Should Not Alert Anything - Call 7 Digital Number with US Dialing Plan and Area Code', async function () {
        RegionSettings.setData({ countryCode: 'US', areaCode: '650' });
        try {
          await Call.call({ phoneNumber: '6545672' });
        } catch (e) {
          console.error(e);
        }
        expect(Call.__toNumber).to.equal('+16506545672');
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Not Alert Anything - Call 7 Digital Number with CA Dialing Plan and Area Code', async function () {
        RegionSettings.setData({ countryCode: 'CA', areaCode: '250' });
        try {
          await Call.call({ phoneNumber: '6545672' });
        } catch (e) {
          console.error(e);
        }
        expect(Call.__toNumber).to.equal('+12506545672');
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Not Alert Anything - Call 7 Digital Number with non US/CA Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '6545672' });
        } catch (e) {
          console.error(e);
        }
        expect(Call.__toNumber).to.equal('+446545672');
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Not Alert Anything - Call greater than 7 Digital Number with US Dialing Plan and Area Code', async function () {
        RegionSettings.setData({ countryCode: 'US', areaCode: '650' });
        try {
          await Call.call({ phoneNumber: '6571234567' });
        } catch (e) {
          console.error(e);
        }
        expect(Call.__toNumber).to.equal('+16571234567');
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Alert noInternational - Call CA number with US Dialing Plan and Area Code', async function () {
        RegionSettings.setData({ countryCode: 'US', areaCode: '650' });
        try {
          await Call.call({ phoneNumber: '2501234567' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noInternational)).to.not.equal(undefined);
      });
      it('Should Not Alert Anything - Call greater than 7 Digital Number with CA Dialing Plan and Area Code', async function () {
        RegionSettings.setData({ countryCode: 'CA', areaCode: '250' });
        try {
          await Call.call({ phoneNumber: '4031234567' });
        } catch (e) {
          console.error(e);
        }
        expect(Call.__toNumber).to.equal('+14031234567');
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Alert noInternational - Call US number with CA Dialing Plan and Area Code', async function () {
        RegionSettings.setData({ countryCode: 'CA', areaCode: '250' });
        try {
          await Call.call({ phoneNumber: '6501234567' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noInternational)).to.not.equal(undefined);
      });
      it('Should Not Alert Anything - Call greater than 7 Digital Number with non US/CA Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '1234567890' });
        } catch (e) {
          console.error(e);
        }
        expect(Call.__toNumber).to.equal('+441234567890');
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Alert Special Number - Call 911 with US Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '911' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.not.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Alert Special Number - Call 999 with GB Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '999' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.not.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Not Alert Special Number - Call 999 with US Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '999' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
      });
      it('Should Not Alert Special Number - Call 911 with GB Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '911' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
      });
      it('Should Not Alert Anything - Call 101(Existed Extension/Not Special Number) with US Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '101' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Alert Special Number - Call 101(Existed Extension/Speical Number) with GB Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '101' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.not.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Not Alert Anything - Call 102(Existed Extension) with GB Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '102' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.equal(undefined);
      });
      it('Should Alert Not An Extension - Call 998(Non Extension) with US Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'US', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '998' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.not.equal(undefined);
      });
      it('Should Alert Not An Extension - Call 998(Non Extension) with GB Dialing Plan', async function () {
        RegionSettings.setData({ countryCode: 'GB', areaCode: '' });
        try {
          await Call.call({ phoneNumber: '998' });
        } catch (e) {
          console.error(e);
        }
        expect(containsErrorMessage(Alert.state.messages, callErrors.noToNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.noAreaCode)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.specialNumber)).to.equal(undefined);
        expect(containsErrorMessage(Alert.state.messages, callErrors.notAnExtension)).to.not.equal(undefined);
      });
    });
  });
};
