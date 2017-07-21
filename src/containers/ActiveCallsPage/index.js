import { connect } from 'react-redux';
import ActiveCallsPanel from '../../components/ActiveCallsPanel';

function mapToProps(_, {
  callMonitor,
  locale,
}) {
  return {
    currentLocale: locale.currentLocale,
    calls: callMonitor.calls,
  };
}

function mapToFunctions(_, {
  webphone,
}) {
  return {
    webphoneAnswer: (...args) => (webphone && webphone.answer(...args)),
    webphoneReject: (...args) => (webphone && webphone.reject(...args)),
    webphoneHangup: (...args) => (webphone && webphone.hangup(...args)),
    webphoneResume: (...args) => (webphone && webphone.resume(...args)),
  };
}

const ActiveCallsPage = connect(mapToProps, mapToFunctions)(ActiveCallsPanel);

export default ActiveCallsPage;
