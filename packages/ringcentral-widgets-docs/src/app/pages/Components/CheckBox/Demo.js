import React from 'react';
// eslint-disable-next-line
import CheckBox from 'ringcentral-widgets/components/CheckBox';

const props = {};
props.selected = 2;
props.data = [{
  text: 'option1',
  value: 1,
}, {
  text: 'option2',
  value: 2,
}];
props.textField = 'text';
props.valueField = 'value';
props.onSelect = () => null;

/**
 * A example of `CheckBox`
 */
const CheckBoxDemo = () => (
  <CheckBox
    {...props}
  />
);
export default CheckBoxDemo;
