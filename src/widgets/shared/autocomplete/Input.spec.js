/* global describe it */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { postProcess } from '../../../utils/test';

import data from '../../../../test.json';

import Input from './Input.react';

describe('<Input />', () => {
  it('display default value', () => {
    const wrapper = mount(
      <Input
        {...postProcess(data['Input.react.js'])}
      />
    );
    expect(wrapper.find('input').prop('value'))
      .to.equal(postProcess(data['Input.react.js']).value);
  });

  it('has proper class name', () => {
    const wrapper = mount(
      <Input
        {...postProcess(data['Input.react.js'])}
      />
    );
    expect(wrapper.find('input').prop('className'))
      .to.equal(postProcess(data['Input.react.js']).className);
  });

  it('has proper place holder', () => {
    const wrapper = mount(
      <Input
        {...postProcess(data['Input.react.js'])}
      />
    );
    expect(wrapper.find('input').prop('placeholder'))
      .to.equal(postProcess(data['Input.react.js']).placeholder);
  });

  it('call onChange when input', () => {
    const onInputChange = sinon.spy();
    const wrapper = mount(
      <Input
        {...postProcess(data['ActiveCall.react.js'])}
        onChange={onInputChange}
      />
    );
    wrapper.find('input').simulate('change', { target: { value: 'My new value' } });
    expect(onInputChange.calledOnce).to.equal(true);
  });
});
