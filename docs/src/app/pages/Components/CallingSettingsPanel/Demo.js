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
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <CallingSettingsPanel
      {...props}
    />
  </div>
);
export default CallingSettingsPanelDemo;
