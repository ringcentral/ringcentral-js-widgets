
import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import TransferPanel from '../../components/TransferPanel';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  phone: {
    locale,
    activeCallControl,
    webphone,
    contactSearch,
  },
  params: { sessionId, type = 'active' }
}) {
  let session = null;
  if (type === 'active' && activeCallControl) {
    session = activeCallControl.activeSession;
  } else if (type === 'webphone' && webphone) {
    session = webphone.sessions.find(session => session.id === sessionId);
  }

  return {
    sessionId,
    currentLocale: locale.currentLocale,
    searchContactList: contactSearch && contactSearch.sortedResult,
    session,
    controlBusy: activeCallControl && activeCallControl.busy || false,
  };
}

function mapToFunctions(_, {
  phone: {
    regionSettings,
    routerInteraction,
    activeCallControl,
    webphone,
    contactSearch,
  },
  params: { type = 'active' },
  phoneSourceNameRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
  phoneTypeRenderer,
}) {
  return {
    setActiveSessionId(sessionId) {
      if (type === 'active' && activeCallControl) {
        activeCallControl.setActiveSessionId(sessionId);
      }
    },
    onTransfer(transferNumber, sessionId) {
      if (type === 'active' && activeCallControl) {
        activeCallControl.transfer(transferNumber, sessionId);
      } else if (type === 'webphone' && webphone) {
        webphone.transfer(transferNumber, sessionId);
      }
    },
    onBack() {
      routerInteraction.goBack();
    },
    onCallEnd() {
      if (type === 'active') {
        routerInteraction.replace('/calls');
      } else {
        routerInteraction.replace('/dialer');
      }
    },
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    }),
    searchContact(searchString) {
      if (contactSearch) {
        contactSearch.debouncedSearch({ searchString });
      }
    },
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
  };
}

const TransferPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(TransferPanel));

export {
  mapToProps,
  mapToFunctions,
  TransferPage as default,
};
