import React from 'react';
// eslint-disable-next-line
import CallCtrlPanel from 'ringcentral-widget/components/CallCtrlPanel';

const props = {};
props.nameMatches = [];
props.fallBackName = 'test string';
props.currentLocale = 'en-US';
props.recordStatus = 'test string';
props.onMute = () => null;
props.onUnmute = () => null;
props.onHold = () => null;
props.onUnhold = () => null;
props.onRecord = () => null;
props.onStopRecord = () => null;
props.onAdd = () => null;
props.hangup = () => null;
props.flip = () => null;
props.transfer = () => null;
props.onBackButtonClick = () => null;
props.onKeyPadChange = () => null;
props.formatPhone = () => null;
props.areaCode = 'test string';
props.countryCode = 'test string';
props.selectedMatcherIndex = 0;
props.onSelectMatcherName = () => null;

/**
 * A example of `CallCtrlPanel`
 */
const CallCtrlPanelDemo = () => (
  <CallCtrlPanel
    {...props}
  />
);
export default CallCtrlPanelDemo;
