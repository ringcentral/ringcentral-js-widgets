import { connect } from 'react-redux';

import MeetingPanel from '../../components/MeetingPanel';
import withPhone from '../../lib/withPhone';


function mapToProps(_, {
  phone: {
    meeting,
    googleCalendar,
    locale,
  },
}) {
  return {
    meeting: meeting.meeting,
    buttonText: 'Invite',
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(_, {
  phone: {
    meeting,
    googleCalendar,
  },
}) {
  return {
    update: meetingSatate => meeting.update(meetingSatate),
    invite: meetingSatate => meeting.schedule(meetingSatate),
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

