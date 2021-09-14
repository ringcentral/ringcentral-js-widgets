import React from 'react';
// eslint-disable-next-line
import PermissionsAlert from '@ringcentral-integration/widgets/components/AlertRenderer/PermissionsAlert';

const props = {};
props.message = {
  message: 'test string',
};
props.brand = 'test string';
props.application = 'test string';
props.currentLocale = 'en-US';

/**
 * A example of `PermissionsAlert`
 */
const PermissionsAlertDemo = () => <PermissionsAlert {...props} />;
export default PermissionsAlertDemo;
