import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

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
      className={clsx(styles.tabTitle, isActive() ? styles.active : null)}
    >
      {label}
    </span>
  );
};
