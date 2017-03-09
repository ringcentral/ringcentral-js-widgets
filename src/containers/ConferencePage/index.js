import { connect } from 'react-redux';
import { PropTypes } from 'react';

import Locale from 'ringcentral-integration/modules/Locale';
import Conference from 'ringcentral-integration/modules/Conference';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import ComposeText from 'ringcentral-integration/modules/ComposeText';

import ConferencePanel from '../../components/ConferencePanel';

function mapToProps(_, {
    conference,
    regionSettings,
    locale,
}) {
  return {
    conferenceNumbers: conference.conferenceNumbers,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(_, {
    composeText
}) {
  return {
    inviteWithText: (text) => {
      composeText.updateMessageText(text);
    },
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
  conferenceNumbers: PropTypes.object,
};

ConferencePage.propTypes = propTypes;

export {
    mapToFunctions,
    mapToProps,
    propTypes,
    ConferencePage as default,
};
