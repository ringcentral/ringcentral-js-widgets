import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import formatNumber from 'ringcentral-integration/lib/formatNumber';
import Locale from 'ringcentral-integration/modules/Locale';
import Conference from 'ringcentral-integration/modules/Conference';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import ComposeText from 'ringcentral-integration/modules/ComposeText';

import RouterInteraction from '../../modules/RouterInteraction';

import ConferencePanel from '../../components/ConferencePanel';

function mapToProps(_, {
  conference,
  regionSettings,
  locale,
  composeText,
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
  composeText,
  router
}) {
  return {
    inviteWithText: (text) => {
      composeText.updateMessageText(text);
      router.push('/composeText');
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


const ConferencePage = connect(
  mapToProps,
  mapToFunctions,
)(ConferencePanel);

const propTypes = {
  conference: PropTypes.instanceOf(Conference),
  regionSettings: PropTypes.instanceOf(RegionSettings),
  locale: PropTypes.instanceOf(Locale),
  composeText: PropTypes.instanceOf(ComposeText),
  router: PropTypes.instanceOf(RouterInteraction),
};

ConferencePage.propTypes = propTypes;

export {
  mapToFunctions,
  mapToProps,
  propTypes,
  ConferencePage as default,
};
