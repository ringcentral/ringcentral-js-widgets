import ActiveCallPad, { MoreActionItem } from 'ringcentral-widgets/components/ActiveCallPad';
import ActiveCallDialPad from 'ringcentral-widgets/components/ActiveCallDialPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import RecipientsInput from 'ringcentral-widgets/components/RecipientsInput';
import TransferPanel from 'ringcentral-widgets/components/TransferPanel';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import { HeaderButton } from 'ringcentral-widgets/components/Header';
import DialButton from 'ringcentral-widgets/components/DialButton';
import BackHeader from 'ringcentral-widgets/components/BackHeader';
import Tooltip from 'ringcentral-widgets/components/Tooltip';
import DialPad from 'ringcentral-widgets/components/DialPad';
import TransferIcon from 'ringcentral-widgets/assets/images/Transfer.svg';
import * as mock from 'ringcentral-integration/integration-test/mock';
import deviceBody from './data/device';
import { getWrapper, timeout } from '../shared';
import { makeCall, getInboundCall } from '../../support/callHelper';
import {
  muteFn,
  unmuteFn,
  holdFn,
  unholdFn,
  transferFn,
} from '../../support/session';

const ALTERNATIVE_TIMEOUT = 1000; // refer to DialButton

const sid111 = '111';
let wrapper = null;
let store = null;
let phone = null;

beforeEach(async () => {
  jasmine.DEFAUL_INTERVAL = 64000;
  wrapper = await getWrapper();
  phone = wrapper.props().phone;
  phone.webphone._createWebphone();
  phone.webphone._removeWebphone = () => {};
  phone.webphone._connect = () => {};
  store = wrapper.props().phone.store;
  Object.defineProperties(wrapper.props().phone.audioSettings, {
    userMedia: { value: true },
  });
});

afterEach(() => {
  muteFn.mockClear();
  unmuteFn.mockClear();
  holdFn.mockClear();
  unholdFn.mockClear();
  transferFn.mockClear();
});


async function enterToNumber(domInput, number) {
  domInput.instance().value = number;
  await domInput.simulate('change');
}

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

describe('Current Call Control Page - Hang Up', () => {
  test('RCI-1712650 Answer an inbound call and keep in active call page, click "Hang Up" Button', async () => {
    await makeInbountCall(sid111, true);
    expect(phone.webphone.sessions).toHaveLength(1);
    const handupButton = wrapper.find(ActiveCallPad).find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
  });
  test('RCI-1712650 Make an outbound call and keep in active call page, click "Hang Up" Button', async () => {
    await makeOutboundCall();
    expect(phone.webphone.sessions).toHaveLength(1);
    const handupButton = wrapper.find(ActiveCallPad).find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
  });
});

describe('Current Call Control Page - Keypad', () => {
  test('RCI-1712646 Answer an inbound call and keep in active call page, click Keypad and "0"', async () => {
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
  test('RCI-1712646 Make an outbound call and keep in active call page, click Keypad and "0"', async () => {
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
  test('RCI-1712646 Answer an inbound call and keep in active call page, click Keypad and Back', async () => {
    await makeInbountCall(sid111, true);
    const keypadButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(1);
    keypadButton.find(CircleButton).simulate('click');
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(1);
    const backButton = wrapper.find(ActiveCallDialPad).find(HeaderButton).first();
    backButton.simulate('click');
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(0);
  });
  test('RCI-1712646 Make an outbound call and keep in active call page, click Keypad and Back', async () => {
    await makeOutboundCall();
    const keypadButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(1);
    keypadButton.find(CircleButton).simulate('click');
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(1);
    const backButton = wrapper.find(ActiveCallDialPad).find(HeaderButton).first();
    backButton.simulate('click');
    expect(wrapper.find(ActiveCallDialPad)).toHaveLength(0);
  });
});

describe('Current Call Control Page - Hold/Unhold', () => {
  let holdButton = null;

  test('RCI-1712647 Answer an inbound call and keep in active call page, click Hold/Unhold', async () => {
    await makeInbountCall(sid111, true);
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');

    holdButton.find(CircleButton).simulate('click');
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);

    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    expect(holdFn.mock.calls[0]).toEqual([sid111]);
    holdButton.find(CircleButton).simulate('click');
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);

    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');
    expect(unholdFn.mock.calls[0]).toEqual([sid111]);
  });
  test('RCI-1712647 Make an outbound call and keep in active call page, click Hold/Unhold', async () => {
    const outboundSession = await makeOutboundCall();
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('Hold');

    holdButton.find(CircleButton).simulate('click');
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    expect(holdButton.find('.buttonTitle').text()).toEqual('On Hold');
    expect(holdFn.mock.calls[0]).toEqual([outboundSession.id]);

    holdButton.find(CircleButton).simulate('click');
    holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
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
  test('RCI-1712648 Answer an inbound call and keep in active call page, click Mute/Unmute', async () => {
    await makeInbountCall(sid111, true);
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');

    muteButton.find(CircleButton).simulate('click');
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Unmute');
    expect(muteFn.mock.calls[0]).toEqual([sid111]);

    muteButton.find(CircleButton).simulate('click');
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');
    expect(unmuteFn.mock.calls[0]).toEqual([sid111]);
  });
  test('RCI-1712648 Make an outbound call and keep in active call page, click Mute/Unmute', async () => {
    const outboundSession = await makeOutboundCall();
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');

    muteButton.find(CircleButton).simulate('click');
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Unmute');
    expect(muteFn.mock.calls[0]).toEqual([outboundSession.id]);

    muteButton.find(CircleButton).simulate('click');
    muteButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(0);
    expect(muteButton.find('.buttonTitle').text()).toEqual('Mute');
    expect(unmuteFn.mock.calls[0]).toEqual([outboundSession.id]);
  });
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

describe('Current Call Control Page - Transfer', () => {
  let transferButton = null;
  function getTransferButton() {
    const moreButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(5);
    moreButton.find(CircleButton).simulate('click');
    const transferButton = wrapper.find(ActiveCallPad).find(Tooltip).find(MoreActionItem).at(0);
    return transferButton;
  }

  test('RCI-1712674 Answer an inbound call and keep in active call page, click Transfer Button',
    async () => {
      await makeInbountCall(sid111, true);
      transferButton = getTransferButton();
      transferButton.find('.buttonItem').simulate('click');
      expect(wrapper.find(TransferPanel)).toHaveLength(1);
    }
  );
  test('RCI-1712674 Make an outbound call and keep in active call page, click Transfer Button',
    async () => {
      await makeOutboundCall();
      transferButton = getTransferButton();
      transferButton = getTransferButton();
      transferButton.find('.buttonItem').simulate('click');
      expect(wrapper.find(TransferPanel)).toHaveLength(1);
    }
  );
  test('RCI-1712674 Check Transfer Panel Page', async () => {
    await makeInbountCall(sid111, true);
    transferButton = getTransferButton();
    transferButton.find('.buttonItem').simulate('click');
    const panel = wrapper.find(TransferPanel);
    expect(panel).toHaveLength(1);
    expect(panel.find(BackHeader)).toHaveLength(1);
    expect(panel.find(BackHeader).find(HeaderButton)).toHaveLength(1);
    expect(panel.find(BackHeader).text()).toEqual('Transfer to');
    expect(panel.find(RecipientsInput)).toHaveLength(1);
    expect(panel.find(RecipientsInput).find('label').text()).toEqual('To:');
    expect(panel.find(RecipientsInput).find('input').props().placeholder).toEqual('Enter Name or Number');
    expect(panel.find(DialPad)).toHaveLength(1);
    expect(panel.find(CircleButton).find(TransferIcon)).toHaveLength(1);
  });
  test('RCI-1712674 Transfer Panel: click Transfer and Back Button',
    async () => {
      await makeOutboundCall();
      transferButton = getTransferButton();
      transferButton = getTransferButton();
      transferButton.find('.buttonItem').simulate('click');
      const backButton = wrapper.find(TransferPanel).find(BackHeader).find(HeaderButton).first();
      backButton.simulate('click');
      expect(wrapper.find(TransferPanel)).toHaveLength(0);
    }
  );
  test('Transfer Panel: failed to transfer call',
    async () => {
      let messages = null;
      await makeOutboundCall();
      transferButton = getTransferButton();
      transferButton.find('.buttonItem').simulate('click');
      const transferBtn = wrapper.find(TransferPanel).find(CircleButton).last();
      transferBtn.find('svg').simulate('click');
      await timeout(200);
      messages = store.getState(wrapper).alert.messages;
      expect(messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            level: 'warning',
            message: 'callErrors-noToNumber'
          })
        ])
      );
      const domInput = wrapper.find(TransferPanel).find(RecipientsInput).find('input');
      enterToNumber(domInput, 'abcde');
      transferBtn.find('svg').simulate('click');
      messages = store.getState(wrapper).alert.messages;
      expect(messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            level: 'warning',
            message: 'callErrors-noToNumber'
          })
        ])
      );
    }
  );
  test('RCI-1712674 Transfer Panel: success to transfer call, navigates to the page user last viewed',
    async () => {
      mock.numberParser();
      await makeOutboundCall();
      transferButton = getTransferButton();
      transferButton.find('.buttonItem').simulate('click');
      const domInput = wrapper.find(TransferPanel).find(RecipientsInput).find('input');
      enterToNumber(domInput, '987654321');
      const transferBtn = wrapper.find(TransferPanel).find(CircleButton).last();
      transferBtn.find('svg').simulate('click');
      await timeout(100);
      const validatedResult = await phone.numberValidate.validateNumbers(['987654321']);
      const validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;
      expect(transferFn.mock.calls[0]).toContain(validPhoneNumber);
      expect(phone.routerInteraction.currentPath).toEqual('/dialer');
    }
  );
});
