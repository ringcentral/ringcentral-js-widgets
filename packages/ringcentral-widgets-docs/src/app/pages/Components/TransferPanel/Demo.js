import React from 'react';
// eslint-disable-next-line
import TransferPanel from 'ringcentral-widgets/components/TransferPanel';

const props = {};
props.onTransfer = () => null;
props.currentLocale = 'en-US';
props.toggleTransferPanel = () => null;
props.isOnTransfer = false;
props.formatPhone = p => p;
props.searchContactList = [];
props.searchContact = () => null;

/**
 * A example of `TransferPanel`
 */
const TransferPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <TransferPanel
      {...props}
    />
  </div>
);
export default TransferPanelDemo;
