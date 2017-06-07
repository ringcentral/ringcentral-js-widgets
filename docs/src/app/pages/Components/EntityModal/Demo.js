import React from 'react';
// eslint-disable-next-line
import EntityModal from 'ringcentral-widget/components/EntityModal';

const props = {};
props.onCreate = () => null;
props.onCancel = () => null;
props.currentLocale = 'en-US';

/**
 * A example of `EntityModal`
 */
const EntityModalDemo = () => (
  <EntityModal
    {...props}
  />
);
export default EntityModalDemo;
