import React from 'react';
// eslint-disable-next-line
import PresenceItem from 'ringcentral-widget/components/PresenceItem';

const props = {};
props.onClick = () => alert('clicked');
props.userStatus = 'test string';
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
