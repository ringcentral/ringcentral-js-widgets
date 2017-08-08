import { getWrapper } from '../shared';
import NavigationBar from '../../src/components/NavigationBar';
import DialerPanel from '../../src/components/DialerPanel';
import DialTextInput from '../../src/components/DialTextInput';
import TextInput from '../../src/components/TextInput';
import DialPad, { DialButton } from '../../src/components/DialPad';
import DropdownSelect from '../../src/components/DropdownSelect';

let wrapper = null;
let store = null;
let panel = null;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 32000;
  wrapper = await getWrapper();
  store = wrapper.props().phone.store;
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/');
  panel = wrapper.find(DialerPanel).first();
});

const clickButton = (button) => {
  button.find('g').first().props().onMouseDown();
  button.find('g').first().props().onMouseUp();
};

describe('dialer panel', () => {
  test('dial text input', () => {
    const dialTextInput = panel.find(DialTextInput).first();
    expect(dialTextInput).toBeDefined();
    const textInput = dialTextInput.find(TextInput).first();
    expect(textInput).toBeDefined();
    expect(textInput.props().value).toEqual('');

    textInput.props().onChange({ currentTarget: { value: '16506417422' } });
    expect(textInput.props().value).toEqual('16506417422');
    expect(store.getState(wrapper).call.toNumber).toEqual('16506417422');
  });

  test('dial buttons', () => {
    const dialPad = panel.find(DialPad).first();
    const buttons = dialPad.find(DialButton);
    expect(buttons.length).toEqual(12);
    const button1 = buttons.at(0);
    expect(button1.props().btn.value).toEqual('1');
    const button2 = buttons.at(1);
    expect(button2.props().btn.value).toEqual('2');
    const button3 = buttons.at(2);
    expect(button3.props().btn.value).toEqual('3');
    const button4 = buttons.at(3);
    expect(button4.props().btn.value).toEqual('4');
    const button5 = buttons.at(4);
    expect(button5.props().btn.value).toEqual('5');
    const button6 = buttons.at(5);
    expect(button6.props().btn.value).toEqual('6');
    const button7 = buttons.at(6);
    expect(button7.props().btn.value).toEqual('7');
    const button8 = buttons.at(7);
    expect(button8.props().btn.value).toEqual('8');
    const button9 = buttons.at(8);
    expect(button9.props().btn.value).toEqual('9');
    const buttonStar = buttons.at(9);
    expect(buttonStar.props().btn.value).toEqual('*');
    const button0 = buttons.at(10);
    expect(button0.props().btn.value).toEqual('0');
    const buttonSharp = buttons.at(11);
    expect(buttonSharp.props().btn.value).toEqual('#');

    const textInput = panel.find(DialTextInput).first().find(TextInput).first();
    expect(textInput.props().value).toEqual('');
    clickButton(button0);
    clickButton(button1);
    clickButton(button2);
    clickButton(button3);
    clickButton(button4);
    clickButton(button5);
    clickButton(button6);
    clickButton(button7);
    clickButton(button8);
    clickButton(button9);
    clickButton(buttonStar);
    clickButton(buttonSharp);
    expect(textInput.props().value).toEqual('0123456789*#');

    expect(store.getState(wrapper).call.toNumber).toEqual('0123456789*#');
  });

  test('invalid number', async () => {
    const textInput = panel.find(DialTextInput).first().find(TextInput).first();
    await textInput.props().onChange({ currentTarget: { value: 'Hello world' } });
    expect(store.getState(wrapper).call.toNumber).toEqual('Hello world');

    const callButton = panel.find('.callBtnRow').first().find('.btnSvgGroup').first();
    await callButton.simulate('click');
    const messages = store.getState(wrapper).alert.messages;
    expect(messages.length).toEqual(1);
    const message = messages[0];
    expect(message.level).toEqual('warning');
    expect(message.message).toEqual('callErrors-noToNumber');
  });

  test('clear input', async () => {
    const textInput = panel.find(DialTextInput).first().find(TextInput).first();
    await textInput.props().onChange({ currentTarget: { value: 'Hello world' } });
    expect(store.getState(wrapper).call.toNumber).toEqual('Hello world');

    const deleteButton = panel.find(DialTextInput).first().find('.delete').first();
    await deleteButton.simulate('click');
    expect(store.getState(wrapper).call.toNumber).toEqual('');
  });

  test('click call button to restore last number', async () => {
    const textInput = panel.find(DialTextInput).first().find(TextInput).first();
    await textInput.props().onChange({ currentTarget: { value: 'Hello world' } });
    expect(store.getState(wrapper).call.toNumber).toEqual('Hello world');

    const callButton = panel.find('.callBtnRow').first().find('.btnSvgGroup').first();
    await callButton.simulate('click');

    const deleteButton = panel.find(DialTextInput).first().find('.delete').first();
    await deleteButton.simulate('click');
    expect(store.getState(wrapper).call.toNumber).toEqual('');

    await callButton.simulate('click');
    expect(store.getState(wrapper).call.toNumber).toEqual('Hello world');
    expect(textInput.props().value).toEqual('Hello world');
  });

  test('from dropdown', async () => {
    const dropdownSelect = panel.find(DropdownSelect).first();
    const dropdown = dropdownSelect.find('.dropdown').first();
    const dropdownItems = dropdown.find('.dropdownItem');
    expect(dropdownItems.length > 1).toEqual(true);

    const firstNumber = dropdownItems.at(0).find('span.phoneNumber').first().children()
      .find('span')
      .first()
      .text();
    const secondNumber = dropdownItems.at(1).find('span.phoneNumber').first().children()
      .find('span')
      .first()
      .text();
    expect(firstNumber).not.toEqual(secondNumber);

    const selected = dropdownSelect.find('button.button').first().find('span.phoneNumber').first();
    await dropdownItems.at(1).simulate('click');
    expect(selected.children().find('span').first().text()).toEqual(secondNumber);
    await dropdownItems.at(0).simulate('click');
    expect(selected.children().find('span').first().text()).toEqual(firstNumber);
  });
});
