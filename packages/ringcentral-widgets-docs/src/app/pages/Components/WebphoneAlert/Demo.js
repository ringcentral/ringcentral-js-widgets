import React from 'react';
// eslint-disable-next-line
import WebphoneAlert from 'ringcentral-widgets/components/WebphoneAlert';

const props = {};
props.currentLocale = 'en-US';
props.message = {
  message: 'webphone-browserNotSupported',
};

/**
 * A example of `WebphoneAlert`
 */
const WebphoneAlertDemo = () => (
  <WebphoneAlert
    {...props}
  />
);
export default WebphoneAlertDemo;
