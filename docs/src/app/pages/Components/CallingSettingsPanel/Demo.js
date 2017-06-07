import React from 'react';
// eslint-disable-next-line
import CallingSettingsPanel from 'ringcentral-widget/components/CallingSettingsPanel';

const props = {};
props.brand = 'test string';
props.currentLocale = 'en-US';
props.callWithOptions = ['test string'];
props.callWith = 'test string';
props.myLocation = 'test string';
props.ringoutPrompt = false;
props.availableNumbers = {};
props.onBackButtonClick = () => null;
props.onSave = () => null;

/**
 * A example of `CallingSettingsPanel`
 */
const CallingSettingsPanelDemo = () => (
  <CallingSettingsPanel
    {...props}
  />
);
export default CallingSettingsPanelDemo;
