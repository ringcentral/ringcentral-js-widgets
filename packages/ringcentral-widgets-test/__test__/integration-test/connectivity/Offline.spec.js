import { includes } from 'ramda';

import { callingModes } from '@ringcentral-integration/commons/modules/CallingSettings';
import { sleep } from '@ringcentral-integration/utils';
import ConnectivityAlert from '@ringcentral-integration/widgets/components/AlertRenderer/ConnectivityAlert';
import CircleButton from '@ringcentral-integration/widgets/components/CircleButton';
import ConnectivityBadge from '@ringcentral-integration/widgets/components/ConnectivityBadge';

import { getWrapper } from '../shared';

let wrapper = null;
let phone = null;
let badge = null;

/**
 * TODO: Convert to use UT
 */

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

describe('Network is lost', () => {
  beforeAll(async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.connectivityMonitor._networkErrorHandler();
    wrapper.update();
    badge = wrapper.find(ConnectivityBadge);
  });

  test('App is in offline Mode', () => {
    expect(badge.text()).toEqual('Offline');
    const connectivityAlert = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert.text()).toEqual(
      'Sorry, something went wrong, check your network connection and try again.',
    );
  });

  test('Call Buttons are disabled', () => {
    const button = wrapper.find(CircleButton);
    expect(includes('disabled', button.at(0).prop('className'))).toBeTruthy();
  });

  test.skip('Click on the badge', async () => {
    phone.connectivityManager._hideAlerts();
    await sleep(500);
    wrapper.update();
    expect(wrapper.find(ConnectivityAlert).exists()).toBeFalsy();
    badge.simulate('click');
    wrapper.update();
    const connectivityAlert2 = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert2.text()).toEqual(
      'Sorry, something went wrong, check your network connection and try again.',
    );
  });

  test('platform is accessible', async () => {
    phone.connectivityMonitor._requestSuccessHandler();
    await sleep(500);
    wrapper.update();
    expect(wrapper.find(ConnectivityBadge).text()).not.toEqual('Offline');
    expect(wrapper.find(ConnectivityAlert).exists()).toBeFalsy();
  });
});

describe('Platform is not accessible', () => {
  beforeAll(async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.connectivityMonitor._requestErrorHandler({});
    wrapper.update();
    badge = wrapper.find(ConnectivityBadge);
  });

  test('App is in offline Mode', async () => {
    expect(badge.text()).toEqual('Offline');
    const connectivityAlert = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert.text()).toEqual(
      'Cannot connect to the server. Please retry later.',
    );
  });

  test('All Buttons are disabled', () => {
    const button = wrapper.find(CircleButton);
    expect(includes('disabled', button.at(0).prop('className'))).toBeTruthy();
  });

  test.skip('Click on the badge', async () => {
    phone.connectivityManager._hideAlerts();
    await sleep(500);
    wrapper.update();
    expect(wrapper.find(ConnectivityAlert).exists()).toBeFalsy();
    badge.simulate('click');
    wrapper.update();
    const connectivityAlert2 = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert2.text()).toEqual(
      'Cannot connect to the server. Please retry later.',
    );
  });

  test('platform is accessible', async () => {
    phone.connectivityMonitor._requestSuccessHandler();
    await sleep(500);
    wrapper.update();
    expect(wrapper.find(ConnectivityBadge).text()).not.toEqual('Offline');
    expect(wrapper.find(ConnectivityAlert).exists()).toBeFalsy();
  });
});

describe('Offline = VoIP Only mode + Webphone Unavailable', () => {
  beforeEach(async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.availabilityMonitor._deps.client.service
      .platform()
      .emit('refreshError', {
        message: 'none',
        response: { status: 500 },
      });
    await sleep(10);
    wrapper.update();
    badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('VoIP Only');
  });

  test('App is not in webphone mode', async () => {
    phone.callingSettings._setSoftPhoneToCallWith();
    await sleep(500);
    wrapper.update();
    expect(phone.callingSettings.callingMode).not.toEqual(
      callingModes.webphone,
    );
    expect(wrapper.find(ConnectivityBadge).text()).toEqual('Offline');
    const connectivityAlerts = wrapper.find(ConnectivityAlert) || [];
    expect(connectivityAlerts.map((x) => x.text())).toContain(
      'Sorry, something went wrong on our end. Try again later.',
    );
    const button = wrapper.find(CircleButton);
    expect(includes('disabled', button.at(0).prop('className'))).toBeTruthy();
  });

  test('App is in webphone mode and webphone is unavailable', async () => {
    phone.audioSettings.onGetUserMediaError.bind(phone.audioSettings);
    await phone.audioSettings.onGetUserMediaError();
    wrapper.update();
    await sleep(500);
    expect(phone.callingSettings.callingMode).toEqual(callingModes.webphone);
    expect(wrapper.find(ConnectivityBadge).text()).toEqual('Offline');
    const connectivityAlerts = wrapper.find(ConnectivityAlert) || [];
    expect(connectivityAlerts.map((x) => x.text())).toContain(
      'Sorry, something went wrong on our end. Try again later.',
    );
    const button = wrapper.find(CircleButton);
    expect(includes('disabled', button.at(0).prop('className'))).toBeTruthy();
  });
});
