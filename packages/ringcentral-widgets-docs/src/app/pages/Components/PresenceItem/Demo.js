import React from 'react';
// eslint-disable-next-line
import PresenceItem from 'ringcentral-widgets/components/PresenceItem';

const props = {};
props.onClick = () => alert('clicked');
props.userStatus = 'Available';
props.selected = false;
props.currentLocale = 'en-US';

/**
 * A example of `PresenceItem`
 */
const PresenceItemDemo = () => (
  <PresenceItem
    {...props}
  />
);
export default PresenceItemDemo;
