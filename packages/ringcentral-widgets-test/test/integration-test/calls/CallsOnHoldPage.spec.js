import sleep from 'ringcentral-integration/lib/sleep';
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';
import ActiveCallsPanel from 'ringcentral-widgets/components/ActiveCallsPanel';
import ActiveCallItem from 'ringcentral-widgets/components//ActiveCallItemV2';
import ActiveCallButton from 'ringcentral-widgets/components/ActiveCallButton';
import BackButton from 'ringcentral-widgets/components/BackButton';
import BackHeader from 'ringcentral-widgets/components/BackHeader';
import CircleButton from 'ringcentral-widgets/components/CircleButton';
import CallsOnholdPanel from 'ringcentral-widgets/components/CallsOnholdPanel';
import DialerPanel from 'ringcentral-widgets/components/DialerPanel';
import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import { mockMultiOutboundCalls } from './helper';
import { getWrapper } from '../shared';

let wrapper = null;
let phone = null;
let panel = null;
const SESSIONS_COUNT = 4;

beforeEach(async () => {
  jasmine.DEFAUL_INTERVAL = 64000;
  wrapper = await getWrapper();
  phone = wrapper.props().phone;
  phone.webphone._createWebphone();
  phone.webphone._removeWebphone = () => {};
  phone.webphone._connect = () => {};
  Object.defineProperties(wrapper.props().phone.audioSettings, {
    userMedia: { value: true },
  });
  await mockMultiOutboundCalls(phone, SESSIONS_COUNT);
});

describe('RCI-121011 Merge call when multiple on hold outbound WebRTC calls', () => {
  test('Make 4 outbound calls:', async () => {
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls');
    wrapper.update();
    panel = wrapper.find(ActiveCallsPanel).first();
    expect(panel).toBeDefined();
    expect(panel.find(ActiveCallItem)).toHaveLength(SESSIONS_COUNT);
  });

  test('click Add button on call control page', async () => {
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls/active');
    wrapper.update();
    expect(wrapper.find(ActiveCallPad)).toHaveLength(1);
    expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await sleep(200);
    wrapper.update();
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/callsOnhold')).toEqual(0);
    panel = wrapper.find(CallsOnholdPanel).first();
    const backHeader = panel.find(BackHeader);
    const backButton = backHeader.find(BackButton);
    expect(backHeader).toBeDefined();
    expect(backButton).toBeDefined();
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
    const activeCallItemList = panel.find(ActiveCallItem);
    expect(activeCallItemList).toHaveLength(SESSIONS_COUNT - 1);
    const activeCallItem = activeCallItemList.at(0);
    const activeCallItemProps = activeCallItem.props();
    expect(activeCallItem).toBeDefined();
    expect(activeCallItem.text().includes('Anonymous')).toEqual(true);
    expect(activeCallItemProps).toBeDefined();
    expect(activeCallItemProps.showMergeCall).toEqual(true);
  });

  test('Click Add button', async () => {
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls/active');
    wrapper.update();
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await sleep(200);
    wrapper.update();
    panel = wrapper.find(CallsOnholdPanel).first();
    const AddButton = panel.find(CircleButton).at(SESSIONS_COUNT + 2);
    AddButton.simulate('click');
    await sleep(200);
    wrapper.update();
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/dialer')).toEqual(0);
    panel = wrapper.find(DialerPanel).at(0);
    expect(panel).toBeDefined();
  });

  test('Click Back button', async () => {
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls/active');
    const callCtrlStep = async () => {
      wrapper.update();
      const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
      addButton.find(CircleButton).simulate('click');
      expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/callsOnhold')).toEqual(0);
      await sleep(200);
    };

    const callsOnHoldStep = async () => {
      wrapper.update();
      panel = wrapper.find(CallsOnholdPanel).first();
      const backHeader = panel.find(BackHeader);
      const backButton = backHeader.find(BackButton);
      backButton.simulate('click');
      await sleep(200);
      wrapper.update();
      expect(phone.routerInteraction.currentPath).toEqual('/calls/active');
    };

    const steps = [callCtrlStep, callsOnHoldStep, callCtrlStep];
    for (const step of steps) {
      await step();
    }
  });

  test('Click Hang up button of call A', async () => {
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls/active');
    wrapper.update();
    const addButton = wrapper.find(ActiveCallPad).find(ActiveCallButton).at(3);
    addButton.find(CircleButton).simulate('click');
    await sleep(200);
    wrapper.update();
    panel = wrapper.find(CallsOnholdPanel).first();
    const firstHangupButton = panel.find(CircleButton).at(1);
    firstHangupButton.simulate('click');
    await sleep(200);
    wrapper.update();
    expect(phone.routerInteraction.currentPath.indexOf('/conferenceCall/callsOnhold')).toEqual(0);
    expect(phone.webphone.sessions.length).toEqual(SESSIONS_COUNT - 1);
  });
});
