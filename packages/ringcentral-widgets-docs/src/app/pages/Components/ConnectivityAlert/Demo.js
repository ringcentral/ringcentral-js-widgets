import React from 'react';
// eslint-disable-next-line
import ConnectivityAlert from 'ringcentral-widgets/components/ConnectivityAlert';

const props = {};
props.message = {
  message: 'test string'
};
props.currentLocale = 'en-US';

/**
 * A example of `ConnectivityAlert`
 */
const ConnectivityAlertDemo = () => (
  <ConnectivityAlert
    {...props}
  />
);
export default ConnectivityAlertDemo;
