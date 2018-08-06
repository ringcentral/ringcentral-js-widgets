import * as mock from 'ringcentral-integration/integration-test/mock';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import MultiCallAnswerButton from 'ringcentral-widgets/components/MultiCallAnswerButton';

import deviceBody from './data/device';

import { inboundSession } from '../../support/session';
import { getWrapper, timeout } from '../shared';

let wrapper = null;
let phone = null;

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  phone = wrapper.props().phone;
  phone.webphone._createWebphone();
  phone.webphone._removeWebphone = () => { };
  phone.webphone._connect = () => { };

  Object.defineProperties(wrapper.props().phone.audioSettings, {
    userMedia: { value: true },
  });
});

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
  it('incoming call pad should have five buttons', async () => {
    await getInboundCall();
    const page = wrapper.find(IncomingCallPad);
    const buttons = page.find(ActiveCallButton);
    ['Forward', 'Reply', 'Ignore', 'To Voicemail', 'Answer'].forEach((title, index) => {
      expect(buttons.at(index).props().title).toEqual(title);
    });
  });

  it('RCI-1038#1 - There is not a Add button', () => {
    const page = wrapper.find(IncomingCallPad);
    const buttons = page.find(ActiveCallButton);
    for (const index in buttons.length) {
      const button = buttons.at(index);
      expect(button.props().title).not.toEqual('Add');
    }
  });
});

describe('When there have other active call', () => {
  it('incoming call pad should have six buttons', async () => {
    await call();
    await getInboundCall();
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');

    const page = wrapper.find(IncomingCallPad);
    const activeButtons = page.find(ActiveCallButton);
    const multiButtons = page.find(MultiCallAnswerButton);

    ['Forward', 'Reply', 'Ignore', 'To Voicemail'].forEach((title, index) => {
      const button = activeButtons.at(index);
      expect(button.props().title).toEqual(title);
    });
    ['Answer & End', 'Answer & Hold'].forEach((title, index) => {
      const button = multiButtons.at(index);
      expect(button.props().title).toEqual(title);
    });
  });

  it('RCI-1038#1 - There is not a Add button', () => {
    const page = wrapper.find(IncomingCallPad);
    const activeButtons = page.find(ActiveCallButton);
    const multiButtons = page.find(MultiCallAnswerButton);
    for (const index in activeButtons.length) {
      const button = activeButtons.at(index);
      expect(button.props().title).not.toEqual('Add');
    }
    for (const index in multiButtons.length) {
      const button = multiButtons.at(index);
      expect(button.props().title).not.toEqual('Add');
    }
  });
});
