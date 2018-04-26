import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import ConferencePanel from 'ringcentral-widgets/components/ConferencePanel';

import { getWrapper } from '../shared';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/conference');
  wrapper.update();
  panel = wrapper.find(ConferencePanel).first();
});

describe('conference', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
  });

  test('click invite button', async () => {
    const inviteButton = panel.find('.bottom').find('.button').first();
    expect(inviteButton.props()).toBeDefined();
    expect(inviteButton.props().children).toEqual('Invite with Text');

    await inviteButton.simulate('click');
    const textArea = wrapper.find('.textField').first().find('textarea');
    expect(textArea.instance().value).toMatch(/Please join the RingCentral conference/);
  });
});
