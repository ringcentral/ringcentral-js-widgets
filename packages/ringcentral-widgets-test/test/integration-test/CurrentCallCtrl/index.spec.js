import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import * as mock from 'ringcentral-integration/integration-test/mock';
import deviceBody from './data/device';
import { getWrapper } from '../shared';
import { makeCall, getInboundCall } from '../../support/callHelper';
import {
  muteFn,
  unmuteFn,
  holdFn,
  unholdFn,
} from '../../support/session';

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
  await makeCall(phone);
  wrapper.update();
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
    wrapper.update();
  }
}

describe('Prepare Work', () => {
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
});

describe('RCI-1712650 Current Call Control Page - Hang Up', () => {
  test('Answer an inbound call and keep in active call page, click "Hang Up" Button', async () => {
    await makeInbountCall(sid111, true);
    const handupButton = wrapper.find(ActiveCallPad).find('.stopButtonGroup').find(CircleButton);
    expect(handupButton.props().className).toEqual('stopButton');
    handupButton.find(CircleButton).simulate('click');
    expect(phone.webphone.sessions).toHaveLength(0);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
  });
});
