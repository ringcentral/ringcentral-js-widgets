import { connect } from 'react-redux';

import MeetingPanel from '../../components/MeetingPanel';
import withPhone from '../../lib/withPhone';

function mapToProps(_, {
  phone: {
    meeting,
    locale,
  },
}) {
  return {
    meeting: meeting.meeting || {},
    currentLocale: locale.currentLocale,
    disabled: meeting.isScheduling || false,
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
    invite: schedule || meeting.schedule,
    validate: () => {},
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

