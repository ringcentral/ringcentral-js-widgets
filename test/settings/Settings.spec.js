import { getWrapper } from '../shared';
import SettingsPanel from '../../src/components/SettingsPanel';
import LinkLine from '../../src/components/LinkLine';
import IconLine from '../../src/components/IconLine';
import PresenceSettingSection, { PresenceItem } from '../../src/components/PresenceSettingSection';
import Eula from '../../src/components/Eula';
import NavigationBar from '../../src/components/NavigationBar';

let wrapper = null;
let store = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  store = wrapper.props().phone.store;
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  panel = wrapper.find(SettingsPanel).first();
});

describe('settings panel', () => {
  test('initial state', () => {
    const linkLines = panel.find(LinkLine);
    expect(linkLines.length).toBe(2);
    expect(linkLines.at(0).props().children).toEqual('Calling');
    expect(linkLines.at(1).props().children).toEqual('Region');

    expect(panel.find(PresenceSettingSection).length).toBe(1);
    expect(panel.find(Eula).length).toBe(1);
    expect(panel.find('span.logout').length).toBe(1);
    expect(panel.find('div.versionContainer').length).toBe(1);
  });

  test('logout', async () => {
    const logoutIcon = panel.find('span.logout').first();
    const logoutLines = logoutIcon.closest(IconLine);
    expect(logoutLines.length).toBe(1);
    const logoutLine = logoutLines.at(0);
    expect(store.getState().auth.loginStatus).toMatch(/-loggedIn$/);
    await logoutLine.props().onClick();
    expect(store.getState().auth.loginStatus).toMatch(/-loggingOut$/);

    // need to login again, otherwise other tests will fail
    window.authData = null; // set it to null will trigger login
  });

  test('change presence status', async () => {
    const presenceSettingSection = panel.find(PresenceSettingSection).first();

    const presenceItems = presenceSettingSection.find('.presenceList').first().find(PresenceItem);
    expect(presenceItems.length).toBe(4);
    const availableItem = presenceItems.at(0);
    const busyItem = presenceItems.at(1);
    const noDisturbItem = presenceItems.at(2);
    const invisibleItem = presenceItems.at(3);

    await availableItem.props().onClick();
    expect(presenceSettingSection.props().userStatus).toEqual('Available');
    expect(store.getState().presence.userStatus).toEqual('Available');
    expect(presenceSettingSection.props().dndStatus).toEqual('TakeAllCalls');
    expect(store.getState().presence.dndStatus).toEqual('TakeAllCalls');

    await busyItem.props().onClick();
    expect(presenceSettingSection.props().userStatus).toEqual('Busy');
    expect(store.getState().presence.userStatus).toEqual('Busy');
    expect(presenceSettingSection.props().dndStatus).toEqual('TakeAllCalls');
    expect(store.getState().presence.dndStatus).toEqual('TakeAllCalls');

    await noDisturbItem.props().onClick();
    expect(presenceSettingSection.props().userStatus).toEqual('Busy');
    expect(store.getState().presence.userStatus).toEqual('Busy');
    expect(presenceSettingSection.props().dndStatus).toEqual('DoNotAcceptAnyCalls');
    expect(store.getState().presence.dndStatus).toEqual('DoNotAcceptAnyCalls');

    await invisibleItem.props().onClick();
    expect(presenceSettingSection.props().userStatus).toEqual('Offline');
    expect(store.getState().presence.userStatus).toEqual('Offline');
    expect(presenceSettingSection.props().dndStatus).toEqual('TakeAllCalls');
    expect(store.getState().presence.dndStatus).toEqual('TakeAllCalls');
  });
});
