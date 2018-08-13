import React from 'react';
import { mount } from 'enzyme';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';

import { inboundSession } from '../../support/session';
import { getWrapper, timeout } from '../shared';

let wrapper = null;
let panel = null;
let phone = null;
let store = null;

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  phone = wrapper.props().phone;
  phone.webphone._createWebphone();
  phone.webphone._removeWebphone = () => { };
  phone.webphone._connect = () => { };
  store = wrapper.props().phone.store;

  Object.defineProperties(wrapper.props().phone.audioSettings, {
    userMedia: { value: true },
  });
});

async function getInboundCall(session = inboundSession) {
  await phone.webphone._webphone.userAgent.trigger('invite', session);
  wrapper.update();
}

describe('Inbound Call in Call Control Page', () => {
  test('RCI-1038#2 - User anwser the incoming call, Add button is disabled in Call Control Page', async () => {
    await getInboundCall();
    const buttonAnswer = wrapper.find(IncomingCallPad).find(ActiveCallButton).at(4);
    buttonAnswer.find(CircleButton).simulate('click');
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
    const buttonAdd = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    expect(buttonAdd.find('.buttonTitle').text()).toEqual('Add');
    expect(buttonAdd.props().disabled).toBeTruthy();
  })
})