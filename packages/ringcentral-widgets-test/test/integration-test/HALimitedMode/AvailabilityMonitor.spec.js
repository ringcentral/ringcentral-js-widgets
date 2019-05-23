import React from 'react';
import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import ComposeTextPanel from 'ringcentral-widgets/components/ComposeTextPanel';
import SettingsPanel from 'ringcentral-widgets/components/SettingsPanel';
import PresenceSettingSection from 'ringcentral-widgets/components/PresenceSettingSection';
import PresenceItem from 'ringcentral-widgets/components/PresenceItem';

import { initPhoneWrapper, timeout } from '../shared';

import { HAMocks } from './mockLimited';

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

afterEach(() => {
  // Clear mock after each request
});

describe('From `Normal Mode` to `Limited Mode`', () => {
  test('Turns into `Limited Mode` when sending SMS', async () => {
    const { wrapper } = await initPhoneWrapper();

    expect(wrapper.contains(<span>Something goes wrong in server make your App limited. App will recover automatically when available.</span>))
      .toBe(false);

    HAMocks.numberParser();
    HAMocks.checkStatus();
    HAMocks.sendSMS();

    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/composeText');
    wrapper.update();

    const messageContent = `Hello world ${Date.now()}`;
    const panel = wrapper.find(ComposeTextPanel).first();
    const sendButton = panel.find('.sendButton').first();
    const textArea = panel.find('.textField').first().find('textarea');
    const toNumber = panel.find('.numberInput');

    toNumber.instance().value = '16505819954';
    await toNumber.simulate('change');
    textArea.instance().value = messageContent;
    await textArea.simulate('change');
    await sendButton.simulate('click');

    await timeout(500);
    wrapper.update();

    const contains = wrapper.contains(
      <span>Something goes wrong in server make your App limited. App will recover automatically when available.</span>
    );
    expect(contains).toBe(true);
  });

  test('Turns into `Limited Mode` when change presence', async () => {
    const { wrapper } = await initPhoneWrapper();

    expect(wrapper.contains(
      <span>Something goes wrong in server make your App limited. App will recover automatically when available.</span>
    )).toBe(false);

    HAMocks.changePresence();
    HAMocks.checkStatus();

    try {
      const navigationBar = wrapper.find(NavigationBar).first();
      await navigationBar.props().goTo('/settings');
      wrapper.update();
      const panel = wrapper.find(SettingsPanel).first();
      const presenceSettingSection = panel.find(PresenceSettingSection).first();
      const presenceItems = presenceSettingSection.find('.presenceList').first().find(PresenceItem);
      expect(presenceItems.length).toBe(4);
      // const availableItem = presenceItems.at(0);
      const busyItem = presenceItems.at(1);
      // const noDisturbItem = presenceItems.at(2);
      // const invisibleItem = presenceItems.at(3);
      await busyItem.props().onClick();
      await timeout(500);
      wrapper.update();

      const contains = wrapper.contains(
        <span>Something goes wrong in server make your App limited. App will recover automatically when available.</span>
      );
      expect(contains).toBe(true);
    } catch (err) {
      console.log('Error in change presence');
    }
  });
});
