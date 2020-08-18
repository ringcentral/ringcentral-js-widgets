import React, { DOMAttributes, FunctionComponent } from 'react';

import classNames from 'classnames';
import { CallIcon } from '../CallIcon';
import { CallSubject } from '../CallSubject';
import { FollowInfo } from '../FollowInfo';
import styles from '../styles.scss';

export type BasicCallInfoMainProps = {
  onClick?: DOMAttributes<HTMLDivElement>['onClick'];
  subject: string;
  isInbound: boolean;
  followInfos?: string[];
  className?: string;
};
export const BasicCallInfoMain: FunctionComponent<BasicCallInfoMainProps> = ({
  onClick,
  children,
  isInbound,
  subject,
  followInfos,
  className,
}) => {
  return (
    <div onClick={onClick} className={classNames(styles.root, className)}>
      <CallIcon isInbound={isInbound} />
      <div className={styles.mainInfo}>
        <CallSubject subject={subject} />
        <FollowInfo infoList={followInfos} splitSign="|" />
      </div>
      {children}
    </div>
  );
};
