import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import { callDirection } from '@ringcentral-integration/commons/enums/callDirections';
import {
  palette2,
  RcText,
  RcTypography,
  spacing,
  styled,
} from '@ringcentral/juno';

import { CallHistoryActions } from '../CallHistoryActions';
import { CallLog, CallLogMenu } from '../CallHistoryPanel.interface';
import { CallIcon } from '../CallIcon';
import styles from './styles.scss';

export type CallHistoryItemProps = {
  call: CallLog;
  actionMenu?: CallLogMenu;
  isWide?: boolean;
};

const Item = styled.div<{ isWide: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  box-sizing: border-box;
  padding: ${({ isWide }) => (isWide ? spacing(3, 4) : spacing(3))};
  border-bottom: 1px solid ${palette2('neutral', 'l02')};
`;

export const CallHistoryItem: FunctionComponent<CallHistoryItemProps> = ({
  call,
  actionMenu,
  isWide = true,
}) => {
  const displayName =
    call.direction === callDirection.outbound ? call.toName : call.fromName;

  return (
    <Item isWide={isWide} data-sign="callHistoryItem">
      <div className={classnames([styles.left, !isWide && styles.classic])}>
        <CallIcon {...call} />
        <div className={classnames([styles.info, !isWide && styles.classic])}>
          <RcText
            variant="body1"
            noWrap
            color="neutral.f06"
            data-sign="matchedName"
            className={styles.name}
            title={displayName}
          >
            {displayName}
          </RcText>
          <RcTypography
            variant="caption1"
            color="neutral.f04"
            data-sign="callTime"
          >
            {call.callTime}
          </RcTypography>
        </div>
      </div>
      <div className={styles.right}>
        <CallHistoryActions actionMenu={actionMenu} isWide={isWide} />
      </div>
    </Item>
  );
};
