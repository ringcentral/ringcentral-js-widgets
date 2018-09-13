import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import { isRinging } from 'ringcentral-integration/lib/callLogHelpers';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import { withPhone } from '../../lib/phoneContext';

import ActiveCallsPanel from '../../components/ActiveCallsPanel';

function mapToProps(_, {
  phone: {
    brand,
    callLogger,
    callMonitor,
    locale,
    regionSettings,
    rolesAndPermissions,
    conferenceCall,
    callingSettings,
    connectivityMonitor,
    rateLimiter,
  },
  showContactDisplayPlaceholder = false,
  useV2,
}) {
  const isWebRTC = callingSettings.callingMode === callingModes.webphone;

  return {
    currentLocale: locale.currentLocale,
    activeRingCalls: callMonitor.activeRingCalls,
    activeOnHoldCalls: callMonitor.activeOnHoldCalls,
    activeCurrentCalls: callMonitor.activeCurrentCalls,
    otherDeviceCalls: callMonitor.otherDeviceCalls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    outboundSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.OutboundSMS
    ),
    internalSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.InternalSMS
    ),
    showSpinner: !!(conferenceCall && conferenceCall.isMerging),
    brand: brand.fullName,
    showContactDisplayPlaceholder,
    autoLog: !!(callLogger && callLogger.autoLog),
    isWebRTC,
    conferenceCallParties: conferenceCall ? conferenceCall.partyProfiles : null,
    useV2,
    disableLinks: !connectivityMonitor.connectivity ||
    rateLimiter.throttling,
  };
}

function mapToFunctions(_, {
  phone: {
    callLogger,
    composeText,
    contactMatcher,
    contactSearch,
    regionSettings,
    routerInteraction,
    webphone,
    callingSettings,
    conferenceCall,
    callMonitor,
    activeCallControl,
  },
  composeTextRoute = '/composeText',
  callCtrlRoute = '/calls/active',
  onCreateContact,
  onLogCall,
  isLoggedContact,
  onCallsEmpty,
  onViewContact,
  showViewContact = true,
  getAvatarUrl,
  useV2,
}) {
  return {
    formatPhone(phoneNumber) {
      return formatNumber({
        phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
      });
    },
    async webphoneAnswer(...args) {
      return (webphone && webphone.answer(...args));
    },
    async webphoneToVoicemail(...args) {
      return (webphone && webphone.toVoiceMail(...args));
    },
    async webphoneReject(...args) {
      return (webphone && webphone.reject(...args));
    },
    async webphoneHangup(...args) {
      // user action track
      callMonitor.allCallsClickHangupTrack();
      return (webphone && webphone.hangup(...args));
    },
    async webphoneResume(...args) {
      if (!webphone) {
        return;
      }
      await webphone.resume(...args);
      if (routerInteraction.currentPath !== callCtrlRoute && !useV2) {
        routerInteraction.push(callCtrlRoute);
      }
    },
    async webphoneHold(...args) {
      // user action track
      callMonitor.allCallsClickHoldTrack();
      return (webphone && webphone.hold(...args));
    },
    async ringoutHangup(...args) {
      // user action track
      callMonitor.allCallsClickHangupTrack();
      return (activeCallControl && activeCallControl.hangUp(...args));
    },
    async ringoutTransfer(...args) {
      // TODO: Display the ringout call transfer page.
    },
    onViewContact: showViewContact ?
      (onViewContact || (({ contact }) => {
        const { id, type } = contact;
        routerInteraction.push(`/contacts/${type}/${id}?direct=true`);
      })) : null,
    onClickToSms: composeText ?
      async (contact, isDummyContact = false) => {
        if (routerInteraction) {
          routerInteraction.push(composeTextRoute);
        }
        composeText.clean();
        if (contact.name && contact.phoneNumber && isDummyContact) {
          composeText.updateTypingToNumber(contact.name);
          contactSearch.search({ searchString: contact.name });
        } else {
          composeText.addToRecipients(contact);
        }
      } :
      undefined,
    onCreateContact: onCreateContact ?
      async ({ phoneNumber, name, entityType }) => {
        const hasMatchNumber = await contactMatcher.hasMatchNumber({
          phoneNumber,
          ignoreCache: true
        });
        if (!hasMatchNumber) {
          await onCreateContact({ phoneNumber, name, entityType });
          await contactMatcher.forceMatchNumber({ phoneNumber });
        }
      } :
      undefined,
    isLoggedContact,
    onLogCall: onLogCall ||
      (callLogger && (async ({ call, contact, redirect = true }) => {
        await callLogger.logCall({
          call,
          contact,
          redirect,
        });
      })),
    onCallsEmpty: onCallsEmpty || (() => {
      const isWebRTC = callingSettings.callingMode === callingModes.webphone;

      if (isWebRTC && !webphone.sessions.length) {
        routerInteraction.push('/dialer');
      }
    }),
    isSessionAConferenceCall(sessionId) {
      return !!(
        conferenceCall
        && conferenceCall.isConferenceSession(sessionId)
      );
    },
    onCallItemClick(call) {
      // TODO: Display the  ctrl page.
      if (!call.webphoneSession) {
        // For ringout call
        const { sessionId } = call;
        // to track the call item be clicked.
        callMonitor.callItemClickTrack();
        activeCallControl.setActiveSessionId(sessionId);
      } else {
        // For webphone call
        // show the ring call modal when click a ringing call.
        if (isRinging(call)) {
          webphone.toggleMinimized(call.webphoneSession.id);
          return;
        }
        if (call.webphoneSession && call.webphoneSession.id) {
          // to track the call item be clicked.
          callMonitor.callItemClickTrack();
          routerInteraction.push(`${callCtrlRoute}/${call.webphoneSession.id}`);
        }
      }
    },
    getAvatarUrl,
    updateSessionMatchedContact: (sessionId, contact) => (
      webphone.updateSessionMatchedContact(sessionId, contact)
    ),
  };
}

const ActiveCallsPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(ActiveCallsPanel));

export {
  mapToProps,
  mapToFunctions,
  ActiveCallsPage as default,
};
