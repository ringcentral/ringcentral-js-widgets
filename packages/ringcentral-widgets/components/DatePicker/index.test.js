import { mount } from 'enzyme';
import React from 'react';
import DatePicker from 'ringcentral-widgets/components/DatePicker';

const setup = (props) => {
  const wrapper = mount(<DatePicker
    {...props}
  />);
  return wrapper;
};

describe('Date Picker', () => {
  it('Date Picker Can be Select Specific Date', () => {
    const datePicker = setup({
      date: new Date(),
      onChange: () => {},
    });
    const dateText = datePicker.find('.dateText');
    dateText.simulate('click');
    console.log('@@datePicker', datePicker.html(), '@@dateText', dateText.html());
  });
});
