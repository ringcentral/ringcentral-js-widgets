import { connect } from 'react-redux';

import MeetingPanel from '../../components/MeetingPanel';
import withPhone from '../../lib/withPhone';

function mapToProps(_, {
  phone: {
    meeting,
    locale,
  },
  disabled = false,
  showWhen,
  showDuration,
  showRecurringMeeting,
}) {
  return {
    meeting: meeting.meeting || {},
    currentLocale: locale.currentLocale,
    disabled: meeting.isScheduling || disabled,
    showWhen,
    showDuration,
    showRecurringMeeting,
  };
}

function mapToFunctions(_, {
  schedule,
  phone: {
    meeting,
  },
}) {
  return {
    update: meetingState => meeting.update(meetingState),
    invite: (meetingInfo) => {
      if (schedule) {
        schedule(meetingInfo);
        return;
      }
      meeting.schedule(meetingInfo);
    },
    init: () => meeting.init(),
  };
}

const MeetingPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(MeetingPanel));

export {
  mapToFunctions,
  mapToProps,
  MeetingPage as default,
};

