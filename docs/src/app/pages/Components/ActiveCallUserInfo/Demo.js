import React from 'react';
// eslint-disable-next-line
import ActiveCallUserInfo from 'ringcentral-widget/components/ActiveCallUserInfo';

const props = {};
props.currentLocale = 'en-US';
props.formatPhone = () => null;

/**
 * A example of `ActiveCallUserInfo`
 */
const ActiveCallUserInfoDemo = () => (
  <ActiveCallUserInfo
    {...props}
  />
);
export default ActiveCallUserInfoDemo;
