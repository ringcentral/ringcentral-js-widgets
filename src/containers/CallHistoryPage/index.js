import { connect } from 'react-redux';
import CallsPanel from '../../components/CallsPanel';
import i18n from './i18n';

function mapToProps(_, {
  locale,
  callHistory,
  regionSettings,
  connectivityMonitor,
  rateLimiter,
  dateTimeFormat,
  callLogger,
  call,
  composeText,
  rolesAndPermissions,
  enableContactFallback = false,
}) {
  return {
    enableContactFallback,
    title: i18n.getString('title', locale.currentLocale),
    currentLocale: locale.currentLocale,
    calls: callHistory.calls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity ||
      rateLimiter.throttling,
    disableClickToDial: !(call && call.isIdle),
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
    autoLog: !!(callLogger && callLogger.autoLog),
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
  onLogCall,
  isLoggedContact,
  call,
  composeText,
  router,
  dialerRoute = '/',
  composeTextRoute = '/composeText',
  contactSearch,
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
        // console.debug('confirm hasMatchNumber:', hasMatchNumber);
        if (!hasMatchNumber) {
          await onCreateContact({ phoneNumber, name, entityType });
          await contactMatcher.forceMatchNumber({ phoneNumber });
        }
      } :
      undefined,
    onClickToDial: call ?
      (phoneNumber) => {
        if (call.isIdle) {
          router.push(dialerRoute);
          call.onToNumberChange(phoneNumber);
          call.onCall();
        }
      } :
      undefined,
    onClickToSms: composeText ?
      async (contact, isDummyContact = false) => {
        if (router) {
          router.push(composeTextRoute);
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

const CallsPage = connect(mapToProps, mapToFunctions)(CallsPanel);

export default CallsPage;
