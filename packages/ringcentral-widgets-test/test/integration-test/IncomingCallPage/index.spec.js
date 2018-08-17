import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import { inboundSession } from '../../support/session';
import { getWrapper } from '../shared';

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

async function getInboundCall(session = inboundSession) {
  await phone.webphone._webphone.userAgent.trigger('invite', session);
  wrapper.update();
}

describe('Incoming Call Interaction', () => {
  test('When user has an incoming call, page should display Incoming Call Page', async () => {
    await getInboundCall();
    expect(wrapper.find(IncomingCallPad)).toHaveLength(1);
  });
});
