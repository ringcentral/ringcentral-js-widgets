import NavigationBar from '@ringcentral-integration/widgets/components/NavigationBar';
import CallsPanel from '@ringcentral-integration/widgets/components/CallsPanel';
import CallItem from '@ringcentral-integration/widgets/components/CallItem';
import LogButton from '@ringcentral-integration/widgets/components/LogButton';
import { Button } from '@ringcentral-integration/widgets/components/Button';
import Spinner from '@ringcentral-integration/widgets/components/Spinner';

import { getWrapper, timeout } from '../shared';

/* global jasmine */

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/history');
  wrapper.update();
  panel = wrapper.find(CallsPanel).first();
});

describe('history', () => {
  test('initial state', async () => {
    expect(panel).toBeDefined();
    await timeout(200); // because there is a setTimeout in CallItem implementation
    const callItems = panel.find(CallItem);
    for (let i = 0; i < callItems.length; i += 1) {
      expect(
        callItems
          .at(i)
          .text()
          .trim().length > 0,
      ).toEqual(true);
    }
  });

  test('log button', async () => {
    await timeout(200); // because there is a setTimeout in CallItem implementation
    wrapper.update();
    panel = wrapper.find(CallsPanel).first();
    const callItems = panel.find(CallItem);
    if (callItems.length > 0) {
      const callItem = callItems.at(callItems.length - 1); // last item
      const logButton = callItem
        .find(LogButton)
        .first()
        .find(Button)
        .first();
      expect(logButton.props().disabled).toBe(false);
    }
  });

  /**
   * Skipped because `wrapper.find(CallsPanel).first().find(CallItem)` is always `0` given `<CallsListPage />`
   */
  test.skip('click log button', async () => {
    await timeout(200); // because there is a setTimeout in CallItem implementation
    wrapper.update();
    panel = wrapper.find(CallsPanel).first();
    const callItems = panel.find(CallItem);
    if (callItems.length > 0) {
      const callItem = callItems.at(callItems.length - 1); // last item
      let logButton = callItem.find(LogButton).find(Button);
      logButton.simulate('click');
      await timeout(200);
      panel = wrapper.find(CallsPanel).first();
      logButton = panel
        .find(CallItem)
        .at(callItems.length - 1)
        .find(LogButton)
        .find(Button);
      expect(logButton.props().disabled).toBe(true);
      expect(logButton.find(Spinner).length).toBe(1);
      await timeout(1000);
      wrapper.update();
      panel = wrapper.find(CallsPanel).first();
      logButton = panel
        .find(CallItem)
        .at(callItems.length - 1)
        .find(LogButton)
        .find(Button);
      expect(logButton.props().disabled).toBe(false);
      expect(logButton.find(Spinner).length).toBe(0);
    }
  });
});
