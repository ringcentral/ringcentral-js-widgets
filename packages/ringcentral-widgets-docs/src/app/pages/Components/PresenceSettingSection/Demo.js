import React from 'react';
// eslint-disable-next-line
import PresenceSettingSection from 'ringcentral-widgets/components/PresenceSettingSection';

const props = {};
props.currentLocale = 'en-US';
props.dndStatus = 'TakeAllCalls';
props.userStatus = 'Available';
props.isCallQueueMember = false;
props.setAvailable = () => null;
props.setBusy = () => null;
props.setDoNotDisturb = () => null;
props.setInvisible = () => null;
props.toggleAcceptCallQueueCalls = () => null;
props.showPresenceSettings = true;

/**
 * A example of `PresenceSettingSection`
 */
const PresenceSettingSectionDemo = () => (
  <div style={{
    position: 'relative',
    width: '300px',
  }}>
    <PresenceSettingSection
      {...props}
    />
  </div>
);
export default PresenceSettingSectionDemo;
