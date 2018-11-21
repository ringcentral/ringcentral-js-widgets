import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import SettingsPanel from 'ringcentral-widgets/components/SettingsPanel';
import QuickAccessPanel from 'ringcentral-widgets/components/QuickAccessPanel';
import LinkLine from 'ringcentral-widgets/components/LinkLine';
import Button from 'ringcentral-widgets/components/Button';
import { getWrapper } from 'ringcentral-widgets-test/test/integration-test/shared';
import { getInboundCall, makeCall } from '../../support/callHelper';

let wrapper = null;
let quickAccessPanel = null;
let panel = null;
const sid111 = '111';
let phone = null;

async function makeInbountCall(sessionId) {
  await getInboundCall(phone, {
    id: sessionId,
    direction: 'Inbound'
  });
  wrapper.update();
}

beforeEach(async () => {
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/settings');
  wrapper.update();
  panel = wrapper.find(SettingsPanel).first();
  const quickAccessLinkLine = panel.find({
    children:
      'Quick Access Setting'
  }).first();
  await quickAccessLinkLine.simulate('click');
  wrapper.update();
  quickAccessPanel = wrapper.find(QuickAccessPanel).first();
});


describe('<QuickAccessPanel />', () => {
  test('should render corretcly', () => {
    expect(wrapper.find('.group').length).toEqual(1);
  });

  test('FinishButton state', async () => {
    const FinishButton = quickAccessPanel.find(Button).first();
    expect(FinishButton.props().disabled).toEqual(false);
  });

  test('click FinishButton', async () => {
    expect(wrapper.find('.group').length).toEqual(1);
    const FinishButton = quickAccessPanel.find('Button').first();
    await FinishButton.simulate('click');
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

  test('when incoming call , page disappear', async () => {
    expect(wrapper.find('.group').length).toEqual(1);
    phone = wrapper.props().phone;
    phone.webphone._createWebphone();
    phone.webphone._removeWebphone = () => { };
    phone.webphone._connect = () => { };
    await makeInbountCall(sid111);
    wrapper.update();
    expect(wrapper.find('.group').length).toEqual(0);
  });
});

