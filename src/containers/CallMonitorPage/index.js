import { connect } from 'react-redux';
import CallsPanel from '../../components/CallsPanel';
import i18n from './i18n';

function mapToProps(_, {
  locale,
  callMonitor,
  regionSettings,
  connectivityMonitor,
  rateLimiter,
  dateTimeFormat,
  callLogger,
  composeText,
  rolesAndPermissions,
  enableContactFallback = false,
  defaultContact,
}) {
  return {
    enableContactFallback,
    defaultContact,
    active: true,
    title: i18n.getString('title', locale.currentLocale),
    currentLocale: locale.currentLocale,
    calls: callMonitor.calls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity ||
      rateLimiter.throttling,
    outboundSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.OutboundSMS
    ),
    internalSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.InternalSMS
    ),
    loggingMap: (callLogger && callLogger.loggingMap),
    showSpinner: !(
      locale.ready &&
      callMonitor.ready &&
      regionSettings.ready &&
      connectivityMonitor.ready &&
      dateTimeFormat.ready &&
      (!callLogger || callLogger.ready) &&
      (!rolesAndPermissions || rolesAndPermissions.ready) &&
      (!composeText || composeText.ready)
    ),
  };
}
function mapToFunctions(_, {
  dateTimeFormat,
  onViewContact,
  onCreateContact,
  dateTimeFormatter = ({ utcTimestamp }) => dateTimeFormat.formatDateTime({
    utcTimestamp,
  }),
  callLogger,
  contactMatcher,
  contactSearch,
  onLogCall,
  isLoggedContact,
  router,
  composeTextRoute = '/composeText',
  composeText,
  webphone,
}) {
  return {
    dateTimeFormatter,
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
    onClickToSms: composeText ?
      async (contact, isDummyContact = false) => {
        if (router) {
          router.history.push(composeTextRoute);
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
    webphoneAnswer: (webphone && webphone.answer),
    webphoneReject: (webphone && webphone.reject),
    webphoneHangup: (webphone && webphone.hangup),
    webphoneResume: (webphone && webphone.resume),
  };
}

const CallMonitorPage = connect(mapToProps, mapToFunctions)(CallsPanel);

export default CallMonitorPage;
