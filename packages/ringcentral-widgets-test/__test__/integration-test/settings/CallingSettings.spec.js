import { CallingSettingsPanel } from '@ringcentral-integration/widgets/components/CallingSettingsPanel';
import LinkLine from '@ringcentral-integration/widgets/components/LinkLine';
import NavigationBar from '@ringcentral-integration/widgets/components/NavigationBar';
import { SettingsPanel } from '@ringcentral-integration/widgets/components/SettingsPanel';

import { getWrapper } from '../shared';

let wrapper = null;
let panel = null;
let callingSettings = null;

beforeEach(async () => {
  jest.setTimeout(64000);
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  wrapper.update();
  panel = wrapper.find(SettingsPanel).first();
  const callingLinkLine = panel.find(LinkLine).at(0);
  await callingLinkLine.simulate('click');
  callingSettings = wrapper.find(CallingSettingsPanel).first();
});

describe('calling settings', () => {
  test('check the title is correct', () => {
    expect(
      callingSettings.find('[data-sign="headerTitle"]').first().text(),
    ).toEqual('Calling');
  });

  test('check button state with when select different option', async () => {
    let saveButton = callingSettings.find('SaveButton').first();
    expect(saveButton.props().disabled).toEqual(true);
    callingSettings.find('[data-sign="selectRoot"]').first().simulate('click');
    callingSettings = wrapper.find(CallingSettingsPanel).first();
    const items = callingSettings.find('li[data-sign="selectMenuItem"]');
    // items.at(5).text()
    const lastItem = items.at(items.length - 1);
    lastItem.simulate('click');
    callingSettings = wrapper.find(CallingSettingsPanel).first();
    saveButton = callingSettings.find('SaveButton').first();
    expect(saveButton.props().disabled).toEqual(false);
  });

  test('check save run correctly', async () => {
    const saveButton = callingSettings.find('SaveButton').first();
    callingSettings.find('[data-sign="selectRoot"]').first().simulate('click');
    callingSettings = wrapper.find(CallingSettingsPanel).first();
    const items = callingSettings.find('li[data-sign="selectMenuItem"]');
    const lastItem = items.at(items.length - 1);
    lastItem.simulate('click');

    saveButton.simulate('click');

    const store = wrapper.props().phone.store;
    const messages = store.getState(wrapper).alert.messages;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: 'success',
          message: 'callingSettingsMessages-saveSuccess',
        }),
      ]),
    );

    const firstItem = items.at(0); // Browser
    firstItem.simulate('click');
    saveButton.simulate('click');
    const message = store
      .getState(wrapper)
      .alert.messages.find((item) =>
        /emergencyCallingNotAvailable/.test(item.message),
      );
    expect(message).toBeUndefined();
  });
});
