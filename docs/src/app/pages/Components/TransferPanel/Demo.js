import React from 'react';
// eslint-disable-next-line
import TransferPanel from 'ringcentral-widget/components/TransferPanel';

const props = {};
props.transfer = () => null;
props.currentLocale = 'en-US';
props.toggleTransferPanel = () => null;
props.isOnTransfer = false;

/**
 * A example of `TransferPanel`
 */
const TransferPanelDemo = () => (
  <TransferPanel
    {...props}
  />
);
export default TransferPanelDemo;
