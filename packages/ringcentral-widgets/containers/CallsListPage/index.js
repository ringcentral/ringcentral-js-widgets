import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import withPhone from '../../lib/withPhone';

import CallsListPanel from '../../components/CallsListPanel';

// TODO it is ActiveCallsPage's function is the same, and remove ActiveCallsPage after migration.

function mapToProps(_, {
  phone: {
    brand,
    callLogger,
    callMonitor,
    locale,
    regionSettings,
    rolesAndPermissions,
    callHistory,
    connectivityMonitor,
    rateLimiter,
    dateTimeFormat,
    call,
    composeText,
  },
  showContactDisplayPlaceholder = false,
  enableContactFallback = false,
}) {
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
    // showSpinner: false,
    brand: brand.fullName,
    showContactDisplayPlaceholder,
    autoLog: !!(callLogger && callLogger.autoLog),
    enableContactFallback,
    calls: callHistory.filterCalls,
    disableLinks: !connectivityMonitor.connectivity ||
    rateLimiter.throttling,
    disableClickToDial: !(call && call.isIdle),
    loggingMap: (callLogger && callLogger.loggingMap),
    showSpinner: !(
      callHistory.ready &&
      locale.ready &&
      regionSettings.ready &&
      dateTimeFormat.ready &&
      connectivityMonitor.ready &&
      (!rolesAndPermissions || rolesAndPermissions.ready) &&
      (!call || call.ready) &&
      (!composeText || composeText.ready) &&
      (!callLogger || callLogger.ready)
    ),
    readTextPermission: rolesAndPermissions.readTextPermissions,
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
    dateTimeFormat,
    call,
    dialerUI,
    callHistory,
  },
  composeTextRoute = '/composeText',
  callCtrlRoute = '/calls/active',
  onCreateContact,
  onLogCall,
  isLoggedContact,
  onViewContact,
  dateTimeFormatter = ({ utcTimestamp }) => dateTimeFormat.formatDateTime({
    utcTimestamp,
  }),
  dialerRoute = '/dialer',
}) {
  return {
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    }),
    webphoneAnswer: (...args) => (webphone && webphone.answer(...args)),
    webphoneToVoicemail: (...args) => (webphone && webphone.toVoiceMail(...args)),
    webphoneReject: (...args) => (webphone && webphone.reject(...args)),
    webphoneHangup: (...args) => (webphone && webphone.hangup(...args)),
    webphoneResume: async (...args) => {
      if (!webphone) {
        return;
      }
      await webphone.resume(...args);
      if (routerInteraction.currentPath !== callCtrlRoute) {
        routerInteraction.push(callCtrlRoute);
      }
    },
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

    dateTimeFormatter,
    onViewContact: onViewContact || (({ contact: { type, id } }) => {
      routerInteraction.push(`/contacts/${type}/${id}?direct=true`);
    }),
    onClickToDial: dialerUI ?
      (recipient) => {
        if (call.isIdle) {
          routerInteraction.push(dialerRoute);
          dialerUI.call({ recipient });
          callHistory.onClickToCall();
        }
      } :
      undefined,
    onClickToSms: composeText ?
      async (contact, isDummyContact = false) => {
        if (routerInteraction) {
          routerInteraction.push(composeTextRoute);
        }
        // if contact autocomplete, if no match fill the number only
        if (contact.name && contact.phoneNumber && isDummyContact) {
          composeText.updateTypingToNumber(contact.name);
          contactSearch.search({ searchString: contact.name });
        } else {
          composeText.addToNumber(contact);
          if (composeText.typingToNumber === contact.phoneNumber) {
            composeText.cleanTypingToNumber();
          }
        }
        callHistory.onClickToSMS();
      } :
      undefined,
  };
}

const CallsListPage = withPhone(connect(mapToProps, mapToFunctions)(CallsListPanel));

export default CallsListPage;
