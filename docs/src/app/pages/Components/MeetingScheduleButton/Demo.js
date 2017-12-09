import React from 'react';
// eslint-disable-next-line
import MeetingScheduleButton from 'ringcentral-widgets/components/MeetingScheduleButton';

const props = {};
props.onClick = () => alert('clicked');

/**
 * A example of `MeetingScheduleButton`
 */
const MeetingScheduleButtonDemo = () => (
  <MeetingScheduleButton
    {...props}
  />
);
export default MeetingScheduleButtonDemo;
