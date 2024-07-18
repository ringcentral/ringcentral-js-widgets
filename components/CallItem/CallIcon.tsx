import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import { messageDirection } from '@ringcentral-integration/commons/enums/messageDirection';
import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import clsx from 'clsx';
import React, { FunctionComponent } from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import FaxInboundIcon from '../../assets/images/FaxInbound.svg';
import FaxOutboundIcon from '../../assets/images/FaxOutbound.svg';

import styles from './styles.scss';

const callIconMap = {
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
  missed: dynamicsFont.missed,
};

type CallIconProps = {
  direction: string;
  missed?: boolean;
  active?: boolean;
  ringing?: boolean;
  inboundTitle?: string;
  outboundTitle?: string;
  missedTitle?: string;
  type?: string;
};
export const CallIcon: FunctionComponent<CallIconProps> = ({
  direction,
  missed = false,
  active = false,
  ringing = false,
  inboundTitle = '',
  outboundTitle = '',
  missedTitle = '',
  type = '',
}) => {
  let icon = null;
  switch (type) {
    case messageTypes.fax: {
      icon =
        direction === messageDirection.inbound ? (
          <span title={inboundTitle}>
            <FaxInboundIcon width={21} />
          </span>
        ) : (
          <span title={outboundTitle}>
            <FaxOutboundIcon width={21} />
          </span>
        );
      break;
    }
    default: {
      let title = null;
      if (missed) {
        title = missedTitle;
      } else if (direction === callDirections.inbound) {
        title = inboundTitle;
      } else {
        title = outboundTitle;
      }
      icon = (
        <span
          className={clsx(
            missed ? callIconMap.missed : callIconMap[direction as never],
            active && styles.activeCall,
            ringing && styles.ringing,
            missed && styles.missed,
          )}
          title={title}
          data-sign="callIcon"
        />
      );
    }
  }
  return <div className={styles.callIcon}>{icon}</div>;
};
