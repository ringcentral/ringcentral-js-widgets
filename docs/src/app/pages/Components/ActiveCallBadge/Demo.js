import React from 'react';
// eslint-disable-next-line
import ActiveCallBadge from 'ringcentral-widget/components/ActiveCallBadge';

const props = {};
props.onClick = (e) => {
  // eslint-disable-next-line
  alert('clicked');
  e.preventDefault();
};
props.offsetX = 0;
props.offsetY = 0;
props.updatePositionOffset = () => null;

/**
 * A example of `ActiveCallBadge`
 */
const ActiveCallBadgeDemo = () => (
  <ActiveCallBadge
    {...props}
  />
);
export default ActiveCallBadgeDemo;
