// import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { getWrapper } from './shared';
import DialTextInput from '../src/components/DialTextInput';
import TextInput from '../src/components/TextInput';
import DialPad, { DialButton } from '../src/components/DialPad';
// import { DialButton } from '../src/components/DialPad';

let router = null;
beforeEach(() => {
  const wrapper = getWrapper();
  router = wrapper.find(Provider).first().find(Router).first();
});

describe('initial test', () => {
  test('initial state', () => {
    expect(router).toBeDefined();
  });
});


describe('dial page', () => {
  test('dial text input', () => {
    const dialTextInput = router.find(DialTextInput).first();
    expect(dialTextInput).toBeDefined();
    const textInput = dialTextInput.find(TextInput).first();
    expect(textInput).toBeDefined();
    expect(textInput.props().value).toEqual('');

    textInput.props().onChange({ currentTarget: { value: '16506417422' } });
    expect(textInput.props().value).toEqual('16506417422');
  });
  test('dial buttons', () => {
    const dialPad = router.find(DialPad).first();
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

    const textInput = router.find(DialTextInput).first().find(TextInput).first();
    expect(textInput.props().value).toEqual('');
  });
});
