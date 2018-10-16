
import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import TransferPanel from '../../components/TransferPanel';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  phone
}) {
  const {
    locale,
    activeCallControl,
  } = phone;
  const {
    currentLocale
  } = locale;
  const {
    activeSession
  } = activeCallControl;

  return {
    currentLocale,
    searchContactList: [],
    isOnTransfer: false,
    activeSession,
    disablePage: true
  };
}

function mapToFunctions(_, {
  phone,
}) {
  const {
    regionSettings,
    routerInteraction,
    activeCallControl
  } = phone;
  return {
    onTransfer(transferNumber) {
      const sessionIdRgx = /\d+/g;
      const sessionId = routerInteraction.currentPath.match(sessionIdRgx);
      if (sessionId) {
        activeCallControl.transfer(transferNumber, sessionId[0]);
      }
    },
    toggleTransferPanel() {
      routerInteraction.push('/calls');
    },
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    }),
    searchContact: () => null
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
