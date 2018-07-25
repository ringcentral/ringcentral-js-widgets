import React from 'react';
// eslint-disable-next-line
import ConferenceAlert from 'ringcentral-widgets/components/ConferenceAlert';

const props = {};
props.currentLocale = 'en-US';
props.message = {
  message: 'test string'
};

/**
 * A example of `ConferenceAlert`
 */
const ConferenceAlertDemo = () => (
  <ConferenceAlert
    {...props}
  />
);
export default ConferenceAlertDemo;
