import { includes } from 'ramda';
import { sleep } from '@ringcentral-integration/utils';
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
import ConnectivityBadge from '@ringcentral-integration/widgets/components/ConnectivityBadge';
import CircleButton from '@ringcentral-integration/widgets/components/CircleButton';
import WebphoneAlert from '@ringcentral-integration/widgets/components/AlertRenderer/WebphoneAlert';
import AudioSettingsAlert from '@ringcentral-integration/widgets/components/AlertRenderer/AudioSettingsAlert';
import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { waitUntilTo } from '@ringcentral-integration/commons/utils';

import { getWrapper, tearDownWrapper } from '../shared';

describe('Webphone badge', () => {
  let wrapper = null;
  let phone = null;
  const getErrCodeMsg = (errCode) =>
    `Sorry, we've encountered an error: ${errCode}. If the problem persists, report this error to RingCentral support.`;
  const checkDLErrorMsg =
    'Unable to make outgoing call. Contact RingCentral for support if this error keeps showing.';
  const noOutboundCallWithoutDLMsg =
    'Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade.';
  const provisionUpdateMsg =
    'Sorry, something went wrong on our end. We will automatically try to reconnect shortly.';
  const serverConnectingMsg =
    'Sorry, we are having an issue connecting to the phone server.';
  const serverErrors = [
    // { err: 603, msg: 'A maximum of 5 web phones could be registered.' },
    { err: 500, msg: getErrCodeMsg(500) },
    { err: 504, msg: getErrCodeMsg(504) },
    { err: 400, msg: getErrCodeMsg(400) },
  ];

  test('webphone can work correctly', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    expect(phone.webphone.connected).toBeTruthy();
    await tearDownWrapper(wrapper);
  });

  test('webphone checkDLError(just show alert message)', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    await phone.webphone.disconnect();
    Object.defineProperty(phone.webphone, '_fetchDL', {
      value() {
        throw new Error('any words');
      },
    });
    await phone.webphone.connect();
    phone.webphone._webphone.userAgent.trigger('registered');
    wrapper.update();
    const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
    expect(webphoneAlerts.map((x) => x.text())).toContain(checkDLErrorMsg);
    expect(phone.webphone.connected).toBeTruthy();
    await tearDownWrapper(wrapper);
  });

  test('webphone noOutboundCallWithoutDL(just show alert message)', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    await phone.webphone.disconnect();
    mock.fetchDLWithNoRecord();
    await phone.webphone.connect();
    phone.webphone._webphone.userAgent.trigger('registered');
    wrapper.update();
    const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
    expect(webphoneAlerts.map((x) => x.text())).toContain(
      noOutboundCallWithoutDLMsg,
    );
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
    await tearDownWrapper(wrapper);
  });

  serverErrors.forEach(({ err, msg }) => {
    describe(`webphone error code ${err}`, () => {
      beforeAll(async () => {
        wrapper = await getWrapper();
        phone = wrapper.props().phone;
        if (phone.webphone.connected) {
          await phone.webphone.disconnect();
        }
        mock.fetchDL();
        await phone.webphone.connect();
        phone.webphone._reconnectDelays = phone.webphone._reconnectDelays.map(
          (x) => x / 5000,
        );

        await waitUntilTo(() => {
          expect(phone.webphone._webphone).not.toEqual(null);
        });
        phone.webphone._webphone.userAgent.trigger('registrationFailed', {
          statusCode: err,
        });
        mock.fetchDL();
        await sleep(100);

        await waitUntilTo(() => {
          expect(phone.webphone._webphone).not.toEqual(null);
        });
        phone.webphone._webphone.userAgent.trigger('registrationFailed', {
          statusCode: err,
        });
        mock.fetchDL();
        await sleep(100);

        await waitUntilTo(() => {
          expect(phone.webphone._webphone).not.toEqual(null);
        });
        mock.fetchDL();
        phone.webphone._reconnectDelays = phone.webphone._reconnectDelays.map(
          (x) => x * 5000,
        );
        phone.webphone._webphone.userAgent.trigger('registrationFailed', {
          statusCode: err,
        });
      });

      afterAll(async () => {
        await tearDownWrapper(wrapper);
      });

      test('Display Web Phone Unavailable Badge and alert message', async () => {
        wrapper.update();
        const badge = wrapper.find(ConnectivityBadge);
        expect(badge.text()).toEqual('Web Phone Unavailable');
        const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
        expect(webphoneAlerts.map((x) => x.text())).toContain(msg);
      });

      test('Disabled Dial Button', async () => {
        const button = wrapper.find(CircleButton);
        expect(
          includes('disabled', button.at(0).prop('className')),
        ).toBeTruthy();
      });

      test('Webphone Badge Changed to Connecting status', async () => {
        let badge = wrapper.find(ConnectivityBadge);
        badge.simulate('click');
        await sleep(200);
        wrapper.update();
        badge = wrapper.find(ConnectivityBadge);
        expect(badge.text()).toEqual('Connecting');
      });

      test('Web Phone Unavailable Badge disappeared', async () => {
        await waitUntilTo(() => {
          expect(phone.webphone._webphone).not.toEqual(null);
        });
        phone.webphone._webphone.userAgent.trigger('registered');
        await sleep(10);
        wrapper.update();
        const badge = wrapper.find(ConnectivityBadge);
        expect(badge.text()).not.toEqual('Web Phone Unavailable');
      });

      test('Alert Message disappeared', async () => {
        await sleep(1000);
        wrapper.update();
        const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
        expect(webphoneAlerts.map((x) => x.text())).not.toContain(msg);
      });

      test('Enabled Dial Button', async () => {
        wrapper.update();
        const button = wrapper.find(CircleButton);
        expect(
          includes('disabled', button.at(0).prop('className')),
        ).toBeFalsy();
      });
    });
  });

  describe('webphone sipProvisionError', () => {
    beforeAll(async () => {
      wrapper = await getWrapper();
      phone = wrapper.props().phone;
      phone.webphone._reconnectDelays = phone.webphone._reconnectDelays.map(
        (x) => x / 1000,
      );
      Object.defineProperty(phone.webphone, '_sipProvision', {
        async value() {
          await sleep(50);
          throw new Error('error');
        },
      });
      mock.fetchDL();
      await phone.webphone.disconnect();
      await phone.webphone.connect();
    }, 50000);

    afterAll(async () => {
      await tearDownWrapper(wrapper);
    });

    test('Display Web Phone Unavailable Badge', async () => {
      phone = wrapper.props().phone;

      await waitUntilTo(() => {
        expect(phone.webphone.connectError).toBeTruthy();
      });
      wrapper.update();
      const badge = wrapper.find(ConnectivityBadge);
      expect(badge.text()).toEqual('Web Phone Unavailable');
    });

    test('Alert Message', async () => {
      wrapper.update();
      const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
      const msg =
        'Sorry, something went wrong on our end. If the error persists, report this error to RingCentral support.';
      expect(webphoneAlerts.map((x) => x.text())).toContain(msg);
    });

    test('Disabled Dial Button', async () => {
      wrapper.update();
      const button = wrapper.find(CircleButton);
      expect(includes('disabled', button.at(0).prop('className'))).toBeTruthy();
    });

    test('Webphone Badge Changed to Connecting status', async () => {
      let badge = wrapper.find(ConnectivityBadge);
      mock.fetchDL();
      badge.simulate('click');
      await sleep(5);
      wrapper.update();
      badge = wrapper.find(ConnectivityBadge);
      expect(badge.text()).toEqual('Connecting');
    });

    test('Webphone Badge Changed to Unavailable status', async () => {
      phone = wrapper.props().phone;

      await waitUntilTo(() => {
        expect(phone.webphone.connectError).toBeTruthy();
      });
      wrapper.update();
      const badge = wrapper.find(ConnectivityBadge);
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
      await sleep(500);
      wrapper.update();
      const badge = wrapper.find(ConnectivityBadge);
      expect(badge.text()).toEqual('Web Phone Unavailable');
    });

    test('Alert Message', async () => {
      wrapper.update();
      const audioAlert = wrapper.find(AudioSettingsAlert);
      expect(audioAlert.text()).toEqual(
        `Please grant ${phone.brand.application} to access your audio.`,
      );
    });

    test('Disabled Dial Button', async () => {
      wrapper.update();
      const button = wrapper.find(CircleButton);
      expect(includes('disabled', button.at(0).prop('className'))).toBeTruthy();
    });

    test('Web Phone Unavailable Badge disappeared after click', async () => {
      wrapper.update();
      let badge = wrapper.find(ConnectivityBadge);
      badge.simulate('click');
      await sleep(100);
      wrapper.update();
      badge = wrapper.find(ConnectivityBadge);
      expect(badge.text()).toEqual('Connecting');

      await waitUntilTo(() => {
        expect(phone.webphone._webphone).not.toEqual(null);
      });
      phone.webphone._webphone.userAgent.trigger('registered');
      wrapper.update();
      badge = wrapper.find(ConnectivityBadge);
      expect(badge.text()).not.toEqual('Web Phone Unavailable');
    });

    test('Alert Message disappeared', async () => {
      wrapper.update();
      const messages = phone.alert.messages.filter(
        (m) => m.message === audioSettingsErrors.userMediaPermission,
      );
      expect(messages.length === 0).toBeTruthy();
    });

    test('Enabled Dial Button', async () => {
      wrapper.update();
      const button = wrapper.find(CircleButton);
      expect(includes('disabled', button.at(0).prop('className'))).toBeFalsy();
    });
  });

  test('should get connecting badge when get connecting event in connected', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;

    await waitUntilTo(() => {
      expect(phone.webphone.connected).toBeTruthy();
    });
    phone.webphone._webphone.userAgent.transport.trigger('connecting');
    await sleep(10);
    wrapper.update();
    const badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('Connecting');
    const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
    expect(webphoneAlerts.map((x) => x.text())).toContain(serverConnectingMsg);
    await tearDownWrapper(wrapper);
  });

  test('should get unavailable badge when get closed event', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.webphone._webphone.userAgent.transport.trigger('closed');
    await sleep(10);
    wrapper.update();
    const badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('Web Phone Unavailable');
    await tearDownWrapper(wrapper);
  });

  test('should not get unavailable badge when get transportError event', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.webphone._webphone.userAgent.transport.trigger('transportError');
    await sleep(10);
    wrapper.update();
    const badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).not.toEqual('Web Phone Unavailable');
    await tearDownWrapper(wrapper);
  });

  test('should get unavailable badge when get wsConnectionError event', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.webphone._webphone.userAgent.transport.trigger('wsConnectionError');
    await sleep(10);
    wrapper.update();
    const badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('Web Phone Unavailable');
    await tearDownWrapper(wrapper);
  });

  test('should reconnect when get switchBackProxy event', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.webphone._webphone.userAgent.transport.trigger('switchBackProxy');
    await sleep(10);
    wrapper.update();
    const badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('Connecting');

    await waitUntilTo(() => {
      expect(phone.webphone._webphone).not.toEqual(null);
    });
    phone.webphone._webphone.userAgent.trigger('registered');
    await sleep(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
    await tearDownWrapper(wrapper);
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
    await sleep(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
    await phone.webphone.hangup(session.id);
    await sleep(10);
    wrapper.update();
    const badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('Connecting');

    await waitUntilTo(() => {
      expect(phone.webphone._webphone).not.toEqual(null);
    });
    phone.webphone._webphone.userAgent.trigger('registered');
    await sleep(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
    await tearDownWrapper(wrapper);
  });

  test('should reconnect when get provisionUpdate event', async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.webphone._webphone.userAgent.trigger('provisionUpdate');
    await sleep(10);
    wrapper.update();
    const badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('Connecting');
    const webphoneAlerts = wrapper.find(WebphoneAlert) || [];
    expect(webphoneAlerts.map((x) => x.text())).toContain(provisionUpdateMsg);

    await waitUntilTo(() => {
      expect(phone.webphone._webphone).not.toEqual(null);
    });
    phone.webphone._webphone.userAgent.trigger('registered');
    await sleep(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
    await tearDownWrapper(wrapper);
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
    await sleep(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
    await phone.webphone.hangup(session.id);
    await sleep(10);
    wrapper.update();
    const badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('Connecting');

    await waitUntilTo(() => {
      expect(phone.webphone._webphone).not.toEqual(null);
    });
    phone.webphone._webphone.userAgent.trigger('registered');
    await sleep(10);
    wrapper.update();
    expect(phone.webphone.connected).toBeTruthy();
    await tearDownWrapper(wrapper);
  });
});
