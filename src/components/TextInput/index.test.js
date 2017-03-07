import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Textinput from '../TextInput';

describe('<Textinput />', () => {
  it('should render correct', () => {
    const wrapper = shallow(<Textinput />);
    expect(wrapper).to.have.exactly(1).descendants('div');
    expect(wrapper).to.have.exactly(1).descendants('input');
  });

  it('props received', () => {
    const onChange = jest.fn();
    const onKeyDown = jest.fn();
    const wrapper = shallow(<Textinput
      className={'helloClass'}
      invalid={false}
      onChange={onChange}
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
    const div = wrapper.find('div');

    expect(div).to.have.prop('className');

    expect(div).to.have.prop('className').equal('helloClass');

    const input = wrapper.find('input');

    expect(input).to.have.prop('onChange');
    expect(input).to.have.prop('placeholder');
    expect(input).to.have.prop('disabled');
    expect(input).to.have.prop('readOnly');
    expect(input).to.have.prop('pattern');
    expect(input).to.have.prop('name');
    expect(input).to.have.prop('maxLength');
    expect(input).to.have.prop('defaultValue');
    expect(input).to.have.prop('onKeyDown');

    expect(input).to.have.prop('onChange').equal(onChange);
    expect(input).to.have.prop('placeholder').equal('hello placeholder');
    expect(input).to.have.prop('disabled').equal(false);
    expect(input).to.have.prop('readOnly').equal(false);
    expect(input).to.have.prop('pattern').equal('hello pattern');
    expect(input).to.have.prop('name').equal('hello name');
    expect(input).to.have.prop('maxLength').equal(20);
    expect(input).to.have.prop('defaultValue').equal('hello default value');
    expect(input).to.have.prop('onKeyDown').equal(onKeyDown);
  });

  it('onChange event bind success', () => {
    const onChnageSpy = jest.fn();
    const wrapper = shallow(<Textinput onChange={onChnageSpy} />);
    wrapper.find('input').simulate('change', { target: { value: 'hello' } });
    expect(onChnageSpy).to.have.been.calledOnce;
  });

  it('onKeyDown event bind success', () => {
    const onKeyDown = jest.fn();
    const wrapper = shallow(<Textinput onChange={onKeyDown} />);
    wrapper.find('input').simulate('keyDown', { which: 'a' });
    expect(onKeyDown).to.have.been.calledOnce;
  });
});
