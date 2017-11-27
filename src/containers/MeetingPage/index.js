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
    buttonText: 'Invite',
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(_, {
  phone: {
    meeting,
  },
}) {
  return {
    update: meetingState => meeting.update(meetingState),
    invite: meetingState => meeting.schedule(meetingState),
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

