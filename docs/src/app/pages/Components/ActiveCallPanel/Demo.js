import React from 'react';
// eslint-disable-next-line
import ActiveCallPanel from 'ringcentral-widget/components/ActiveCallPanel';

const props = {};
props.currentLocale = 'en-US';
props.onMute = () => null;
props.onUnmute = () => null;
props.onHold = () => null;
props.onUnhold = () => null;
props.onRecord = () => null;
props.onStopRecord = () => null;
props.onAdd = () => null;
props.hangup = () => null;
props.toggleMinimized = () => null;
props.onKeyPadChange = () => null;
props.formatPhone = () => null;

/**
 * A example of `ActiveCallPanel`
 */
const ActiveCallPanelDemo = () => (
  <ActiveCallPanel
    {...props}
  />
);
export default ActiveCallPanelDemo;
