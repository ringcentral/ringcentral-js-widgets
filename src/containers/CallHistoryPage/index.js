import { connect } from 'react-redux';
import CallsPanel from '../../components/CallsPanel';
import i18n from './i18n';

function mapToProps(_, {
  locale,
  callHistory,
  regionSettings,
  connectivityMonitor,
  dateTimeFormat,
}) {
  return {
    title: i18n.getString('title', locale.currentLocale),
    currentLocale: locale.currentLocale,
    calls: callHistory.calls,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    disableLinks: !connectivityMonitor.connectivity,
    showSpinner: !(
      callHistory.ready &&
      locale.ready &&
      regionSettings.ready &&
      dateTimeFormat.ready &&
      connectivityMonitor.ready
    ),
  };
}
function mapToFunctions(_, {
  dateTimeFormat,
  onViewContact,
  dateTimeFormatter = utcTimestamp => dateTimeFormat.formatDateTime({
    utcTimestamp,
  }),
}) {
  return {
    dateTimeFormatter,
    onViewContact,
  };
}

const CallsPage = connect(mapToProps, mapToFunctions)(CallsPanel);

export default CallsPage;
