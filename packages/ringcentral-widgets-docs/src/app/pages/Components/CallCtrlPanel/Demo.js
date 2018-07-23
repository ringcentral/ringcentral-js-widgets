import React from 'react';
// eslint-disable-next-line
import CallCtrlPanel from 'ringcentral-widgets/components/CallCtrlPanel';
import callCtrlLayouts from 'ringcentral-widgets/enums/callCtrlLayouts';

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
props.onMerge = () => null;
props.onHangup = () => null;
props.onFlip = () => null;
props.onPark = () => null;
props.onTransfer = () => null;
props.showBackButton = true;
props.onBackButtonClick = () => null;
props.onKeyPadChange = () => null;
props.formatPhone = () => null;
props.areaCode = '650';
props.countryCode = 'US';
props.selectedMatcherIndex = 0;
props.onSelectMatcherName = () => null;
props.searchContactList = [];
props.searchContact = () => null;
props.layout = callCtrlLayouts.normalCtrl;

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
