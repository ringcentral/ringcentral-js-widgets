import React from 'react';
import PropTypes from 'prop-types';
import calleeTypes from 'ringcentral-integration/enums/calleeTypes';

import BackButton from '../BackButton';
import BackHeader from '../BackHeader';
import i18n from './i18n';
import ParticipantItem from './ParticipantItem';
import styles from './styles.scss';

export default function ParticipantsContainer({
  participants,
  currentLocale,
  removeFunc,
  onBackButtonClick,
}) {
  const backHeader = (<BackHeader
    className={styles.header}
    onBackClick={onBackButtonClick}
    backButton={<BackButton label={i18n.getString('conferenceCall', currentLocale)} />}
  />);

  return (
    <div className={styles.root}>
      {backHeader}
      <div className={styles.participantsListContainer}>
        <div className={styles.participantsCount}>
          {`${participants.length} ${i18n.getString('participants', currentLocale)}`}
        </div>
        <div className={styles.participantsList}>
          {
          participants.map((participant) => {
            const {
              avatarUrl,
              toUserName,
              partyNumber,
              calleeType,
              id,
            } = participant;
            let detail;

            if (calleeType === calleeTypes.contacts) {
              detail = toUserName;
            } else {
              detail = partyNumber;
            }
            return (
              <ParticipantItem
                key={id}
                avatarUrl={avatarUrl}
                detail={detail}
                currentLocale={currentLocale}
                onRemove={() => removeFunc(id)}
              />
            );
          })
        }
        </div>
      </div>
    </div>
  );
}


ParticipantsContainer.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  removeFunc: PropTypes.func,
  participants: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBackButtonClick: PropTypes.func,
};

ParticipantsContainer.defaultProps = {
  removeFunc: i => i,
  onBackButtonClick: i => i,
};
