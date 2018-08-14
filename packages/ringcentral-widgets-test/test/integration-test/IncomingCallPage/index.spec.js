import React from 'react';
import { mount } from 'enzyme';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
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

describe('Incoming Call Interaction', () => {
  it('When user has an incoming call, page should display Incoming Call Page', async () => {
    await getInboundCall();
    const page = wrapper.find(IncomingCallPad);
    expect(page.length).toEqual(1);
  })
})