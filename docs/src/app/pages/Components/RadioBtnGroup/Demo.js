import React from 'react';
// eslint-disable-next-line
import RadioBtnGroup from 'ringcentral-widgets/components/RadioBtnGroup';

const props = {};
props.className = 'test string';
props.radioOptions = [{
  id: '123',
  label: 'Home',
  phoneNumber: '+12345678'
}, {
  id: '1234',
  label: 'Mobile',
  phoneNumber: '+123456789'
}];
props.disabled = false;
props.formatPhone = v => v;
props.onRadioSelect = () => null;

/**
 * A example of `RadioBtnGroup`
 */
const RadioBtnGroupDemo = () => (
  <RadioBtnGroup
    {...props}
  />
);
export default RadioBtnGroupDemo;
