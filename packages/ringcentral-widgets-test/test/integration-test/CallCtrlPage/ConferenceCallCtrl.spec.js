import ConferenceInfo from 'ringcentral-widgets/components/ActiveCallPanel/ConferenceInfo';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import {
  makeOutboundCall,
  mockConferenceCallEnv,
  updateConferenceCallEnv,
} from './helper';
import { initPhoneWrapper, timeout, tearDownWrapper } from '../shared';
import {
  muteFn,
  unmuteFn,
  holdFn,
  unholdFn,
  startRecordFn,
  stopRecordFn,
} from '../../support/session';

beforeEach(async () => {
  jasmine.DEFAUL_INTERVAL = 64000;
});

afterEach(() => {
  muteFn.mockClear();
  unmuteFn.mockClear();
  holdFn.mockClear();
  unholdFn.mockClear();
  startRecordFn.mockClear();
  stopRecordFn.mockClear();
});

describe('Prepare', () => {
  test('Success to mock a conference call', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockConferenceCallEnv(phone);
    wrapper.update();
    expect(wrapper.find(ActiveCallPad)).toHaveLength(1);
    expect(wrapper.find(ConferenceInfo)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('Check buttons in Conference Call Ctrl Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockConferenceCallEnv(phone);
    wrapper.update();
    const buttons = wrapper.find(ActiveCallPad).find(ActiveCallButton);
    expect(buttons.at(0).text()).toEqual('Mute');
    expect(buttons.at(1).text()).toEqual('Keypad');
    expect(buttons.at(2).text()).toEqual('Hold');
    expect(buttons.at(3).text()).toEqual('Add');
    expect(buttons.at(4).text()).toEqual('Record');
    expect(buttons.at(5).text()).toEqual('Call Actions');
    const handupButton = wrapper.find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    await tearDownWrapper(wrapper);
  });
});

describe('RCI-1710786 Conference Call Control Page - Mute/Muted', () => {
  test('Press Mute/Unmuted button', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let muteButton = null;
    const conferenceSession = await mockConferenceCallEnv(phone);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    muteButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Unmute');
    expect(muteFn.mock.calls[0]).toEqual([conferenceSession.id]);
    muteButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');
    expect(unmuteFn.mock.calls[0]).toEqual([conferenceSession.id]);
    await tearDownWrapper(wrapper);
  });
});

describe('RCI-1710773 Conference Call Control Page - Hold/Unhold', () => {
  test('Press Hold/Unhold button', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    let holdButton = null;
    let muteButton = null;
    let recordButton = null;
    const conferenceSession = await mockConferenceCallEnv(phone);
    wrapper.update();
    // Click Hold Button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    expect(holdFn.mock.calls[0]).toEqual([conferenceSession.id]);
    expect(muteButton.props().disabled).toBe(true);
    expect(recordButton.props().disabled).toBe(true);
    // Unhold button
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(unholdFn.mock.calls[0]).toEqual([conferenceSession.id]);
    expect(muteButton.props().disabled).toBe(false);
    expect(recordButton.props().disabled).toBe(false);
    await tearDownWrapper(wrapper);
  });
});

describe('RCI-2980793 Conference Call Control Page - Hang Up', () => {
  test('Press "Hand Up" button #1 Direct to dialer page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockConferenceCallEnv(phone);
    wrapper.update();
    const handupButton = wrapper.find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
    await tearDownWrapper(wrapper);
  });
  test('Press "Hand Up" button #2 Direct to call contral page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    const outboundSession = await makeOutboundCall(phone);
    await phone.webphone.hold(outboundSession.id);
    await mockConferenceCallEnv(phone);
    wrapper.update();
    const handupButton = wrapper.find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    expect(phone.webphone.sessions).toHaveLength(1);
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
    await tearDownWrapper(wrapper);
  });
});

describe('Conference Call Control Page - Record/Stop', () => {
  let recordButton = null;
  test('RCI-1712679 Make a conference call and keep in conference call control page, click Record/Stop', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    const conferenceSession = await mockConferenceCallEnv(phone);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.find('.buttonTitle').text()).toEqual('Record');

    recordButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.find('.buttonTitle').text()).toEqual('Stop');
    expect(startRecordFn.mock.calls[0]).toEqual([conferenceSession.id]);

    recordButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.find('.buttonTitle').text()).toEqual('Record');
    expect(stopRecordFn.mock.calls[0]).toEqual([conferenceSession.id]);
    await tearDownWrapper(wrapper);
  });
});

describe('Conference Call Control Page - Add', () => {
  test('When user records the conference call, user can not add other call', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockConferenceCallEnv(phone);
    wrapper.update();
    const recordButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(4);
    recordButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    const store = wrapper.props().phone.store;
    const messages = store.getState(wrapper).alert.messages;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: 'warning',
          message: 'conferenceCall-callIsRecording',
        }),
      ]),
    );
    await tearDownWrapper(wrapper);
  });
});

describe(`RCI-12004 Conference maximize participants: User has a Conference Call and has 10
 participants (include host)`, () => {
  test('#2, #3 , check the Conference/Normal call control page:', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockConferenceCallEnv(phone, { conferencePartiesCount: 10 });
    wrapper.update();
    expect(wrapper.find(ConferenceInfo).find('.remains').text()).toEqual('+5');
    // #2 Go to Conference call control page, the Add button is disabled
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    expect(addButton.props().title).toEqual('Add');
    expect(addButton.props().disabled).toBe(true);
    expect(
      addButton.find(CircleButton).find('svg').props().className,
    ).toContain('buttonDisabled');
    // #3 Make an outbound call, the Merge button is disabled
    await makeOutboundCall(phone);
    wrapper.update();
    const mergeButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(3);
    expect(mergeButton.props().title).toEqual('Merge');
    expect(mergeButton.props().disabled).toBe(true);
    expect(
      mergeButton.find(CircleButton).find('svg').props().className,
    ).toContain('buttonDisabled');
    await tearDownWrapper(wrapper);
  });
  test('#4 One of Participants quit Conference Call, Merge button is enabled in Normal Call Ctrl Page:', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    // Add to maximum
    await mockConferenceCallEnv(phone, { conferencePartiesCount: 10 });
    // make outbound call
    await makeOutboundCall(phone);
    // one of Participants quit Conference Call
    await updateConferenceCallEnv(phone, { conferencePartiesCount: 9 });
    wrapper.update();
    const mergeButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(3);
    expect(mergeButton.props().title).toEqual('Merge');
    expect(mergeButton.props().disabled).toBe(false);
    expect(
      mergeButton.find(CircleButton).find('svg').props().className,
    ).not.toContain('buttonDisabled');
    await tearDownWrapper(wrapper);
  });
  test('#5 One of Participants quit Conference Call, Add button is enabled in Conference Call Ctrl Page:', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    // Add to maximum
    await mockConferenceCallEnv(phone, { conferencePartiesCount: 10 });
    // one of Participants quit Conference Call
    await updateConferenceCallEnv(phone, { conferencePartiesCount: 9 });
    wrapper.update();
    expect(wrapper.find(ConferenceInfo).find('.remains').text()).toEqual('+4');
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    expect(addButton.props().title).toEqual('Add');
    expect(addButton.props().disabled).toBe(false);
    expect(
      addButton.find(CircleButton).find('svg').props().className,
    ).not.toContain('buttonDisabled');
    await tearDownWrapper(wrapper);
  });
});
