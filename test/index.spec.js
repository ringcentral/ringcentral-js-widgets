// import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { getWrapper } from './shared';
import DialTextInput from '../src/components/DialTextInput';
import TextInput from '../src/components/TextInput';

let wrapper = null;
beforeEach(() => {
  wrapper = getWrapper();
});

describe('initial test', () => {
  test('initial state', () => {
    expect(wrapper).toBeDefined();

    const provider = wrapper.find(Provider).first();
    expect(provider).toBeDefined();

    const router = provider.find(Router).first();
    expect(router).toBeDefined();

    const dialTextInput = router.find(DialTextInput).first();
    expect(dialTextInput).toBeDefined();
    const textInput = dialTextInput.find(TextInput).first();
    expect(textInput).toBeDefined();
    expect(textInput.props().value).toEqual('');

    textInput.props().onChange({ currentTarget: { value: '16506417422' } });
    expect(textInput.props().value).toEqual('16506417422');
  });
});
