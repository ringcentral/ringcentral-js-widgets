import React from 'react';
// eslint-disable-next-line
import RolesAndPermissionsAlert from '@ringcentral-integration/widgets/components/AlertRenderer/RolesAndPermissionsAlert';

const props = {};
props.message = {
  message: 'test string',
};
props.brand = 'test string';
props.application = 'test string';
props.currentLocale = 'en-US';

/**
 * A example of `RolesAndPermissionsAlert`
 */
const RolesAndPermissionsAlertDemo = () => (
  <RolesAndPermissionsAlert {...props} />
);
export default RolesAndPermissionsAlertDemo;
