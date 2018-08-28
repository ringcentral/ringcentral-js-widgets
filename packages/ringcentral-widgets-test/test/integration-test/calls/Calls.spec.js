import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import ActiveCallItem from 'ringcentral-widgets/components/ActiveCallItem';
import ActiveCallList from 'ringcentral-widgets/components/ActiveCallList';
import ActiveCallItemV2 from 'ringcentral-widgets/components/ActiveCallItemV2';
import ActiveCallsPanel from 'ringcentral-widgets/components/ActiveCallsPanel';

import { mockMultiActiveCalls } from './helper';
import { getWrapper } from '../shared';

let wrapper = null;
let phone = null;
let panel = null;

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

describe('history', () => {
  test('initial state', async () => {
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls');
    wrapper.update();
    panel = wrapper.find(ActiveCallsPanel).first();
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
    expect(panel.find('p.noCalls').first().text()).toEqual('No active calls');
  });
});

// Now we have ActiveCallItemV2 and ActiveCallItem
// For compatibility, after replacing all ActiveCallItem with ActiveCallItemV2
// we should update this.
describe('RCI-1038#4 All Calls Page', () => {
  test('Mock multiple calls:', async () => {
    await mockMultiActiveCalls(phone);
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls');
    wrapper.update();
    panel = wrapper.find(ActiveCallsPanel).first();
    expect(panel).toBeDefined();
    expect(panel.find(ActiveCallList)).toHaveLength(4);
  });
  test('Check Call Section: ringCall', () => {
    const ringCallPanel = panel.find(ActiveCallList).at(0);
    expect(ringCallPanel).toHaveLength(1);
    expect(ringCallPanel.find('div.listTitle').text()).toEqual('Ringing Call');

    const buttons = (
          panel.props().useV2 ?
          ringCallPanel.find(ActiveCallItemV2) : ringCallPanel.find(ActiveCallItem)
        )
        .find('.webphoneButtons > span');

    expect(buttons.at(0).props().title).toEqual('Send to Voicemail');
    expect(buttons.at(1).props().title).toEqual('Accept');
  });
  test('Check Call Section: currentCall', () => {
    const currentCallPanel = panel.find(ActiveCallList).at(1);
    expect(currentCallPanel).toHaveLength(1);
    expect(currentCallPanel.find('div.listTitle').text()).toEqual('Current Call');
    if (panel.props().useV2) {
      const buttons = currentCallPanel.find(ActiveCallItemV2).find('.webphoneButtons > span');
      expect(buttons.at(0).props().title).toEqual('Unhold');
      expect(buttons.at(1).props().title).toEqual('Hangup');
    } else {
      const buttons = currentCallPanel.find(ActiveCallItem).find('.webphoneButtons > span');
      expect(buttons.at(0).props().title).toEqual('Hangup');
      expect(buttons.at(1).props().title).toEqual('Accept');
    }
  });
  test('Check Call Section: onHoldCall', () => {
    const onHoldCallPanel = panel.find(ActiveCallList).at(2);
    expect(onHoldCallPanel).toHaveLength(1);
    expect(onHoldCallPanel.find('div.listTitle').text()).toEqual('Call on Hold');
    if (panel.props().useV2) {
      const buttons = onHoldCallPanel.find(ActiveCallItemV2).find('.webphoneButtons > span');
      expect(buttons.at(0).props().title).toEqual('Unhold');
      expect(buttons.at(1).props().title).toEqual('Hangup');
    } else {
      const buttons = onHoldCallPanel.find(ActiveCallItem).find('.webphoneButtons > span');
      expect(buttons.at(0).props().title).toEqual('Hangup');
      expect(buttons.at(1).props().title).toEqual('Accept');
    }
  });
  test('Check Call Section: otherDeviceCall', () => {
    const otherDeviceCallPanel = panel.find(ActiveCallList).at(3);
    const buttons = panel.props().useV2
      ? otherDeviceCallPanel.find(ActiveCallItemV2).find('.webphoneButtons > span')
      : otherDeviceCallPanel.find(ActiveCallItem).find('.webphoneButtons > span');
    expect(otherDeviceCallPanel).toHaveLength(1);
    expect(otherDeviceCallPanel.find('div.listTitle').text()).toEqual('Ongoing calls on my other devices');
    expect(buttons).toHaveLength(0);
  });
});
