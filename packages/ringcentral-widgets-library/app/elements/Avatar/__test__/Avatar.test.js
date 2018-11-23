import React from 'react';
import { mount } from 'enzyme';

import Avatar from '../index';

describe('Avatar interaction', () => {
  it('onClick should called when click Avatar', () => {
    const clickFn = jest.fn();
    const wrapper = mount(<Avatar id="click" onClick={clickFn} />);
    wrapper.simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
