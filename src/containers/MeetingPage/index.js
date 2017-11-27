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
  afterScheduled,
  phone: {
    meeting,
  },
}) {
  return {
    update: meetingState => meeting.update(meetingState),
    invite: async (meetingState) => {
      const meetingInfo = await meeting.schedule(meetingState);
      if (afterScheduled) afterScheduled(meetingInfo);
      // initialize meeting after last one created
      meeting.init();
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

