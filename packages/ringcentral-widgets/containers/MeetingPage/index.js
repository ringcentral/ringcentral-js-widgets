import { connect } from 'react-redux';

import MeetingPanel from '../../components/MeetingPanel';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  phone: {
    meeting,
    locale,
    connectivityMonitor,
    rateLimiter,
  },
  disabled = false,
  showWhen,
  showDuration,
  showRecurringMeeting,
  openNewWindow = true,
}) {
  return {
    meeting: meeting.meeting || {},
    currentLocale: locale.currentLocale,
    disabled: (
      meeting.isScheduling ||
      disabled ||
      !connectivityMonitor.connectivity ||
      (rateLimiter && rateLimiter.throttling)
    ),
    showWhen,
    showDuration,
    showRecurringMeeting,
    openNewWindow,
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
    async invite(meetingInfo, opener) {
      if (schedule) {
        await schedule(meetingInfo, opener);
        return;
      }
      await meeting.schedule(meetingInfo, {}, opener);
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
