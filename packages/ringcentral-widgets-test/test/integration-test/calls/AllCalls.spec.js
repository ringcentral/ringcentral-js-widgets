import IncomingCallPanel from 'ringcentral-widgets/components/IncomingCallPanel';
import IncomingCallPad from 'ringcentral-widgets/components/IncomingCallPad';
import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import ActiveCallList from 'ringcentral-widgets/components/ActiveCallList';
import { ActiveCallItem as ActiveCallItemV2 } from 'ringcentral-widgets/components/ActiveCallItemV2';
import ActiveCallItem from 'ringcentral-widgets/components/ActiveCallItem';
import ActiveCallsPanel from 'ringcentral-widgets/components/ActiveCallsPanel';
import MultiCallAnswerButton from 'ringcentral-widgets/components/MultiCallAnswerButton';
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import { timeout, initPhoneWrapper, tearDownWrapper } from '../shared';

import { mockActiveCallPanelData } from './helper';
import { makeCall, getInboundCall } from '../../support/callHelper';

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

async function checkIncomingPopup(wrapper, phone) {
  const allCallList = wrapper.find(ActiveCallList);
  const ringingCall = allCallList.at(0);
  expect(ringingCall.find('.listTitle').text()).toEqual('Ringing Call');
  const panel = wrapper.find(ActiveCallsPanel);
  if (panel.props().useV2) {
    ringingCall.find(ActiveCallItemV2).find('.currentName').simulate('click');
  } else {
    ringingCall.find(ActiveCallItem).find('.currentName').simulate('click');
  }
  await timeout(100);
  expect(phone.routerInteraction.currentPath).toEqual('/calls');
  wrapper.update();
  expect(wrapper.find(IncomingCallPad)).toHaveLength(1);
}

describe('RCI-1105: Incoming Call Control Page from All Calls', () => {
  test(`One incoming call then click back button without answer or reject the call, then click
  incoming call item from all calls tab,user will see the incoming call popup again`, async () => {
    const { phone, wrapper } = await initPhoneWrapper();
    await getInboundCall(phone);
    await mockActiveCallPanelData(
      phone,
      [],
      phone.webphone.sessions.map((x) => x.id),
    );
    wrapper.update();
    const incomingCallPanel = wrapper.find(IncomingCallPanel);
    expect(incomingCallPanel).toHaveLength(1);
    const backBtn = incomingCallPanel.find('.backButton');
    expect(backBtn).toHaveLength(1);
    backBtn.simulate('click');
    await timeout(100);
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
    expect(wrapper.find(NavigationBar)).toHaveLength(2);
    phone.routerInteraction.push('/calls');
    wrapper.update();
    await checkIncomingPopup(wrapper, phone);
    await tearDownWrapper(wrapper);
  });

  test(`when user at call ctrl page, with the a incoming call, if user reject this incoming call,
  app should stay at original page`, async () => {
    const { phone, wrapper } = await initPhoneWrapper();
    const outboundSession = await makeCall(phone, {
      fromNumber: '+15878133670',
      homeCountryId: '1',
      toNumber: '102',
    });
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual(
      `/calls/active/${outboundSession.id}`,
    );
    const inboundSession = await getInboundCall(phone);
    await mockActiveCallPanelData(phone, [], [inboundSession.id]);
    await timeout(1000);
    wrapper.update();
    const answerBtn = wrapper.find(MultiCallAnswerButton);
    expect(answerBtn).toHaveLength(2);
    expect(answerBtn.at(0).find('.buttonTitle').text()).toEqual('Answer & End');
    expect(answerBtn.at(1).find('.buttonTitle').text()).toEqual(
      'Answer & Hold',
    );

    wrapper.find('.backButton').at(1).simulate('click');
    await timeout(100);
    const activeCallPad = wrapper.find(ActiveCallPad);
    expect(activeCallPad).toHaveLength(1);
    expect(activeCallPad.find(ActiveCallButton)).toHaveLength(6);
    const backBtn = wrapper.find('.backLabel');
    expect(backBtn.text()).toEqual('All Calls');
    backBtn.simulate('click');
    await timeout(100);
    expect(phone.routerInteraction.currentPath).toEqual('/calls');
    wrapper.update();
    await checkIncomingPopup(wrapper, phone);

    const ignoreBtn = wrapper.find(ActiveCallButton).at(2);
    expect(ignoreBtn.find('.buttonTitle').text()).toEqual('Ignore');
    ignoreBtn.simulate('click');
    await timeout(100);
    expect(phone.routerInteraction.currentPath).toEqual('/calls');

    await tearDownWrapper(wrapper);
  });

  test(`Multiple incoming calls auto goes to all calls page, then click one of
   the call item can see the incoming call popup again`, async () => {
    const { phone, wrapper } = await initPhoneWrapper();
    await getInboundCall(phone, {
      id: '102',
      direction: 'Inbound',
    });
    await getInboundCall(phone, {
      id: '103',
      direction: 'Inbound',
    });
    await mockActiveCallPanelData(
      phone,
      [],
      phone.webphone.sessions.map((x) => x.id),
    );
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual('/calls');
    const allCallList = wrapper.find(ActiveCallList);
    const panel = wrapper.find(ActiveCallsPanel);
    let ringingCalls;
    if (panel.props().useV2) {
      ringingCalls = allCallList.at(0).find(ActiveCallItemV2);
    } else {
      ringingCalls = allCallList.at(0).find(ActiveCallItem);
    }
    expect(ringingCalls).toHaveLength(2);
    ringingCalls.at(0).find('.currentName').simulate('click');
    await timeout(100);
    wrapper.update();
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(1);
    wrapper.find(IncomingCallPanel).find('.backButton').simulate('click');
    await timeout(100);
    wrapper.update();
    ringingCalls.at(1).find('.currentName').simulate('click');
    await timeout(100);
    wrapper.update();
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(1);
    await tearDownWrapper(wrapper);
  });
});
