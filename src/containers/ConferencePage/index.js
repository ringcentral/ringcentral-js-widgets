import { connect } from 'react-redux';

import formatNumber from 'ringcentral-integration/lib/formatNumber';

import ConferencePanel from '../../components/ConferencePanel';
import withPhone from '../../lib/withPhone';

function mapToProps(_, {
  phone: {
    conference,
    regionSettings,
    locale,
    composeText,
  },
}) {
  return {
    conferenceNumbers: conference.conferenceNumbers,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: locale.currentLocale,
    showSpinner: !(
      conference.ready &&
      regionSettings.ready &&
      locale.ready &&
      composeText.ready
    ),
  };
}

function mapToFunctions(_, {
  phone: {
    composeText,
    routerInteraction,
  },
}) {
  return {
    inviteWithText: (text) => {
      composeText.updateMessageText(text);
      routerInteraction.push('/composeText');
    },
    formatInternational: (phoneNumber, callingCode) => {
      if (phoneNumber.indexOf(callingCode === 1)) {
        return `+${callingCode} ${phoneNumber.replace('+', '').replace(callingCode, '')}`;
      }
      return phoneNumber;
    },
    formatPin: (number) => {
      if (!number) {
        return '';
      }
      return number.replace(/(\d{3})/g, '$1-').replace(/-$/, '');
    },
    formatPhone: (phoneNumber, countryCode, areaCode) => formatNumber({
      phoneNumber,
      countryCode,
      areaCode: areaCode || '',
    })
  };
}


const ConferencePage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(ConferencePanel));


export {
  mapToFunctions,
  mapToProps,
  ConferencePage as default,
};
