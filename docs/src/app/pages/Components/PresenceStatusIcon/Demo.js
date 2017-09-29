import React from 'react';
// eslint-disable-next-line
import PresenceStatusIcon from 'ringcentral-widget/components/PresenceStatusIcon';

const props = {};
props.userStatus = 'Available';

/**
 * A example of `PresenceStatusIcon`
 */
const PresenceStatusIconDemo = () => (
  <PresenceStatusIcon
    {...props}
  />
);
export default PresenceStatusIconDemo;
