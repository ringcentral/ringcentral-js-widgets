import React from 'react';

import { Tooltip } from '../../Rcui/Tooltip';
import styles from './styles.scss';
import { TOOLTIP_DEFAULT_DELAY_TIME as delayTime } from '../../../lib/toolTipDelayTime';

export interface FollowInfoProps {
  infoList?: string[];
  splitSign: string;
}

export const FollowInfo: React.FunctionComponent<FollowInfoProps> = ({
  infoList,
  splitSign,
}) => {
  if (!infoList || infoList.length === 0) return null;
  return (
    <div className={styles.followInfo}>
      {infoList
        .filter((info) => !!info)
        .map(
          (info, i) =>
            info && (
              <React.Fragment key={i}>
                <Tooltip title={info} enterDelay={delayTime}>
                  <span className={styles.followItem}>{info}</span>
                </Tooltip>
                <span className={styles.splitSign}>{splitSign}</span>
              </React.Fragment>
            ),
        )}
    </div>
  );
};
