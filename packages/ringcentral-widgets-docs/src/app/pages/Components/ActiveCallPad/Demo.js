import React from 'react';
// eslint-disable-next-line
import ActiveCallPad from 'ringcentral-widgets/components/ActiveCallPad';
import callCtrlLayouts from 'ringcentral-widgets/enums/callCtrlLayouts';

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
props.onMerge = () => null;
props.currentLocale = 'en-US';
props.flipNumbers = [];
props.recordStatus = 'recordStatus-idle';
props.onShowFlipPanel = () => null;
props.onToggleTransferPanel = () => null;
props.layout = callCtrlLayouts.normalCtrl;

/**
 * A example of `ActiveCallPad`
 */
const ActiveCallPadDemo = () => (
  <ActiveCallPad
    {...props}
  />
);
export default ActiveCallPadDemo;
