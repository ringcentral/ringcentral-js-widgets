import React, { Component } from 'react';
import PropTypes from 'prop-types';
import calleeTypes from '@ringcentral-integration/commons/enums/calleeTypes';

import BackButton from '../BackButton';
import BackHeader from '../BackHeader';
import ConfirmRemoveModal from './ConfirmRemoveModal';
import i18n from './i18n';
import ParticipantItem from './ParticipantItem';
import styles from './styles.scss';

class ParticipantsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      detail: null,
    };
    this.formatPrticipants(props);
    this.onRemoveBtnClick = this.onRemoveBtnClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCancelNoAfter = this.onCancelNoAfter.bind(this);
  }

  formatPrticipants(props = this.props) {
    const { participants, formatPhone } = props;

    participants.map((participant) => {
      participant.partyNumber = formatPhone(participant.partyNumber);
      return participant;
    });
  }

  onRemoveBtnClick(participant) {
    this.setState(() => ({
      detail: participant,
      showModal: true,
    }));
    this.props.afterOnRemoveBtnClick();
  }

  onCancel() {
    this.onCancelNoAfter();
    this.props.afterOnCancel();
  }

  // onCancel without track
  onCancelNoAfter() {
    this.setState({
      showModal: false,
      detail: null,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.formatPrticipants(nextProps);
    if (
      this.state.showModal &&
      !nextProps.participants.find(
        (participant) => participant.id === this.state.detail.id,
      )
    ) {
      this.onCancelNoAfter();
    }
  }

  render() {
    const {
      participants,
      currentLocale,
      removeFunc,
      onBackButtonClick,
    } = this.props;

    const { detail, showModal } = this.state;

    const backHeader = (
      <BackHeader
        className={styles.header}
        onBackClick={onBackButtonClick}
        backButton={
          <BackButton label={i18n.getString('conferenceCall', currentLocale)} />
        }
      />
    );

    return (
      <div className={styles.root}>
        {backHeader}
        <div className={styles.participantsListContainer}>
          <div className={styles.participantsCount}>
            {participants.length === 1
              ? `${participants.length} ${i18n.getString(
                  'participant',
                  currentLocale,
                )}`
              : `${participants.length} ${i18n.getString(
                  'participants',
                  currentLocale,
                )}`}
          </div>
          <div className={styles.participantsList}>
            {participants.map((participant) => {
              const {
                id,
                avatarUrl,
                partyName,
                partyNumber,
                calleeType,
              } = participant;
              let displayText =
                partyNumber || i18n.getString('unknownNumber', currentLocale);
              if (partyName && calleeType === calleeTypes.contacts) {
                // means that matched a contact
                displayText = partyName;
              }
              return (
                <ParticipantItem
                  key={id}
                  avatarUrl={avatarUrl}
                  detail={displayText}
                  currentLocale={currentLocale}
                  onRemove={() => this.onRemoveBtnClick(participant)}
                />
              );
            })}
          </div>
        </div>
        <ConfirmRemoveModal
          show={showModal}
          detail={detail}
          onCancel={this.onCancel}
          currentLocale={currentLocale}
          onRemove={() =>
            removeFunc(detail && detail.id).then(this.onCancelNoAfter)
          }
        />
      </div>
    );
  }
}

ParticipantsContainer.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  removeFunc: PropTypes.func,
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBackButtonClick: PropTypes.func,
  formatPhone: PropTypes.func,
  afterOnCancel: PropTypes.func,
  afterOnRemoveBtnClick: PropTypes.func,
};

ParticipantsContainer.defaultProps = {
  removeFunc: (i) => i,
  onBackButtonClick: (i) => i,
  formatPhone: (i) => i,
  afterOnCancel: (i) => i,
  afterOnRemoveBtnClick: (i) => i,
};

export default ParticipantsContainer;
