import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import callDirections from 'ringcentral-integration/enums/callDirections';
import CallAvatar from '../CallAvatar';
import ConferenceCallIcon from '../../assets/images/ConferenceCallIcon.svg';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

const callIconMap = {
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
};

function CallIcon({
  direction,
  ringing,
  inboundTitle,
  outboundTitle,
  isOnConferenceCall,
  showAvatar,
  avatarUrl,
  extraNum = 0,
}) {
  const title = (direction === callDirections.inbound) ? inboundTitle : outboundTitle;
  let symbol;
  if (showAvatar) {
    symbol = (
      <div className={classnames(styles.callIcon, styles.avatar)}>
        <CallAvatar
          isOnConferenceCall={isOnConferenceCall}
          avatarUrl={avatarUrl}
          extraNum={extraNum} />
      </div>
    );
  } else {
    symbol = (
      <div className={styles.callIcon}>
        <span
          className={classnames(
            callIconMap[direction],
            styles.activeCall,
            ringing && styles.ringing,
          )}
          title={title}
        />
      </div>
    );
  }
  return symbol;
}

CallIcon.propTypes = {
  direction: PropTypes.string.isRequired,
  ringing: PropTypes.bool,
  isOnConferenceCall: PropTypes.bool,
  inboundTitle: PropTypes.string,
  outboundTitle: PropTypes.string,
  showAvatar: PropTypes.bool,
  avatarUrl: PropTypes.string
};

CallIcon.defaultProps = {
  ringing: false,
  isOnConferenceCall: false,
  inboundTitle: undefined,
  outboundTitle: undefined,
  showAvatar: false,
  avatarUrl: null,
};

export default CallIcon;
