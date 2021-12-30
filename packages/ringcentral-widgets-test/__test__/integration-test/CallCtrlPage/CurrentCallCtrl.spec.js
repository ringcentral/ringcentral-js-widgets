import ActiveCallPad from '@ringcentral-integration/widgets/components/ActiveCallPad';
import MoreActionItem from '@ringcentral-integration/widgets/components/ActiveCallPad/MoreActionItem';
import ActiveCallDialPad from '@ringcentral-integration/widgets/components/ActiveCallDialPad';
import ActiveCallButton from '@ringcentral-integration/widgets/components/ActiveCallButton';
import IncomingCallPad from '@ringcentral-integration/widgets/components/IncomingCallPad';
import RecipientsInput from '@ringcentral-integration/widgets/components/RecipientsInput';
import RadioBtnGroup from '@ringcentral-integration/widgets/components/RadioBtnGroup';
import TransferPanel from '@ringcentral-integration/widgets/components/TransferPanel';
import CircleButton from '@ringcentral-integration/widgets/components/CircleButton';
import DialButton from '@ringcentral-integration/widgets/components/DialButton';
import FlipPanel from '@ringcentral-integration/widgets/components/FlipPanel';
import Tooltip from '@ringcentral-integration/widgets/components/Tooltip';
import DialPad from '@ringcentral-integration/widgets/components/DialPad';
import TransferIcon from '@ringcentral-integration/widgets/assets/images/Transfer.svg';
import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import forwardingNumberBody from './data/forwardingNumberNoCallFlip';
import { makeOutboundCall, mockConferenceCallEnv } from './helper';
import { getInboundCall } from '../../support/callHelper';
import { initPhoneWrapper, timeout, tearDownWrapper } from '../shared';
import {
  muteFn,
  unmuteFn,
  holdFn,
  unholdFn,
  transferFn,
  flipFn,
  startRecordFn,
  stopRecordFn,
} from '../../support/session';

const ALTERNATIVE_TIMEOUT = 1000; // refer to DialButton

const sid111 = '111';

beforeEach(async () => {
  jasmine.DEFAUL_INTERVAL = 64000;
});

afterEach(() => {
  muteFn.mockClear();
  unmuteFn.mockClear();
  holdFn.mockClear();
  unholdFn.mockClear();
  transferFn.mockClear();
  flipFn.mockClear();
  startRecordFn.mockClear();
  stopRecordFn.mockClear();
});

async function makeInbountCall(phone, wrapper, sessionId, answerIt = false) {
  const session = await getInboundCall(phone, {
    id: sessionId,
    direction: 'Inbound',
  });
  wrapper.update();
  if (answerIt) {
    // Click Answer Button
    wrapper
      .find(IncomingCallPad)
      .find(ActiveCallButton)
      .at(4)
      .find(CircleButton)
      .find('g')
      .simulate('click');
    await timeout(100);
    wrapper.update();
  }
  return session;
}

async function enterToNumber(domInput, number) {
  domInput.instance().value = number;
  await domInput.simulate('change');
  await timeout(100);
}

describe('Enter to Current Call Page', () => {
  test('Make an outbound call, page should be in Current Call Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    const outboundSession = await makeOutboundCall(phone);
    wrapper.update();
    expect(wrapper.find(ActiveCallPad)).toHaveLength(1);
    expect(phone.routerInteraction.currentPath).toEqual(
      `/calls/active/${outboundSession.id}`,
    );
    await tearDownWrapper(wrapper);
  });
  test('Answer an inbound call, page should be in Current Call Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    const inboundCall = await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    expect(wrapper.find(ActiveCallPad)).toHaveLength(1);
    expect(phone.routerInteraction.currentPath).toEqual(
      `/calls/active/${inboundCall.id}`,
    );
    await tearDownWrapper(wrapper);
  });
  test('Make an outbound call, check buttons in Current Call Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    const buttons = wrapper.find(ActiveCallPad).find(ActiveCallButton);
    expect(buttons.at(0).text()).toEqual('Mute');
    expect(buttons.at(1).text()).toEqual('Keypad');
    expect(buttons.at(2).text()).toEqual('Hold');
    expect(buttons.at(3).text()).toEqual('Add');
    expect(buttons.at(4).text()).toEqual('Record');
    expect(buttons.at(5).text()).toEqual('Call Actions');
    const moreButton = buttons.at(5);
    moreButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    const transferButton = wrapper
      .find(ActiveCallPad)
      .find(Tooltip)
      .find(MoreActionItem)
      .at(0);
    const flipButton = wrapper
      .find(ActiveCallPad)
      .find(Tooltip)
      .find(MoreActionItem)
      .at(1);
    expect(transferButton.text()).toEqual('Transfer');
    expect(flipButton.text()).toEqual('Flip');
    const handupButton = wrapper.find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    await tearDownWrapper(wrapper);
  });
});

describe('Current Call Control Page - Hang Up', () => {
  test('RCI-1712650 Answer an inbound call and keep in active call page, click "Hang Up" Button', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    expect(phone.webphone.sessions).toHaveLength(1);
    const handupButton = wrapper
      .find(ActiveCallPad)
      .find('.stopButtonGroup')
      .find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
  });
  test('RCI-1712650 Make an outbound call and keep in active call page, click "Hang Up" Button', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    expect(phone.webphone.sessions).toHaveLength(1);
    const handupButton = wrapper
      .find(ActiveCallPad)
      .find('.stopButtonGroup')
      .find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
    await tearDownWrapper(wrapper);
  });
});

describe('Current Call Control Page - Keypad', () => {
  test('RCI-1712646 Answer an inbound call and keep in active call page, click Keypad and "0"', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    const keypadButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(1);
    keypadButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    // mock click action
    const zeroDialButton = wrapper
      .find(ActiveCallDialPad)
      .find(DialButton)
      .at(10);
    zeroDialButton
      .find('.btnSvgGroup')
      .simulate('mousedown', { fromSimulation: true });
    zeroDialButton.find('.btnSvgGroup').simulate('mouseup');
    await timeout(100);
    expect(wrapper.find(ActiveCallDialPad).find('input').props().value).toEqual(
      '0',
    );

    zeroDialButton
      .find('.btnSvgGroup')
      .simulate('mousedown', { fromSimulation: true });
    await timeout(ALTERNATIVE_TIMEOUT);
    zeroDialButton.find('.btnSvgGroup').simulate('mouseup');
    await timeout(100);
    expect(wrapper.find(ActiveCallDialPad).find('input').props().value).toEqual(
      '0+',
    );
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712646 Make an outbound call and keep in active call page, click Keypad and "0"', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    const keypadButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(1);
    keypadButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    const zeroDialButton = wrapper
      .find(ActiveCallDialPad)
      .find(DialButton)
      .at(10);
    zeroDialButton.find('.btnSvgGroup').simulate('mousedown');
    zeroDialButton.find('.btnSvgGroup').simulate('mouseup');
    await timeout(100);
    expect(wrapper.find(ActiveCallDialPad).find('input').props().value).toEqual(
      '0',
    );

    zeroDialButton.find('.btnSvgGroup').simulate('mousedown');
    await timeout(ALTERNATIVE_TIMEOUT);
    zeroDialButton.find('.btnSvgGroup').simulate('mouseup');
    await timeout(100);
    expect(wrapper.find(ActiveCallDialPad).find('input').props().value).toEqual(
      '0+',
    );
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712646 Answer an inbound call and keep in active call page, click Keypad and Back', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    const keypadButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(1);
    keypadButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(1);
    const backButton = wrapper
      .find(ActiveCallDialPad)
      .find('BackHeader')
      .find('Button')
      .first();
    backButton.simulate('click');
    await timeout(100);
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(0);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712646 Make an outbound call and keep in active call page, click Keypad and Back', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    const keypadButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(1);
    keypadButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(1);
    const backButton = wrapper
      .find(ActiveCallDialPad)
      .find('BackHeader')
      .find('Button')
      .first();
    backButton.simulate('click');
    await timeout(100);
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(0);
    await tearDownWrapper(wrapper);
  });
});

describe('Current Call Control Page - Hold/Unhold', () => {
  test('RCI-1712647 Answer an inbound call and keep in active call page, click Hold/Unhold', async () => {
    let holdButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');

    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);

    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    expect(holdFn.mock.calls[0]).toEqual([sid111]);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);

    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(unholdFn.mock.calls[0]).toEqual([sid111]);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712647 Make an outbound call and keep in active call page, click Hold/Unhold', async () => {
    let holdButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    const outboundSession = await makeOutboundCall(phone);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');

    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    expect(holdFn.mock.calls[0]).toEqual([outboundSession.id]);

    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(unholdFn.mock.calls[0]).toEqual([outboundSession.id]);
    await tearDownWrapper(wrapper);
  });
});

describe('Current Call Control Page - Mute/Unmute', () => {
  test('Answer an inbound call then user hold the call, Mute/Unmute should be disabled', async () => {
    let holdButton = null;
    let muteButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    // Click Hold Button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.props().disabled).toBe(true);
    // Unhold button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.props().disabled).toBe(false);
    await tearDownWrapper(wrapper);
  });
  test('Make an outbound call then user hold the call, Mute/Unmute should be disabled', async () => {
    let holdButton = null;
    let muteButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    // Click Hold Button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.props().disabled).toBe(true);
    // Unhold button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.props().disabled).toBe(false);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712648 Answer an inbound call and keep in active call page, click Mute/Unmute', async () => {
    let muteButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');

    muteButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Unmute');
    expect(muteFn.mock.calls[0]).toEqual([sid111]);

    muteButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');
    expect(unmuteFn.mock.calls[0]).toEqual([sid111]);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712648 Make an outbound call and keep in active call page, click Mute/Unmute', async () => {
    let muteButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    const outboundSession = await makeOutboundCall(phone);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');

    muteButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Unmute');
    expect(muteFn.mock.calls[0]).toEqual([outboundSession.id]);

    muteButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');
    expect(unmuteFn.mock.calls[0]).toEqual([outboundSession.id]);
    await tearDownWrapper(wrapper);
  });
});

describe('Current Call Control Page - Record/Stop', () => {
  test('RCI-1712647 Answer an inbound call then user hold the call, Record should be disabled', async () => {
    let holdButton = null;
    let recordButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    // Click Hold Button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.props().disabled).toBe(true);
    // Unhold button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.props().disabled).toBe(false);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712647 Make an outbound call then user hold the call, Record should be disabled', async () => {
    let holdButton = null;
    let recordButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    // Click Hold Button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.props().disabled).toBe(true);
    // Unhold button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.props().disabled).toBe(false);
    await tearDownWrapper(wrapper);
  });
  test('If the outbound call is not accepted, it should be failed to record the call', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    const recordButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(4);
    recordButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    expect(startRecordFn.mock.calls).toHaveLength(0);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712679 Answer an inbound call and keep in active call page, click Record/Stop', async () => {
    let recordButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.find('.buttonTitle').text()).toEqual('Record');

    recordButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(startRecordFn.mock.calls[0]).toEqual([sid111]);
    expect(recordButton.find('.buttonTitle').text()).toEqual('Stop');

    recordButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.find('.buttonTitle').text()).toEqual('Record');
    expect(stopRecordFn.mock.calls[0]).toEqual([sid111]);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712679 Make an outbound call and keep in active call page, click Record/Stop', async () => {
    let recordButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    const outboundSession = await makeOutboundCall(phone);
    wrapper.update();
    outboundSession.accept(phone.webphone.acceptOptions);
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.find('.buttonTitle').text()).toEqual('Record');

    recordButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.find('.buttonTitle').text()).toEqual('Stop');
    expect(startRecordFn.mock.calls[0]).toEqual([outboundSession.id]);

    recordButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    wrapper.update();
    recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    expect(recordButton.find('.buttonTitle').text()).toEqual('Record');
    expect(stopRecordFn.mock.calls[0]).toEqual([outboundSession.id]);
    await tearDownWrapper(wrapper);
  });
});

describe('Current Call Control Page - Merge', () => {
  test('When user records the conference call, user can not merge call to conference call', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockConferenceCallEnv(phone);
    wrapper.update();
    const recordButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(4);
    recordButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    const holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    await makeOutboundCall(phone);
    wrapper.update();
    const mergeButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(3);
    mergeButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
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

describe('Current Call Control Page - Add', () => {
  test('When user records the outbound call, user can not add another call to merge a conference call', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    const outboundSession = await makeOutboundCall(phone);
    outboundSession.accept(phone.webphone.acceptOptions);
    await timeout(10);
    wrapper.update();
    const recordButton = wrapper
      .find(ActiveCallPad)
      .find(ActiveCallButton)
      .at(4);
    recordButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
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

describe('Current Call Control Page - Transfer', () => {
  async function getTransferButton(wrapper) {
    const moreButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(5);
    moreButton.find(CircleButton).find('g').simulate('click');
    await timeout(100);
    wrapper.update();
    const transferButton = wrapper
      .find(ActiveCallPad)
      .find(Tooltip)
      .find(MoreActionItem)
      .at(0);
    return transferButton;
  }

  test('RCI-1712674 Answer an inbound call and keep in active call page, click Transfer Button', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    const transferButton = await getTransferButton(wrapper);
    transferButton.find('.buttonItem').simulate('click');
    await timeout(100);
    expect(wrapper.find(TransferPanel)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712674 Make an outbound call and keep in active call page, click Transfer Button', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    const transferButton = await getTransferButton(wrapper);
    transferButton.find('.buttonItem').simulate('click');
    await timeout(10);
    wrapper.update();
    expect(wrapper.find(TransferPanel)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712674 Check Transfer Panel Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    wrapper.update();
    await makeInbountCall(phone, wrapper, sid111, true);
    const transferButton = await getTransferButton(wrapper);
    transferButton.find('.buttonItem').simulate('click');
    await timeout(10);
    wrapper.update();
    const panel = wrapper.find(TransferPanel);
    expect(panel).toHaveLength(1);
    expect(panel.find('BackHeader')).toHaveLength(1);
    expect(panel.find('BackHeader').find('Button')).toHaveLength(1);
    expect(panel.find('BackHeader').text()).toEqual('Transfer to');
    expect(panel.find(RecipientsInput)).toHaveLength(1);
    expect(panel.find(RecipientsInput).find('label').text()).toEqual('To:');
    expect(
      panel.find(RecipientsInput).find('input').props().placeholder,
    ).toEqual('Enter Name or Number');
    expect(panel.find(DialPad)).toHaveLength(1);
    expect(panel.find(CircleButton).find(TransferIcon)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712674 Transfer Panel: click Transfer and Back Button', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    const transferButton = await getTransferButton(wrapper);
    transferButton.find('.buttonItem').simulate('click');
    await timeout(10);
    wrapper.update();
    const backButton = wrapper
      .find(TransferPanel)
      .find('BackHeader')
      .find('Button')
      .first();
    backButton.simulate('click');
    await timeout(100);
    expect(wrapper.find(TransferPanel)).toHaveLength(0);
    await tearDownWrapper(wrapper);
  });
  test('Transfer Panel: failed to transfer call', async () => {
    let messages = null;
    let store = null;
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    const transferButton = await getTransferButton(wrapper);
    transferButton.find('.buttonItem').simulate('click');
    await timeout(10);
    wrapper.update();
    const transferBtn = wrapper.find(TransferPanel).find(CircleButton).last();
    transferBtn.find('g').simulate('click');
    await timeout(200);
    wrapper.update();
    store = wrapper.props().phone.store;
    messages = store.getState(wrapper).alert.messages;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: 'warning',
          message: 'callErrors-noToNumber',
        }),
      ]),
    );
    const domInput = wrapper
      .find(TransferPanel)
      .find(RecipientsInput)
      .find('input');
    enterToNumber(domInput, 'abcde');
    transferBtn.find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    messages = store.getState(wrapper).alert.messages;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: 'warning',
          message: 'callErrors-noToNumber',
        }),
      ]),
    );
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712674 Transfer Panel: success to transfer call, navigates to the page user last viewed', async () => {
    const { wrapper, phone } = await initPhoneWrapper({
      numberParseIsOnce: false,
    });
    await makeOutboundCall(phone);
    wrapper.update();
    const transferButton = await getTransferButton(wrapper);
    transferButton.find('.buttonItem').simulate('click');
    await timeout(10);
    wrapper.update();
    const domInput = wrapper
      .find(TransferPanel)
      .find(RecipientsInput)
      .find('input');
    enterToNumber(domInput, '987654321');
    const transferBtn = wrapper.find(TransferPanel).find(CircleButton).last();
    transferBtn.find('svg').find('g').simulate('click');
    await timeout(2000);
    const validatedResult = await phone.numberValidate.validateNumbers([
      '987654321',
    ]);
    const validPhoneNumber =
      validatedResult.numbers[0] && validatedResult.numbers[0].e164;
    expect(transferFn.mock.calls[0]).toContain(validPhoneNumber);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
    await tearDownWrapper(wrapper);
  });
});

describe('Current Call Control Page - Flip', () => {
  async function getFlipButton(wrapper) {
    const moreButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(5);
    moreButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    const flipButton = wrapper
      .find(ActiveCallPad)
      .find(Tooltip)
      .find(MoreActionItem)
      .at(1);
    return flipButton;
  }
  test('RCI-1712647 Answer an inbound call then user hold the call, Flip should be disabled', async () => {
    let holdButton = null;
    let flipButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    // Click Hold Button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    flipButton = await getFlipButton(wrapper);
    expect(flipButton.props().disabled).toBe(true);
    // Unhold button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    flipButton = await getFlipButton(wrapper);
    expect(flipButton.props().disabled).toBe(false);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712647 Make an outbound call then user hold the call, Flip should be disabled', async () => {
    let holdButton = null;
    let flipButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    // Click Hold Button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    flipButton = await getFlipButton(wrapper);
    expect(flipButton.props().disabled).toBe(true);
    // Unhold button
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    flipButton = await getFlipButton(wrapper);
    expect(flipButton.props().disabled).toBe(false);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712678 if user does not have filp numbers, Flip should be disabled', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    mock.forwardingNumber(forwardingNumberBody);
    await phone.forwardingNumber.fetchData();
    await makeOutboundCall(phone);
    wrapper.update();
    const flipButton = await getFlipButton(wrapper);
    expect(flipButton.props().disabled).toBe(true);
    await tearDownWrapper(wrapper);
  });

  test('RCI-1712678 Answer an inbound call and keep in active call page, click Flip Button', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111, true);
    wrapper.update();
    const flipButton = await getFlipButton(wrapper);
    flipButton.find('.buttonItem').simulate('click');
    await timeout(100);
    expect(wrapper.find(FlipPanel)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712678 Make an outbound call and keep in active call page, click Flip Button', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeOutboundCall(phone);
    wrapper.update();
    const flipButton = await getFlipButton(wrapper);
    flipButton.find('.buttonItem').simulate('click');
    await timeout(100);
    expect(wrapper.find(FlipPanel)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712678 Check Flip Panel Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    const filpNumbers = phone.forwardingNumber.flipNumbers;
    await makeOutboundCall(phone);
    wrapper.update();
    const flipButton = await getFlipButton(wrapper);
    flipButton.find('.buttonItem').simulate('click');
    await timeout(10);
    wrapper.update();
    expect(wrapper.find(FlipPanel)).toHaveLength(1);
    const panel = wrapper.find(FlipPanel);
    expect(panel).toHaveLength(1);
    expect(panel.find('BackHeader')).toHaveLength(1);
    expect(panel.find('BackHeader').find('Button')).toHaveLength(1);
    expect(panel.find('BackHeader').text()).toEqual('Flip Call to...');
    const radioOptions = panel.find(RadioBtnGroup).find('.radioOption');
    expect(radioOptions).toHaveLength(filpNumbers.length);
    filpNumbers.forEach((item, index) => {
      const phoneNumber = wrapper
        .find(FlipPanel)
        .props()
        .formatPhone(item.phoneNumber);
      expect(radioOptions.at(index).find('.optionNumber').text()).toEqual(
        phoneNumber,
      );
      expect(radioOptions.at(index).find('.optionLabel').text()).toEqual(
        item.label,
      );
    });
    expect(panel.find(CircleButton).find('.btnSvg.flipButton')).toHaveLength(1);
    expect(
      panel.find(CircleButton).find('.btnSvg.completeButton'),
    ).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
  test('RCI-1712678 Click Flip button in Flip Panel Page', async () => {
    let flipIconButton = null;
    let endIconButton = null;
    const { wrapper, phone } = await initPhoneWrapper();
    const filpNumbers = phone.forwardingNumber.flipNumbers;
    await makeOutboundCall(phone);
    wrapper.update();
    const flipButton = await getFlipButton(wrapper);
    flipButton.find('.buttonItem').simulate('click');
    await timeout(10);
    wrapper.update();
    expect(wrapper.find(FlipPanel)).toHaveLength(1);
    flipIconButton = wrapper.find(FlipPanel).find(CircleButton).at(0);
    endIconButton = wrapper.find(FlipPanel).find(CircleButton).at(1);
    expect(flipIconButton.props().disabled).toBe(false);
    expect(endIconButton.props().disabled).toBe(true);
    flipIconButton.find('svg').find('g').simulate('click');
    await timeout(100);
    wrapper.update();
    flipIconButton = wrapper.find(FlipPanel).find(CircleButton).at(0);
    endIconButton = wrapper.find(FlipPanel).find(CircleButton).at(1);
    expect(flipFn.mock.calls[0]).toContain(filpNumbers[0].phoneNumber);
    expect(endIconButton.props().disabled).toBe(false);
    expect(flipIconButton.props().disabled).toBe(true);
    endIconButton.find('svg').find('g').simulate('click');
    await timeout(10);
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
    await tearDownWrapper(wrapper);
  });
});
