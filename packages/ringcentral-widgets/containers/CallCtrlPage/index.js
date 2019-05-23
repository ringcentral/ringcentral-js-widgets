import { find, filter } from 'ramda';
import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callDirections from 'ringcentral-integration/enums/callDirections';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import { withPhone } from '../../lib/phoneContext';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import CallCtrlContainer from './CallCtrlContainer';

function mapToProps(_, {
  phone: {
    webphone,
    locale,
    contactMatcher,
    regionSettings,
    brand,
    forwardingNumber,
    contactSearch,
    conferenceCall,
    callingSettings,
    rolesAndPermissions,
  },
  params,
  children,
}) {
  const sessionId = params && params.sessionId;
  let currentSession;

  if (sessionId) {
    currentSession = webphone.sessions.find(session => session.id === sessionId) || {};
  } else {
    currentSession = webphone.activeSession || {};
  }

  const contactMapping = contactMatcher && contactMatcher.dataMapping;
  const fromMatches = (contactMapping && contactMapping[currentSession.from]) || [];
  const toMatches = (contactMapping && contactMapping[currentSession.to]) || [];
  const nameMatches =
    currentSession.direction === callDirections.outbound ? toMatches : fromMatches;

  const isWebRTC = callingSettings.callingMode === callingModes.webphone;
  const isInboundCall = currentSession.direction === callDirections.inbound;

  let isOnConference = false;
  let hasConferenceCall = false;
  let isMerging = false;
  let conferenceCallParties;
  let conferenceCallId = null;
  const lastCallInfo = conferenceCall && conferenceCall.lastCallInfo;
  let isConferenceCallOverload = false;
  const conferenceCallEquipped =
    !!(conferenceCall && rolesAndPermissions.hasConferenceCallPermission);
  if (conferenceCallEquipped) {
    isOnConference = conferenceCall.isConferenceSession(currentSession.id);
    const conferenceData = Object.values(conferenceCall.conferences)[0];

    isMerging = conferenceCall.isMerging;

    if (conferenceData && isWebRTC) {
      conferenceCallId = conferenceData.conference.id;
      isConferenceCallOverload = conferenceCall.isOverload(conferenceCallId);
    }

    hasConferenceCall = !!conferenceData;
    conferenceCallParties = conferenceCall.partyProfiles;

    const { fromSessionId } = conferenceCall.mergingPair;
    if (
      (!isInboundCall &&
        (
          fromSessionId &&
          fromSessionId !== currentSession.id &&
          lastCallInfo &&
          lastCallInfo.status &&
          lastCallInfo.status !== sessionStatus.finished
        ))
    ) {
      // for mergeCtrl page, we don't show any children (container) component.
      children = null;
    }
  }

  return {
    brand: brand.fullName,
    nameMatches,
    currentLocale: locale.currentLocale,
    session: currentSession,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    flipNumbers: forwardingNumber.flipNumbers,
    showBackButton: true, // callMonitor.calls.length > 0,
    searchContactList: contactSearch.sortedResult,
    showSpinner: isMerging,
    conferenceCallEquipped,
    hasConferenceCall,
    conferenceCallParties,
    conferenceCallId,
    lastCallInfo,
    children,
    isOnConference,
    isWebRTC,
    isConferenceCallOverload,
  };
}

function mapToFunctions(_, {
  phone: {
    webphone,
    regionSettings,
    contactSearch,
    conferenceCall,
    callingSettings,
    routerInteraction,
    callMonitor,
  },
  getAvatarUrl,
  onBackButtonClick,
  phoneTypeRenderer,
  phoneSourceNameRenderer,
}) {
  return {
    getInitialLayout({
      conferenceCallEquipped,
      isOnConference,
      lastCallInfo,
      session
    }) {
      let layout = callCtrlLayouts.normalCtrl;

      if (!conferenceCallEquipped) {
        return layout;
      }

      if (isOnConference) {
        return callCtrlLayouts.conferenceCtrl;
      }
      const isInboundCall = session.direction === callDirections.inbound;

      const { fromSessionId } = conferenceCall.mergingPair;
      const fromSession = find(x => x.id === fromSessionId, webphone.sessions);

      const activeSessionId = webphone && webphone.activeSession && webphone.activeSession.id;

      if (!isOnConference &&
        !isInboundCall &&
        (
          fromSession &&
          (fromSessionId !== session.id) &&
          lastCallInfo
        ) &&
        (
          session.callStatus !== sessionStatus.onHold ||
          (session.callStatus === sessionStatus.onHold && session.id === activeSessionId)
        )
      ) {
        // enter merge ctrl page.
        layout = callCtrlLayouts.mergeCtrl;
      }

      return layout;
    },
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    }),
    onHangup(sessionId, layout) {
      webphone.hangup(sessionId);
      if (layout && layout === callCtrlLayouts.mergeCtrl) {
        callMonitor.mergeControlClickHangupTrack();
      }
    },
    onMute: sessionId => webphone.mute(sessionId),
    onUnmute: sessionId => webphone.unmute(sessionId),
    onHold: sessionId => webphone.hold(sessionId),
    onUnhold(sessionId) {
      webphone.unhold(sessionId);
    },
    onRecord: sessionId => webphone.startRecord(sessionId),
    onStopRecord: sessionId => webphone.stopRecord(sessionId),
    sendDTMF: (value, sessionId) => webphone.sendDTMF(value, sessionId),
    updateSessionMatchedContact: (sessionId, contact) => (
      webphone.updateSessionMatchedContact(sessionId, contact)
    ),
    getAvatarUrl,
    onBackButtonClick,
    onFlip: (flipNumber, sessionId) => webphone.flip(flipNumber, sessionId),
    onTransfer(sessionId) {
      routerInteraction.push(`/transfer/${sessionId}/webphone`);
    },
    onPark: sessionId => webphone.park(sessionId),
    searchContact: searchString => (
      contactSearch.debouncedSearch({ searchString })
    ),
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    onAdd(sessionId) {
      // track user click add on call control
      callMonitor.callControlClickAddTrack();
      const session = find(x => x.id === sessionId, webphone.sessions);
      if (!session || !conferenceCall.validateCallRecording(session)) {
        return;
      }
      let fromNumber = callingSettings.fromNumber;
      if (session.direction === callDirections.outbound) {
        fromNumber = session.fromNumber; // keep the same fromNumber
      }
      const otherCalls = filter(
        call => (
          call.webphoneSession &&
          call.webphoneSession.id !== session.id
        ),
        callMonitor.allCalls
      );
      if (otherCalls.length) {
        // goto 'calls on hold' page
        routerInteraction.push(`/conferenceCall/callsOnhold/${fromNumber}/${session.id}`);
      } else {
        if (conferenceCall) {
          conferenceCall.setMergeParty({ fromSessionId: sessionId });
        }
        // goto dialer directly
        routerInteraction.push(`/conferenceCall/dialer/${fromNumber}/${sessionId}`);
      }
    },
    onBeforeMerge(sessionId) {
      const session = find(x => x.id === sessionId, webphone.sessions);
      if (!session || !conferenceCall.validateCallRecording(session)) {
        return false;
      }
      if (conferenceCall) {
        const conferenceData = Object.values(conferenceCall.conferences)[0];
        if (conferenceData) {
          const conferenceSession = find(x => x.id === conferenceData.sessionId, webphone.sessions);
          if (conferenceSession && !conferenceCall.validateCallRecording(conferenceSession)) {
            return false;
          }
        }
      }
      return true;
    },
    async onMerge(sessionId) {
      const sessions = await conferenceCall.parseMergingSessions({ sessionId });
      if (sessions) {
        await conferenceCall.mergeSessions(sessions);
      }
    },

    gotoParticipantsCtrl() {
      routerInteraction.push('/conferenceCall/participants');
      // track user click participant area on call control
      callMonitor.callControlClickParticipantAreaTrack();
    },
    loadConference(confId) {
      if (conferenceCall) {
        conferenceCall.loadConference(confId);
      }
    },
    closeMergingPair() {
      return conferenceCall && conferenceCall.closeMergingPair();
    },
    setMergeParty(...args) {
      return conferenceCall && conferenceCall.setMergeParty(...args);
    },
    // user action track functions
    afterHideMergeConfirm: () => callMonitor.confirmMergeClickCloseTrack(),
    afterConfirmMerge: () => callMonitor.confirmMergeClickMergeTrack(),
    afterOnMerge: () => callMonitor.callControlClickMergeTrack()
  };
}

const CallCtrlPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(CallCtrlContainer));

export {
  mapToProps,
  mapToFunctions,
  CallCtrlContainer,
  CallCtrlPage as default,
};
