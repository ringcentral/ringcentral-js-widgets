import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import OutCall from '@ringcentral/juno/icon/OutcallBorder';
import InCall from '@ringcentral/juno/icon/IncallBorder';
import CallAvatar from '../CallAvatar';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

const callIconMap = {
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
};

const newCallIconMap = {
  [callDirections.inbound]: InCall,
  [callDirections.outbound]: OutCall,
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
  newCallIcon,
}) {
  const title =
    direction === callDirections.inbound ? inboundTitle : outboundTitle;
  let symbol;
  const CallDirectionIco = newCallIconMap[direction];
  if (showAvatar) {
    symbol = (
      <div className={classnames(styles.callIcon, styles.avatar)}>
        <CallAvatar
          isOnConferenceCall={isOnConferenceCall}
          avatarUrl={avatarUrl}
          extraNum={extraNum}
        />
      </div>
    );
  } else if (newCallIcon) {
    symbol = (
      <div className={styles.newCallIcon}>
        <span title={title} data-sign="callDirection">
          <CallDirectionIco
            className={classnames(styles.activeCall, {
              [styles.newRinging]: ringing,
            })}
          />
        </span>
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
          data-sign="callDirection"
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
  avatarUrl: PropTypes.string,
  newCallIcon: PropTypes.bool,
};

CallIcon.defaultProps = {
  ringing: false,
  isOnConferenceCall: false,
  inboundTitle: undefined,
  outboundTitle: undefined,
  showAvatar: false,
  avatarUrl: null,
  newCallIcon: false,
};

export default CallIcon;
