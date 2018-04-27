import sleep from 'ringcentral-integration/lib/sleep';
import * as mock from 'ringcentral-integration/integration-test/mock';

import NavigationBar from 'ringcentral-widgets/components/NavigationBar';
import ComposeTextPanel from 'ringcentral-widgets/components/ComposeTextPanel';
import DropdownSelect from 'ringcentral-widgets/components/DropdownSelect';
import ConversationPanel from 'ringcentral-widgets/components/ConversationPanel';
import { Message } from 'ringcentral-widgets/components/ConversationMessageList';

import { getWrapper, timeout } from '../shared';

let wrapper = null;
let panel = null;
let sendButton = null;
let textArea = null;
let toNumber = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 64000;
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/composeText');
  wrapper.update();
  panel = wrapper.find(ComposeTextPanel).first();
  sendButton = panel.find('.sendButton').first();
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
    panel = wrapper.find(ComposeTextPanel).first();
    textArea = panel.find('.textField').first().find('textarea');
    expect(textArea.props().value).toEqual('Hello world');
    toNumber.instance().value = 'Hello world';
    await toNumber.simulate('change');
    panel = wrapper.find(ComposeTextPanel).first();
    toNumber = panel.find('.numberInput');
    sendButton = panel.find('.sendButton').first();
    expect(toNumber.props().value).toEqual('Hello world');
    expect(sendButton.props().disabled).toBe(false);
  });

  test('from dropdown', async () => {
    const dropdownSelect = panel.find(DropdownSelect).first();
    const dropdown = dropdownSelect.find('.dropdown').first();
    const dropdownItems = dropdown.find('.dropdownItem');
    expect(dropdownItems.length > 1).toEqual(true);
    const firstNumber = dropdownItems.at(0).find('span').at(2).text();
    const secondNumber = dropdownItems.at(1).find('span').at(2).text();
    expect(firstNumber).not.toEqual(secondNumber);

    const selected = dropdownSelect.find('div.button').first().find('span.selectedValue').first();
    await dropdownItems.at(1).simulate('click');
    expect(selected.text()).toEqual(secondNumber);
    await dropdownItems.at(0).simulate('click');
    expect(selected.text()).toEqual(firstNumber);
  });

  test('send an SMS', async () => {
    const messageContent = `Hello world ${Date.now()}`;
    mock.numberParser();
    mock.sms({
      subject: messageContent
    });

    toNumber.instance().value = '16505819954';
    await toNumber.simulate('change');
    textArea.instance().value = messageContent;
    await textArea.simulate('change');
    panel = wrapper.find(ComposeTextPanel).first();
    sendButton = panel.find('.sendButton').first();
    expect(sendButton.props().disabled).toBe(false);
    await sendButton.simulate('click');
    await timeout(200);
    wrapper.update();
    const conversationPanel = wrapper.find(ConversationPanel);
    expect(conversationPanel.length > 0).toBe(true);
    const messages = conversationPanel.first().find(Message);
    const lastMessage = messages.at(messages.length - 1);
    expect(lastMessage.props()).toBeDefined();
    expect(lastMessage.props().subject).toMatch(new RegExp(messageContent));
  });
});
