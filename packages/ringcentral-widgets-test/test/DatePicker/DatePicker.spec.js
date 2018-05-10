import { shallow } from 'enzyme';
import React from 'react';
import DatePicker from 'ringcentral-widgets/components/DatePicker';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

const setup = (props) => {
  const wrapper = shallow(<DateTimePicker
    {...props}
  />);
  return wrapper;
};
momentLocalizer();
describe('Date Picker', () => {
  it('Date Picker Can be Select Specific Date', () => {
    const datePicker = setup({
    });
    console.log('@@', datePicker);
  });
});
