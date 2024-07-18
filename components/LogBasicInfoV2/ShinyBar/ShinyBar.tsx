import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import type { CallStatus } from '../../CallLogPanel/CallLog.interface';

import styles from './ShinyBar.scss';

export type ShinyBarProps = {
  isRinging?: boolean;
  status?: CallStatus;
  className?: string;
};

export const ShinyBar: FunctionComponent<ShinyBarProps> = ({
  isRinging,
  className,
  status = 'callEnd',
}) => (
  <div
    className={clsx(
      styles.shinyBar,
      styles[status],
      isRinging && styles.ringing,
      className,
    )}
    data-sign={`shinyBar-${status}`}
  >
    <div />
  </div>
);

ShinyBar.defaultProps = {
  isRinging: false,
};
