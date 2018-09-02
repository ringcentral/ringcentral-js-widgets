import ActiveCallPad, { MoreActionItem } from 'ringcentral-widgets/components/ActiveCallPad';
import ActiveCallDialPad from 'ringcentral-widgets/components/ActiveCallDialPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import RecipientsInput from 'ringcentral-widgets/components/RecipientsInput';
import { CallCtrlPage } from 'ringcentral-widgets/containers/CallCtrlPage';
import RadioBtnGroup from 'ringcentral-widgets/components/RadioBtnGroup';
import TransferPanel from 'ringcentral-widgets/components/TransferPanel';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import { HeaderButton } from 'ringcentral-widgets/components/Header';
import DialButton from 'ringcentral-widgets/components/DialButton';
import BackHeader from 'ringcentral-widgets/components/BackHeader';
import FlipPanel from 'ringcentral-widgets/components/FlipPanel';
import Tooltip from 'ringcentral-widgets/components/Tooltip';
import DialPad from 'ringcentral-widgets/components/DialPad';
import TransferIcon from 'ringcentral-widgets/assets/images/Transfer.svg';
import * as mock from 'ringcentral-integration/integration-test/mock';
import forwardingNumberBody from './data/forwardingNumberNoCallFlip';
import { makeOutboundCall, mockConferenceCallEnv } from './helper';
import { getInboundCall } from '../../support/callHelper';
import { getWrapper, timeout } from '../shared';
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
  flipFn.mockClear();
  startRecordFn.mockClear();
  stopRecordFn.mockClear();
});

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

async function enterToNumber(domInput, number) {
  domInput.instance().value = number;
  await domInput.simulate('change');
}

describe('Enter to Current Call Page', () => {
  test('Make an outbound call, page should be in Current Call Page', async () => {
    await makeOutboundCall(phone);
    wrapper.update();
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
    await makeOutboundCall(phone);
    wrapper.update();
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
    await makeOutboundCall(phone);
    wrapper.update();
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
    await makeOutboundCall(phone);
    wrapper.update();
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
    const outboundSession = await makeOutboundCall(phone);
    wrapper.update();
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
      await makeOutboundCall(phone);
      wrapper.update();
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
    const outboundSession = await makeOutboundCall(phone);
    wrapper.update();
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

describe('Current Call Control Page - Record/Stop', () => {
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
      await makeOutboundCall(phone);
      wrapper.update();
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
  test('RCI-1712679 Answer an inbound call and keep in active call page, click Record/Stop',
    async () => {
      await makeInbountCall(sid111, true);
      recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      expect(recordButton.find('.buttonTitle').text()).toEqual('Record');

      recordButton.find(CircleButton).simulate('click');
      await timeout(200);
      wrapper.update();
      recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      expect(startRecordFn.mock.calls[0]).toEqual([sid111]);
      expect(recordButton.find('.buttonTitle').text()).toEqual('Stop');

      recordButton.find(CircleButton).simulate('click');
      await timeout(200);
      recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      expect(recordButton.find('.buttonTitle').text()).toEqual('Record');
      expect(stopRecordFn.mock.calls[0]).toEqual([sid111]);
    }
  );
  test('RCI-1712679 Make an outbound call and keep in active call page, click Record/Stop',
    async () => {
      const outboundSession = await makeOutboundCall(phone);
      wrapper.update();
      outboundSession.accept(phone.webphone.acceptOptions);
      recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      expect(recordButton.find('.buttonTitle').text()).toEqual('Record');

      recordButton.find(CircleButton).simulate('click');
      await timeout(200);
      wrapper.update();
      recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      expect(recordButton.find('.buttonTitle').text()).toEqual('Stop');
      expect(startRecordFn.mock.calls[0]).toEqual([outboundSession.id]);

      recordButton.find(CircleButton).simulate('click');
      await timeout(200);
      recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      expect(recordButton.find('.buttonTitle').text()).toEqual('Record');
      expect(stopRecordFn.mock.calls[0]).toEqual([outboundSession.id]);
    }
  );
});

describe('Current Call Control Page - Merge', () => {
  test('When user records the conference call, user can not merge call to conference call', async () => {
    await mockConferenceCallEnv(phone);
    wrapper.update();
    const recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
    recordButton.find(CircleButton).simulate('click');
    const holdButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(2);
    holdButton.find(CircleButton).simulate('click');
    await makeOutboundCall(phone);
    wrapper.update();
    const mergeButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    mergeButton.find(CircleButton).simulate('click');
    const messages = store.getState(wrapper).alert.messages;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: 'warning',
          message: 'webphone-record-recording'
        })
      ])
    );
  });
});

describe('Current Call Control Page - Add', () => {
  test('When user records the outbound call, user can not add another call to merge a conference call'
    , async () => {
      const outboundSession = await makeOutboundCall(phone);
      outboundSession.accept(phone.webphone.acceptOptions);
      wrapper.update();
      const recordButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(4);
      recordButton.find(CircleButton).simulate('click');
      const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
      addButton.find(CircleButton).simulate('click');
      const messages = store.getState(wrapper).alert.messages;
      expect(messages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            level: 'warning',
            message: 'webphone-record-recording'
          })
        ])
      );
    });
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
      await makeOutboundCall(phone);
      wrapper.update();
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
  }, 7000);
  test('RCI-1712674 Transfer Panel: click Transfer and Back Button',
    async () => {
      await makeOutboundCall(phone);
      wrapper.update();
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
      await makeOutboundCall(phone);
      wrapper.update();
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
      await makeOutboundCall(phone);
      wrapper.update();
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
      await makeOutboundCall(phone);
      wrapper.update();
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
  test('RCI-1712678 if user does not have filp numbers, Flip should be disabled', async () => {
    mock.forwardingNumber(forwardingNumberBody);
    await phone.forwardingNumber.fetchData();
    await makeOutboundCall(phone);
    wrapper.update();
    flipButton = getFlipButton();
    expect(flipButton.props().disabled).toBe(true);
  });

  test('RCI-1712678 Answer an inbound call and keep in active call page, click Flip Button',
    async () => {
      await makeInbountCall(sid111, true);
      flipButton = getFlipButton();
      flipButton.find('.buttonItem').simulate('click');
      expect(wrapper.find(FlipPanel)).toHaveLength(1);
    }
  );
  test('RCI-1712678 Make an outbound call and keep in active call page, click Flip Button',
    async () => {
      await makeOutboundCall(phone);
      wrapper.update();
      flipButton = getFlipButton();
      flipButton.find('.buttonItem').simulate('click');
      expect(wrapper.find(FlipPanel)).toHaveLength(1);
    }
  );
  test('RCI-1712678 Check Flip Panel Page', async () => {
    const filpNumbers = phone.forwardingNumber.flipNumbers;
    await makeOutboundCall(phone);
    wrapper.update();
    flipButton = getFlipButton();
    flipButton.find('.buttonItem').simulate('click');
    expect(wrapper.find(FlipPanel)).toHaveLength(1);
    const panel = wrapper.find(FlipPanel);
    expect(panel).toHaveLength(1);
    expect(panel.find(BackHeader)).toHaveLength(1);
    expect(panel.find(BackHeader).find(HeaderButton)).toHaveLength(1);
    expect(panel.find(BackHeader).text()).toEqual('Flip Call to...');
    const radioOptions = panel.find(RadioBtnGroup).find('.radioOption');
    expect(radioOptions).toHaveLength(filpNumbers.length);
    filpNumbers.forEach((item, index) => {
      const phoneNumber = wrapper.find(CallCtrlPage).props().formatPhone(item.phoneNumber);
      expect(radioOptions.at(index).find('.optionNumber').text()).toEqual(phoneNumber);
      expect(radioOptions.at(index).find('.optionLabel').text()).toEqual(item.label);
    });
    expect(panel.find(CircleButton).find('.btnSvg.flipButton')).toHaveLength(1);
    expect(panel.find(CircleButton).find('.btnSvg.completeButton')).toHaveLength(1);
  });
  test('RCI-1712678 Click Flip button in Flip Panel Page', async () => {
    let flipIconButton = null;
    let endIconButton = null;
    const filpNumbers = phone.forwardingNumber.flipNumbers;
    await makeOutboundCall(phone);
    wrapper.update();
    flipButton = getFlipButton();
    flipButton.find('.buttonItem').simulate('click');
    expect(wrapper.find(FlipPanel)).toHaveLength(1);
    flipIconButton = wrapper.find(FlipPanel).find(CircleButton).at(0);
    endIconButton = wrapper.find(FlipPanel).find(CircleButton).at(1);
    expect(flipIconButton.props().disabled).toBe(false);
    expect(endIconButton.props().disabled).toBe(true);
    flipIconButton.find('svg').simulate('click');
    await timeout(200);
    wrapper.update();
    flipIconButton = wrapper.find(FlipPanel).find(CircleButton).at(0);
    endIconButton = wrapper.find(FlipPanel).find(CircleButton).at(1);
    expect(flipFn.mock.calls[0]).toContain(filpNumbers[0].phoneNumber);
    expect(endIconButton.props().disabled).toBe(false);
    expect(flipIconButton.props().disabled).toBe(true);
    endIconButton.find('svg').simulate('click');
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
  });
});
