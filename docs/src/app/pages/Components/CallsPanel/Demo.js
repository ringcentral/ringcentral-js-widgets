import React from 'react';
// eslint-disable-next-line
import CallsPanel from 'ringcentral-widget/components/CallsPanel';

const props = {};
props.currentLocale = 'en-US';
props.calls = [];
props.areaCode = 'test string';
props.countryCode = 'test string';
props.disableLinks = false;
props.dateTimeFormatter = () => null;

/**
 * A example of `CallsPanel`
 */
const CallsPanelDemo = () => (
  <CallsPanel
    {...props}
  />
);
export default CallsPanelDemo;
