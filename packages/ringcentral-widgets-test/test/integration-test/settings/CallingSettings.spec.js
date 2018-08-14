import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import SettingsPanel from 'ringcentral-widgets/components/SettingsPanel';
import CallingSettings from 'ringcentral-widgets/components/CallingSettingsPanel';
import LinkLine from 'ringcentral-widgets/components/LinkLine';
import Button from 'ringcentral-widgets/components/Button';

import { getWrapper } from '../shared';

let wrapper = null;
let panel = null;
let callingSettings = null;
let store = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  store = wrapper.props().phone.store;
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  wrapper.update();
  panel = wrapper.find(SettingsPanel).first();
  const callingLinkLine = panel.find(LinkLine).at(0);
  await callingLinkLine.simulate('click');
  callingSettings = wrapper.find(CallingSettings).first();
});

describe('calling settings', () => {
  test('initial state', async () => {
    expect(callingSettings.find('div.label').first().props().children).toEqual('Calling');
  });

  test('button state', async () => {
    let saveButton = callingSettings.find(Button).first();
    expect(saveButton.props().disabled).toEqual(true);

    const items = callingSettings.find('.dropdownItem');
    const lastItem = items.at(items.length - 1);
    await lastItem.simulate('click');
    callingSettings = wrapper.find(CallingSettings).first();
    saveButton = callingSettings.find(Button).first();
    expect(saveButton.props().disabled).toEqual(false);
  });

  test('save', async () => {
    const saveButton = callingSettings.find(Button).first();

    const items = callingSettings.find('.dropdownItem');
    const lastItem = items.at(items.length - 1);
    await lastItem.simulate('click');
    await saveButton.simulate('click');

    const messages = store.getState(wrapper).alert.messages;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: 'info',
          message: 'callingSettingsMessages-saveSuccess'
        })
      ])
    );

    const firstItem = items.at(0); // Browser
    await firstItem.simulate('click');
    await saveButton.simulate('click');

    const message = store.getState(wrapper).alert.messages.find(item => /emergencyCallingNotAvailable/.test(item.message));
    expect(message).toBeTruthy();
    expect(message.level).toEqual('info');
  });
});
