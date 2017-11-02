import React from 'react';
// eslint-disable-next-line
import RemoveButton from 'ringcentral-widgets/components/RemoveButton';

const props = {};
props.onClick = () => alert('clicked');

/**
 * A example of `RemoveButton`
 */
const RemoveButtonDemo = () => (
  <RemoveButton
    {...props}
  />
);
export default RemoveButtonDemo;
