import React from 'react';
// eslint-disable-next-line
import RadioBtnGroup from 'ringcentral-widget/components/RadioBtnGroup';

const props = {};
props.className = 'test string';
props.radioOptions = [];
props.disabled = false;
props.formatPhone = () => null;
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
