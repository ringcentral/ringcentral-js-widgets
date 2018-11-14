import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../elements/Avatar';
import Icon from '../../../elements/Icon';
import styles from './styles.scss';

function CallItem({
  avatarUrl,
  userName,
  isOnline,
  isConference,
  converenceNumber,
  showEndCall,
  onEndCall,
  showAnswerCall,
  onAnswerCall,
  showMergeCall,
  onMergeCall,
  showExtraInfo,
  extraInfo
}) {
  function OperationBar() {
    const Operations = [];
    if (showExtraInfo) {
      return null;
    }
    if (showAnswerCall) {
      Operations.push(
        <span className={styles.iconWrapper}><Icon.Answer onClick={onAnswerCall} /></span>
      );
    }
    if (showEndCall) {
      Operations.push(
        <span className={styles.iconWrapper}><Icon.End onClick={onEndCall} /></span>
      );
    }
    if (showMergeCall) {
      Operations.push(
        <span className={styles.iconWrapper}><Icon.Merge onClick={onMergeCall} /></span>
      );
    }
    return (
      <div className={styles.operationBar}>
        {Operations}
      </div>
    );
  }

  function ExtraInfo() {
    if (!showExtraInfo) {
      return null;
    }
    return <div className={styles.extraInfo}>{extraInfo}</div>;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <Avatar
          isOnConferenceCall={isConference}
          avatarUrl={avatarUrl}
          extraNum={converenceNumber}
          isOnline={isOnline}
        />
      </div>
      <div className={styles.username}>{userName}</div>
      <OperationBar />
      <ExtraInfo />
    </div>
  );
}


CallItem.propTypes = {
  avatarUrl: PropTypes.string,
  userName: PropTypes.string,
  isOnline: PropTypes.bool,
  isConference: PropTypes.bool,
  converenceNumber: PropTypes.number,
  showEndCall: PropTypes.bool,
  onEndCall: PropTypes.func,
  showAnswerCall: PropTypes.bool,
  onAnswerCall: PropTypes.func,
  showMergeCall: PropTypes.bool,
  onMergeCall: PropTypes.func,
  showExtraInfo: PropTypes.bool,
  extraInfo: PropTypes.string,
};

CallItem.defaultProps = {
  avatarUrl: '',
  userName: '',
  isOnline: false,
  isConference: false,
  converenceNumber: 0,
  showEndCall: false,
  onEndCall() {},
  showAnswerCall: false,
  onAnswerCall() {},
  showMergeCall: false,
  onMergeCall() {},
  showExtraInfo: false,
  extraInfo: ''
};

export default CallItem;
