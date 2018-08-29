import { find, filter } from 'ramda';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callDirections from 'ringcentral-integration/enums/callDirections';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import { withPhone } from '../../lib/phoneContext';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import CallCtrlPage from './CallCtrlPage';

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
    callMonitor,
    rolesAndPermissions,
  },
  params,
  children,
  multipleLayout,
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
  let mergeDisabled = !isWebRTC || isInboundCall || !currentSession.partyData;
  let addDisabled = !isWebRTC || isInboundCall || !currentSession.partyData;

  let isOnConference = false;
  let hasConferenceCall = false;
  let isMerging = false;
  let conferenceCallParties;
  let conferenceCallId = null;
  const lastCallInfo = callMonitor.lastCallInfo;
  const conferenceCallEquipped =
    !!(conferenceCall && rolesAndPermissions.hasConferenceCallPermission);
  if (conferenceCallEquipped) {
    isOnConference = conferenceCall.isConferenceSession(currentSession.id);
    const conferenceData = Object.values(conferenceCall.conferences)[0];

    isMerging = conferenceCall.isMerging;

    if (conferenceData && isWebRTC) {
      conferenceCallId = conferenceData.conference.id;
      const overload = conferenceCall.isOverload(conferenceCallId);
      if (overload) {
        mergeDisabled = true;
        addDisabled = true;
      }
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
    addDisabled,
    mergeDisabled,
    conferenceCallEquipped,
    hasConferenceCall,
    conferenceCallParties,
    conferenceCallId,
    lastCallInfo,
    children,
    isOnConference,
    multipleLayout,
  };
}

function mapToFunctions(_, {
  phone: {
    webphone,
    regionSettings,
    contactSearch,
    conferenceCall,
    routerInteraction,
    callMonitor,
  },
  getAvatarUrl,
  onBackButtonClick,
  phoneTypeRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
  multipleLayout,
}) {
  return {
    getInitialLayout({ isOnConference, lastCallInfo, session }) {
      let layout = callCtrlLayouts.normalCtrl;

      if (!multipleLayout) {
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
    onHangup(sessionId) {
      webphone.hangup(sessionId);
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
    onTransfer: (transferNumber, sessionId) => webphone.transfer(transferNumber, sessionId),
    onPark: sessionId => webphone.park(sessionId),
    searchContact: searchString => (
      contactSearch.debouncedSearch({ searchString })
    ),
    phoneTypeRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
    onAdd(sessionId) {
      const session = find(x => x.id === sessionId, webphone.sessions);
      if (!session || webphone.isCallRecording({ session })) {
        return;
      }
      const outBoundOnholdCalls = filter(
        call => call.direction === callDirections.outbound,
        callMonitor.activeOnHoldCalls
      );
      if (outBoundOnholdCalls.length) {
        // goto 'calls on hold' page
        routerInteraction.push(`/conferenceCall/callsOnhold/${session.fromNumber}/${session.id}`);
      } else {
        if (conferenceCall) {
          conferenceCall.setMergeParty({ fromSessionId: sessionId });
        }
        // goto dialer directly
        routerInteraction.push(`/conferenceCall/dialer/${session.fromNumber}/${sessionId}`);
      }
    },
    onBeforeMerge(sessionId) {
      const session = find(x => x.id === sessionId, webphone.sessions);
      if (!session || webphone.isCallRecording({ session })) {
        return false;
      }
      if (conferenceCall) {
        const conferenceData = Object.values(conferenceCall.conferences)[0];
        if (conferenceData) {
          const conferenceSession = find(x => x.id === conferenceData.sessionId, webphone.sessions);
          if (conferenceSession && webphone.isCallRecording({ session: conferenceSession })) {
            return false;
          }
        }
      }
      return true;
    },
    async onMerge(sessionId) {
      await conferenceCall.mergeSession({ sessionId });
    },

    gotoParticipantsCtrl() {
      routerInteraction.push('/conferenceCall/participants');
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
  };
}

const CallCtrlContainer = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(CallCtrlPage));

CallCtrlContainer.propTypes = {
  getAvatarUrl: PropTypes.func,
  onBackButtonClick: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  backButtonLabel: PropTypes.string,
  children: PropTypes.node,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  multipleLayout: PropTypes.bool,
};

CallCtrlContainer.defaultProps = {
  getAvatarUrl: () => null,
  showContactDisplayPlaceholder: false,
  children: undefined,
  sourceIcons: undefined,

  /**
   * Set to true to let callctrlpage support handling multiple layouts, false by default.
   */
  multipleLayout: false,
};

export {
  mapToProps,
  mapToFunctions,
  CallCtrlPage,
  CallCtrlContainer as default,
};
