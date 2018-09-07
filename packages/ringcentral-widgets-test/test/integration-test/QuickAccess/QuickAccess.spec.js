import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import SettingsPanel from 'ringcentral-widgets/components/SettingsPanel';
import QuickAccessPanel from 'ringcentral-widgets/components/QuickAccessPanel';
import LinkLine from 'ringcentral-widgets/components/LinkLine';
import Button from 'ringcentral-widgets/components/Button';
import { getWrapper } from 'ringcentral-widgets-test/test/integration-test/shared';

let wrapper = null;
let quickAccessPanel = null;
let panel = null;
beforeEach(async () => {
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  wrapper.update();
  panel = wrapper.find(SettingsPanel).first();
  const quickAccessLinkLine = panel.find({
    children:
      "Quick access setting"
  }).first();
  await quickAccessLinkLine.simulate('click');
  wrapper.update();
  quickAccessPanel = wrapper.find(QuickAccessPanel).first();
});


describe('<QuickAccessPanel />', () => {

  test('should render corretcly', () => {
    expect(wrapper.find('.group').length).toEqual(1);
  });

  test('confirmButton state', async () => {
    const confirmButton = quickAccessPanel.find(Button).first();
    expect(confirmButton.props().disabled).toEqual(false);
  });

  test('cancelButton state', async () => {
    const cancelButton = quickAccessPanel.find(Button).at(1);
    expect(cancelButton.props().disabled).toEqual(false);
  });

  test('click confirm button', async () => {
    expect(wrapper.find('.group').length).toEqual(1);
    const confirmButton = quickAccessPanel.find('Button').first();
    await confirmButton.simulate('click');
    wrapper.update();
    expect(wrapper.find('.group').length).toEqual(0);
  });

  test('click cancel button', async () => {
    expect(wrapper.find('.group').length).toEqual(1);
    const cancelButton = quickAccessPanel.find('Button').at(1);
    await cancelButton.simulate('click');
    wrapper.update();
    expect(wrapper.find('.group').length).toEqual(0);
  });

  test('show first description', async () => {
    const checkBox = quickAccessPanel.find('CheckBox');
    await checkBox.find('.item').at(1).simulate('click');
    wrapper.update();
    const description = wrapper.find(QuickAccessPanel).first().find('.description').first();
    expect(description.find('span').length).toEqual(1);
  });

  test('show second description', async () => {
    const checkBox = quickAccessPanel.find('CheckBox');
    await checkBox.find('.item').at(2).simulate('click');
    wrapper.update();
    const description = wrapper.find(QuickAccessPanel).first().find('.description').first();
    expect(description.find('span').length).toEqual(1);
  });

  test('not show description', async () => {
    const checkBox = quickAccessPanel.find('CheckBox');
    await checkBox.find('.item').at(0).simulate('click');
    wrapper.update();
    const description = wrapper.find(QuickAccessPanel).first().find('.description').first();
    expect(description.find('span').length).toEqual(0);
  });

})