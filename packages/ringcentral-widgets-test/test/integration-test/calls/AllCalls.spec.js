import * as mock from 'ringcentral-integration/integration-test/mock';
import IncomingCallPanel from 'ringcentral-widgets/components/IncomingCallPanel';
import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import ActiveCallList from 'ringcentral-widgets/components/ActiveCallList';
import ActiveCallItemV2 from 'ringcentral-widgets/components/ActiveCallItemV2';
import ActiveCallItem from 'ringcentral-widgets/components/ActiveCallItem';
import ActiveCallsPanel from 'ringcentral-widgets/components/ActiveCallsPanel';
import telephonyStatus from 'ringcentral-integration/enums/telephonyStatuses';
import { timeout, initPhoneWrapper } from '../shared';
import deviceBody from '../calls/data/device.json';
import {
  makeInboudCalls,
  mockSub,
} from './helper';

async function call({
  phone,
  wrapper,
  phoneNumber,
  fromNumber
}) {
  mock.numberParser();
  mock.device(deviceBody, false);
  await phone.dialerUI.call({ phoneNumber, fromNumber });
  await timeout(500);
  wrapper.update();
  const currentSessionId = phone.webphone.activeSession.id;
  const currentSession = await phone.webphone._sessions.get(currentSessionId);
  currentSession.accept(phone.webphone.acceptOptions);
}

describe('Incoming Call Control Page from All Calls', () => {
  test('Click incoming call item,then go to incoming call control', async () => {
    const { phone, wrapper } = await initPhoneWrapper();
    await makeInboudCalls(phone, [{
      id: '102',
      direction: 'Inbound',
      telephonyStatus: telephonyStatus.ringing,
    }]);
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
    const allCallList = wrapper.find(ActiveCallList);
    const ringingCall = allCallList.at(0);
    expect(ringingCall.find('.listTitle').text()).toEqual('Ringing Call');
    const panel = wrapper.find(ActiveCallsPanel);
    if (panel.props().useV2) {
      ringingCall.find(ActiveCallItemV2).props().onClick();
    } else {
      ringingCall.find(ActiveCallItem).props().onClick();
    }
    expect(phone.routerInteraction.currentPath).toEqual('/calls');
    wrapper.update();
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(1);
  });
  test('make two inbound call then click one of the call item can goto incoming call ctrl', async () => {
    const { phone, wrapper } = await initPhoneWrapper();
    await makeInboudCalls(phone, [{
      id: '102',
      direction: 'Inbound',
      telephonyStatus: telephonyStatus.ringing,
    }, {
      id: '103',
      direction: 'Inbound',
      telephonyStatus: telephonyStatus.ringing,
    }]);
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
    ringingCalls.at(0).props().onClick();
    wrapper.update();
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(1);
    wrapper.find(IncomingCallPanel).find('.backButton').simulate('click');
    wrapper.update();
    ringingCalls.at(1).props().onClick();
    wrapper.update();
    expect(wrapper.find(IncomingCallPanel)).toHaveLength(1);
  });
  test(`hangup all incoming call,then make a outbound call, then meke a inbound
    call then the caller hangup`, async () => {
    const { phone, wrapper } = await initPhoneWrapper();
    await makeInboudCalls(phone, [{
      id: '102',
      direction: 'Inbound',
      telephonyStatus: telephonyStatus.ringing,
    }, {
      id: '103',
      direction: 'Inbound',
      telephonyStatus: telephonyStatus.ringing,
    }]);
    wrapper.update();
    const allCallList = wrapper.find(ActiveCallList);
    const ringingCalls = allCallList.at(0);
    const panel = wrapper.find(ActiveCallsPanel);
    let callItem;
    if (panel.props().useV2) {
      callItem = ActiveCallItemV2;
    } else {
      callItem = ActiveCallItem;
    }
    let ringingCallItems = wrapper.find(callItem);
    expect(ringingCallItems).toHaveLength(2);
    ringingCallItems.at(0).find('svg.rejectButton').simulate('click');
    wrapper.update();
    ringingCallItems = wrapper.find(callItem);
    expect(ringingCalls).toHaveLength(1);
    ringingCallItems.at(0).find('svg.rejectButton').simulate('click');
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual('/dialer');
    wrapper.update();
    await timeout(1000);
    await call({
      phone,
      wrapper,
      phoneNumber: '102',
    });
    await mockSub(phone, phone.webphone.sessions);
    await timeout(1000);
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
    wrapper.find('.backLabel').simulate('click');
    expect(phone.routerInteraction.currentPath).toEqual('/calls');
    wrapper.update();
    await makeInboudCalls(phone, [{
      id: '102',
      direction: 'Inbound',
      telephonyStatus: telephonyStatus.ringing,
    }]);
    const ringingSession = phone.webphone._sessions.get('102');
    ringingSession.terminate();
    ringingSession.reject();
    wrapper.update();
    expect(phone.routerInteraction.currentPath).toEqual('/calls');
  });
});
