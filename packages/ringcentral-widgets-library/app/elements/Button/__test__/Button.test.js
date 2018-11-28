import React from 'react';
import { mount } from 'enzyme';

import Button from '../index';

describe('Button props and interaction check', () => {
  it('onClick should called when click Avatar', () => {
    const clickFn = jest.fn();
    const button = mount(<Button id="click" onClick={clickFn} />);
    button.simulate('click');
    expect(clickFn).toHaveBeenCalledTimes(1);
  });
  it('when prop disabled is true, button should be disabled', () => {
    const clickFn = jest.fn();
    const button = mount(<Button id="click" onClick={clickFn} disabled className="testCls" />);
    expect(button.find('div').hasClass('disabled')).toBe(true);
    expect(button.find('div').hasClass('testCls')).toBe(true);
    button.simulate('click');
    expect(clickFn).toHaveBeenCalledTimes(0);
  });
});
