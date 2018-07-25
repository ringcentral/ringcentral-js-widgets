import React from 'react';
import { shallow, mount } from 'enzyme';
import Textinput from 'ringcentral-widgets/components/TextInput';

describe('<Textinput />', () => {
  it('should render correct', () => {
    const wrapper = shallow(<Textinput />);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('props received', () => {
    const eventHandler = jest.fn();
    const onKeyDown = jest.fn();
    const wrapper = shallow(<Textinput
      className={'helloClass'}
      invalid={false}
      onChange={eventHandler}
      placeholder={'hello placeholder'}
      disabled={false}
      readOnly={false}
      pattern={'hello pattern'}
      name={'hello name'}
      maxLength={20}
      value={'hello value'}
      defaultValue={'hello default value'}
      onKeyDown={onKeyDown}
      />
    );
    const div = wrapper.find('div').first();

    expect(div.props().className).toBeDefined();
    expect(div.props().className).toEqual('root helloClass');

    const input = wrapper.find('input').first();

    expect(input.props().onChange).toBeDefined();
    expect(input.props().placeholder).toBeDefined();
    expect(input.props().disabled).toBeDefined();
    expect(input.props().readOnly).toBeDefined();
    expect(input.props().pattern).toBeDefined();
    expect(input.props().name).toBeDefined();
    expect(input.props().maxLength).toBeDefined();
    expect(input.props().defaultValue).toBeDefined();
    expect(input.props().onKeyDown).toBeDefined();

    expect(input.props().placeholder).toEqual('hello placeholder');
    expect(input.props().disabled).toEqual(false);
    expect(input.props().readOnly).toEqual(false);
    expect(input.props().pattern).toEqual('hello pattern');
    expect(input.props().name).toEqual('hello name');
    expect(input.props().maxLength).toEqual(20);
    expect(input.props().defaultValue).toEqual('hello default value');
  });

  it('onChange event bind success', () => {
    const eventHandler = jest.fn();
    const wrapper = mount(<Textinput onChange={eventHandler} />);
    wrapper.find('input').simulate('change', { target: { value: 'hello' } });
    expect(eventHandler.mock.calls.length).toEqual(1);
  });

  it('onKeyDown event bind success', () => {
    const onKeyDown = jest.fn();
    const wrapper = mount(<Textinput onKeyDown={onKeyDown} />);
    wrapper.find('input').simulate('keydown', { which: 'a' });
    expect(onKeyDown.mock.calls.length).toEqual(1);
  });
});
