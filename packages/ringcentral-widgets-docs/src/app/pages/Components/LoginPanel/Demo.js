import React from 'react';
// eslint-disable-next-line
import LoginPanel from '@ringcentral-integration/widgets/components/LoginPanel';

const props = {};
props.currentLocale = 'en-US';
props.onLoginButtonClick = () => null;

/**
 * A example of `LoginPanel`
 */
const LoginPanelDemo = () => (
  <div
    style={{
      position: 'relative',
      height: '500px',
      width: '300px',
      border: '1px solid #f3f3f3',
    }}
  >
    <LoginPanel {...props} />
  </div>
);
export default LoginPanelDemo;
