import React from 'react';

import classnames from 'classnames';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import {
  IncallBorder as InCall,
  OutcallBorder as OutCall,
} from '@ringcentral/juno/icon';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import CallAvatar from '../CallAvatar';
import styles from './styles.scss';

const callIconMap = {
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
};
const newCallIconMap = {
  [callDirections.inbound]: InCall,
  [callDirections.outbound]: OutCall,
};
type CallIconProps = {
  direction: string;
  ringing?: boolean;
  isOnConferenceCall?: boolean;
  inboundTitle?: string;
  outboundTitle?: string;
  showAvatar?: boolean;
  avatarUrl?: string;
  newCallIcon?: boolean;
};
const CallIcon: React.SFC<CallIconProps> = ({
  direction,
  ringing,
  inboundTitle,
  outboundTitle,
  isOnConferenceCall,
  showAvatar,
  avatarUrl,
  extraNum = 0,
  newCallIcon,
}) => {
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
