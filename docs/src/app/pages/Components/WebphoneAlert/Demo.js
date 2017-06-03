import React from 'react';
// eslint-disable-next-line
import WebphoneAlert from 'ringcentral-widget/components/WebphoneAlert';

const props = {};
props.currentLocale = 'en-US';
props.message = {
  message: 'test string'
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
