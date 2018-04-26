import React from 'react';
// eslint-disable-next-line
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';

const props = {};
props.onMute = () => null;
props.onUnmute = () => null;
props.onHold = () => null;
props.onUnhold = () => null;
props.onRecord = () => null;
props.onStopRecord = () => null;
props.onHangup = () => null;
props.onPark = () => null;
props.onShowKeyPad = () => null;
props.onAdd = () => null;
props.currentLocale = 'en-US';
props.flipNumbers = [];
props.recordStatus = 'recordStatus-idle';
props.onShowFlipPanel = () => null;
props.onToggleTransferPanel = () => null;
/**
 * A example of `ActiveCallPad`
 */
const ActiveCallPadDemo = () => (
  <ActiveCallPad
    {...props}
  />
);
export default ActiveCallPadDemo;
