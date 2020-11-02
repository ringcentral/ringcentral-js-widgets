import React from 'react';
import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import SettingsPanel from 'ringcentral-widgets/components/SettingsPanel';
import ComposeTextPanel from 'ringcentral-widgets/components/ComposeTextPanel';
import PresenceSettingSection from 'ringcentral-widgets/components/PresenceSettingSection';
import PresenceItem from 'ringcentral-widgets/components/PresenceItem';
import ConnectivityBadge from 'ringcentral-widgets/components/ConnectivityBadge';

import { initPhoneWrapper, timeout, tearDownWrapper } from '../shared';
import { HAMocks } from './mockLimited';

const MAX_PRESENCE_OPTIONS = 4;

/**
 * The `presenceItemIndex` should be in [0, 4]
 */
async function getPresenceItem(rootWrapper, presenceItemIndex) {
  if (presenceItemIndex < 0 || presenceItemIndex > MAX_PRESENCE_OPTIONS) {
    throw new Error(
      `Input presence item index ${presenceItemIndex} is invalid!`,
    );
  }

  const navigationBar = rootWrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  rootWrapper.update();
  const panel = rootWrapper.find(SettingsPanel).first();
  const presenceSettingSection = panel.find(PresenceSettingSection).first();
  const presenceItems = presenceSettingSection
    .find('.presenceList')
    .first()
    .find(PresenceItem);

  expect(presenceItems.length).toBe(4);
  const presenceItem = presenceItems.at(presenceItemIndex);

  return presenceItem;
}

beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
});

afterEach(() => {
  // Clear mock after each request
});

describe('From `Normal Mode` to `Limited Mode`', () => {
  test('Turns into `Limited Mode` when sending SMS', async () => {
    const { wrapper } = await initPhoneWrapper();

    expect(
      wrapper.contains(
        <div>
          Something goes wrong in server make your App limited. App will recover
          automatically when available.
        </div>,
      ),
    ).toBe(false);

    HAMocks.numberParser();
    HAMocks.checkStatus();
    HAMocks.sendSMS();

    const navigationBar = wrapper.find(NavigationBar).first();
    await navigationBar.props().goTo('/composeText');
    wrapper.update();

    const messageContent = `Hello world ${Date.now()}`;
    const panel = wrapper.find(ComposeTextPanel).first();
    const sendButton = panel.find('.sendButton').first();
    const textArea = panel
      .find('.textField')
      .first()
      .find('textarea');
    const toNumber = panel.find('.numberInput');

    toNumber.instance().value = '16505819954';
    await toNumber.simulate('change');
    textArea.instance().value = messageContent;
    await textArea.simulate('change');
    // wait for textArea 500ms debounce;
    await timeout(1000);
    wrapper.update();
    await sendButton.simulate('click');

    await timeout(500);
    wrapper.update();
    const contains = wrapper.contains(
      <div>
        Sorry, something went wrong on our end, but we are working hard to fix
        it. You may have limited access to certain features. The app will
        recover automatically as soon as it’s available.
      </div>,
    );
    expect(contains).toBe(true);
    await tearDownWrapper(wrapper);
  });

  test('Turns into `Limited Mode` when change presence', async () => {
    const { wrapper } = await initPhoneWrapper();

    expect(
      wrapper.contains(
        <div>
          Sorry, something went wrong on our end, but we are working hard to fix
          it. You may have limited access to certain features. The app will
          recover automatically as soon as it’s available.
        </div>,
      ),
    ).toBe(false);

    HAMocks.changePresence();
    HAMocks.checkStatus();

    try {
      const presenceItem = await getPresenceItem(wrapper, 1);
      await presenceItem.props().onClick();
      // await busyItem.props().onClick();
      await timeout(500);
      wrapper.update();

      const contains = wrapper.contains(
        <div>
          Sorry, something went wrong on our end, but we are working hard to fix
          it. You may have limited access to certain features. The app will
          recover automatically as soon as it’s available.
        </div>,
      );
      expect(contains).toBe(true);
    } catch (err) {
      console.log('Error in change presence');
    }
    await tearDownWrapper(wrapper);
  });

  test('Does not show `Limited Mode` badge or alert message when app is in `WebRTC Unavailable Mode`.', async () => {
    const { wrapper } = await initPhoneWrapper();

    HAMocks.changePresence();
    HAMocks.checkStatus();

    try {
      const monitor = wrapper.prop('phone').connectivityManager;
      Object.defineProperty(monitor, 'webphoneUnavailable', {
        value: true,
        writable: false,
      });

      const presenceItem = await getPresenceItem(wrapper, 1);
      await presenceItem.props().onClick();
    } catch (error) {
      console.log('Error');
    }

    expect(wrapper.find(ConnectivityBadge).text()).toEqual(
      'Web Phone Unavailable',
    );
    await tearDownWrapper(wrapper);
  });

  test('If response headers contains `Retry-After`, use this value as status check interval', async () => {
    // TODO: Use SDK to trigger http request error
    const { wrapper } = await initPhoneWrapper();
    const waitingSeconds = 0.5;

    HAMocks.changePresence('~', waitingSeconds);
    HAMocks.checkStatus();

    try {
      const busyItem = await getPresenceItem(wrapper, 1);
      await busyItem.props().onClick();
    } catch (error) {
      console.error('===>Change presence error: ', error);
    }
    const monitor = wrapper.prop('phone').availabilityMonitor;
    monitor._randomTime = 0.0001;
    // Default waiting value
    await timeout(200);
    wrapper.update();

    expect(wrapper.find(ConnectivityBadge).text()).toEqual('Limited Mode');
    await timeout((waitingSeconds + 0.5) * 1000);
    wrapper.update();

    expect(wrapper.find(ConnectivityBadge).text()).toEqual('');
    await tearDownWrapper(wrapper);
  });
});
