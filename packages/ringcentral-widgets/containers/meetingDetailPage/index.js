import { connect } from 'react-redux';

import MeetingDetailPanel from '../../components/MeetingDetailPanel';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  phone: {
    meeting,
    locale,
  },
}) {
  return {
    meeting: meeting.meeting || {},
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(_, {
  meetingEditorPath,
  phone: {
    routerInteraction,
  },
}) {
  return {
    goTomMeetingEditorPage() {
      routerInteraction.push(meetingEditorPath);
    }
  };
}

const MeetingDetailPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(MeetingDetailPanel));

export {
  mapToFunctions,
  mapToProps,
  MeetingDetailPage as default,
};
