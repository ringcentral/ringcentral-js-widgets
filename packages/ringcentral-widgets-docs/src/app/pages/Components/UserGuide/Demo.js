import React from 'react';
// eslint-disable-next-line
import UserGuide from 'ringcentral-widgets/components/UserGuide';

const props = {};
props.guides = [];
props.showSpinner = false;
props.currentLocale = 'en-US';

/**
 * A example of `UserGuide`
 */
const UserGuideDemo = () => (
  <UserGuide
    {...props}
  />
);
export default UserGuideDemo;
