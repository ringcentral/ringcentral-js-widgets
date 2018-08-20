import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import * as mock from 'ringcentral-integration/integration-test/mock';
import { mockConferenceCallEnv } from './helper';
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

describe('RCI-1710786 Conference Call Control Page - Mute/Muted', () => {
  test('Success to mock a conference call', async () => {
    const conferenceSession = await mockConferenceCallEnv(phone);
    phone.routerInteraction.push(`/calls/active/${conferenceSession.id}`);
    wrapper.update();
    expect(wrapper.find(ActiveCallPad)).toHaveLength(1);
  });
  test('There is a "Mute" button', async () => {
    const conferenceSession = await mockConferenceCallEnv(phone);
    phone.routerInteraction.push(`/calls/active/${conferenceSession.id}`);
    wrapper.update();
    const muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');
  });
  test('Press Mute/Unmuted button', async () => {
    let muteButton = null;
    const conferenceSession = await mockConferenceCallEnv(phone);
    phone.routerInteraction.push(`/calls/active/${conferenceSession.id}`);
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
  });
});

describe('RCI-1710773 Conference Call Control Page - Hold/Unhold', () => {
  test('Success to mock a conference call', async () => {
    const conferenceSession = await mockConferenceCallEnv(phone);
    phone.routerInteraction.push(`/calls/active/${conferenceSession.id}`);
    wrapper.update();
    expect(wrapper.find(ActiveCallPad)).toHaveLength(1);
  });
  test('There is a "Hold" button', async () => {
    const conferenceSession = await mockConferenceCallEnv(phone);
    phone.routerInteraction.push(`/calls/active/${conferenceSession.id}`);
    wrapper.update();
    const holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
  });
  test('Press Hold/Unhold button', async () => {
    let holdButton = null;
    let muteButton = null;
    let recordButton = null;
    const conferenceSession = await mockConferenceCallEnv(phone);
    phone.routerInteraction.push(`/calls/active/${conferenceSession.id}`);
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
  });
});
