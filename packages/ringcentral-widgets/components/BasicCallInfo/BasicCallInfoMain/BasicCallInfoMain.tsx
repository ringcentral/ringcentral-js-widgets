import React, { DOMAttributes, FunctionComponent } from 'react';

import { CallIcon } from '../CallIcon';
import { CallSubject } from '../CallSubject';
import { FollowInfo } from '../FollowInfo';
import styles from '../styles.scss';

export type BasicCallInfoMainProps = {
  onClick?: DOMAttributes<HTMLDivElement>['onClick'];
  subject: string;
  isInbound: boolean;
  followInfos?: string[];
};
export const BasicCallInfoMain: FunctionComponent<BasicCallInfoMainProps> = ({
  onClick,
  children,
  isInbound,
  subject,
  followInfos,
}) => {
  return (
    <div onClick={onClick} className={styles.root}>
      <CallIcon isInbound={isInbound} />
      <div className={styles.mainInfo}>
        <CallSubject subject={subject} />
        <FollowInfo infoList={followInfos} splitSign="|" />
      </div>
      {children}
    </div>
  );
};
