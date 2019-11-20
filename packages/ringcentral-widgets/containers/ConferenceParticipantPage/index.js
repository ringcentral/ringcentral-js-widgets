import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import sleep from 'ringcentral-integration/lib/sleep';
import formatNumber from 'ringcentral-integration/lib/formatNumber';

import withPhone from '../../lib/withPhone';
import ConferenceParticipantPanel from '../../components/ConferenceParticipantPanel';

class ConferenceParticipantContainer extends Component {
  static propTypes = {
    participants: PropTypes.array.isRequired,
    onBackButtonClick: PropTypes.func.isRequired,
    sessionCount: PropTypes.number.isRequired,
  };

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

    const { participants, onBackButtonClick, sessionCount } = this.props;

    if (
      !nextProps.participants.length &&
      nextProps.participants.length !== participants.length
    ) {
      sleep(750).then(() => {
        if (this.mounted && sessionCount) {
          onBackButtonClick();
        }
      });
    }
  }

  render() {
    return <ConferenceParticipantPanel {...this.props} />;
  }
}

function mapToProps(_, { phone: { locale, conferenceCall, webphone } }) {
  const participants = conferenceCall.partyProfiles;
  const sessionCount = (webphone.sessions && webphone.sessions.length) || 0;

  return {
    currentLocale: locale.currentLocale,
    participants,
    sessionCount,
  };
}

function mapToFunctions(
  _,
  { phone: { conferenceCall, routerInteraction, regionSettings } },
) {
  return {
    onBackButtonClick() {
      routerInteraction.goBack();
    },
    async removeFunc(id) {
      const confId =
        conferenceCall.conferences &&
        Object.keys(conferenceCall.conferences)[0];
      try {
        await conferenceCall.removeFromConference(confId, id);
        // user action track
        conferenceCall.removeParticipantClickRemoveTrack();
        return true;
      } catch (e) {
        return false;
      }
    },
    formatPhone: (phoneNumber) =>
      formatNumber({
        phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode,
      }),
    // user action track functions
    afterOnRemoveBtnClick: () =>
      conferenceCall.participantListClickHangupTrack(),
    afterOnCancel: () => conferenceCall.removeParticipantClickCancelTrack(),
  };
}

const ConferenceParticipantPage = withPhone(
  connect(
    mapToProps,
    mapToFunctions,
  )(ConferenceParticipantContainer),
);

export default ConferenceParticipantPage;
