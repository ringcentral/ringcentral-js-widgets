import { contains } from 'ramda';
import ConnectivityBadge from 'ringcentral-widgets/components/ConnectivityBadge';
import ConnectivityAlert from 'ringcentral-widgets/components/AlertRenderer/ConnectivityAlert';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import { HAMocks } from '../HALimitedMode/mockLimited';
import { getWrapper, timeout, tearDownWrapper } from '../shared';

/* global jasmine */
let wrapper = null;
let phone = null;
let badge = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

describe('VoIP Only Mode', () => {
  beforeAll(async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
    phone.availabilityMonitor._client.service.platform().emit('refreshError', {
      message: 'none',
      response: { status: 500 },
    });
    await timeout(10); // wait refreshError listener to be executed
    wrapper.update();
    badge = wrapper.find(ConnectivityBadge);
  });

  afterAll(async () => {
    await tearDownWrapper(wrapper);
  });

  test('App is in VoIP Only Mode', () => {
    expect(badge.text()).toEqual('VoIP Only');
    const connectivityAlert = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert.text()).toEqual(
      'Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited.',
    );
  });

  test('App also in limited Mode', () => {
    expect(phone.availabilityMonitor.isLimitedAvailabilityMode).toBeTruthy();
    expect(phone.availabilityMonitor._limitedTimeout).not.toEqual(null);
  });

  test('Call Buttons are enabled', () => {
    const button = wrapper.find(CircleButton);
    expect(contains('disabled', button.at(0).prop('className'))).toBeFalsy();
  });

  test('Click on the badge', async () => {
    phone.connectivityManager._hideAlerts();
    await timeout(500);
    wrapper.update();
    expect(wrapper.find(ConnectivityAlert).exists()).toBeFalsy();
    badge.simulate('click');
    wrapper.update();
    const connectivityAlert2 = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert2.text()).toEqual(
      'Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited.',
    );
  });
});

describe('Exit from VoIP Only Mode to Normal Mode', () => {
  beforeEach(async () => {
    wrapper = await getWrapper();
    phone = wrapper.props().phone;
  });

  afterEach(async () => {
    await tearDownWrapper(wrapper);
  });

  test('Exit from refresh access-token successed.', async () => {
    phone.availabilityMonitor._client.service.platform().emit('refreshError', {
      message: 'none',
      response: { status: 500 },
    });
    await timeout(10);
    wrapper.update();
    badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('VoIP Only');
    const connectivityAlert = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert.text()).toEqual(
      'Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited.',
    );
    expect(phone.availabilityMonitor._limitedTimeout).not.toEqual(null);
    phone.availabilityMonitor._client.service.platform().emit('refreshSuccess');
    await timeout(600);
    wrapper.update();
    badge = wrapper.find(ConnectivityBadge);
    expect(wrapper.find(ConnectivityBadge).text()).not.toEqual('VoIP Only');
    const connectivityAlert2 = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert2.exists()).toBeFalsy();
  });

  test('Exit from check status api return 200.', async () => {
    phone.availabilityMonitor._switchToVoIPOnlyMode();
    await timeout(100);
    wrapper.update();
    badge = wrapper.find(ConnectivityBadge);
    expect(badge.text()).toEqual('VoIP Only');
    const connectivityAlert = wrapper.find(ConnectivityAlert);
    expect(connectivityAlert.text()).toEqual(
      'Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited.',
    );

    phone.availabilityMonitor._randomTime = 0.0001;
    HAMocks.checkStatus();
    await phone.availabilityMonitor._healthCheck();
    await timeout(1000);
    wrapper.update();

    expect(wrapper.find(ConnectivityBadge).text()).not.toEqual('VoIP Only');
    const connectivityAlert2 = wrapper.find(ConnectivityAlert);
    console.error(connectivityAlert2.debug());
    expect(connectivityAlert2.exists()).toBeFalsy();
  });
});
