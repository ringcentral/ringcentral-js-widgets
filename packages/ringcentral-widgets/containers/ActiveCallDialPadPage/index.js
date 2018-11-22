
import { connect } from 'react-redux';
import { find } from 'ramda';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import ActiveCallDialPad from '../../components/ActiveCallDialPad';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  phone: {
    locale: {
      currentLocale
    },
    webphone,
  },
  params: { id },
}) {
  console.log('=====id', id);
  const session = find(x => x.id === id, webphone.sessions);
  console.log('=====session', session);
  return {
    currentLocale,
    session
  };
}

function mapToFunctions(_, {
  phone: {
    routerInteraction,
    webphone,
    callMonitor
  },
  params: { sessionId, layout = 'webPhone' }
}) {
  return {
    onChange(value) {
      webphone.sendDTMF(value, sessionId);
    },
    hiddenDialPad() {
      routerInteraction.goBack();
    },
    onHangup() {
      webphone.hangup(sessionId);
      if (layout && layout === 'mergeCtrl') {
        callMonitor.mergeControlClickHangupTrack();
      }
    }
  };
}

const ActiveCallDialPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(ActiveCallDialPad));

export {
  mapToProps,
  mapToFunctions,
  ActiveCallDialPage as default,
};
