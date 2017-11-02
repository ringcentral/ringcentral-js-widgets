import React from 'react';
// eslint-disable-next-line
import ConferencePanel from 'ringcentral-widgets/components/ConferencePanel';

const props = {};
props.conferenceNumbers = {};
props.countryCode = 'test string';
props.areaCode = 'test string';
props.currentLocale = 'en-US';
props.inviteWithText = () => null;
props.formatPhone = () => null;
props.formatInternational = () => null;
props.formatPin = () => null;

/**
 * A example of `ConferencePanel`
 */
const ConferencePanelDemo = () => (
  <ConferencePanel
    {...props}
  />
);
export default ConferencePanelDemo;
