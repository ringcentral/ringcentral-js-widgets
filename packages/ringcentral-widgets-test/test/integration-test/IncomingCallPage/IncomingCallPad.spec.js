import Tooltip from 'rc-tooltip';
import * as mock from 'ringcentral-integration/integration-test/mock';
import Button from 'ringcentral-widgets/components/Button';
import ForwardForm from 'ringcentral-widgets/components/ForwardForm';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import ActiveCallPanel from 'ringcentral-widgets/components/ActiveCallPanel';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import ReplyWithMessage from 'ringcentral-widgets/components/ReplyWithMessage';
import IncomingCallPanel from 'ringcentral-widgets/components/IncomingCallPanel';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import MultiCallAnswerButton from 'ringcentral-widgets/components/MultiCallAnswerButton';

import forwardingNumberBody from './data/forwardingNumber';
import { getInboundCall, makeCall } from '../../support/callHelper';
import {
  forwardFn,
  replyFn,
  toVoicemailFn,
  holdFn,
  unholdFn,
  acceptFn,
  terminateFn,
  rejectFn,
} from '../../support/session';
import { initPhoneWrapper, timeout } from '../shared';


const sid111 = '111';
const sid222 = '222';
let sidOutbound = null;

async function makeInbountCall(phone, wrapper, sessionId) {
  await getInboundCall(phone, {
    id: sessionId,
    direction: 'Inbound'
  });
  await timeout(10);
  wrapper.update();
}

async function makeOutboundCall(phone, wrapper) {
  mock.device(deviceBody);
  const outboundSession = await makeCall(phone);
  sidOutbound = outboundSession.id;
  wrapper.update();
}

async function makeMultiCalls(phone, wrapper, firstCall) {
  if (firstCall === 'Inbound') {
    await makeInbountCall(phone, wrapper, sid111);
    wrapper
      .find(IncomingCallPad)
      .find(ActiveCallButton).at(4)
      .find(CircleButton)
      .simulate('click');
    await timeout(10);
  } else {
    await makeOutboundCall(phone, wrapper);
  }
  await makeInbountCall(phone, wrapper, sid222);
}

const enterToNumber = async (target, number) => {
  const domInput = target.find('input');
  domInput.instance().value = number;
  await domInput.simulate('change');
  await timeout(10);
};

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

afterEach(() => {
  forwardFn.mockClear();
  replyFn.mockClear();
  toVoicemailFn.mockClear();
  holdFn.mockClear();
  unholdFn.mockClear();
  acceptFn.mockClear();
  terminateFn.mockClear();
  rejectFn.mockClear();
});

describe('RCI-1038: There is no Add button', () => {
  test('RCI-1038#1 - When user has only one active call', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const page = wrapper.find(IncomingCallPad);
    const activeButtons = page.find(ActiveCallButton);
    for (let index = 0; index < activeButtons.length; index += 1) {
      const button = activeButtons.at(index);
      expect(button.find('.buttonTitle').text()).not.toEqual('Add');
    }
    expect(activeButtons).toHaveLength(5);
    done();
  });

  test('RCI-1038#3 - When user has other active calls', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    // Click Answer Button
    wrapper
      .find(IncomingCallPad)
      .find(ActiveCallButton).at(4)
      .find(CircleButton)
      .simulate('click');
    await timeout(10);
    await makeInbountCall(phone, wrapper, sid222);
    const page = wrapper.find(IncomingCallPad);
    const activeButtons = page.find(ActiveCallButton);
    const multiButtons = page.find(MultiCallAnswerButton);
    expect(activeButtons).toHaveLength(4);
    expect(multiButtons).toHaveLength(2);

    for (let index = 0; index < activeButtons.length; index += 1) {
      const button = activeButtons.at(index);
      expect(button.find('.buttonTitle').text()).not.toEqual('Add');
    }
    for (let index = 0; index < multiButtons.length; index += 1) {
      const button = multiButtons.at(index);
      expect(button.find('.buttonTitle').text()).not.toEqual('Add');
    }
    done();
  });
});

describe('To Voicemail Button', () => {
  test('RCI-1712243 Single incoming Call_ Send to voicemail', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonToVoicemail = buttons.at(3);
    expect(buttonToVoicemail.find('.buttonTitle').text()).toEqual('To Voicemail');

    buttonToVoicemail.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    await timeout(100);
    expect(rejectFn.mock.calls[0]).toContain(sid111);
    expect(toVoicemailFn.mock.calls[0]).toContain(sid111);
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
    done();
  });
});

describe('Check Answer Button', () => {
  test('RCI-1712246 Single Incoming Call_ Answer Call', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonAnswer = buttons.at(4);
    expect(buttonAnswer.find('.buttonTitle').text()).toEqual('Answer');

    buttonAnswer.find(CircleButton).simulate('click');
    await timeout(10);
    expect(acceptFn.mock.calls[0]).toContain(sid111);
    expect(phone.webphone.sessions).toHaveLength(1);
    expect(phone.webphone.sessions[0].callStatus).toEqual(sessionStatus.connected);
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
    done();
  });
});

describe('Check Answer and Hold Button', () => {
  test('RCI-1712291#Entry1: inbound call + incoming call: Second call incoming_Answer and Hold',
    async (done) => {
      const { wrapper, phone } = await initPhoneWrapper();
      // Answer an inbound call, and make another incoming call
      await makeMultiCalls(phone, wrapper, 'Inbound');

      const multiButtons = wrapper.find(IncomingCallPad).find(MultiCallAnswerButton);
      const buttonAnswerHold = multiButtons.at(1);
      expect(buttonAnswerHold.find('.buttonTitle').text()).toEqual('Answer & Hold');

      buttonAnswerHold.find(CircleButton).first().simulate('click');
      await timeout(10);
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
      done();
    }
  );
  test('RCI-1712291#Entry2: outbound call + incoming call: Second call incoming_Answer and Hold',
    async (done) => {
      const { wrapper, phone } = await initPhoneWrapper();
      // Answer an inbound call, and make another incoming call
      await makeMultiCalls(phone, wrapper, 'Outbound');

      const multiButtons = wrapper.find(IncomingCallPad).find(MultiCallAnswerButton);
      const buttonAnswerHold = multiButtons.at(1);
      expect(buttonAnswerHold.find('.buttonTitle').text()).toEqual('Answer & Hold');

      buttonAnswerHold.find(CircleButton).first().simulate('click');
      await timeout(10);
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
      done();
    }
  );
});

describe('Check Answer and End Button', () => {
  test('RCI-1712330#Entry1: inbound call + incoming call: Second call incoming_Answer and End',
    async (done) => {
      const { wrapper, phone } = await initPhoneWrapper();
      // Answer an inbound call, and make another incoming call
      await makeMultiCalls(phone, wrapper, 'Inbound');

      const multiButtons = wrapper.find(IncomingCallPad).find(MultiCallAnswerButton);
      const buttonAnswerEnd = multiButtons.at(0);
      expect(buttonAnswerEnd.find('.buttonTitle').text()).toEqual('Answer & End');

      buttonAnswerEnd.find(CircleButton).first().simulate('click');
      await timeout(10);
      expect(phone.webphone.sessions).toHaveLength(1);

      await timeout(1000);
      wrapper.update();
      expect(acceptFn.mock.calls[0]).toContain(sid111);
      expect(terminateFn.mock.calls[0]).toContain(sid111);
      expect(phone.webphone.sessions[0].callStatus).toEqual(sessionStatus.connected);
      expect(wrapper.find(ActiveCallPanel)).toHaveLength(1);
      expect(wrapper.find(IncomingCallPanel)).toHaveLength(0);
      done();
    }
  );
  test('RCI-1712330#Entry2: outbound call + incoming call: Second call incoming_Answer and End',
    async (done) => {
      const { wrapper, phone } = await initPhoneWrapper();
      // Answer an inbound call, and make another incoming call
      await makeMultiCalls(phone, wrapper, 'Outbound');

      const multiButtons = wrapper.find(IncomingCallPad).find(MultiCallAnswerButton);
      const buttonAnswerEnd = multiButtons.at(0);
      expect(buttonAnswerEnd.find('.buttonTitle').text()).toEqual('Answer & End');

      buttonAnswerEnd.find(CircleButton).first().simulate('click');
      await timeout(10);
      expect(phone.webphone.sessions).toHaveLength(1);

      await timeout(1000);
      wrapper.update();
      expect(terminateFn.mock.calls[0]).toContain(sidOutbound);
      expect(acceptFn.mock.calls[0]).toContain(sid222);
      expect(phone.webphone.sessions[0].callStatus).toEqual(sessionStatus.connected);
      expect(wrapper.find(ActiveCallPanel)).toHaveLength(1);
      expect(wrapper.find(IncomingCallPanel)).toHaveLength(0);
      done();
    }
  );
});

describe('Check Ignore Button', () => {
  test('RCI-1712247 Single Incoming Call_ Ignore Call', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
    const buttonIgnore = buttons.at(2);
    expect(buttonIgnore.find('.buttonTitle').text()).toEqual('Ignore');

    buttonIgnore.find(CircleButton).simulate('click');
    await timeout(10);
    expect(phone.webphone.sessions).toHaveLength(0);

    wrapper.update();
    expect(rejectFn.mock.calls[0]).toEqual([sid111]);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
    done();
  });
  test('RCI-1712332#Entry1: inbound call + incoming call, Second call incoming_Ignore', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    // Answer an inbound call, and make another incoming call
    await makeMultiCalls(phone, wrapper, 'Inbound');

      const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
      const buttonIgnore = buttons.at(2);
      expect(buttonIgnore.find('.buttonTitle').text()).toEqual('Ignore');

    buttonIgnore.find(CircleButton).simulate('click');
    await timeout(10);
    expect(phone.webphone.sessions).toHaveLength(1);

      wrapper.update();

    expect(rejectFn.mock.calls[0]).toEqual([sid222]);
    expect(wrapper.find(ActiveCallPanel)).toHaveLength(1);
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(0);
    done();
  });
  test('RCI-1712332#Entry2: outbound call + incoming call, Second call incoming_Ignore',
    async (done) => {
      const { wrapper, phone } = await initPhoneWrapper();
      // Make an outbound call, and make another incoming call
      await makeMultiCalls(phone, wrapper, 'Outbound');

      const buttons = wrapper.find(IncomingCallPad).find(ActiveCallButton);
      const buttonIgnore = buttons.at(2);
      expect(buttonIgnore.find('.buttonTitle').text()).toEqual('Ignore');

      buttonIgnore.find(CircleButton).simulate('click');
      await timeout(10);
      expect(phone.webphone.sessions).toHaveLength(1);

      wrapper.update();

      expect(rejectFn.mock.calls[0]).toEqual([sid222]);
      expect(wrapper.find(ActiveCallPanel)).toHaveLength(1);
      expect(wrapper.find(IncomingCallPanel)).toHaveLength(0);
      done();
    });
});

describe('Check Incoming Call Forward Button', () => {
  test('RCI-1712302#1 Single Incoming Call - Forward Call', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    expect(buttonForward.find('.buttonTitle').text()).toEqual('Forward');

    buttonForward.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    expect(wrapper.find(Tooltip).at(0).props().visible).toBe(true);
    done();
  });
  test('RCI-1712302#2 Second Incoming Call - Forward Call', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    // Answer an inbound call, then make an incoming call
    await makeMultiCalls(phone, wrapper, 'Inbound');
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    expect(buttonForward.find('.buttonTitle').text()).toEqual('Forward');

    buttonForward.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    expect(wrapper.find(Tooltip).at(0).props().visible).toBe(true);
    done();
  });
  test('RCI-1712302#3 Second Incoming Call - Forward Call', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    // Make an outbound call, then make an incoming call
    await makeMultiCalls(phone, wrapper, 'Outbound');
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    expect(buttonForward.find('.buttonTitle').text()).toEqual('Forward');

    buttonForward.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    expect(wrapper.find(Tooltip).at(0).props().visible).toBe(true);
    done();
  });
});

describe('Check Incoming Call Forward Button > ForwardForm', () => {
  test('RCI-1712302 Main Flow - Click Cancel Button', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    buttonForward.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();

    const domForwardForm = wrapper.find(ForwardForm);
    const btnCancel = domForwardForm.find(Button).at(0);
    btnCancel.simulate('click');
    await timeout(10);
    wrapper.update();
    expect(wrapper.find(Tooltip).at(0).props().visible).toBe(false);
    done();
  });
  test('RCI-1712302 Main Flow - select one of the forward numbers', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    buttonForward.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();

    const domForwardForm = wrapper.find(ForwardForm);
    const btnForward = domForwardForm.find(Button).at(1);
    btnForward.simulate('click');
    await timeout(10);
    await timeout(200);
    wrapper.update();
    expect(forwardFn.mock.calls[0]).toContain('+16505819954');
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(wrapper.find(IncomingCallPad)).toHaveLength(0);
    done();
  });
  test('RCI-1712302 Main Flow - Success to Forward Custom Number', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    // clear the forwardingNumbers
    mock.forwardingNumber(forwardingNumberBody);
    mock.numberParser();
    await phone.forwardingNumber.fetchData();
    await makeInbountCall(phone, wrapper, sid111);
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    buttonForward.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();

    const domForwardForm = wrapper.find(ForwardForm);
    const btnForward = domForwardForm.find(Button).at(1);
    await enterToNumber(domForwardForm, '987654321');
    const validatedResult = await phone.numberValidate.validateNumbers(['987654321']);
    const validPhoneNumber = validatedResult.numbers[0] && validatedResult.numbers[0].e164;
    btnForward.simulate('click');
    await timeout(10);
    await timeout(200);
    wrapper.update();
    expect(forwardFn.mock.calls[0]).toContain(validPhoneNumber);
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(wrapper.find(IncomingCallPad)).toHaveLength(0);
    done();
  });
  test('RCI-1712302 Main Flow - Failed to Forward Custom Number', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    // clear the forwardingNumbers
    mock.forwardingNumber(forwardingNumberBody);
    await phone.forwardingNumber.fetchData();
    await makeInbountCall(phone, wrapper, sid111);
    const buttonForward = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(0);
    buttonForward.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();

    const domForwardForm = wrapper.find(ForwardForm);
    const btnForward = domForwardForm.find(Button).at(1);
    await enterToNumber(domForwardForm, 'abcdefg');
    btnForward.simulate('click');
    await timeout(10);
    await timeout(200);
    const store = wrapper.props().phone.store;
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
    done();
  });
});

describe('Check Incoming Call Reply Button', () => {
  test('RCI-1712265#1 Single Incoming Call - Click Reply Button', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const buttonReply = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(1);
    expect(buttonReply.find('.buttonTitle').text()).toEqual('Reply');

    buttonReply.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    expect(wrapper.find(Tooltip).at(1).props().visible).toBe(true);
    done();
  });
  test('RCI-1712265#2 Second Incoming Call - Click Reply Button', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeMultiCalls(phone, wrapper, 'Outbound');
    const buttonReply = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(1);
    expect(buttonReply.find('.buttonTitle').text()).toEqual('Reply');

    buttonReply.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();
    expect(wrapper.find(Tooltip).at(1).props().visible).toBe(true);
    done();
  });
});

describe('Check Incoming Call Reply Button > ReplyWithMessage', () => {
  test('RCI-1712265 Content', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const buttonReply = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(1);
    buttonReply.find(CircleButton).simulate('click');
    await timeout(10);
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
    done();
  });
  test('RCI-1712265 Click Cancel Button', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const buttonReply = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(1);
    buttonReply.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();

    const domReplyWithMessage = wrapper.find(ReplyWithMessage);
    const btnCancel = domReplyWithMessage.find(Button).at(0);
    btnCancel.first().simulate('click');
    await timeout(10);
    wrapper.update();
    expect(wrapper.find(Tooltip).at(1).props().visible).toBe(false);
    done();
  });
  // TODO: Check all options
  test('RCI-1712265 Choose an option then press "Reply" button', async (done) => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper, sid111);
    const buttonReply = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(1);
    buttonReply.find(CircleButton).simulate('click');
    await timeout(10);
    wrapper.update();

    const domReplyWithMessage = wrapper.find(ReplyWithMessage);
    const domMessageItem = domReplyWithMessage.find('.messageItem').at(0);
    const btnReply = domReplyWithMessage.find(Button).at(1);
    domMessageItem.simulate('click');
    await timeout(10);
    await timeout(200);
    const replyText = '666888';
    enterToNumber(domMessageItem, replyText);
    await timeout(200);
    wrapper.update();

    btnReply.simulate('click');
    await timeout(10);
    wrapper.update();
    expect(replyFn.mock.calls[0]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ replyText })
      ])
    );
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(wrapper.find(IncomingCallPad)).toHaveLength(0);
    done();
  });
});
