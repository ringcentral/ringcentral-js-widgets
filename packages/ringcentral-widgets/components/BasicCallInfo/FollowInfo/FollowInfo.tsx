import React from 'react';

import styles from './styles.scss';

export interface FollowInfoProps {
  infoList?: string[];
  splitSign: string;
}

const FollowInfo: React.FunctionComponent<FollowInfoProps> = ({
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
                <span title={info} className={styles.followItem}>
                  {info}
                </span>
                <span className={styles.splitSign}>{splitSign}</span>
              </React.Fragment>
            ),
        )}
    </div>
  );
};

export default FollowInfo;
