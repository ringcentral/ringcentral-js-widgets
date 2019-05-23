import { contains } from 'ramda';
import sleep from 'ringcentral-integration/lib/sleep';
import audioSettingsErrors from 'ringcentral-integration/modules/AudioSettings/audioSettingsErrors';
import WebphoneBadge from 'ringcentral-widgets/components/WebphoneBadge';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import WebphoneAlert from 'ringcentral-widgets/components/WebphoneAlert';
import AudioSettingsAlert from 'ringcentral-widgets/components/AudioSettingsAlert';
import * as mock from 'ringcentral-integration/integration-test/mock';
import { waitUntilEqual } from 'ringcentral-integration/integration-test/utils/WaitUtil';
import { getWrapper, timeout } from '../shared';

describe('Webphone badge', () => {
  /* global jasmine */
  let wrapper = null;
  let phone = null;
  const getErrCodeMsg = errCode => `Error code: ${errCode}. If the error persists, please report this error to RingCentral Support.`;
  const checkDLErrorMsg = 'Fail to get DL data, please contact RingCentral for support if this error keeps showing.';
  const noOutboundCallWithoutDLMsg = 'Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.';
  const serverErrors = [
    { err: 603, msg: 'A maximum of 5 web phones could be registered.' },
    { err: 500, msg: getErrCodeMsg(500) },
    { err: 504, msg: getErrCodeMsg(504) },
    { err: 400, msg: getErrCodeMsg(400) },
  ];

  test('webphone can work correctly', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    expect(phone.webphone.connected).toBeTruthy();
  });

  test('webphone checkDLError(just show alert message)', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.webphone._disconnect();
    Object.defineProperty(phone.webphone, '_fetchDL', {
      value() {
        throw new Error('any words');
      }
    });
    await phone.webphone.connect();
    wrapper.update();
    const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
    expect(webphoneAlerts.map(x => x.text())).toContain(checkDLErrorMsg);
    if (phone.webphone.connecting) {
      phone.webphone._webphone.userAgent._events.registered();
    }
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
  });

  test('webphone noOutboundCallWithoutDL(just show alert message)', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.webphone._disconnect();
    mock.fetchDLWithNoRecord();
    await phone.webphone.connect();
    wrapper.update();
    const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
    expect(webphoneAlerts.map(x => x.text())).toContain(noOutboundCallWithoutDLMsg);
    if (phone.webphone.connecting) {
      phone.webphone._webphone.userAgent._events.registered();
    }
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
  });

  serverErrors.forEach(({ err, msg }) => {
    describe(`webphone error code ${err}`, async () => {
      beforeAll(async () => {
        wrapper = await getWrapper();
        phone = wrapper.props().phone;
        if (phone.webphone.connected) {
          phone.webphone._disconnect();
        }
        mock.fetchDL();
        await phone.webphone.connect();
        phone.webphone._reconnectDelays = phone.webphone._reconnectDelays.map(x => (x / 5000));
        await waitUntilEqual(() => !!phone.webphone._webphone, '_webphone', true, 5, 20);
        phone.webphone._webphone.userAgent.trigger('registrationFailed', { statusCode: err });
        mock.fetchDL();
        await sleep(50);
        await waitUntilEqual(() => !!phone.webphone._webphone, '_webphone', true, 5, 20);
        phone.webphone._webphone.userAgent.trigger('registrationFailed', { statusCode: err });
        mock.fetchDL();
        await sleep(50);
        await waitUntilEqual(() => !!phone.webphone._webphone, '_webphone', true, 5, 20);
        mock.fetchDL();
        phone.webphone._reconnectDelays = phone.webphone._reconnectDelays.map(x => (x * 5000));
        phone.webphone._webphone.userAgent.trigger('registrationFailed', { statusCode: err });
        await sleep(2);
      });

      test('Display Web Phone Unavailable Badge', async () => {
        phone = wrapper.props().phone;
        wrapper.update();
        const badge = wrapper.find(WebphoneBadge);
        expect(badge.exists()).toBeTruthy();
        expect(badge.text()).toEqual('Web Phone Unavailable');
      });

      test('Alert Message', async () => {
        wrapper.update();
        const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
        expect(webphoneAlerts.map(x => x.text())).toContain(msg);
      });

      test('Disabled Dial Button', async () => {
        const button = wrapper.find(CircleButton);
        expect(contains('disabled', button.at(0).prop('className'))).toBeTruthy();
      });

      test('Webphone Badge Changed to Connecting status', async () => {
        let badge = wrapper.find(WebphoneBadge);
        badge.simulate('click');
        await timeout(10);
        wrapper.update();
        badge = wrapper.find(WebphoneBadge);
        expect(badge.text()).toEqual('Connecting');
      });

      test('Web Phone Unavailable Badge disappeared', async () => {
        phone.webphone._webphone.userAgent.trigger('registered');
        wrapper.update();
        const badge = wrapper.find(WebphoneBadge);
        expect(badge.exists()).toBeFalsy();
      });

      test('Alert Message disappeared', async () => {
        phone.webphone._webphone.userAgent.trigger('registered');
        await sleep(500);
        wrapper.update();
        const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
        expect(webphoneAlerts.map(x => x.text())).not.toContain(msg);
      });

      test('Enabled Dial Button', async () => {
        wrapper.update();
        const button = wrapper.find(CircleButton);
        expect(contains('disabled', button.at(0).prop('className'))).toBeFalsy();
      });
    });
  });

  describe('webphone sipProvisionError', () => {
    beforeAll(async () => {
      wrapper = await getWrapper();
      phone = wrapper.props().phone;
      phone.webphone._reconnectDelays = phone.webphone._reconnectDelays.map(x => x / 1000);
      Object.defineProperty(phone.webphone, '_sipProvision', {
        async value() {
          await sleep(50);
          throw new Error('error');
        }
      });
      await phone.webphone._disconnect();
      await phone.webphone.connect();
    }, 50000);

    test('Display Web Phone Unavailable Badge', async () => {
      phone = wrapper.props().phone;
      await waitUntilEqual(() => phone.webphone.connectError, 'connectError', true, 5, 20);
      wrapper.update();
      const badge = wrapper.find(WebphoneBadge);
      expect(badge.exists()).toBeTruthy();
      expect(badge.text()).toEqual('Web Phone Unavailable');
    });

    test('Alert Message', async () => {
      wrapper.update();
      const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
      const msg = 'Internal error. If the error persists, please report this error to RingCentral Support.';
      expect(webphoneAlerts.map(x => x.text())).toContain(msg);
    });

    test('Disabled Dial Button', async () => {
      wrapper.update();
      const button = wrapper.find(CircleButton);
      expect(contains('disabled', button.at(0).prop('className'))).toBeTruthy();
    });

    test('Webphone Badge Changed to Connecting status', async () => {
      let badge = wrapper.find(WebphoneBadge);
      badge.simulate('click');
      await timeout(5);
      wrapper.update();
      badge = wrapper.find(WebphoneBadge);
      expect(badge.text()).toEqual('Connecting');
    });

    test('Webphone Badge Changed to Unavailable status', async () => {
      phone = wrapper.props().phone;
      await waitUntilEqual(() => phone.webphone.connectError, 'connectError', true, 5, 20);
      wrapper.update();
      const badge = wrapper.find(WebphoneBadge);
      expect(badge.text()).toEqual('Web Phone Unavailable');
    });
  });

  describe('webphone audio permission error', () => {
    beforeAll(async () => {
      wrapper = await getWrapper();
      phone = wrapper.props().phone;
      phone.audioSettings.onGetUserMediaError.bind(phone.audioSettings);
      await phone.audioSettings.onGetUserMediaError();
    });

    test('Display Web Phone Unavailable Badge', async () => {
      wrapper.update();
      await timeout(500);
      wrapper.update();
      const badge = wrapper.find(WebphoneBadge);
      expect(badge.exists()).toBeTruthy();
      expect(badge.text()).toEqual('Web Phone Unavailable');
    });

    test('Alert Message', async () => {
      wrapper.update();
      const audioAlert = wrapper.find(AudioSettingsAlert);
      expect(audioAlert.text()).toEqual(
        `Please grant ${phone.brand.application} to access your audio.`
      );
    });

    test('Disabled Dial Button', async () => {
      wrapper.update();
      const button = wrapper.find(CircleButton);
      expect(contains('disabled', button.at(0).prop('className'))).toBeTruthy();
    });

    test('Web Phone Unavailable Badge disappeared after click', async () => {
      wrapper.update();
      let badge = wrapper.find(WebphoneBadge);
      badge.simulate('click');
      await timeout(100);
      wrapper.update();
      badge = wrapper.find(WebphoneBadge);
      expect(badge.exists()).toBeFalsy();
    });

    test('Alert Message disappeared', async () => {
      wrapper.update();
      const messages = phone.alert.messages.filter(
        m => m.message === audioSettingsErrors.userMediaPermission
      );
      expect(messages.length === 0).toBeTruthy();
    });

    test('Enabled Dial Button', async () => {
      wrapper.update();
      const button = wrapper.find(CircleButton);
      expect(contains('disabled', button.at(0).prop('className'))).toBeFalsy();
    });
  });

  test('should get connecting badge when get connecting event in connected', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    await waitUntilEqual(() => phone.webphone.connected, 'connected', true, 5, 20);
    phone.webphone._webphone.userAgent.transport.trigger('connecting');
    await timeout(10);
    wrapper.update();
    const badge = wrapper.find(WebphoneBadge);
    expect(badge.text()).toEqual('Connecting');
  });

  test('should get unavailable badge when get closed event', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.webphone._webphone.userAgent.transport.trigger('closed');
    await timeout(10);
    wrapper.update();
    const badge = wrapper.find(WebphoneBadge);
    expect(badge.text()).toEqual('Web Phone Unavailable');
  });

  test('should reconnect when get switchBackProxy event', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.webphone._webphone.userAgent.transport.trigger('switchBackProxy');
    await timeout(10);
    wrapper.update();
    const badge = wrapper.find(WebphoneBadge);
    expect(badge.text()).toEqual('Connecting');
    phone.webphone._webphone.userAgent.trigger('registered');
    await timeout(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
  });

  test('should reconnect after session ended when get switchBackProxy event', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    mock.fetchDL();
    const session = await phone.webphone.makeCall({
      fromNumber: '+15878133670',
      homeCountryId: '1',
      toNumber: '101',
    });
    phone.webphone._webphone.userAgent.transport.trigger('switchBackProxy');
    await timeout(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
    await phone.webphone.hangup(session.id);
    await timeout(10);
    wrapper.update();
    const badge = wrapper.find(WebphoneBadge);
    expect(badge.text()).toEqual('Connecting');
    phone.webphone._webphone.userAgent.trigger('registered');
    await timeout(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
  });

  test('should reconnect when get provisionUpdate event', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.webphone._webphone.userAgent.trigger('provisionUpdate');
    await timeout(10);
    wrapper.update();
    const badge = wrapper.find(WebphoneBadge);
    expect(badge.text()).toEqual('Connecting');
    phone.webphone._webphone.userAgent.trigger('registered');
    await timeout(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
  });

  test('should reconnect after session ended when get provisionUpdate event', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    mock.fetchDL();
    const session = await phone.webphone.makeCall({
      fromNumber: '+15878133670',
      homeCountryId: '1',
      toNumber: '101',
    });
    phone.webphone._webphone.userAgent.trigger('provisionUpdate');
    await timeout(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
    await phone.webphone.hangup(session.id);
    await timeout(10);
    wrapper.update();
    const badge = wrapper.find(WebphoneBadge);
    expect(badge.text()).toEqual('Connecting');
    phone.webphone._webphone.userAgent.trigger('registered');
    await timeout(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
  });
});
