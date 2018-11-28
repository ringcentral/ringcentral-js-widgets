import React from 'react';
import { mount } from 'enzyme';

import CheckBox from '../index';

describe('CheckBox', () => {
  it('onSelect should be called', () => {
    const onSelectFn = jest.fn();
    const data = [
      {
        key: 'option1',
        value: 'option1',
      },
      {
        key: 'option2',
        value: 'option2',
      }
    ];
    const selected = 'option1';
    const checkBox = mount(<CheckBox
      data={data}
      selected={selected}
      onSelect={onSelectFn}
      valueField="key"
      textField="value"
    />);
    const items = checkBox.find('.item');
    items.forEach(i => i.simulate('click'));
    expect(onSelectFn).toHaveBeenCalledTimes(data.length);
  });
});
