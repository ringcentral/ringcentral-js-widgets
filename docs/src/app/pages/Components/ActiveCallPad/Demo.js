import React from 'react';
// eslint-disable-next-line
import ActiveCallPad from 'ringcentral-widget/components/ActiveCallPad';

const props = {};
props.onMute = () => null;
props.onUnmute = () => null;
props.onHold = () => null;
props.onUnhold = () => null;
props.onRecord = () => null;
props.onStopRecord = () => null;
props.hangup = () => null;
props.onShowKeyPad = () => null;
props.onAdd = () => null;

/**
 * A example of `ActiveCallPad`
 */
const ActiveCallPadDemo = () => (
  <ActiveCallPad
    {...props}
  />
);
export default ActiveCallPadDemo;
