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
    const button = mount(<Button id="click" onClick={clickFn} disabled className="testCls">Test</Button>);
    expect(button.find('div').hasClass('disabled')).toBe(true);
    expect(button.find('div').hasClass('testCls')).toBe(true);
    button.simulate('click');
    expect(clickFn).toHaveBeenCalledTimes(0);
  });
  it('when props icon has value, button should have icon node', () => {
    const button = mount(<Button icon="Message"> Test </Button>);
    expect(button.find('svg')).toHaveLength(1);
  });
  it('test different type of props types', () => {
    const buttonPrimary = mount(<Button type="primary"> Test</Button>);
    expect(buttonPrimary.find('div').hasClass('rc-btn-primary')).toBe(true);
    const buttonWarning = mount(<Button type="warning"> Test</Button>);
    expect(buttonWarning.find('div').hasClass('rc-btn-warning')).toBe(true);
    const buttonOutline = mount(<Button type="outline"> Test</Button>);
    expect(buttonOutline.find('div').hasClass('rc-btn-outline')).toBe(true);
    const buttonDefault = mount(<Button> Test</Button>);
    expect(buttonDefault.find('div').hasClass('rc-btn-default')).toBe(true);
  });
});
