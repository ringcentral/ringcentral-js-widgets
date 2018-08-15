import Tooltip from 'rc-tooltip';
import * as mock from 'ringcentral-integration/integration-test/mock';
<<<<<<< HEAD
import Button from 'ringcentral-widgets/components/Button';
import ForwardForm from 'ringcentral-widgets/components/ForwardForm';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import ActiveCallPanel from 'ringcentral-widgets/components/ActiveCallPanel';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import ReplyWithMessage from 'ringcentral-widgets/components/ReplyWithMessage';
import IncomingCallPanel from 'ringcentral-widgets/components/IncomingCallPanel';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
=======
import ForwardForm from 'ringcentral-widgets/components/ForwardForm';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import ReplyWithMessage from 'ringcentral-widgets/components/ReplyWithMessage';
>>>>>>> b456f4cd84391550099fe39015a943dbdb4d7f7f
import MultiCallAnswerButton from 'ringcentral-widgets/components/MultiCallAnswerButton';

import deviceBody from './data/device';
import forwardingNumberBody from './data/forwardingNumber';
import { getInboundCall, makeCall } from '../../support/callHelper';
import {
  forwardFn,
  replyFn,
  toVoicemailFn,
  holdFn,
  unholdFn,
  muteFn,
  unmuteFn,
  acceptFn,
  terminateFn,
  rejectFn,
} from '../../support/session';
import { getWrapper, timeout } from '../shared';

const sid111 = '111';
const sid222 = '222';
let sidOutbound = null;
let wrapper = null;
let phone = null;
let store = null;

async function makeInbountCall(sessionId) {
  await getInboundCall(phone, {
    id: sessionId,
    direction: 'Inbound'
  });
  wrapper.update();
}

async function makeOutboundCall() {
  mock.device(deviceBody);
  const outboundSession = await makeCall(phone);
  sidOutbound = outboundSession.id;
  wrapper.update();
}

async function makeMultiCalls(firstCall) {
  if (firstCall === 'Inbound') {
    await makeInbountCall(sid111);
    wrapper
      .find(IncomingCallPad)
      .find(ActiveCallButton).at(4)
      .find(CircleButton)
      .simulate('click');
  } else {
    await makeOutboundCall(phone);
  }
  await makeInbountCall(sid222);
}

const enterToNumber = async (target, number) => {
  const domInput = target.find('input');
  domInput.instance().value = number;
  await domInput.simulate('change');
};

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  phone = wrapper.props().phone;
  store = wrapper.props().phone.store;
  phone.webphone._createWebphone();
  phone.webphone._removeWebphone = () => { };
  phone.webphone._connect = () => { };

  Object.defineProperties(wrapper.props().phone.audioSettings, {
    userMedia: { value: true },
  });
});

<<<<<<< HEAD
afterEach(() => {
  forwardFn.mockClear();
  replyFn.mockClear();
  toVoicemailFn.mockClear();
  holdFn.mockClear();
  unholdFn.mockClear();
  muteFn.mockClear();
  unmuteFn.mockClear();
  acceptFn.mockClear();
  terminateFn.mockClear();
  rejectFn.mockClear();
});

describe('RCI-1038: There is no Add button', () => {
  test('RCI-1038#1 - When user has only one active call', async () => {
    await makeInbountCall(sid111);
=======
async function call(phoneNumber = '102') {
  mock.device(deviceBody);
  if (phone.webphone.sessions.length > 0) {
    const lastSession = phone.webphone._sessions.get(phone.webphone.sessions[0].id);
    await lastSession.hold();
  }
  await phone.dialerUI.call({ phoneNumber });
  await timeout(200);
  wrapper.update();
}

async function getInboundCall(session = inboundSession) {
  if (phone.webphone.sessions.length > 0) {
    const lastSession = phone.webphone._sessions.get(phone.webphone.sessions[0].id);
    await lastSession.hold();
  }
  await phone.webphone._webphone.userAgent.trigger('invite', session);
  wrapper.update();
}

describe('When there have only one active call', () => {
  test('incoming call pad should have five buttons', async () => {
    await getInboundCall();
    const page = wrapper.find(IncomingCallPad);
    const buttons = page.find(ActiveCallButton);
    ['Forward', 'Reply', 'Ignore', 'To Voicemail', 'Answer'].forEach((title, index) => {
      expect(buttons.at(index).find('.buttonTitle').text()).toEqual(title);
    });
  });

  test('RCI-1038#1 - There is no Add button in Ringing page', () => {
    const page = wrapper.find(IncomingCallPad);
    const buttons = page.find(ActiveCallButton);
    for (const index in buttons.length) {
      const button = buttons.at(index);
      expect(button.find('.buttonTitle').text()).not.toEqual('Add');
    }
  });
});

describe('When there have other active call', () => {
  test('incoming call pad should have six buttons', async () => {
    await call();
    await getInboundCall();
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');

>>>>>>> b456f4cd84391550099fe39015a943dbdb4d7f7f
    const page = wrapper.find(IncomingCallPad);
    const activeButtons = page.find(ActiveCallButton);
    expect(activeButtons).toHaveLength(5);

    for (const index in activeButtons.length) {
      const button = activeButtons.at(index);
<<<<<<< HEAD
      expect(button.find('.buttonTitle').text()).not.toEqual('Add');
    }
  });

  test('RCI-1038#3 - When user has other active calls', async () => {
    await makeInbountCall(sid111);
    // Click Answer Button
    wrapper
      .find(IncomingCallPad)
      .find(ActiveCallButton).at(4)
      .find(CircleButton)
      .simulate('click');
    await makeInbountCall(sid222);
    const page = wrapper.find(IncomingCallPad);
    const activeButtons = page.find(ActiveCallButton);
    const multiButtons = page.find(MultiCallAnswerButton);
    expect(activeButtons).toHaveLength(4);
    expect(multiButtons).toHaveLength(2);

    for (const index in activeButtons.length) {
      const button = activeButtons.at(index);
      expect(button.find('.buttonTitle').text()).not.toEqual('Add');
    }
    for (const index in multiButtons.length) {
      const button = multiButtons.at(index);
      expect(button.find('.buttonTitle').text()).not.toEqual('Add');
=======
      expect(button.find('.buttonTitle').text()).toEqual(title);
    });
    ['Answer & End', 'Answer & Hold'].forEach((title, index) => {
      const button = multiButtons.at(index);
      expect(button.find('.buttonTitle').text()).toEqual(title);
    });
  });

  test('RCI-1038#3 - User has another incoming call, there is no Add button in 2nd call ringing page'
    , async () => {
      await getInboundCall();
      wrapper
        .find(IncomingCallPad).find(ActiveCallButton).at(4)
        .find(CircleButton)
        .simulate('click');
      wrapper.update();
      await getInboundCall();
      wrapper.update();
      const page = wrapper.find(IncomingCallPad);
      const activeButtons = page.find(ActiveCallButton);
      const multiButtons = page.find(MultiCallAnswerButton);
      for (const index in activeButtons.length) {
        const button = activeButtons.at(index);
        expect(button.find('.buttonTitle').text()).not.toEqual('Add');
      }
      for (const index in multiButtons.length) {
        const button = multiButtons.at(index);
        expect(button.find('.buttonTitle').text()).not.toEqual('Add');
      }
>>>>>>> b456f4cd84391550099fe39015a943dbdb4d7f7f
    }
  );
});

describe('Test Call Pad Buttons:', () => {
  test('Forward Button', async () => {
    await getInboundCall();
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonForward = buttons.at(0);
    buttonForward.find(CircleButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(ForwardForm)).toHaveLength(1);
  });
  test('Reply Button', async () => {
    await getInboundCall();
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonReply = buttons.at(1);
    buttonReply.find(CircleButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(ReplyWithMessage)).toHaveLength(1);
  });
  test('Ignore Button', async () => {
    await getInboundCall();
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonIgnore = buttons.at(2);
    buttonIgnore.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions.length).toEqual(0);
  });
  test('To Voicemail Button', async () => {
    await getInboundCall();
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonToVoicemail = buttons.at(3);
    buttonToVoicemail.find(CircleButton).simulate('click');
    wrapper.update();
    expect(phone.webphone.sessions.length).toEqual(0);
  });
  test('Answer Button', async () => {
    await getInboundCall();
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonAnswer = buttons.at(4);
    buttonAnswer.find(CircleButton).simulate('click');
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
  });
});

describe('To Voicemail Button', () => {
  test('RCI-1712243 Single incoming Call_ Send to voicemail', async () => {
    await makeInbountCall(sid111);
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonToVoicemail = buttons.at(3);
    expect(buttonToVoicemail.find('.buttonTitle').text()).toEqual('To Voicemail');

    buttonToVoicemail.find(CircleButton).simulate('click');
    wrapper.update();
    await timeout(100);
    expect(rejectFn.mock.calls[0]).toContain(sid111);
    expect(toVoicemailFn.mock.calls[0]).toContain(sid111);
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
  });
});

describe('Check Answer Button', () => {
  test('RCI-1712246 Single Incoming Call_ Answer Call', async () => {
    await makeInbountCall(sid111);
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonAnswer = buttons.at(4);
    expect(buttonAnswer.find('.buttonTitle').text()).toEqual('Answer');

    buttonAnswer.find(CircleButton).simulate('click');
    expect(acceptFn.mock.calls[0]).toContain(sid111);
    expect(phone.webphone.sessions).toHaveLength(1);
    expect(phone.webphone.sessions[0].callStatus).toEqual(sessionStatus.connected);
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
  });
});

describe('Check Answer and Hold Button', () => {
  test('RCI-1712291#Entry1: inbound call + incoming call: Second call incoming_Answer and Hold', async () => {
    // Answer an inbound call, and make another incoming call
    await makeMultiCalls('Inbound');

    const multiButtons = wrapper.find(IncomingCallPad).find(MultiCallAnswerButton);
    const buttonAnswerHold = multiButtons.at(1);
    expect(buttonAnswerHold.find('.buttonTitle').text()).toEqual('Answer & Hold');

    buttonAnswerHold.find(CircleButton).first().simulate('click');
    expect(phone.webphone.sessions).toHaveLength(2);

    await timeout(1000);
    wrapper.update();
    expect(acceptFn.mock.calls[0]).toContain(sid111);
    expect(holdFn.mock.calls[0]).toContain(sid111);
    expect(
      phone.webphone.sessions.map(item => item.callStatus)
    ).toEqual([sessionStatus.connected, sessionStatus.onHold]);
    expect(wrapper.find(ActiveCallPanel)).toHaveLength(1);
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(0);
  });
  test('RCI-1712291#Entry2: outbound call + incoming call: Second call incoming_Answer and Hold', async () => {
    // Answer an inbound call, and make another incoming call
    await makeMultiCalls('Outbound');

    const multiButtons = wrapper.find(IncomingCallPad).find(MultiCallAnswerButton);
    const buttonAnswerHold = multiButtons.at(1);
    expect(buttonAnswerHold.find('.buttonTitle').text()).toEqual('Answer & Hold');

    buttonAnswerHold.find(CircleButton).first().simulate('click');
    expect(phone.webphone.sessions).toHaveLength(2);

    await timeout(1000);
    wrapper.update();
    expect(holdFn.mock.calls[0]).toContain(sidOutbound);
    expect(acceptFn.mock.calls[0]).toContain(sid222);
    expect(
      phone.webphone.sessions.map(i => i.callStatus)
    ).toEqual([sessionStatus.connected, sessionStatus.onHold]);
    expect(wrapper.find(ActiveCallPanel)).toHaveLength(1);
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(0);
  });
});

describe('Check Answer and End Button', () => {
  test('RCI-1712330#Entry1: inbound call + incoming call: Second call incoming_Answer and End', async () => {
    // Answer an inbound call, and make another incoming call
    await makeMultiCalls('Inbound');

    const multiButtons = wrapper.find(IncomingCallPad).find(MultiCallAnswerButton);
    const buttonAnswerEnd = multiButtons.at(0);
    expect(buttonAnswerEnd.find('.buttonTitle').text()).toEqual('Answer & End');

    buttonAnswerEnd.find(CircleButton).first().simulate('click');
    expect(phone.webphone.sessions).toHaveLength(1);

    await timeout(1000);
    wrapper.update();
    expect(acceptFn.mock.calls[0]).toContain(sid111);
    expect(terminateFn.mock.calls[0]).toContain(sid111);
    expect(phone.webphone.sessions[0].callStatus).toEqual(sessionStatus.connected);
    expect(wrapper.find(ActiveCallPanel)).toHaveLength(1);
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(0);
  });
  test('RCI-1712330#Entry2: outbound call + incoming call: Second call incoming_Answer and End', async () => {
    // Answer an inbound call, and make another incoming call
    await makeMultiCalls('Outbound');

    const multiButtons = wrapper.find(IncomingCallPad).find(MultiCallAnswerButton);
    const buttonAnswerEnd = multiButtons.at(0);
    expect(buttonAnswerEnd.find('.buttonTitle').text()).toEqual('Answer & End');

    buttonAnswerEnd.find(CircleButton).first().simulate('click');
    expect(phone.webphone.sessions).toHaveLength(1);

    await timeout(1000);
    wrapper.update();
    expect(terminateFn.mock.calls[0]).toContain(sidOutbound);
    expect(acceptFn.mock.calls[0]).toContain(sid222);
    expect(phone.webphone.sessions[0].callStatus).toEqual(sessionStatus.connected);
    expect(wrapper.find(ActiveCallPanel)).toHaveLength(1);
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(0);
  });
});

describe('Check Ignore Button', () => {
  test('RCI-1712247 Single Incoming Call_ Ignore Call', async () => {
    await makeInbountCall(sid111);
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonIgnore = buttons.at(2);
    expect(buttonIgnore.find('.buttonTitle').text()).toEqual('Ignore');

    buttonIgnore.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions).toHaveLength(0);

    wrapper.update();
    expect(rejectFn.mock.calls[0]).toEqual([sid111]);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
  });
  test('RCI-1712332#Entry1: inbound call + incoming call, Second call incoming_Ignore', async () => {
    // Answer an inbound call, and make another incoming call
    await makeMultiCalls('Inbound');

    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonIgnore = buttons.at(2);
    expect(buttonIgnore.find('.buttonTitle').text()).toEqual('Ignore');

    buttonIgnore.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions).toHaveLength(1);

    wrapper.update();

    expect(rejectFn.mock.calls[0]).toEqual([sid222]);
    expect(wrapper.find(ActiveCallPanel)).toHaveLength(1);
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(0);
  });
  test('RCI-1712332#Entry2: outbound call + incoming call, Second call incoming_Ignore', async () => {
    // Make a outbound call, and make another incoming call
    await makeMultiCalls('Outbound');

    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonIgnore = buttons.at(2);
    expect(buttonIgnore.find('.buttonTitle').text()).toEqual('Ignore');

    buttonIgnore.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions).toHaveLength(1);

    wrapper.update();

    expect(rejectFn.mock.calls[0]).toEqual([sid222]);
    expect(wrapper.find(ActiveCallPanel)).toHaveLength(1);
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(0);
  });
});

describe('Check Incoming Call Forward Button', () => {
  test('RCI-1712302#1 Single Incoming Call - Forward Call', async () => {
    await makeInbountCall(sid111);
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    expect(buttonForward.find('.buttonTitle').text()).toEqual('Forward');

    buttonForward.find(CircleButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Tooltip).at(0).props().visible).toBe(true);
  });
  test('RCI-1712302#2 Second Incoming Call - Forward Call', async () => {
    // Answer an inbound call, then make an incoming call
    await makeMultiCalls('Inbound');
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    expect(buttonForward.find('.buttonTitle').text()).toEqual('Forward');

    buttonForward.find(CircleButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Tooltip).at(0).props().visible).toBe(true);
  });
  test('RCI-1712302#3 Second Incoming Call - Forward Call', async () => {
    // Make an outbound call, then make an incoming call
    await makeMultiCalls('Outbound');
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    expect(buttonForward.find('.buttonTitle').text()).toEqual('Forward');

    buttonForward.find(CircleButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Tooltip).at(0).props().visible).toBe(true);
  });
});

describe('Check Incoming Call Forward Button > ForwardForm', () => {
  test('RCI-1712302 Main Flow - Click Cancel Button', async () => {
    await makeInbountCall(sid111);
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    buttonForward.find(CircleButton).simulate('click');
    wrapper.update();

    const domForwardForm = wrapper.find(ForwardForm);
    const btnCancel = domForwardForm.find(Button).at(0);
    btnCancel.simulate('click');
    wrapper.update();
    expect(wrapper.find(Tooltip).at(0).props().visible).toBe(false);
  });
  test('RCI-1712302 Main Flow - select one of the forward numbers', async () => {
    await makeInbountCall(sid111);
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    buttonForward.find(CircleButton).simulate('click');
    wrapper.update();

    const domForwardForm = wrapper.find(ForwardForm);
    const btnForward = domForwardForm.find(Button).at(1);
    btnForward.simulate('click');
    await timeout(200);
    wrapper.update();
    expect(forwardFn.mock.calls[0]).toContain('+16505819954');
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(wrapper.find(IncomingCallPad)).toHaveLength(0);
  });
  test('RCI-1712302 Main Flow - Success to Forward Custom Number', async () => {
    // clear the forwardingNumbers
    mock.forwardingNumber(forwardingNumberBody);
    mock.numberParser();
    await phone.forwardingNumber.fetchData();
    await makeInbountCall(sid111);
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    buttonForward.find(CircleButton).simulate('click');
    wrapper.update();

    const domForwardForm = wrapper.find(ForwardForm);
    const btnForward = domForwardForm.find(Button).at(1);
    await enterToNumber(domForwardForm, '987654321');
    const validatedResult = await phone.numberValidate.validateNumbers(['987654321']);
    const validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;
    btnForward.simulate('click');
    await timeout(200);
    wrapper.update();
    expect(forwardFn.mock.calls[0]).toContain(validPhoneNumber);
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(wrapper.find(IncomingCallPad)).toHaveLength(0);
  });
  test('RCI-1712302 Main Flow - Failed to Forward Custom Number', async () => {
    // clear the forwardingNumbers
    mock.forwardingNumber(forwardingNumberBody);
    await phone.forwardingNumber.fetchData();
    await makeInbountCall(sid111);
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    buttonForward.find(CircleButton).simulate('click');
    wrapper.update();

    const domForwardForm = wrapper.find(ForwardForm);
    const btnForward = domForwardForm.find(Button).at(1);
    await enterToNumber(domForwardForm, 'abcdefg');
    btnForward.simulate('click');
    await timeout(200);
    const messages = store.getState(wrapper).alert.messages;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: 'info',
          message: 'callingSettingsMessages-emergencyCallingNotAvailable'
        })
      ])
    );
    expect(phone.webphone.sessions).toHaveLength(1);
    expect(wrapper.find(IncomingCallPad)).toHaveLength(1);
  });
});

describe('Check Incoming Call Reply Button', () => {
  test('RCI-1712265#1 Single Incoming Call - Click Reply Button', async () => {
    await makeInbountCall(sid111);
    const buttonReply = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(1);
    expect(buttonReply.find('.buttonTitle').text()).toEqual('Reply');

    buttonReply.find(CircleButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Tooltip).at(1).props().visible).toBe(true);
  });
  test('RCI-1712265#2 Second Incoming Call - Click Reply Button', async () => {
    await makeMultiCalls('Outbound');
    const buttonReply = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(1);
    expect(buttonReply.find('.buttonTitle').text()).toEqual('Reply');

    buttonReply.find(CircleButton).simulate('click');
    wrapper.update();
    expect(wrapper.find(Tooltip).at(1).props().visible).toBe(true);
  });
});

describe('Check Incoming Call Reply Button > ReplyWithMessage', () => {
  test('RCI-1712265 Content', async () => {
    await makeInbountCall(sid111);
    const buttonReply = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(1);
    buttonReply.find(CircleButton).simulate('click');
    wrapper.update();

    const domReplyWithMessage = wrapper.find(ReplyWithMessage);
    const btnCancel = domReplyWithMessage.find(Button).at(0);
    const btnReply = domReplyWithMessage.find(Button).at(1);
    expect(domReplyWithMessage.find('.label').at(0).text()).toEqual('Will call you back in...');
    expect(domReplyWithMessage.find('.label').at(1).text()).toEqual('Call me back in...');
    expect(domReplyWithMessage.find('.label').at(2).text()).toEqual('On my way');
    expect(domReplyWithMessage.find('.label').at(3).text()).toEqual('Custom Message');
    expect(btnCancel.text()).toEqual('Cancel');
    expect(btnReply.text()).toEqual('Reply');
  });
  test('RCI-1712265 Click Cancel Button', async () => {
    await makeInbountCall(sid111);
    const buttonReply = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(1);
    buttonReply.find(CircleButton).simulate('click');
    wrapper.update();

    const domReplyWithMessage = wrapper.find(ReplyWithMessage);
    const btnCancel = domReplyWithMessage.find(Button).at(0);
    btnCancel.first().simulate('click');
    wrapper.update();
    expect(wrapper.find(Tooltip).at(1).props().visible).toBe(false);
  });
  // TODO: Check all options
  test('RCI-1712265 Choose an option then press "Reply" button', async () => {
    await makeInbountCall(sid111);
    const buttonReply = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(1);
    buttonReply.find(CircleButton).simulate('click');
    wrapper.update();

    const domReplyWithMessage = wrapper.find(ReplyWithMessage);
    const domMessageItem = domReplyWithMessage.find('.messageItem').at(0);
    const btnReply = domReplyWithMessage.find(Button).at(1);
    domMessageItem.simulate('click');
    await timeout(200);
    const replyText = '666888';
    enterToNumber(domMessageItem, replyText);
    await timeout(200);
    wrapper.update();

    btnReply.simulate('click');
    wrapper.update();
    expect(replyFn.mock.calls[0]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ replyText })
      ])
    );
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(wrapper.find(IncomingCallPad)).toHaveLength(0);
  });
});
