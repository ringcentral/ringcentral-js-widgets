import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import calleeTypes from 'ringcentral-integration/enums/calleeTypes';
import styles from './styles.scss';
import i18n from './i18n';
import CallAvatar from '../CallAvatar';

function MergeInfo(props) {
  const {
    currentLocale,
    timeCounter,
    lastCallInfo,
    currentCallTitle,
    currentCallAvatarUrl,
    formatPhone,
  } = props;

  const isLastCallEnded = lastCallInfo && lastCallInfo.status === sessionStatus.finished;
  const statusClasses = classnames({
    [styles.callee_status]: true,
    [styles.callee_status_disconnected]: !!isLastCallEnded,
  });

  const isOnConferenCall = !!(
    lastCallInfo && lastCallInfo.calleeType === calleeTypes.conference
  );
  const isContacts = !!(
    lastCallInfo && lastCallInfo.calleeType === calleeTypes.contacts
  );

  return lastCallInfo ? (
    <div className={styles.mergeInfo}>
      <div className={styles.merge_item}>
        <div className={styles.callee_avatar}>
          <CallAvatar
            avatarUrl={lastCallInfo.avatarUrl}
            extraNum={isOnConferenCall ? lastCallInfo.extraNum : 0}
            isOnConferenceCall={isOnConferenCall}
            />
        </div>
        <div className={styles.callee_name}>
          {
            isOnConferenCall
            ? i18n.getString('conferenceCall', currentLocale)
            : isContacts ? lastCallInfo.name : formatPhone(lastCallInfo.phoneNumber)
          }
        </div>
        <div className={statusClasses}>
          {lastCallInfo.status === sessionStatus.finished
              ? i18n.getString('disconnected', currentLocale)
              : i18n.getString('onHold', currentLocale)}
        </div>
      </div>
      <div className={styles.merge_item_active}>
        <div className={styles.callee_avatar_active} >
          {
              currentCallAvatarUrl
                ? <CallAvatar avatarUrl={currentCallAvatarUrl} />
                : <CallAvatar avatarUrl={null} />
            }
        </div>
        <div className={styles.callee_name_active}>
          {currentCallTitle}
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
  timeCounter: PropTypes.element.isRequired,
  lastCallInfo: PropTypes.object,
  currentCallTitle: PropTypes.string,
  currentCallAvatarUrl: PropTypes.string,
  formatPhone: PropTypes.func,
};

MergeInfo.defaultProps = {
  lastCallInfo: { calleeType: calleeTypes.unknow },
  currentCallTitle: undefined,
  currentCallAvatarUrl: undefined,
  formatPhone: () => null,
};

export default MergeInfo;
