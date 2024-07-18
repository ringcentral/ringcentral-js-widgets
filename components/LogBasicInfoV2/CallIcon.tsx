import React from 'react';

import styles from './styles.scss';

type CallIconProps = {
  title?: string;
  iconClassName: string;
};
export const CallIcon: React.FC<CallIconProps> = ({ title, iconClassName }) => (
  <div className={styles.callIcon} title={title}>
    <span className={iconClassName} />
  </div>
);
CallIcon.defaultProps = {
  title: '',
};
