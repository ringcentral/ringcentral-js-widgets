import React from 'react';
// eslint-disable-next-line
import MeetingAlert from 'ringcentral-widgets/components/MeetingAlert';

const props = {};
props.currentLocale = 'en-US';
props.message = {
  message: 'test string'
};

/**
 * A example of `MeetingAlert`
 */
const MeetingAlertDemo = () => (
  <MeetingAlert
    {...props}
  />
);
export default MeetingAlertDemo;
