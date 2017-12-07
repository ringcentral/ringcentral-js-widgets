import React from 'react';
// eslint-disable-next-line
import LocalePicker from 'ringcentral-widgets/components/LocalePicker';

const props = {};
props.value = 'test string';
props.options = ['test string'];
props.onChange = () => null;

/**
 * A example of `LocalePicker`
 */
const LocalePickerDemo = () => (
  <LocalePicker
    {...props}
  />
);
export default LocalePickerDemo;
