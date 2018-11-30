import React from 'react';
import { mount } from 'enzyme';

import NormalItem from '../NormalItem';

import Icon from '../../../elements/Icon';

describe('Normal', () => {
  it('when type is line and click action should be called', () => {
    const props = {
      label: 'hello line',
      onClick: jest.fn()
    };
    const { Line } = NormalItem;
    const lineItem = mount(
      <NormalItem>
        <Line {...props} />
      </NormalItem>
    );
    lineItem.find('LinkLine').simulate('click');
    expect(props.onClick).toBeCalledTimes(1);
  });

  it('when type is switch and change the switch button, onChange should be called', () => {
    const props = {
      label: 'hello switch',
      title: 'Switch Title',
      checked: false,
      onChange: jest.fn(),
      disable: false,
    };
    const { Switch } = NormalItem;
    const switchItem = mount(
      <NormalItem>
        <Switch {...props} />
      </NormalItem>
    );
    switchItem.find('Switch').find('input').simulate('change');
    expect(props.onChange).toBeCalledTimes(1);
  });
});
