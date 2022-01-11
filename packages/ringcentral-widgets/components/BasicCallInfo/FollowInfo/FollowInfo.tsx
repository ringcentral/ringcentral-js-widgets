import React, { FunctionComponent } from 'react';

import { TOOLTIP_LONG_DELAY_TIME } from '../../../lib/toolTipDelayTime';
import { Tooltip } from '../../Rcui/Tooltip';
import styles from './styles.scss';

export interface FollowInfoProps {
  infoList?: string[];
  splitSign: string;
}

export const FollowInfo: FunctionComponent<FollowInfoProps> = ({
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
                <Tooltip title={info} enterDelay={TOOLTIP_LONG_DELAY_TIME}>
                  <span className={styles.followItem}>{info}</span>
                </Tooltip>
                <span className={styles.splitSign}>{splitSign}</span>
              </React.Fragment>
            ),
        )}
    </div>
  );
};
