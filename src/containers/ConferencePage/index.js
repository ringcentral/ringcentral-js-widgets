import { connect } from 'react-redux';
import ConferencePanel from '../../components/ConferencePanel';
import withPhone from '../../lib/withPhone';
import i18n from './i18n';

function mapToProps(_, {
  phone: {
    conference,
    regionSettings,
    locale: {
      currentLocale,
      ready: localReady
    },
    composeText,
    extensionInfo: { serviceFeatures },
    brand
  },
}) {
  const { data } = conference;
  const { hostCode, participantCode, allowJoinBeforeHost } = data;
  const dialInNumbers = data.phoneNumbers.map((p) => {
    const _region = i18n.getString(`conference_${p.country.isoCode}`, currentLocale);
    // only show the provinces of canada
    return {
      region: p.location && p.country.isoCode === 'CA'
        ? `${_region}, ${p.location}`
        : _region,
      phoneNumber: p.phoneNumber
    };
  });
  const disableTxtBtn = !serviceFeatures.SMS.enabled && !serviceFeatures.Pager.enabled;
  return {
    dialInNumbers,
    dialInNumber: conference.dialInNumber,
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
      localReady &&
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
    alert: (msg) => {
      alert.warning({ message: msg });
    },
    updateDialInNumber: (dialInNumber) => {
      conference.updateDialInNumber(dialInNumber);
    },
    updateAdditionalNumbers: (additionalDialInNumbers) => {
      conference.updateAdditionalNumbers(additionalDialInNumbers);
    },
    inviteWithText: (text) => {
      composeText.updateMessageText(text);
      // for track
      conference.onInviteWithText();
      routerInteraction.push('/composeText');
    },
    joinAsHost: (phoneNumber) => {
      // for track
      conference.onJoinAsHost();
      routerInteraction.history.push('/dialer');
      call.call({ phoneNumber });
    },
    onAllowJoinBeforeHostChange: (allowJoinBeforeHost) => {
      conference.updateEnableJoinBeforeHost(allowJoinBeforeHost);
    },
    showHelpCommands: () => {
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
