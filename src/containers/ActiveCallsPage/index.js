import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';

import ActiveCallsPanel from '../../components/ActiveCallsPanel';

function mapToProps(_, {
  callMonitor,
  locale,
  regionSettings,
  rolesAndPermissions,
  brand,
  showContactDisplayPlaceholder = false,
  callLogger,
}) {
  return {
    hasCalls: (callMonitor.calls.length !== 0),
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
    showSpinner: false,
    brand: brand.fullName,
    showContactDisplayPlaceholder,
    autoLog: !!(callLogger && callLogger.autoLog),
  };
}

function mapToFunctions(_, {
  webphone,
  regionSettings,
  composeTextRoute = '/composeText',
  callCtrlRoute = '/calls/active',
  onViewContact,
  onCreateContact,
  composeText,
  callLogger,
  onLogCall,
  contactMatcher,
  router,
  contactSearch,
  isLoggedContact,
}) {
  return {
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    }),
    webphoneAnswer: (...args) => (webphone && webphone.answer(...args)),
    webphoneReject: (...args) => (webphone && webphone.toVoiceMail(...args)),
    webphoneHangup: (...args) => (webphone && webphone.hangup(...args)),
    webphoneResume: (...args) => {
      if (!webphone) {
        return;
      }
      webphone.resume(...args);
      if (router.currentPath !== callCtrlRoute) {
        router.push(callCtrlRoute);
      }
    },
    onViewContact: onViewContact ?
      async ({ phoneNumber, contact }) => {
        const hasMatchNumber = await contactMatcher.hasMatchNumber({
          phoneNumber,
          ignoreCache: true
        });
        if (hasMatchNumber) {
          await onViewContact({ phoneNumber, contact });
        }
      } :
      undefined,
    onClickToSms: composeText ?
      async (contact, isDummyContact = false) => {
        if (router) {
          router.push(composeTextRoute);
        }
        if (contact.name && contact.phoneNumber && isDummyContact) {
          composeText.updateTypingToNumber(contact.name);
          contactSearch.search({ searchString: contact.name });
        } else {
          composeText.addToNumber(contact);
          if (composeText.typingToNumber === contact.phoneNumber) {
            composeText.cleanTypingToNumber();
          }
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
  };
}

const ActiveCallsPage = connect(mapToProps, mapToFunctions)(ActiveCallsPanel);

export default ActiveCallsPage;
