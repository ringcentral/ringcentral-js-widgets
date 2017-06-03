import React from 'react';
// eslint-disable-next-line
import AuthAlert from 'ringcentral-widget/components/AuthAlert';

const props = {};
props.currentLocale = 'en-US';
props.message = {
  message: 'test string'
};

/**
 * A example of `AuthAlert`
 */
const AuthAlertDemo = () => (
  <AuthAlert
    {...props}
  />
);
export default AuthAlertDemo;
