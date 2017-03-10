import { connect } from 'react-redux';
import { PropTypes } from 'react';

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
}) {
  return {
    conferenceNumbers: conference.conferenceNumbers,
    countryCode: regionSettings.countryCode,
    areaCode: regionSettings.areaCode,
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(_, {
  composeText,
  router
}) {
  return {
    inviteWithText: (text) => {
      composeText.updateMessageText(text);
      router.history.push('/composeText');
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
  router: PropTypes.instanceOf(RouterInteraction),
};

ConferencePage.propTypes = propTypes;

export {
  mapToFunctions,
  mapToProps,
  propTypes,
  ConferencePage as default,
};
