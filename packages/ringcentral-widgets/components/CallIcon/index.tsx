import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import {
  IncallBorder as InCall,
  OutcallBorder as OutCall,
  ConferenceBorder,
} from '@ringcentral/juno-icon';
import clsx from 'clsx';
import React from 'react';

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
const CallIcon: React.FC<CallIconProps> = ({
  direction,
  ringing,
  inboundTitle,
  outboundTitle,
  isOnConferenceCall,
  showAvatar,
  avatarUrl,
  // @ts-expect-error TS(2339): Property 'extraNum' does not exist on type 'PropsW... Remove this comment to see the full error message
  extraNum = 0,
  newCallIcon,
}) => {
  const title =
    direction === callDirections.inbound ? inboundTitle : outboundTitle;
  let symbol;
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const CallDirectionIco = newCallIconMap[direction || callDirections.outbound];
  if (showAvatar) {
    symbol = (
      <div className={clsx(styles.callIcon, styles.avatar)}>
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
        {isOnConferenceCall ? (
          <span data-sign="conferenceCall">
            <ConferenceBorder className={styles.activeCall} />
          </span>
        ) : (
          <span title={title} data-sign="callDirection">
            <CallDirectionIco
              className={clsx(styles.activeCall, {
                [styles.newRinging]: ringing,
              })}
            />
          </span>
        )}
      </div>
    );
  } else {
    symbol = (
      <div className={styles.callIcon}>
        <span
          className={clsx(
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  avatarUrl: null,
  newCallIcon: false,
};
export default CallIcon;
