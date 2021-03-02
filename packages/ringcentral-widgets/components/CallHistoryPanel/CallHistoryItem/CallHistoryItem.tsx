import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { callDirection } from 'ringcentral-integration/enums/callDirections';
import {
  CallLog,
  CallLogMenu,
} from 'ringcentral-integration/interfaces/CallLog.interface';

import { CallIcon } from '../CallIcon';
import { CallHistoryActions } from '../CallHistoryActions';
import styles from './styles.scss';

export type CallHistoryItemProps = {
  call: CallLog;
  actionMenu?: CallLogMenu;
  isWide?: boolean;
};

export const CallHistoryItem: FunctionComponent<CallHistoryItemProps> = ({
  call,
  actionMenu,
  isWide = true,
}) => {
  const displayName =
    call.direction === callDirection.outbound ? call.toName : call.fromName;

  return (
    <div className={classnames([styles.item, !isWide && styles.classic])}>
      <div className={styles.left}>
        <CallIcon {...call} />
        <div className={classnames([styles.info, !isWide && styles.classic])}>
          <span
            data-sign="matchedName"
            className={styles.name}
            title={displayName}
          >
            {displayName}
          </span>
          <span data-sign="callTime" className={styles.time}>
            {call.callTime}
          </span>
        </div>
      </div>
      <div className={styles.right}>
        <CallHistoryActions actionMenu={actionMenu} isWide={isWide} />
      </div>
    </div>
  );
};
