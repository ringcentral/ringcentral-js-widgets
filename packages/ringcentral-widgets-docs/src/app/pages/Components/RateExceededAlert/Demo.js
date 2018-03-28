import React from 'react';
// eslint-disable-next-line
import RateExceededAlert from 'ringcentral-widgets/components/RateExceededAlert';

const props = {};
props.timestamp = 0;
props.duration = 0;
props.currentLocale = 'en-US';

/**
 * A example of `RateExceededAlert`
 */
const RateExceededAlertDemo = () => (
  <RateExceededAlert
    {...props}
  />
);
export default RateExceededAlertDemo;
