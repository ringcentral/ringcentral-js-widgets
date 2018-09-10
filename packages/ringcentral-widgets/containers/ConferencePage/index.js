import { connect } from 'react-redux';
import { reduce, map } from 'ramda';
import ConferencePanel from '../../components/ConferencePanel';
import countryNames from '../../lib/countryNames';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  phone: {
    conference,
    regionSettings,
    locale: {
      currentLocale,
      ready: localeReady
    },
    composeText,
    extensionInfo: { serviceFeatures },
    brand
  },
}) {
  const {
    hostCode = '',
    participantCode = '',
    allowJoinBeforeHost = false,
    phoneNumbers = [],
  } = conference.data || {};
  const countryCounter = reduce((acc, item) => {
    if (!acc[item.country.isoCode]) {
      acc[item.country.isoCode] = 1;
    } else {
      acc[item.country.isoCode] += 1;
    }
    return acc;
  }, {}, phoneNumbers);
  const dialInNumbers = map((item) => {
    const countryName = countryNames.getString(item.country.isoCode, currentLocale);
    // only show the provinces of canada
    return {
      region: countryCounter[item.country.isoCode] > 1 ?
        `${countryName}, ${item.location}` :
        countryName,
      phoneNumber: item.phoneNumber
    };
  }, phoneNumbers);
  const disableTxtBtn = (
    (!serviceFeatures.SMS || !serviceFeatures.SMS.enabled) &&
    (!serviceFeatures.Pager || !serviceFeatures.Pager.enabled)
  );
  return {
    dialInNumbers,
    dialInNumber: conference.dialInNumber || '',
    hostCode,
    participantCode,
    allowJoinBeforeHost,
    additionalNumbers: conference.additionalNumbers,
    disableTxtBtn,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale,
    brand: {
      code: brand.code,
      name: brand.name
    },
    showSpinner: !(
      conference.ready &&
      regionSettings.ready &&
      localeReady &&
      composeText.ready
    ),
  };
}

function mapToFunctions(_, {
  phone: {
    conference,
    composeText,
    routerInteraction,
    call,
    alert
  },
}) {
  return {
    alert(msg) {
      alert.warning({ message: msg });
    },
    updateDialInNumber(dialInNumber) {
      conference.updateDialInNumber(dialInNumber);
    },
    updateAdditionalNumbers(additionalDialInNumbers) {
      conference.updateAdditionalNumbers(additionalDialInNumbers);
    },
    inviteWithText(text) {
      composeText.updateMessageText(text);
      // for track
      conference.onInviteWithText();
      routerInteraction.push('/composeText');
    },
    joinAsHost(phoneNumber) {
      // for track
      conference.onJoinAsHost();
      routerInteraction.history.push('/dialer');
      call.call({ phoneNumber });
    },
    onAllowJoinBeforeHostChange(allowJoinBeforeHost) {
      conference.updateEnableJoinBeforeHost(allowJoinBeforeHost);
    },
    showHelpCommands() {
      routerInteraction.push('/conference/commands');
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
