import { mount } from 'enzyme';
import React from 'react';
import DatePicker from '@ringcentral-integration/widgets/components/DatePicker';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets-moment';
import sleep from '@ringcentral-integration/commons/lib/sleep';

const setup = (props) => {
  const wrapper = mount(<DateTimePicker {...props} />);
  return wrapper;
};
momentLocalizer();
describe('Date Picker', () => {
  it('Default Value Is Today', () => {
    const today = new Date();
    const dateWidget = setup({
      format: 'MM/DD/YY',
      value: today,
      onChange() {},
    });
    const showDate = new Date(dateWidget.find('input').props().value);
    expect(showDate.getFullYear()).toBe(today.getFullYear());
    expect(showDate.getMonth()).toBe(today.getMonth());
    expect(showDate.getDate()).toBe(today.getDate());
  });
  it('User Can Select A future Day', async () => {
    const today = new Date();
    const dateWidget = setup({
      format: 'MM/DD/YY',
      onChange() {},
    });
    const selectDateButton = dateWidget.find('[aria-label="Select date"]');
    selectDateButton.simulate('click');
    let showDate = new Date(dateWidget.find('input').props().value);
    const header = dateWidget.find('.rw-calendar-header');
    const navigateButton = header.find('button');
    const forwardButton = navigateButton.at(2);
    forwardButton.simulate('click');
    const futureDate = dateWidget
      .find('[role="row"]')
      .last()
      .find('.rw-cell')
      .last();
    futureDate.simulate('click');
    await sleep(300);
    showDate = new Date(dateWidget.find('input').props().value);
    expect(showDate.getTime()).not.toBe(today.getTime());
    // .rw-popup-transition-exited is the classname used when the popup is closed
    expect(dateWidget.find('.rw-open').length).toBe(0);
  });
  it('User Can Not Select A Last Day', () => {
    const dateWidget = setup({
      format: 'MM/DD/YY',
      onChange() {},
      min: new Date(),
    });
    const selectDateButton = dateWidget.find('[aria-label="Select date"]');
    selectDateButton.simulate('click');
    const header = dateWidget.find('.rw-calendar-header');
    const navigateButton = header.find('button');
    const backButton = navigateButton.at(0);
    backButton.simulate('click');
    const backDate = dateWidget
      .find('[role="row"]')
      .at(0)
      .find('.rw-cell')
      .at(0);
    backDate.simulate('click');
    expect(dateWidget.find('.rw-calendar-header').length).toBe(1);
  });
});
