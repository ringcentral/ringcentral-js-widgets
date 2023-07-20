import NavigationBar from '@ringcentral-integration/widgets/components/NavigationBar';
import ActiveCallItem from '@ringcentral-integration/widgets/components/ActiveCallItem';
import ActiveCallList from '@ringcentral-integration/widgets/components/ActiveCallList';
import { ActiveCallItem as ActiveCallItemV2 } from '@ringcentral-integration/widgets/components/ActiveCallItemV2';
import ActiveCallsPanel from '@ringcentral-integration/widgets/components/ActiveCallsPanel';

import { initPhoneWrapper, tearDownWrapper } from '../shared';
import { mockMultiActiveCalls } from './helper';

beforeEach(async () => {
  jest.setTimeout(64000);
});

describe('history', () => {
  test('initial state', async () => {
    const { wrapper } = await initPhoneWrapper();
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls');
    wrapper.update();
    const panel = wrapper.find(ActiveCallsPanel).first();
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
    expect(panel.find('p.noCalls').first().text()).toEqual('No active calls');
    await tearDownWrapper(wrapper);
  });
});

// Now we have ActiveCallItemV2 and ActiveCallItem
// For compatibility, after replacing all ActiveCallItem with ActiveCallItemV2
// we should update this.
describe('RCI-1038#4 All Calls Page', () => {
  test('Mock multiple calls:', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockMultiActiveCalls(phone);
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls');
    wrapper.update();
    const panel = wrapper.find(ActiveCallsPanel).first();
    expect(panel).toBeDefined();
    expect(panel.find(ActiveCallList)).toHaveLength(4);
    await tearDownWrapper(wrapper);
  });
  test('Check Call Section: ringCall', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockMultiActiveCalls(phone);
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls');
    wrapper.update();
    const panel = wrapper.find(ActiveCallsPanel).first();
    const ringCallPanel = panel.find(ActiveCallList).at(0);
    expect(ringCallPanel).toHaveLength(1);
    expect(ringCallPanel.find('div.listTitle').text()).toEqual('Ringing Call');

    let buttons = [];
    if (ringCallPanel.find(ActiveCallItemV2).length > 0) {
      buttons = ringCallPanel
        .find(ActiveCallItemV2)
        .find('.webphoneButtons > span');
    } else if (ringCallPanel.find(ActiveCallItem).length > 0) {
      buttons = ringCallPanel
        .find(ActiveCallItem)
        .find('.webphoneButtons > span');
    }
    expect(buttons.at(0).props().title).toEqual('To Voicemail');
    expect(buttons.at(1).props().title).toEqual('Answer');
    await tearDownWrapper(wrapper);
  });
  test('Check Call Section: currentCall', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockMultiActiveCalls(phone);
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls');
    wrapper.update();
    const panel = wrapper.find(ActiveCallsPanel).first();
    const currentCallPanel = panel.find(ActiveCallList).at(1);
    expect(currentCallPanel).toHaveLength(1);
    expect(currentCallPanel.find('div.listTitle').text()).toEqual(
      'Current Call',
    );
    if (panel.props().useV2) {
      const buttons = currentCallPanel
        .find(ActiveCallItemV2)
        .find('.webphoneButtons > span');
      expect(buttons.at(0).props().title).toEqual('Hold');
      expect(buttons.at(1).props().title).toEqual('Hang up');
    } else {
      const buttons = currentCallPanel
        .find(ActiveCallItem)
        .find('.webphoneButtons > span');
      expect(buttons.at(0).props().title).toEqual('Hang up');
      expect(buttons.at(1).props().title).toEqual('Accept');
    }
    await tearDownWrapper(wrapper);
  });
  test('Check Call Section: onHoldCall', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockMultiActiveCalls(phone);
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls');
    wrapper.update();
    const panel = wrapper.find(ActiveCallsPanel).first();
    const onHoldCallPanel = panel.find(ActiveCallList).at(2);
    expect(onHoldCallPanel).toHaveLength(1);
    expect(onHoldCallPanel.find('div.listTitle').text()).toEqual(
      'Call on Hold',
    );
    if (panel.props().useV2) {
      const buttons = onHoldCallPanel
        .find(ActiveCallItemV2)
        .find('.webphoneButtons > span');
      expect(buttons.at(0).props().title).toEqual('Unhold');
      expect(buttons.at(1).props().title).toEqual('Hang up');
    } else {
      const buttons = onHoldCallPanel
        .find(ActiveCallItem)
        .find('.webphoneButtons > span');
      expect(buttons.at(0).props().title).toEqual('Hang up');
      expect(buttons.at(1).props().title).toEqual('Accept');
    }
    await tearDownWrapper(wrapper);
  });
  test('Check Call Section: otherDeviceCall', async () => {
    const { wrapper, phone } = await initPhoneWrapper();
    await mockMultiActiveCalls(phone);
    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/calls');
    wrapper.update();
    const panel = wrapper.find(ActiveCallsPanel).first();
    const otherDeviceCallPanel = panel.find(ActiveCallList).at(3);
    const buttons = panel.props().useV2
      ? otherDeviceCallPanel
          .find(ActiveCallItemV2)
          .find('.webphoneButtons > span')
      : otherDeviceCallPanel
          .find(ActiveCallItem)
          .find('.webphoneButtons > span');
    expect(otherDeviceCallPanel).toHaveLength(1);
    expect(otherDeviceCallPanel.find('div.listTitle').text()).toEqual(
      'Ongoing calls on my other devices',
    );
    expect(buttons).toHaveLength(0);
    await tearDownWrapper(wrapper);
  });
});
