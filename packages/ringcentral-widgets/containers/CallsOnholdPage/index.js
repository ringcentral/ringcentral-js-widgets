import { connect } from 'react-redux';
import callDirections from 'ringcentral-integration/enums/callDirections';

import withPhone from '../../lib/withPhone';
import CallsOnholdPanel from '../../components/CallsOnholdPanel';

import {
  mapToProps as mapToBaseProps,
  mapToFunctions as mapToBaseFunctions,
} from '../ActiveCallsPage';

function mapToProps(_, {
  phone,
  phone: {
    callMonitor,
    contactMatcher,
  },
  ...props
}) {
  const baseProps = mapToBaseProps(_, {
    phone,
    ...props,
  });
  const contactMapping = contactMatcher && contactMatcher.dataMapping;

  return {
    ...baseProps,
    calls: callMonitor.activeOnHoldCalls.filter(call => call.direction !== callDirections.inbound),
    contactMapping,
  };
}

function mapToFunctions(_, {
  params,
  phone,
  phone: {
    webphone,
    conferenceCall,
    routerInteraction,
  },
  getAvatarUrl,
  ...props
}) {
  const baseProps = mapToBaseFunctions(_, {
    params,
    phone,
    ...props,
  });
  return {
    ...baseProps,
    async onMerge(sessionId) {
      const session = webphone._sessions.get(sessionId);
      if (webphone.isCallRecording(session)) {
        return;
      }
      routerInteraction.replace('/calls/active');
      conferenceCall.setMergeParty({ toSessionId: sessionId });
      const sessionToMergeWith = webphone._sessions.get(conferenceCall.mergingPair.fromSessionId);
      const isCurrentOnhold = sessionToMergeWith && sessionToMergeWith.isOnHold().local;
      const webphoneSessions = sessionToMergeWith
        ? [sessionToMergeWith, session]
        : [session];
      await conferenceCall.mergeToConference(webphoneSessions);
      const conferenceData = Object.values(conferenceCall.conferences)[0];
      const conferenceSession = webphone._sessions.get(conferenceData.sessionId);
      const isConferenceOnhold = conferenceSession.isOnHold().local;

      if (conferenceData && isCurrentOnhold) {
        webphone.hold(conferenceData.sessionId);
        return;
      }

      if (conferenceData && isConferenceOnhold) {
        /**
         * because session termination operation in conferenceCall._mergeToConference,
         * need to wait for webphone.getActiveSessionIdReducer to update
         */
        webphone.resume(conferenceData.sessionId);
      }
    },
    onBackButtonClick() {
      routerInteraction.goBack();
    },
    onAdd() {
      routerInteraction.push(`/conferenceCall/dialer/${params.fromNumber}`);
    },
    getAvatarUrl,
  };
}

const CallsOnholdPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(CallsOnholdPanel));

export default CallsOnholdPage;
