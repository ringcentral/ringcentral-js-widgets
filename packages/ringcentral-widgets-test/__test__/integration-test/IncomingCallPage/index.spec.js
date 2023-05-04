import { sleep } from '@ringcentral-integration/commons/utils';
import ActiveCallButton from '@ringcentral-integration/widgets/components/ActiveCallButton';
import ActiveCallPad from '@ringcentral-integration/widgets/components/ActiveCallPad';
import CircleButton from '@ringcentral-integration/widgets/components/CircleButton';
import IncomingCallPad from '@ringcentral-integration/widgets/components/IncomingCallPad';

import { getInboundCall } from '../../support/callHelper';
import { initPhoneWrapper } from '../shared';

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

async function makeInbountCall(phone, wrapper) {
  const session = await getInboundCall(phone, {
    id: '111',
    direction: 'Inbound',
    callId: 'call-111',
  });
  await sleep(10);
  wrapper.update();
  return session;
}

describe('Incoming Call Interaction', () => {
  test('When user has an incoming call, page should display Incoming Call Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await makeInbountCall(phone, wrapper);
    expect(wrapper.find(IncomingCallPad)).toHaveLength(1);
  });
});

describe('Inbound Call in Call Control Page', () => {
  test('RCI-1038#2 - User anwser the incoming call, Add button should not disabled in Call Control Page', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    const session = await makeInbountCall(phone, wrapper);
    const buttonAnswer = wrapper
      .find(IncomingCallPad)
      .find(ActiveCallButton)
      .at(4);
    buttonAnswer.find(CircleButton).find('g').simulate('click');
    await sleep(10);
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual(
      `/calls/active/${session.id}`,
    );
    const buttonAdd = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    expect(buttonAdd.find('.buttonTitle').text()).toEqual('Add');
    expect(buttonAdd.props().disabled).not.toBeTruthy();
  });
});
