import ActiveCallPad, { MoreActionItem } from 'ringcentral-widgets/components/ActiveCallPad';
import ActiveCallDialPad from 'ringcentral-widgets/components/ActiveCallDialPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import { HeaderButton } from 'ringcentral-widgets/components/Header';
import DialButton from 'ringcentral-widgets/components/DialButton';
import Tooltip from 'ringcentral-widgets/components/Tooltip';
import * as mock from 'ringcentral-integration/integration-test/mock';
import deviceBody from './data/device';
import { getWrapper, timeout } from '../shared';
import { makeCall, getInboundCall } from '../../support/callHelper';
import {
  muteFn,
  unmuteFn,
  holdFn,
  unholdFn,
} from '../../support/session';

const ALTERNATIVE_TIMEOUT = 1000; // refer to DialButton

const sid111 = '111';
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

async function makeOutboundCall() {
  mock.device(deviceBody);
  const session = await makeCall(phone);
  wrapper.update();
  return session;
}

async function makeInbountCall(sessionId, answerIt = false) {
  await getInboundCall(phone, {
    id: sessionId,
    direction: 'Inbound'
  });
  wrapper.update();
  if (answerIt) {
    // Click Answer Button
    wrapper
      .find(IncomingCallPad)
      .find(ActiveCallButton).at(4)
      .find(CircleButton)
      .simulate('click');
  }
}

describe('Enter to Current Call Page', () => {
  test('Make an outbound call, page should be in Current Call Page', async () => {
    await makeOutboundCall();
    expect(wrapper.find(ActiveCallPad)).toHaveLength(1);
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
  });
  test('Answer an inbound call, page should be in Current Call Page', async () => {
    await makeInbountCall(sid111, true);
    expect(wrapper.find(ActiveCallPad)).toHaveLength(1);
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
  });
  test('Make an outbound call, check buttons in Current Call Page', async () => {
    await makeInbountCall(sid111, true);
    const buttons = wrapper.find(ActiveCallPad).find(ActiveCallButton);
    expect(buttons.at(0).text()).toEqual('Mute');
    expect(buttons.at(1).text()).toEqual('Keypad');
    expect(buttons.at(2).text()).toEqual('Hold');
    expect(buttons.at(3).text()).toEqual('Add');
    expect(buttons.at(4).text()).toEqual('Record');
    expect(buttons.at(5).text()).toEqual('Call Actions');
  });
});

describe('RCI-1712650 Current Call Control Page - Hang Up', () => {
  test('Answer an inbound call and keep in active call page, click "Hang Up" Button', async () => {
    await makeInbountCall(sid111, true);
    expect(phone.webphone.sessions).toHaveLength(1);
    const handupButton = wrapper.find(ActiveCallPad).find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
  });
  test('Make an outbound call and keep in active call page, click "Hang Up" Button', async () => {
    await makeOutboundCall();
    expect(phone.webphone.sessions).toHaveLength(1);
    const handupButton = wrapper.find(ActiveCallPad).find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
  });
});

describe('RCI-1712646 Current Call Control Page - Keypad', () => {
  test('Answer an inbound call and keep in active call page, click Keypad and "0"', async () => {
    await makeInbountCall(sid111, true);
    const keypadButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(1);
    keypadButton.find(CircleButton).simulate('click');
    const zeroDialButton = wrapper.find(ActiveCallDialPad).find(DialButton).at(10);
    zeroDialButton.find('.btnSvgGroup').simulate('mousedown');
    zeroDialButton.find('.btnSvgGroup').simulate('mouseup');
    expect(wrapper.find(ActiveCallDialPad).find('input').props().value).toEqual('0');

    zeroDialButton.find('.btnSvgGroup').simulate('mousedown');
    await timeout(ALTERNATIVE_TIMEOUT);
    zeroDialButton.find('.btnSvgGroup').simulate('mouseup');
    expect(wrapper.find(ActiveCallDialPad).find('input').props().value).toEqual('0+');
  });
  test('Make an outbound call and keep in active call page, click Keypad and "0"', async () => {
    await makeOutboundCall();
    const keypadButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(1);
    keypadButton.find(CircleButton).simulate('click');
    const zeroDialButton = wrapper.find(ActiveCallDialPad).find(DialButton).at(10);
    zeroDialButton.find('.btnSvgGroup').simulate('mousedown');
    zeroDialButton.find('.btnSvgGroup').simulate('mouseup');
    expect(wrapper.find(ActiveCallDialPad).find('input').props().value).toEqual('0');

    zeroDialButton.find('.btnSvgGroup').simulate('mousedown');
    await timeout(ALTERNATIVE_TIMEOUT);
    zeroDialButton.find('.btnSvgGroup').simulate('mouseup');
    expect(wrapper.find(ActiveCallDialPad).find('input').props().value).toEqual('0+');
  });
  test('Answer an inbound call and keep in active call page, click Keypad and Back', async () => {
    await makeInbountCall(sid111, true);
    const keypadButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(1);
    keypadButton.find(CircleButton).simulate('click');
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(1);
    const backButton = wrapper.find(ActiveCallDialPad).find(HeaderButton).first();
    backButton.simulate('click');
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(0);
  });
  test('Make an outbound call and keep in active call page, click Keypad and Back', async () => {
    await makeOutboundCall();
    const keypadButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(1);
    keypadButton.find(CircleButton).simulate('click');
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(1);
    const backButton = wrapper.find(ActiveCallDialPad).find(HeaderButton).first();
    backButton.simulate('click');
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(0);
  });
});

describe('RCI-1712647 Current Call Control Page - Hold/Unhold', () => {
  let holdButton = null;

  test('Answer an inbound call and keep in active call page, click Hold/Unhold', async () => {
    await makeInbountCall(sid111, true);
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    // Click Hold Button
    holdButton.find(CircleButton).simulate('click');
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    // TODO: Flip button
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    expect(holdFn.mock.calls[0]).toEqual([sid111]);
    // Unhold button
    holdButton.find(CircleButton).simulate('click');
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    // TODO: Flip button
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(unholdFn.mock.calls[0]).toEqual([sid111]);
  });
  test('Make an outbound call and keep in active call page, click Hold/Unhold', async () => {
    const outboundSession = await makeOutboundCall();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    // Click Hold Button
    holdButton.find(CircleButton).simulate('click');
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    // TODO: Flip button
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    expect(holdFn.mock.calls[0]).toEqual([outboundSession.id]);
    // Unhold button
    holdButton.find(CircleButton).simulate('click');
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    // TODO: Flip button
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(unholdFn.mock.calls[0]).toEqual([outboundSession.id]);
  });
});

describe('Current Call Control Page - Mute/Unmute', () => {
  let holdButton = null;
  let muteButton = null;
  test('Answer an inbound call then user hold the call, Mute/Unmute should be disabled',
    async () => {
      await makeInbountCall(sid111, true);
      // Click Hold Button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
      expect(muteButton.props().disabled).toBe(true);
      // Unhold button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
      expect(muteButton.props().disabled).toBe(false);
    }
  );
  test('Make an outbound call then user hold the call, Mute/Unmute should be disabled',
    async () => {
      await makeOutboundCall();
      // Click Hold Button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
      expect(muteButton.props().disabled).toBe(true);
      // Unhold button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
      expect(muteButton.props().disabled).toBe(false);
    }
  );
});

describe('Current Call Control Page - Record', () => {
  let holdButton = null;
  let recordButton = null;
  test('RCI-1712647 Answer an inbound call then user hold the call, Record should be disabled',
    async () => {
      await makeInbountCall(sid111, true);
      // Click Hold Button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      expect(recordButton.props().disabled).toBe(true);
      // Unhold button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      expect(recordButton.props().disabled).toBe(false);
    }
  );
  test('RCI-1712647 Make an outbound call then user hold the call, Record should be disabled',
    async () => {
      await makeOutboundCall();
      // Click Hold Button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      expect(recordButton.props().disabled).toBe(true);
      // Unhold button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      expect(recordButton.props().disabled).toBe(false);
    }
  );
});

describe('Current Call Control Page - Flip', () => {
  let holdButton = null;
  let flipButton = null;
  function getFlipButton() {
    const moreButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(5);
    moreButton.find(CircleButton).simulate('click');
    const flipButton = wrapper.find(ActiveCallPad).find(Tooltip).find(MoreActionItem).at(1);
    return flipButton;
  }

  test('RCI-1712647 Answer an inbound call then user hold the call, Flip should be disabled',
    async () => {
      await makeInbountCall(sid111, true);
      // Click Hold Button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      flipButton = getFlipButton();
      expect(flipButton.props().disabled).toBe(true);
      // Unhold button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      flipButton = getFlipButton();
      expect(flipButton.props().disabled).toBe(false);
    }
  );
  test('RCI-1712647 Make an outbound call then user hold the call, Flip should be disabled',
    async () => {
      await makeOutboundCall();
      // Click Hold Button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      flipButton = getFlipButton();
      expect(flipButton.props().disabled).toBe(true);
      // Unhold button
      holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
      holdButton.find(CircleButton).simulate('click');
      flipButton = getFlipButton();
      expect(flipButton.props().disabled).toBe(false);
    }
  );
});
