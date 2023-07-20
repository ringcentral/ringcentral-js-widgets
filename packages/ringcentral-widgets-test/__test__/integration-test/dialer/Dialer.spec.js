import { sleep } from '@ringcentral-integration/commons/utils';
import DialButton from '@ringcentral-integration/widgets/components/DialButton';
import DialerPanel from '@ringcentral-integration/widgets/components/DialerPanel';
import DialPad from '@ringcentral-integration/widgets/components/DialPad';
import DropdownSelect from '@ringcentral-integration/widgets/components/DropdownSelect';
import NavigationBar from '@ringcentral-integration/widgets/components/NavigationBar';
import { RemoveButton } from '@ringcentral-integration/widgets/components/RemoveButton';

import { getWrapper } from '../shared';

let wrapper = null;
let panel = null;
beforeEach(async () => {
  jest.setTimeout(64000);
  wrapper = await getWrapper();
  const navigationBar = wrapper.find(NavigationBar).first();
  await navigationBar.props().goTo('/');
  wrapper.update();
  panel = wrapper.find(DialerPanel).first();
  Object.defineProperties(wrapper.props().phone.audioSettings, {
    userMedia: { value: true },
  });
});

const clickButton = (button) => {
  button.find('g').first().simulate('mouseDown');
  button.find('g').first().simulate('mouseUp');
  wrapper.update();
};

const enterToNumber = async (number) => {
  const domInput = panel.find('input');
  domInput.instance().value = number;
  await domInput.simulate('change');
};

describe('dialer panel', () => {
  test('dial text input', async () => {
    let domInput = panel.find('input');
    expect(domInput).toBeDefined();
    expect(domInput.props().value).toEqual('');
    await enterToNumber('16506417422');
    panel = wrapper.find(DialerPanel).first();
    domInput = panel.find('input');
    const store = wrapper.props().phone.store;
    expect(domInput.props().value).toEqual('16506417422');
    expect(store.getState(wrapper).dialerUI.toNumberField).toEqual(
      '16506417422',
    );
  });

  test('number buttons', () => {
    let textInput = panel.find('input');
    expect(textInput.props().value).toEqual('');

    const dialPad = panel.find(DialPad).first();
    const buttons = dialPad.find(DialButton);
    expect(buttons.length).toEqual(12);

    const buttonValues = buttons.map((button) => {
      clickButton(button);
      return button.props().btn.value;
    });
    expect(buttonValues).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '*',
      '0',
      '#',
    ]);

    panel = wrapper.find(DialerPanel).first();
    textInput = panel.find('input');
    const store = wrapper.props().phone.store;
    expect(textInput.props().value).toEqual('123456789*0#');

    expect(store.getState(wrapper).dialerUI.toNumberField).toEqual(
      '123456789*0#',
    );
  });

  test.each`
    inputNumber
    ${'Hello world'}
    ${''}
    ${'!@#$'}
  `("RCI-525: invalid number with '$inputNumber'", async ({ inputNumber }) => {
    await enterToNumber(inputNumber);
    const store = wrapper.props().phone.store;
    expect(store.getState(wrapper).dialerUI.toNumberField).toEqual(inputNumber);

    const callButton = panel
      .find('.callBtnRow')
      .find('.callBtn')
      .find('.btnSvgGroup');
    await callButton.simulate('click');
    await sleep(200);
    const messages = store.getState(wrapper).alert.messages;
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          level: 'warning',
          message: 'callErrors-noToNumber',
        }),
      ]),
    );
  });

  test('clear input', async () => {
    await enterToNumber('Hello world');
    const store = wrapper.props().phone.store;
    expect(store.getState(wrapper).dialerUI.toNumberField).toEqual(
      'Hello world',
    );

    const deleteButton = panel.first().find(RemoveButton);
    await deleteButton.simulate('click');
    expect(store.getState(wrapper).dialerUI.toNumberField).toEqual('');
  });

  test('RCI-539: click call button to restore last number', async () => {
    await enterToNumber('Hello world');
    const store = wrapper.props().phone.store;
    expect(store.getState(wrapper).dialerUI.toNumberField).toEqual(
      'Hello world',
    );

    const callButton = panel
      .find('.callBtnRow')
      .find('.callBtn')
      .find('.btnSvgGroup');
    await callButton.simulate('click');
    await sleep(200);
    panel = wrapper.find(DialerPanel).first();
    const deleteButton = panel.find(RemoveButton);
    await deleteButton.simulate('click');
    await sleep(200);
    expect(store.getState(wrapper).dialerUI.toNumberField).toEqual('');

    await callButton.simulate('click');
    await sleep(200);
    expect(store.getState(wrapper).dialerUI.toNumberField).toEqual(
      'Hello world',
    );
    panel = wrapper.find(DialerPanel).first();
    const textInput = panel.find('input');
    expect(textInput.instance().value).toEqual('Hello world');
  });

  test('from dropdown', async () => {
    let dropdownSelect = panel.find(DropdownSelect).first();
    dropdownSelect.find('[data-sign="selectRoot"]').first().simulate('click');
    panel = wrapper.find(DialerPanel).first();
    dropdownSelect = panel.find(DropdownSelect).first();
    const dropdown = dropdownSelect.find('.dropdown').first();
    const dropdownItems = dropdown.find('li[data-sign="selectMenuItem"]');
    expect(dropdownItems.length > 1).toEqual(true);

    const firstNumber = dropdownItems
      .at(0)
      .find('span.phoneNumber')
      .first()
      .children()
      .find('span')
      .at(1)
      .text();
    const secondNumber = dropdownItems
      .at(1)
      .find('span.phoneNumber')
      .children()
      .find('span')
      .at(1)
      .text();
    expect(firstNumber).not.toEqual(secondNumber);

    await dropdownItems.at(1).simulate('click');

    panel = wrapper.find(DialerPanel).first();
    dropdownSelect = panel.find(DropdownSelect).first();
    const selected = dropdownSelect
      .find('div.button')
      .first()
      .find('span.phoneNumber');
    expect(selected.children().find('span').first().text()).toEqual(
      secondNumber,
    );
    await dropdownItems.at(0).simulate('click');
    panel = wrapper.find(DialerPanel).first();
    dropdownSelect = panel.find(DropdownSelect).first();
    expect(selected.children().find('span').first().text()).toEqual(
      firstNumber,
    );
  });
});
