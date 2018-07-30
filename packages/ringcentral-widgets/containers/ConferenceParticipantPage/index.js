import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import sleep from 'ringcentral-integration/lib/sleep';

import withPhone from '../../lib/withPhone';
import ConferenceParticipantPanel from '../../components/ConferenceParticipantPanel';


class ConferenceParticipantContainer extends Component {
  static propTypes={
    participants: PropTypes.array.isRequired,
    onBackButtonClick: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { participants, onBackButtonClick } = this.props;
    if (!participants.length) {
      sleep(500).then(onBackButtonClick);
    }
  }

  render() {
    return <ConferenceParticipantPanel {...this.props} />;
  }
}


function mapToProps(_, {
  phone: {
    locale,
    conferenceCall,
  },
}) {
  const confId = conferenceCall.conferences && Object.keys(conferenceCall.conferences)[0];
  let participants = [];

  if (confId) {
    participants = conferenceCall.getOnlinePartyProfiles(confId);
  }

  return {
    currentLocale: locale.currentLocale,
    participants,
  };
}

function mapToFunctions(_, {
  phone: {
    conferenceCall,
    routerInteraction,
  },
}) {
  const confId = conferenceCall.conferences && Object.keys(conferenceCall)[0];

  return {
    onBackButtonClick: () => routerInteraction.push('/calls/active'),
    async removeFunc(id) {
      try {
        await conferenceCall.removeFromConference(confId, id);
        return true;
      } catch (e) {
        return false;
      }
    }
  };
}

const CallsOnholdPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(ConferenceParticipantContainer));

export default CallsOnholdPage;
