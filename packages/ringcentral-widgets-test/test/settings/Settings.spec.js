import * as mock from 'ringcentral-integration/integration-test/mock';
import SettingsPanel from 'ringcentral-widgets/components/SettingsPanel';
import LinkLine from 'ringcentral-widgets/components/LinkLine';
import IconLine from 'ringcentral-widgets/components/IconLine';
import PresenceSettingSection from 'ringcentral-widgets/components/PresenceSettingSection';
import PresenceItem from 'ringcentral-widgets/components/PresenceItem';
import Eula from 'ringcentral-widgets/components/Eula';
import NavigationBar from 'ringcentral-widgets/components/NavigationBar';

import { getWrapper, timeout } from '../shared';

const setupWrapper = async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  const wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  wrapper.update();
  return wrapper;
};

describe('settings panel', () => {
  test('initial state', async () => {
    const wrapper = await setupWrapper();
    let panel = wrapper.find(SettingsPanel).first();
    const linkLines = panel.find(LinkLine);
    expect(linkLines.length).toBe(5);
    expect(linkLines.at(0).props().children).toEqual('Calling');
    expect(linkLines.at(1).props().children).toEqual('Region');

    expect(panel.find(PresenceSettingSection).length).toBe(1);
    expect(panel.find(Eula).length).toBe(1);
    expect(panel.find('span.logout').length).toBe(1);
    expect(panel.find('div.versionContainer').length).toBe(1);
  });

  test('logout', async () => {
    const storage = JSON.parse(JSON.stringify(localStorage.store));
    const wrapper = await setupWrapper();
    let panel = wrapper.find(SettingsPanel).first();
    const logoutIcon = panel.find('span.logout').first();
    const logoutLines = logoutIcon.closest(IconLine);
    expect(logoutLines.length).toBe(1);
    const logoutLine = logoutLines.at(0);
    const store = wrapper.props().phone.store;
    expect(store.getState().auth.loginStatus).toMatch(/-loggedIn$/);
    await logoutLine.props().onClick();
    expect(store.getState().auth.loginStatus).toMatch(/-notLoggedIn/);
    // need to login again, otherwise other tests will fail
    window.authData = null; // set it to null will trigger login
  });

  test('change presence status', async () => {
    const wrapper = await setupWrapper();
    let panel = wrapper.find(SettingsPanel).first();
    let presenceSettingSection = panel.find(PresenceSettingSection).first();
    const store = wrapper.props().phone.store;
    const presenceItems = presenceSettingSection.find('.presenceList').first().find(PresenceItem);
    expect(presenceItems.length).toBe(4);
    const availableItem = presenceItems.at(0);
    const busyItem = presenceItems.at(1);
    const noDisturbItem = presenceItems.at(2);
    const invisibleItem = presenceItems.at(3);

    mock.presenceUpdate('~');
    await availableItem.props().onClick();
    wrapper.update();
    panel = wrapper.find(SettingsPanel).first();
    presenceSettingSection = panel.find(PresenceSettingSection).first();
    expect(presenceSettingSection.props().userStatus).toEqual('Available');
    expect(store.getState().detailedPresence.userStatus).toEqual('Available');
    expect(presenceSettingSection.props().dndStatus).toEqual('TakeAllCalls');
    expect(store.getState().detailedPresence.dndStatus).toEqual('TakeAllCalls');


    const busyResponse = {
      pickUpCallsOnHold: false,
      presenceStatus: 'Busy',
      ringOnMonitoredCall: false,
      telephonyStatus: 'NoCall',
      userStatus: 'Busy',
    };
    mock.restore();
    mock.presenceUpdate('~', busyResponse);
    await busyItem.props().onClick();
    wrapper.update();
    panel = wrapper.find(SettingsPanel).first();
    presenceSettingSection = panel.find(PresenceSettingSection).first();
    expect(presenceSettingSection.props().userStatus).toEqual('Busy');
    expect(store.getState().detailedPresence.userStatus).toEqual('Busy');
    expect(presenceSettingSection.props().dndStatus).toEqual('TakeAllCalls');
    expect(store.getState().detailedPresence.dndStatus).toEqual('TakeAllCalls');


    const noDisturbResponse = {
      dndStatus: 'DoNotAcceptAnyCalls',
      pickUpCallsOnHold: false,
      presenceStatus: 'Busy',
      ringOnMonitoredCall: false,
      telephonyStatus: 'NoCall',
      userStatus: 'Busy',
    };
    mock.restore();
    mock.presenceUpdate('~', noDisturbResponse);
    await noDisturbItem.props().onClick();
    wrapper.update();
    panel = wrapper.find(SettingsPanel).first();
    presenceSettingSection = panel.find(PresenceSettingSection).first();
    expect(presenceSettingSection.props().userStatus).toEqual('Busy');
    expect(store.getState().detailedPresence.userStatus).toEqual('Busy');
    expect(presenceSettingSection.props().dndStatus).toEqual('DoNotAcceptAnyCalls');
    expect(store.getState().detailedPresence.dndStatus).toEqual('DoNotAcceptAnyCalls');

    const offlineResponse = {
      dndStatus: 'TakeAllCalls',
      pickUpCallsOnHold: false,
      presenceStatus: 'Offline',
      ringOnMonitoredCall: false,
      telephonyStatus: 'NoCall',
      userStatus: 'Offline',
    };
    mock.restore();
    mock.presenceUpdate('~', offlineResponse);
    await invisibleItem.props().onClick();
    wrapper.update();
    panel = wrapper.find(SettingsPanel).first();
    presenceSettingSection = panel.find(PresenceSettingSection).first();
    expect(presenceSettingSection.props().userStatus).toEqual('Offline');
    expect(store.getState().detailedPresence.userStatus).toEqual('Offline');
    expect(presenceSettingSection.props().dndStatus).toEqual('TakeAllCalls');
    expect(store.getState().detailedPresence.dndStatus).toEqual('TakeAllCalls');
  });
});
