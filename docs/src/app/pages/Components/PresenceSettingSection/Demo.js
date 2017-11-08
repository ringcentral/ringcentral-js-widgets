import React from 'react';
// eslint-disable-next-line
import PresenceSettingSection from 'ringcentral-widgets/components/PresenceSettingSection';

const props = {};
props.currentLocale = 'en-US';
props.dndStatus = 'test string';
props.userStatus = 'test string';
props.isCallQueueMember = false;
props.setAvailable = () => null;
props.setBusy = () => null;
props.setDoNotDisturb = () => null;
props.setInvisible = () => null;
props.toggleAcceptCallQueueCalls = () => null;
props.showPresenceSettings = false;

/**
 * A example of `PresenceSettingSection`
 */
const PresenceSettingSectionDemo = () => (
  <PresenceSettingSection
    {...props}
  />
);
export default PresenceSettingSectionDemo;
