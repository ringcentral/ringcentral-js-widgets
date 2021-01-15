import React, { FunctionComponent } from 'react';
import { callDirection } from 'ringcentral-integration/enums/callDirections';

import { Call } from '../CallHistoryPanel.interface';
import { CallIcon } from '../CallIcon';
import styles from './styles.scss';

export type CallHistoryItemProps = {
  call: Call;
};

export const CallHistoryItem: FunctionComponent<CallHistoryItemProps> = ({
  call,
}) => (
  <div className={styles.item}>
    <CallIcon {...call} />
    <div className={styles.info}>
      <span className={styles.name}>
        {call.direction === callDirection.outbound
          ? call.toName
          : call.fromName}
      </span>
      <span className={styles.time}>{call.callTime}</span>
    </div>
  </div>
);
