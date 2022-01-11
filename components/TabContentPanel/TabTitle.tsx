import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type TabTitleProps = {
  label: string;
  isActive: (...args: any[]) => any;
};

export const TabTitle: FunctionComponent<TabTitleProps> = ({
  label,
  isActive,
  ...rest
}) => {
  return (
    <span
      {...rest}
      className={classnames(styles.tabTitle, isActive() ? styles.active : null)}
    >
      {label}
    </span>
  );
};
