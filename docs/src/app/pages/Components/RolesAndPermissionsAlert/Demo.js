import React from 'react';
// eslint-disable-next-line
import RolesAndPermissionsAlert from 'ringcentral-widget/components/RolesAndPermissionsAlert';

const props = {};
props.message = {
  message: 'test string'
};
props.brand = 'test string';
props.application = 'test string';
props.currentLocale = 'en-US';

/**
 * A example of `RolesAndPermissionsAlert`
 */
const RolesAndPermissionsAlertDemo = () => (
  <RolesAndPermissionsAlert
    {...props}
  />
);
export default RolesAndPermissionsAlertDemo;
