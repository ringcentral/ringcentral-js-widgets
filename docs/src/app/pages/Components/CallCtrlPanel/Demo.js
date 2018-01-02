import React from 'react';
// eslint-disable-next-line
import CallCtrlPanel from 'ringcentral-widgets/components/CallCtrlPanel';

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
props.onHangup = () => null;
props.onFlip = () => null;
props.onPark = () => null;
props.onTransfer = () => null;
props.onBackButtonClick = () => null;
props.onKeyPadChange = () => null;
props.formatPhone = () => null;
props.areaCode = 'test string';
props.countryCode = 'test string';
props.selectedMatcherIndex = 0;
props.onSelectMatcherName = () => null;
props.calls = [{}, {}];
props.searchContactList = [];
props.searchContact = () => null;
/**
 * A example of `CallCtrlPanel`
 */
const CallCtrlPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <CallCtrlPanel
      {...props}
    />
  </div>
);
export default CallCtrlPanelDemo;
