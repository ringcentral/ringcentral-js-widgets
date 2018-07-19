import React from 'react';
// eslint-disable-next-line
import ConferencePanel from 'ringcentral-widgets/components/ConferencePanel';

const props = {};
props.conferenceNumbers = {};
props.countryCode = 'US';
props.areaCode = '650';
props.currentLocale = 'en-US';
props.inviteWithText = () => null;
props.formatPhone = () => null;
props.formatInternational = () => null;
props.formatPin = () => null;

/**
 * A example of `ConferencePanel`
 */
const ConferencePanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <ConferencePanel
      countryCode="US"
      areaCode="650"
      dialInNumber="+123456"
      dialInNumbers={[
        {
          phoneNumber: '+12679304000',
          region: 'United States',
        }
      ]}
      currentLocale="en-US"
      inviteWithText={() => null}
      additionalNumbers={[]}
      updateAdditionalNumbers={() => null}
      updateDialInNumber={() => null}
      hostCode="12345678"
      participantCode="123456"
      joinAsHost={() => null}
      allowJoinBeforeHost={false}
      onAllowJoinBeforeHostChange={() => null}
      showHelpCommands={() => null}
      additionalButtons={[]}
      brand={{
        code: '1210',
        name: 'rc',
      }}
      alert={() => null}
      disableTxtBtn={false}
    />
  </div>
);
export default ConferencePanelDemo;
