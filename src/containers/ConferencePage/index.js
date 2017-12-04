import { connect } from 'react-redux';
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
  const { data } = conference;
  const { hostCode, participantCode } = data;
  const dialInNumbers = [];
  for (const p of data.phoneNumbers) {
    dialInNumbers.push({
      region: p.country.name,
      phoneNumber: p.phoneNumber
    });
  }
  return {
    dialInNumbers,
    dialInNumber: conference.dialInNumber,
    hostCode,
    participantCode,
    additionalNumbers: conference.additionalNumbers,
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
    conference,
    composeText,
    routerInteraction,
  },
}) {
  return {
    updateDialInNumber: (dialInNumber) => {
      conference.updateDialInNumber(dialInNumber);
    },
    updateAdditionalNumbers: (additionalDialInNumbers) => {
      conference.updateAdditionalNumbers(additionalDialInNumbers);
    },
    inviteWithText: (text) => {
      composeText.updateMessageText(text);
      routerInteraction.push('/composeText');
    }
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
