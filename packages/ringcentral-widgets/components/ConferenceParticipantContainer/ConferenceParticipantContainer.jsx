import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sleep from 'ringcentral-integration/lib/sleep';
import ConferenceParticipantPanel from '../ConferenceParticipantPanel';

// TODO: refactor ConferenceParticipantContainer and ConferenceParticipantPanel with Juno

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

  UNSAFE_componentWillReceiveProps(nextProps) {
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

export { ConferenceParticipantContainer };
