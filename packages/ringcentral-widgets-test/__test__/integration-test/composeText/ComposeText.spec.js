import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { sleep } from '@ringcentral-integration/commons/utils';
import ComposeTextPanel from '@ringcentral-integration/widgets/components/ComposeTextPanel';
import { Message } from '@ringcentral-integration/widgets/components/ConversationMessageList';
import ConversationPanel from '@ringcentral-integration/widgets/components/ConversationPanel';
import DropdownSelect from '@ringcentral-integration/widgets/components/DropdownSelect';
import NavigationBar from '@ringcentral-integration/widgets/components/NavigationBar';

import { getWrapper } from '../shared';

let wrapper = null;
let panel = null;
let sendButton = null;
let textArea = null;
let toNumber = null;
beforeEach(async () => {
  jest.setTimeout(64000);
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/composeText');
  wrapper.update();
  panel = wrapper.find(ComposeTextPanel).first();
  sendButton = panel.find('[data-sign="messageButton"]').first();
  textArea = panel.find('.textField').first().find('textarea');
  toNumber = panel.find('.numberInput');
});

describe('compose text panel', () => {
  test('initial state', () => {
    expect(panel).toBeDefined();
    expect(panel.props()).toBeDefined();
    expect(sendButton.props()).toBeDefined();
    expect(textArea.props()).toBeDefined();
    expect(toNumber.props()).toBeDefined();
  });

  test('send button status', async () => {
    expect(sendButton.props().disabled).toBe(true);
    textArea.instance().value = 'Hello world';
    await textArea.simulate('change');
    // wait for textArea 500ms debounce;
    await sleep(1000);
    wrapper.update();
    panel = wrapper.find(ComposeTextPanel).first();
    textArea = panel.find('.textField').first().find('textarea');
    expect(textArea.props().value).toEqual('Hello world');
    toNumber.instance().value = 'Hello world';
    await toNumber.simulate('change');
    panel = wrapper.find(ComposeTextPanel).first();
    toNumber = panel.find('.numberInput');
    sendButton = panel.find('[data-sign="messageButton"]').first();
    expect(toNumber.props().value).toEqual('Hello world');
    expect(sendButton.props().disabled).toBe(false);
  });

  test('from dropdown', async () => {
    let dropdownSelect = panel.find(DropdownSelect).first();
    dropdownSelect.find('[data-sign="selectRoot"]').first().simulate('click');
    panel = wrapper.find(ComposeTextPanel).first();
    dropdownSelect = panel.find(DropdownSelect).first();
    const dropdown = dropdownSelect.find('.dropdown').first();
    const dropdownItems = dropdown.find('li[data-sign="selectMenuItem"]');
    expect(dropdownItems.length > 1).toEqual(true);

    const firstNumber = dropdownItems
      .at(0)
      .find('span[data-sign="phoneNumber"]')
      .text();
    const secondNumber = dropdownItems
      .at(1)
      .find('span[data-sign="phoneNumber"]')
      .text();
    expect(firstNumber).not.toEqual(secondNumber);

    const selected = dropdownSelect
      .find('div.button')
      .first()
      .find('span.selectedValue')
      .first();

    await dropdownItems.at(1).simulate('click');
    expect(selected.text()).toEqual(secondNumber);
    await dropdownItems.at(0).simulate('click');
    expect(selected.text()).toEqual(firstNumber);
  });
});
