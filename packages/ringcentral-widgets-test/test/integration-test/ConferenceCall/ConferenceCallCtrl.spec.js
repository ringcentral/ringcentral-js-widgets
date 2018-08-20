import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import * as mock from 'ringcentral-integration/integration-test/mock';
import { mockConferenceCallEnv } from './helper';
import deviceBody from './data/device';
import { getWrapper } from '../shared';
import { makeCall } from '../../support/callHelper';
import {
  muteFn,
  unmuteFn,
  holdFn,
  unholdFn,
} from '../../support/session';

let wrapper = null;
let phone = null;

beforeEach(async () => {
  jasmine.DEFAUL_INTERVAL = 64000;
  wrapper = await getWrapper();
  phone = wrapper.props().phone;
  phone.webphone._createWebphone();
  phone.webphone._removeWebphone = () => { };
  phone.webphone._connect = () => { };
  Object.defineProperties(wrapper.props().phone.audioSettings, {
    userMedia: { value: true },
  });
});

afterEach(() => {
  muteFn.mockClear();
  unmuteFn.mockClear();
  holdFn.mockClear();
  unholdFn.mockClear();
});

describe('Prepare', () => {
  test('Success to mock a conference call', async () => {
    await mockConferenceCallEnv(phone);
    wrapper.update();
    expect(wrapper.find(ActiveCallPad)).toHaveLength(1);
  }, 12000);
});

describe('RCI-1710786 Conference Call Control Page - Mute/Muted', () => {
  test('There is a "Mute" button', async () => {
    await mockConferenceCallEnv(phone);
    wrapper.update();
    const muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');
  }, 12000);
  test('Press Mute/Unmuted button', async () => {
    let muteButton = null;
    const conferenceSession = await mockConferenceCallEnv(phone);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    muteButton.find(CircleButton).simulate('click');
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Unmute');
    expect(muteFn.mock.calls[0]).toEqual([conferenceSession.id]);
    muteButton.find(CircleButton).simulate('click');
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');
    expect(unmuteFn.mock.calls[0]).toEqual([conferenceSession.id]);
  }, 12000);
});

describe('RCI-1710773 Conference Call Control Page - Hold/Unhold', () => {
  test('There is a "Hold" button', async () => {
    await mockConferenceCallEnv(phone);
    wrapper.update();
    const holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
  }, 12000);
  test('Press Hold/Unhold button', async () => {
    let holdButton = null;
    let muteButton = null;
    let recordButton = null;
    const conferenceSession = await mockConferenceCallEnv(phone);
    wrapper.update();
    // Click Hold Button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).simulate('click');
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    expect(holdFn.mock.calls[0]).toEqual([conferenceSession.id]);
    expect(muteButton.props().disabled).toBe(true);
    expect(recordButton.props().disabled).toBe(true);
    // Unhold button
    holdButton.find(CircleButton).simulate('click');
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(unholdFn.mock.calls[0]).toEqual([conferenceSession.id]);
    expect(muteButton.props().disabled).toBe(false);
    expect(recordButton.props().disabled).toBe(false);
  }, 12000);
});

describe('RCI-2980793 Conference Call Control Page - Hang Up', () => {
  test('Press "Hand Up" button #1 Direct to dialer page', async () => {
    await mockConferenceCallEnv(phone);
    wrapper.update();
    const handupButton = wrapper.find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
  });
  test('Press "Hand Up" button #2 Direct to call contral page', async () => {
    mock.device(deviceBody);
    const outboundSession = await makeCall(phone);
    await phone.webphone.hold(outboundSession.id);
    await mockConferenceCallEnv(phone);
    wrapper.update();
    const handupButton = wrapper.find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions).toHaveLength(1);
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
  });
});
