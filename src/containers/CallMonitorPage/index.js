import { connect } from 'react-redux';
import CallsPanel from '../../components/CallsPanel';
import i18n from './i18n';

function mapToProps(_, {
  locale,
  callMonitor,
  regionSettings,
  connectivityMonitor,
  dateTimeFormat,
  callLogger,
}) {
  return {
    active: true,
    title: i18n.getString('title', locale.currentLocale),
    currentLocale: locale.currentLocale,
    calls: callMonitor.calls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity,
    loggingMap: callLogger.loggingMap,
    showSpinner: !(
      locale.ready &&
      callMonitor.ready &&
      regionSettings.ready &&
      connectivityMonitor.ready &&
      dateTimeFormat.ready &&
      callLogger.ready
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

}) {
  return {
    dateTimeFormatter,
    onViewContact,
    isLoggedContact,
    onLogCall: onLogCall || (callLogger && (async ({ call, contact, redirect = true }) => {
      await callLogger.logCall({
        call,
        contact,
        redirect,
      });
    })),
  };
}

const CallMonitorPage = connect(mapToProps, mapToFunctions)(CallsPanel);

export default CallMonitorPage;
