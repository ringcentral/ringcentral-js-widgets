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

  constructor(props) {
    super(props);
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.mounted) {
      return;
    }

    const { participants, onBackButtonClick } = this.props;

    if (!nextProps.participants.length
      && nextProps.participants.length !== participants.length) {
      sleep(500).then(() => {
        if (this.mounted) {
          onBackButtonClick();
        }
      });
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
  const participants = conferenceCall.partyProfiles;

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
  const confId = conferenceCall.conferences && Object.keys(conferenceCall.conferences)[0];

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

const ConferenceParticipantPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(ConferenceParticipantContainer));

export default ConferenceParticipantPage;
