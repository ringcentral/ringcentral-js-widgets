import { connect } from 'react-redux';
import CallsPanel from '../../components/CallsPanel';
import i18n from './i18n';

function mapToProps(_, {
  locale,
  callHistory,
  regionSettings,
  connectivityMonitor,
  dateTimeFormat,
  callLogger,
  call,
}) {
  return {
    title: i18n.getString('title', locale.currentLocale),
    currentLocale: locale.currentLocale,
    calls: callHistory.calls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity,
    disableClickToDial: !(call && call.isIdle),
    loggingMap: (callLogger && callLogger.loggingMap),
    showSpinner: !(
      callHistory.ready &&
      locale.ready &&
      regionSettings.ready &&
      dateTimeFormat.ready &&
      connectivityMonitor.ready &&
      (!callLogger || callLogger.ready)
    ),
  };
}
function mapToFunctions(_, {
  dateTimeFormat,
  onViewContact,
  dateTimeFormatter = utcTimestamp => dateTimeFormat.formatDateTime({
    utcTimestamp,
  }),
  callLogger,
  onLogCall,
  isLoggedContact,
  call,
  composeText,
  router,
  dialerRoute = '/',
  composeTextRoute = '/composeText',
}) {
  return {
    dateTimeFormatter,
    onViewContact,
    onClickToDial: call ?
      (phoneNumber) => {
        if (call.isIdle) {
          router.history.push(dialerRoute);
          call.onToNumberChange(phoneNumber);
          call.onCall();
        }
      } :
      undefined,
    onClickToSms: composeText ?
      async (contact) => {
        if (router) {
          router.history.push(composeTextRoute);
        }
        composeText.addToNumber(contact);
        if (composeText.typingToNumber === contact.phoneNumber) {
          composeText.cleanTypingToNumber();
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
