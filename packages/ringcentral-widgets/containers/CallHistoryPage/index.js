import { connect } from 'react-redux';
import CallsPanel from '../../components/CallsPanel';
import withPhone from '../../lib/withPhone';
import i18n from './i18n';

function mapToProps(_, {
  phone: {
    locale,
    brand,
    callHistory,
    regionSettings,
    connectivityMonitor,
    rateLimiter,
    dateTimeFormat,
    callLogger,
    call,
    composeText,
    rolesAndPermissions,
  },
  enableContactFallback = false,
}) {
  return {
    enableContactFallback,
    brand: brand.fullName,
    title: i18n.getString('title', locale.currentLocale),
    currentLocale: locale.currentLocale,
    calls: callHistory.filterCalls,
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
  phone: {
    dateTimeFormat,
    callLogger,
    contactMatcher,
    call,
    dialerUI,
    composeText,
    routerInteraction,
    contactSearch,
    callHistory,
    rolesAndPermissions
  },
  onCreateContact,
  dateTimeFormatter = ({ utcTimestamp }) => dateTimeFormat.formatDateTime({
    utcTimestamp,
  }),
  onLogCall,
  isLoggedContact,
  dialerRoute = '/dialer',
  composeTextRoute = '/composeText',
  onViewContact,
}) {
  return {
    dateTimeFormatter,
    onViewContact: onViewContact || (({ contact: { type, id } }) => {
      routerInteraction.push(`/contacts/${type}/${id}?direct=true`);
    }),
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
    onClickToDial: dialerUI && rolesAndPermissions.callingEnabled ?
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

const CallsPage = withPhone(connect(mapToProps, mapToFunctions)(CallsPanel));

export default CallsPage;
