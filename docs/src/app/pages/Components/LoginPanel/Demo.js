import React from 'react';
// eslint-disable-next-line
import LoginPanel from 'ringcentral-widget/components/LoginPanel';

const props = {};
props.setupProxyFrame = () => null;
props.clearProxyFrame = () => null;
props.currentLocale = 'en-US';
props.onLoginButtonClick = () => null;

/**
 * A example of `LoginPanel`
 */
const LoginPanelDemo = () => (
  <LoginPanel
    {...props}
  />
);
export default LoginPanelDemo;
