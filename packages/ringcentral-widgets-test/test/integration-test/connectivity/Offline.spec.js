import { contains } from 'ramda';
import ConnectivityBadge from 'ringcentral-widgets/components/ConnectivityBadge';
import ConnectivityAlert from 'ringcentral-widgets/components/ConnectivityAlert';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import { getWrapper, timeout } from '../shared';

let wrapper = null;
let phone = null;
let badge = null;
/* global jasmine */
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
    expect(connectivityAlert.text()).toEqual('Sorry, something went wrong, check your network connection and try again.');
  });

  test('Call Buttons are disabled', () => {
    const button = wrapper.find(CircleButton);
    expect(contains('disabled', button.at(0).prop('className'))).toBeTruthy();
  });

  test('Click on the badge', async () => {
    phone.connectivityManager._hideAlerts();
    await timeout(500);
    wrapper.update();
    expect(wrapper.find(ConnectivityAlert).exists()).toBeFalsy();
    badge.simulate('click');
    wrapper.update();
    const connectivityAlert2 = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert2.text()).toEqual('Sorry, something went wrong, check your network connection and try again.');
  });

  test('platform is accessible', async () => {
    phone.connectivityMonitor._requestSuccessHandler();
    await timeout(500);
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
    expect(connectivityAlert.text()).toEqual('Cannot connect to the server. Please retry later.');
  });

  test('All Buttons are disabled', () => {
    const button = wrapper.find(CircleButton);
    expect(contains('disabled', button.at(0).prop('className'))).toBeTruthy();
  });

  test('Click on the badge', async () => {
    phone.connectivityManager._hideAlerts();
    await timeout(500);
    wrapper.update();
    expect(wrapper.find(ConnectivityAlert).exists()).toBeFalsy();
    badge.simulate('click');
    wrapper.update();
    const connectivityAlert2 = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert2.text()).toEqual('Cannot connect to the server. Please retry later.');
  });

  test('platform is accessible', async () => {
    phone.connectivityMonitor._requestSuccessHandler();
    await timeout(500);
    wrapper.update();
    expect(wrapper.find(ConnectivityBadge).text()).not.toEqual('Offline');
    expect(wrapper.find(ConnectivityAlert).exists()).toBeFalsy();
  });
});

describe('Offline = VoIP Only mode + Webphone Unavailable', () => {
  beforeEach(async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.availabilityMonitor._client.service.platform().emit('refreshError',
      { mesage: 'none', apiResponse: { _response: { status: 500 } } });
    wrapper.update();
    badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('VoIP Only');
  });

  test('App is not in webphone mode', async () => {
    phone.callingSettings._setSoftPhoneToCallWith();
    await timeout(500);
    wrapper.update();
    expect(phone.callingSettings.callingMode).not.toEqual(callingModes.webphone);
    expect(wrapper.find(ConnectivityBadge).text()).toEqual('Offline');
    const connectivityAlerts = wrapper.find(ConnectivityAlert) || [];
    expect(connectivityAlerts.map(x => x.text())).toContain('Sorry, something went wrong on our end. Try again later.');
    const button = wrapper.find(CircleButton);
    expect(contains('disabled', button.at(0).prop('className'))).toBeTruthy();
  });

  test('App is in webphone mode and webphone is unavailable', async () => {
    phone.audioSettings.onGetUserMediaError.bind(phone.audioSettings);
    await phone.audioSettings.onGetUserMediaError();
    wrapper.update();
    await timeout(500);
    expect(phone.callingSettings.callingMode).toEqual(callingModes.webphone);
    expect(wrapper.find(ConnectivityBadge).text()).toEqual('Offline');
    const connectivityAlerts = wrapper.find(ConnectivityAlert) || [];
    expect(connectivityAlerts.map(x => x.text())).toContain('Sorry, something went wrong on our end. Try again later.');
    const button = wrapper.find(CircleButton);
    expect(contains('disabled', button.at(0).prop('className'))).toBeTruthy();
  });
});
