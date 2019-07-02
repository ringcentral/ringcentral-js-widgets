import Button from 'ringcentral-widgets/components/Button';
import CallingSettings from 'ringcentral-widgets/components/CallingSettingsPanel';
import LinkLine from 'ringcentral-widgets/components/LinkLine';
import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import SettingsPanel from 'ringcentral-widgets/components/SettingsPanel';

import { getWrapper } from '../shared';

let wrapper = null;
let panel = null;
let callingSettings = null;

beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  wrapper.update();
  panel = wrapper.find(SettingsPanel).first();
  const callingLinkLine = panel.find(LinkLine).at(0);
  await callingLinkLine.simulate('click');
  callingSettings = wrapper.find(CallingSettings).first();
});

describe('calling settings', () => {
  test('check the title is correct', () => {
    expect(callingSettings.find('div.label').first().props().children).toEqual('Calling');
  });

  test('check button state with when select different option', () => {
    let saveButton = callingSettings.find(Button).first();
    expect(saveButton.props().disabled).toEqual(true);

    const items = callingSettings.find('.dropdownItem');
    // items.at(5).text()
    const lastItem = items.at(items.length - 1);
    lastItem.simulate('click');
    callingSettings = wrapper.find(CallingSettings).first();
    saveButton = callingSettings.find(Button).first();
    expect(saveButton.props().disabled).toEqual(false);
  });

  test('check save run currectly', async () => {
    const saveButton = callingSettings.find(Button).first();
    const items = callingSettings.find('.dropdownItem');
    const lastItem = items.at(items.length - 1);
    lastItem.simulate('click');

    saveButton.simulate('click');

    const store = wrapper.props().phone.store;
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
    firstItem.simulate('click');
    saveButton.simulate('click');
    const message = store.getState(wrapper).alert.messages.find(item => /emergencyCallingNotAvailable/.test(item.message));
    expect(message).toBeTruthy();
    expect(message.level).toEqual('info');
  });
});
