import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import withPhone from '../../lib/withPhone';
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
}) {
  const isWebRTC = callingSettings.callingMode === callingModes.webphone;
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
      return (webphone && webphone.hangup(...args));
    },
    async webphoneResume(...args) {
      return (webphone && webphone.resume(...args));
    },
    async webphoneHold(...args) {
      return (webphone && webphone.hold(...args));
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
      if (call.webphoneSession && call.webphoneSession.id) {
        routerInteraction.push(`${callCtrlRoute}/${call.webphoneSession.id}`);
      }
    },
    getAvatarUrl,
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
