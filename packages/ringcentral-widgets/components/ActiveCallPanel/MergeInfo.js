import React from 'react';
import PropTypes from 'prop-types';
import calleeTypes from '../../enums/calleeTypes';
import styles from './styles.scss';
import i18n from './i18n';
import CallAvatar from '../CallAvatar';

function MergeInfo({
  timeCounter,
  currentCall,
  currentLocale,
  lastTo,
}) {
  const isConference = (lastTo && lastTo.calleeType === calleeTypes.conference)
    ? i18n.getString('conferenceCall', currentLocale)
    : i18n.getString('unknow', currentLocale);
  return lastTo ? (
    <div className={styles.mergeInfo}>
      <div className={styles.merge_item}>
        <div className={styles.callee_avatar}>
          {
            (lastTo.calleeType === calleeTypes.conference)
              ? <CallAvatar
                avatarUrl={lastTo.avatarUrl}
                extraNum={lastTo.extraNum}
                isOnConferenceCall
              />
              : <CallAvatar
                avatarUrl={lastTo.avatarUrl}
              />
          }
        </div>
        <div className={styles.callee_name}>
          {
            (lastTo.calleeType === calleeTypes.contacts)
              ? lastTo.name
              : isConference
          }
        </div>
        <div className={styles.callee_status}>
          {i18n.getString('onHold', currentLocale)}
        </div>
      </div>
      <div className={styles.merge_item_active}>
        <div className={styles.callee_avatar_active} >
          {
            (!currentCall.nameMatches.length || !currentCall.avatarUrl)
              ? <CallAvatar avatarUrl={null} />
              : <CallAvatar avatarUrl={currentCall.avatarUrl} />
          }
        </div>
        <div className={styles.callee_name_active}>
          {
            currentCall.nameMatches.length
              ? currentCall.nameMatches[0].name
              : currentCall.fallBackName
          }
        </div>
        <div className={styles.callee_status_active}>
          {timeCounter}
        </div>
      </div>
    </div>
  ) : (<span />);
}

MergeInfo.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  currentCall: PropTypes.object.isRequired,
  timeCounter: PropTypes.element.isRequired,
  lastTo: PropTypes.object,
};

MergeInfo.defaultProps = {
  lastTo: {
    calleeTypes: 'unknow',
  },
};

export default MergeInfo;
