import React from 'react';
// eslint-disable-next-line
import MeetingPanel from 'ringcentral-widgets/components/MeetingPanel';
import MeetingScheduleButton from 'ringcentral-widgets/components/MeetingScheduleButton';

const props = {};
props.update = () => null;
props.invite = () => null;
props.init = () => null;
props.meeting = {
  topic: 'My Meeting',
  _requireMeetingPassword: false,
  _showDate: false,
  _showTime: false,
  allowJoinBeforeHost: false,
  audioOptions: ['Phone', 'ComputerAudio'],
  host: { id: null },
  meetingType: 'Scheduled',
  password: null,
  schedule: {
    durationInMinutes: 60,
    startTime: 1512611358189,
    timeZone: { id: '1' },
  },
  startHostVideo: false,
  startParticipantsVideo: false,
};
props.currentLocale = 'en-US';
props.scheduleButton = MeetingScheduleButton;

/**
 * A example of `MeetingPanel`
 */
const MeetingPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <MeetingPanel
      {...props}
    />
  </div>
);
export default MeetingPanelDemo;
