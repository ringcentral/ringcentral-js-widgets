import React from 'react';
// eslint-disable-next-line
import OfflineModeBadge from 'ringcentral-widget/components/OfflineModeBadge';

const props = {};
props.offline = true;
props.showOfflineAlert = () => null;
props.currentLocale = 'en-US';

/**
 * A example of `OfflineModeBadge`
 */
const OfflineModeBadgeDemo = () => (
  <OfflineModeBadge
    {...props}
  />
);
export default OfflineModeBadgeDemo;
